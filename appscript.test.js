import { jest } from "@jest/globals";

// Mock implementation of doPost function
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
      return ContentService.createTextOutput(
        "Error: Sheet '" + namaPelajaran + "' tidak ditemukan",
      ).setMimeType(ContentService.MimeType.TEXT);
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

    return ContentService.createTextOutput(
      "Sukses: Data masuk ke sheet " + namaPelajaran,
    ).setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput(
      "Error: " + err.toString(),
    ).setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

describe("Google Apps Script - doPost Function", () => {
  let mockLock;
  let mockSheet;
  let mockSpreadsheet;

  beforeEach(() => {
    // Reset mocks sebelum setiap test
    jest.clearAllMocks();

    // Setup mock sheet
    mockSheet = {
      getLastRow: jest.fn(() => 1),
      getRange: jest.fn((row, col) => ({
        getValue: jest.fn(() => 0),
      })),
      appendRow: jest.fn(() => {}),
      getName: jest.fn(() => "Test_Sheet"),
    };

    // Setup mock spreadsheet
    mockSpreadsheet = {
      getSheetByName: jest.fn((name) => mockSheet),
    };

    // Setup mock lock
    mockLock = {
      waitLock: jest.fn(() => true),
      releaseLock: jest.fn(() => true),
    };

    // Setup global mocks
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

  describe("Basic Data Submission", () => {
    test("should accept POST data with JSON content", () => {
      const testData = {
        nama: "Ahmad Rizki",
        kelas: "Kelas 6",
        pelajaran: "Test_Sheet",
        tanggal: "2024-05-17",
        nilai: 85,
      };

      const event = {
        postData: {
          contents: JSON.stringify(testData),
        },
      };

      const result = doPost(event);

      expect(result.text).toContain("Sukses");
      expect(mockSheet.appendRow).toHaveBeenCalled();
    });

    test("should accept POST data with parameter format", () => {
      const event = {
        parameter: {
          nama: "Siti Nurhaliza",
          kelas: "Kelas 5",
          pelajaran: "Test_Sheet",
          nilai: 92,
        },
      };

      const result = doPost(event);

      expect(result.text).toContain("Sukses");
      expect(mockSheet.appendRow).toHaveBeenCalled();
    });

    test("should return success message with sheet name", () => {
      const event = {
        parameter: {
          nama: "Test Student",
          pelajaran: "PKN",
        },
      };

      const result = doPost(event);

      expect(result.text).toContain("Sukses");
      expect(result.text).toContain("PKN");
    });
  });

  describe("Auto-Numbering Feature", () => {
    test("should start numbering from 1 for empty sheet", () => {
      mockSheet.getLastRow.mockReturnValue(1);

      const event = {
        parameter: {
          nama: "Student 1",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[0]).toBe(1);
    });

    test("should increment number for subsequent entries", () => {
      mockSheet.getLastRow.mockReturnValue(5);
      mockSheet.getRange.mockReturnValue({
        getValue: jest.fn(() => 4),
      });

      const event = {
        parameter: {
          nama: "Student 5",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[0]).toBe(5);
    });

    test("should handle non-numeric last value gracefully", () => {
      mockSheet.getLastRow.mockReturnValue(2);
      mockSheet.getRange.mockReturnValue({
        getValue: jest.fn(() => "Invalid"),
      });

      const event = {
        parameter: {
          nama: "Student",
          pelajaran: "Test_Sheet",
        },
      };

      const result = doPost(event);

      expect(result.text).toContain("Sukses");
      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[0]).toBe(1);
    });
  });

  describe("Data Format Validation", () => {
    test("should handle missing student name gracefully", () => {
      const event = {
        parameter: {
          kelas: "Kelas 6",
          pelajaran: "Test_Sheet",
          nilai: 85,
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[1]).toBe("");
    });

    test("should handle missing class gracefully", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
          nilai: 85,
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[2]).toBe("");
    });

    test("should use default value for missing pelajaran", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          kelas: "Kelas 6",
        },
      };

      mockSpreadsheet.getSheetByName.mockReturnValue(mockSheet);

      const result = doPost(event);

      expect(result.text).toContain("Data_Lain");
    });

    test("should handle missing nilai field", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          kelas: "Kelas 6",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[4]).toBe(0);
    });
  });

  describe("Error Handling", () => {
    test("should return error when sheet not found", () => {
      mockSpreadsheet.getSheetByName.mockReturnValue(null);

      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "NonExistent_Sheet",
        },
      };

      const result = doPost(event);

      expect(result.text).toContain("Error");
      expect(result.text).toContain("tidak ditemukan");
    });

    test("should catch and report errors gracefully", () => {
      mockSheet.appendRow.mockImplementation(() => {
        throw new Error("Append failed");
      });

      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
        },
      };

      const result = doPost(event);

      expect(result.text).toContain("Error");
    });

    test("should always release lock even on error", () => {
      mockSheet.appendRow.mockImplementation(() => {
        throw new Error("Test error");
      });

      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      expect(mockLock.releaseLock).toHaveBeenCalled();
    });
  });

  describe("Lock Service Usage", () => {
    test("should acquire lock before processing", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      expect(mockLock.waitLock).toHaveBeenCalledWith(30000);
    });

    test("should release lock after successful submission", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      expect(mockLock.releaseLock).toHaveBeenCalled();
    });

    test("should have lock timeout of 30 seconds", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      const lockCall = mockLock.waitLock.mock.calls[0];
      expect(lockCall[0]).toBe(30000);
    });
  });

  describe("Data Persistence", () => {
    test("should flush spreadsheet after appending data", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          pelajaran: "Test_Sheet",
        },
      };

      doPost(event);

      expect(global.SpreadsheetApp.flush).toHaveBeenCalled();
    });

    test("should append correct number of columns", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          kelas: "Kelas 6",
          pelajaran: "Test_Sheet",
          tanggal: "2024-05-17",
          nilai: 85,
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData.length).toBe(5); // [no, nama, kelas, tanggal, nilai]
    });

    test("should append data in correct column order", () => {
      const event = {
        parameter: {
          nama: "Ahmad",
          kelas: "Kelas 6",
          pelajaran: "Test_Sheet",
          tanggal: "2024-05-17",
          nilai: 85,
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[0]).toBe(1); // No urut
      expect(appendedData[1]).toBe("Ahmad"); // Nama
      expect(appendedData[2]).toBe("Kelas 6"); // Kelas
      expect(appendedData[3]).toBe("2024-05-17"); // Tanggal
      expect(appendedData[4]).toBe(85); // Nilai
    });
  });

  describe("JSON Parsing", () => {
    test("should correctly parse JSON content from postData", () => {
      const testData = {
        nama: "Ahmad",
        kelas: "Kelas 6",
        pelajaran: "PKN",
        nilai: 90,
      };

      const event = {
        postData: {
          contents: JSON.stringify(testData),
        },
      };

      doPost(event);

      const appendedData = mockSheet.appendRow.mock.calls[0][0];
      expect(appendedData[1]).toBe("Ahmad");
      expect(appendedData[2]).toBe("Kelas 6");
    });

    test("should handle malformed JSON gracefully", () => {
      const event = {
        postData: {
          contents: "{invalid json}",
        },
        parameter: {
          nama: "Fallback Name",
          pelajaran: "Test_Sheet",
        },
      };

      // Malformed JSON should be caught in try-catch and return error response
      const result = doPost(event);
      expect(result).toBeDefined();
      // Result is a ContentService object with text property
      expect(result.text).toContain("Error");
    });
  });
});
