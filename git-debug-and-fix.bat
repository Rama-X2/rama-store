@echo off
echo ===============================================
echo    GIT CONFIGURATION CHECK & FIX
echo ===============================================

echo Step 1: Checking git remote configuration...
git remote -v

echo.
echo Step 2: Checking current branch...
git branch

echo.
echo Step 3: Checking if we're ahead/behind remote...
git status -uno

echo.
echo Step 4: Fetching latest from remote...
git fetch origin

echo.
echo Step 5: Checking difference with remote...
git log HEAD..origin/main --oneline
git log origin/main..HEAD --oneline

echo.
echo Step 6: If needed, pull latest changes first...
git pull origin main --allow-unrelated-histories

echo.
echo Step 7: Now force adding package-lock.json...
if exist package-lock.json (
    echo ✅ package-lock.json found
) else (
    echo ❌ Regenerating package-lock.json...
    npm install
)

git add -A
git status

echo.
echo Step 8: Commit with unique message...
set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
git commit -m "Fix Vercel deployment: Add package-lock.json - %timestamp%"

echo.
echo Step 9: Push to remote...
git push origin main

echo.
echo ===============================================
echo Step 10: MANUAL VERIFICATION NEEDED
echo ===============================================
echo.
echo Please manually check:
echo 1. Go to: https://github.com/Rama-X2/rama-store
echo 2. Look for file: package-lock.json in the repository
echo 3. Check commit hash changed from 888d376
echo.
echo If package-lock.json is still missing on GitHub:
echo We need to upload it manually via GitHub web interface.
echo.
pause
