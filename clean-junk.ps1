# Script Pembersih Sampah Repositori Rama Store
# Simpan file ini di root folder repositori lokal Anda, lalu jalankan.

$ErrorActionPreference = "SilentlyContinue"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  RAMA STORE REPO JUNK CLEANER & GIT FIX  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Hapus Folder Sampah
$folders = @(
    "components/portfolio",
    "File Backup",
    "discord"
)

Write-Host "[1/5] Menghapus folder sampah..." -ForegroundColor Yellow
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Remove-Item -Recurse -Force $folder
        Write-Host "  -> Folder '$folder' berhasil dihapus." -ForegroundColor Green
    }
}

# 2. Hapus File Spesifik (Backup, Arsip, Log, dan Gambar Portfolio)
$files = @(
    "portfolio_mobile_about.jpg",
    "portfolio_mobile_projectsjpg.jpg",
    "tsconfig.tsbuildinfo",
    "middleware.old.ts",
    "test-anti-clone.js",
    "test-build.js",
    "simple.web.rama.rar",
    "_discord.rama-store.vercel.app.txt",
    "rama_store-fgap0vk9n-rama-x2s-projects_vercel_app_logs.csv"
)

Write-Host ""
Write-Host "[2/5] Menghapus file sampah spesifik..." -ForegroundColor Yellow
foreach ($file in $files) {
    if (Test-Path $file) {
        Remove-Item -Force $file
        Write-Host "  -> File '$file' berhasil dihapus." -ForegroundColor Green
    }
}

# Hapus file corrupted (nama aneh hasil bug git)
Get-ChildItem -Path . -File | ForEach-Object {
    if ($_.Name -like "dh=*" -or $_.Name -like "et --hard*" -or $_.Name -match "[^\x00-\x7F]") {
        Remove-Item -Force $_.FullName
        Write-Host "  -> File rusak '$($_.Name)' berhasil dihapus." -ForegroundColor Green
    }
}

# 3. Hapus Semua Script Windows/Linux di Root (kecuali script cleaner ini)
Write-Host ""
Write-Host "[3/5] Membersihkan script Batch/Bash di root folder..." -ForegroundColor Yellow
Get-ChildItem -Path . -File | ForEach-Object {
    $ext = $_.Extension.ToLower()
    $name = $_.Name.ToLower()
    if (($ext -eq ".bat" -or $ext -eq ".sh" -or $ext -eq ".cmd" -or $ext -eq ".ps1") -and $name -notlike "*clean-junk*" -and $name -notlike "*connect-git*") {
        Remove-Item -Force $_.FullName
        Write-Host "  -> Script '$($_.Name)' berhasil dihapus." -ForegroundColor Green
    }
}

# 4. Hapus Semua File Markdown di Root (kecuali README.md)
Write-Host ""
Write-Host "[4/5] Membersihkan panduan/dokumentasi sementara (.md)..." -ForegroundColor Yellow
Get-ChildItem -Path . -Filter "*.md" -File | ForEach-Object {
    if ($_.Name.ToLower() -ne "readme.md") {
        Remove-Item -Force $_.FullName
        Write-Host "  -> File panduan '$($_.Name)' berhasil dihapus." -ForegroundColor Green
    }
}

# 5. Git Status & Auto Commit/Push Instructions
Write-Host ""
Write-Host "[5/5] Memeriksa status Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "Repositori Git terdeteksi lokal!" -ForegroundColor Green
    Write-Host "Menjalankan sinkronisasi Git untuk menghapus file dari GitHub..." -ForegroundColor Cyan
    
    # Run git commands
    git add -A
    git commit -m "chore: clean up temporary files, scripts and assets"
    
    Write-Host ""
    Write-Host "Selesai! File sampah sudah dihapus dan di-commit di git lokal." -ForegroundColor Green
    Write-Host "Silakan jalankan perintah berikut untuk mengunggah ke GitHub:" -ForegroundColor Yellow
    Write-Host "  git push origin main" -ForegroundColor Cyan
} else {
    Write-Host "Folder ini bukan repositori Git aktif." -ForegroundColor Red
    Write-Host "Silakan salin script ini ke folder repositori Git lokal Anda yang terhubung dengan GitHub, lalu jalankan." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "PEMBERSIHAN SELESAI!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
