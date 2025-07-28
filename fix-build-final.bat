@echo off
echo Fixing TypeScript build errors...

echo.
echo Step 1: Update tsconfig.json to exclude backup folder
echo tsconfig.json updated to exclude Baackup_File_Sebelumnya

echo.
echo Step 2: Test build locally
npm run type-check

echo.
echo Step 3: Commit changes
git add .
git commit -m "fix: Exclude backup folder from TypeScript compilation"

echo.
echo Step 4: Push to repository
git push origin main

echo.
echo Step 5: Deploy to Vercel
vercel --prod

echo.
echo Build fix and deployment complete!
pause
