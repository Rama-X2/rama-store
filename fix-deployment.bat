@echo off
<<<<<<< HEAD
REM Fix deployment script for Windows

echo 🔧 Fixing deployment issues...

REM Remove old lock files and node_modules  
echo 🗑️ Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist npm-shrinkwrap.json del npm-shrinkwrap.json

REM Clear npm cache
echo 🧹 Clearing npm cache...
npm cache clean --force

REM Install dependencies fresh
echo 📦 Installing dependencies...
npm install

REM Run type check
echo 🔍 Running type check...
npm run type-check

REM Build the project
echo 🏗️ Building project...
npm run build

echo ✅ Build completed successfully!
echo 🚀 You can now deploy to Vercel

pause
=======
echo ========================================
echo Fixing Vercel Deployment Issues
echo ========================================

echo.
echo 1. Cleaning up node_modules and cache...
if exist node_modules (
    rmdir /s /q node_modules
    echo Node modules deleted.
)

if exist .next (
    rmdir /s /q .next
    echo Next.js cache deleted.
)

if exist package-lock.json (
    del package-lock.json
    echo Package lock deleted.
)

echo.
echo 2. Installing fresh dependencies...
npm install

echo.
echo 3. Running type check...
npm run type-check

echo.
echo 4. Running lint check...
npm run lint

echo.
echo 5. Testing build...
npm run build

echo.
echo ========================================
echo Fix completed! 
echo You can now try deploying to Vercel again.
echo ========================================

pause
>>>>>>> 59cb2333af0f3b513981ff5caa3d1e2f3d3aaa69
