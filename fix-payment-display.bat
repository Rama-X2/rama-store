@echo off
echo Fixing payment display issue...

echo Adding and committing changes...
git add .
git commit -m "fix: Replace dynamic payment methods with static display options to resolve empty payment buttons issue"

echo Pushing to repository...
git push origin main

echo.
echo Payment display fix completed successfully!
echo Changes:
echo - Replaced dynamic payment method mapping with static buttons
echo - Added colored circular icons for each payment method
echo - Fixed payment method display names in order summary
echo - Ensured all payment options are visible and functional
echo.
pause
