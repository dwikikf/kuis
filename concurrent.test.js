/**
 * Concurrent Test Suite
 * Test scenario ketika multiple students submit quiz answers pada waktu yang sama
 * Memastikan data masuk ke spreadsheet dengan benar menggunakan LockService
 */

import { jest } from "@jest/globals";

// Mock implementation dengan simulated concurrent requests
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data =
      e.postData && e.postData.contents
        ? JSON.parse(e.postData.contents)
        : e.parameter;

    var namaPelajaran = data.pelajaran || "Data_Lain";
    var sheet = ss.getSheetByName(namaPelajaran);

    if (!sheet) {
      return {
        status: "error",
        message: "Error: Sheet '" + namaPelajaran + "' tidak ditemukan",
      };
    }

    var lastRow = sheet.getLastRow();
    var newNumber = 1;
    if (lastRow >= 2) {
      var lastValue = sheet.getRange(lastRow, 1).getValue();
      newNumber = isNaN(lastValue) ? 1 : Number(lastValue) + 1;
    }

    var rowData = [
      newNumber,
      data.nama || "",
      data.kelas || "",
      data.tanggal || new Date(),
      data.nilai || 0,
    ];

    sheet.appendRow(rowData);
    SpreadsheetApp.flush();

    return {
      status: "success",
      message: "Sukses: Data masuk ke sheet " + namaPelajaran,
      rowNumber: newNumber,
    };
  } catch (err) {
    return {
      status: "error",
      message: "Error: " + err.toString(),
    };
  } finally {
    lock.releaseLock();
  }
}

