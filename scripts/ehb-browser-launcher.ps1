# EHB Auto-Open All Services PowerShell Script
# Opens all EHB services in browser including Development Portal

Write-Host "🌐 EHB Auto-Open All Services" -ForegroundColor Magenta
Write-Host "============================" -ForegroundColor Magenta
Write-Host "Opening all EHB services in browser..." -ForegroundColor Cyan
Write-Host ""

# Service configurations
$services = @(
    @{ 
        Name = "🏠 Home Page"; 
        Port = 3000; 
        Url = "http://localhost:3000"; 
        Description = "Main EHB Home Page" 
    },
    @{ 
        Name = "⚙️ Admin Panel"; 
        Port = 5000; 
        Url = "http://localhost:5000"; 
        Description = "EHB Admin Panel" 
    },
    @{ 
        Name = "🔧 Development Portal"; 
        Port = 8080; 
        Url = "http://localhost:8080"; 
        Description = "EHB Development Portal" 
    },
    @{ 
        Name = "🛒 GoSellr"; 
        Port = 4000; 
        Url = "http://localhost:4000"; 
        Description = "EHB GoSellr Platform" 
    }
)

$successCount = 0
$totalServices = $services.Count

# Open each service
for ($i = 0; $i -lt $services.Count; $i++) {
    $service = $services[$i]
    $currentIndex = $i + 1
    
    Write-Host "🚀 Opening $($service.Name) ($currentIndex/$totalServices)..." -ForegroundColor Yellow
    Write-Host "   📍 $($service.Url)" -ForegroundColor Gray
    Write-Host "   📝 $($service.Description)" -ForegroundColor Gray
    
    try {
        Start-Process $service.Url
        Write-Host "✅ Opened $($service.Name)" -ForegroundColor Green
        $successCount++
    }
    catch {
        Write-Host "❌ Failed to open $($service.Name)" -ForegroundColor Red
    }
    
    # Wait 1.5 seconds between each browser opening
    if ($i -lt $services.Count - 1) {
        Write-Host "   ⏳ Waiting 1.5 seconds..." -ForegroundColor Gray
        Start-Sleep -Seconds 1.5
        Write-Host ""
    }
}

# Summary
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "✅ Successfully opened: $successCount/$totalServices services" -ForegroundColor Green

Write-Host "`n📋 Services opened:" -ForegroundColor Cyan
for ($i = 0; $i -lt $services.Count; $i++) {
    $service = $services[$i]
    $index = $i + 1
    Write-Host "   $index. $($service.Name) - $($service.Url)" -ForegroundColor White
}

Write-Host "`n🎉 All EHB services opened in browser!" -ForegroundColor Green

Write-Host "`n💡 Tips:" -ForegroundColor Yellow
Write-Host "   • If services show connection errors, start them first with: npm run auto:all" -ForegroundColor Gray
Write-Host "   • Use Ctrl+Tab to switch between browser tabs" -ForegroundColor Gray
Write-Host "   • Each service runs on its dedicated port" -ForegroundColor Gray

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 