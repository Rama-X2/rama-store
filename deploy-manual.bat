@echo off
echo ========================================
echo         MANUAL DEPLOYMENT GUIDE
echo ========================================
echo.
echo 1. Pastikan semua perubahan sudah disimpan
echo 2. Add semua file ke git:
echo    git add .
echo.
echo 3. Commit perubahan:
echo    git commit -m "Update anti-clone system"
echo.
echo 4. Push ke GitHub:
echo    git push origin main
echo.
echo 5. Vercel akan otomatis deploy dari GitHub
echo.
echo ========================================
echo         AUTO DEPLOYMENT START
echo ========================================
echo.

git add .
if errorlevel 1 (
    echo ERROR: Git add failed
    pause
    exit /b 1
)

git commit -m "Enable localhost access for development"
if errorlevel 1 (
    echo ERROR: Git commit failed
    pause
    exit /b 1
)

git push origin main
if errorlevel 1 (
    echo ERROR: Git push failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo       DEPLOYMENT COMPLETED
echo ========================================
echo.
echo Vercel akan otomatis deploy dalam beberapa menit
echo Cek status deployment di dashboard Vercel
echo.
pause
