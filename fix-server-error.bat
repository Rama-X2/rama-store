@echo off
echo ========================================
echo    FIXING SERVER-SIDE ERROR (self)
echo ========================================
echo.

echo Fixing lib/anti-clone.ts and AntiCloneProvider.tsx...
git add .
if errorlevel 1 (
    echo ERROR: Git add failed
    pause
    exit /b 1
)

echo Committing server-side fix...
git commit -m "Fix server-side error - simplify anti-clone utilities"
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
echo       SERVER-SIDE ERROR FIXED
echo ========================================
echo.
echo Vercel seharusnya bisa build sekarang
echo.
pause
