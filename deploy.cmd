@echo off
echo Fixing topup modal bottom spacing and terminal warnings...

echo Adding changes to git...
git add .

echo Committing changes...
git commit -m "fix: resolve modal bottom cutoff and terminal warnings

- Fixed topup modal content being cut off below button
- Added proper bottom padding (pb-24) to purchase section
- Fixed modal height and scroll behavior for better UX
- Added missing favicon files to resolve 404 errors
- Updated .gitignore to prevent Windows system file warnings
- Improved modal responsive behavior and spacing
- Enhanced scroll container with better height calculations"

echo Pushing to GitHub...
git push origin main

echo Deploying to Vercel...
vercel --prod

echo Deployment complete!
pause
