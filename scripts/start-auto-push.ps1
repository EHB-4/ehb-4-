# EHB GitHub Auto-Push System - PowerShell Launcher
# This script starts the GitHub auto-push system with proper error handling

Write-Host "🚀 EHB GitHub Auto-Push System" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install npm first." -ForegroundColor Red
    exit 1
}

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
try {
    git rev-parse --git-dir | Out-Null
    Write-Host "✅ Git repository found" -ForegroundColor Green
} catch {
    Write-Host "❌ Not a git repository. Please initialize git first." -ForegroundColor Red
    Write-Host "   Run: git init" -ForegroundColor Yellow
    exit 1
}

# Check if remote origin exists
try {
    $remotes = git remote -v
    if ($remotes -match "origin") {
        Write-Host "✅ GitHub remote origin found" -ForegroundColor Green
    } else {
        Write-Host "❌ No remote origin found. Please add GitHub remote first." -ForegroundColor Red
        Write-Host "   Run: git remote add origin https://github.com/yourusername/your-repo.git" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Error checking git remotes." -ForegroundColor Red
    exit 1
}

# Check if chokidar is installed
try {
    $chokidarPath = node -e "console.log(require.resolve('chokidar'))" 2>$null
    Write-Host "✅ chokidar dependency found" -ForegroundColor Green
} catch {
    Write-Host "⚠️  chokidar not found. Installing..." -ForegroundColor Yellow
    npm install chokidar --save
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install chokidar." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ chokidar installed successfully" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎯 Starting auto-push system..." -ForegroundColor Cyan
Write-Host "   Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start the auto-push system
try {
    node scripts/start-auto-push.js
} catch {
    Write-Host "❌ Failed to start auto-push system: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 