@echo off
echo ========================================
echo FIXING PAYMENT DISPLAY AND UI ISSUES
echo ========================================

echo.
echo [1/5] Adding changes to git...
git add .

echo.
echo [2/5] Committing changes...
git commit -m "fix: Improve payment display with proper icons and fix UI issues

- Update GameDetail component to use payment images from lib/payment-images.ts
- Add proper payment method selection with icons and categories
- Fix text/price sizing in topup packages with better layout
- Add original price with strikethrough for discount display  
- Fix red strikethrough styling for better visual hierarchy
- Prevent background scroll when modal is open using fixed positioning
- Improve payment method display with organized categories
- Add proper payment validation before purchase
- Center package cards layout for better mobile experience
- Add selected payment method to order summary
- Enhance modal scrolling behavior and prevent body scroll"

echo.
echo [3/5] Checking git status...
git status

echo.
echo [4/5] Pushing to origin main...
git push origin main

echo.
echo [5/5] Deployment complete!
echo ========================================
echo PAYMENT DISPLAY FIXES DEPLOYED
echo ========================================

echo.
echo Changes made:
echo - Fixed payment method display with proper icons
echo - Improved text sizing and layout for packages
echo - Fixed background scroll issue in modal
echo - Added strikethrough pricing for discounts
echo - Enhanced payment selection with visual feedback
echo - Better mobile responsive layout
echo.

pause
