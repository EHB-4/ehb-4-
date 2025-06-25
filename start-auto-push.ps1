# EHB Auto-Push System PowerShell Script
param(
    [switch]$Install,
    [switch]$Force
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    EHB Auto-Push System Starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
        Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if chokidar is installed
Write-Host "📦 Checking dependencies..." -ForegroundColor Cyan
try {
    npm list chokidar 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "📦 Installing chokidar..." -ForegroundColor Yellow
        npm install chokidar
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install chokidar" -ForegroundColor Red
            Read-Host "Press Enter to exit"
            exit 1
        }
    }
    Write-Host "✅ chokidar is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to check/install chokidar" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if git is initialized
Write-Host "🔍 Checking git repository..." -ForegroundColor Cyan
try {
    git status 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Not a git repository" -ForegroundColor Red
        Write-Host "Please initialize git first: git init" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✅ Git repository found" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if remote origin exists
try {
    $remotes = git remote -v 2>$null
    if ($remotes -notmatch "origin") {
        Write-Host "❌ No remote origin found" -ForegroundColor Red
        Write-Host "Please add GitHub remote: git remote add origin <your-repo-url>" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✅ Remote origin found" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to check remote origin" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ All checks passed!" -ForegroundColor Green
Write-Host "🚀 Starting EHB Auto-Push System..." -ForegroundColor Green
Write-Host ""
Write-Host "📝 This system will automatically:" -ForegroundColor Cyan
Write-Host "   - Watch for file changes" -ForegroundColor White
Write-Host "   - Commit changes every 30 seconds" -ForegroundColor White
Write-Host "   - Push to GitHub automatically" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start the auto-push system
try {
    node scripts/ehb-auto-push.js
} catch {
    Write-Host "❌ Failed to start auto-push system" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Read-Host "Press Enter to exit" 