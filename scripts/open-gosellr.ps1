# GoSellr Auto-Launcher Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GoSellr Auto-Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if GoSellr is running on port 4000
Write-Host "[1/3] Checking if GoSellr is running on port 4000..." -ForegroundColor Yellow
$portCheck = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue

if ($portCheck) {
    Write-Host "✅ GoSellr is already running on port 4000" -ForegroundColor Green
} else {
    Write-Host "❌ GoSellr is not running on port 4000" -ForegroundColor Red
    Write-Host ""
    Write-Host "[2/3] Starting GoSellr server..." -ForegroundColor Yellow
    Write-Host "Please start your GoSellr server first:" -ForegroundColor White
    Write-Host "npm run dev -- --port 4000" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "[3/3] Opening GoSellr in browser..." -ForegroundColor Yellow

# Open multiple browsers for testing
try {
    # Default browser
    Start-Process "http://localhost:4000/gosellr"
    
    # Chrome (if available)
    if (Test-Path "C:\Program Files\Google\Chrome\Application\chrome.exe") {
        Start-Process "chrome.exe" -ArgumentList "http://localhost:4000/gosellr"
    }
    
    # Edge (if available)
    if (Test-Path "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe") {
        Start-Process "msedge.exe" -ArgumentList "http://localhost:4000/gosellr"
    }
    
    Write-Host "✅ GoSellr opened successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error opening browser: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ GoSellr opened successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 URL: http://localhost:4000/gosellr" -ForegroundColor White
Write-Host "📱 Mobile: http://localhost:4000/gosellr" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   • Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "   • Use Ctrl+R to refresh the page" -ForegroundColor Gray
Write-Host "   • Check console for any errors" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to continue" 