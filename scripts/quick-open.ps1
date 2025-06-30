# EHB Quick Browser Open Script
# Opens all EHB services in browser

Write-Host "🌐 EHB Quick Browser Open" -ForegroundColor Magenta
Write-Host "========================" -ForegroundColor Magenta
Write-Host ""

Write-Host "🚀 Opening all EHB services in browser..." -ForegroundColor Cyan
Write-Host ""

# Service configurations
$services = @(
    @{ Name = "Home Page"; Port = 3000; Url = "http://localhost:3000" },
    @{ Name = "Admin Panel"; Port = 5000; Url = "http://localhost:5000" },
    @{ Name = "Development Portal"; Port = 8080; Url = "http://localhost:8080" },
    @{ Name = "GoSellr"; Port = 4000; Url = "http://localhost:4000" }
)

# Open each service in browser
foreach ($service in $services) {
    Write-Host "📱 $($service.Name) (Port $($service.Port))..." -ForegroundColor Yellow
    try {
        Start-Process $service.Url
        Write-Host "✅ Opened $($service.Name)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to open $($service.Name)" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "✅ All services opened in browser!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Services opened:" -ForegroundColor Cyan
foreach ($service in $services) {
    Write-Host "   • $($service.Name) - $($service.Url)" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 