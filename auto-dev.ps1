# EHB Next.js 04 - Auto Development PowerShell Script
# One-click development server with auto-restart

Write-Host "🚀 EHB Next.js 04 - Auto Development" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# Kill existing processes
Write-Host "🔄 Stopping existing processes..." -ForegroundColor Yellow
try {
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "✅ Existing processes stopped" -ForegroundColor Green
}
catch {
    Write-Host "ℹ️ No existing processes found" -ForegroundColor Blue
}

# Clean .next directory
Write-Host "🧹 Cleaning .next directory..." -ForegroundColor Yellow
$nextDir = Join-Path $PWD ".next"
if (Test-Path $nextDir) {
    Remove-Item $nextDir -Recurse -Force
    Write-Host "✅ .next directory cleaned" -ForegroundColor Green
}
else {
    Write-Host "ℹ️ .next directory not found" -ForegroundColor Blue
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Start development server
Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
Write-Host "🌐 Server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📝 File changes will auto-restart the server" -ForegroundColor Blue
Write-Host "🛑 Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

npm run dev 