# EHB Port 5500 Guardian PowerShell Script
param(
    [switch]$AutoStart,
    [switch]$EmergencyFix
)

# Set execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Change to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
Set-Location $projectRoot

Write-Host "🎯 EHB Port 5500 Guardian" -ForegroundColor Green
Write-Host "📁 Project Root: $projectRoot" -ForegroundColor Cyan
Write-Host "🔧 Port: 5500" -ForegroundColor Yellow
Write-Host ""

if ($EmergencyFix) {
    Write-Host "🚨 Emergency Fix Mode" -ForegroundColor Red
    
    # Kill all Node processes
    try {
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
        Write-Host "✅ Killed all Node processes" -ForegroundColor Green
    } catch {
        Write-Host "ℹ️ No Node processes found" -ForegroundColor Yellow
    }
    
    # Clear port 5500
    try {
        npx kill-port 5500
        Write-Host "✅ Cleared port 5500" -ForegroundColor Green
    } catch {
        Write-Host "ℹ️ Port 5500 was not in use" -ForegroundColor Yellow
    }
    
    # Clear Next.js cache
    try {
        npm run clean
        Write-Host "✅ Cleared Next.js cache" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Could not clear cache" -ForegroundColor Yellow
    }
}

Write-Host "🚀 Starting Port 5500 Guardian..." -ForegroundColor Green
Write-Host ""

# Start the guardian
try {
    node scripts/port-5500-guardian.cjs
} catch {
    Write-Host "❌ Failed to start guardian: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} 