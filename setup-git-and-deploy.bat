@echo off
REM Complete Git setup and deployment fix for Windows

echo 🔧 Setting up Git and fixing deployment...

REM Check if git repository exists
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    
    echo 🔗 Adding remote repository...
    git remote add origin https://github.com/Rama-X2/rama-store.git
    
    echo 👤 Setting up Git user...
    set /p email="Enter your GitHub email: "
    git config user.name "Rama-X2"
    git config user.email "%email%"
) else (
    echo ✅ Git repository already exists
)

REM Clean and rebuild
echo 🗑️ Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo 🧹 Clearing npm cache...
npm cache clean --force

echo 📦 Installing dependencies...
npm install

echo 🔍 Running type check...
npm run type-check

echo 🏗️ Building project...
npm run build

REM Git operations  
echo 📤 Committing changes...
git add .
git commit -m "fix: resolve deployment sync issues"

echo 🚀 Pushing to GitHub...
echo ⚠️  If prompted for password, use GitHub Personal Access Token!
echo 📖 Get token from: https://github.com/settings/tokens
git push origin main

echo ✅ Setup complete! Check Vercel for automatic deployment.

pause
