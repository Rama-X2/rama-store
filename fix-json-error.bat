@echo off
echo 🔧 Fixing JSON syntax error and pushing...

echo 📋 Current status:
git status

echo 🧹 Cleaning files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo 📦 Fresh install...
npm install

echo 📤 Committing fixed package.json...
git add .
git commit -m "fix: resolve JSON syntax error in package.json"

echo 🚀 Pushing to GitHub...
git push origin main

echo ✅ Done! Check Vercel - should deploy successfully now!

pause
