@echo off
echo Updating Payment Method Design...

echo.
echo Step 1: Adding files to git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Update payment method design - clean card layout without emojis"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo Payment method design update complete!
pause
