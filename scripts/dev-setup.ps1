# Development Setup Script for Desh Aaj News
# This script fixes common development issues and sets up the environment

Write-Host "🚀 Setting up Desh Aaj News Development Environment..." -ForegroundColor Green

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check Node.js and npm
if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm is not installed. Please install npm." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js and npm are installed" -ForegroundColor Green

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Remove node_modules and package-lock.json for clean install
if (Test-Path "node_modules") {
    Write-Host "🗑️ Removing old node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
}

if (Test-Path "package-lock.json") {
    Write-Host "🗑️ Removing old package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Check for vulnerabilities
Write-Host "🔍 Checking for security vulnerabilities..." -ForegroundColor Yellow
npm audit

# Run type check
Write-Host "🔍 Running TypeScript type check..." -ForegroundColor Yellow
npm run typecheck

# Run linting
Write-Host "🔍 Running ESLint..." -ForegroundColor Yellow
npm run lint

Write-Host "✅ Development environment setup complete!" -ForegroundColor Green
Write-Host "🚀 You can now run 'npm run dev' to start the development server" -ForegroundColor Cyan


