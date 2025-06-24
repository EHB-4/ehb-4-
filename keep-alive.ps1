# EHB Next.js 04 - Keep Alive Server
# PowerShell Version

# Set console title and color
$Host.UI.RawUI.WindowTitle = "EHB Next.js 04 - Keep Alive Server"
$Host.UI.RawUI.ForegroundColor = "Green"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EHB Next.js 04 - Keep Alive Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌍 Server will run 24/7 automatically" -ForegroundColor Yellow
Write-Host "🔄 Auto-restart on any crash" -ForegroundColor Yellow
Write-Host "🌐 Available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "🛑 To stop: Close this window" -ForegroundColor Yellow
Write-Host ""

# Function to start server
function Start-Server {
    param()
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$timestamp] Starting development server..." -ForegroundColor Green
    Write-Host ""
    
    # Kill existing processes
    try {
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
        Write-Host "✅ Killed existing processes" -ForegroundColor Green
    }
    catch {
        Write-Host "ℹ No existing processes found" -ForegroundColor Blue
    }
    
    # Clean .next directory
    $nextDir = Join-Path $PWD ".next"
    if (Test-Path $nextDir) {
        Remove-Item $nextDir -Recurse -Force
        Write-Host "✅ Cleaned .next directory" -ForegroundColor Green
    }
    
    # Start development server
    npm run dev
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host ""
    Write-Host "[$timestamp] Server stopped, restarting in 3 seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
}

# Main loop
while ($true) {
    try {
        Start-Server
    }
    catch {
        $timestamp = Get-Date -Format "HH:mm:ss"
        Write-Host "[$timestamp] Error occurred, restarting..." -ForegroundColor Red
        Start-Sleep -Seconds 3
    }
} 