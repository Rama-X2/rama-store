@echo off
echo 🔍 Checking current Git status and forcing push...

echo 📋 Current Git status:
git status

echo 📊 Recent commits:
git log --oneline -3

echo 🗑️ Removing package-lock.json from Git tracking...
git rm --cached package-lock.json 2>nul

echo 📝 Ensuring .gitignore includes package-lock.json...
findstr /C:"package-lock.json" .gitignore >nul || echo package-lock.json >> .gitignore

echo 🧹 Cleaning local files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo 📦 Fresh npm install...
npm cache clean --force
npm install

echo 📤 Adding all changes...
git add .

echo 💾 Creating commit...
git commit -m "fix: remove package-lock.json and force npm install for Vercel"

echo 🚀 Force pushing to GitHub...
git push origin main --force

echo ✅ Checking if push was successful...
git log --oneline -1

echo 🎯 Done! Check Vercel now - new deployment should start automatically.
echo 📋 If still failing, manually redeploy in Vercel dashboard.

pause
