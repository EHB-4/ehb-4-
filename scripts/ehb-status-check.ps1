# 🔍 EHB Status Check Script - Simple Version
# Quick health check for Docker, MongoDB, and application status

param(
    [switch]$Detailed = $false,
    [switch]$FixIssues = $false
)

Write-Host "🔍 EHB System Status Check" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Docker Status
Write-Host "1️⃣ Checking Docker..." -ForegroundColor Blue
try {
    $dockerInfo = docker info
    if ($dockerInfo -match "Server Version") {
        Write-Host "🟢 Docker is running." -ForegroundColor Green
    } else {
        Write-Host "🔴 Docker is NOT running." -ForegroundColor Red
    }
} catch {
    Write-Host "🔴 Docker is not installed or not accessible." -ForegroundColor Red
}

# 2. Check MongoDB Container
Write-Host "`n2️⃣ Checking MongoDB Container..." -ForegroundColor Blue
try {
    $mongoContainers = docker ps | Select-String "mongo"
    if ($mongoContainers) {
        Write-Host "🟢 MongoDB container is running." -ForegroundColor Green
    } else {
        Write-Host "🔴 MongoDB container not found." -ForegroundColor Red
        if ($FixIssues) {
            Write-Host "💡 Starting MongoDB container..." -ForegroundColor Yellow
            docker run --name test-mongo -d -p 27018:27017 mongo
            Start-Sleep -Seconds 5
        }
    }
} catch {
    Write-Host "🔴 Could not check MongoDB container." -ForegroundColor Red
}

# 3. Check Prisma Setup
Write-Host "`n3️⃣ Checking Prisma Setup..." -ForegroundColor Blue
if (Test-Path "prisma/schema.prisma") {
    Write-Host "🟢 Prisma schema exists." -ForegroundColor Green
} else {
    Write-Host "🔴 Prisma schema not found." -ForegroundColor Red
}

# 4. Check Application Status
Write-Host "`n4️⃣ Checking Application Status..." -ForegroundColor Blue
if (Test-Path "package.json") {
    Write-Host "🟢 package.json found." -ForegroundColor Green
} else {
    Write-Host "🔴 package.json not found." -ForegroundColor Red
}

# 5. Check Environment Files
Write-Host "`n5️⃣ Checking Environment Configuration..." -ForegroundColor Blue
$envFiles = @(".env", ".env.local", ".env.development")
$envFound = $false

foreach ($envFile in $envFiles) {
    if (Test-Path $envFile) {
        Write-Host "🟢 Found: $envFile" -ForegroundColor Green
        $envFound = $true
        break
    }
}

if (-not $envFound) {
    Write-Host "🔴 No environment files found." -ForegroundColor Red
    if ($FixIssues) {
        Write-Host "💡 Creating .env.local..." -ForegroundColor Yellow
        $envContent = @"
DATABASE_URL="mongodb://localhost:27018/test"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
"@
        Set-Content -Path ".env.local" -Value $envContent
    }
}

# Summary
Write-Host "`n📊 Status Summary:" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Write-Host "✅ Basic system checks completed" -ForegroundColor Green

Write-Host "`n💡 Quick Commands:" -ForegroundColor Cyan
Write-Host "npm run dev          - Start development server" -ForegroundColor Gray
Write-Host "npm run mongo-fast   - Run MongoDB tests" -ForegroundColor Gray
Write-Host "npx prisma studio    - Open Prisma Studio" -ForegroundColor Gray
Write-Host "docker ps            - Check running containers" -ForegroundColor Gray 