@echo off
echo 🔧 QUICK BUILD TEST - ANTI-CLONE SYSTEM
echo ========================================

echo.
echo 📦 Installing dependencies...
npm install

echo.
echo 🔍 Type checking...
npm run type-check

if %ERRORLEVEL% NEQ 0 (
    echo ❌ TypeScript errors found! Please fix before deploying.
    pause
    exit /b 1
)

echo.
echo 🏗️ Testing build...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo ✅ BUILD SUCCESS!
echo =================
echo.
echo 🎉 Your anti-clone system is ready to deploy!
echo.
echo Next steps:
echo 1. Run: deploy-anti-clone.bat (full deployment)
echo 2. Or run: test-quick.bat (test first)
echo.
echo 🔒 Anti-clone features enabled:
echo - ✅ Middleware protection active
echo - ✅ Domain validation for 'rama-store'
echo - ✅ Custom 403 error pages
echo - ✅ Security headers configured

pause
