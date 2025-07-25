@echo off
echo ===============================================
echo    CHECKING GIT STATUS AND FORCING PUSH
echo ===============================================

echo Step 1: Current git status...
git status

echo.
echo Step 2: Checking if package-lock.json exists locally...
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
echo Step 3: Checking git log (last commits)...
git log --oneline -5

echo.
echo Step 4: Force adding ALL files...
git add -A
git add package-lock.json --force
git add .gitignore --force
git add package.json --force
git add vercel.json --force

echo.
echo Step 5: Checking staged files...
git status

echo.
echo Step 6: Committing with new timestamp...
git commit -m "URGENT FIX: Force commit package-lock.json for Vercel - %date% %time%"

echo.
echo Step 7: Force pushing to origin main...
git push origin main --force

echo.
echo Step 8: Verifying latest commit on GitHub...
echo Please check: https://github.com/Rama-X2/rama-store/commits/main
echo The latest commit should show package-lock.json added.

echo.
echo ===============================================
echo ✅ FORCED PUSH COMPLETED!
echo ===============================================
echo.
echo If this doesn't work, we need to check:
echo 1. GitHub repository settings
echo 2. Git remote configuration
echo 3. Manually upload package-lock.json to GitHub
echo.
pause
