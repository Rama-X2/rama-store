@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo    COMPREHENSIVE GIT DEBUG AND VERCEL FIX
echo =======================================================

echo [1/12] Current directory and git status...
cd /d "C:\rama.server.my.id\Project Web Topup"
pwd
git status

echo.
echo [2/12] Checking git configuration...
git config --list | findstr user
git remote -v

echo.
echo [3/12] Checking current branch and commits...
git branch
git log --oneline -3

echo.
echo [4/12] Checking if package-lock.json exists...
if exist package-lock.json (
    echo ✅ package-lock.json EXISTS
    echo File size: 
    dir package-lock.json | findstr package-lock.json
) else (
    echo ❌ package-lock.json missing! Regenerating...
    if exist node_modules rmdir /s /q node_modules
    npm install
)

echo.
echo [5/12] Checking .gitignore content...
echo Content of .gitignore:
type .gitignore | findstr -i package-lock

echo.
echo [6/12] Checking what git sees...
git ls-files | findstr package-lock
echo Above should show package-lock.json if it's tracked

echo.
echo [7/12] Force adding all important files...
git add package-lock.json --force
git add .gitignore --force  
git add package.json --force
git add vercel.json --force
git add next.config.js --force
git add tsconfig.json --force

echo.
echo [8/12] Checking staged files...
git status
git diff --cached --name-only

echo.
echo [9/12] Creating commit with unique timestamp...
set timestamp=%date:~-4,4%-%date:~-10,2%-%date:~-7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set timestamp=!timestamp: =0!
git commit -m "VERCEL FIX: Force add package-lock.json and config files [!timestamp!]"

echo.
echo [10/12] Checking if commit was created...
git log --oneline -1

echo.
echo [11/12] Pushing to GitHub (with force)...
git push origin main --force

echo.
echo [12/12] VERIFICATION - Check these manually:
echo ✅ GitHub repo: https://github.com/Rama-X2/rama-store
echo ✅ Look for package-lock.json in file list
echo ✅ Commit hash should be different from 888d376
echo ✅ Then redeploy on Vercel
echo.

echo =======================================================
echo                    DEBUG INFO
echo =======================================================
echo Current commit hash:
git rev-parse HEAD

echo.
echo Remote tracking:
git branch -vv

echo.
echo Files that should be in repository:
echo - package-lock.json (CRITICAL!)
echo - package.json (with Node 22.x)
echo - vercel.json (with npm install command)
echo - .gitignore (without package-lock.json)

echo.
echo =======================================================
echo ✅ PROCESS COMPLETED - CHECK GITHUB NOW!
echo =======================================================

pause
