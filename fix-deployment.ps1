# PowerShell Script untuk fix deployment
Write-Host "🔧 Fixing deployment issues..." -ForegroundColor Yellow

# Remove old files
Write-Host "🗑️ Cleaning old files..." -ForegroundColor Blue
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
if (Test-Path "npm-shrinkwrap.json") { Remove-Item -Force "npm-shrinkwrap.json" }
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Blue
npm cache clean --force

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

# Type check
Write-Host "🔍 Running type check..." -ForegroundColor Blue
npm run type-check

# Build
Write-Host "🏗️ Building project..." -ForegroundColor Blue
npm run build

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "🚀 You can now deploy to Vercel" -ForegroundColor Green

Read-Host "Press Enter to continue..."
