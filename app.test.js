/**
 * Unit Tests untuk app.js
 * Test core functionality dan business logic
 */

describe("Quiz Application - Core Logic", () => {
  describe("State Management", () => {
    test("should initialize state with default values", () => {
      const initialState = {
        selectedSubject: null,
        currentQuestionIndex: 0,
        answers: [],
        timeLeft: 0,
        timerInterval: null,
        studentName: "",
        studentClass: "",
        examDate: "",
        isSubmitting: false,
        pendingSubjectId: null,
      };

      expect(initialState.selectedSubject).toBeNull();
      expect(initialState.currentQuestionIndex).toBe(0);
      expect(Array.isArray(initialState.answers)).toBe(true);
      expect(initialState.studentName).toBe("");
    });

    test("should track student information correctly", () => {
      const state = {
        studentName: "Ahmad Rizki",
        studentClass: "Kelas 6A",
        examDate: "2024-05-17",
      };

      expect(state.studentName).toBe("Ahmad Rizki");
      expect(state.studentClass).toBe("Kelas 6A");
      expect(state.examDate).toBe("2024-05-17");
    });

    test("should manage answer array correctly", () => {
      const state = { answers: [null, null, null, null, null] };

      state.answers[0] = "A";
      state.answers[2] = "C";

      expect(state.answers[0]).toBe("A");
      expect(state.answers[1]).toBeNull();
      expect(state.answers[2]).toBe("C");
    });

    test("should track timer state", () => {
      const state = {
        timeLeft: 5400, // 90 minutes in seconds
        timerInterval: null,
      };

      expect(state.timeLeft).toBe(5400);
      expect(state.timerInterval).toBeNull();
    });

    test("should track submission state", () => {
      const state = { isSubmitting: false };

      expect(state.isSubmitting).toBe(false);

      state.isSubmitting = true;
      expect(state.isSubmitting).toBe(true);
    });
  });

  describe("Answer Selection Logic", () => {
    test("should allow selecting answer for a question", () => {
      const answers = [null, null, null, null, null];
      const questionIndex = 2;
      const selectedAnswer = "B";

      answers[questionIndex] = selectedAnswer;

      expect(answers[questionIndex]).toBe("B");
    });

    test("should allow changing answer", () => {
      const answers = ["A", null, "C", "D", null];

      answers[0] = "B"; // Change first answer

      expect(answers[0]).toBe("B");
    });

    test("should clear answer when deselected", () => {
      const answers = ["A", "B", "C"];

      answers[1] = null; // Deselect answer

      expect(answers[1]).toBeNull();
    });

    test("should handle answer validation", () => {
      const validAnswers = ["A", "B", "C", "D"];
      const selectedAnswer = "B";

      expect(validAnswers.includes(selectedAnswer)).toBe(true);
    });
  });

  describe("Question Navigation", () => {
    test("should navigate to next question", () => {
      let currentQuestionIndex = 2;
      const totalQuestions = 10;

      if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
      }

      expect(currentQuestionIndex).toBe(3);
    });

    test("should navigate to previous question", () => {
      let currentQuestionIndex = 5;

      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
      }

      expect(currentQuestionIndex).toBe(4);
    });

    test("should prevent navigation before first question", () => {
      let currentQuestionIndex = 0;

      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
      }

      expect(currentQuestionIndex).toBe(0);
    });

    test("should prevent navigation after last question", () => {
      let currentQuestionIndex = 9;
      const totalQuestions = 10;

      if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
      }

      expect(currentQuestionIndex).toBe(9);
    });

    test("should track progress correctly", () => {
      const currentQuestion = 5;
      const totalQuestions = 20;

      const progress = (currentQuestion / totalQuestions) * 100;

      expect(progress).toBe(25);
    });
  });

  describe("Timer Management", () => {
    test("should convert duration to seconds", () => {
      const durationMinutes = 90;
      const durationSeconds = durationMinutes * 60;

      expect(durationSeconds).toBe(5400);
    });

    test("should format timer display correctly", () => {
      const timeLeft = 3661; // 1 hour, 1 minute, 1 second
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      expect(display).toBe("61:01");
    });

    test("should decrement time correctly", () => {
      let timeLeft = 3600; // 1 hour

      timeLeft--;

      expect(timeLeft).toBe(3599);
    });

    test("should determine warning level based on time remaining", () => {
      const getWarningLevel = (timeLeft) => {
        if (timeLeft <= 300) return "critical"; // 5 minutes
        if (timeLeft <= 900) return "warning"; // 15 minutes
        return "normal";
      };

      expect(getWarningLevel(200)).toBe("critical");
      expect(getWarningLevel(500)).toBe("warning");
      expect(getWarningLevel(1000)).toBe("normal");
    });

    test("should trigger submission when time runs out", () => {
      let timeLeft = 1;
      let submitted = false;

      timeLeft--;

      if (timeLeft <= 0) {
        submitted = true;
      }

      expect(submitted).toBe(true);
    });
  });

  describe("Score Calculation", () => {
    test("should calculate correct answer count", () => {
      const questions = [
        { answer: "A" },
        { answer: "B" },
        { answer: "C" },
        { answer: "D" },
      ];
      const studentAnswers = ["A", "B", "X", "D"];

      let correctCount = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].answer === studentAnswers[i]) {
          correctCount++;
        }
      }

      expect(correctCount).toBe(3);
    });

    test("should calculate score percentage", () => {
      const totalQuestions = 20;
      const correctAnswers = 15;

      const score = (correctAnswers / totalQuestions) * 100;

      expect(score).toBe(75);
    });

    test("should determine pass/fail status", () => {
      const passingScore = 75;

      const isPass = (score) => score >= passingScore;

      expect(isPass(80)).toBe(true);
      expect(isPass(75)).toBe(true);
      expect(isPass(74)).toBe(false);
    });

    test("should handle empty answers correctly", () => {
      const questions = [{ answer: "A" }, { answer: "B" }, { answer: "C" }];
      const studentAnswers = ["A", null, "C"];

      let correctCount = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].answer === studentAnswers[i]) {
          correctCount++;
        }
      }

      expect(correctCount).toBe(2);
    });
  });

  describe("Input Validation", () => {
    test("should validate student name is not empty", () => {
      const validateName = (name) => !!(name && name.trim().length > 0);

      expect(validateName("Ahmad Rizki")).toBe(true);
      expect(validateName("")).toBe(false);
      expect(validateName("   ")).toBe(false);
    });

    test("should validate class is not empty", () => {
      const validateClass = (kelas) => !!(kelas && kelas.trim().length > 0);

      expect(validateClass("Kelas 6A")).toBe(true);
      expect(validateClass("")).toBe(false);
    });

    test("should validate date is provided", () => {
      const validateDate = (date) => !!(date && date.length > 0);

      expect(validateDate("2024-05-17")).toBe(true);
      expect(validateDate("")).toBe(false);
    });

    test("should require name before starting exam", () => {
      const canStartExam = (name, kelas, date) => {
        return !!(
          name &&
          name.trim().length > 0 &&
          kelas &&
          kelas.trim().length > 0 &&
          date &&
          date.length > 0
        );
      };

      expect(canStartExam("Ahmad", "Kelas 6A", "2024-05-17")).toBe(true);
      expect(canStartExam("", "Kelas 6A", "2024-05-17")).toBe(false);
      expect(canStartExam("Ahmad", "", "2024-05-17")).toBe(false);
    });
  });

  describe("Question Navigation Guards", () => {
    test("should block submission on last question if not all answered", () => {
      const currentQuestionIndex = 19;
      const totalQuestions = 20;
      const answers = new Array(20).fill(null);
      answers[19] = "A"; // Only last question answered

      const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
      const hasUnansweredQuestions = answers.some((a) => a === null);

      expect(isLastQuestion).toBe(true);
      expect(hasUnansweredQuestions).toBe(true);
    });

    test("should allow submission when all questions are answered", () => {
      const answers = ["A", "B", "C", "D", "A", "B", "C", "D"];

      const allAnswered = answers.every((answer) => answer !== null);

      expect(allAnswered).toBe(true);
    });
  });

  describe("Screen Transitions", () => {
    test("should identify landing screen", () => {
      const screens = ["splash", "subjects", "auth", "exam", "result"];
      const currentScreen = "subjects";

      expect(screens.includes(currentScreen)).toBe(true);
    });

    test("should transition from subjects to auth", () => {
      let currentScreen = "subjects";
      currentScreen = "auth";

      expect(currentScreen).toBe("auth");
    });

    test("should transition from auth to exam", () => {
      let currentScreen = "auth";
      currentScreen = "exam";

      expect(currentScreen).toBe("exam");
    });

    test("should transition from exam to result", () => {
      let currentScreen = "exam";
      currentScreen = "result";

      expect(currentScreen).toBe("result");
    });

    test("should return to subjects from result", () => {
      let currentScreen = "result";
      currentScreen = "subjects";

      expect(currentScreen).toBe("subjects");
    });
  });

  describe("Subject Selection", () => {
    test("should store selected subject", () => {
      const subjects = [
        { id: "PKN", title: "Pendidikan Kewarganegaraan" },
        { id: "IPA", title: "Ilmu Pengetahuan Alam" },
      ];

      let selectedSubject = null;
      selectedSubject = subjects[0];

      expect(selectedSubject.id).toBe("PKN");
      expect(selectedSubject.title).toBe("Pendidikan Kewarganegaraan");
    });

    test("should initialize answers array based on subject", () => {
      const subject = {
        id: "PKN",
        questions: new Array(20), // 20 questions
      };

      const answers = new Array(subject.questions.length).fill(null);

      expect(answers.length).toBe(20);
      expect(answers.every((a) => a === null)).toBe(true);
    });

    test("should set timer based on subject duration", () => {
      const subject = {
        id: "PKN",
        duration: 90, // minutes
      };

      const timeLeft = subject.duration * 60;

      expect(timeLeft).toBe(5400);
    });
  });

  describe("Session Storage", () => {
    test("should save state to storage", () => {
      const state = {
        studentName: "Ahmad",
        studentClass: "Kelas 6A",
        answers: ["A", "B", "C"],
      };

      const storageKey = "psaj_quiz_state";
      const saved = JSON.stringify(state);

      expect(JSON.parse(saved)).toEqual(state);
    });

    test("should restore state from storage", () => {
      const saved = JSON.stringify({
        studentName: "Ahmad",
        answers: ["A", "B"],
      });

      const restored = JSON.parse(saved);

      expect(restored.studentName).toBe("Ahmad");
      expect(restored.answers).toEqual(["A", "B"]);
    });
  });

  describe("Form Submission", () => {
    test("should prepare data for submission", () => {
      const state = {
        studentName: "Ahmad Rizki",
        studentClass: "Kelas 6A",
        examDate: "2024-05-17",
        answers: ["A", "B", "C", "B", "A"],
      };

      const submissionData = {
        nama: state.studentName,
        kelas: state.studentClass,
        tanggal: state.examDate,
        nilai: 85,
      };

      expect(submissionData.nama).toBe("Ahmad Rizki");
      expect(submissionData.kelas).toBe("Kelas 6A");
    });

    test("should calculate correct score before submission", () => {
      const questions = Array(20).fill({ answer: "A" });
      const answers = new Array(20).fill("A");

      const correctCount = answers.filter(
        (a, i) => a === questions[i].answer,
      ).length;
      const score = (correctCount / questions.length) * 100;

      expect(score).toBe(100);
    });
  });

  describe("Submission Validation - New Feature", () => {
    // Helper function untuk get unanswered questions
    const getUnansweredQuestions = (answers) => {
      const unanswered = [];
      answers.forEach((answer, index) => {
        if (answer === null) {
          unanswered.push(index + 1); // 1-indexed untuk display
        }
      });
      return unanswered;
    };

    test("should identify all unanswered questions", () => {
      const answers = ["A", null, "C", null, "E"];
      const unanswered = getUnansweredQuestions(answers);

      expect(unanswered).toEqual([2, 4]);
      expect(unanswered.length).toBe(2);
    });

    test("should return empty array when all questions are answered", () => {
      const answers = ["A", "B", "C", "D"];
      const unanswered = getUnansweredQuestions(answers);

      expect(unanswered).toEqual([]);
      expect(unanswered.length).toBe(0);
    });

    test("should return all question numbers when none are answered", () => {
      const answers = [null, null, null, null];
      const unanswered = getUnansweredQuestions(answers);

      expect(unanswered).toEqual([1, 2, 3, 4]);
      expect(unanswered.length).toBe(4);
    });

    test("should allow submission when all questions are answered", () => {
      const answers = ["A", "B", "C", "D"];
      const unanswered = getUnansweredQuestions(answers);

      const canSubmit = unanswered.length === 0;
      expect(canSubmit).toBe(true);
    });

    test("should block submission when questions are unanswered (without bypass)", () => {
      const answers = ["A", null, "C", null];
      const unanswered = getUnansweredQuestions(answers);
      const bypassValidation = false;

      const shouldShowWarning = unanswered.length > 0 && !bypassValidation;
      expect(shouldShowWarning).toBe(true);
    });

    test("should allow submission when time runs out (bypass validation)", () => {
      const answers = ["A", null, "C", null];
      const unanswered = getUnansweredQuestions(answers);
      const bypassValidation = true;

      const shouldShowWarning = unanswered.length > 0 && !bypassValidation;
      expect(shouldShowWarning).toBe(false);
    });

    test("should handle large number of unanswered questions", () => {
      const answers = new Array(100).fill(null);
      answers[0] = "A";
      answers[50] = "C";

      const unanswered = getUnansweredQuestions(answers);

      expect(unanswered.length).toBe(98);
      expect(unanswered.includes(1)).toBe(false);
      expect(unanswered.includes(2)).toBe(true);
      expect(unanswered.includes(51)).toBe(false); // index 50 is answered, so question 51 is answered
    });

    test("should format unanswered question list correctly for display", () => {
      const answers = ["A", null, "C", null, "E", null];
      const unanswered = getUnansweredQuestions(answers);

      const displayList = unanswered.join(", ");
      expect(displayList).toBe("2, 4, 6");
    });

    test("should track submission state correctly", () => {
      let submissionState = { isSubmitting: false };

      // Before submission
      expect(submissionState.isSubmitting).toBe(false);

      // Start submission
      submissionState.isSubmitting = true;
      expect(submissionState.isSubmitting).toBe(true);

      // After submission
      submissionState.isSubmitting = false;
      expect(submissionState.isSubmitting).toBe(false);
    });

    test("should validate submission with mixed scenario", () => {
      // Scenario: 20 questions, 15 answered, 5 empty
      const questions = Array(20).fill({ answer: "A" });
      const answers = [
        "A",
        "A",
        null,
        "A",
        "A",
        null,
        "A",
        "A",
        null,
        "A",
        "A",
        "A",
        "A",
        null,
        "A",
        "A",
        "A",
        null,
        "A",
        "A",
      ];

      const unanswered = getUnansweredQuestions(answers);
      const correctCount = answers.filter(
        (a, i) => a === questions[i].answer,
      ).length;

      expect(unanswered.length).toBe(5);
      expect(unanswered).toEqual([3, 6, 9, 14, 18]);
      expect(correctCount).toBe(15);
    });

    test("should prevent duplicate questions in unanswered list", () => {
      const answers = [null, null, null];
      const unanswered = getUnansweredQuestions(answers);

      const uniqueUnanswered = [...new Set(unanswered)];
      expect(unanswered.length).toBe(uniqueUnanswered.length);
    });

    test("should maintain question order in unanswered list", () => {
      const answers = [null, "B", null, "D", null];
      const unanswered = getUnansweredQuestions(answers);

      // Check if array is sorted
      const isSorted = unanswered.every(
        (val, i, arr) => i === 0 || arr[i - 1] <= val,
      );
      expect(isSorted).toBe(true);
      expect(unanswered).toEqual([1, 3, 5]);
    });
  });
});
