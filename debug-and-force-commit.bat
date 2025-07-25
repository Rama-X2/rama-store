@echo off
echo ===============================================
echo    DEBUGGING: CHECK GIT STATUS AND FORCE COMMIT
echo ===============================================

echo Current directory:
cd

echo.
echo Git status:
git status

echo.
echo Checking if package-lock.json exists:
if exist package-lock.json (
    echo ✅ package-lock.json EXISTS locally
    dir package-lock.json
) else (
    echo ❌ package-lock.json NOT FOUND locally!
    echo Regenerating package-lock.json...
    del package-lock.json 2>nul
    npm install
)

echo.
echo Checking .gitignore content:
echo === .gitignore content ===
type .gitignore
echo === end of .gitignore ===

echo.
echo Force adding files:
git add --force package-lock.json
git add .gitignore
git add package.json
git add vercel.json

echo.
echo Git status after adding:
git status

echo.
echo Committing with new hash:
git commit -m "FORCE FIX: Commit package-lock.json - attempt %RANDOM%"

echo.
echo Pushing to GitHub:
git push origin main

echo.
echo Latest commit info:
git log --oneline -1

echo.
echo ===============================================
echo ✅ CHECKING COMPLETE - CHECK VERCEL NOW!
echo ===============================================
pause
