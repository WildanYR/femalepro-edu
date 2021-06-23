Femalepro Edu
=================
aplikasi ini dibuat menggunakan javascript framework [Vue.js v3](https://v3.vuejs.org/) dan menggunakan **Firestore Database** (service database gratis) dari [Firebase](https://firebase.google.com/) kemudian di distribusikan secara online menggunakan **Firebase Hosting** (hosting gratis) yang juga dari [Firebase](https://firebase.google.com/)

cara kerja aplikasi
----------------------
pertama kali user membuka aplikasi akan diarahkan ke halaman utama, disana ditampilkan tips singkat dan 5 berita terbaru mengenai kesehatan yang bersumber dari website berita di Indonesia ( data berita didapatkan dari [newsapi.org](https://newsapi.org) ). terdapat tombol `Tanya Dokter` yang ketika di klik akan diarahkan ke halaman pencarian dengan keluhan yang dirasakan

dihalaman ini user harus memasukkan keluhan yg dirasakan di form pencarian yg ada lalu memilih data keluhan yang sekiranya sama seperti yang dirasakan. jika sudah selesai memilih keluhan maka user harus klik tombol `cari penyakit` yang akan diarahkan kehalaman daftar penyakit sesuai dengan keluhan yang telah dimasukkan user

dihalaman daftar penyakit ini akan ditampilkan daftar penyakit beserta diagnosanya, user bisa membaca sekiranya sesuai dengan yang dirasakan dan bisa klik tombol untuk kemudian diarahkan ke halaman detail penyakit

dihalaman detail penyakit ditampilkan data penyakit juga saran untuk pengobatan dan tombol untuk mencari rumah sakit terdekat

**Note :** `seluruh data yang ditampilkan kepada user harus diisi oleh admin terlebih dahulu`

Proses pembuatan
----------------------
1. persiapan
	- menentukan aplikasi seperti apa yang akan dibuat
	- menentukan platform aplikasi ( web/PWA )
	- menentukan bahasa program yang dipakai ( javascript )
	- menentukan framework yang dipakai ( Vue.js )
	- menentukan penyimpanan data ( firestore database )
2. membuat model data ( dapat dilihat di bagian **Model Data** )
3. membuat desain aplikasi
4. coding ( proses pembuatan aplikasi )
5. testing
6. deploy ke Firebase Hosting

Model Data
--------------
1. **Tips**
	- id
	- tips

2. **Keluhan**
	- id
	- text ( string/teks )

3. **Penyakit**
	- id
	- nama ( string/teks )
	- deskripsi ( string/teks )
	- diagnosa ( string/teks )
	- saran_pengobatan ( string/teks )
	- keluhan ( list keluhan )
