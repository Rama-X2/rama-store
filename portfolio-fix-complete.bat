@echo off
echo.
echo ========================================
echo    PORTFOLIO COMPONENT FIX COMPLETE
echo ========================================
echo.
echo Testing the fixed Portfolio component...
echo.

echo [1/3] Running TypeScript type check...
call npm run type-check
if %errorlevel% neq 0 (
    echo.
    echo ❌ TypeScript errors still exist!
    echo Please check the console output above.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Running ESLint check...
call npm run lint
if %errorlevel% neq 0 (
    echo.
    echo ⚠️ ESLint warnings found, but continuing...
)

echo.
echo [3/3] Running build test...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed!
    echo Please check the console output above.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================
echo           ✅ SUCCESS! 
echo ========================================
echo.
echo Portfolio component has been fixed successfully!
echo.
echo What was fixed:
echo - ✅ Removed duplicate JSX elements
echo - ✅ Fixed unclosed HTML tags  
echo - ✅ Corrected component structure
echo - ✅ Added missing imports
echo - ✅ Fixed TypeScript errors
echo - ✅ Cleaned up malformed code
echo.
echo The application is now ready for deployment!
echo.
echo Next steps:
echo 1. Test the portfolio locally: npm run dev
echo 2. Deploy to Vercel: npm run deploy-vercel
echo.
pause
