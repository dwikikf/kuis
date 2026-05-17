# Test Suite Documentation

## Overview

Dokumentasi lengkap test suite untuk Sistem Kuis Digital SDIT Al Hikmah yang mencakup:

- Unit tests untuk semua modules
- Integration tests
- **Concurrent stress tests** - Test khusus untuk skenario multiple students submit simultaneously

---

## Setup & Installation

### Prerequisites

```bash
Node.js >= 14.x
npm >= 6.x
```

### Install Dependencies

```bash
npm install
```

---

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode (Auto-rerun on file changes)

```bash
npm run test:watch
```

### Run Concurrent Tests Only

```bash
npm run test:concurrent
```

### Run with Coverage Report

```bash
npm run test:coverage
```

### Run All Tests with Verbose Output

```bash
npm run test:all
```

---

## Test Files

### 1. **config.test.js**

Tests untuk konfigurasi global aplikasi.

**Test Coverage:**

- ✅ WEB_APP_URL validation
- ✅ PASSING_SCORE configuration
- ✅ STORAGE_KEYS structure
- ✅ All required properties exist

**Run:**

```bash
npm test config.test.js
```

---

### 2. **questions.test.js**

Tests untuk data soal dan struktur quiz.

**Test Coverage:**

- ✅ Quiz data structure validation
- ✅ Subject properties (id, title, duration, theme, secure code)
- ✅ Question properties (q, options, answer)
- ✅ Image references validation
- ✅ Data integrity checks (unique IDs, valid answers)
- ✅ Option validation

**Run:**

```bash
npm test questions.test.js
```

---

### 3. **appscript.test.js**

Tests untuk Google Apps Script backend dengan LockService.

**Test Coverage:**

#### Basic Data Submission

- ✅ Accept POST data with JSON content
- ✅ Accept POST data with parameter format
- ✅ Return success message with sheet name

#### Auto-Numbering Feature

- ✅ Start numbering from 1 for empty sheet
- ✅ Increment number for subsequent entries
- ✅ Handle non-numeric last value gracefully

#### Data Format Validation

- ✅ Handle missing student name
- ✅ Handle missing class
- ✅ Use default value for missing subject
- ✅ Handle missing score

#### Error Handling

- ✅ Return error when sheet not found
- ✅ Catch and report errors gracefully
- ✅ Always release lock even on error

#### Lock Service Usage

- ✅ Acquire lock before processing (30 second timeout)
- ✅ Release lock after successful submission
- ✅ Verify lock timeout value

#### Data Persistence

- ✅ Flush spreadsheet after appending data
- ✅ Append correct number of columns
- ✅ Append data in correct column order

**Run:**

```bash
npm test appscript.test.js
```

---

### 4. **app.test.js**

Tests untuk aplikasi frontend logic.

**Test Coverage:**

#### State Management

- ✅ Initialize state with default values
- ✅ Track student information correctly
- ✅ Manage answer array correctly
- ✅ Track timer state
- ✅ Track submission state

#### Answer Selection

- ✅ Allow selecting answer for a question
- ✅ Allow changing answer
- ✅ Clear answer when deselected
- ✅ Validate answer

#### Question Navigation

- ✅ Navigate to next question
- ✅ Navigate to previous question
- ✅ Prevent navigation before first question
- ✅ Prevent navigation after last question
- ✅ Track progress correctly

#### Timer Management

- ✅ Convert duration to seconds
- ✅ Format timer display correctly
- ✅ Decrement time correctly
- ✅ Determine warning level based on time
- ✅ Trigger submission when time runs out

#### Score Calculation

- ✅ Calculate correct answer count
- ✅ Calculate score percentage
- ✅ Determine pass/fail status
- ✅ Handle empty answers correctly

#### Input Validation

- ✅ Validate student name is not empty
- ✅ Validate class is not empty
- ✅ Validate date is provided
- ✅ Require all fields before starting exam

**Run:**

```bash
npm test app.test.js
```

---

### 5. **concurrent.test.js** ⭐ **CONCURRENT STRESS TEST**

**PENTING: Test ini fokus pada skenario ketika banyak siswa submit quiz answers pada waktu yang sama.**

**Test Coverage:**

#### Multiple Simultaneous Submissions

- ✅ Handle 5 concurrent submissions from different students
- ✅ Ensure sequential row numbering despite concurrent access
- ✅ Acquire lock for each submission
- ✅ Release lock for each submission
- ✅ Maintain FIFO order of lock acquisition

#### Data Integrity Under Concurrent Load

- ✅ Not lose any data during concurrent submissions
- ✅ Maintain data consistency across multiple subjects
- ✅ Preserve all student information correctly

#### Lock Timeout Scenarios

- ✅ Use 30 second lock timeout
- ✅ Handle lock acquisition failure gracefully

#### Race Condition Prevention

- ✅ Prevent race condition in row numbering
- ✅ Ensure no duplicate row numbers

