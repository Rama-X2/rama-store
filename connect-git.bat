@echo off
title Menghubungkan ke GitHub Git
echo ===================================================
echo   MENGHUBUNGKAN FOLDER LOKAL KE GITHUB RAMA-STORE
echo ===================================================
echo.

:: Cek apakah git terpasang
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git tidak terdeteksi di komputer Anda!
    echo Silakan unduh dan instal Git terlebih dahulu dari: https://git-scm.com/
    echo.
    pause
    exit /b
)

echo [1/4] Menginisialisasi repositori Git lokal...
git init

echo [2/4] Menambahkan alamat remote GitHub...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Rama-X2/rama-store.git

echo [3/4] Mengambil (fetch) data sejarah dari GitHub...
git fetch origin

echo [4/4] Menghubungkan cabang utama tanpa menimpa file lokal...
git checkout -b main >nul 2>nul
git checkout main >nul 2>nul
git reset origin/main

echo.
echo ===================================================
echo   BERHASIL TERHUBUNG!
echo ===================================================
echo Sekarang, silakan klik dua kali script 'clean-junk.bat'
echo untuk menghapus semua sampah lokal dan git secara otomatis.
echo.
pause
