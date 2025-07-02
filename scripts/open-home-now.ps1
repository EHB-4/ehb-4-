# EHB Home Page - Open in Browser NOW PowerShell Script
# Opens EHB home page in browser immediately

Write-Host "🏠 EHB Home Page - Open in Browser NOW" -ForegroundColor Magenta
Write-Host "=====================================" -ForegroundColor Magenta
Write-Host "Opening EHB home page in browser..." -ForegroundColor Cyan
Write-Host ""

$HOME_URL = "http://localhost:3000"

Write-Host "🚀 Opening EHB Home Page..." -ForegroundColor Yellow
Write-Host "📍 URL: $HOME_URL" -ForegroundColor Gray
Write-Host ""

try {
    Start-Process $HOME_URL
    Write-Host "✅ EHB Home Page opened in browser!" -ForegroundColor Green
    Write-Host "🌐 $HOME_URL should now be open" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ Failed to open browser: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Manual options:" -ForegroundColor Yellow
    Write-Host "   • Open your browser and go to: $HOME_URL" -ForegroundColor Gray
    Write-Host "   • Or press Windows + R, type: $HOME_URL" -ForegroundColor Gray
    Write-Host "   • Or copy and paste: $HOME_URL" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎉 Script completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 What happened:" -ForegroundColor Cyan
Write-Host "   • 🏠 EHB Home Page: $HOME_URL" -ForegroundColor White
Write-Host "   • 🔧 Port: 3000" -ForegroundColor White
Write-Host "   • 🌐 Browser: Should be open now" -ForegroundColor White
Write-Host ""
Write-Host "💡 If the page shows an error, the service is not running yet." -ForegroundColor Yellow
Write-Host "   Start the service first, then run this script again." -ForegroundColor Gray

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 