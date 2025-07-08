# Agent Auto Sync Starter Script
# Automatically starts the agent sync system and monitors for agent activity

param(
    [switch]$AutoStart,
    [switch]$Background,
    [switch]$Install
)

$ErrorActionPreference = "Stop"

# Configuration
$ProjectRoot = Get-Location
$ScriptPath = Join-Path $ProjectRoot "scripts\agent-auto-sync.js"
$LogPath = Join-Path $ProjectRoot "logs\agent-sync.log"
$PidFile = Join-Path $ProjectRoot "temp\agent-sync.pid"

# Create necessary directories
$LogDir = Split-Path $LogPath -Parent
$TempDir = Split-Path $PidFile -Parent
if (!(Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }
if (!(Test-Path $TempDir)) { New-Item -ItemType Directory -Path $TempDir -Force | Out-Null }

# Colors for output
$Colors = @{
    Info = "Cyan"
    Success = "Green"
    Warning = "Yellow"
    Error = "Red"
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Colors[$Color]
}

function Test-NodeInstalled {
    try {
        $nodeVersion = node --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

function Test-GitInstalled {
    try {
        $gitVersion = git --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

function Test-AgentSyncRunning {
    if (Test-Path $PidFile) {
        $pid = Get-Content $PidFile -ErrorAction SilentlyContinue
        if ($pid) {
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            return $process -ne $null
        }
    }
    return $false
}

function Start-AgentSync {
    param(
        [switch]$Background
    )
    
    Write-ColorOutput "🚀 Starting Agent Auto Sync System..." "Info"
    
    if (!(Test-NodeInstalled)) {
        Write-ColorOutput "❌ Node.js is not installed. Please install Node.js first." "Error"
        return $false
    }
    
    if (!(Test-GitInstalled)) {
        Write-ColorOutput "❌ Git is not installed. Please install Git first." "Error"
        return $false
    }
    
    if (!(Test-Path $ScriptPath)) {
        Write-ColorOutput "❌ Agent sync script not found: $ScriptPath" "Error"
        return $false
    }
    
    if (Test-AgentSyncRunning) {
        Write-ColorOutput "⚠️ Agent sync is already running" "Warning"
        return $true
    }
    
    try {
        if ($Background) {
            # Start in background
            $process = Start-Process -FilePath "node" -ArgumentList $ScriptPath, "start" -PassThru -WindowStyle Hidden
            $process.Id | Out-File $PidFile
            Write-ColorOutput "✅ Agent sync started in background (PID: $($process.Id))" "Success"
        }
        else {
            # Start in foreground
            Write-ColorOutput "📝 Logs will be written to: $LogPath" "Info"
            & node $ScriptPath start 2>&1 | Tee-Object -FilePath $LogPath
        }
        return $true
    }
    catch {
        Write-ColorOutput "❌ Failed to start agent sync: $($_.Exception.Message)" "Error"
        return $false
    }
}

function Stop-AgentSync {
    Write-ColorOutput "🛑 Stopping Agent Auto Sync System..." "Info"
    
    if (Test-Path $PidFile) {
        $pid = Get-Content $PidFile -ErrorAction SilentlyContinue
        if ($pid) {
            try {
                $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                if ($process) {
                    $process.Kill()
                    Write-ColorOutput "✅ Agent sync stopped (PID: $pid)" "Success"
                }
            }
            catch {
                Write-ColorOutput "⚠️ Could not stop process: $($_.Exception.Message)" "Warning"
            }
        }
        Remove-Item $PidFile -ErrorAction SilentlyContinue
    }
    else {
        Write-ColorOutput "ℹ️ Agent sync is not running" "Info"
    }
}

function Get-AgentSyncStatus {
    Write-ColorOutput "📊 Agent Auto Sync Status:" "Info"
    
    if (Test-AgentSyncRunning) {
        Write-ColorOutput "🟢 Running" "Success"
        $pid = Get-Content $PidFile -ErrorAction SilentlyContinue
        Write-ColorOutput "📝 PID: $pid" "Info"
    }
    else {
        Write-ColorOutput "🔴 Not running" "Error"
    }
    
    if (Test-Path $LogPath) {
        $logSize = (Get-Item $LogPath).Length
        Write-ColorOutput "📄 Log file: $LogPath ($([math]::Round($logSize/1KB, 2)) KB)" "Info"
    }
    
    # Check if script exists
    if (Test-Path $ScriptPath) {
        Write-ColorOutput "✅ Script found: $ScriptPath" "Success"
    }
    else {
        Write-ColorOutput "❌ Script not found: $ScriptPath" "Error"
    }
}

function Install-AutoStartup {
    Write-ColorOutput "🔧 Installing Agent Auto Sync for startup..." "Info"
    
    $startupScript = @"
# Auto-start Agent Sync
Set-Location "$ProjectRoot"
& "$PSHOME\powershell.exe" -File "$PSCommandPath" -AutoStart -Background
"@
    
    $startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\start-agent-sync.ps1"
    $startupScript | Out-File $startupPath -Encoding UTF8
    
    Write-ColorOutput "✅ Auto-startup installed: $startupPath" "Success"
}

function Uninstall-AutoStartup {
    Write-ColorOutput "🗑️ Removing Agent Auto Sync from startup..." "Info"
    
    $startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\start-agent-sync.ps1"
    if (Test-Path $startupPath) {
        Remove-Item $startupPath
        Write-ColorOutput "✅ Auto-startup removed" "Success"
    }
    else {
        Write-ColorOutput "ℹ️ Auto-startup not found" "Info"
    }
}

# Main execution
Write-ColorOutput "🤖 EHB Agent Auto Sync Manager" "Info"
Write-ColorOutput "=====================================" "Info"

if ($Install) {
    Install-AutoStartup
    exit 0
}

if ($AutoStart) {
    Start-AgentSync -Background
    exit 0
}

# Parse command line arguments
$command = $args[0]

switch ($command) {
    "start" {
        Start-AgentSync -Background:$Background
    }
    "stop" {
        Stop-AgentSync
    }
    "restart" {
        Stop-AgentSync
        Start-Sleep -Seconds 2
        Start-AgentSync -Background:$Background
    }
    "status" {
        Get-AgentSyncStatus
    }
    "install" {
        Install-AutoStartup
    }
    "uninstall" {
        Uninstall-AutoStartup
    }
    "logs" {
        if (Test-Path $LogPath) {
            Get-Content $LogPath -Tail 50
        }
        else {
            Write-ColorOutput "❌ No log file found" "Error"
        }
    }
    default {
        Write-ColorOutput "Usage:" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 start     - Start agent sync" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 stop      - Stop agent sync" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 restart   - Restart agent sync" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 status    - Show status" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 install   - Install auto-startup" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 uninstall - Remove auto-startup" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 logs      - Show recent logs" "Info"
        Write-ColorOutput ""
        Write-ColorOutput "Options:" "Info"
        Write-ColorOutput "  -Background    - Run in background" "Info"
        Write-ColorOutput "  -AutoStart     - Auto-start mode" "Info"
        Write-ColorOutput ""
        Write-ColorOutput "Examples:" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 start -Background" "Info"
        Write-ColorOutput "  .\start-agent-sync.ps1 install" "Info"
    }
} 