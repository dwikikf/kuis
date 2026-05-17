import "@testing-library/jest-dom";

// Mock Google Apps Script API untuk testing
global.SpreadsheetApp = {
  getActiveSpreadsheet: jest.fn(() => ({
    getSheetByName: jest.fn((name) => ({
      getLastRow: jest.fn(() => 1),
      getRange: jest.fn((row, col) => ({
        getValue: jest.fn(() => 0),
      })),
      appendRow: jest.fn(() => {}),
      getName: jest.fn(() => name),
    })),
  })),
};

global.ContentService = {
  createTextOutput: jest.fn((text) => ({
    setMimeType: jest.fn(function () {
      return {
        toString: () => text,
      };
    }),
  })),
  MimeType: {
    TEXT: "text/plain",
  },
};

global.LockService = {
  getScriptLock: jest.fn(() => ({
    waitLock: jest.fn(() => true),
    releaseLock: jest.fn(() => true),
  })),
};

// Mock untuk JSON parsing
global.JSON = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};
