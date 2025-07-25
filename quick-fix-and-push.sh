#!/bin/bash

echo "🔄 Testing build after CSS fix..."

echo "🧹 Cleaning cache..."
rm -rf .next

echo "🏗️ Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready to commit and push."
    echo ""
    echo "📤 Committing and pushing changes..."
    git add .
    git commit -m "Fix: Remove group utility from @apply in CSS"
    git push origin main
    echo "✅ Successfully pushed to repository!"
else
    echo "❌ Build still failing. Please check the error above."
fi

read -p "Press enter to continue..."