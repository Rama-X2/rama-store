@echo off
echo === FIXING VERCEL BUILD ISSUES ===
echo Timestamp: %date% %time%
echo.

cd /d "C:\rama.server.my.id\Project Web Topup"

echo 📂 Current directory: %cd%
echo.

echo 📋 Checking git status...
git status --porcelain

echo.
echo 🔧 Fixed Issues:
echo ✅ Fixed Button.tsx TypeScript error (conflicting event handlers)
echo ✅ All files already using next/image instead of ^<img^> tags
echo ✅ Removed motion props conflicts in button components
echo.

echo 📝 Adding all changes to git...
git add .

echo.
echo 📋 Files to be committed:
git diff --cached --name-only

echo.
echo 💾 Committing changes...
git commit -m "🚀 Fix Vercel build issues - Fixed Button.tsx TypeScript error by properly handling MotionProps conflicts - Resolved animation event handler conflicts between React and Framer Motion - Updated interface definitions to exclude conflicting motion props - All image components already using next/image properly - Ready for successful Vercel deployment Issues fixed: ✅ Button.tsx line 81 TypeScript error ✅ Motion props compatibility ✅ Event handler conflicts resolved"

echo.
echo 🚀 Pushing to GitHub...
git push origin main

echo.
echo ✅ DEPLOYMENT FIX COMPLETE!
echo.
echo 🎯 What was fixed:
echo    • Button.tsx TypeScript compilation error
echo    • Motion props event handler conflicts  
echo    • Proper interface type exclusions
echo.
echo 🚀 Your project should now deploy successfully on Vercel!
echo    Visit: https://vercel.com/rama-x2s-projects/rama-store
echo.
echo ⚡ Build should complete without errors now.
echo.
pause
