@echo off
echo Updating Payment Layout...

echo.
echo Step 1: Adding files to git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Reorganize payment layout - separate payment methods in dedicated column with categorized sections"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo Layout update complete!
pause
