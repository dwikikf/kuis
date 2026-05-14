// questions.js - Repositori Data Ujian & Soal (Multi-Mapel)
const QUIZ_DATA = [
  {
    id: "PKN",
    title: "Pendidikan Kewarganegaraan",
    classDefault: "Kelas 6 (Aqaba)",
    duration: 90,
    theme: "from-red-500 to-orange-500",
    questions: [
      {
        q: "Anak memiliki hak di rumah, salah satu hak anak di rumah adalah …",
        options: [
          "Membersihkan rumah setiap hari",
          "Mendapat kasih sayang dari orang tua",
          "Membantu pekerjaan orang tua",
          "Menjaga kebersihan kamar",
        ],
        answer: "B",
      },
      {
        q: "Kewajiban yang sebaiknya dilakukan sebagai anak di rumah adalah ...",
        options: [
          "Membantu orang tua",
          "Mendapat hadiah",
          "Bermain sepanjang hari",
          "Mendapatkan tempat tinggal",
        ],
        answer: "A",
      },
      {
        q: "Penetapan pembentukan BPUPKI disampaikan oleh Kumakici Harada pada tanggal ..",
        options: [
          "29 Mei 1945",
          "5 Maret 1945",
          "1 Maret 1945",
          "29 Maret 1945",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan gambar tarian tradisional berikut!\nTarian tersebut berasal dari daerah...",
        options: ["Sumatera Barat", "Bali", "Jawa Tengah", "Kalimantan Timur"],
        answer: "B",
        img: "PKN-4.webp",
      },
      {
        q: "Perhatikan gambar berikut ini !\nSenjata tradisional di atas berasal dari daerah …",
        options: ["Jawa Tengah", "Jawa Barat", "Jawa Timur", "Bali"],
        answer: "B",
        img: "PKN-5.webp",
      },
      {
        q: "Perhatikan gambar berikut ini !\nAlat musik tradisional Tifa berasal dari daerah …",
        options: ["Papua", "Bali", "Sulawesi", "Aceh"],
        answer: "A",
        img: "PKN-6.webp",
      },
      {
        q: "Perhatikan pernyataan berikut!\nDalam sidang BPUPKI, terdapat peristiwa penting yang menjadi awal lahirnya dasar negara Indonesia. Pada saat itu, Ir. Soekarno menyampaikan gagasan tentang dasar negara yang kemudian dikenal sebagai Pancasila.\nPeristiwa yang menandai kelahiran Pancasila adalah ....",
        options: [
          "Pembacaan teks Proklamasi",
          "Sidang BPUPKI pertama",
          "Sidang PPKI",
          "Pembentukan BPUPKI",
        ],
        answer: "B",
      },
      {
        q: "Pancasila memiliki kedudukan yang sangat penting bagi bangsa Indonesia, yaitu sebagai ....",
        options: [
          "Satu-satunya sumber hukum",
          "Dasar negara dan pandangan hidup bangsa",
          "Simbol kekayaan negara",
          "Aturan untuk kelompok tertentu",
        ],
        answer: "B",
      },
      {
        q: "Simbol sila pertama Pancasila adalah ....",
        options: ["Rantai", "Bintang", "Pohon beringin", "Padi dan kapas"],
        answer: "B",
      },
      {
        q: 'Nilai yang terkandung dalam sila kedua Pancasila, yaitu "Kemanusiaan yang Adil dan Beradab", adalah ....',
        options: [
          "Mengutamakan kepentingan golongan",
          "Saling menghargai dan mencintai sesama manusia",
          "Mengutamakan ketuhanan",
          "Mengutamakan persatuan wilayah",
        ],
        answer: "B",
      },
      {
        q: "Bunyi sila ketiga Pancasila adalah ....",
        options: [
          "Keadilan sosial bagi seluruh rakyat Indonesia",
          "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
          "Persatuan Indonesia",
          "Kemanusiaan yang adil dan beradab",
        ],
        answer: "C",
      },
      {
        q: "Keputusan yang diambil melalui musyawarah untuk mufakat merupakan pengamalan Pancasila sila ....",
        options: ["Kedua", "Ketiga", "Keempat", "Kelima"],
        answer: "C",
      },
      {
        q: "Sila kelima Pancasila dilambangkan dengan ....",
        options: [
          "Kepala banteng",
          "Pohon beringin",
          "Bintang",
          "Padi dan kapas",
        ],
        answer: "D",
      },
      {
        q: "Menjaga kebersihan lingkungan sekolah merupakan salah satu bentuk ....",
        options: [
          "Hak siswa",
          "Kewajiban siswa",
          "Tugas guru saja",
          "Tanggung jawab penjaga sekolah",
        ],
        answer: "B",
      },
      {
        q: "Contoh pengamalan sila pertama Pancasila di lingkungan rumah adalah ....",
        options: [
          "Membantu ibu memasak",
          "Berdoa bersama keluarga sebelum makan",
          "Bekerja bakti membersihkan selokan",
          "Berdiskusi menentukan tempat liburan",
        ],
        answer: "B",
      },
      {
        q: "Setiap anggota keluarga memiliki peran yang berbeda. Ayah sebagai kepala keluarga memiliki kewajiban untuk ....",
        options: [
          "Bermain sepanjang hari",
          "Mencari nafkah dan melindungi keluarga",
          "Mengerjakan semua tugas rumah sendirian",
          "Hanya beristirahat di rumah",
        ],
        answer: "B",
      },
      {
        q: "Aturan yang berlaku di masyarakat dan bertujuan untuk menciptakan ketertiban disebut ....",
        options: ["Saran", "Norma", "Hobi", "Keinginan"],
        answer: "B",
      },
      {
        q: "Salah satu aturan di sekolah adalah ....",
        options: [
          "Bangun tidur tepat waktu",
          "Mencuci piring setelah makan",
          "Memakai seragam sesuai jadwal",
          "Menonton televisi hingga larut malam",
        ],
        answer: "C",
      },
      {
        q: "Jika kita melanggar aturan lalu lintas, maka kita dapat dikenakan sanksi oleh ....",
        options: ["Guru", "Polisi", "Orang tua", "Teman"],
        answer: "B",
      },
      {
        q: "Manfaat mematuhi aturan di rumah adalah ....",
        options: [
          "Suasana rumah menjadi kacau",
          "Mendapat hukuman dari orang tua",
          "Terciptanya kerukunan dan ketertiban",
          "Membuat anggota keluarga saling bertengkar",
        ],
        answer: "C",
      },
      {
        q: "Gotong royong merupakan ciri khas bangsa Indonesia yang sesuai dengan sila ....",
        options: ["Pertama", "Kedua", "Ketiga", "Keempat"],
        answer: "C",
      },
      {
        q: "Lembaga yang bertugas membuat undang-undang di Indonesia adalah ....",
        options: ["Presiden", "DPR", "MA", "MK"],
        answer: "B",
      },
      {
        q: "Wilayah Indonesia terdiri dari ribuan pulau yang membentang dari ....",
        options: [
          "Sabang sampai Merauke",
          "Jawa sampai Bali",
          "Sumatera sampai Kalimantan",
          "Sulawesi sampai Papua",
        ],
        answer: "A",
      },
      {
        q: "Lagu kebangsaan Indonesia adalah ....",
        options: [
          "Indonesia Pusaka",
          "Indonesia Raya",
          "Tanah Airku",
          "Bagimu Negeri",
        ],
        answer: "B",
      },
      {
        q: "Semboyan Bhinneka Tunggal Ika memiliki arti ....",
        options: [
          "Berbeda-beda tetapi tetap satu jua",
          "Bersatu kita teguh bercerai kita runtuh",
          "Satu nusa satu bangsa",
          "Pantang menyerah sebelum berhasil",
        ],
        answer: "A",
      },
      {
        q: "Rumah adat daerah Sumatra Barat disebut ....",
        options: ["Rumah Joglo", "Rumah Gadang", "Rumah Honai", "Rumah Kebaya"],
        answer: "B",
      },
      {
        q: "Pakaian adat dari daerah Bali identik dengan penggunaan ....",
        options: [
          "Ulos",
          "Udeng dan kain kamen",
          "Batik parang",
          "Kebaya encim",
        ],
        answer: "B",
      },
      {
        q: "Upacara adat pembakaran jenazah di Bali disebut ....",
        options: ["Sekaten", "Ngaben", "Kasada", "Rambu Solo"],
        answer: "B",
      },
      {
        q: "Suku Asmat berasal dari provinsi ....",
        options: ["Kalimantan Timur", "Sulawesi Utara", "Papua", "Maluku"],
        answer: "C",
      },
      {
        q: "Contoh sikap menghargai keberagaman budaya adalah ....",
        options: [
          "Hanya mempelajari budaya daerah sendiri",
          "Mengejek tarian daerah lain",
          "Menonton pertunjukan seni dari daerah lain dengan senang",
          "Menganggap budaya sendiri paling hebat",
        ],
        answer: "C",
      },
      {
        q: "Keragaman suku bangsa di Indonesia merupakan ....",
        options: [
          "Kelemahan bangsa",
          "Kekayaan dan kebanggaan bangsa",
          "Sumber perpecahan",
          "Masalah bagi negara",
        ],
        answer: "B",
      },
      {
        q: "Hak untuk mendapatkan pendidikan bagi warga negara Indonesia diatur dalam UUD 1945 pasal ....",
        options: ["27", "29", "30", "31"],
        answer: "D",
      },
      {
        q: "Sebagai warga negara yang baik, kita harus ....",
        options: [
          "Melanggar hukum jika tidak ada polisi",
          "Mematuhi peraturan yang berlaku",
          "Membayar pajak hanya jika diminta",
          "Mengabaikan kebersihan lingkungan",
        ],
        answer: "B",
      },
      {
        q: "Contoh perilaku yang mencerminkan cinta tanah air adalah ....",
        options: [
          "Lebih suka membeli produk luar negeri",
          "Mengikuti upacara bendera dengan khidmat",
          "Membuang sampah ke sungai",
          "Malas belajar",
        ],
        answer: "B",
      },
      {
        q: "Menghormati orang yang sedang beribadah merupakan bentuk toleransi dalam keberagaman ....",
        options: ["Suku", "Budaya", "Agama", "Ras"],
        answer: "C",
      },
      {
        q: "Warna bendera negara Indonesia adalah ....",
        options: [
          "Merah dan Putih",
          "Putih dan Merah",
          "Merah Putih Biru",
          "Kuning dan Hijau",
        ],
        answer: "A",
      },
      {
        q: "Lembaga negara yang memegang kekuasaan kehakiman adalah ....",
        options: [
          "Presiden dan Wakil Presiden",
          "DPR dan DPD",
          "Mahkamah Agung dan Mahkamah Konstitusi",
          "MPR dan BPK",
        ],
        answer: "C",
      },
      {
        q: "Sikap yang harus dihindari dalam menjaga persatuan adalah ....",
        options: [
          "Saling menghargai",
          "Toleransi",
          "Egois dan menang sendiri",
          "Rela berkorban",
        ],
        answer: "C",
      },
      {
        q: "Pemilihan umum (Pemilu) di Indonesia dilaksanakan setiap .... tahun sekali.",
        options: ["3", "4", "5", "6"],
        answer: "C",
      },
      {
        q: "Kepala daerah tingkat provinsi disebut ....",
        options: ["Bupati", "Walikota", "Gubernur", "Camat"],
        answer: "C",
      },
      {
        q: "Sikap mencintai bangsa secara berlebihan dan menganggap rendah bangsa lain disebut ....",
        options: [
          "Patriotisme",
          "Nasionalisme",
          "Chauvinisme",
          "Nasionalisme sempit",
        ],
        answer: "A",
      },
      {
        q: "Ibu kota Provinsi Jawa Tengah adalah ....",
        options: ["Bandung", "Semarang", "Surabaya", "Denpasar"],
        answer: "B",
      },
      {
        q: "Ibu kota Provinsi Sumatera Utara adalah ....",
        options: ["Padang", "Pekanbaru", "Medan", "Palembang"],
        answer: "C",
      },
      {
        q: "Setiap hari Minggu, warga Kampung Sukamaju bekerja bersama membersihkan lingkungan dan memperbaiki jalan yang rusak tanpa membeda-bedakan satu sama lain. Sikap tersebut mencerminkan pengamalan sila ....",
        options: ["Pertama", "Kedua", "Ketiga", "Kelima"],
        answer: "C",
      },
      {
        q: "Salah satu nilai Pancasila sila keempat adalah ....",
        options: [
          "Menghormati hasil musyawarah",
          "Suka memaksakan kehendak",
          "Bersikap egois",
          "Tidak peduli terhadap orang lain",
        ],
        answer: "A",
      },
      {
        q: "Rizki berbicara kasar kepada orang yang lebih tua dan tidak meminta maaf setelah berbuat salah. Akibat perbuatannya, teman-teman dan warga di sekitarnya menjadi tidak suka kepadanya. Berdasarkan cerita tersebut, orang yang melanggar norma kesopanan biasanya akan mendapat ....",
        options: ["Pujian", "Penghargaan", "Celaan dari masyarakat", "Hadiah"],
        answer: "C",
      },
      {
        q: "Raid tertangkap polisi karena mengambil barang milik orang lain tanpa izin. Perbuatan tersebut termasuk pelanggaran norma hukum. Sanksi yang dapat diterima Raid adalah ....",
        options: [
          "Rasa malu",
          "Penyesalan",
          "Hukuman pidana",
          "Dikucilkan teman",
        ],
        answer: "C",
      },
      {
        q: "Keputusan hasil musyawarah harus dilaksanakan dengan ....",
        options: ["Terpaksa", "Tanggung jawab", "Marah-marah", "Acuh tak acuh"],
        answer: "B",
      },
      {
        q: "Kelenteng adalah tempat ibadah agama ....",
        options: ["Hindu", "Buddha", "Konghucu", "Kristen"],
        answer: "C",
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
