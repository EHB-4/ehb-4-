# Auto Development Commands for Windows PowerShell
# This script automates all development tasks

param(
    [string]$Command = "dev",
    [switch]$Auto,
    [switch]$Clean,
    [switch]$Restart,
    [switch]$Build,
    [switch]$Test,
    [switch]$Install
)

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Blue = "Blue"
$Cyan = "Cyan"

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Function to kill all Node processes
function Stop-NodeProcesses {
    Write-ColorOutput "🔄 Stopping all Node processes..." $Yellow
    try {
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
        Write-ColorOutput "✅ All Node processes stopped" $Green
    }
    catch {
        Write-ColorOutput "ℹ️ No Node processes found" $Blue
    }
}

# Function to clean .next directory
function Remove-NextDirectory {
    Write-ColorOutput "🧹 Cleaning .next directory..." $Yellow
    $nextDir = Join-Path $PWD ".next"
    if (Test-Path $nextDir) {
        Remove-Item $nextDir -Recurse -Force
        Write-ColorOutput "✅ .next directory cleaned" $Green
    }
    else {
        Write-ColorOutput "ℹ️ .next directory not found" $Blue
    }
}

# Function to install dependencies
function Install-Dependencies {
    Write-ColorOutput "📦 Installing dependencies..." $Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Dependencies installed successfully" $Green
    }
    else {
        Write-ColorOutput "❌ Failed to install dependencies" $Red
        exit 1
    }
}

# Function to start development server
function Start-DevServer {
    Write-ColorOutput "🚀 Starting development server..." $Yellow
    Write-ColorOutput "🌐 Server will be available at: http://localhost:3000" $Cyan
    npm run dev
}

# Function to run tests
function Run-Tests {
    Write-ColorOutput "🧪 Running tests..." $Yellow
    npm test
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ All tests passed" $Green
    }
    else {
        Write-ColorOutput "⚠️ Some tests failed" $Red
    }
}

# Function to build for production
function Build-Production {
    Write-ColorOutput "🏗️ Building for production..." $Yellow
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Production build successful" $Green
    }
    else {
        Write-ColorOutput "❌ Production build failed" $Red
        exit 1
    }
}

# Function to run linting
function Run-Lint {
    Write-ColorOutput "🔍 Running linting..." $Yellow
    npm run lint
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Code linting passed" $Green
    }
    else {
        Write-ColorOutput "⚠️ Code linting issues found" $Red
    }
}

# Function to auto-restart development
function Start-AutoDev {
    Write-ColorOutput "🤖 Starting Auto Development Mode..." $Cyan
    Write-ColorOutput "📝 File changes will auto-restart the server" $Blue
    Write-ColorOutput "🛑 Press Ctrl+C to stop" $Yellow
    
    # Kill existing processes
    Stop-NodeProcesses
    
    # Clean .next directory
    Remove-NextDirectory
    
    # Install dependencies if needed
    if (-not (Test-Path "node_modules")) {
        Install-Dependencies
    }
    
    # Start development server
    Start-DevServer
}

# Function to clean and restart
function Start-CleanRestart {
    Write-ColorOutput "🔄 Clean restart..." $Yellow
    
    # Kill existing processes
    Stop-NodeProcesses
    
    # Clean .next directory
    Remove-NextDirectory
    
    # Start development server
    Start-DevServer
}

# Main execution logic
Write-ColorOutput "🚀 EHB Next.js 04 - Auto Development Commands" $Cyan
Write-ColorOutput "=============================================" $Cyan

switch ($Command.ToLower()) {
    "dev" {
        if ($Clean) {
            Start-CleanRestart
        }
        elseif ($Auto) {
            Start-AutoDev
        }
        else {
            Start-DevServer
        }
    }
    "clean" {
        Stop-NodeProcesses
        Remove-NextDirectory
        Write-ColorOutput "✅ Cleanup completed" $Green
    }
    "restart" {
        Start-CleanRestart
    }
    "build" {
        Build-Production
    }
    "test" {
        Run-Tests
    }
    "install" {
        Install-Dependencies
    }
    "lint" {
        Run-Lint
    }
    "auto" {
        Start-AutoDev
    }
    default {
        Write-ColorOutput "❌ Unknown command: $Command" $Red
        Write-ColorOutput "Available commands:" $Yellow
        Write-ColorOutput "  dev        - Start development server" $Blue
        Write-ColorOutput "  dev -Clean - Clean and start development server" $Blue
        Write-ColorOutput "  dev -Auto  - Start auto development mode" $Blue
        Write-ColorOutput "  clean      - Clean .next directory and stop processes" $Blue
        Write-ColorOutput "  restart    - Clean restart development server" $Blue
        Write-ColorOutput "  build      - Build for production" $Blue
        Write-ColorOutput "  test       - Run tests" $Blue
        Write-ColorOutput "  install    - Install dependencies" $Blue
        Write-ColorOutput "  lint       - Run linting" $Blue
        Write-ColorOutput "  auto       - Start auto development mode" $Blue
    }
} 