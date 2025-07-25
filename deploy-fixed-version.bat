@echo off
echo ========================================
echo   DEPLOYMENT FIX - TopUp Game Website
echo ========================================
echo.

echo 🔧 Step 1: Testing build process...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Check the errors above.
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

echo 📤 Step 2: Preparing for deployment...
git add .
git commit -m "Fix: Resolve CSS circular dependency issue in globals.css"

echo 🚀 Step 3: Pushing to repository...
git push origin main

echo.
echo ✅ All done! 
echo 🌐 Your website should now deploy successfully on Vercel.
echo 📱 Check your Vercel dashboard for the deployment status.
echo.
pause
