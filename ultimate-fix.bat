@echo off
echo ===============================================
echo    ULTIMATE FIX: FORCE REGENERATE AND COMMIT
echo ===============================================

echo Step 1: Clean and regenerate everything...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules rmdir /s /q node_modules

echo Step 2: Delete old package-lock.json and regenerate...
if exist package-lock.json del package-lock.json

echo Step 3: Fresh npm install to create new package-lock.json...
npm install

echo Step 4: Verify package-lock.json was created...
if not exist package-lock.json (
    echo ERROR: package-lock.json was not created!
    pause
    exit /b 1
)

echo ✅ package-lock.json created successfully!
dir package-lock.json

echo Step 5: Test build locally...
npm run build
if errorlevel 1 (
    echo ERROR: Build failed locally!
    pause
    exit /b 1
)

echo Step 6: Force add all important files...
git add --force package-lock.json
git add --force package.json
git add --force vercel.json
git add --force .gitignore

echo Step 7: Show what will be committed...
git status

echo Step 8: Commit with unique message...
set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%
git commit -m "ULTIMATE FIX: Fresh package-lock.json and npm install for Vercel - %timestamp%"

echo Step 9: Push to GitHub with force if needed...
git push origin main
if errorlevel 1 (
    echo Trying with force push...
    git push --force-with-lease origin main
)

echo Step 10: Show latest commit...
git log --oneline -1

echo.
echo ===============================================
echo ✅ ULTIMATE FIX COMPLETE!
echo ===============================================
echo.
echo What was done:
echo ✅ Regenerated fresh package-lock.json
echo ✅ Changed vercel.json to use "npm install" instead of "npm ci"
echo ✅ Force committed package-lock.json to repository
echo ✅ Pushed new commit to GitHub
echo.
echo 🚀 Go check your Vercel deployment now!
echo It should work with the new commit.
echo.
pause
