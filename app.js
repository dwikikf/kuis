// app.js - Core Engine Web Application dengan Custom Messaging Box
import CONFIG from "./config.js";
import QUIZ_DATA from "./questions.js";

let state = {
  selectedSubject: null,
  currentQuestionIndex: 0,
  answers: [],
  timeLeft: 0,
  timerInterval: null,
  studentName: "",
  studentClass: "",
  examDate: "",
  isSubmitting: false,
  pendingSubjectId: null, // For pending secure confirmation
};

// Callback untuk menampung fungsi aksi modal konfirmasi
let modalConfirmCallback = null;
let pendingSecureConfirmCallback = null;

const DOM = {
  screenSubjects: document.getElementById("screen-subjects"),
  screenAuth: document.getElementById("screen-auth"),
  screenExam: document.getElementById("screen-exam"),
  screenResult: document.getElementById("screen-result"),
  subjectsContainer: document.getElementById("subjects-container"),
  authSubjectBadge: document.getElementById("auth-subject-badge"),
  displayMapel: document.getElementById("display-mapel"),
  inputNama: document.getElementById("input-nama"),
  inputKelas: document.getElementById("input-kelas"),
  inputTanggal: document.getElementById("input-tanggal"),
  btnBackSubjects: document.getElementById("btn-back-subjects"),
  btnStartExam: document.getElementById("btn-start-exam"),
  subjectRulesFooter: document.getElementById("subject-rules-footer"),
  examStudentName: document.getElementById("exam-student-name"),
  examSubjectTitle: document.getElementById("exam-subject-title"),
  timerText: document.getElementById("timer-text"),
  timerDisplay: document.getElementById("timer-display"),
  progressText: document.getElementById("progress-text"),
  progressFill: document.getElementById("progress-fill"),
  qNumberBadge: document.getElementById("q-number-badge"),
  qText: document.getElementById("q-text"),
  qImageContainer: document.getElementById("q-image-container"),
  qOptions: document.getElementById("q-options"),
  btnPrev: document.getElementById("btn-prev"),
  btnNext: document.getElementById("btn-next"),
  qNav: document.getElementById("q-nav"),
  btnSubmitExam: document.getElementById("btn-submit-exam"),
  loadingOverlay: document.getElementById("loading-overlay"),
  resultHeader: document.getElementById("result-header"),
  resultIcon: document.getElementById("result-icon"),
  resultSubjectLabel: document.getElementById("result-subject-label"),
  resultScore: document.getElementById("result-score"),
  resultCorrect: document.getElementById("result-correct"),
  resultWrong: document.getElementById("result-wrong"),
  resultEmpty: document.getElementById("result-empty"),
  resultName: document.getElementById("result-name"),
  resultClass: document.getElementById("result-class"),
  resultTime: document.getElementById("result-time"),
  resultStatus: document.getElementById("result-status"),
  btnHome: document.getElementById("btn-home"),
  // DOM Custom Modal
  customModal: document.getElementById("custom-modal"),
  modalCard: document.getElementById("modal-card"),
  modalTitle: document.getElementById("modal-title"),
  modalDesc: document.getElementById("modal-desc"),
  modalIconBox: document.getElementById("modal-icon-box"),
  modalBtnCancel: document.getElementById("modal-btn-cancel"),
  modalBtnConfirm: document.getElementById("modal-btn-confirm"),

  // DOM Secure Modal
  secureModal: document.getElementById("secure-modal"),
  secureModalCard: document.getElementById("secure-modal-card"),
  secureModalTitle: document.getElementById("secure-modal-title"),
  secureModalDesc: document.getElementById("secure-modal-desc"),
  secureModalInput: document.getElementById("secure-modal-input"),
  secureModalError: document.getElementById("secure-modal-error"),
  secureModalErrorText: document.getElementById("secure-modal-error-text"),
  secureModalBtnCancel: document.getElementById("secure-modal-btn-cancel"),
  secureModalBtnConfirm: document.getElementById("secure-modal-btn-confirm"),
  toastContainer: document.getElementById("toast-container"),
};

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  setupSecurity();
});

