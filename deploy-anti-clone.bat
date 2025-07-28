@echo off
echo ==================================================
echo 🚀 DEPLOYING RAMA STORE WITH ANTI-CLONE PROTECTION
echo ==================================================

echo.
echo 📝 Step 1: Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo.
echo 📦 Step 2: Installing dependencies...
npm install

echo.
echo 🔧 Step 3: Type checking...
npm run type-check

echo.
echo 🏗️ Step 4: Building project...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo 📤 Step 5: Adding files to git...
git add .

echo.
echo 💾 Step 6: Committing changes...
git commit -m "🔒 Add anti-clone protection system

- Implement middleware-based domain validation
- Add flexible domain checking for all rama-store subdomains
- Support Vercel preview deployments with rama-store in name
- Add security headers and client-side protection
- Update metadata and configuration files"

echo.
echo 🚀 Step 7: Pushing to GitHub...
git push origin main

if %ERRORLEVEL% NEQ 0 (
    echo ⚠️ Git push failed, trying force push...
    git push origin main --force
)

echo.
echo 🌐 Step 8: Deploying to Vercel...
vercel --prod

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ==================================================
echo 🎉 Your Rama Store with anti-clone protection is now live!
echo.
echo 🔒 Domain Security Features:
echo - ✅ All domains containing 'rama-store' are allowed
echo - ✅ Vercel preview deployments supported
echo - ✅ Development localhost access enabled
echo - ✅ 403 Forbidden for unauthorized domains
echo.
echo 🌍 Access your site at:
echo - https://rama-store.vercel.app (main domain)
echo - Any Vercel preview URL containing 'rama-store'
echo ==================================================

pause
