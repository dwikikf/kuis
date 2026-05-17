import CONFIG from "./config.js";

describe("Config Module", () => {
  describe("WEB_APP_URL", () => {
    test("should have a valid WEB_APP_URL", () => {
      expect(CONFIG.WEB_APP_URL).toBeDefined();
      expect(typeof CONFIG.WEB_APP_URL).toBe("string");
      expect(CONFIG.WEB_APP_URL).toMatch(/^https:\/\/script\.google\.com/);
    });

    test("should contain script.google.com domain", () => {
      expect(CONFIG.WEB_APP_URL).toContain("script.google.com");
    });

    test("should have exec endpoint", () => {
      expect(CONFIG.WEB_APP_URL).toContain("/exec");
    });
  });

  describe("PASSING_SCORE", () => {
    test("should have a PASSING_SCORE defined", () => {
      expect(CONFIG.PASSING_SCORE).toBeDefined();
      expect(typeof CONFIG.PASSING_SCORE).toBe("number");
    });

    test("PASSING_SCORE should be between 0 and 100", () => {
      expect(CONFIG.PASSING_SCORE).toBeGreaterThanOrEqual(0);
      expect(CONFIG.PASSING_SCORE).toBeLessThanOrEqual(100);
    });

    test("PASSING_SCORE should be 75", () => {
      expect(CONFIG.PASSING_SCORE).toBe(75);
    });
  });

  describe("STORAGE_KEYS", () => {
    test("should have STORAGE_KEYS object", () => {
      expect(CONFIG.STORAGE_KEYS).toBeDefined();
      expect(typeof CONFIG.STORAGE_KEYS).toBe("object");
    });

    test("should have STATE key in STORAGE_KEYS", () => {
      expect(CONFIG.STORAGE_KEYS.STATE).toBeDefined();
      expect(typeof CONFIG.STORAGE_KEYS.STATE).toBe("string");
    });

    test("STATE key should be non-empty string", () => {
      expect(CONFIG.STORAGE_KEYS.STATE.length).toBeGreaterThan(0);
    });
  });

  describe("Overall Configuration", () => {
    test("should export CONFIG as default", () => {
      expect(CONFIG).not.toBeNull();
      expect(CONFIG).toBeInstanceOf(Object);
    });

    test("should have all required properties", () => {
      expect(CONFIG).toHaveProperty("WEB_APP_URL");
      expect(CONFIG).toHaveProperty("PASSING_SCORE");
      expect(CONFIG).toHaveProperty("STORAGE_KEYS");
    });
  });
});
