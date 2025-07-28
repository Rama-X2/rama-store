@echo off
echo ====================================
echo 🔄 CLEANING AND TESTING BUILD
echo ====================================

echo.
echo 🧹 Cleaning build files...
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔍 Running type check...
call npm run type-check
if errorlevel 1 (
    echo ❌ Type check failed!
    pause
    exit /b 1
)

echo.
echo 🏗️ Testing build...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
) else (
    echo ✅ Build successful!
)

echo.
echo ✅ ALL TESTS PASSED!
echo 🚀 Your project is ready for deployment
echo.
echo Next steps:
echo 1. git add .
echo 2. git commit -m "Fix Vercel deployment issues"
echo 3. git push origin main
echo 4. Deploy to Vercel

pause