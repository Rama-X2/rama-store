@echo off
echo =====================================
echo    Deploying to Vercel - Rama Store
echo =====================================

echo.
echo [1/4] Adding all changes...
git add .

echo.
echo [2/4] Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Anjay....kelar juga nih bug njir :v

git commit -m "%commit_msg%"

echo.
echo [3/4] Pushing to GitHub...
git push origin main

echo.
echo [4/4] Checking Vercel deployment status...
echo Visit https://vercel.com/dashboard to monitor deployment
echo Your app will be available at your Vercel domain once deployed

echo.
echo =====================================
echo     Deployment Complete!
echo =====================================
echo.
pause