function initApp() {
  DOM.inputTanggal.valueAsDate = new Date();
  renderSubjectsGrid();
  setupEventListeners();
  tryRestoreSession();
}

function renderSubjectsGrid() {
  DOM.subjectsContainer.innerHTML = QUIZ_DATA.map(
    (subj) => `
        <div class="bg-white rounded-2xl shadow-xl p-6 cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all transform hover:scale-[1.02]" data-id="${subj.id}">
            <div class="flex justify-between items-center mb-3">
                <span class="bg-gradient-to-r ${subj.theme} text-white px-3 py-1 rounded-full text-xs font-bold">${subj.id}</span>
                <span class="text-xs text-gray-400 font-bold">⏱️ ${subj.duration} Menit</span>
            </div>
            <h3 class="title-font text-gray-800 font-bold text-lg">${subj.title}</h3>
            <p class="text-xs text-gray-500 mt-1">Total: ${subj.questions.length} Soal Pilihan Ganda</p>
        </div>
    `,
  ).join("");

  DOM.subjectsContainer.querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const subjectId = card.getAttribute("data-id");
      showSecureConfirmation(subjectId);
    });
  });
}

function selectSubject(id) {
  const subj = QUIZ_DATA.find((s) => s.id === id);
  if (!subj) return;

  state.selectedSubject = subj;
  DOM.displayMapel.value = subj.id;
  DOM.inputKelas.value = subj.classDefault;
  DOM.authSubjectBadge.className = `inline-block bg-gradient-to-r ${subj.theme} text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg`;
  DOM.authSubjectBadge.textContent = subj.title;
  DOM.subjectRulesFooter.textContent = `⏱️ Waktu pengerjaan: ${subj.duration} menit | 📝 ${subj.questions.length} soal pilihan ganda`;

  DOM.screenSubjects.classList.add("hidden");
  DOM.screenAuth.classList.remove("hidden");
  lucide.createIcons();
}

function setupEventListeners() {
  DOM.btnBackSubjects.addEventListener("click", () => {
    DOM.screenAuth.classList.add("hidden");
    DOM.screenSubjects.classList.remove("hidden");
  });

  DOM.btnStartExam.addEventListener("click", () => {
    state.studentName = DOM.inputNama.value.trim();
    state.studentClass = DOM.inputKelas.value.trim();
    state.examDate = DOM.inputTanggal.value;

    if (!state.studentName) {
      showCustomToast("Mohon isi nama lengkap!", "warning");
      return;
    }
    if (!state.studentClass) {
      showCustomToast("Mohon isi kelas!", "warning");
      return;
    }
    if (!state.examDate) {
      showCustomToast("Mohon isi tanggal!", "warning");
      return;
    }

    state.answers = new Array(state.selectedSubject.questions.length).fill(
      null,
    );
    state.timeLeft = state.selectedSubject.duration * 60;
    state.currentQuestionIndex = 0;

    startExamEnvironment();
  });

  DOM.btnPrev.addEventListener("click", () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderQuestion();
    }
  });

  DOM.btnNext.addEventListener("click", () => {
    if (
      state.currentQuestionIndex <
      state.selectedSubject.questions.length - 1
    ) {
      state.currentQuestionIndex++;
      renderQuestion();
    } else {
      triggerFinalSubmissionConfirmation();
    }
  });

  DOM.btnSubmitExam.addEventListener("click", () =>
    triggerFinalSubmissionConfirmation(),
  );
  DOM.btnHome.addEventListener("click", () => resetToLandingScreen());

  // Listener Tombol Custom Modal
  DOM.modalBtnCancel.addEventListener("click", () => closeCustomModal());
  DOM.modalBtnConfirm.addEventListener("click", () => {
    if (modalConfirmCallback) modalConfirmCallback();
    closeCustomModal();
  });

  // Listener Tombol Secure Modal
  DOM.secureModalBtnCancel.addEventListener("click", () => closeSecureModal());
  DOM.secureModalBtnConfirm.addEventListener("click", () => {
    validateSecureCode();
  });

  // Allow Enter key to trigger validation
  DOM.secureModalInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      validateSecureCode();
    }
  });
}

