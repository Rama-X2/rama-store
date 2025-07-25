#!/bin/bash
<<<<<<< HEAD
# Fix deployment script

echo "🔧 Fixing deployment issues..."

# Remove old lock files and node_modules
echo "🗑️ Cleaning old files..."
rm -rf node_modules package-lock.json npm-shrinkwrap.json

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install dependencies fresh
echo "📦 Installing dependencies..."
npm install

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed successfully!"
echo "🚀 You can now deploy to Vercel"
=======

echo "========================================"
echo "Fixing Vercel Deployment Issues"
echo "========================================"

echo
echo "1. Cleaning up node_modules and cache..."
rm -rf node_modules
rm -rf .next
rm -f package-lock.json
echo "Cleanup completed."

echo
echo "2. Installing fresh dependencies..."
npm install

echo
echo "3. Running type check..."
npm run type-check

echo
echo "4. Running lint check..."
npm run lint

echo
echo "5. Testing build..."
npm run build

echo
echo "========================================"
echo "Fix completed!"
echo "You can now try deploying to Vercel again."
echo "========================================"
>>>>>>> 59cb2333af0f3b513981ff5caa3d1e2f3d3aaa69
