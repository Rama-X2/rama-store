@echo off
echo 🔧 Fixing Next.js build issues...

REM Step 1: Clean up previous builds
echo 📁 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache

REM Step 2: Reinstall dependencies
echo 📦 Reinstalling dependencies...
npm install

REM Step 3: Run type check
echo 🔍 Running type check...
npm run type-check

REM Step 4: Run ESLint
echo 🧹 Running ESLint...
npm run lint

REM Step 5: Attempt build
echo 🏗️ Attempting build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build completed successfully!
    echo 🎉 Your app is ready for deployment.
) else (
    echo ❌ Build failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo 📝 Next steps:
echo 1. Test locally: npm run dev
echo 2. Deploy to Vercel: npm run deploy-vercel
echo 3. Or deploy to other platforms using: npm run build

pause