@echo off
echo ========================================
echo    FIXING TYPESCRIPT ERROR LINE 327
echo ========================================
echo.

echo Adding TypeScript fix for securityHeaders...
git add .
if errorlevel 1 (
    echo ERROR: Git add failed
    pause
    exit /b 1
)

echo Committing TypeScript fix...
git commit -m "Fix TypeScript error - add Record type for securityHeaders"
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
echo       TYPESCRIPT ERROR FIXED
echo ========================================
echo.
echo Vercel seharusnya bisa build sekarang
echo.
pause
