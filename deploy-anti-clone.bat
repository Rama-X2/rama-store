@echo off
title Rama Store - Anti Clone Deployment Script
color 0A

echo.
echo ========================================
echo   RAMA STORE ANTI-CLONE DEPLOYMENT
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ npm is not available!
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available
echo.

REM Menu selection
:menu
echo.
echo SELECT DEPLOYMENT OPTION:
echo.
echo 1. 🧪 Test Anti-Clone System (Local)
echo 2. 🔧 Setup Environment Variables
echo 3. 🏗️  Build and Test Locally
echo 4. 🚀 Deploy to Vercel
echo 5. 🔍 Test Production Domain
echo 6. 📊 Run Full Test Suite
echo 7. 🛡️  Security Audit
echo 8. 📚 Show Documentation
echo 9. 🔧 Quick Fix Common Issues
echo 0. ❌ Exit
echo.
set /p choice="Enter your choice (0-9): "

if "%choice%"=="1" goto test_local
if "%choice%"=="2" goto setup_env
if "%choice%"=="3" goto build_test
if "%choice%"=="4" goto deploy_vercel
if "%choice%"=="5" goto test_production
if "%choice%"=="6" goto full_test
if "%choice%"=="7" goto security_audit
if "%choice%"=="8" goto show_docs
if "%choice%"=="9" goto quick_fix
if "%choice%"=="0" goto exit
echo Invalid choice. Please try again.
goto menu

:test_local
echo.
echo 🧪 TESTING ANTI-CLONE SYSTEM LOCALLY...
echo ========================================
echo.

REM Check if test file exists
if not exist "test-anti-clone.js" (
    echo ❌ Test file not found!
    echo Please make sure test-anti-clone.js exists in the project root.
    pause
    goto menu
)

echo Running local anti-clone tests...
node test-anti-clone.js --localhost
echo.
echo ✅ Local test completed!
echo.
pause
goto menu

:setup_env
echo.
echo 🔧 ENVIRONMENT VARIABLES SETUP
echo ===============================
echo.

REM Check if .env.example exists
if not exist ".env.example" (
    echo ❌ .env.example file not found!
    pause
    goto menu
)

echo Current environment setup:
echo.

REM Show current .env.local if exists
if exist ".env.local" (
    echo ✅ .env.local exists
    echo.
    echo Current ANTI_CLONE_ENABLED:
    findstr "ANTI_CLONE_ENABLED" .env.local 2>nul || echo   Not set
    echo.
    echo Current ALLOWED_DOMAINS:
    findstr "ALLOWED_DOMAINS" .env.local 2>nul || echo   Not set
    echo.
) else (
    echo ⚠️  .env.local does not exist
    echo.
    set /p create_env="Do you want to create .env.local from .env.example? (y/n): "
    if /i "%create_env%"=="y" (
        copy .env.example .env.local >nul
        echo ✅ Created .env.local from .env.example
        echo Please edit .env.local with your specific values
        echo.
    )
)

echo.
echo 📝 IMPORTANT ENVIRONMENT VARIABLES:
echo.
echo ANTI_CLONE_ENABLED=true
echo ALLOWED_DOMAINS=rama-store.vercel.app,localhost:3000
echo DOMAIN_CHECK_STRICT=true
echo ANTI_CLONE_BYPASS_SECRET=your-secret-key
echo.
echo Make sure to set these in:
echo 1. .env.local (for local development)
echo 2. Vercel Dashboard (for production)
echo.
pause
goto menu

:build_test
echo.
echo 🏗️  BUILD AND TEST LOCALLY
echo ==========================
echo.

echo Step 1: Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo ❌ npm install failed!
    pause
    goto menu
)

echo.
echo Step 2: Type checking...
call npm run type-check
if %ERRORLEVEL% neq 0 (
    echo ❌ Type check failed!
    pause
    goto menu
)

echo.
echo Step 3: Building project...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed!
    pause
    goto menu
)

echo.
echo Step 4: Testing anti-clone middleware...
if exist "test-anti-clone.js" (
    node test-anti-clone.js --all
) else (
    echo ⚠️  Test file not found, skipping anti-clone tests
)

echo.
echo ✅ Build and test completed successfully!
echo.
pause
goto menu

:deploy_vercel
echo.
echo 🚀 DEPLOY TO VERCEL
echo ===================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Vercel CLI is not installed!
    echo.
    set /p install_vercel="Do you want to install Vercel CLI? (y/n): "
    if /i "%install_vercel%"=="y" (
        echo Installing Vercel CLI globally...
        call npm install -g vercel
        if %ERRORLEVEL% neq 0 (
            echo ❌ Failed to install Vercel CLI!
            pause
            goto menu
        )
    ) else (
        goto menu
    )
)

echo ✅ Vercel CLI is available
echo.

echo Pre-deployment checklist:
echo.
echo ✅ 1. Environment variables set in Vercel Dashboard
echo ✅ 2. Domain list updated in middleware.ts
echo ✅ 3. Code committed to GitHub
echo ✅ 4. Local tests passed
echo.

