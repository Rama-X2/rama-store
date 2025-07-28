@echo off
echo ====================================
echo MOBILE RESPONSIVENESS FIX DEPLOYMENT
echo ====================================

echo.
echo [1/6] Adding all changes to git...
git add .

if %errorlevel% neq 0 (
    echo ERROR: Failed to add files to git
    pause
    exit /b 1
)

echo.
echo [2/6] Committing changes...
git commit -m "Fix mobile responsiveness issues - optimize header, modal, grid layout, and inputs for mobile devices"

if %errorlevel% neq 0 (
    echo ERROR: Failed to commit changes
    pause
    exit /b 1
)

echo.
echo [3/6] Pushing to main branch...
git push origin main

if %errorlevel% neq 0 (
    echo ERROR: Failed to push to git repository
    pause
    exit /b 1
)

echo.
echo [4/6] Verifying git status...
git status

echo.
echo [5/6] Deploying to Vercel...
npx vercel --prod

if %errorlevel% neq 0 (
    echo ERROR: Vercel deployment failed
    pause
    exit /b 1
)

echo.
echo [6/6] Deployment completed successfully!
echo.
echo MOBILE FIXES APPLIED:
echo - Responsive header with mobile navigation
echo - Optimized game grid for mobile screens  
echo - Mobile-friendly modal/popup layout
echo - Improved input components for touch devices
echo - Better spacing and typography scaling
echo - Reduced animations for mobile performance
echo.
echo Your website is now mobile-optimized!
echo Check your Vercel dashboard for the deployment URL.
echo.
pause
