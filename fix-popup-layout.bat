@echo off
echo Fixing popup layout and committing to GitHub...

:: Add all changes
git add .

:: Commit with message
git commit -m "fix: improve popup layout - smaller price text, compact design, better spacing"

:: Push to GitHub
git push origin main

echo Done! Changes committed and pushed to GitHub.
pause
