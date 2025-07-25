@echo off
echo ===============================================
echo    FINAL DEPLOYMENT FIX FOR VERCEL
echo ===============================================

echo Step 1: Cleaning old files...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules rmdir /s /q node_modules

echo Step 2: Removing old package-lock.json and reinstalling...
if exist package-lock.json del package-lock.json

echo Step 3: Installing dependencies with npm install...
npm install

echo Step 4: Verifying package-lock.json exists...
if not exist package-lock.json (
    echo ERROR: package-lock.json was not created!
    pause
    exit /b 1
)

echo Step 5: Running type check...
npm run type-check
if errorlevel 1 (
    echo ERROR: TypeScript errors found!
    pause
    exit /b 1
)

echo Step 6: Running lint...
npm run lint
if errorlevel 1 (
    echo WARNING: Lint issues found, but continuing...
)

echo Step 7: Testing build locally...
npm run build
if errorlevel 1 (
    echo ERROR: Build failed locally!
    pause
    exit /b 1
)

echo Step 8: Adding all files to git...
git add .

echo Step 9: Committing changes...
git commit -m "Fix: Update Node.js to 22.x and regenerate package-lock.json for Vercel deployment"

echo Step 10: Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Failed to push to GitHub!
    pause
    exit /b 1
)

echo ===============================================
echo ✅ DEPLOYMENT FIX COMPLETED SUCCESSFULLY!
echo ===============================================
echo.
echo The fixes applied:
echo - Updated Node.js version from 18.x to 22.x
echo - Regenerated package-lock.json
echo - Optimized vercel.json configuration
echo - Increased function timeout to 30 seconds
echo.
echo Your project should now deploy successfully on Vercel!
echo Check your Vercel dashboard for deployment status.
echo.
pause
