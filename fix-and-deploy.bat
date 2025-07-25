@echo off
echo 🔧 Memperbaiki dan Deploy ke GitHub + Vercel...

REM Step 1: Clean up previous builds
echo 📁 Membersihkan build sebelumnya...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache

REM Step 2: Test build locally
echo 🏗️ Testing build local...
call npm run build

REM Check if build was successful
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build gagal! Periksa error di atas.
    pause
    exit /b 1
)

echo ✅ Build berhasil!

REM Step 3: Git operations
echo 📝 Melakukan commit ke Git...
git add .
git status
git commit -m "Fix: Resolve border-border CSS class error for Vercel deployment"

echo 🚀 Pushing ke GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo ✅ Berhasil push ke GitHub!
    echo.
    echo 🌐 Deployment akan otomatis di Vercel jika sudah terhubung dengan GitHub
    echo 📱 Cek status deployment di: https://vercel.com/dashboard
    echo.
    echo 🎉 Website Anda akan segera online!
) else (
    echo ❌ Gagal push ke GitHub. Periksa koneksi internet dan credentials.
    pause
    exit /b 1
)

echo.
echo 📋 Next Steps:
echo 1. Tunggu Vercel auto-deploy (biasanya 1-2 menit)
echo 2. Cek website Anda di URL Vercel
echo 3. Jika masih error, coba manual deploy: vercel --prod

pause