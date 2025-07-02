# EHB Open Port 3000 PowerShell Script
# Opens http://localhost:3000 in browser

Write-Host "🌐 EHB Open Port 3000" -ForegroundColor Magenta
Write-Host "=====================" -ForegroundColor Magenta
Write-Host ""

$PORT = 3000
$URL = "http://localhost:3000"
$SERVICE_NAME = "🏠 Home Page"

Write-Host "🚀 Opening $SERVICE_NAME..." -ForegroundColor Yellow
Write-Host "📍 URL: $URL" -ForegroundColor Gray
Write-Host ""

# Check if port is in use
try {
    $connection = New-Object System.Net.Sockets.TcpClient
    $connection.Connect("localhost", $PORT)
    $connection.Close()
    
    Write-Host "✅ Service detected on port $PORT" -ForegroundColor Green
    Write-Host "🌐 Opening in browser..." -ForegroundColor Cyan
    
    try {
        Start-Process $URL
        Write-Host "✅ Successfully opened $SERVICE_NAME in browser!" -ForegroundColor Green
        Write-Host "🌐 $URL should now be open in your default browser" -ForegroundColor Cyan
    }
    catch {
        Write-Host "❌ Failed to open browser: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "💡 Please manually open: $URL" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠️  No service detected on port $PORT" -ForegroundColor Yellow
    Write-Host "💡 Starting service first..." -ForegroundColor Cyan
    Write-Host ""
    
    # Try to start the service
    try {
        $job = Start-Job -ScriptBlock {
            npm run dev -- --port 3000
        }
        
        Write-Host "⏳ Waiting for service to start..." -ForegroundColor Gray
        Start-Sleep -Seconds 5
        
        # Check again
        try {
            $connection = New-Object System.Net.Sockets.TcpClient
            $connection.Connect("localhost", $PORT)
            $connection.Close()
            
            Write-Host "✅ Service is now running on port $PORT" -ForegroundColor Green
            Write-Host "🌐 Opening in browser..." -ForegroundColor Cyan
            
            Start-Process $URL
            Write-Host "✅ Successfully opened $SERVICE_NAME in browser!" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Service failed to start on port $PORT" -ForegroundColor Red
            Write-Host "💡 Please start the service manually first:" -ForegroundColor Yellow
            Write-Host "   npm run dev -- --port $PORT" -ForegroundColor Gray
            Write-Host ""
            Write-Host "💡 Or try opening manually:" -ForegroundColor Yellow
            Write-Host "   $URL" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "❌ Failed to start service: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "💡 Please start the service manually first" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   • If browser doesn't open, manually go to: $URL" -ForegroundColor Gray
Write-Host "   • Use Ctrl+Tab to switch between browser tabs" -ForegroundColor Gray
Write-Host "   • Service will continue running in background" -ForegroundColor Gray

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 