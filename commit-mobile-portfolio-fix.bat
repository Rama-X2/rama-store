@echo off
echo 🔄 Git Commit: Mobile Portfolio UI Fix...

REM Step 1: Add all changes
echo 📝 Adding all changes to git...
git add .

REM Step 2: Commit with descriptive message
echo 💾 Committing changes...
git commit -m "Fix: Mobile responsive design for portfolio component

- Added mobile navigation grid layout with 3 columns
- Responsive typography and spacing adjustments
- Fixed project cards display on mobile devices
- Improved contact form mobile experience
- Enhanced testimonials mobile layout
- Optimized modal project details for small screens
- Added proper truncation and overflow handling
- Maintained desktop layout integrity"

REM Step 3: Push to remote
echo 🚀 Pushing to remote repository...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully pushed mobile portfolio fixes!
    echo 🌐 Vercel should automatically redeploy with mobile improvements.
    echo.
    echo 📋 Mobile fixes applied:
    echo - Responsive navigation grid
    echo - Mobile-first typography scaling
    echo - Touch-friendly contact forms
    echo - Optimized project cards layout
    echo - Better modal experience on mobile
    echo.
    echo 🔗 Check your Vercel dashboard for deployment status.
) else (
    echo ❌ Failed to push to repository.
    echo 🔍 Please check your git configuration and try again.
)

pause