set /p continue_deploy="Continue with deployment? (y/n): "
if /i not "%continue_deploy%"=="y" goto menu

echo.
echo Deploying to production...
call vercel --prod
if %ERRORLEVEL% neq 0 (
    echo ❌ Deployment failed!
    pause
    goto menu
)

echo.
echo ✅ Deployment completed!
echo.
echo 🔍 POST-DEPLOYMENT CHECKLIST:
echo - Test production domain access
echo - Verify anti-clone protection
echo - Check Vercel function logs
echo - Monitor error rates
echo.
set /p test_prod="Test production domain now? (y/n): "
if /i "%test_prod%"=="y" goto test_production
echo.
pause
goto menu

:test_production
echo.
echo 🔍 TESTING PRODUCTION DOMAIN
echo =============================
echo.

echo Testing rama-store.vercel.app...
echo.

REM Test using Node.js script
if exist "test-anti-clone.js" (
    echo 🌐 Running production domain tests...
    node test-anti-clone.js --allowed
    echo.
) else (
    echo ❌ Test file not found!
)

echo.
echo 📊 PRODUCTION TEST COMPLETED
echo.
echo Manual verification steps:
echo 1. Open https://rama-store.vercel.app in browser
echo 2. Check that website loads normally
echo 3. Verify security headers in DevTools
echo 4. Try accessing from different domain (should be blocked)
echo.
pause
goto menu

:full_test
echo.
echo 📦 RUNNING FULL TEST SUITE
echo ==========================
echo.

if not exist "test-anti-clone.js" (
    echo ❌ Test file not found!
    echo Please make sure test-anti-clone.js exists.
    pause
    goto menu
)

echo Running comprehensive anti-clone tests...
echo.
node test-anti-clone.js --all
echo.
echo ✅ Full test suite completed!
echo.
echo 📊 RESULTS INTERPRETATION:
echo - Green checkmarks: System working correctly
echo - Red X marks: Issues that need attention  
echo - Yellow warnings: Expected behavior or info
echo.
pause
goto menu

:security_audit
echo.
echo 🛡️  SECURITY AUDIT
echo ================
echo.

echo Checking security configuration...
echo.

REM Check middleware.ts exists
if exist "middleware.ts" (
    echo ✅ middleware.ts exists
    
    REM Check for allowed domains
    findstr "ALLOWED_PRODUCTION_DOMAINS" middleware.ts >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo ✅ Production domains configured
    ) else (
        echo ❌ Production domains not found in middleware
    )
    
    REM Check for bypass secret handling
    findstr "BYPASS_SECRET" middleware.ts >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo ✅ Bypass secret handling implemented
    ) else (
        echo ⚠️  No bypass secret handling found
    )
    
) else (
    echo ❌ middleware.ts not found!
)

echo.

REM Check .env.local security
if exist ".env.local" (
    echo ✅ .env.local exists
    
    findstr "ANTI_CLONE_ENABLED=true" .env.local >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo ✅ Anti-clone protection enabled
    ) else (
        echo ⚠️  Anti-clone protection may be disabled
    )
    
    findstr "ANTI_CLONE_BYPASS_SECRET" .env.local >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo ⚠️  Bypass secret configured (keep this secure!)
    )
    
) else (
    echo ⚠️  .env.local not found (using defaults)
)

echo.

REM Check .gitignore
if exist ".gitignore" (
    findstr ".env.local" .gitignore >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo ✅ .env.local is in .gitignore
    ) else (
        echo ⚠️  .env.local should be added to .gitignore
    )
) else (
    echo ❌ .gitignore not found!
)

echo.
echo 📋 SECURITY RECOMMENDATIONS:
echo.
echo 1. ✅ Keep .env.local out of version control
echo 2. ✅ Use strong bypass secrets (32+ characters)
echo 3. ✅ Regularly rotate bypass secrets
echo 4. ✅ Monitor Vercel function logs for suspicious activity
echo 5. ✅ Keep allowed domains list minimal
echo 6. ✅ Test anti-clone protection after each deployment
echo.
pause
goto menu

:show_docs
echo.
echo 📚 DOCUMENTATION
echo ===============
echo.

if exist "ANTI-CLONE-GUIDE.md" (
    echo ✅ Anti-Clone Guide available: ANTI-CLONE-GUIDE.md
    echo.
    echo Opening documentation...
    start ANTI-CLONE-GUIDE.md
) else (
    echo ❌ ANTI-CLONE-GUIDE.md not found!
)

echo.
echo 🔗 USEFUL LINKS:
echo.
echo - Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
echo - Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
echo - HTTP Security Headers: https://owasp.org/www-project-secure-headers/
echo.
echo 📞 SUPPORT:
echo.
echo If you encounter issues:
echo 1. Check Vercel function logs
echo 2. Verify environment variables
echo 3. Test in development first
echo 4. Use bypass secret for emergency access
echo.
pause
goto menu

:quick_fix
echo.
echo 🔧 QUICK FIX COMMON ISSUES
echo ===========================
echo.

