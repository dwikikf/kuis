# 📚 Sistem Kuis Digital SDIT Al Hikmah

Aplikasi web modern untuk ujian dan kuis digital di SDIT Al Hikmah dengan antarmuka yang responsif, intuitif, dan terintegrasi dengan Google Apps Script.

## ✨ Fitur Utama

### 🎯 Antarmuka Pengguna

- **Splash Screen** - Tampilan pembuka yang menarik
- **Subject Selection** - Pemilihan mata pelajaran dengan desain kartu yang interaktif
- **Student Authentication** - Input data siswa (nama, kelas, tanggal ujian) dengan validasi
- **Exam Interface** - Tampilan ujian yang bersih dengan:
  - Progress bar real-time
  - Timer countdown
  - Navigasi soal (Previous/Next)
  - Display soal dan gambar
  - Opsi jawaban dengan visual feedback
- **Results Screen** - Hasil ujian dengan scoring otomatis dan statistik

### ⏱️ Manajemen Waktu

- Timer countdown otomatis untuk setiap mata pelajaran
- Auto-submit otomatis saat waktu habis
- Tampilan waktu tersisa dengan indikator visual
- Progress tracking selama ujian

### 🔒 Keamanan & Validasi

- **Secure Subject Access** - Kode keamanan untuk setiap mata pelajaran
- **Submission Validation** - Sistem validasi pengumpulan:
  - Memastikan semua soal sudah dijawab sebelum submit
  - Modal warning menampilkan nomor soal yang belum terjawab
  - User-friendly error messages
- **Local Storage** - Penyimpanan data sesi lokal

### 🎨 Desain & UX

- **Responsive Design** - Mendukung desktop, tablet, dan mobile
- **Custom Modal System** - Modal dialog untuk konfirmasi dan peringatan
- **Smooth Animations** - Fade-in, pulse, confetti, dan floating animations
- **Color-coded Subjects** - Setiap mata pelajaran memiliki tema warna unik
- **Modern Typography** - Font Poppins dan Nunito untuk tampilan profesional

### 📊 Fitur Administrasi

- **Multi-Subject Support** - Dukung berbagai mata pelajaran
- **Flexible Duration** - Waktu ujian dapat dikonfigurasi per mata pelajaran
- **Question Management** - Dukungan untuk:
  - Multiple choice questions
  - Pertanyaan dengan gambar
  - Bank soal terstruktur
- **Score Calculation** - Scoring otomatis dengan passing score (KBM) 75

### ☁️ Integrasi Backend

- **Google Apps Script Integration** - Pengiriman data ke Google Sheets
- **Web App URL** - Konfigurable endpoint untuk submission
- **Data Persistence** - Hasil ujian tersimpan di Google Sheets

## 📁 Struktur Project

```
kuis/
├── index.html                    # Main HTML interface
├── app.js                        # Core application logic (ES6 Module)
├── questions.js                  # Quiz data repository
├── config.js                     # Global configuration
├── appscript.gs                  # Google Apps Script backend
│
├── Test Files
├── app.test.js                   # Unit tests untuk app.js
├── questions.test.js             # Unit tests untuk questions.js
├── config.test.js                # Unit tests untuk config.js
├── appscript.test.js             # Unit tests untuk appscript.gs
├── concurrent.test.js            # Concurrent execution tests
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Jest setup
│
├── Configuration & Build
├── package.json                  # Dependencies & scripts
├── .babelrc                       # Babel configuration
├── .gitignore                     # Git ignore rules
│
├── Documentation
├── README.md                      # Dokumentasi ini
├── QUICK_START.md                # Panduan quick start
├── COMPLETION_REPORT.md          # Laporan penyelesaian fitur
├── SUBMISSION_VALIDATION.md      # Dokumentasi submission validation
├── IMPLEMENTATION_SUMMARY.md     # Ringkasan implementasi
├── TEST_README.md                # Panduan testing
├── README_TESTS.md               # Hasil tes
│
├── Images
└── images/                       # Gambar untuk soal ujian

```

## 🚀 Instalasi & Setup

### Prasyarat

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

### Langkah-langkah Instalasi

