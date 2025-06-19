# 🚀 EHB Quick Start Script
# One-click setup for immediate development

param(
    [switch]$SkipChecks = $false,
    [switch]$AutoBrowser = $true
)

Write-Host "🚀 EHB Quick Start - One Click Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. Quick MongoDB Test
Write-Host "1️⃣ Quick MongoDB Test..." -ForegroundColor Blue
try {
    & npm run mongo-fast
    Write-Host "✅ MongoDB test completed" -ForegroundColor Green
} catch {
    Write-Host "⚠️ MongoDB test failed, but continuing..." -ForegroundColor Yellow
}

# 2. Install dependencies if needed
Write-Host "`n2️⃣ Checking Dependencies..." -ForegroundColor Blue
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Dependencies already installed" -ForegroundColor Cyan
}

# 3. Generate Prisma client
Write-Host "`n3️⃣ Setting up Prisma..." -ForegroundColor Blue
try {
    npx prisma generate
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Prisma setup failed, but continuing..." -ForegroundColor Yellow
}

# 4. Start development server
Write-Host "`n4️⃣ Starting Development Server..." -ForegroundColor Blue
if (Test-Path "package.json") {
    $packageContent = Get-Content "package.json" | ConvertFrom-Json
    $scripts = $packageContent.scripts
    
    if ($scripts.dev) {
        Write-Host "🚀 Starting: npm run dev..." -ForegroundColor Green
        
        # Start in background
        $job = Start-Job -ScriptBlock {
            Set-Location $using:PWD
            npm run dev
        }
        
        Write-Host "✅ Development server starting in background..." -ForegroundColor Green
        
        # Wait a bit for server to start
        Start-Sleep -Seconds 5
        
        # Open browser
        if ($AutoBrowser) {
            Write-Host "`n5️⃣ Opening Browser..." -ForegroundColor Blue
            Start-Process "http://localhost:3000"
            Write-Host "✅ Opened http://localhost:3000" -ForegroundColor Green
        }
        
        Write-Host "`n🎉 EHB Quick Start Completed!" -ForegroundColor Green
        Write-Host "=================================" -ForegroundColor Green
        Write-Host "🌐 Your app is running at: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "🔧 Server is running in background" -ForegroundColor Cyan
        Write-Host "🛑 To stop: Get-Job | Stop-Job" -ForegroundColor Gray
        
    } else {
        Write-Host "❌ No dev script found in package.json" -ForegroundColor Red
    }
} else {
    Write-Host "❌ No package.json found!" -ForegroundColor Red
}

Write-Host "`n💡 Next Steps:" -ForegroundColor Cyan
Write-Host "- Check http://localhost:3000" -ForegroundColor Gray
Write-Host "- Run 'Get-Job' to see background processes" -ForegroundColor Gray
Write-Host "- Run 'Get-Job | Stop-Job' to stop the server" -ForegroundColor Gray
Write-Host "- Run '.\scripts\ehb-status-check.ps1' for system health" -ForegroundColor Gray 