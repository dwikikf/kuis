// questions.js - Repositori Data Ujian & Soal (Multi-Mapel)
const QUIZ_DATA = [
  {
    id: "PKN",
    title: "Pendidikan Kewarganegaraan",
    classDefault: "Kelas 6 (Aqaba)",
    duration: 90,
    theme: "from-red-500 to-orange-500",
    secure: "8813",
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
          "Sidang pertama BPUPKI pada 29 Mei 1945",
          "Pidato Ir. Soekarno pada 1 Juni 1945",
          "Pengesahan UUD 1945",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan pernyataan berikut!\nSumpah Pemuda merupakan peristiwa penting dalam sejarah Indonesia yang menunjukkan persatuan para pemuda dari berbagai daerah.\nPeristiwa ini menjadi tonggak awal semangat persatuan bangsa Indonesia.\nKapan peristiwa Sumpah Pemuda terjadi?",
        options: [
          "17 Agustus 1945",
          "20 Mei 1908",
          "28 Oktober 1928",
          "1 Juni 1945",
        ],
        answer: "C",
      },
      {
        q: "Pada tanggal berapakah Ir. Soekarno menyampaikan usulan rumusan dasar negara dalam sidang BPUPKI?",
        options: [
          "1 Juni 1945",
          "29 Mei 1945",
          "31 Mei 1945",
          "17 Agustus 1945",
        ],
        answer: "A",
      },
      {
        q: "Perhatikan daftar tokoh berikut!\n1. Mr. Mohammad Yamin\n2. Drs. Mohammad Hatta\n3. Prof. Dr. Soepomo\n4. Ir. Soekarno\nManakah tokoh yang menyampaikan usulan dasar negara pada sidang BPUPKI tanggal 29 Mei 1945?",
        options: [
          "Tokoh Nomor 4",
          "Tokoh Nomor 2",
          "Tokoh Nomor 3",
          "Tokoh Nomor 1",
        ],
        answer: "D",
      },
      {
        q: "Perhatikan beberapa pasal dalam UUD 1945 berikut:\nPasal 27 ayat (1) -> Segala warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan dan wajib menjunjung hukum dan pemerintahan itu dengan tidak ada kecualinya.\nPasal 28A -> Setiap orang berhak untuk hidup serta berhak mempertahankan hidup dan kehidupannya.\nPasal 28C ayat (1) -> Setiap orang berhak mengembangkan diri melalui pemenuhan kebutuhan dasarnya.\nPasal 31 ayat (1) -> Setiap warga negara berhak mendapat pendidikan.\nBerdasarkan pasal-pasal tersebut, yang menunjukkan hak perlakuan yang sama di hadapan hukum adalah ....",
        options: [
          "Pasal 28A",
          "Pasal 31 ayat (1)",
          "Pasal 27 ayat (1)",
          "Pasal 28C ayat (1)",
        ],
        answer: "C",
      },
      {
        q: "Nilai yang terkandung dalam gambar diatas sesuai dengan sila pertama Pancasila yaitu....",
        options: [
          "Menghargai pendapat orang lain",
          "Melaksanakan ibadah sesuai kepercayaan masing-masing",
          "Mengutamakan kepentingan bersama",
          "Menjaga persatuan dan kesatuan bangsa",
        ],
        answer: "B",
        img: "PKN-12.webp",
      },
      {
        q: "Perhatikan gambar perumus Pancasila berikut.\nBerdasarkan gambar di atas, perumus Pancasila nomor 1 dan 4 adalah …",
        options: [
          "Ir. Soekarno & Wahid Hasyim",
          "Ir. Soekaro & Muhammad Hatta",
          "Muhammad Hatta & Wahid Hasyim",
          "Wahid Hasyim & Ir. Soekarno",
        ],
        answer: "A",
        img: "PKN-13.webp",
      },
      {
        q: "Perhatikan pernyataan berikut ini.\n1) Menghormati guru\n2) Menjalankan ibadah\n3) Jujur saat ujian\n4) Berdoa sebelum makan\nDari pernyataan di atas, yang termasuk norma agama adalah nomor …",
        options: ["1 dan 2", "2 dan 3", "2 dan 4", "1 dan 4"],
        answer: "C",
      },
      {
        q: 'Perhatikan pernyataan di bawah ini!\n"Sebelum berangkat ke sekolah, Bayu selalu membiasakan diri untuk berpamitan dan mencium tangan kedua orang tuanya sebagai bentuk penghormatan."\nBerdasarkan pernyataan tersebut, tindakan yang dilakukan oleh Bayu merupakan bentuk penerapan dari…',
        options: [
          "Norma Hukum",
          "Norma Agama",
          "Norma Kesopanan",
          "Norma Kesusilaan",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan pernyataan berikut:\n'Setiap pemeluk agama wajib menjalankan ibadah dan menjauhi larangan-Nya sesuai dengan petunjuk yang terdapat dalam kitab suci masing-masing.'\nBerdasarkan pernyataan tersebut, sumber utama dari norma agama adalah…",
        options: [
          "Bisikan hati nurani manusia tentang baik dan buruk",
          "Peraturan yang dibuat oleh lembaga negara",
          "Hasil kesepakatan tokoh adat di suatu daerah",
          "Wahyu Tuhan Yang Maha Esa yang tertuang dalam kitab suci",
        ],
        answer: "D",
      },
      {
        q: "Di sekolah, setiap siswa memiliki hak dan kewajiban.\nHak adalah sesuatu yang seharusnya diterima oleh siswa, sedangkan kewajiban adalah sesuatu yang harus dilakukan dengan penuh tanggung jawab.\nManakah yang merupakan contoh hak siswa di sekolah?",
        options: [
          "Mengerjakan tugas yang diberikan guru tepat waktu",
          "Mematuhi tata tertib sekolah",
          "Mendapatkan pelajaran dan bimbingan dari guru",
          "Menjaga kebersihan lingkungan sekolah",
        ],
        answer: "C",
      },
      {
        q: "Di lingkungan sekolah, setiap siswa memiliki peran penting dalam menciptakan suasana belajar yang nyaman.\nOleh karena itu, siswa harus melaksanakan kewajibannya dengan penuh tanggung jawab.\nManakah yang merupakan contoh kewajiban siswa di sekolah?",
        options: [
          "Mendapatkan nilai yang baik dari guru",
          "Menggunakan fasilitas sekolah dengan bebas",
          "Mendapatkan perlindungan dari pihak sekolah",
          "Mematuhi tata tertib yang berlaku di sekolah",
        ],
        answer: "D",
      },
      {
        q: "Apa manfaat utama dari melakukan musyawarah dalam mengambil keputusan untuk kepentingan bersama?",
        options: [
          "Mencari siapa yang paling hebat dalam berdebat",
          "Menghasilkan keputusan yang adil dan disepakati bersama",
          "Mempercepat waktu tanpa perlu berdiskusi",
          "Memastikan pendapat pemimpin selalu diikuti",
        ],
        answer: "B",
      },
      {
        q: "Nayya mengunjungi salah satu provinsi di Indonesia. Dia melihat bangunan seperti gambar di atas. Bangunan tersebut merupakan ikon dari ….",
        options: [
          "Provinsi Jawa Barat",
          "Nusa Tenggara Barat",
          "Provinsi Sumatra",
          "Provinsi Papua",
        ],
        answer: "D",
        img: "PKN-20.webp",
      },
      {
        q: "Perhatikan pernyataan berikut:\nProvinsi Nanggroe Aceh Darussalam (NAD) memiliki kewenangan khusus dalam menjalankan kehidupan masyarakatnya, termasuk dalam bidang hukum dan budaya yang berbeda dengan provinsi lain di Indonesia.\nBerdasarkan pernyataan tersebut, keistimewaan Provinsi NAD adalah ....",
        options: [
          "Memiliki ibu kota negara",
          "Menerapkan hukum adat secara bebas tanpa aturan",
          "Diberi kewenangan untuk menerapkan syariat Islam",
          "Menjadi pusat perdagangan internasional utama",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan pernyataan berikut:\nGotong royong merupakan sikap bekerja sama untuk mencapai tujuan bersama tanpa mengharapkan imbalan.\nBerdasarkan pernyataan tersebut, contoh kegiatan gotong royong di sekolah adalah ....",
        options: [
          "Mengerjakan tugas sendiri tanpa bantuan teman",
          "Membersihkan kelas bersama-sama setelah kegiatan belajar",
          "Mencontek pekerjaan teman saat ulangan",
          "Bermain sendiri saat jam istirahat",
        ],
        answer: "B",
      },
      {
        q: "Nama suku bangsa asal Provinsi Jawa Barat adalah suku sunda, dan terdapat suku lain di daerah lainnya.\nSikap yang harus kita tunjukkan terhadap keberagaman suku bangsa di Indonesia adalah….",
        options: [
          "Saling mengejek antar suku",
          "Saling menghargai antar perbedaan suku",
          "Tidak menghargai suku lain",
          "Merasa lebih baik dari suku daerah yang lain",
        ],
        answer: "B",
        img: "PKN-23.webp",
      },
      {
        q: "Berdasarkan gambar kelenteng diatas, agama apa yang menggunakan tempat ibadah tersebut adalah …….",
        options: ["Islam", "Budha", "Konghucu", "Hindu"],
        answer: "C",
        img: "PKN-24.webp",
      },
      {
        q: "Perhatikan pernyataan-pernyataan di bawah ini!\n1. Membersihkan halaman rumah masing-masing.\n2. Membantu tetangga yang sedang mengadakan hajatan.\n3. Melaksanakan tugas piket kebersihan kelas.\n4. Memperbaiki jembatan desa yang rusak secara bersama-sama.\n5. Mengikuti kegiatan siskamling (ronda malam).\nBerdasarkan pernyataan di atas, contoh kegiatan gotong royong di lingkungan masyarakat ditunjukkan oleh nomor ....",
        options: ["1, 2, dan 3", "2, 4, dan 5", "1, 3, dan 4", "3, 4, dan 5"],
        answer: "B",
      },
      {
        q: "Kepanjangan dari PPKI adalah ....",
        options: [
          "Panitia Persiapan Kemerdekaan Indonesia",
          "Panitia Persiapan Kemerdekaan Islam",
          "Panitia Persatuan Kemerdekaan Indonesia",
          "Panitia Pembentukan Kemerdekaan Indonesia",
        ],
        answer: "A",
      },
      {
        q: "Bunyi Pasal 27 ayat (2) UUD 1945 adalah ....",
        options: [
          "Setiap warga negara berhak mendapat pendidikan",
          "Tiap-tiap warga negara berhak atas pekerjaan dan penghidupan yang layak bagi kemanusiaan",
          "Kemerdekaan berserikat dan berkumpul",
          "Fakir miskin dipelihara oleh negara",
        ],
        answer: "B",
      },
      {
        q: "Kegiatan kerja bakti membersihkan lingkungan sekolah mencerminkan sila ke ....",
        options: ["Pertama", "Kedua", "Ketiga", "Kelima"],
        answer: "C",
      },
      {
        q: "Sanksi bagi pelanggar norma kesopanan adalah ....",
        options: [
          "Dipenjara",
          "Dikucilkan masyarakat",
          "Mendapat dosa",
          "Didenda",
        ],
        answer: "B",
      },
      {
        q: "Kewajiban adalah ....",
        options: [
          "Sesuatu yang harus diterima",
          "Sesuatu yang harus dilakukan dengan penuh tanggung jawab",
          "Sesuatu yang menyenangkan",
          "Sesuatu yang dimiliki sejak lahir",
        ],
        answer: "B",
      },
      {
        q: "Musyawarah yang dilakukan bersama untuk mencapai keputusan bersama disebut ....",
        options: ["Perselisihan", "Pertengkaran", "Mufakat", "Kompetisi"],
        answer: "C",
      },
      {
        q: "Kelenteng merupakan tempat ibadah umat agama ....",
        options: ["Islam", "Hindu", "Buddha", "Konghucu"],
        answer: "D",
      },
      {
        q: "Bangunan khas dari Provinsi DKI Jakarta adalah ....",
        options: [
          "Jam Gadang",
          "Monumen Nasional (Monas)",
          "Lawang Sewu",
          "Gedung Sate",
        ],
        answer: "B",
      },
      {
        q: "Makanan khas dari Madura adalah ....",
        options: ["Rendang", "Gudeg", "Sate Madura", "Pempek"],
        answer: "C",
      },
      {
        q: "Manfaat gotong royong adalah ....",
        options: [
          "Pekerjaan menjadi lebih berat",
          "Menambah perselisihan",
          "Pekerjaan cepat selesai",
          "Membuat masyarakat malas",
        ],
        answer: "C",
      },
      {
        q: "Rumusan dasar negara menurut Moh. Yamin secara lisan salah satunya adalah ....",
        options: [
          "Ketuhanan Yang Maha Esa",
          "Peri Kebangsaan",
          "Persatuan Indonesia",
          "Keadilan sosial bagi seluruh rakyat Indonesia",
        ],
        answer: "B",
      },
      {
        q: "Ibu kota Provinsi Jawa Barat adalah ....",
        options: ["Serang", "Bandung", "Semarang", "Surabaya"],
        answer: "B",
      },
      {
        q: "Nilai yang terkandung dalam sila kedua Pancasila adalah ....",
        options: [
          "Mengutamakan persatuan",
          "Menghargai sesama manusia",
          "Rajin bermusyawarah",
          "Menjaga kebersihan lingkungan",
        ],
        answer: "B",
      },
      {
        q: "Norma yang bersumber dari hati nurani disebut norma ....",
        options: ["Agama", "Kesusilaan", "Kesopanan", "Hukum"],
        answer: "B",
      },
      {
        q: "Berikut yang mencerminkan persatuan dan kesatuan adalah ....",
        options: [
          "Memilih teman",
          "Bertengkar dengan tetangga",
          "Kerja bakti membersihkan lingkungan",
          "Mengejek budaya daerah lain",
        ],
        answer: "C",
      },
      {
        q: "Salah satu rumusan dasar negara menurut Moh. Yamin adalah ....",
        options: [
          "Peri Kemanusiaan",
          "Demokrasi",
          "Sosialisme",
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
        q: "Mesjid adalah tempat ibadah agama ....",
        options: ["Hindu", "Islam", "Konghucu", "Kristen"],
        answer: "B",
      },
      {
        q: "Contoh gotong royong di masyarakat adalah ....",
        options: [
          "Bermain sendiri di rumah",
          "Membersihkan selokan bersama warga",
          "Belajar sendiri",
          "Berjualan di pasar",
        ],
        answer: "B",
      },
    ],
  },
  {
    id: "MTK",
    title: "Matematika",
    classDefault: "Kelas 6 (Aqaba)",
    duration: 90,
    theme: "from-blue-500 to-indigo-500",
    secure: "1256",
    questions: [
      {
        q: "Bilangan 255.955.000 dibaca………",
        options: [
          "Dua ratus lima puluh lima juta sembilan ratus lima puluh ribu",
          "Dua ratus lima puluh lima juta sembilan ratus lima puluh lima ribu",
          "Dua ratus lima puluh lima juta delapan ratus lima puluh lima ribu",
          "Dua ratus lima puluh lima juta sembilan ratus lima ribu",
        ],
        answer: "B",
      },
      {
        q: "Perhatikan gambar berikut!\nPecahan senilai yang sesuai dengan gambar adalah …",
        options: ["2/4", "1/8", "1/4", "1/2"],
        answer: "C",
        img: "MTK-2.webp",
      },
      {
        q: "Ibu Nurul membuat 3 kue pizza. Ketika kue pizza sudah matang, ibu Nurul memotongnya seperti tampak pada gambar.\nPizza A dipotong menjadi 2 bagian yang sama besar. Pizza B dipotong menjadi 3 bagian yang sama besar. Pizza C dipotong menjadi 4 bagian yang sama besar. Pernyataan yang benar adalah ....",
        options: [
          "Potongan pizza A lebih kecil dibandingkan dengan potongan pizza C",
          "Potongan pizza A lebih besar dibandingkan dengan potongan pizza B",
          "Potongan pizza B lebih besar dibandingkan dengan potongan pizza A",
          "Potongan pizza C lebih besar dibandingkan dengan potongan pizza B",
        ],
        answer: "B",
        img: "MTK-3.webp",
      },
      {
        q: "Perpustakaan memiliki 84 buku.\nBuku-buku tersebut akan disusun ke dalam beberapa rak.\nSetiap rak harus berisi jumlah buku yang sama.\nJika ada 7 rak, maka setiap rak berisi … buku.",
        options: ["10", "11", "12", "13"],
        answer: "C",
      },
      {
        q: "Besar sudut yang terbentuk pada jarum jam berikut adalah … derajat.",
        options: ["30", "90", "45", "180"],
        answer: "B",
        img: "MTK-5.webp",
      },
      {
        q: "Faktor prima dari 24 adalah …",
        options: ["2 dan 3", "3 dan 5", "1 dan 2", "3 dan 7"],
        answer: "A",
      },
      {
        q: "Diketahui dua buah bilangan yaitu 12 dan 18.\nTentukan Kelipatan Persekutuan Terkecil (KPK) dari kedua bilangan tersebut!",
        options: ["24", "30", "36", "48"],
        answer: "C",
      },
      {
        q: "Diketahui dua buah bilangan yaitu 24 dan 36.\nTentukan Faktor Persekutuan Terbesar (FPB) dari kedua bilangan tersebut!",
        options: ["6", "8", "12", "18"],
        answer: "C",
      },
      {
        q: "Sebuah segitiga sama sisi memiliki panjang sisi 12 cm. Keliling segitiga tersebut adalah…",
        options: ["24 cm", "48 cm", "144 cm", "36 cm"],
        answer: "D",
      },
      {
        q: "Sisi sebuah kertas lipat berbentuk persegi adalah 15 cm. Berapakah luas kertas tersebut?",
        options: ["60", "150", "30", "225"],
        answer: "D",
      },
      {
        q: "Perhatikan gambar berikut.\nBerapakah hasil perkalian dari gambar pecahan di atas?",
        options: [
          "3/4 * 2 = 6/8",
          "3/4 * 3 = 9/4",
          "3/4 * 3/4 = 9/16",
          "3/4 * 2 = 8/3",
        ],
        answer: "A",
        img: "MTK-11.webp",
      },
      {
        q: "Hasil dari 3/4 ÷ 2 adalah",
        options: ["3/8", "6/4", "2/3", "4/3"],
        answer: "A",
      },
      {
        q: "Perhatikan tabel berikut !\nBerdasarkan tabel di atas, yang memiliki rasio sama dengan 2:3 adalah nomor …",
        options: ["1", "2", "3", "4"],
        answer: "D",
        img: "MTK-13.webp",
      },
      {
        q: "Mbak Tina membeli beberapa jenis buah-buahan, diantaranya:\nRasio dari buah apel dan pir adalah …",
        options: ["3 : 4", "2 : 5", "4 : 5", "4 : 3"],
        answer: "C",
        img: "MTK-14.webp",
      },
      {
        q: "Sebuah taman berbentuk persegi memiliki panjang sisi 12 cm. Luas taman tersebut adalah...",
        options: ["24 cm²", "48 cm²", "144 cm²", "169 cm²"],
        answer: "C",
      },
      {
        q: "Perhatikan beberapa pernyataan tentang sifat bangun ruang berikut!\n    1) Memiliki 6 sisi yang semuanya berbentuk persegi dengan ukuran yang sama.\n    2) Memiliki 12 rusuk yang terdiri dari 3 kelompok rusuk yang sejajar dan sama panjang.\n    3) Memiliki 8 titik sudut.\n    4) Memiliki 12 rusuk yang semuanya sama panjang.\n    5) Memiliki sisi-sisi yang berhadapan sejajar dan sama luas, tetapi tidak semua sisinya harus berbentuk persegi.\nBerdasarkan pernyataan di atas, yang merupakan sifat khusus dari bangun ruang kubus ditunjukkan oleh nomor…",
        options: ["1, 2, dan 3", "1, 3, dan 4", "2, 3, dan 5", "3, 4, dan 5"],
        answer: "B",
      },
      {
        q: "Perhatikan gambar berkut!\nJumlah seluruh kubus pada susunan tersebut adalah ….",
        options: ["6 kubus", "7 kubus", "8 kubus", "9 kubus"],
        answer: "B",
        img: "MTK-17.webp",
      },
      {
        q: "Berdasarkan gambar diatas, jumlah titik yang tampak pada dadu berjumlah….",
        options: ["2", "7", "9", "11"],
        answer: "B",
        img: "MTK-18.webp",
      },
      {
        q: "Perhatikan gambar berikut!",
        options: ["Gambar A", "Gambar B", "Gambar C", "Gambar D"],
        answer: "A",
        img: "MTK-19.webp",
      },
      {
        q: "Sebuah kantong berisi 5 bola merah dan 3 bola biru.\nJika diambil satu bola secara acak, maka peluang terambil bola merah adalah ....",
        options: ["3/8", "5/8", "1/5", "1/4"],
        answer: "B",
      },
      {
        q: "Terdapat beberapa buku dengan warna berbeda, yaitu 4 buku merah, 2 buku kuning, dan 3 buku hijau.\nBerdasarkan gambar tersebut, peluang paling besar untuk terambil adalah buku berwarna ....",
        options: ["Kuning", "Hijau", "Merah", "Semua Sama"],
        answer: "C",
      },
      {
        q: "Suatu kolam berbentuk balok mempunyai panjang 30 dm, lebar 18 dm, dan tinggi 10 dm. Jika kolam itu berisi air sebanyak ¾ bagian, volume air yang ada dalam kolam adalah ..",
        options: ["5.400 Liter", "4.050 Liter", "2.700 Liter", "1.350 Liter"],
        answer: "B",
      },
      {
        q: "Perhatikan pernytaan berikut!\nBeruang mulai berhibernasi pada musim panas\nBerdasarkan skala peluang, kejadian di atas dikelompokkan ke dalam katagori ….",
        options: ["Pasti", "Sangat Mungkin", "Kurang Mungkin", "Tidak Mungkin"],
        answer: "D",
      },
      {
        q: "Seorang siswa akan mengambil satu buah buku secara acak dari dalam rak tersebut. \nBerdasarkan gambar, kejadian mana yang memiliki peluang paling besar?",
        options: [
          "Terambilnya buku berwarna kuning",
          "Terambilnya buku berwarna merah",
          "Terambilnya buku berwarna hijau",
          "Terambilnya buku berwarna biru",
        ],
        answer: "B",
        img: "MTK-24.webp",
      },
      {
        q: "Perhatikan tabel hasil percobaan pengambilan bola berwarna dalam sebuah kantong di bawah ini!\nBerdasarkan tabel di atas, peluang terambilnya bola berwarna kuning adalah ....",
        options: ["12/30", "12/40", "10/30", "10/40"],
        answer: "B",
        img: "MTK-25.webp",
      },
      {
        q: "Bu Nida memiliki 96 buku cerita yang akan dibagikan sama banyak kepada 8 siswa berprestasi. Setiap siswa kemudian meminjamkan 3 bukunya kepada teman lain. Banyak buku yang masih dimiliki setiap siswa adalah ....",
        options: ["6 buku", "9 buku", "12 buku", "15 buku"],
        answer: "B",
      },
      {
        q: "Hasil dari 240 ÷ 6 × (15 - 11) + 8 adalah ....",
        options: ["148", "160", "168", "176"],
        answer: "C",
      },
      {
        q: "Pada pukul 03.00, jarum pendek berada di angka 3 dan jarum panjang di angka 12. Besar sudut yang terbentuk adalah ....",
        options: ["45°", "60°", "90°", "180°"],
        answer: "C",
      },
      {
        q: "Pecahan 7/20 jika diubah ke bentuk desimal menjadi ....",
        options: ["0,25", "0,35", "0,7", "3,5"],
        answer: "B",
      },
      {
        q: "Perhatikan bilangan desimal berikut!\n0,8 ; 0,25 ; 0,75 ; 0,5\nUrutan dari yang terkecil ke terbesar adalah ....",
        options: [
          "0,25 ; 0,5 ; 0,75 ; 0,8",
          "0,25 ; 0,75 ; 0,5 ; 0,8",
          "0,5 ; 0,25 ; 0,75 ; 0,8",
          "0,8 ; 0,75 ; 0,5 ; 0,25",
        ],
        answer: "A",
      },
      {
        q: "Sebuah bangun tersusun dari kubus satuan seperti berikut:\nLapisan bawah terdiri atas 9 kubus dan lapisan atas terdiri atas 4 kubus. Jumlah seluruh kubus adalah ....",
        options: ["11", "12", "13", "14"],
        answer: "C",
      },
      {
        q: "Sebuah benda berbentuk huruf L dilihat dari atas tampak seperti ....",
        options: ["Persegi panjang", "Huruf L", "Segitiga", "Lingkaran"],
        answer: "B",
      },
      {
        q: "Sebuah kubus memiliki panjang rusuk 6 cm. Volume kubus tersebut adalah ....",
        options: ["36 cm³", "72 cm³", "108 cm³", "216 cm³"],
        answer: "D",
      },
      {
        q: "Perhatikan denah berikut!\nSekolah berada 3 petak ke timur dari pasar dan 2 petak ke utara dari taman. Letak sekolah yang tepat adalah ....",
        options: [
          "Barat daya taman",
          "Timur laut taman",
          "Tenggara pasar",
          "Barat laut pasar",
        ],
        answer: "B",
      },
      {
        q: "Dalam sebuah kantong terdapat 5 bola merah, 3 bola biru, dan 2 bola hijau. Bola yang paling besar peluangnya terambil adalah ....",
        options: ["Bola hijau", "Bola biru", "Bola merah", "Semua sama besar"],
        answer: "C",
      },
      {
        q: "Pak Dedi membeli 5 kotak pensil. Setiap kotak berisi 12 pensil. Sebanyak 8 pensil diberikan kepada adiknya. Banyak pensil Pak Dedi sekarang adalah ....",
        options: ["48", "50", "52", "60"],
        answer: "C",
      },
      {
        q: "Lampu merah menyala setiap 6 detik dan lampu hijau menyala setiap 8 detik. Jika keduanya menyala bersama pukul 19.00, keduanya akan menyala bersama lagi setelah ....",
        options: ["12 detik", "18 detik", "24 detik", "48 detik"],
        answer: "C",
      },
      {
        q: "Perbandingan siswa laki-laki dan perempuan di kelas VI adalah 3 : 5. Jika jumlah siswa perempuan 20 orang, banyak siswa laki-laki adalah ....",
        options: ["10 orang", "12 orang", "15 orang", "18 orang"],
        answer: "B",
      },
      {
        q: "Pada peta, rumah Fajri berada di titik A dan sekolah di titik B. Jarak kedua titik adalah 8 petak. Jika 1 petak mewakili 100 meter, maka jarak sebenarnya adalah ....",
        options: ["200 meter", "400 meter", "600 meter", "800 meter"],
        answer: "D",
      },
      {
        q: "Dalam sebuah kotak terdapat kartu angka 1 sampai 10. Peluang munculnya angka genap adalah ....",
        options: ["1/10", "2/10", "5/10", "8/10"],
        answer: "C",
      },
      {
        q: "Sebuah roda putar memiliki 8 bagian sama besar terdiri atas 3 warna merah, 2 biru, 2 kuning, dan 1 hijau. Peluang terbesar saat roda diputar adalah mendapatkan warna ....",
        options: ["Hijau", "Biru", "Kuning", "Merah"],
        answer: "D",
      },
      {
        q: "Sebuah persegi memiliki sisi 15 cm. Luas persegi tersebut adalah ....",
        options: ["30 cm²", "60 cm²", "120 cm²", "225 cm²"],
        answer: "D",
      },
      {
        q: "Halaman sekolah berbentuk persegi dengan panjang sisi 20 meter. Luas halaman tersebut adalah ....",
        options: ["200 m²", "300 m²", "400 m²", "800 m²"],
        answer: "C",
      },
      {
        q: "Perbandingan umur Fakhrie dan Siska adalah 4 : 5. Jika umur Dina 12 tahun, umur Siska adalah ....",
        options: ["14 tahun", "15 tahun", "16 tahun", "18 tahun"],
        answer: "B",
      },
      {
        q: "Sebuah persegi panjang memiliki panjang 18 cm dan lebar 12 cm. Keliling bangun tersebut adalah ....",
        options: ["30 cm", "48 cm", "60 cm", "216 cm"],
        answer: "C",
      },
      {
        q: "Ibu mempunyai 3/4 kg gula. Gula tersebut digunakan sebanyak 2 × 1/8 kg untuk membuat kue. Sisa gula ibu adalah ....",
        options: ["1/4 kg", "1/2 kg", "3/8 kg", "5/8 kg"],
        answer: "B",
      },
      {
        q: "Sebuah segitiga memiliki sisi 12 cm, 15 cm, dan 17 cm. Keliling segitiga tersebut adalah ....",
        options: ["34 cm", "42 cm", "44 cm", "46 cm"],
        answer: "C",
      },
      {
        q: "KPK dari 12 dan 18 adalah ....",
        options: ["24", "30", "36", "48"],
        answer: "C",
      },
      {
        q: "Perhatikan dua pecahan berikut!\n3/4 dan 5/8\nPecahan yang lebih besar adalah ....",
        options: ["3/4", "5/8", "Keduanya sama", "Tidak dapat dibandingkan"],
        answer: "A",
      },
      {
        q: "Sebuah pizza dibagi menjadi 8 bagian sama besar. Rina memakan 3 bagian dan Siti memakan 2 bagian. Pecahan pizza yang sudah dimakan adalah ....",
        options: ["3/8", "2/8", "5/8", "7/8"],
        answer: "C",
      },
    ],
  },
  {
    id: "BINDO",
    title: "Bahasa Indonesia",
    classDefault: "Kelas 6 (Aqaba)",
    duration: 90,
    theme: "from-green-500 to-emerald-500",
    secure: "9865",
    questions: [
      {
        q: "Perhatikan kalimat berikut:\n1). Budi membaca Al-Qur’an\n2.) Adik tidur \n3.) Ibu memasak sayur\n4.) Ayah mencuci mobil\n5.) Burung terbang\n6.) Siswa mengerjakan PR\nContoh kalimat transitif ditunjukkan oleh nomer ….",
        options: [
          "1), 2) , 3), 4)",
          "2), 3), 4), 5)",
          "1), 3), 4), 6)",
          "3), 4), 5), 6)",
        ],
        answer: "C",
      },
      {
        q: "Kalimat berikut yang termasuk kalimat intransitif adalah..",
        options: [
          "Rizan membaca buku",
          "Ayah memperbaiki sepeda",
          "Adik menangis",
          "Ibu memasak nasi",
        ],
        answer: "C",
      },
      {
        q: "Calista menulis surat di atas meja. Manakah kata yang berfungsi sebagai subjek dari kalimat di atas?",
        options: ["Calista", "Menulis", "Surat", "Di Atas Meja"],
        answer: "A",
      },
      {
        q: "Firas bermain handphone.\nKalimat tersebut menggunakan pola…..",
        options: [
          "Subjek - Predikat - Objek - Keterangan ( SPOK )",
          "Subjek - Predikat - Keterangan ( SPK )",
          "Subjek - Predikat - Objek ( SPO )",
          "Objek - Predikat - Subjek ( OPS )",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan kalimat berikut ini !\nUlar kobra memiliki bisa yang mematikan.\nAndi bisa mengerjakan tugas dengan baik.\nKata bisa pada kalimat pertama memiliki arti …",
        options: ["dapat", "racun", "mampu", "sanggup"],
        answer: "B",
      },
      {
        q: "Pak Alwi menyampaikan bahwa hari Senin akan diadakan ulangan harian\nTanda baca yang tepat untuk melengkapi kalimat di atas adalah …",
        options: ["Titik (.)", "Koma (,)", "Seru (!)", "Tanda Tanya (?)"],
        answer: "A",
      },
      {
        q: "Perhatikan pernyataan berikut!\n(1) Manusia membutuhkan air untuk hidup.\n(2) Air putih lebih enak daripada minuman lainnya.\nInformasi yang termasuk fakta adalah ….",
        options: ["1", "2", "1 dan 2", "Tidak Ada"],
        answer: "A",
      },
      {
        q: "Perhatikan kalimat berikut!\nIbu sedang memasak di dapur.\nKata berimbuhan me- pada kalimat tersebut adalah ….",
        options: ["Ibu", "Sedang", "Memasak", "Dapur"],
        answer: "C",
      },
      {
        q: "Iklan yang dibuat oleh pemerintah atau organisasi tertentu dengan tujuan untuk memberikan penerangan, edukasi, atau imbauan kepada masyarakat tanpa mencari keuntungan disebut…",
        options: [
          "Iklan Baris",
          "Iklan Penawaran",
          "Iklan Niaga",
          "Iklan Layanan Masyarakat",
        ],
        answer: "D",
      },
      {
        q: "Bacalah ringkasan berikut!\nSheenaz sangat giat berlatih tari Pendet setiap sore. Ia ingin menunjukkan keindahan budaya Bali saat pertukaran pelajar nanti. Ayahnya selalu mendukung dengan membelikan perlengkapan tari yang dibutuhkan.\nSiapakah tokoh utama yang diceritakan memiliki semangat melestarikan budaya dalam teks tersebut?",
        options: ["Guru Tari", "Pelajar Bali", "Ayah Sheenaz", "Sheenaz"],
        answer: "D",
      },
      {
        q: "Tokoh utama yang menjadi pusat perhatian dalam cerita dan biasanya digambarkan dengan sifat-sifat baik disebut ….",
        options: ["Antagonis", "Tritagonis", "Protagonis", "Figuran"],
        answer: "C",
      },
      {
        q: "Fadhli ingin mengisi formulir pendaftaran peminjaman buku perpustakaan dengan data acak sebagai berikut:\n(1) Nama\n(2) Kelas\n(3) Alamat\n(4) Tanggal Lahir\nPengisian data formulir yang tepat adalah ….",
        options: ["1-2-4-3", "1-3-2-4", "1-4-3-2", "1-4-2-3"],
        answer: "D",
      },
      {
        q: "Perhatikan pernyataan-pernyataan di bawah ini!\n1) Memerlukan perangko dan kotak pos untuk pengirimannya.\n2) Surat dikirimkan melalui jaringan internet menggunakan perangkat komputer atau ponsel pintar.\n3) Membutuhkan waktu beberapa hari agar surat sampai ke alamat tujuan.\n4) Pesan dapat terkirim dan diterima secara langsung (instan) dalam hitungan detik.\n5) Alamat tujuan ditulis dalam format khusus seperti nama@penyedia.com.\nBerdasarkan pernyataan di atas, ciri khas dan makna dari surat elektronik (e-mail) yang tepat ditunjukkan oleh nomor…",
        options: ["1,2, dan 3", "1,3, dan 5", "2,4, dan 5", "3,4, dan 5"],
        answer: "C",
      },
      {
        q: 'Bacalah kutipan artikel di bawah ini dengan cermat!\n"Dunia internasional kini semakin mengenal bakat dari Indonesia. Salah satu pianis muda berbakat asal Jakarta telah berhasil menembus panggung musik jazz dunia di Amerika Serikat. Sejak usia dini, ia sudah menunjukkan kemampuan luar biasa dalam bermain piano. Prestasi puncaknya adalah ketika ia berhasil masuk dalam nominasi penghargaan musik paling bergengsi di dunia, yaitu Grammy Awards, untuk kategori album jazz terbaik."\nBerdasarkan kutipan artikel di atas, siapakah sosok musisi Indonesia yang dimaksud?',
        options: [
          "Isyana Sarasvati",
          "Joey Alexander",
          "Sandhy Sondoro",
          "Rich Brian",
        ],
        answer: "B",
      },
      {
        q: "Cerita Malin Kundang mengisahkan seorang anak yang durhaka kepada ibunya setelah ia menjadi kaya. Akibatnya, ia dikutuk menjadi batu. cerita ini sering dinasehatkan oleh orang tua kepada anak-anaknya. Mengapa cerita Malin Kundang masih relevan dan penting untuk diceritakan hingga saat ini?",
        options: [
          "Karena cerita tersebut berasal dari Sumatera Barat.",
          "Agar anak-anak takut pergi merantau.",
          "Karena kutukan menjadi batu benar-benar bisa terjadi.",
          "Untuk mengajarkan pentingnya menghormati dan menyayangi orang tua",
        ],
        answer: "D",
      },
      {
        q: "Perhatikan kalimat berikut (1) Indonesia merdeka pada tanggal 17 Agustus 1945. (2) Menurut saya, Indonesia adalah negara yang paling indah. Kalimat yang merupakan Fakta adalah..",
        options: [
          "Kalimat 1",
          "Kalimat 2",
          "Kalimat 1 dan 2",
          "Tidak Ada yang Fakta",
        ],
        answer: "A",
      },
      {
        q: "Perhatikan pernyataan berikut!\n (1) Menyusun daftar pertanyaan\n (2) Menentukan tujuan wawancara\n (3) Menentukan narasumber\n (4) Mempelajari topik yang akan dibahas\nUrutan yang tepat langkah-langkah yang perlu dilakukan sebelum melakukan wawancara adalah ….",
        options: [
          "(2) – (3) – (4) – (1)",
          "(3) – (2) – (1) – (4)",
          "(4) – (2) – (3) – (1)",
          "(2) – (4) – (3) – (1)",
        ],
        answer: "A",
      },
      {
        q: "Perhatikan kalimat berikut!\n “Air mata ibu mengalir seperti sungai yang tak pernah kering saat melepas kepergian anaknya.”\n Majas yang tepat digunakan dalam kalimat tersebut adalah ….",
        options: ["personifikasi", "Metafora", "Hiperbola", "Simile"],
        answer: "D",
      },
      {
        q: "“Ibu selalu menasehati kami agar tidak hidup seperti katak dalam tempurung.”\nMakna majas asosiasi pada kalimat di atas adalah ….",
        options: [
          "Orang yang memiliki wawasan sangat sempit namun merasa tahu segalanya",
          "Sesorang yang lincah dan pandai melompat ke sana kemari",
          "Orang yang selalu merasa ketakutan dan bersembunyi di tempat gelap",
          "Seseorang yang hidupnya selalu berpindah - pindah tempat tinggal",
        ],
        answer: "A",
      },
      {
        q: "“Suara gemuruh awan kelabu menggema di langit.”\nMajas yang digunakan dalam kalimat di atas adalah …..",
        options: ["personifikasi", "Metafora", "Hiperbola", "Onomatope"],
        answer: "D",
      },
      {
        q: "Walaupun berasal dari keluarga tidak mampu, arman tidak pernah patah arang. ia belajar dengan giat setiap malam agar bisa mendapatkan beasiswa ke sekolah favoritnya. Makna ungkapan “Patah Arang” adalah…",
        options: [
          "Putus Asa",
          "Kehabisan Akal",
          "Tidak Bersemangat",
          "Sakit Hati",
        ],
        answer: "A",
      },
      {
        q: ' "Harga kebutuhan pokok di pasar tradisional mengalami kenaikan yang signifikan menjelang hari raya."\nAntonim dari kata kenaikan pada kalimat tersebut adalah ....',
        options: ["Penurunan", "Peningkatan", "Perbaikan", "Perubahan"],
        answer: "A",
      },
      {
        q: 'Perhatikan pernyataan berikut:\n Kata "indah" memiliki makna yang sama dengan kata "elok".\nBerdasarkan pernyataan tersebut, kata yang bersinonim dengan kata indah adalah ....',
        options: ["Buruk", "Cantik", "Rusak", "Kusam"],
        answer: "B",
      },
      {
        q: 'Bacalah ringkasan pidato berikut!\n"Teman-teman sekalian, marilah kita mulai menjaga kebersihan lingkungan sekolah dari hal yang paling kecil, yaitu membuang sampah pada tempatnya. Dengan lingkungan yang bersih, belajar pun akan menjadi lebih nyaman. Akhir kata, mohon maaf jika ada perkataan saya yang kurang berkenan. Terima kasih atas perhatiannya."\nBagian teks pidato tersebut merupakan ...',
        options: ["Pembukaan", "Isi", "Penutup", "Pendahuluan"],
        answer: "C",
      },
      {
        q: "Albi menjadi buah bibir di sekolahnya setelah memenangkan lomba pidato tingkat nasional. Arti ungkapan “buah bibir” dalam kalimat tersebut adalah ….",
        options: [
          "Bibir yang manis",
          "Bahan pembicaraan orang banyak",
          "Hadiah berupa buah",
          "Sesuatu yang dimakan",
        ],
        answer: "B",
      },
      {
        q: "Perhatikan kalimat berikut!\n1.\tIbu memasak sayur di dapur.\n2.\tAdik tidur nyenyak di kamar.\n3.\tKakak menendang bola ke arah gawang.\n4.\tBurung-burung beterbangan di langit.\nKalimat yang termasuk kalimat transitif ditunjukkan oleh nomor ....",
        options: ["1 dan 2", "1 dan 3", "2 dan 4", "3 dan 4"],
        answer: "B",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Pada musim hujan, banyak warga mengalami banjir karena sungai meluap.”\nKata “banjir” pada kalimat tersebut memiliki makna yang berbeda dengan kalimat ....",
        options: [
          "Desa itu banjir bantuan dari para donatur.",
          "Air sungai meluap hingga menyebabkan banjir besar.",
          "Jalan raya tergenang akibat banjir semalam.",
          "Rumah warga rusak diterjang banjir bandang.",
        ],
        answer: "A",
      },
      {
        q: "Mala ingin melengkapi kalimat berikut.\n“Ibu sedang .... pakaian di halaman rumah agar cepat kering.”\nKata berimbuhan me- yang tepat untuk melengkapi kalimat tersebut adalah ....",
        options: ["Menjemur", "Jemuran", "Dijemur", "terjemur"],
        answer: "A",
      },
      {
        q: "Antonim kata “hemat” pada kalimat “Aliciea anak yang hemat dalam menggunakan uang saku” adalah ....",
        options: ["Rajin", "Boros", "Pelit", "Sederhana"],
        answer: "B",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Globalisasi membuat informasi dari berbagai negara dapat diketahui dengan cepat.”\nMakna kata “globalisasi” pada kalimat tersebut adalah ....",
        options: [
          "perpindahan penduduk",
          "kerja sama antarwarga",
          "mendunianya suatu hal",
          "kegiatan jual beli di pasar",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan bagian surat berikut!\nTasikmalaya, 12 Mei 2026\nBagian surat resmi tersebut disebut ....",
        options: [
          "Salam Pembuka",
          "Kepala Surat",
          "Tempat dan Tanggal Surat",
          "Isi Surat",
        ],
        answer: "C",
      },
      {
        q: "Bacalah pernyataan berikut!\n“Wawancara yang ditulis kembali dalam bentuk percakapan lengkap disebut transkrip wawancara.”\nMakna dari transkrip wawancara adalah ....",
        options: [
          "hasil pidato narasumber",
          "catatan singkat wawancara",
          "rekaman suara wawancara",
          "hasil penulisan kembali wawancara secara lengkap",
        ],
        answer: "D",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Semangat para pemain itu membara saat pertandingan dimulai.”\nKalimat tersebut menggunakan majas ....",
        options: ["Hiperbola", "Metafora", "Personifikasi", "Asosiasi"],
        answer: "B",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Menurut saya, membaca buku lebih menyenangkan daripada bermain gim sepanjang hari.”\nKalimat tersebut termasuk ....",
        options: ["Fakta", "Opini", "Perintah", "Saran"],
        answer: "B",
      },
      {
        q: "Perhatikan data pengunjung perpustakaan berikut!\nSenin : 20 siswa\nSelasa : 35 siswa\nRabu : 30 siswa\nKamis : 40 siswa\nBerdasarkan data tersebut, kesimpulan yang tepat adalah ....",
        options: [
          "Hari Senin paling banyak pengunjungnya",
          "Hari Kamis memiliki pengunjung terbanyak",
          "Hari Selasa paling sedikit pengunjungnya",
          "Jumlah pengunjung setiap hari sama",
        ],
        answer: "B",
      },
      {
        q: "Penulisan nilai uang yang tepat adalah ....",
        options: [
          "Rp15.000,00 (lima belas ribu rupiah)",
          "Rp.15.000 (lima belas ribu rupiah)",
          "15.000 rupiah",
          "Rp15,000.00",
        ],
        answer: "A",
      },
      {
        q: "Perhatikan idiom berikut!\n1.\tKambing hitam\n2.\tBuah tangan\n3.\tPanjang tangan\nMakna idiom “panjang tangan” adalah ....",
        options: [
          "Suka menolong",
          "Suka Mencuri",
          "Ringan Tangan",
          "Mudah Marah",
        ],
        answer: "B",
      },
      {
        q: "Berikut yang termasuk unsur surat resmi adalah ....",
        options: [
          "nama panggilan",
          "alamat teman",
          "nomor surat",
          "nama hewan peliharaan",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan kalimat langsung berikut!\nAyah berkata, “Besok kita akan pergi ke rumah nenek.”\nKalimat tidak langsung yang tepat adalah ....",
        options: [
          "Ayah berkata bahwa besok kita akan pergi ke rumah nenek.",
          "Ayah berkata, besok kita akan pergi ke rumah nenek.",
          "“Besok kita akan pergi ke rumah nenek,” kata Ayah.",
          "Ayah mengatakan besok pergi rumah nenek.",
        ],
        answer: "A",
      },
      {
        q: "Perhatikan kutipan berikut!\n“Pendidikan adalah senjata paling ampuh untuk mengubah dunia.”\nTokoh yang terkenal dengan kutipan tersebut adalah ....",
        options: [
          "Ir. Soekarno",
          "B.J. Habibie",
          "Nelson Mandela",
          "Ki Hajar Dewantara",
        ],
        answer: "C",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Nissa membaca buku cerita di perpustakaan.”\nPola kalimat tersebut adalah ....",
        options: ["SP", "SPO", "SPK", "SPOK"],
        answer: "D",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Bunga desa itu menjadi bunga tidur bagiku.”\nMakna kata “bunga” yang berbeda ditunjukkan pada bagian ....",
        options: ["Bunga Desa", "Bunga Tidur", "Menjadi", "Bagiku"],
        answer: "B",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Petani itu sedang .... sawah sejak pagi.”\nKata berimbuhan me- yang tepat adalah ....",
        options: ["Membajak", "Bajakan", "Dibajak", "Terbajak"],
        answer: "A",
      },
      {
        q: "Bacalah pernyataan berikut!\n“Air mendidih pada suhu 100°C.”\nPernyataan tersebut termasuk ....",
        options: ["Opini", "Khayalan", "Fakta", "Saran"],
        answer: "C",
      },
      {
        q: "Sebuah iklan berisi ajakan memakai helm saat berkendara untuk menjaga keselamatan. Jenis iklan tersebut adalah ....",
        options: [
          "Niaga",
          "Pelayanan Masyarakat",
          "Penawaran Barang",
          "Hiburan",
        ],
        answer: "B",
      },
      {
        q: "Antonim kata “tinggi” pada kalimat “Pohon itu sangat tinggi” adalah ....",
        options: ["Besar", "Pendek", "Luas", "Sempit"],
        answer: "B",
      },
      {
        q: "Perhatikan ciri-ciri berikut!\n1.\tMenggunakan bahasa santai\n2.\tDitujukan kepada teman atau keluarga\n3.\tMenggunakan bahasa resmi baku\nCiri surat pribadi ditunjukkan oleh nomor ....",
        options: ["1 dan 2", "1 dan 3", "2 dan 3", "1, 2, dan 3"],
        answer: "A",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Suara penyanyi itu merdu seperti bulu perindu.”\nKalimat tersebut menggunakan majas ....",
        options: ["Hiperbola", "Metafora", "Asosiasi", "Personifikasi"],
        answer: "C",
      },
      {
        q: "Perhatikan kalimat berikut!\n“Menurutku, olahraga pagi adalah kegiatan paling menyenangkan.”\nKalimat tersebut termasuk ....",
        options: ["Fakta", "Opini", "Berita", "Pengumuman"],
        answer: "B",
      },
      {
        q: "Berikut yang merupakan ciri kalimat langsung adalah ....",
        options: [
          "Menggunakan kata penghubung bahwa",
          "Tidak memakai tanda petik",
          "Menirukan ucapan seseorang secara langsung",
          "Isi kalimat sudah diubah penulis",
        ],
        answer: "C",
      },
    ],
  },
];

export default QUIZ_DATA;
