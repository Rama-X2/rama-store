@echo off
echo Deploy to Vercel
echo.

git add -A
git commit -m "Fix webpack DefinePlugin error"
git push origin main
