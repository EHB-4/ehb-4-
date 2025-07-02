# EHB Forever Runner PowerShell Script
# Keeps all services running continuously with auto-restart

Write-Host "🚀 EHB Forever Runner Starting..." -ForegroundColor Magenta
Write-Host "==================================" -ForegroundColor Magenta
Write-Host "🔄 Auto-restart enabled for all services" -ForegroundColor Cyan
Write-Host "📊 Services will restart automatically if they crash" -ForegroundColor Cyan
Write-Host ""

# Service configurations
$services = @(
    @{ Name = "🏠 Home Page"; Port = 3000; Folder = "ehb-home" },
    @{ Name = "⚙️ Admin Panel"; Port = 5000; Folder = "ehb-admin-panel" },
    @{ Name = "🔧 Development Portal"; Port = 8080; Folder = "ehb-dev-portal" },
    @{ Name = "🛒 GoSellr"; Port = 4000; Folder = "ehb-gosellr" }
)

$ultraFastAgent = @{
    Name = "🚀 Ultra-Fast Agent"
    Script = "scripts/ehb-ultra-fast-agent.cjs"
}

$jobs = @()
$restartCounts = @{}
$isRunning = $true

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

# Function to start service
function Start-EHBService {
    param($Service)
    
    $serviceKey = "$($Service.Name)-$($Service.Port)"
    
    Write-Host "🚀 Starting $($Service.Name)..." -ForegroundColor Yellow
    
    # Kill existing process
    Kill-ProcessOnPort -Port $Service.Port
    
    # Check/create folder
    $folderPath = Join-Path $PWD $Service.Folder
    if (-not (Test-Path $folderPath)) {
        Write-Host "📁 Creating folder: $($Service.Folder)" -ForegroundColor Cyan
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
        
        # Create package.json
        $packageJson = @{
            name = $Service.Folder
            version = "1.0.0"
            scripts = @{
                dev = "next dev --port $($Service.Port)"
                build = "next build"
                start = "next start --port $($Service.Port)"
            }
        } | ConvertTo-Json -Depth 10
        
        $packageJson | Out-File -FilePath (Join-Path $folderPath "package.json") -Encoding UTF8
    }
    
    # Start service job
    $job = Start-Job -ScriptBlock {
        param($Folder, $Port, $ServiceName)
        
        Set-Location $Folder
        npm run dev -- --port $Port
    } -ArgumentList $folderPath, $Service.Port, $Service.Name
    
    $jobs += @{
        Job = $job
        Service = $Service
        Key = $serviceKey
        StartTime = Get-Date
    }
    
    Write-Host "✅ $($Service.Name) started (Job ID: $($job.Id))" -ForegroundColor Green
}

# Function to start ultra-fast agent
function Start-UltraFastAgent {
    Write-Host "🚀 Starting $($ultraFastAgent.Name)..." -ForegroundColor Yellow
    
    $agentPath = Join-Path $PWD $ultraFastAgent.Script
    if (-not (Test-Path $agentPath)) {
        Write-Host "⚠️  Ultra-fast agent not found: $agentPath" -ForegroundColor Yellow
        return
    }
    
    $job = Start-Job -ScriptBlock {
        param($ScriptPath)
        node $ScriptPath
    } -ArgumentList $agentPath
    
    $jobs += @{
        Job = $job
        Service = $ultraFastAgent
        Key = "ultra-fast-agent"
        StartTime = Get-Date
    }
    
    Write-Host "✅ $($ultraFastAgent.Name) started (Job ID: $($job.Id))" -ForegroundColor Green
}

# Function to monitor and restart services
function Monitor-Services {
    while ($isRunning) {
        Start-Sleep -Seconds 30
        
        foreach ($jobInfo in $jobs) {
            $job = $jobInfo.Job
            $service = $jobInfo.Service
            $key = $jobInfo.Key
            
            if ($job.State -eq "Failed" -or $job.State -eq "Completed") {
                Write-Host "🛑 $($service.Name) stopped" -ForegroundColor Red
                
                if ($isRunning) {
                    $restarts = $restartCounts[$key] + 1
                    $restartCounts[$key] = $restarts
                    
                    Write-Host "🔄 Restarting $($service.Name) (attempt $restarts)..." -ForegroundColor Yellow
                    
                    # Remove old job
                    Remove-Job $job
                    $jobs = $jobs | Where-Object { $_.Job.Id -ne $job.Id }
                    
                    # Start new job
                    if ($key -eq "ultra-fast-agent") {
                        Start-UltraFastAgent
                    } else {
                        Start-EHBService -Service $service
                    }
                }
            }
        }
        
        # Show status every 2 minutes
        Show-Status
    }
}

# Function to show status
function Show-Status {
    Write-Host ""
    Write-Host "📊 EHB Services Status" -ForegroundColor Cyan
    Write-Host "======================" -ForegroundColor Cyan
    
    foreach ($jobInfo in $jobs) {
        $job = $jobInfo.Job
        $service = $jobInfo.Service
        $key = $jobInfo.Key
        $restarts = $restartCounts[$key] + 0
        $uptime = (Get-Date) - $jobInfo.StartTime
        $uptimeMinutes = [math]::Round($uptime.TotalMinutes)
        
        $status = if ($job.State -eq "Running") { "✅ Running" } else { "❌ Stopped" }
        Write-Host "$status $($service.Name) (Restarts: $restarts, Uptime: ${uptimeMinutes}m)" -ForegroundColor White
    }
    
    Write-Host ""
}

# Start all services
foreach ($service in $services) {
    Start-EHBService -Service $service
    Start-Sleep -Seconds 3
}

# Start ultra-fast agent
Start-Sleep -Seconds 5
Start-UltraFastAgent

Write-Host ""
Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host "🔄 Services will run forever with auto-restart" -ForegroundColor Cyan
Write-Host "🛑 Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Handle shutdown
$null = Register-EngineEvent PowerShell.Exiting -Action {
    Write-Host "`n🛑 Shutting down EHB Forever Runner..." -ForegroundColor Red
    $isRunning = $false
    
    foreach ($jobInfo in $jobs) {
        try {
            Stop-Job $jobInfo.Job
            Remove-Job $jobInfo.Job
            Write-Host "✅ Stopped $($jobInfo.Service.Name)" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Error stopping $($jobInfo.Service.Name)" -ForegroundColor Red
        }
    }
    
    Write-Host "👋 EHB Forever Runner stopped" -ForegroundColor Green
}

# Start monitoring
Monitor-Services 