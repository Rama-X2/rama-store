@echo off
echo ========================================
echo       FIXING GIT CONFLICT
echo ========================================
echo.

echo Pulling latest changes from remote...
git pull origin main --rebase
if errorlevel 1 (
    echo ERROR: Git pull failed - ada conflict yang perlu diselesaikan manual
    echo Silakan selesaikan conflict lalu jalankan:
    echo git add .
    echo git rebase --continue
    echo git push origin main
    pause
    exit /b 1
)

echo.
echo Pushing updated changes...
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
echo.
pause
