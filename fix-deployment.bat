@echo off
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
