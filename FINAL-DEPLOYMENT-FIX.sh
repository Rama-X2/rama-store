#!/bin/bash

echo ""
echo "========================================"
echo "   FINAL VERCEL DEPLOYMENT FIX"
echo "========================================"
echo ""

echo "🔧 Step 1: Cleaning previous builds..."
rm -rf .next out

echo ""
echo "📝 Step 2: Running TypeScript check..."
npm run type-check

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ TypeScript check FAILED!"
    echo "Please fix the errors above before continuing."
    exit 1
fi

echo "✅ TypeScript check PASSED!"
echo ""

echo "🏗️ Step 3: Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Build FAILED!"
    echo "Please check the errors above."
    exit 1
fi

echo "✅ Build SUCCESSFUL!"
echo ""

echo "📦 Step 4: Adding files to git..."
git add .

echo ""
echo "💾 Step 5: Committing changes..."
git commit -m "Fix: Final TypeScript error resolution for Vercel deployment

- Fixed framer-motion motion.label issues in GameDetail.tsx
- Resolved ref forwarding conflicts in Button.tsx  
- Replaced motion.input/textarea/select with HTML elements in Input.tsx
- Added className props to all component interfaces
- All TypeScript errors resolved for successful Vercel deployment

Fixes after 40+ deployment attempts - Ready for production!"

echo ""
echo "🚀 Step 6: Pushing to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Git push FAILED!"
    echo "Please check your git configuration and try again."
    exit 1
fi

echo ""
echo "========================================"
echo "   🎉 DEPLOYMENT FIX COMPLETED! 🎉"
echo "========================================"
echo ""
echo "✅ All TypeScript errors resolved"
echo "✅ Build successful"  
echo "✅ Code pushed to GitHub"
echo "✅ Ready for Vercel deployment"
echo ""
echo "👀 Next: Check your Vercel dashboard for successful deployment"
echo "🌐 Your website should now deploy without errors!"
echo ""
