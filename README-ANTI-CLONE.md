# 🔒 Sistem Anti-Clone Rama Store - Quick Guide

## 🚀 Deploy dengan Anti-Clone Protection

```bash
# Deploy langsung dengan perlindungan anti-clone
deploy-anti-clone.bat
```

## ✅ Domain yang Diizinkan

✅ **AKAN BISA DIAKSES:**
- `rama-store.vercel.app` (domain utama)
- `rama-store-git-main-xxx.vercel.app` (preview branch)
- `rama-store-abc123.vercel.app` (preview deployment)
- `test-rama-store-xyz.vercel.app` (semua yang mengandung 'rama-store')
- `localhost:3000` (development)

❌ **AKAN DIBLOKIR:**
- `other-store.vercel.app`
- `clone-website.vercel.app` 
- `fake-domain.com`
- Semua domain yang TIDAK mengandung 'rama-store'

## 🧪 Testing

```bash
# Test sistem anti-clone
test-quick.bat

# Test manual dengan Node.js
node test-anti-clone.js
```

## ⚙️ Control System

```bash
# Disable sementara (jika diperlukan)
disable-anti-clone.bat

# Enable kembali
enable-anti-clone.bat
```

## 🔧 Cara Kerja

1. **Middleware** (`middleware.ts`) mengecek setiap request
2. Jika domain mengandung 'rama-store' → **IZINKAN** (200)
3. Jika domain TIDAK mengandung 'rama-store' → **BLOKIR** (403)
4. Response 403 menampilkan halaman error kustom

## ⚠️ Catatan Penting

- Sistem ini akan mengizinkan SEMUA Vercel preview deployment yang mengandung 'rama-store'
- Cocok untuk development workflow dengan Vercel
- Domain localhost tetap bisa diakses untuk development
- Keamanan utama ada di server-side (tidak bisa dimanipulasi)

---
**🎯 Result:** Hanya website dengan domain yang mengandung 'rama-store' yang bisa diakses!
