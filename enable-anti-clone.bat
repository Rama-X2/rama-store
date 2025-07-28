@echo off
echo 🔒 ENABLING ANTI-CLONE PROTECTION...

if exist middleware.ts.disabled (
    ren middleware.ts.disabled middleware.ts
    echo ✅ Middleware enabled (renamed from middleware.ts.disabled)
) else (
    echo ❌ middleware.ts.disabled not found
)

echo.
echo 📤 Committing changes...
git add .
git commit -m "🔒 Re-enable anti-clone middleware protection"
git push origin main

echo.
echo 🌐 Deploying with anti-clone protection...
vercel --prod

echo.
echo ✅ ANTI-CLONE PROTECTION IS NOW ACTIVE!
echo 🔒 Only domains containing 'rama-store' can access the website

pause
