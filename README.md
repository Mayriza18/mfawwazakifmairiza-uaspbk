# 🚗 Aplikasi Rental Mobil UMKM

Aplikasi ini dibuat untuk membantu UMKM dalam mengelola penyewaan mobil secara sederhana dan efisien. Dibangun menggunakan **Vue 3 + Pinia + Tailwind CSS + JSON Server**.

---

## 🛠 Teknologi

- **Vue 3** – frontend
- **Pinia** – state management
- **Tailwind CSS** – styling responsif
- **JSON Server** – REST API tiruan

---

## 📦 Cara Menjalankan

### 1. Install dependency

```bash
npm install
```

### 2. Jalankan JSON Server (port 3000)

```bash
npx json-server --watch db.json --port 3000
```

### 3. Jalankan aplikasi

```bash
npm run dev
```

---

## 🌐 Routing Halaman

| Path        | Komponen             | Deskripsi                                                |
|-------------|----------------------|----------------------------------------------------------|
| `/`         | `Transaksi.vue`      | Pilih mobil & buat transaksi baru                        |
| `/info`     | `InfoTransaksi.vue`  | Menampilkan transaksi aktif dan menyelesaikannya         |
| `/laporan`  | `Laporan.vue`        | Menampilkan transaksi yang selesai dan pendapatan total  |

---

## 📚 Struktur `db.json`

```json
{
  "mobil": [
    {
      "id": 1,
      "nama": "Avanza",
      "plat_nomor": "B1234CD",
      "harga_per_hari": 350000,
      "disewa": false
    }
  ],
  "transaksi": [
    {
      "id": 1,
      "nama_penyewa": "Andi",
      "mobil_id": 1,
      "tanggal_mulai": "2025-07-08",
      "durasi_hari": 2,
      "tanggal_kembali": "2025-07-10",
      "tanggal_dikembalikan": "2025-07-10",
      "total_harga": 700000,
      "denda_per_hari": 50000,
      "denda_total": 0,
      "selesai": true
    }
  ]
}
```

---

## 📡 API Endpoint (JSON Server)

### 🚙 Mobil

| Endpoint              | Method | Deskripsi                          |
|-----------------------|--------|------------------------------------|
| `/mobil`              | GET    | Ambil semua mobil                  |
| `/mobil/:id`          | GET    | Ambil detail mobil berdasarkan ID  |
| `/mobil/:id`          | PATCH  | Update status `disewa` mobil       |

### 🔁 Transaksi

| Endpoint                 | Method | Deskripsi                                       |
|--------------------------|--------|-------------------------------------------------|
| `/transaksi`             | GET    | Ambil semua transaksi                           |
| `/transaksi/:id`         | GET    | Ambil detail transaksi berdasarkan ID           |
| `/transaksi`             | POST   | Tambah transaksi baru                           |
| `/transaksi/:id`         | PATCH  | Update transaksi saat diselesaikan              |

---

## ✅ Fitur Aplikasi

- Pilih mobil yang tersedia lalu isi data penyewa
- Tandai mobil dikembalikan → sistem hitung denda
- Laporan transaksi selesai dengan total pendapatan

---

## 💡 Pengembangan Berikutnya

- [ ] Filter laporan berdasarkan tanggal
- [ ] Export ke PDF / Excel
- [ ] Otentikasi pengguna admin
- [ ] Backend dengan database asli (MySQL/PostgreSQL)

---