function startExamEnvironment() {
  DOM.screenAuth.classList.add("hidden");
  DOM.screenExam.classList.remove("hidden");
  DOM.examStudentName.textContent = state.studentName;
  DOM.examSubjectTitle.textContent = state.selectedSubject.title;

  buildQuestionNavigator();
  renderQuestion();
  startTimerEngine();
  requestFullscreen();
  saveSessionState();
}

function startTimerEngine() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      showCustomToast("Waktu habis! Lembar jawaban dikirim otomatis.", "info");
      processFinalSubmission();
      return;
    }

    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    DOM.timerText.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    if (state.timeLeft <= 300) {
      DOM.timerDisplay.className =
        "flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-xl font-extrabold timer-warning";
    } else if (state.timeLeft <= 900) {
      DOM.timerDisplay.className =
        "flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-xl font-extrabold";
    } else {
      DOM.timerDisplay.className =
        "flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl font-extrabold";
    }

    if (state.timeLeft % 10 === 0) saveSessionState();
  }, 1000);
}

function renderQuestion() {
  const qCount = state.selectedSubject.questions.length;
  const q = state.selectedSubject.questions[state.currentQuestionIndex];

  DOM.qNumberBadge.textContent = `SOAL ${String(state.currentQuestionIndex + 1).padStart(2, "0")}`;
  DOM.qText.textContent = q.q;

  if (q.img) {
    DOM.qImageContainer.innerHTML = `
      <div class="mt-4 mb-4 flex justify-center">
        <img src="images/${q.img}" 
             alt="Gambar Soal" 
             class="rounded-xl border border-slate-200 max-h-64 object-contain shadow-sm bg-white p-2">
      </div>
    `;
    DOM.qImageContainer.classList.remove("hidden");
  } else {
    DOM.qImageContainer.innerHTML = "";
    DOM.qImageContainer.classList.add("hidden");
  }

  const letters = ["A", "B", "C", "D"];
  const pillColors = [
    "from-blue-500 to-indigo-500",
    "from-emerald-500 to-green-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
  ];

  DOM.qOptions.innerHTML = q.options
    .map((opt, i) => {
      const isSelected =
        state.answers[state.currentQuestionIndex] === letters[i];
      return `
            <div class="option-card cursor-pointer rounded-2xl p-4 border-2 flex items-center gap-3 transition-all ${isSelected ? "border-indigo-600 bg-indigo-50/60 option-selected shadow-sm" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 bg-white"}" data-ans="${letters[i]}">
                <span class="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br ${pillColors[i]} text-white flex items-center justify-center font-bold text-xs shadow">${letters[i]}</span>
                <span class="text-slate-700 font-medium text-sm md:text-base">${opt}</span>
            </div>
        `;
    })
    .join("");

  DOM.qOptions.querySelectorAll("[data-ans]").forEach((card) => {
    card.addEventListener("click", () => {
      state.answers[state.currentQuestionIndex] = card.getAttribute("data-ans");
      saveSessionState();
      renderQuestion();
    });
  });

  DOM.btnPrev.style.visibility =
    state.currentQuestionIndex === 0 ? "hidden" : "visible";

  if (state.currentQuestionIndex === qCount - 1) {
    DOM.btnNext.innerHTML =
      'Selesai <i data-lucide="check-circle" class="w-4 h-4"></i>';
  } else {
    DOM.btnNext.innerHTML =
      'Selanjutnya <i data-lucide="chevron-right" class="w-4 h-4"></i>';
  }

  updateProgressUI();
  updateQuestionNavigatorUI();
  lucide.createIcons();
}

