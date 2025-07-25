#!/bin/bash
# Complete Git setup and deployment fix

echo "🔧 Setting up Git and fixing deployment..."

# Initialize git if not exists
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/Rama-X2/rama-store.git
    
    echo "👤 Setting up Git user..."
    read -p "Enter your GitHub email: " email
    git config user.name "Rama-X2"
    git config user.email "$email"
else
    echo "✅ Git repository already exists"
fi

# Clean and rebuild
echo "🗑️ Cleaning old files..."
rm -rf node_modules package-lock.json .next

echo "🧹 Clearing npm cache..."
npm cache clean --force

echo "📦 Installing dependencies..."
npm install

echo "🔍 Running type check..."
npm run type-check

echo "🏗️ Building project..."
npm run build

# Git operations
echo "📤 Committing changes..."
git add .
git commit -m "fix: resolve deployment sync issues"

echo "🚀 Pushing to GitHub..."
echo "⚠️  If prompted for password, use GitHub Personal Access Token!"
echo "📖 Get token from: https://github.com/settings/tokens"
git push origin main

echo "✅ Setup complete! Check Vercel for automatic deployment."