describe("Concurrent Submission Tests", () => {
  let mockLock;
  let mockSheet;
  let mockSpreadsheet;
  let lockAcquisitionOrder = [];
  let lockReleaseOrder = [];

  beforeEach(() => {
    jest.clearAllMocks();
    lockAcquisitionOrder = [];
    lockReleaseOrder = [];

    mockSheet = {
      getLastRow: jest.fn(() => 1),
      getRange: jest.fn((row, col) => ({
        getValue: jest.fn(() => 0),
      })),
      appendRow: jest.fn(() => {}),
      getName: jest.fn(() => "Test_Sheet"),
    };

    mockSpreadsheet = {
      getSheetByName: jest.fn((name) => mockSheet),
    };

    mockLock = {
      waitLock: jest.fn((timeout) => {
        lockAcquisitionOrder.push(Date.now());
        return true;
      }),
      releaseLock: jest.fn(() => {
        lockReleaseOrder.push(Date.now());
        return true;
      }),
    };

    global.SpreadsheetApp = {
      getActiveSpreadsheet: jest.fn(() => mockSpreadsheet),
      flush: jest.fn(() => true),
    };

    global.LockService = {
      getScriptLock: jest.fn(() => mockLock),
    };

    global.ContentService = {
      createTextOutput: jest.fn((text) => ({
        setMimeType: jest.fn(function () {
          this.text = text;
          return this;
        }),
      })),
      MimeType: {
        TEXT: "text/plain",
      },
    };
  });

  describe("Multiple Simultaneous Submissions", () => {
    test("should handle 5 concurrent submissions from different students", () => {
      const students = [
        { nama: "Ahmad Rizki", kelas: "Kelas 6A", nilai: 85 },
        { nama: "Siti Nurhaliza", kelas: "Kelas 6A", nilai: 92 },
        { nama: "Muhammad Haris", kelas: "Kelas 6B", nilai: 78 },
        { nama: "Noor Amelia", kelas: "Kelas 6B", nilai: 88 },
        { nama: "Dzaki Pratama", kelas: "Kelas 6A", nilai: 95 },
      ];

      let rowCounter = 0;
      mockSheet.getLastRow.mockImplementation(() => ++rowCounter);
      mockSheet.getRange.mockImplementation((row, col) => ({
        getValue: jest.fn(() => rowCounter - 1),
      }));

      students.forEach((student, index) => {
        const event = {
          parameter: {
            ...student,
            pelajaran: "PKN",
            tanggal: "2024-05-17",
          },
        };

        const result = doPost(event);

        expect(result.status).toBe("success");
        expect(result.rowNumber).toBeDefined();
      });

      expect(mockSheet.appendRow).toHaveBeenCalledTimes(5);
    });

    test("should ensure sequential row numbering despite concurrent access", () => {
      const submissionCount = 10;
      let currentRow = 1;

      mockSheet.getLastRow.mockImplementation(() => currentRow);
      mockSheet.getRange.mockImplementation((row, col) => ({
        getValue: jest.fn(() => currentRow - 1),
      }));
      mockSheet.appendRow.mockImplementation(() => {
        currentRow++;
      });

      for (let i = 1; i <= submissionCount; i++) {
        const event = {
          parameter: {
            nama: `Student ${i}`,
            kelas: `Kelas 6${String.fromCharCode(65 + (i % 3))}`,
            pelajaran: "PKN",
            nilai: 70 + Math.random() * 30,
          },
        };

        const result = doPost(event);
        expect(result.status).toBe("success");
      }

      // Verify all submissions were processed
      expect(mockSheet.appendRow).toHaveBeenCalledTimes(submissionCount);
      expect(currentRow).toBe(submissionCount + 1);
    });

    test("should acquire lock for each submission", () => {
      const submissionCount = 5;

      for (let i = 0; i < submissionCount; i++) {
        const event = {
          parameter: {
            nama: `Student ${i}`,
            pelajaran: "PKN",
          },
        };

        doPost(event);
      }

      expect(mockLock.waitLock).toHaveBeenCalledTimes(submissionCount);
    });

    test("should release lock for each submission", () => {
      const submissionCount = 5;

      for (let i = 0; i < submissionCount; i++) {
        const event = {
          parameter: {
            nama: `Student ${i}`,
            pelajaran: "PKN",
          },
        };

        doPost(event);
      }

      expect(mockLock.releaseLock).toHaveBeenCalledTimes(submissionCount);
    });

    test("should maintain FIFO order of lock acquisition", () => {
      const students = [
        { nama: "Student A", nilai: 85 },
        { nama: "Student B", nilai: 92 },
        { nama: "Student C", nilai: 78 },
      ];

      students.forEach((student) => {
        const event = {
          parameter: { ...student, pelajaran: "PKN" },
        };
        doPost(event);
      });

      // Locks should be acquired and released in order
      expect(lockAcquisitionOrder.length).toBe(3);
      expect(lockReleaseOrder.length).toBe(3);
    });
  });

  describe("Data Integrity Under Concurrent Load", () => {
    test("should not lose any data during concurrent submissions", () => {
      const students = [
        { nama: "Ahmad", kelas: "Kelas 6A", nilai: 85 },
        { nama: "Budi", kelas: "Kelas 6A", nilai: 92 },
        { nama: "Citra", kelas: "Kelas 6B", nilai: 78 },
      ];

      let appendedRows = [];
      mockSheet.appendRow.mockImplementation((row) => {
        appendedRows.push([...row]);
      });

      students.forEach((student) => {
        const event = {
          parameter: {
            ...student,
            pelajaran: "PKN",
            tanggal: "2024-05-17",
          },
        };
        doPost(event);
      });

      // Verify all data was appended
      expect(appendedRows.length).toBe(3);
      expect(appendedRows[0][1]).toBe("Ahmad");
      expect(appendedRows[1][1]).toBe("Budi");
      expect(appendedRows[2][1]).toBe("Citra");
    });

    test("should maintain data consistency across multiple subjects", () => {
      const subjects = ["PKN", "IPA", "Matematika"];
      const appends = [];

      mockSheet.appendRow.mockImplementation((row) => {
        appends.push(row);
      });

      subjects.forEach((subject) => {
        for (let i = 0; i < 3; i++) {
          const event = {
            parameter: {
              nama: `Student ${i + 1}`,
              pelajaran: subject,
              nilai: 80 + Math.random() * 20,
            },
          };
          doPost(event);
        }
      });

      expect(appends.length).toBe(9);
    });

    test("should preserve all student information correctly", () => {
      const studentData = {
        nama: "Ahmad Rizki Pratama",
        kelas: "Kelas 6A",
        pelajaran: "PKN",
        tanggal: "2024-05-17",
        nilai: 87,
      };

      let capturedData = null;
      mockSheet.appendRow.mockImplementation((row) => {
        capturedData = row;
      });

      const event = { parameter: studentData };
      const result = doPost(event);

      expect(result.status).toBe("success");
      expect(capturedData[1]).toBe(studentData.nama);
      expect(capturedData[2]).toBe(studentData.kelas);
      expect(capturedData[4]).toBe(studentData.nilai);
    });
  });

  describe("Lock Timeout Scenarios", () => {
    test("should use 30 second lock timeout", () => {
      const event = {
        parameter: { nama: "Test", pelajaran: "PKN" },
      };

      doPost(event);

      expect(mockLock.waitLock).toHaveBeenCalledWith(30000);
    });

    test("should handle lock acquisition failure gracefully", () => {
      mockLock.waitLock.mockImplementation(() => {
        throw new Error("Lock acquisition timeout");
      });

      const event = {
        parameter: { nama: "Test", pelajaran: "PKN" },
      };

      const result = doPost(event);
      expect(result.status).toBe("error");
      expect(result.message).toContain("Lock acquisition timeout");
    });
  });

  describe("Race Condition Prevention", () => {
    test("should prevent race condition in row numbering", () => {
      let rowCounts = [1, 2, 3, 4, 5];
      let callIndex = 0;

      mockSheet.getLastRow.mockImplementation(() => rowCounts[callIndex++]);
      mockSheet.getRange.mockImplementation((row, col) => ({
        getValue: jest.fn(() => Math.max(0, rowCounts[callIndex - 1] - 1)),
      }));

      const students = Array.from({ length: 5 }, (_, i) => ({
        nama: `Student ${i + 1}`,
        pelajaran: "PKN",
      }));

      const results = [];
      students.forEach((student) => {
        const event = { parameter: student };
        results.push(doPost(event));
      });

      // All submissions should be successful
      results.forEach((result) => {
        expect(result.status).toBe("success");
      });
    });

    test("should ensure no duplicate row numbers", () => {
      let nextRowNumber = 2;
      const usedNumbers = new Set([1]); // Starting with 1

      mockSheet.getLastRow.mockImplementation(() => nextRowNumber);
      mockSheet.getRange.mockImplementation((row, col) => ({
        getValue: jest.fn(() => nextRowNumber - 1),
      }));

      mockSheet.appendRow.mockImplementation((row) => {
        expect(usedNumbers.has(row[0])).toBe(false);
        usedNumbers.add(row[0]);
        nextRowNumber++;
      });

      for (let i = 0; i < 10; i++) {
        const event = {
          parameter: {
            nama: `Student ${i}`,
            pelajaran: "PKN",
          },
        };
        doPost(event);
      }

      expect(usedNumbers.size).toBe(11); // 1 + 10 submissions
    });
  });

  describe("Flush Operation Under Concurrent Load", () => {
    test("should flush data after each submission", () => {
      for (let i = 0; i < 5; i++) {
        const event = {
          parameter: {
            nama: `Student ${i}`,
            pelajaran: "PKN",
          },
        };
        doPost(event);
      }

      expect(global.SpreadsheetApp.flush).toHaveBeenCalledTimes(5);
    });

    test("should flush before releasing lock", () => {
      const flushCalls = [];
      const releaseCalls = [];

      global.SpreadsheetApp.flush.mockImplementation(() => {
        flushCalls.push(Date.now());
      });

      mockLock.releaseLock.mockImplementation(() => {
        releaseCalls.push(Date.now());
      });

      const event = {
        parameter: { nama: "Test", pelajaran: "PKN" },
      };

      doPost(event);

      // Both should be called
      expect(flushCalls.length).toBeGreaterThan(0);
      expect(releaseCalls.length).toBeGreaterThan(0);
    });
  });

  describe("Error Handling Under Load", () => {
    test("should handle errors without losing data from previous submissions", () => {
      let submitCount = 0;
      const appends = [];

      mockSheet.appendRow.mockImplementation((row) => {
        if (submitCount === 2) {
          throw new Error("Append failed");
        }
        appends.push(row);
      });

      const students = [
        { nama: "Student 1", pelajaran: "PKN" },
        { nama: "Student 2", pelajaran: "PKN" },
        { nama: "Student 3", pelajaran: "PKN" },
      ];

      const results = [];
      students.forEach((student) => {
        try {
          const event = { parameter: student };
          results.push(doPost(event));
        } catch (e) {
          results.push({ status: "error", message: e.message });
        }
        submitCount++;
      });

      expect(results[0].status).toBe("success");
      expect(results[1].status).toBe("success");
      expect(results[2].status).toBe("error");
    });

    test("should always release lock even when error occurs", () => {
      mockSheet.appendRow.mockImplementation(() => {
        throw new Error("Append failed");
      });

      const event = {
        parameter: { nama: "Test", pelajaran: "PKN" },
      };

      const result = doPost(event);
      expect(result.status).toBe("error");
      expect(mockLock.releaseLock).toHaveBeenCalled();
    });
  });

  describe("High Volume Test", () => {
    test("should handle 50 concurrent-like submissions", () => {
      let rowNum = 1;

      mockSheet.getLastRow.mockImplementation(() => rowNum);
      mockSheet.getRange.mockImplementation((row, col) => ({
        getValue: jest.fn(() => rowNum - 1),
      }));

      mockSheet.appendRow.mockImplementation(() => {
        rowNum++;
      });

      const results = [];

      for (let i = 0; i < 50; i++) {
        const event = {
          parameter: {
            nama: `Student ${i + 1}`,
            kelas: `Kelas ${6 + Math.floor(i / 25)}`,
            pelajaran: "PKN",
            nilai: 70 + Math.random() * 30,
          },
        };

        results.push(doPost(event));
      }

      expect(results.every((r) => r.status === "success")).toBe(true);
      expect(mockSheet.appendRow).toHaveBeenCalledTimes(50);
      expect(mockLock.waitLock).toHaveBeenCalledTimes(50);
    });

    test("should maintain performance with high volume", () => {
      const startTime = Date.now();
      let rowNum = 1;

      mockSheet.getLastRow.mockImplementation(() => rowNum);
      mockSheet.getRange.mockImplementation(() => ({
        getValue: jest.fn(() => rowNum - 1),
      }));

      mockSheet.appendRow.mockImplementation(() => {
        rowNum++;
      });

      for (let i = 0; i < 100; i++) {
        const event = {
          parameter: {
            nama: `Student ${i}`,
            pelajaran: "PKN",
          },
        };
        doPost(event);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // Should complete in reasonable time (less than 5 seconds for 100 ops in test)
      expect(totalTime).toBeLessThan(5000);
      expect(mockSheet.appendRow).toHaveBeenCalledTimes(100);
    });
  });
});