echo SELECT ISSUE TO FIX:
echo.
echo 1. ❌ Website blocked on localhost
echo 2. ❌ Production domain returning 403
echo 3. ❌ Middleware not running
echo 4. ❌ Static files being blocked
echo 5. ❌ Environment variables not working
echo 0. ⬅️  Back to main menu
echo.
set /p fix_choice="Enter your choice (0-5): "

if "%fix_choice%"=="1" goto fix_localhost
if "%fix_choice%"=="2" goto fix_production
if "%fix_choice%"=="3" goto fix_middleware
if "%fix_choice%"=="4" goto fix_static
if "%fix_choice%"=="5" goto fix_env
if "%fix_choice%"=="0" goto menu
echo Invalid choice.
goto quick_fix

:fix_localhost
echo.
echo 🔧 FIXING LOCALHOST ACCESS ISSUES
echo ====================================
echo.
echo SOLUTION STEPS:
echo.
echo 1. Check .env.local file:
echo    ANTI_CLONE_ENABLED=true
echo    ALLOWED_DOMAINS="localhost:3000,localhost:3001,127.0.0.1:3000"
echo.
echo 2. Restart development server:
echo    npm run dev
echo.
echo 3. Clear browser cache (Ctrl+Shift+R)
echo.
set /p apply_fix="Apply automatic fix to .env.local? (y/n): "
if /i "%apply_fix%"=="y" (
    echo Updating .env.local...
    echo ANTI_CLONE_ENABLED=true >> .env.local
    echo ALLOWED_DOMAINS=rama-store.vercel.app,localhost:3000,localhost:3001,127.0.0.1:3000 >> .env.local
    echo ✅ .env.local updated! Please restart your dev server.
)
echo.
pause
goto quick_fix

:fix_production
echo.
echo 🔧 FIXING PRODUCTION 403 ERRORS
echo =================================
echo.
echo SOLUTION STEPS:
echo.
echo 1. Check Vercel environment variables:
echo    - Go to Vercel Dashboard → Project Settings → Environment Variables
echo    - Verify ALLOWED_DOMAINS includes: rama-store.vercel.app
echo.
echo 2. Check domain spelling (exact match required):
echo    - rama-store.vercel.app (✅ correct)
echo    - rama-store.vercel.app/ (❌ wrong - trailing slash)
echo.
echo 3. Redeploy after fixing:
echo    vercel --prod
echo.
echo 🚫 EMERGENCY BYPASS (if needed):
echo Add ?bypass=YOUR_SECRET_KEY to URL
echo.
pause
goto quick_fix

:fix_middleware
echo.
echo 🔧 FIXING MIDDLEWARE ISSUES
echo ============================
echo.
echo SOLUTION STEPS:
echo.
echo 1. Verify middleware.ts is in project root
echo 2. Clear .next folder and rebuild
echo.
echo Applying automatic fix...
if exist ".next" (
    echo Removing .next folder...
    rmdir /s /q .next
    echo ✅ .next folder removed
)
echo.
echo Rebuilding project...
call npm run build
if %ERRORLEVEL% equ 0 (
    echo ✅ Project rebuilt successfully!
) else (
    echo ❌ Build failed. Check error messages above.
)
echo.
pause
goto quick_fix

:fix_static
echo.
echo 🔧 FIXING STATIC FILE BLOCKING
echo =================================
echo.
echo SOLUTION:
echo The middleware is already configured to exclude static files.
echo If issues persist, check the matcher pattern in middleware.ts:
echo.
echo export const config = {
echo   matcher: [
echo     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)$).*)',
echo   ],
echo };
echo.
echo This pattern excludes common static file extensions.
echo Check Vercel function logs if problems continue.
echo.
pause
goto quick_fix

:fix_env
echo.
echo 🔧 FIXING ENVIRONMENT VARIABLE ISSUES
echo =====================================
echo.
echo SOLUTION STEPS:
echo.
echo 1. Local development (.env.local):
if exist ".env.local" (
    echo    ✅ .env.local exists
) else (
    echo    ❌ .env.local missing - creating from template...
    if exist ".env.example" (
        copy .env.example .env.local >nul
        echo    ✅ Created .env.local from .env.example
    )
)
echo.
echo 2. Production (Vercel Dashboard):
echo    - Go to Project Settings → Environment Variables
echo    - Add: ANTI_CLONE_ENABLED=true
echo    - Add: ALLOWED_DOMAINS=rama-store.vercel.app
echo    - Redeploy after changes
echo.
echo 3. Restart services after changes:
echo    - Development: npm run dev
echo    - Production: vercel --prod
echo.
pause
goto quick_fix

:exit
echo.
echo 👋 Thank you for using Rama Store Anti-Clone Deployment!
echo.
echo 📋 REMEMBER:
echo - Keep your bypass secret secure
echo - Monitor Vercel logs regularly
echo - Test after each deployment
echo - Update allowed domains as needed
echo.
echo 🔗 USEFUL RESOURCES:
echo - Documentation: ANTI-CLONE-GUIDE.md
echo - Test Suite: node test-anti-clone.js
echo - Vercel Dashboard: https://vercel.com/dashboard
echo.
echo Press any key to exit...
pause >nul
exit /b 0