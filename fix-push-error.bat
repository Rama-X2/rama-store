@echo off
echo 🔧 Fixing branch and push issues...

echo 📊 Checking current branch status...
git branch

echo 🔄 Renaming branch to main...
git branch -M main

echo 🚀 Pushing to GitHub with upstream...
git push -u origin main

if errorlevel 1 (
    echo ⚠️ Push failed, trying with pull first...
    git pull origin main --allow-unrelated-histories
    echo 🔄 Trying push again...
    git push origin main
)

if errorlevel 1 (
    echo ⚠️ Still failing, trying force push...
    echo 🚨 This will overwrite remote repository!
    set /p confirm="Are you sure? (y/N): "
    if /i "%confirm%"=="y" (
        git push origin main --force
    )
)

echo ✅ Push completed! Check your GitHub repository.
pause
