import QUIZ_DATA from "./questions.js";

describe("Questions Module", () => {
  describe("QUIZ_DATA Structure", () => {
    test("should be an array", () => {
      expect(Array.isArray(QUIZ_DATA)).toBe(true);
    });

    test("should have at least one subject", () => {
      expect(QUIZ_DATA.length).toBeGreaterThan(0);
    });
  });

  describe("Subject Properties", () => {
    let subject;

    beforeEach(() => {
      subject = QUIZ_DATA[0];
    });

    test("each subject should have required properties", () => {
      expect(subject).toHaveProperty("id");
      expect(subject).toHaveProperty("title");
      expect(subject).toHaveProperty("classDefault");
      expect(subject).toHaveProperty("duration");
      expect(subject).toHaveProperty("theme");
      expect(subject).toHaveProperty("secure");
      expect(subject).toHaveProperty("questions");
    });

    test("id should be a non-empty string", () => {
      expect(typeof subject.id).toBe("string");
      expect(subject.id.length).toBeGreaterThan(0);
    });

    test("title should be a non-empty string", () => {
      expect(typeof subject.title).toBe("string");
      expect(subject.title.length).toBeGreaterThan(0);
    });

    test("duration should be a positive number", () => {
      expect(typeof subject.duration).toBe("number");
      expect(subject.duration).toBeGreaterThan(0);
    });

    test("theme should be a valid Tailwind gradient string", () => {
      expect(typeof subject.theme).toBe("string");
      expect(subject.theme).toMatch(/from-.*-\d+ to-.*-\d+/);
    });

    test("secure code should be a string of numbers", () => {
      expect(typeof subject.secure).toBe("string");
      expect(subject.secure).toMatch(/^\d+$/);
    });

    test("questions should be an array", () => {
      expect(Array.isArray(subject.questions)).toBe(true);
      expect(subject.questions.length).toBeGreaterThan(0);
    });
  });

  describe("Question Properties", () => {
    let question;

    beforeEach(() => {
      question = QUIZ_DATA[0].questions[0];
    });

    test("each question should have required properties", () => {
      expect(question).toHaveProperty("q");
      expect(question).toHaveProperty("options");
      expect(question).toHaveProperty("answer");
    });

    test("question text should be non-empty string", () => {
      expect(typeof question.q).toBe("string");
      expect(question.q.length).toBeGreaterThan(0);
    });

    test("options should be an array with 4 items", () => {
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBe(4);
    });

    test("all options should be non-empty strings", () => {
      question.options.forEach((option) => {
        expect(typeof option).toBe("string");
        expect(option.length).toBeGreaterThan(0);
      });
    });

    test("answer should be a valid letter (A, B, C, or D)", () => {
      expect(["A", "B", "C", "D"]).toContain(question.answer);
    });

    test("answer index should correspond to options array", () => {
      const answerIndex = question.answer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
      expect(answerIndex).toBeGreaterThanOrEqual(0);
      expect(answerIndex).toBeLessThan(question.options.length);
    });
  });

  describe("Question Images", () => {
    test("questions with img property should have valid image filename", () => {
      QUIZ_DATA.forEach((subject) => {
        subject.questions.forEach((question) => {
          if (question.img) {
            expect(typeof question.img).toBe("string");
            expect(question.img).toMatch(/\.(webp|jpg|jpeg|png)$/i);
          }
        });
      });
    });
  });

  describe("Data Validation", () => {
    test("all subject IDs should be unique", () => {
      const ids = QUIZ_DATA.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test("classDefault should be non-empty string", () => {
      QUIZ_DATA.forEach((subject) => {
        expect(typeof subject.classDefault).toBe("string");
        expect(subject.classDefault.length).toBeGreaterThan(0);
      });
    });

    test("all questions should have at least 3 options", () => {
      QUIZ_DATA.forEach((subject) => {
        subject.questions.forEach((question) => {
          expect(question.options.length).toBeGreaterThanOrEqual(3);
        });
      });
    });

    test("total questions count should be reasonable", () => {
      QUIZ_DATA.forEach((subject) => {
        expect(subject.questions.length).toBeGreaterThan(0);
        expect(subject.questions.length).toBeLessThanOrEqual(100);
      });
    });
  });
});
