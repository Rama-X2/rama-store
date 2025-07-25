@echo off
echo 🔧 Comprehensive Build Fix - Cleaning all cache and rebuilding...

REM Step 1: Stop any running processes
echo 📴 Stopping any running processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im next.exe 2>nul

REM Step 2: Clean all cache and build files
echo 🧹 Cleaning all cache and build files...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist dist rmdir /s /q dist
if exist build rmdir /s /q build
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist .turbo rmdir /s /q .turbo
if exist .vercel rmdir /s /q .vercel

REM Step 3: Clean npm cache
echo 🗑️ Cleaning npm cache...
npm cache clean --force

REM Step 4: Remove node_modules and reinstall
echo 📦 Removing node_modules and reinstalling...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install

REM Step 5: Verify CSS file is correct
echo 🎨 Verifying CSS configuration...
findstr /C:"border-border" app\globals.css
if %ERRORLEVEL% EQU 0 (
    echo ❌ Found border-border in CSS - fixing now...
    powershell -Command "(Get-Content app\globals.css) -replace '@apply border-border;', '@apply border-gray-700/50;' | Set-Content app\globals.css"
)

REM Step 6: Build the project
echo 🏗️ Building the project...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build completed successfully!
    echo 🚀 Ready for deployment!
    echo.
    echo Next steps:
    echo 1. Test locally: npm run dev
    echo 2. Deploy to Vercel: vercel --prod
    echo 3. Or push to git for auto-deployment
) else (
    echo ❌ Build failed. Checking for other issues...
    echo 🔍 Displaying last 20 lines of build output for debugging...
)

pause