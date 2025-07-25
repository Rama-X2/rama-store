@echo off
echo ================================
echo FIXING FRAMER-MOTION BUILD ISSUES
echo ================================

echo.
echo [1/6] Cleaning previous builds...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del "package-lock.json"
if exist ".next" rmdir /s /q ".next"
if exist "tsconfig.tsbuildinfo" del "tsconfig.tsbuildinfo"

echo.
echo [2/6] Installing dependencies with correct framer-motion version...
npm install

echo.
echo [3/6] Running type check...
npm run type-check

echo.
echo [4/6] Running build test...
npm run build

echo.
echo [5/6] Testing development server (will start for 10 seconds)...
timeout /t 2 /nobreak >nul
start /B npm run dev
timeout /t 10 /nobreak >nul
taskkill /F /IM node.exe 2>nul

echo.
echo [6/6] Final cleanup...
if exist ".next" rmdir /s /q ".next"

echo.
echo ================================
echo FRAMER-MOTION FIX COMPLETED!
echo ================================
echo.
echo Now you can:
echo 1. Run 'npm run dev' to test locally
echo 2. Push to GitHub to deploy to Vercel
echo.
pause
