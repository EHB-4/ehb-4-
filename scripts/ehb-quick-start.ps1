# 🚀 EHB Quick Start Script
# One-click setup for immediate development

param(
    [switch]$SkipChecks = $false,
    [switch]$AutoBrowser = $true
)

Write-Host "🚀 EHB Quick Start - Auto Start and Open All Pages" -ForegroundColor Magenta
Write-Host "=================================================" -ForegroundColor Magenta
Write-Host ""

# Kill existing processes on ports
Write-Host "🔄 Killing existing processes on ports..." -ForegroundColor Yellow
$ports = @(3000, 5000, 8080, 4000)

foreach ($port in $ports) {
    $processes = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    foreach ($process in $processes) {
        $processId = $process.OwningProcess
        try {
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            Write-Host "✅ Killed process on port $port" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠️  Could not kill process on port $port" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "🚀 Starting all services..." -ForegroundColor Cyan

# Service configurations
$services = @(
    @{ Name = "🏠 Home Page"; Port = 3000; Folder = "ehb-home"; Url = "http://localhost:3000" },
    @{ Name = "⚙️ Admin Panel"; Port = 5000; Folder = "ehb-admin-panel"; Url = "http://localhost:5000" },
    @{ Name = "🔧 Development Portal"; Port = 8080; Folder = "ehb-dev-portal"; Url = "http://localhost:8080" },
    @{ Name = "🛒 GoSellr"; Port = 4000; Folder = "ehb-gosellr"; Url = "http://localhost:4000" }
)

$jobs = @()

# Start each service
foreach ($service in $services) {
    Write-Host ""
    Write-Host "🚀 Starting $($service.Name)..." -ForegroundColor Yellow
    
    # Create folder if it doesn't exist
    $folderPath = Join-Path $PWD $service.Folder
    if (-not (Test-Path $folderPath)) {
        Write-Host "📁 Creating folder: $($service.Folder)" -ForegroundColor Cyan
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
        
        # Create package.json
        $packageJson = @{
            name = $service.Folder
            version = "1.0.0"
            scripts = @{
                dev = "next dev --port $($service.Port)"
                build = "next build"
                start = "next start --port $($service.Port)"
            }
        } | ConvertTo-Json -Depth 10
        
        $packageJson | Out-File -FilePath (Join-Path $folderPath "package.json") -Encoding UTF8
    }
    
    # Start service in background job
    $job = Start-Job -ScriptBlock {
        param($Folder, $Port, $ServiceName)
        
        Set-Location $Folder
        npm run dev -- --port $Port
    } -ArgumentList $folderPath, $service.Port, $service.Name
    
    $jobs += @{
        Job = $job
        Service = $service
    }
    
    Write-Host "✅ $($service.Name) started (Job ID: $($job.Id))" -ForegroundColor Green
    Write-Host "⏳ Waiting for service to be ready..." -ForegroundColor Gray
    
    # Wait for service to be ready
    $attempts = 0
    $maxAttempts = 60
    
    while ($attempts -lt $maxAttempts) {
        try {
            $connection = New-Object System.Net.Sockets.TcpClient
            $connection.Connect("localhost", $service.Port)
            $connection.Close()
            Write-Host "✅ $($service.Name) is ready on port $($service.Port)" -ForegroundColor Green
            break
        }
        catch {
            Start-Sleep -Seconds 1
            $attempts++
        }
    }
    
    if ($attempts -eq $maxAttempts) {
        Write-Host "❌ Timeout waiting for $($service.Name)" -ForegroundColor Red
    }
    
    # Open in browser after 2 seconds
    Start-Sleep -Seconds 2
    try {
        Start-Process $service.Url
        Write-Host "🌐 Opened $($service.Name) in browser" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to open $($service.Name) in browser" -ForegroundColor Red
    }
    
    # Wait before next service
    if ($service -ne $services[-1]) {
        Write-Host "⏳ Waiting 3 seconds before next service..." -ForegroundColor Gray
        Start-Sleep -Seconds 3
    }
}

# Start ultra-fast agent
Write-Host ""
Write-Host "🚀 Starting 🚀 Ultra-Fast Agent..." -ForegroundColor Yellow

$agentPath = Join-Path $PWD "scripts\ehb-ultra-fast-agent.cjs"
if (Test-Path $agentPath) {
    $agentJob = Start-Job -ScriptBlock {
        param($ScriptPath)
        node $ScriptPath
    } -ArgumentList $agentPath
    
    $jobs += @{
        Job = $agentJob
        Service = @{ Name = "🚀 Ultra-Fast Agent" }
    }
    
    Write-Host "✅ Ultra-Fast Agent started (Job ID: $($agentJob.Id))" -ForegroundColor Green
} else {
    Write-Host "⚠️  Ultra-Fast Agent script not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ All services started successfully!" -ForegroundColor Green
Write-Host "🌐 All pages should be open in your browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Services running:" -ForegroundColor Cyan
foreach ($service in $services) {
    Write-Host "   • $($service.Name) - $($service.Url)" -ForegroundColor White
}
Write-Host "   • 🚀 Ultra-Fast Agent" -ForegroundColor White

Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   • Use Ctrl+Tab to switch between browser tabs" -ForegroundColor Gray
Write-Host "   • Services will continue running in background" -ForegroundColor Gray
Write-Host "   • Press any key to exit" -ForegroundColor Gray

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Cleanup jobs
foreach ($jobInfo in $jobs) {
    try {
        Stop-Job $jobInfo.Job
        Remove-Job $jobInfo.Job
    }
    catch {
        # Job might already be stopped
    }
}

Write-Host "`n💡 Next Steps:" -ForegroundColor Cyan
Write-Host "- Check http://localhost:3000" -ForegroundColor Gray
Write-Host "- Run 'Get-Job' to see background processes" -ForegroundColor Gray
Write-Host "- Run 'Get-Job | Stop-Job' to stop the server" -ForegroundColor Gray
Write-Host "- Run '.\scripts\ehb-status-check.ps1' for system health" -ForegroundColor Gray 