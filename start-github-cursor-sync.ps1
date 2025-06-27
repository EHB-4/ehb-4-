# EHB GitHub-to-Cursor Auto-Push System
# PowerShell Script

param(
    [switch]$Install,
    [switch]$Config,
    [switch]$Status
)

# Set console title and color
$Host.UI.RawUI.WindowTitle = "EHB GitHub-to-Cursor Auto-Push System"
$Host.UI.RawUI.ForegroundColor = "Green"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EHB GitHub-to-Cursor Auto-Push System" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to install dependencies
function Install-Dependencies {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    
    if (!(Test-Path "node_modules\chokidar")) {
        Write-Host "Installing chokidar..." -ForegroundColor Yellow
        npm install chokidar
    }
    
    Write-Host "Dependencies installed" -ForegroundColor Green
}

# Function to show configuration
function Show-Config {
    $configPath = "config\github-cursor-config.json"
    if (Test-Path $configPath) {
        Write-Host "Current Configuration:" -ForegroundColor Cyan
        $config = Get-Content $configPath | ConvertFrom-Json
        $config | ConvertTo-Json -Depth 3 | Write-Host -ForegroundColor Gray
    } else {
        Write-Host "Configuration file not found" -ForegroundColor Red
    }
}

# Function to show status
function Show-Status {
    Write-Host "System Status:" -ForegroundColor Cyan
    
    # Check Node.js
    if (Test-Command "node") {
        $nodeVersion = node --version
        Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "Node.js: Not installed" -ForegroundColor Red
    }
    
    # Check npm
    if (Test-Command "npm") {
        $npmVersion = npm --version
        Write-Host "npm: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "npm: Not available" -ForegroundColor Red
    }
    
    # Check git
    if (Test-Command "git") {
        $gitVersion = git --version
        Write-Host "Git: $gitVersion" -ForegroundColor Green
    } else {
        Write-Host "Git: Not installed" -ForegroundColor Red
    }
    
    # Check if in git repository
    try {
        git status | Out-Null
        Write-Host "Git repository: Initialized" -ForegroundColor Green
        
        # Check remote origin
        $origin = git remote get-url origin 2>$null
        if ($origin) {
            Write-Host "Remote origin: $origin" -ForegroundColor Green
        } else {
            Write-Host "Remote origin: Not configured" -ForegroundColor Red
        }
    } catch {
        Write-Host "Git repository: Not initialized" -ForegroundColor Red
    }
    
    # Check Cursor
    $cursorPaths = @(
        "cursor",
        "Cursor",
        "$env:APPDATA\Cursor\Cursor.exe",
        "$env:LOCALAPPDATA\Programs\Cursor\Cursor.exe"
    )
    
    $cursorFound = $false
    foreach ($path in $cursorPaths) {
        if (Test-Command $path) {
            Write-Host "Cursor: Found at $path" -ForegroundColor Green
            $cursorFound = $true
            break
        }
    }
    
    if (!$cursorFound) {
        Write-Host "Cursor: Not found in PATH" -ForegroundColor Yellow
    }
}

# Handle parameters
if ($Install) {
    Install-Dependencies
    exit
}

if ($Config) {
    Show-Config
    exit
}

if ($Status) {
    Show-Status
    exit
}

# Main execution
Write-Host "Checking system requirements..." -ForegroundColor Yellow

# Check Node.js
if (!(Test-Command "node")) {
    Write-Host "Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check npm
if (!(Test-Command "npm")) {
    Write-Host "npm is not available" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check git
if (!(Test-Command "git")) {
    Write-Host "Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies
Install-Dependencies

# Check if we're in a git repository
try {
    git status | Out-Null
} catch {
    Write-Host "Not a git repository" -ForegroundColor Red
    Write-Host "Please initialize git or navigate to a git repository" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if remote origin exists
$origin = git remote get-url origin 2>$null
if (!$origin) {
    Write-Host "No remote origin found" -ForegroundColor Red
    Write-Host "Please add a GitHub remote: git remote add origin <your-repo-url>" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "All checks passed!" -ForegroundColor Green
Write-Host ""
Write-Host "Starting GitHub-to-Cursor Auto-Push System..." -ForegroundColor Cyan
Write-Host "This will automatically sync your changes between GitHub and Cursor" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop the system" -ForegroundColor Yellow
Write-Host ""

# Start the auto-push system
try {
    node scripts/github-to-cursor-auto-push.js
} catch {
    Write-Host "Error starting the system: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "System stopped" -ForegroundColor Yellow
Read-Host "Press Enter to exit" 