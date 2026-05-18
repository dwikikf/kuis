# Submission Validation Feature

## Deskripsi Fitur Baru

Sistem validasi pengumpulan ujian yang mencegah siswa mengumpulkan jawaban sebelum semua soal dijawab. Fitur ini memberikan feedback yang jelas tentang soal mana yang belum dijawab.

## Mekanisme Kerja

### 1. Tombol Submit Tetap Aktif

- Tombol "KUMPULKAN JAWABAN" tidak pernah di-disable
- User selalu bisa mengklik tombol kapan saja

### 2. Validasi Saat Submit Diklik

Ketika user klik tombol submit:

- **Jika ADA soal yang belum terjawab**:
  - Tampilkan modal dengan daftar nomor soal yang belum dijawab
  - Modal menampilkan daftar soal dalam bentuk badge yang jelas
  - User hanya bisa menutup modal (tombol "Kumpulkan" tidak ditampilkan)
  - User harus kembali dan isi soal yang belum
- **Jika SEMUA soal sudah terjawab**:
  - Tampilkan modal konfirmasi normal
  - User bisa langsung kumpulkan jawaban

### 3. Auto-Submit Saat Waktu Habis

Ketika timer mencapai 0:

- Validasi di-bypass (bypassValidation = true)
- Sistem langsung menampilkan modal waktu habis
- Lembar jawaban otomatis dikirim tanpa validasi

## Perubahan Kode

### File: `app.js`

#### Fungsi Baru: `getUnansweredQuestions()`

```javascript
function getUnansweredQuestions() {
  const unanswered = [];
  state.answers.forEach((answer, index) => {
    if (answer === null) {
      unanswered.push(index + 1); // 1-indexed for display
    }
  });
  return unanswered;
}
```

- Mengidentifikasi soal mana saja yang belum dijawab
- Return array dengan nomor soal (1-indexed)

#### Fungsi Modifikasi: `triggerFinalSubmissionConfirmation()`

```javascript
function triggerFinalSubmissionConfirmation(bypassValidation = false)
```

- Parameter baru: `bypassValidation` untuk auto-submit saat waktu habis
- Logika baru:
  - Cek unanswered questions
  - Jika ada yang belum dan bukan bypass → show warning modal dengan daftar soal
  - Jika semua sudah dijawab atau bypass → show confirmation modal

#### Fungsi Baru: `openCustomModalWithUnanswered()`

- Modal khusus untuk menampilkan daftar soal belum terjawab
- Menampilkan nomor soal dalam badge merah yang eye-catching
- Menyembunyikan tombol "Ya, Kumpulkan"
- Menampilkan tombol "Kembali Isi Soal"

#### Modifikasi: Timer Engine

```javascript
if (state.timeLeft <= 0) {
  clearInterval(state.timerInterval);
  showCustomToast("Waktu habis! Lembar jawaban dikirim otomatis.", "info");
  triggerFinalSubmissionConfirmation(true); // bypassValidation = true
  return;
}
```

#### Modifikasi: `openCustomModal()`

- Reset button state untuk modal normal
- Menampilkan kembali tombol "Ya, Kumpulkan"

### File: `app.test.js`

#### Test Suite Baru: "Submission Validation - New Feature"

13 test cases untuk validasi:

1. Identifikasi unanswered questions
2. Empty array saat semua terjawab
3. Daftar lengkap saat tidak ada yang terjawab
4. Allow submission saat semua terjawab
5. Block submission saat ada yang belum terjawab
6. Bypass validation saat waktu habis
7. Handle banyak soal unanswered
8. Format daftar untuk display
9. Track submission state
10. Skenario mixed (15 terjawab, 5 kosong dari 20)
11. Prevent duplicate soal
12. Maintain order soal

## Contoh User Flow

### Scenario 1: User coba submit dengan soal belum lengkap

```
1. User klik "KUMPULKAN JAWABAN"
2. Sistem cek: Ada soal #3, #6, #9 yang belum dijawab
3. Modal muncul dengan pesan:
   "❌ Jawaban Belum Lengkap!
    Soal yang belum dijawab: 3, 6, 9
    Mohon isi semua soal sebelum mengumpulkan jawaban Anda."
4. Tombol "Ya, Kumpulkan" TIDAK ditampilkan
5. User klik "Kembali Isi Soal" untuk menutup modal
6. User bisa navigasi ke soal #3, #6, #9 dan menjawabnya
```

### Scenario 2: User submit dengan semua soal terjawab

```
1. User klik "KUMPULKAN JAWABAN"
2. Sistem cek: Semua soal sudah terjawab
3. Modal konfirmasi normal muncul:
   "Kumpulkan Ujian?
    Apakah kamu yakin sudah selesai dan ingin mengumpulkan..."
4. Tombol "Ya, Kumpulkan" ditampilkan
5. User klik "Ya, Kumpulkan"
6. Jawaban dikirim ke server
```

### Scenario 3: Waktu habis

```
1. Timer mencapai 0
2. Toast muncul: "Waktu habis! Lembar jawaban dikirim otomatis."
3. Modal muncul: "Waktu Habis!"
4. Jawaban dikirim otomatis (bypass validation)
5. Layar result ditampilkan
```

## Backward Compatibility

✅ Semua fitur yang sudah ada TETAP BERFUNGSI:

- Seleksi mata pelajaran
- Verifikasi keamanan
- Navigasi soal
- Timer countdown
- Session restore
- Score calculation
- Result display
- Cursor particles
- Security features

## Testing

Semua test suite PASS:

- `config.test.js`: ✅
- `appscript.test.js`: ✅
- `app.test.js`: ✅ (53 tests, termasuk 13 test baru)
- `concurrent.test.js`: ✅
- `questions.test.js`: ✅

**Total: 123 tests passed**

## UX Improvements

1. **Clear Feedback**: User tahu persis soal mana yang belum
2. **User-Friendly**: Tombol tidak di-disable, modal informatif
3. **Progressive Enhancement**: Gradual warning sebelum auto-submit
4. **Accessibility**: Visual indicators yang jelas dengan warna dan icon

## Browser Compatibility

Fitur ini kompatibel dengan semua browser modern yang support ES6+ dan DOM manipulation API.

## Future Enhancements

Kemungkinan pengembangan:

- Highlight soal yang belum dijawab di question navigator
- Shortcut ke soal yang belum dijawab dari modal
- Sound notification untuk soal belum lengkap
- Progress indicator lebih detail (X/Y soal terjawab)
