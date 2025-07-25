@echo off
echo 🚨 FINAL FIX: Removing problematic package-lock.json from repository

echo 🗑️ Removing package-lock.json from Git tracking...
git rm package-lock.json

echo 📝 Adding .gitignore to ignore package-lock.json...
echo package-lock.json >> .gitignore

echo 🧹 Cleaning local files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo 📦 Generating fresh package-lock.json...
npm cache clean --force
npm install

echo 📤 Committing changes...
git add .
git commit -m "fix: remove package-lock.json and regenerate dependencies"

echo 🚀 Pushing to GitHub...
git push origin main

echo ✅ Done! Vercel will now build successfully.
echo 📋 Next: Wait for Vercel auto-deployment or trigger manual redeploy.

pause
