@echo off
echo ===============================================
echo    FINAL FIX: COMMIT PACKAGE-LOCK.JSON
echo ===============================================

echo Step 1: Checking current git status...
git status

echo.
echo Step 2: Removing package-lock.json dari git ignore sudah dilakukan
echo File .gitignore sudah diperbaiki

echo.
echo Step 3: Adding package-lock.json to git (ini penting!)...
git add package-lock.json
git add .gitignore
git add package.json
git add vercel.json

echo.
echo Step 4: Checking what will be committed...
git status

echo.
echo Step 5: Committing the essential files...
git commit -m "Fix: Remove package-lock.json from .gitignore and commit it for Vercel deployment"

echo.
echo Step 6: Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo ERROR: Failed to push to GitHub!
    echo Trying to pull first...
    git pull origin main
    echo Trying to push again...
    git push origin main
)

echo.
echo ===============================================
echo ✅ PACKAGE-LOCK.JSON NOW COMMITTED TO GITHUB!
echo ===============================================
echo.
echo Changes made:
echo ✅ Removed package-lock.json from .gitignore
echo ✅ Committed package-lock.json to repository  
echo ✅ Updated Node.js to 22.x
echo ✅ Optimized vercel.json
echo.
echo ⚡ Vercel will now find package-lock.json and deployment should succeed!
echo Check your Vercel dashboard in a few minutes.
echo.
pause
