@echo off
echo 🚀 Fixing Vercel Build Issues...
echo.

echo 📁 Cleaning build files...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo 📦 Installing dependencies...
npm install

echo.
echo 🔍 Type checking...
npx tsc --noEmit --skipLibCheck

echo.
echo 🧹 Linting...
npm run lint

echo.
echo 🏗️ Building project...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful! Ready for deployment.
    echo.
    echo 🚀 Committing and pushing to Git...
    git add .
    git commit -m "Fix Vercel build issues - metadata viewport, critters, and TypeScript errors resolved"
    git push origin main
    
    echo.
    echo 🎉 All done! Your project should now deploy successfully on Vercel.
) else (
    echo.
    echo ❌ Build failed. Please check the errors above.
    pause
)
