@echo off
echo 🧪 TESTING ANTI-CLONE PROTECTION SYSTEM...
echo ==================================================

echo.
echo 📝 Running anti-clone test script...
node test-anti-clone.js

echo.
echo 🔧 Testing local development build...
echo Starting Next.js development server for testing...

start /b npm run dev

echo Waiting for dev server to start...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 Testing localhost access...
echo This should work (contains localhost):

curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:3000 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Localhost access working
) else (
    echo ❌ Localhost access failed
)

echo.
echo 🚀 To test deployed version:
echo 1. Run: deploy-anti-clone.bat
echo 2. Check https://rama-store.vercel.app
echo 3. Try accessing any Vercel preview URL containing 'rama-store'

echo.
echo ⚠️  Remember: Only domains containing 'rama-store' will work!

pause

:: Stop the dev server
taskkill /F /IM node.exe >nul 2>&1
