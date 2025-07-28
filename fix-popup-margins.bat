@echo off
echo Fixing popup margins and rounded corners...

:: Add all changes
git add .

:: Commit with message
git commit -m "fix: improve popup spacing and rounded corners - better margins from edges, rounded design"

:: Push to GitHub
git push origin main

echo Done! Popup margins and design improvements committed and pushed to GitHub.
pause
