# EHB Open All Pages NOW PowerShell Script
# Opens all pages in browser immediately

Write-Host "🌐 EHB Open All Pages NOW" -ForegroundColor Magenta
Write-Host "========================" -ForegroundColor Magenta
Write-Host "Opening all pages in browser immediately..." -ForegroundColor Cyan
Write-Host ""

# All pages to open
$pages = @(
    @{ Name = "🏠 Home Page"; Url = "http://localhost:3000" },
    @{ Name = "⚙️ Admin Panel"; Url = "http://localhost:5000" },
    @{ Name = "🔧 Development Portal"; Url = "http://localhost:8080" },
    @{ Name = "🛒 GoSellr"; Url = "http://localhost:4000" }
)

# Open each page
foreach ($page in $pages) {
    Write-Host "🚀 Opening $($page.Name)..." -ForegroundColor Yellow
    Write-Host "📍 $($page.Url)" -ForegroundColor Gray
    
    try {
        Start-Process $page.Url
        Write-Host "✅ $($page.Name) opened in browser!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to open $($page.Name): $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "💡 Try manually: $($page.Url)" -ForegroundColor Yellow
    }
    
    # Wait 1 second before next page
    if ($page -ne $pages[-1]) {
        Start-Sleep -Seconds 1
    }
}

Write-Host ""
Write-Host "🎉 All pages opened!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Pages opened:" -ForegroundColor Cyan
foreach ($page in $pages) {
    Write-Host "   • $($page.Name) - $($page.Url)" -ForegroundColor White
}

Write-Host ""
Write-Host "💡 If pages show errors, the services are not running yet." -ForegroundColor Yellow
Write-Host "   Start services first, then run this script again." -ForegroundColor Gray

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 