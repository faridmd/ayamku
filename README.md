# Ayamku - Kandang Ayam Cerdas

Ayamku adalah aplikasi berbasis web yang dirancang untuk memantau dan mengontrol kandang ayam secara cerdas. Aplikasi ini memungkinkan pengguna untuk memantau suhu, kelembaban, dan uptime kandang secara real-time, mengontrol perangkat seperti lampu, kipas, dan pompa air secara manual, serta mengakses data historis untuk analisis.

## Fitur Utama

1. **Monitoring Realtime**  
   Pantau suhu, kelembaban, dan uptime kandang ayam secara langsung melalui halaman monitoring.

2. **Kontrol Manual**  
   Kendalikan perangkat seperti lampu, kipas, dan pompa air secara manual melalui halaman kontrol.

3. **Database**  
   Akses data historis untuk analisis dan pengambilan keputusan. Data dapat dihapus langsung dari aplikasi.

4. **Responsive Design**  
   Aplikasi ini dirancang agar dapat digunakan dengan nyaman di perangkat desktop maupun mobile.

## Teknologi yang Digunakan

- **React**: Library utama untuk membangun antarmuka pengguna.
- **Material-UI**: Framework UI untuk komponen yang modern dan responsif.
- **Firebase**: Backend untuk autentikasi, database real-time, dan hosting.
- **Chart.js**: Visualisasi data menggunakan grafik garis dan gauge.
- **Vite**: Build tool modern untuk pengembangan aplikasi React.
- **Tailwind CSS**: Untuk styling tambahan.

## Struktur Proyek

```
src/
├── components/       # Komponen UI seperti Frame dan LineGraph
├── config/           # Konfigurasi Firebase
├── pages/            # Halaman utama aplikasi (Home, Monitoring, dll.)
├── assets/           # Aset seperti ikon
├── App.jsx           # Komponen utama aplikasi
├── main.jsx          # Entry point aplikasi
├── index.css         # Styling global
```

## Cara Menjalankan Proyek

1. Clone repository ini:

   ```bash
   git clone https://github.com/faridmd/ayamku.git
   cd ayamku
   ```

2. Install dependensi:

   ```bash
   npm install
   ```

3. Buat file `.env` berdasarkan `.env.example` dan isi dengan konfigurasi Firebase Anda.

4. Jalankan aplikasi dalam mode pengembangan:

   ```bash
   npm run dev
   ```

5. Akses aplikasi di browser melalui `http://localhost:5173`.

## Demo

Lihat demo aplikasi ini secara langsung di [ayamku.netlify.app](https://ayamku.netlify.app).

## Konfigurasi Firebase

Pastikan Anda memiliki akun Firebase dan telah membuat proyek. Isi file `.env` dengan informasi berikut:

```env
VITE_FIREBASE_APIKEY=your-firebase-api-key
VITE_FIREBASE_AUTHDOMAIN=your-firebase-auth-domain
VITE_FIREBASE_DB_URL=your-firebase-database-url
VITE_FIREBASE_PROJECTID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MSG_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

## Skrip yang Tersedia

- `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
- `npm run build`: Membuat build produksi aplikasi.
- `npm run preview`: Menjalankan server untuk melihat build produksi.
- `npm run lint`: Mengecek kode dengan ESLint.

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau laporkan masalah melalui [Issues](https://github.com/faridmd/ayamku/issues).