function buildQuestionNavigator() {
  DOM.qNav.innerHTML = state.selectedSubject.questions
    .map(
      (_, i) => `
        <button id="nav-${i}" class="w-full aspect-square rounded-xl text-xs font-bold bg-slate-50 text-slate-500 border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            ${i + 1}
        </button>
    `,
    )
    .join("");

  DOM.qNav.querySelectorAll("button").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      state.currentQuestionIndex = i;
      renderQuestion();
    });
  });
}

function updateQuestionNavigatorUI() {
  state.selectedSubject.questions.forEach((_, i) => {
    const btn = document.getElementById(`nav-${i}`);
    if (!btn) return;
    if (i === state.currentQuestionIndex) {
      btn.className =
        "w-full aspect-square rounded-xl text-xs font-black bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-100 border-0";
    } else if (state.answers[i]) {
      btn.className =
        "w-full aspect-square rounded-xl text-xs font-bold bg-emerald-500 text-white border-0 shadow-sm shadow-emerald-50";
    } else {
      btn.className =
        "w-full aspect-square rounded-xl text-xs font-bold bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100 transition-colors";
    }
  });
}

function updateProgressUI() {
  const total = state.selectedSubject.questions.length;
  const answered = state.answers.filter((a) => a !== null).length;
  DOM.progressText.textContent = `${answered}/${total}`;
  DOM.progressFill.style.width = `${(answered / total) * 100}%`;
}

// MANAGEMENT ENGINE MODAL KUSTOM
function openCustomModal(title, description, isWarning, onConfirm) {
  DOM.modalTitle.textContent = title;
  DOM.modalDesc.textContent = description;
  modalConfirmCallback = onConfirm;

  if (isWarning) {
    DOM.modalIconBox.className =
      "w-14 h-14 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-center text-red-500 mb-4";
    DOM.modalIconBox.innerHTML =
      '<i data-lucide="alert-triangle" class="w-7 h-7"></i>';
  } else {
    DOM.modalIconBox.className =
      "w-14 h-14 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center text-amber-500 mb-4";
    DOM.modalIconBox.innerHTML =
      '<i data-lucide="help-circle" class="w-7 h-7"></i>';
  }

  DOM.customModal.classList.remove("hidden");
  setTimeout(() => DOM.modalCard.classList.remove("scale-95"), 10);
  lucide.createIcons();
}

function closeCustomModal() {
  DOM.modalCard.classList.add("scale-95");
  setTimeout(() => {
    DOM.customModal.classList.add("hidden");
    modalConfirmCallback = null;
  }, 150);
}

function showSecureConfirmation(subjectId) {
  const subject = QUIZ_DATA.find((s) => s.id === subjectId);
  if (!subject) return;

  state.pendingSubjectId = subjectId;
  DOM.secureModalTitle.textContent = `Verifikasi ${subject.title}`;
  DOM.secureModalInput.value = "";
  DOM.secureModalError.classList.add("hidden");
  DOM.secureModalInput.focus();

  DOM.secureModal.classList.remove("hidden");
  setTimeout(() => DOM.secureModalCard.classList.remove("scale-95"), 10);
  lucide.createIcons();
}

function closeSecureModal() {
  DOM.secureModalCard.classList.add("scale-95");
  setTimeout(() => {
    DOM.secureModal.classList.add("hidden");
    state.pendingSubjectId = null;
  }, 150);
}

function validateSecureCode() {
  const subject = QUIZ_DATA.find((s) => s.id === state.pendingSubjectId);
  if (!subject) return;

  const inputCode = DOM.secureModalInput.value.trim();
  const correctCode = subject.secure;

  if (inputCode === correctCode) {
    closeSecureModal();
    selectSubject(state.pendingSubjectId);
  } else {
    DOM.secureModalError.classList.remove("hidden");
    DOM.secureModalErrorText.textContent = "Kode keamanan salah! Coba lagi.";
    DOM.secureModalInput.classList.add("border-red-400", "bg-red-50");
    DOM.secureModalInput.value = "";

    setTimeout(() => {
      DOM.secureModalInput.classList.remove("border-red-400", "bg-red-50");
      DOM.secureModalInput.focus();
    }, 1500);
  }
}

