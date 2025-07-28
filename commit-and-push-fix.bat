@echo off
echo =====================================
echo  FIXING VERCEL MIDDLEWARE DEPLOYMENT
echo =====================================

echo.
echo [1/4] Adding files to git...
git add .

echo.
echo [2/4] Committing changes...
git commit -m "Fix: Remove middleware.ts from vercel.json functions config"

echo.
echo [3/4] Pushing to GitHub...
git push origin main

echo.
echo [4/4] Deployment will start automatically on Vercel...
echo.
echo =====================================
echo  FIX COMPLETED! 
echo =====================================
echo.
echo Check your Vercel dashboard for deployment status.
echo The middleware should now deploy properly.
echo.
pause