1. **Clone atau download repository**

   ```bash
   cd /path/to/kuis
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi aplikasi** - Edit `config.js`:

   ```javascript
   const CONFIG = {
     // URL Web App dari Google Apps Script Anda
     WEB_APP_URL: "https://script.google.com/macros/s/YOUR_APP_ID/exec",

     // Batas kelulusan minimal
     PASSING_SCORE: 75,

     // Storage keys
     STORAGE_KEYS: {
       STATE: "psaj_quiz_state",
     },
   };
   ```

4. **Jalankan aplikasi**
   - Buka `index.html` di browser, atau
   - Gunakan live server (VS Code extension, atau `python -m http.server`)

## 🎓 Cara Penggunaan

### Alur Ujian Siswa

1. **Splash Screen** → Klik "Mulai" atau tunggu auto-skip
2. **Pilih Mata Pelajaran** → Klik kartu pelajaran yang diinginkan
3. **Input Data Siswa**
   - Masukkan nama lengkap
   - Pilih/input kelas
   - Pilih tanggal ujian
   - Input kode keamanan mata pelajaran (dari guru)
4. **Mulai Ujian** → Tombol "Mulai Ujian" untuk memulai
5. **Kerjakan Soal**
   - Baca pertanyaan dengan seksama
   - Pilih salah satu jawaban (A/B/C/D)
   - Navigasi dengan Previous/Next
   - Timer menghitung mundur
6. **Validasi & Submit**
   - Jika ada soal yang belum terjawab, muncul warning
   - Modal menunjukkan nomor soal yang kosong
   - Isi semua soal sebelum submit
   - Atau tunggu timer habis untuk auto-submit
7. **Lihat Hasil**
   - Skor total dan status kelulusan
   - Jumlah jawaban benar/salah
   - Waktu yang digunakan
   - Tombol "Kembali ke Beranda" untuk mengulang/pilih mapel lain

## 📝 Struktur Data Soal

Setiap mata pelajaran didefinisikan dalam `questions.js` dengan format:

```javascript
{
  id: "PKN",                              // ID unik mata pelajaran
  title: "Pendidikan Kewarganegaraan",    // Nama mata pelajaran
  classDefault: "Kelas 6 (Aqaba)",        // Kelas default
  duration: 90,                           // Durasi ujian (menit)
  theme: "from-red-500 to-orange-500",    // Tailwind color gradient
  secure: "8813",                         // Kode keamanan
  questions: [
    {
      q: "Pertanyaan soal",
      options: [
        "Opsi A",
        "Opsi B",
        "Opsi C",
        "Opsi D",
      ],
      answer: "B",                        // Jawaban yang benar
      img: "filename.webp",               // (Optional) Gambar
    },
    // ... soal lainnya
  ]
}
```

### Menambah Soal Baru

1. Buka `questions.js`
2. Tambahkan object pertanyaan ke array `questions` pada subject yang sesuai:
   ```javascript
   {
     q: "Pertanyaan baru",
     options: ["A", "B", "C", "D"],
     answer: "C",
     img: "optional-image.webp"  // Hanya jika ada gambar
   }
   ```
3. Untuk gambar, letakkan di folder `images/`
4. Refresh aplikasi atau build ulang

## ⚙️ Konfigurasi

### File Konfigurasi (`config.js`)

```javascript
WEB_APP_URL; // URL endpoint Google Apps Script untuk submission
PASSING_SCORE; // Batas minimal kelulusan (default: 75)
STORAGE_KEYS; // Kunci untuk local storage
```

### Tailwind CSS Configuration

Styling menggunakan Tailwind CSS CDN (v3.4.17) dan custom animations:

- Fade-in
- Pulse-glow
- Confetti
- Floating

## 🧪 Testing

Sistem ini dilengkapi dengan comprehensive test suite menggunakan Jest.

### Menjalankan Tests

```bash
# Run semua test
npm test

# Run test dengan watch mode
npm run test:watch

# Run test dengan coverage report
npm run test:coverage

# Run concurrent tests
npm run test:concurrent

