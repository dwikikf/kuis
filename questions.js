// questions.js - Repositori Data Ujian & Soal (Multi-Mapel)
const QUIZ_DATA = [
  {
    id: "PKN", // Ini akan menjadi nama Sheet di Google Sheets kamu
    title: "Pendidikan Pancasila", // Ditampilkan di UI Web
    classDefault: "Kelas 6 (Aqaba)",
    duration: 90, // Dalam satuan menit
    theme: "from-red-500 to-orange-500", // Warna aksen badge judul
    questions: [
      {
        q: "Rumusan Pancasila yang sah dan otentik terkandung dalam Pembukaan UUD 1945 alinea ke...",
        options: ["Kesatu", "Kedua", "Ketiga", "Keempat"],
        answer: "D", // Menggunakan indeks huruf A, B, C, D
      },
      {
        q: "Sikap yang sesuai dengan pengamalan sila ketiga Pancasila di lingkungan sekolah adalah...",
        options: [
          "Memilih-milih teman dalam bergaul",
          "Bergotong royong membersihkan ruang kelas",
          "Memaksakan kehendak kepada orang lain",
          "Berdoa sebelum memulai pelajaran",
        ],
        answer: "B",
      },
    ],
  },
  {
    id: "MTK",
    title: "Matematika",
    classDefault: "Kelas 6 (Aqaba)",
    duration: 60,
    theme: "from-blue-500 to-indigo-500",
    questions: [
      {
        q: "Berapakah hasil operasi matematika dari -15 + (20 x 4)?",
        options: ["65", "85", "-65", "95"],
        answer: "A",
      },
    ],
  },
];

export default QUIZ_DATA;
