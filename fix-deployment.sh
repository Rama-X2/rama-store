#!/bin/bash
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
