@echo off
echo ⚠️  DISABLING ANTI-CLONE PROTECTION TEMPORARILY...

if exist middleware.ts (
    ren middleware.ts middleware.ts.disabled
    echo ✅ Middleware disabled (renamed to middleware.ts.disabled)
) else (
    echo ❌ middleware.ts not found
)

echo.
echo 📤 Committing changes...
git add .
git commit -m "🔧 Temporarily disable anti-clone middleware"
git push origin main

echo.
echo 🌐 Deploying without anti-clone protection...
vercel --prod

echo.
echo ⚠️  ANTI-CLONE PROTECTION IS NOW DISABLED!
echo To re-enable, run: enable-anti-clone.bat

pause
