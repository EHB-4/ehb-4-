# EHB Auto Runner PowerShell Script
# This script automatically runs all development commands

Write-Host "🚀 EHB Auto Runner Starting..." -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green

# Kill existing processes
Write-Host "🔄 Stopping existing processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✅ Processes stopped" -ForegroundColor Green

# Start development server
Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Normal

# Wait and open browser
Start-Sleep -Seconds 5
Write-Host "🌐 Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"
Start-Process "http://localhost:3000/development-portal"

# Monitoring loop
Write-Host "👀 Auto monitoring started..." -ForegroundColor Cyan
Write-Host "📝 Press Ctrl+C to stop" -ForegroundColor Yellow

while ($true) {
    Start-Sleep -Seconds 30
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -ne 200) {
            throw "Server not responding properly"
        }
    }
    catch {
        Write-Host "⚠️ Server not responding, restarting..." -ForegroundColor Red
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
        Start-Sleep -Seconds 2
        Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Normal
    }
} 