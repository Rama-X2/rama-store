@echo off
echo Deploying Payment Method Updates...

echo.
echo Step 1: Adding files to git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Add detailed payment methods: GoPay, ShopeePay, OVO, DANA, Bank VA, Minimarket, Pulsa"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo Step 4: Triggering Vercel deployment...
vercel --prod

echo.
echo Payment method update deployment complete!
pause
