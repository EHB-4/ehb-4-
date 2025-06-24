# EHB Auto Browser Launcher - PowerShell Script
param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("dev", "storybook", "both")]
    [string]$Command = "dev"
)

# Configuration
$DevPort = 3001
$StorybookPort = 6006
$Delay = 3

# Function to launch browser
function Launch-Browser {
    param([string]$Url)
    
    try {
        Start-Process $Url
        Write-Host "Browser launched: $Url" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to launch browser: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Please manually open: $Url" -ForegroundColor Yellow
    }
}

# Function to start development server
function Start-DevServer {
    Write-Host "Starting Next.js development server..." -ForegroundColor Cyan
    
    # Start the dev server in background
    Start-Process -FilePath "npm" -ArgumentList "run", "dev" -NoNewWindow
    
    # Wait and launch browser
    Start-Sleep -Seconds $Delay
    Launch-Browser "http://localhost:$DevPort"
}

# Function to start Storybook
function Start-Storybook {
    Write-Host "Starting Storybook..." -ForegroundColor Cyan
    
    # Start Storybook in background
    Start-Process -FilePath "npm" -ArgumentList "run", "storybook" -NoNewWindow
    
    # Wait and launch browser
    Start-Sleep -Seconds $Delay
    Launch-Browser "http://localhost:$StorybookPort"
}

# Function to start both
function Start-Both {
    Write-Host "Launching both development server and Storybook..." -ForegroundColor Magenta
    
    Start-DevServer
    Start-Sleep -Seconds 2
    Start-Storybook
}

# Main execution
Write-Host "EHB Auto Browser Launcher" -ForegroundColor Green
Write-Host "Command: $Command" -ForegroundColor Yellow

switch ($Command) {
    "dev" {
        Start-DevServer
    }
    "storybook" {
        Start-Storybook
    }
    "both" {
        Start-Both
    }
    default {
        Write-Host @"
Usage:
  .\scripts\auto-launch.ps1 [command]

Commands:
  dev        - Launch Next.js dev server + browser
  storybook  - Launch Storybook + browser  
  both       - Launch both servers + browsers

Examples:
  .\scripts\auto-launch.ps1 dev
  .\scripts\auto-launch.ps1 storybook
  .\scripts\auto-launch.ps1 both
"@ -ForegroundColor Cyan
    }
}

Write-Host "Auto launch completed!" -ForegroundColor Green 