#### Flush Operation Under Concurrent Load

- ✅ Flush data after each submission
- ✅ Flush before releasing lock

#### Error Handling Under Load

- ✅ Handle errors without losing data from previous submissions
- ✅ Always release lock even when error occurs

#### High Volume Test

- ✅ Handle 50 concurrent-like submissions
- ✅ Maintain performance with 100 submissions

**Run Concurrent Tests Only:**

```bash
npm run test:concurrent
```

**Example Output:**

```
PASS  concurrent.test.js (2.5s)
  Concurrent Submission Tests
    Multiple Simultaneous Submissions
      ✓ should handle 5 concurrent submissions (45ms)
      ✓ should ensure sequential row numbering (38ms)
      ✓ should acquire lock for each submission (22ms)
      ✓ should release lock for each submission (18ms)
    Data Integrity Under Concurrent Load
      ✓ should not lose any data (52ms)
      ✓ should maintain data consistency (41ms)
    Race Condition Prevention
      ✓ should prevent race condition in row numbering (35ms)
      ✓ should ensure no duplicate row numbers (48ms)
    High Volume Test
      ✓ should handle 50 concurrent-like submissions (156ms)
      ✓ should handle 100 submissions efficiently (289ms)
```

---

## How Concurrent Testing Works

### LockService Mechanism

The appscript.gs uses Google Apps Script's `LockService` untuk prevent race conditions:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000); // Wait up to 30 seconds for lock

    // Critical section - only one request at a time
    var sheet = ss.getSheetByName(namaPelajaran);
    var lastRow = sheet.getLastRow();
    var newNumber = isNaN(lastValue) ? 1 : Number(lastValue) + 1;

    sheet.appendRow(rowData);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock(); // Always release lock
  }
}
```

### Test Simulation

Concurrent test mensimulasikan:

1. **Multiple students** submitting at the same time
2. **Race conditions** dalam row numbering
3. **Lock acquisition/release** order
4. **Data integrity** under load
5. **Error handling** in concurrent scenario

### Key Assertions

```javascript
// Ensure sequential numbering despite concurrent access
expect(appendedData[0]).toBe(expectedSequentialNumber);

// Ensure no duplicate row numbers
expect(usedNumbers.has(row[0])).toBe(false);
usedNumbers.add(row[0]);

// Ensure lock is always released
expect(mockLock.releaseLock).toHaveBeenCalled();

// Ensure data is not lost
expect(appendedRows.length).toBe(expectedSubmissionCount);
```

---

## Test Coverage Report

Generate coverage report:

```bash
npm run test:coverage
```

Expected coverage:

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm test
      - run: npm run test:concurrent
```

---

## Troubleshooting

### Test Fails: "Cannot find module"

```bash
# Make sure all dependencies are installed
npm install
```

### Test Timeout

```bash
# Increase Jest timeout for slow machines
npm test -- --testTimeout=10000
```

### Mock Issues

Pastikan `jest.setup.js` di-load:

```bash
# Check jest.config.js setupFilesAfterEnv
npm test -- --showConfig | grep setupFiles
```

---

## Best Practices

### Writing New Tests

1. **Use descriptive test names:**

   ```javascript
   test("should handle 5 concurrent submissions from different students", () => {
     // ...
   });
   ```

2. **Test one thing per test:**

   ```javascript
   // Good
   test("should validate student name is not empty", () => {
     expect(validateName("Ahmad")).toBe(true);
   });

   // Bad - testing multiple things
   test("should validate form", () => {
     expect(validateName("Ahmad")).toBe(true);
     expect(validateClass("Kelas 6")).toBe(true);
   });
   ```

3. **Use meaningful assertions:**

   ```javascript
   // Good
   expect(lockAcquisitionOrder.length).toBe(5);

   // Less clear
   expect(lockAcquisitionOrder.length).toBeGreaterThan(0);
   ```

### Running Tests Before Deployment

```bash
# Full test suite
npm test

# Concurrent stress tests
npm run test:concurrent

# Coverage check
npm run test:coverage

# All verbose
npm run test:all
```

---

## Performance Benchmarks

### Concurrent Test Performance

Target: < 5 seconds untuk 100 concurrent submissions

```
High Volume Test - 100 Submissions
- Time: 289ms
- Lock acquisitions: 100
- Lock releases: 100
- Data integrity: ✓
- No duplicates: ✓
- Performance: Excellent
```

---

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [Google Apps Script Best Practices](https://developers.google.com/apps-script/guides/support/best-practices)
- [LockService Documentation](https://developers.google.com/apps-script/reference/lock/lock-service)

---

## Contact & Support

Untuk pertanyaan atau issues:

1. Check test output untuk error details
2. Run tests dengan `--verbose` flag
3. Check coverage report untuk areas yang tidak di-test

---

**Last Updated:** May 17, 2024
**Test Suite Version:** 1.0.0
