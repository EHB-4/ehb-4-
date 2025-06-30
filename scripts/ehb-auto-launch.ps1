# EHB Auto-Launch Services
# Simple PowerShell script to start services and open in browser

param(
    [Parameter(Position=0)]
    [ValidateSet("home", "admin", "dev-portal", "gosellr", "all")]
    [string]$Service = "all"
)

Write-Host "🚀 EHB Auto-Launch Services" -ForegroundColor Magenta
Write-Host "============================" -ForegroundColor Magenta

# Service configurations
$services = @{
    "home" = @{
        Name = "Home Page"
        Port = 3000
        Folder = "ehb-home"
        Url = "http://localhost:3000"
    }
    "admin" = @{
        Name = "Admin Panel"
        Port = 5000
        Folder = "ehb-admin-panel"
        Url = "http://localhost:5000"
    }
    "dev-portal" = @{
        Name = "Development Portal"
        Port = 8080
        Folder = "ehb-dev-portal"
        Url = "http://localhost:8080"
    }
    "gosellr" = @{
        Name = "GoSellr"
        Port = 4000
        Folder = "ehb-gosellr"
        Url = "http://localhost:4000"
    }
}

# Function to kill process on port
function Kill-ProcessOnPort {
    param([int]$Port)
    
    $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    foreach ($process in $processes) {
        $processId = $process.OwningProcess
        try {
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            Write-Host "✅ Killed process on port $Port" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠️  Could not kill process on port $Port" -ForegroundColor Yellow
        }
    }
}

# Function to check if port is available
function Test-PortAvailable {
    param([int]$Port)
    
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $false  # Port is in use
    }
    catch {
        return $true   # Port is available
    }
}

# Function to wait for service
function Wait-ForService {
    param([int]$Port, [string]$ServiceName)
    
    Write-Host "⏳ Waiting for $ServiceName to be ready..." -ForegroundColor Yellow
    
    $attempts = 0
    $maxAttempts = 30  # 30 seconds timeout
    
    while ($attempts -lt $maxAttempts) {
        if (-not (Test-PortAvailable -Port $Port)) {
            Write-Host "✅ $ServiceName is ready on port $Port" -ForegroundColor Green
            return $true
        }
        
        Start-Sleep -Seconds 1
        $attempts++
    }
    
    Write-Host "❌ Timeout waiting for $ServiceName" -ForegroundColor Red
    return $false
}

# Function to start service
function Start-EHBService {
    param([string]$ServiceKey)
    
    $service = $services[$ServiceKey]
    if (-not $service) {
        Write-Host "❌ Unknown service: $ServiceKey" -ForegroundColor Red
        return $false
    }
    
    Write-Host "🚀 Starting $($service.Name)..." -ForegroundColor Cyan
    
    # Kill any existing process on the port
    Kill-ProcessOnPort -Port $service.Port
    
    # Check if folder exists
    $folderPath = Join-Path $PWD $service.Folder
    if (-not (Test-Path $folderPath)) {
        Write-Host "⚠️  Folder $($service.Folder) not found, creating it..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
    }
    
    # Change to service directory
    Push-Location $folderPath
    
    # Check if package.json exists, if not create basic one
    if (-not (Test-Path "package.json")) {
        Write-Host "📦 Creating package.json for $($service.Name)..." -ForegroundColor Yellow
        $packageJson = @{
            name = $service.Folder
            version = "1.0.0"
            scripts = @{
                dev = "next dev --port $($service.Port)"
                build = "next build"
                start = "next start --port $($service.Port)"
            }
        } | ConvertTo-Json -Depth 10
        
        $packageJson | Out-File -FilePath "package.json" -Encoding UTF8
    }
    
    # Start the service
    $job = Start-Job -ScriptBlock {
        param($Folder, $Port)
        Set-Location $Folder
        npm run dev -- --port $Port
    } -ArgumentList $folderPath, $service.Port
    
    # Wait for service to be ready
    $isReady = Wait-ForService -Port $service.Port -ServiceName $service.Name
    
    if ($isReady) {
        # Open in browser after 2 seconds
        Start-Sleep -Seconds 2
        try {
            Start-Process $service.Url
            Write-Host "🌐 Opened $($service.Url) in browser" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Failed to open browser for $($service.Url)" -ForegroundColor Red
        }
    }
    
    # Return to original directory
    Pop-Location
    
    return $isReady
}

# Main execution
$successCount = 0
$totalCount = 0

if ($Service -eq "all") {
    Write-Host "Starting all services..." -ForegroundColor Cyan
    
    foreach ($serviceKey in $services.Keys) {
        $totalCount++
        $success = Start-EHBService -ServiceKey $serviceKey
        if ($success) { $successCount++ }
        
        if ($serviceKey -ne ($services.Keys | Select-Object -Last 1)) {
            Start-Sleep -Seconds 3  # Delay between services
        }
    }
} else {
    $totalCount = 1
    $success = Start-EHBService -ServiceKey $Service
    if ($success) { $successCount++ }
}

# Summary
Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "Successfully started: $successCount/$totalCount services" -ForegroundColor Green

if ($successCount -gt 0) {
    Write-Host "`n🎉 Services are running! Press Ctrl+C to stop." -ForegroundColor Green
    
    # Keep running and show status
    try {
        while ($true) {
            Write-Host "`n📈 Service Status:" -ForegroundColor Cyan
            foreach ($serviceKey in $services.Keys) {
                $service = $services[$serviceKey]
                $isRunning = -not (Test-PortAvailable -Port $service.Port)
                
                if ($isRunning) {
                    Write-Host "✅ $($service.Name) - $($service.Url)" -ForegroundColor Green
                } else {
                    Write-Host "❌ $($service.Name) - Not running" -ForegroundColor Red
                }
            }
            
            Start-Sleep -Seconds 10
        }
    }
    catch {
        Write-Host "`n🛑 Stopping services..." -ForegroundColor Red
        Get-Job | Stop-Job
        Get-Job | Remove-Job
        Write-Host "✅ All services stopped" -ForegroundColor Green
    }
} else {
    Write-Host "❌ No services were started successfully" -ForegroundColor Red
} 