# Run semua test dengan verbose
npm run test:all
```

### File Test

- **`app.test.js`** - 40+ test cases untuk logika aplikasi
- **`questions.test.js`** - Test untuk data soal
- **`config.test.js`** - Test untuk konfigurasi
- **`appscript.test.js`** - Test untuk Google Apps Script
- **`concurrent.test.js`** - Test untuk concurrent execution

### Coverage

Proyek ini memiliki comprehensive coverage untuk:

- Application state management
- Timer functionality
- Subject selection
- Answer validation
- Result calculation
- Modal interactions
- Event handling

## 🔗 Integrasi Google Apps Script

### Setup Backend

1. **Buat Google Apps Script project**

   ```bash
   # File: appscript.gs
   # Definisikan function untuk handle submission:
   function doPost(e) {
     // Handle POST request dari aplikasi
     // Simpan ke Google Sheets
   }
   ```

2. **Deploy sebagai Web App**
   - Deploy → New deployment
   - Type: Web app
   - Execute as: Anda
   - Who has access: Anyone

3. **Copy Web App URL ke config.js**

   ```javascript
   WEB_APP_URL: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
   ```

4. **Test submission**
   - Mulai ujian
   - Submit ujian
   - Cek Google Sheets untuk memastikan data tersimpan

## 🐛 Troubleshooting

### Masalah Umum

| Masalah                  | Solusi                                                                           |
| ------------------------ | -------------------------------------------------------------------------------- |
| Gambar soal tidak muncul | Pastikan file ada di folder `images/` dan nama filename sesuai di `questions.js` |
| Timer tidak berjalan     | Refresh halaman, clear browser cache, cek console untuk error                    |
| Submit tidak berhasil    | Cek URL Google Apps Script di `config.js`, pastikan Web App sudah di-deploy      |
| Data tidak terisi semua  | Modal akan menampilkan soal mana yang kosong, isi soal tersebut terlebih dahulu  |
| Styling berantakan       | Pastikan koneksi internet stabil (Tailwind CSS dan font dari CDN)                |

### Debugging

Buka Developer Tools (F12) dan:

1. Cek Console untuk error messages
2. Cek Network tab untuk request ke Google Apps Script
3. Cek Application → Local Storage untuk state data
4. Cek Elements untuk DOM structure

## 📊 Scoring & Results

### Perhitungan Skor

```
Skor Total = (Jumlah Jawaban Benar / Total Soal) × 100
Status = Skor >= PASSING_SCORE (75) ? "LULUS" : "BELUM LULUS"
```

### Data Hasil

Hasil ujian mencakup:

- Nama dan kelas siswa
- Mata pelajaran
- Skor total
- Jumlah jawaban benar/salah
- Waktu yang digunakan
- Tanggal ujian
- Status kelulusan

## 🌍 Browser Support

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- **Desktop** (1024px+) - Layout optimized
- **Tablet** (768px - 1023px) - Touch-friendly
- **Mobile** (< 768px) - Full responsive

## 🎯 Submitting Results

Ketika siswa submit ujian:

1. Sistem mengvalidasi semua soal sudah dijawab
2. Hitung skor final
3. Kirim data ke Google Apps Script:
   ```javascript
   {
     studentName: "Nama Siswa",
     studentClass: "Kelas 6",
     subject: "PKN",
     score: 85,
     correct: 17,
     wrong: 3,
     timeUsed: "45 menit",
     examDate: "2024-01-15",
     status: "LULUS"
   }
   ```
4. Data tersimpan di Google Sheets
5. Tampilkan hasil di layar

## 📚 Resources & References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Apps Script](https://developers.google.com/apps-script)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Babel Documentation](https://babeljs.io/)

## 📄 File Dokumentasi Tambahan

- **[QUICK_START.md](QUICK_START.md)** - Panduan cepat untuk memulai
- **[TEST_README.md](TEST_README.md)** - Detail tentang testing
- **[COMPLETION_REPORT.md](COMPLETION_REPORT.md)** - Laporan penyelesaian
- **[SUBMISSION_VALIDATION.md](SUBMISSION_VALIDATION.md)** - Detil validasi submission
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Ringkasan implementasi

## 👥 Kontribusi

Untuk berkontribusi atau melaporkan bug:

1. Buat issue dengan deskripsi jelas
2. Buat pull request dengan perubahan yang jelas
3. Pastikan semua test lolos

## 📜 Lisensi

MIT License - Gratis digunakan untuk tujuan pendidikan dan komersial

## ✅ Checklist Implementasi

- ✅ Core quiz engine dengan state management
- ✅ Multi-subject support
- ✅ Responsive design dengan Tailwind CSS
- ✅ Custom modal system
- ✅ Timer countdown dengan auto-submit
- ✅ Submission validation
- ✅ Google Apps Script integration
- ✅ Comprehensive test suite (50+ test cases)
- ✅ Result scoring dan display
- ✅ Complete documentation

## 📞 Support

Untuk pertanyaan atau dukungan:

- Buka issue di repository
- Cek dokumentasi yang sudah tersedia
- Lihat console browser untuk error messages

---

**Versi:** 1.0.0  
**Terakhir diupdate:** 2024  
**Status:** ✅ Production Ready

Dibuat dengan ❤️ untuk SDIT Al Hikmah
