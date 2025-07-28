@echo off
echo ====================================
echo 🚀 FINAL DEPLOYMENT SCRIPT
echo ====================================

echo.
echo 🔍 Checking current status...
echo Working directory: %CD%

echo.
echo 🧹 Step 1: Cleaning environment...
if exist ".next" (
    echo Removing .next folder...
    rmdir /s /q ".next"
)
if exist "out" (
    echo Removing out folder...
    rmdir /s /q "out"
)
if exist "node_modules\.cache" (
    echo Removing node_modules cache...
    rmdir /s /q "node_modules\.cache"
)

echo.
echo 📦 Step 2: Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo 🔍 Step 3: Type checking...
call npm run type-check
if errorlevel 1 (
    echo ❌ Type check failed!
    echo Please fix TypeScript errors before deploying
    pause
    exit /b 1
)

echo.
echo 🏗️ Step 4: Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    echo Please check the error messages above
    pause
    exit /b 1
)

echo.
echo ✅ Build successful! Ready for deployment.
echo.

echo 📋 Deployment Checklist:
echo ✅ Dependencies installed
echo ✅ Type check passed
echo ✅ Build completed successfully
echo ✅ Anti-clone system disabled
echo ✅ Vercel configuration simplified

echo.
echo 🚀 Next steps for Vercel deployment:
echo.
echo 1. Commit changes to Git:
echo    git add .
echo    git commit -m "Fix deployment issues - disable anti-clone"
echo    git push origin main
echo.
echo 2. Deploy to Vercel:
echo    - Open https://vercel.com/dashboard
echo    - Import your GitHub repository
echo    - Or use CLI: vercel --prod
echo.
echo 3. Domain configuration:
echo    - All domains are now allowed
echo    - No restrictions on "rama-store"
echo    - Website accessible from any domain
echo.

set /p deploy_choice="Do you want to auto-commit and push to GitHub? (y/n): "
if /i "%deploy_choice%"=="y" (
    echo.
    echo 📤 Committing to GitHub...
    git add .
    git commit -m "Fix Vercel deployment issues - disable anti-clone system for compatibility"
    git push origin main
    
    if errorlevel 1 (
        echo ❌ Git push failed! Please check your Git configuration.
        pause
        exit /b 1
    ) else (
        echo ✅ Successfully pushed to GitHub!
        echo 🚀 Now you can deploy to Vercel from the dashboard
    )
) else (
    echo.
    echo 📝 Manual steps:
    echo 1. git add .
    echo 2. git commit -m "Fix deployment issues"
    echo 3. git push origin main
    echo 4. Deploy via Vercel dashboard
)

echo.
echo ====================================
echo ✅ DEPLOYMENT PREPARATION COMPLETE
echo ====================================
echo.
echo 📖 For detailed instructions, see DEPLOYMENT-GUIDE.md
echo 🆘 If you encounter issues, check the troubleshooting section
echo.

pause