# EHB Auto Launch Script
param(
    [string]$Mode = "all"
)

$DevPort = 3001
$AdminPort = 3002
$DevPortalPort = 3003
$AnalyticsPort = 3004
$AIMarketplacePort = 3005

function Launch-Browser {
    param([string]$Url, [string]$Service)
    try {
        Start-Process $Url
        Write-Host "✅ Launched browser for $Service at $Url" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to launch browser for $Service" -ForegroundColor Red
    }
}

function Start-Service {
    param([string]$Port, [string]$Service)
    try {
        $env:PORT = $Port
        Start-Process "npm" -ArgumentList "run", "dev" -NoNewWindow
        Start-Sleep -Seconds 3
        Launch-Browser "http://localhost:$Port" $Service
    } catch {
        Write-Host "❌ Failed to start $Service" -ForegroundColor Red
    }
}

switch ($Mode) {
    "main" {
        Start-Service $DevPort "EHB Main App"
    }
    "admin" {
        Start-Service $AdminPort "EHB Admin Panel"
    }
    "portal" {
        Start-Service $DevPortalPort "EHB Development Portal"
    }
    "analytics" {
        Start-Service $AnalyticsPort "EHB Analytics"
    }
    "ai-marketplace" {
        Start-Service $AIMarketplacePort "EHB AI Marketplace"
    }
    "all" {
        Start-Service $DevPort "EHB Main App"
        Start-Sleep -Seconds 2
        Start-Service $AdminPort "EHB Admin Panel"
        Start-Sleep -Seconds 2
        Start-Service $DevPortalPort "EHB Development Portal"
        Start-Sleep -Seconds 2
        Start-Service $AnalyticsPort "EHB Analytics"
        Start-Sleep -Seconds 2
        Start-Service $AIMarketplacePort "EHB AI Marketplace"
    }
    default {
        Write-Host "Usage: .\auto-launch.ps1 [main|admin|portal|analytics|ai-marketplace|all]" -ForegroundColor Yellow
    }
}