# Quick Development Fix Script
# Use this when npm run dev is not working

Write-Host "🔧 Fixing development server issues..." -ForegroundColor Yellow

# Kill any existing Next.js processes
Write-Host "🛑 Stopping existing Next.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Clear Next.js cache
Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
}

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Reinstall dependencies
Write-Host "📦 Reinstalling dependencies..." -ForegroundColor Yellow
npm install

# Start development server
Write-Host "🚀 Starting development server..." -ForegroundColor Green
npm run dev


