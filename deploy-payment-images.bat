@echo off
echo Starting Git process...

echo Adding payment configuration files...
git add lib/payment-images.ts
git add components/GameDetail.tsx

echo Committing changes...
git commit -m "feat: implement payment images configuration

- Add payment images configuration with real image paths
- Update GameDetail.tsx to use payment configuration
- Replace hardcoded payment logos with dynamic imports
- Support for e-wallet, bank transfer, convenience store, mobile provider, and QR code payments
- All payment icons now use actual webp images from /public/images/payments/"

echo Pushing to repository...
git push origin main

echo Payment images configuration deployed successfully!
pause