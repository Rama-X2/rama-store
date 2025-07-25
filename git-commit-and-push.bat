@echo off
echo 🔄 Git Commit and Push with Fix...

REM Step 1: Add all changes
echo 📝 Adding all changes to git...
git add .

REM Step 2: Commit with descriptive message
echo 💾 Committing changes...
git commit -m "Fix: Resolve border-border CSS class error and build issues

- Replaced @apply border-border with @apply border-gray-700/50
- Updated Tailwind configuration with proper color definitions
- Cleaned up CSS to ensure build compatibility
- Added comprehensive build fix scripts"

REM Step 3: Push to remote
echo 🚀 Pushing to remote repository...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully pushed to repository!
    echo 🌐 Vercel should automatically redeploy with the fixes.
    echo.
    echo 📋 What was fixed:
    echo - CSS border-border class error resolved
    echo - Tailwind configuration updated
    echo - Build process should now work correctly
    echo.
    echo 🔗 Check your Vercel dashboard for deployment status.
) else (
    echo ❌ Failed to push to repository.
    echo 🔍 Please check your git configuration and try again.
)

pause