# EHB Auto Manager - Simple Frontend Management
# This script automatically manages your frontend

Write-Host "🚀 EHB Auto Manager Starting..." -ForegroundColor Green

# Function to check if frontend is running
function Test-Frontend {
    try {
        $result = netstat -ano | findstr ":3000"
        return $result -ne $null
    }
    catch {
        return $false
    }
}

# Function to start frontend
function Start-Frontend {
    Write-Host "Starting frontend..." -ForegroundColor Yellow
    
    # Kill any existing Node processes
    taskkill /F /IM node.exe >nul 2>&1
    Start-Sleep 2
    
    # Start frontend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Minimized
    
    # Wait for frontend to start
    Start-Sleep 5
    
    if (Test-Frontend) {
        Write-Host "✅ Frontend started successfully!" -ForegroundColor Green
        Start-Process "http://localhost:3000"
    } else {
        Write-Host "❌ Frontend failed to start" -ForegroundColor Red
    }
}

# Function to stop frontend
function Stop-Frontend {
    Write-Host "Stopping frontend..." -ForegroundColor Yellow
    taskkill /F /IM node.exe >nul 2>&1
    Write-Host "✅ Frontend stopped" -ForegroundColor Green
}

# Function to show status
function Show-Status {
    if (Test-Frontend) {
        Write-Host "✅ Frontend is running on http://localhost:3000" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend is not running" -ForegroundColor Red
    }
}

# Main menu
function Show-Menu {
    Clear-Host
    Write-Host "=== EHB Auto Manager ===" -ForegroundColor Cyan
    Write-Host "1. Start Frontend" -ForegroundColor White
    Write-Host "2. Stop Frontend" -ForegroundColor White
    Write-Host "3. Show Status" -ForegroundColor White
    Write-Host "4. Open Browser" -ForegroundColor White
    Write-Host "5. Exit" -ForegroundColor White
    Write-Host "=======================" -ForegroundColor Cyan
}

# Main loop
do {
    Show-Menu
    $choice = Read-Host "Enter your choice (1-5)"
    
    switch ($choice) {
        "1" { Start-Frontend }
        "2" { Stop-Frontend }
        "3" { Show-Status }
        "4" { Start-Process "http://localhost:3000" }
        "5" { 
            Write-Host "Goodbye!" -ForegroundColor Green
            exit 
        }
        default { Write-Host "Invalid choice" -ForegroundColor Red }
    }
    
    if ($choice -ne "5") {
        Read-Host "Press Enter to continue"
    }
} while ($choice -ne "5") 