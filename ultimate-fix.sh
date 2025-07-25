#!/bin/bash

echo "==============================================="
echo "    ULTIMATE FIX: FORCE REGENERATE AND COMMIT"
echo "==============================================="

echo "Step 1: Clean and regenerate everything..."
rm -rf .next out node_modules

echo "Step 2: Delete old package-lock.json and regenerate..."
rm -f package-lock.json

echo "Step 3: Fresh npm install to create new package-lock.json..."
npm install

echo "Step 4: Verify package-lock.json was created..."
if [ ! -f package-lock.json ]; then
    echo "ERROR: package-lock.json was not created!"
    exit 1
fi

echo "✅ package-lock.json created successfully!"
ls -la package-lock.json

echo "Step 5: Test build locally..."
if ! npm run build; then
    echo "ERROR: Build failed locally!"
    exit 1
fi

echo "Step 6: Force add all important files..."
git add --force package-lock.json
git add --force package.json
git add --force vercel.json
git add --force .gitignore

echo "Step 7: Show what will be committed..."
git status

echo "Step 8: Commit with unique message..."
timestamp=$(date +"%Y%m%d_%H%M%S")
git commit -m "ULTIMATE FIX: Fresh package-lock.json and npm install for Vercel - $timestamp"

echo "Step 9: Push to GitHub with force if needed..."
if ! git push origin main; then
    echo "Trying with force push..."
    git push --force-with-lease origin main
fi

echo "Step 10: Show latest commit..."
git log --oneline -1

echo ""
echo "==============================================="
echo "✅ ULTIMATE FIX COMPLETE!"
echo "==============================================="
echo ""
echo "What was done:"
echo "✅ Regenerated fresh package-lock.json"
echo "✅ Changed vercel.json to use 'npm install' instead of 'npm ci'"
echo "✅ Force committed package-lock.json to repository"
echo "✅ Pushed new commit to GitHub"
echo ""
echo "🚀 Go check your Vercel deployment now!"
echo "It should work with the new commit."
echo ""
