@echo off
echo Adding game-specific packages system...

git add .
git commit -m "Add game-specific topup packages system

- Created lib/game-packages.ts with unique packages for each game
- Added TopupPackage interface and GamePackages interface  
- Implemented getPackagesByGameId function to fetch game-specific packages
- Updated GameDetail.tsx to use dynamic packages instead of static Mobile Legends packages
- Added specific packages for: Mobile Legends, Genshin Impact, Free Fire, PUBG Mobile, COD Mobile, Clash Royale/Clans, Arena of Valor, Honkai Star Rail, Netflix, Spotify, YouTube Premium, Steam Wallet, Google Play, Apple iTunes, PlayStation, Valorant, League of Legends, Wild Rift, Tower of Fantasy, Wuthering Waves, Zenless Zone Zero
- Each game now has unique currency names, prices, and package sizes
- Entertainment apps have subscription-based packages
- Voucher games have wallet/credit-based packages
- Maintains popular package indicators and discount pricing"

echo.
echo Commit completed successfully!
echo Changes: Each game now has unique topup packages with appropriate currency and pricing
pause
