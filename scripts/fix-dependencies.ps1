# Fix Dependencies Script for Desh Aaj News
# This script resolves common dependency issues, especially with OneDrive

Write-Host "🔧 Fixing dependency issues..." -ForegroundColor Yellow

# Stop any running processes
Write-Host "🛑 Stopping existing processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clear all caches and temporary files
Write-Host "🧹 Clearing caches and temporary files..." -ForegroundColor Yellow
npm cache clean --force
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue }
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue }

# Install dependencies with specific flags to avoid OneDrive issues
Write-Host "📦 Installing dependencies with OneDrive-safe flags..." -ForegroundColor Yellow
npm install --no-optional --no-audit --no-fund

# Verify critical dependencies
Write-Host "🔍 Verifying critical dependencies..." -ForegroundColor Yellow
$criticalDeps = @("is-number", "tailwindcss", "next", "react", "react-dom")
foreach ($dep in $criticalDeps) {
    if (Test-Path "node_modules\$dep") {
        Write-Host "✅ $dep is installed" -ForegroundColor Green
    } else {
        Write-Host "❌ $dep is missing - installing..." -ForegroundColor Red
        npm install $dep
    }
}

# Run type check
Write-Host "🔍 Running type check..." -ForegroundColor Yellow
npm run typecheck

Write-Host "✅ Dependency fix complete!" -ForegroundColor Green
Write-Host "🚀 You can now run 'npm run dev'" -ForegroundColor Cyan