// MANAGEMENT ENGINE TOAST KUSTOM
function showCustomToast(message, type = "info") {
  const toast = document.createElement("div");
  let bgClass = "bg-white border-slate-100 text-slate-700";
  let icon = "info";

  if (type === "warning") {
    bgClass = "bg-amber-50 border-amber-200 text-amber-800";
    icon = "alert-circle";
  } else if (type === "error") {
    bgClass = "bg-rose-50 border-rose-200 text-rose-800";
    icon = "x-circle";
  } else if (type === "success") {
    bgClass = "bg-emerald-50 border-emerald-200 text-emerald-800";
    icon = "check-circle";
  }

  toast.className = `flex items-center gap-3 p-4 rounded-2xl border shadow-xl transition-all duration-300 transform translate-y-2 opacity-0 text-sm font-semibold pointer-events-auto ${bgClass}`;
  toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i> <span>${message}</span>`;

  DOM.toastContainer.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("opacity-0", "-translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function triggerFinalSubmissionConfirmation() {
  const unanswered = state.answers.filter((a) => a === null).length;
  let title = "Kumpulkan Ujian?";
  let desc =
    "Apakah kamu yakin sudah selesai dan ingin mengumpulkan seluruh lembar jawaban sekarang?";
  let isWarning = false;

  if (unanswered > 0) {
    title = "Jawaban Belum Lengkap!";
    desc = `Perhatian! Masih ada ${unanswered} nomor soal yang kosong belum kamu isi. Kamu yakin ingin mengumpulkannya sekarang?`;
    isWarning = true;
  }

  openCustomModal(title, desc, isWarning, () => {
    processFinalSubmission();
  });
}

function processFinalSubmission() {
  if (state.isSubmitting) return;
  state.isSubmitting = true;

  clearInterval(state.timerInterval);
  DOM.loadingOverlay.classList.remove("hidden");

  let correct = 0,
    wrong = 0,
    empty = 0;
  state.selectedSubject.questions.forEach((q, i) => {
    if (!state.answers[i]) empty++;
    else if (state.answers[i] === q.answer) correct++;
    else wrong++;
  });

  const totalQ = state.selectedSubject.questions.length;
  const score = Math.round((correct / totalQ) * 100);
  const timeUsedSeconds = state.selectedSubject.duration * 60 - state.timeLeft;
  const mUsed = Math.floor(timeUsedSeconds / 60);
  const sUsed = timeUsedSeconds % 60;

  const payloadData = {
    pelajaran: state.selectedSubject.id,
    nama: state.studentName,
    kelas: state.studentClass,
    tanggal: state.examDate,
    nilai: score,
  };

  fetch(CONFIG.WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadData),
  })
    .then(() => {
      DOM.loadingOverlay.classList.add("hidden");
      renderResultView(
        score,
        correct,
        wrong,
        empty,
        `${mUsed} menit ${sUsed} detik`,
      );
      localStorage.removeItem(CONFIG.STORAGE_KEYS.STATE);
    })
    .catch((err) => {
      console.error("Gagal mengirim data:", err);
      DOM.loadingOverlay.classList.add("hidden");
      renderResultView(
        score,
        correct,
        wrong,
        empty,
        `${mUsed} menit ${sUsed} detik`,
      );
    });
}

function renderResultView(score, correct, wrong, empty, timeLabel) {
  DOM.screenExam.classList.add("hidden");
  DOM.screenResult.classList.remove("hidden");

  DOM.resultScore.textContent = score;
  DOM.resultCorrect.textContent = correct;
  DOM.resultWrong.textContent = wrong;
  DOM.resultEmpty.textContent = empty;
  DOM.resultName.textContent = state.studentName;
  DOM.resultClass.textContent = state.studentClass;
  DOM.resultTime.textContent = timeLabel;
  DOM.resultSubjectLabel.textContent = `${state.selectedSubject.title} - ${state.selectedSubject.id}`;

  if (score >= CONFIG.PASSING_SCORE) {
    DOM.resultHeader.className =
      "bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white";
    DOM.resultIcon.textContent = "🎉";
    DOM.resultStatus.className =
      "p-3 rounded-xl text-center text-sm font-semibold bg-green-100 text-green-700";
    DOM.resultStatus.textContent = "✅ LULUS - Selamat!";
    createConfettiParticles();
  } else {
    DOM.resultHeader.className =
      "bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white";
    DOM.resultIcon.textContent = "💪";
    DOM.resultStatus.className =
      "p-3 rounded-xl text-center text-sm font-semibold bg-orange-100 text-orange-700";
    DOM.resultStatus.textContent = "⚠️ BELUM TUNTAS - Tetap semangat belajar!";
  }
  exitFullscreen();
}

function saveSessionState() {
  if (DOM.screenExam.classList.contains("hidden")) return;
  const cacheData = {
    selectedSubjectId: state.selectedSubject.id,
    answers: state.answers,
    timeLeft: state.timeLeft,
    studentName: state.studentName,
    studentClass: state.studentClass,
    examDate: state.examDate,
    currentQuestionIndex: state.currentQuestionIndex,
  };
  localStorage.setItem(CONFIG.STORAGE_KEYS.STATE, JSON.stringify(cacheData));
}

function tryRestoreSession() {
  const raw = localStorage.getItem(CONFIG.STORAGE_KEYS.STATE);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (saved && saved.selectedSubjectId) {
      const subj = QUIZ_DATA.find((s) => s.id === saved.selectedSubjectId);
      if (!subj) return;

      state.selectedSubject = subj;
      state.answers = saved.answers;
      state.timeLeft = saved.timeLeft;
      state.studentName = saved.studentName;
      state.studentClass = saved.studentClass;
      state.examDate = saved.examDate;
      state.currentQuestionIndex = saved.currentQuestionIndex || 0;

      showCustomToast(
        "Menyambung kembali sesi pengerjaan terakhir...",
        "success",
      );
      startExamEnvironment();
    }
  } catch (e) {
    console.error(e);
  }
}

function setupSecurity() {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("copy", (e) => e.preventDefault());
  document.addEventListener("paste", (e) => e.preventDefault());

  window.addEventListener("blur", () => {
    if (!DOM.screenExam.classList.contains("hidden")) {
      showCustomToast(
        "⚠️ Peringatan: Jangan membuka tab atau jendela aplikasi lain!",
        "warning",
      );
    }
  });
}

function resetToLandingScreen() {
  clearInterval(state.timerInterval);
  localStorage.removeItem(CONFIG.STORAGE_KEYS.STATE);
  state = {
    selectedSubject: null,
    currentQuestionIndex: 0,
    answers: [],
    timeLeft: 0,
    timerInterval: null,
    studentName: "",
    studentClass: "",
    examDate: "",
    isSubmitting: false,
  };
  DOM.inputNama.value = "";
  DOM.screenResult.classList.add("hidden");
  DOM.screenSubjects.classList.remove("hidden");
  renderSubjectsGrid();
}

function toggleLoadingOverlay(show) {
  if (show) DOM.loadingOverlay.classList.remove("hidden");
  else DOM.loadingOverlay.classList.add("hidden");
}

function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
}

function exitFullscreen() {
  if (document.fullscreenElement && document.exitFullscreen)
    document.exitFullscreen().catch(() => {});
}

function createConfettiParticles() {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
  ];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = "-10px";
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    p.style.animationDelay = Math.random() * 1.5 + "s";
    p.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 4000);
  }
}
