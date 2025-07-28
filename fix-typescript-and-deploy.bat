@echo off
echo Fixing TypeScript errors and deploying...

echo.
echo Step 1: Remove backup files with errors
if exist "Baackup_File_Sebelumnya\GameDetail.tsx" (
    del "Baackup_File_Sebelumnya\GameDetail.tsx"
    echo Removed problematic backup file
)

echo.
echo Step 2: Adding to git and committing
git add .
git commit -m "fix: Remove backup files causing TypeScript build errors - remove GameDetail.tsx from backup folder"

echo.
echo Step 3: Pushing to GitHub
git push origin main

echo.
echo Step 4: Deploying to Vercel
vercel --prod

echo.
echo Fix and deployment complete!
pause
