@echo off
echo ========================================
echo    FIXING 'self is not defined' ERROR
echo ========================================
echo.

echo Updating next.config.js with webpack fixes...
git add .
if errorlevel 1 (
    echo ERROR: Git add failed
    pause
    exit /b 1
)

echo Committing webpack fix...
git commit -m "Fix 'self is not defined' error with webpack config"
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
echo       WEBPACK ERROR FIXED
echo ========================================
echo.
echo Vercel seharusnya bisa build sekarang
echo.
pause
