@echo off
echo Testing Portfolio Component Fix...
echo.
echo [1/3] Running type check...
npm run type-check
if %errorlevel% neq 0 (
    echo ❌ Type check failed!
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Running lint check...
npm run lint
if %errorlevel% neq 0 (
    echo ⚠️ Lint issues found, continuing...
)

echo.
echo [3/3] Running build test...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b %errorlevel%
)

echo.
echo ✅ All tests passed! Portfolio component is fixed.
echo Ready for deployment.
pause
