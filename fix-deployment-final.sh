#!/bin/bash

echo "==============================================="
echo "    FINAL DEPLOYMENT FIX FOR VERCEL"
echo "==============================================="

echo "Step 1: Cleaning old files..."
rm -rf .next out node_modules

echo "Step 2: Removing old package-lock.json and reinstalling..."
rm -f package-lock.json

echo "Step 3: Installing dependencies with npm install..."
npm install

echo "Step 4: Verifying package-lock.json exists..."
if [ ! -f package-lock.json ]; then
    echo "ERROR: package-lock.json was not created!"
    exit 1
fi

echo "Step 5: Running type check..."
if ! npm run type-check; then
    echo "ERROR: TypeScript errors found!"
    exit 1
fi

echo "Step 6: Running lint..."
if ! npm run lint; then
    echo "WARNING: Lint issues found, but continuing..."
fi

echo "Step 7: Testing build locally..."
if ! npm run build; then
    echo "ERROR: Build failed locally!"
    exit 1
fi

echo "Step 8: Adding all files to git..."
git add .

echo "Step 9: Committing changes..."
git commit -m "Fix: Update Node.js to 22.x and regenerate package-lock.json for Vercel deployment"

echo "Step 10: Pushing to GitHub..."
if ! git push origin main; then
    echo "ERROR: Failed to push to GitHub!"
    exit 1
fi

echo "==============================================="
echo "✅ DEPLOYMENT FIX COMPLETED SUCCESSFULLY!"
echo "==============================================="
echo ""
echo "The fixes applied:"
echo "- Updated Node.js version from 18.x to 22.x"
echo "- Regenerated package-lock.json"
echo "- Optimized vercel.json configuration"
echo "- Increased function timeout to 30 seconds"
echo ""
echo "Your project should now deploy successfully on Vercel!"
echo "Check your Vercel dashboard for deployment status."
echo ""
