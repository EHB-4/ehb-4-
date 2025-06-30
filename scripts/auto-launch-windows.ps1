# EHB Auto-Launch Services PowerShell Script
# Automatically starts services and opens them in browser

param(
    [Parameter(Position=0)]
    [string]$Service = "all"
)

# Service configurations
$services = @{
    "home" = @{
        Name = "Home Page"
        Port = 3000
        Folder = "ehb-home"
        Url = "http://localhost:3000"
        Command = "npm run dev -- --port 3000"
    }
    "admin" = @{
        Name = "Admin Panel"
        Port = 5000
        Folder = "ehb-admin-panel"
        Url = "http://localhost:5000"
        Command = "npm run dev -- --port 5000"
    }
    "dev-portal" = @{
        Name = "Development Portal"
        Port = 8080
        Folder = "ehb-dev-portal"
        Url = "http://localhost:8080"
        Command = "npm run dev -- --port 8080"
    }
    "gosellr" = @{
        Name = "GoSellr"
        Port = 4000
        Folder = "ehb-gosellr"
        Url = "http://localhost:4000"
        Command = "npm run dev -- --port 4000"
    }
}

# Function to check if port is available
function Test-Port {
    param([int]$Port)
    
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Function to wait for service to be ready
function Wait-ForService {
    param([int]$Port, [string]$ServiceName)
    
    Write-Host "⏳ Waiting for $ServiceName to be ready on port $Port..." -ForegroundColor Yellow
    
    while (-not (Test-Port -Port $Port)) {
        Start-Sleep -Seconds 1
    }
    
    Write-Host "✅ $ServiceName is ready on port $Port" -ForegroundColor Green
}

# Function to open URL in default browser
function Open-Browser {
    param([string]$Url)
    
    try {
        Start-Process $Url
        Write-Host "🌐 Opened $Url in browser" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to open browser for $Url" -ForegroundColor Red
    }
}

# Function to start a single service
function Start-Service {
    param([string]$ServiceKey)
    
    $service = $services[$ServiceKey]
    if (-not $service) {
        Write-Host "❌ Unknown service: $ServiceKey" -ForegroundColor Red
        return
    }
    
    Write-Host "🚀 Starting $($service.Name)..." -ForegroundColor Cyan
    
    # Check if folder exists
    $folderPath = Join-Path $PWD $service.Folder
    if (-not (Test-Path $folderPath)) {
        Write-Host "⚠️  Folder $($service.Folder) not found, skipping..." -ForegroundColor Yellow
        return
    }
    
    # Change to service directory
    Push-Location $folderPath
    
    # Start the service in background
    $job = Start-Job -ScriptBlock {
        param($Command)
        Set-Location $using:folderPath
        Invoke-Expression $Command
    } -ArgumentList $service.Command
    
    # Wait for service to be ready
    Wait-ForService -Port $service.Port -ServiceName $service.Name
    
    # Open in browser after 2 seconds
    Start-Sleep -Seconds 2
    Open-Browser -Url $service.Url
    
    # Return to original directory
    Pop-Location
    
    Write-Host "✅ $($service.Name) started successfully" -ForegroundColor Green
    return $job
}

# Main execution
Write-Host "🚀 EHB Auto-Launch Services" -ForegroundColor Magenta
Write-Host "============================" -ForegroundColor Magenta

$jobs = @()

if ($Service -eq "all") {
    Write-Host "Starting all services..." -ForegroundColor Cyan
    
    foreach ($serviceKey in $services.Keys) {
        $job = Start-Service -ServiceKey $serviceKey
        if ($job) {
            $jobs += $job
        }
        Start-Sleep -Seconds 2  # Small delay between services
    }
} else {
    $job = Start-Service -ServiceKey $Service
    if ($job) {
        $jobs += $job
    }
}

# Keep the script running and show status
Write-Host "`n📊 Service Status:" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow

try {
    while ($true) {
        Clear-Host
        Write-Host "🚀 EHB Services Status" -ForegroundColor Magenta
        Write-Host "=====================" -ForegroundColor Magenta
        
        foreach ($serviceKey in $services.Keys) {
            $service = $services[$ServiceKey]
            $isRunning = Test-Port -Port $service.Port
            
            if ($isRunning) {
                Write-Host "✅ $($service.Name) - $($service.Url)" -ForegroundColor Green
            } else {
                Write-Host "❌ $($service.Name) - Not running" -ForegroundColor Red
            }
        }
        
        Write-Host "`nPress Ctrl+C to stop all services" -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}
catch {
    Write-Host "`n🛑 Stopping all services..." -ForegroundColor Red
    
    # Stop all background jobs
    foreach ($job in $jobs) {
        Stop-Job $job
        Remove-Job $job
    }
    
    Write-Host "✅ All services stopped" -ForegroundColor Green
} 