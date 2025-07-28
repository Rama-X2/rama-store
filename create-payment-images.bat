@echo off
echo Creating payment method images...

echo.
echo Creating placeholder payment images...

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#00AED6"/^>^<text x="24" y="20" font-family="Arial" font-size="8" fill="white" text-anchor="middle"^>GoPay^</text^>^</svg^> > "public\images\payments\gopay.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#118EEA"/^>^<text x="24" y="20" font-family="Arial" font-size="8" fill="white" text-anchor="middle"^>DANA^</text^>^</svg^> > "public\images\payments\dana.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#4C3FCC"/^>^<text x="24" y="20" font-family="Arial" font-size="8" fill="white" text-anchor="middle"^>OVO^</text^>^</svg^> > "public\images\payments\ovo.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#EE4D2D"/^>^<text x="24" y="20" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>ShopeePay^</text^>^</svg^> > "public\images\payments\shopeepay.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#E61E2B"/^>^<text x="24" y="20" font-family="Arial" font-size="7" fill="white" text-anchor="middle"^>LinkAja^</text^>^</svg^> > "public\images\payments\linkaja.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#003F88"/^>^<text x="24" y="20" font-family="Arial" font-size="7" fill="white" text-anchor="middle"^>Bank^</text^>^</svg^> > "public\images\payments\bank.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#FF6B35"/^>^<text x="24" y="20" font-family="Arial" font-size="8" fill="white" text-anchor="middle"^>QRIS^</text^>^</svg^> > "public\images\payments\qris.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#1A1A1A"/^>^<text x="24" y="20" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>Credit^</text^>^</svg^> > "public\images\payments\credit.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#003DA5"/^>^<text x="24" y="16" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>Indo^</text^>^<text x="24" y="24" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>maret^</text^>^</svg^> > "public\images\payments\indomaret.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#E30613"/^>^<text x="24" y="16" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>Alfa^</text^>^<text x="24" y="24" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>mart^</text^>^</svg^> > "public\images\payments\alfamart.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#E2001A"/^>^<text x="24" y="16" font-family="Arial" font-size="5" fill="white" text-anchor="middle"^>Telkom^</text^>^<text x="24" y="24" font-family="Arial" font-size="5" fill="white" text-anchor="middle"^>sel^</text^>^</svg^> > "public\images\payments\telkomsel.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#FFD320"/^>^<text x="24" y="20" font-family="Arial" font-size="7" fill="black" text-anchor="middle"^>Indosat^</text^>^</svg^> > "public\images\payments\indosat.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#0066CC"/^>^<text x="24" y="16" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>XL^</text^>^<text x="24" y="24" font-family="Arial" font-size="6" fill="white" text-anchor="middle"^>Axiata^</text^>^</svg^> > "public\images\payments\xl.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#E6007E"/^>^<text x="24" y="20" font-family="Arial" font-size="8" fill="white" text-anchor="middle"^>Tri^</text^>^</svg^> > "public\images\payments\tri.svg"

echo ^<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg"^>^<rect width="48" height="32" fill="#FF6600"/^>^<text x="24" y="16" font-family="Arial" font-size="5" fill="white" text-anchor="middle"^>Smart^</text^>^<text x="24" y="24" font-family="Arial" font-size="5" fill="white" text-anchor="middle"^>fren^</text^>^</svg^> > "public\images\payments\smartfren.svg"

echo.
echo Payment images created successfully!

echo.
echo Step 1: Adding files to git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Add payment method logos and clean card design"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo Deploy complete!
pause
