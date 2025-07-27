@echo off
echo ========================================
echo    FIXING VERCEL MIDDLEWARE ERROR  
echo ========================================
echo.

echo Adding fixed vercel.json (remove middleware pattern)...
git add .
if errorlevel 1 (
    echo ERROR: Git add failed
    pause
    exit /b 1
)

echo Committing fix...
git commit -m "Fix vercel.json - remove invalid middleware pattern"
if errorlevel 1 (
    echo ERROR: Git commit failed
    pause
    exit /b 1
)

echo Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Git push failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo       MIDDLEWARE ERROR FIXED
echo ========================================
echo.
echo Vercel seharusnya bisa build sekarang
echo Middleware akan tetap jalan otomatis
echo.
pause
