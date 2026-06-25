# 🎮 Rama Store - Website Top Up Game Terpercaya Indonesia

Platform simulasi top up game modern dengan tampilan premium, responsif, dan performa tinggi yang dioptimalkan untuk perangkat desktop maupun mobile.

> [!NOTE]
> **Catatan Proyek**: Proyek ini dibuat untuk keperluan demo tugas kuliah dan tidak terhubung dengan gerbang pembayaran (payment gateway) nyata. Semua transaksi dan fitur top up bersifat simulasi.

---

## ✨ Fitur Utama

### 🎯 Layanan Utama
- **🎮 Top Up Game**: Antarmuka pembelian diamond, coin, dan voucher game dengan alur yang dinamis.
- **🔍 Cek Transaksi**: Riwayat pencarian status transaksi menggunakan nomor invoice simulasi.
- **🏆 Leaderboard**: Peringkat spending terbanyak pemain (*top spender*) lengkap dengan podium interaktif.
- **📱 Credit & Pulsa**: Pembelian pulsa simulasi untuk 7 provider telekomunikasi di Indonesia.

### 🎮 Kategori Produk
1. **🆕 New Release** - Game-game terbaru dan sedang populer.
2. **⚡ Direct Topup** - Pengisian instan menggunakan User ID dan Server ID game.
3. **🔐 Via Login** - Pengisian saldo game melalui kredensial akun.
4. **🎬 Entertainment** - Berlangganan voucher layanan media & streaming premium.
5. **🎫 Voucher** - Pembelian voucher game digital.

### 🎨 Desain & Animasi Premium
- **💥 Splash Animation**: Animasi intro loading bertema game yang dinamis saat membuka produk.
- **🌊 Transisi Halus**: Efek perpindahan halaman dan interaksi tombol yang responsif didukung Framer Motion.
- **🔮 Modern Glassmorphism**: Gaya kartu kaca transparan dengan optimalisasi GPU rendering pada layar mobile.
- **🌙 Tema Gelap & Terang**: Dukungan transisi tema (*Dark/Light Mode*) yang responsif.

---

## 🚀 Spesifikasi Teknologi

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**

---

## 📁 Struktur Folder Proyek

```
rama-store-main/
├── 📁 app/                      # Struktur Utama Next.js 14 App Router
│   ├── 🎨 globals.css          # Kustomisasi Style Global & Tema
│   ├── 📄 layout.tsx           # Layout utama dan konfigurasi SEO
│   └── 🏠 page.tsx             # Halaman beranda utama
├── 📁 components/              # Komponen UI Reusable
│   ├── 🎮 GameGrid.tsx         # Grid daftar game dengan animasi hover
│   ├── 🎯 GameDetail.tsx       # Detail game & formulir pembayaran dua kolom
│   ├── 💥 SplashAnimation.tsx  # Efek splash loading saat membuka game
│   ├── ⭐ FeaturedGames.tsx    # Slider game populer horizontal
│   ├── 📊 Statistics.tsx       # Counter data statistik website
│   ├── 📁 pages/               # Sub-halaman (Leaderboard, Check, Credit)
│   └── 📁 portfolio/           # Komponen modal portofolio
├── 📁 public/                  # Asset statis gambar & ikon
└── 📁 types/                   # Definisi tipe TypeScript
```

---

## 🏷️ Optimasi & SEO
- **Lighthouse Performance**: Dioptimalkan untuk meminimalkan beban komputasi layout dan rendering.
- **Core Web Vitals**: Penggunaan radial-gradient untuk mengurangi beban filter blur berat pada perangkat mobile/Android.
- **SEO Ready**: Dilengkapi tag meta deskripsi, OpenGraph, Twitter Cards, dan JSON-LD terstruktur di dalam layout utama.
