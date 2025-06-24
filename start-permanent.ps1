# EHB Next.js 04 - Permanent 24/7 Server Starter
# PowerShell Version

# Set console title and color
$Host.UI.RawUI.WindowTitle = "EHB Next.js 04 - Permanent 24/7 Server"
$Host.UI.RawUI.ForegroundColor = "Green"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EHB Next.js 04 - Permanent Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌍 Server will run 24/7 automatically" -ForegroundColor Yellow
Write-Host "🔄 Auto-restart on any crash" -ForegroundColor Yellow
Write-Host "🌐 Available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "🛑 To stop: npm run server:stop" -ForegroundColor Yellow
Write-Host ""

# Function to write status
function Write-Status {
    param(
        [string]$Step,
        [string]$Message,
        [string]$Status = "info"
    )
    
    $color = switch ($Status) {
        "success" { "Green" }
        "error" { "Red" }
        "warning" { "Yellow" }
        default { "Blue" }
    }
    
    Write-Host "[$Step] $Message" -ForegroundColor $color
}

# Step 1: Kill existing processes
Write-Status "1/4" "Stopping existing processes..."
try {
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Status "1/4" "✓ Existing processes stopped" "success"
}
catch {
    Write-Status "1/4" "ℹ No existing processes found" "info"
}

# Step 2: Clean .next directory
Write-Status "2/4" "Cleaning .next directory..."
$nextDir = Join-Path $PWD ".next"
if (Test-Path $nextDir) {
    Remove-Item $nextDir -Recurse -Force
    Write-Status "2/4" "✓ .next directory cleaned" "success"
}
else {
    Write-Status "2/4" "ℹ .next directory not found" "info"
}

# Step 3: Check dependencies
Write-Status "3/4" "Checking dependencies..."
if (-not (Test-Path "node_modules")) {
    Write-Status "3/4" "📦 Installing dependencies..." "warning"
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Status "3/4" "✓ Dependencies installed" "success"
    }
    else {
        Write-Status "3/4" "❌ Failed to install dependencies" "error"
        Read-Host "Press Enter to exit"
        exit 1
    }
}
else {
    Write-Status "3/4" "✓ Dependencies already installed" "success"
}

# Step 4: Start permanent server
Write-Status "4/4" "Starting permanent server..."
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🌍 Permanent Server Starting..." -ForegroundColor Green
Write-Host "  🌐 Server: http://localhost:3000" -ForegroundColor Green
Write-Host "  🔄 Auto-restart: Enabled" -ForegroundColor Green
Write-Host "  ⏰ Running 24/7" -ForegroundColor Green
Write-Host "  🛑 Stop: npm run server:stop" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the permanent server
npm run server:permanent

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Permanent server stopped" -ForegroundColor Yellow
Write-Host "  Press any key to exit..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Read-Host 