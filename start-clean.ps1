# EHB Next.js 04 - Clean Startup PowerShell Script
# Starts only the frontend without any background processes

Write-Host "🚀 EHB Next.js 04 - Clean Startup" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Function to kill processes using port 3000
function Stop-PortProcesses {
    Write-Host "🧹 Cleaning up processes using port 3000..." -ForegroundColor Yellow
    
    try {
        $processes = netstat -ano | Select-String ":3000" | ForEach-Object {
            $_.ToString().Split(' ')[-1]
        }
        
        foreach ($processId in $processes) {
            if ($processId -match '^\d+$') {
                try {
                    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                    Write-Host "   Killed process: $processId" -ForegroundColor Gray
                } catch {
                    # Process might already be dead
                }
            }
        }
        Write-Host "✅ Port cleanup complete" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Some processes may still be running" -ForegroundColor Yellow
    }
}

# Function to check if port is available
function Test-PortAvailable {
    param([int]$Port = 3000)
    
    Write-Host "🔍 Checking port $Port availability..." -ForegroundColor Yellow
    
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        Write-Host "❌ Port $Port is in use" -ForegroundColor Red
        Write-Host "💡 Please stop the process using this port and try again" -ForegroundColor Yellow
        return $false
    } catch {
        Write-Host "✅ Port $Port is available" -ForegroundColor Green
        return $true
    }
}

# Main execution
try {
    # Step 1: Clean up processes
    Stop-PortProcesses
    
    # Step 2: Check port availability
    if (-not (Test-PortAvailable)) {
        exit 1
    }
    
    # Step 3: Start development server
    Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
    Write-Host "📝 Frontend will be available at http://localhost:3000" -ForegroundColor Cyan
    Write-Host "🛑 Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host ""
    
    # Start npm run dev
    npm run dev
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 