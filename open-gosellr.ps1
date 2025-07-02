# GoSellr Auto-Launcher
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GoSellr Auto-Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Starting GoSellr server on port 4000..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run", "dev", "--", "--port", "4000" -WindowStyle Minimized

Write-Host "[2/3] Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

Write-Host "[3/3] Opening GoSellr in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:4000/gosellr"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ GoSellr launched successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 URL: http://localhost:4000/gosellr" -ForegroundColor White
Write-Host "📱 Mobile: http://localhost:4000/gosellr" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   • Server is running in background" -ForegroundColor Gray
Write-Host "   • Press Ctrl+C in server window to stop" -ForegroundColor Gray
Write-Host "   • Use Ctrl+R to refresh the page" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to continue" 