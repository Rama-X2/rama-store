@echo off
echo ================================
echo COMMITTING FRAMER-MOTION FIXES
echo ================================

echo.
echo [1/4] Adding all changes to git...
git add .

echo.
echo [2/4] Committing changes...
git commit -m "Fix: Resolve framer-motion TypeScript errors

- Fixed import issues for motion and AnimatePresence
- Updated framer-motion version to stable v11.5.4
- Added proper TypeScript declarations for framer-motion
- Fixed parameter type errors in event handlers
- Ensured Node.js compatibility for Vercel deployment

Changes:
- package.json: Updated framer-motion to v11.5.4, adjusted Node version
- global.d.ts: Added comprehensive framer-motion type declarations
- GameDetail.tsx: Fixed event handler parameter types
- Leaderboard.tsx: Fixed event handler parameter types  
- ConfirmModal.tsx: Fixed event handler parameter types

This should resolve all TypeScript compilation errors in Vercel build."

echo.
echo [3/4] Pushing to GitHub...
git push origin main

echo.
echo [4/4] Checking git status...
git status

echo.
echo ================================
echo DEPLOYMENT PUSH COMPLETED!
echo ================================
echo.
echo Your changes have been pushed to GitHub.
echo Vercel will automatically start building the updated code.
echo Check your Vercel dashboard in a few minutes.
echo.
pause
