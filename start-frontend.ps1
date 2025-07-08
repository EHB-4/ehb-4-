Write-Host "🚀 Starting EHB Frontend Development Server..." -ForegroundColor Green
Write-Host "📍 Port: 3000" -ForegroundColor Cyan
Write-Host "🌐 URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Start the development server with auto-open
yarn dev:open

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 