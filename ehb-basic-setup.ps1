# ========================================
# EHB Basic Auto Setup Script
# Quick Environment + Prisma Setup
# ========================================

Write-Host "Starting EHB Basic Auto Setup..." -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Step 1: Check and Create .env.local
Write-Host "`nStep 1: Setting up environment variables..." -ForegroundColor Cyan
$envFile = ".env.local"

if (!(Test-Path $envFile)) {
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    New-Item -ItemType File -Path $envFile -Force | Out-Null
    Write-Host "✅ .env.local file created" -ForegroundColor Green
} else {
    Write-Host "ℹ️ .env.local file already exists" -ForegroundColor Cyan
}

# Read existing content
$envContent = Get-Content $envFile -ErrorAction SilentlyContinue

# Add DATABASE_URL if missing
$existingDbUrl = $envContent | Where-Object { $_ -match "^DATABASE_URL=" }
if (-not $existingDbUrl) {
    Add-Content $envFile 'DATABASE_URL="mongodb://localhost:27018/ehb"'
    Write-Host "✅ DATABASE_URL added" -ForegroundColor Green
} else {
    Write-Host "ℹ️ DATABASE_URL already exists" -ForegroundColor Cyan
}

# Add NEXTAUTH_SECRET if missing
$existingNextAuthSecret = $envContent | Where-Object { $_ -match "^NEXTAUTH_SECRET=" }
if (-not $existingNextAuthSecret) {
    $randomSecret = -join ((48..57) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Add-Content $envFile "NEXTAUTH_SECRET=`"$randomSecret`""
    Write-Host "✅ NEXTAUTH_SECRET added" -ForegroundColor Green
} else {
    Write-Host "ℹ️ NEXTAUTH_SECRET already exists" -ForegroundColor Cyan
}

# Add NEXTAUTH_URL if missing
$existingNextAuthUrl = $envContent | Where-Object { $_ -match "^NEXTAUTH_URL=" }
if (-not $existingNextAuthUrl) {
    Add-Content $envFile 'NEXTAUTH_URL="http://localhost:3000"'
    Write-Host "✅ NEXTAUTH_URL added" -ForegroundColor Green
} else {
    Write-Host "ℹ️ NEXTAUTH_URL already exists" -ForegroundColor Cyan
}

# Add PORT if missing
$existingPort = $envContent | Where-Object { $_ -match "^PORT=" }
if (-not $existingPort) {
    Add-Content $envFile 'PORT=5500'
    Write-Host "✅ PORT=5500 added" -ForegroundColor Green
} else {
    Write-Host "ℹ️ PORT already exists" -ForegroundColor Cyan
}

# Step 2: Check Node.js and npm
Write-Host "`nStep 2: Checking Node.js environment..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js or npm not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Step 3: Install dependencies if needed
Write-Host "`nStep 3: Checking dependencies..." -ForegroundColor Cyan
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Dependencies already installed" -ForegroundColor Cyan
}

# Step 4: Prisma Setup
Write-Host "`nStep 4: Setting up Prisma..." -ForegroundColor Cyan

# Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "✅ Prisma Client generated" -ForegroundColor Green
} catch {
    Write-Host "❌ Prisma Client generation failed" -ForegroundColor Red
    exit 1
}

# Push Database Schema
Write-Host "Pushing database schema..." -ForegroundColor Yellow
try {
    npx prisma db push
    Write-Host "✅ Database schema pushed" -ForegroundColor Green
} catch {
    Write-Host "❌ Database schema push failed" -ForegroundColor Red
    exit 1
}

# Seed Database
Write-Host "Seeding database..." -ForegroundColor Yellow
try {
    npx prisma db seed
    Write-Host "✅ Database seeded successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Database seeding failed" -ForegroundColor Red
}

# Step 5: Final Status
Write-Host "`nStep 5: Final Status Report" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Yellow

# Check all components
Write-Host "Checking components..." -ForegroundColor Yellow

# Check Node.js
try {
    node --version | Out-Null
    Write-Host "✅ Node.js: Ready" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js: Not Ready" -ForegroundColor Red
}

# Check npm
try {
    npm --version | Out-Null
    Write-Host "✅ npm: Ready" -ForegroundColor Green
} catch {
    Write-Host "❌ npm: Not Ready" -ForegroundColor Red
}

# Check Prisma Client
if (Test-Path "node_modules/@prisma/client") {
    Write-Host "✅ Prisma Client: Ready" -ForegroundColor Green
} else {
    Write-Host "❌ Prisma Client: Not Ready" -ForegroundColor Red
}

# Check Environment File
if (Test-Path ".env.local") {
    Write-Host "✅ Environment File: Ready" -ForegroundColor Green
} else {
    Write-Host "❌ Environment File: Not Ready" -ForegroundColor Red
}

# Check Dependencies
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies: Ready" -ForegroundColor Green
} else {
    Write-Host "❌ Dependencies: Not Ready" -ForegroundColor Red
}

Write-Host "`n🚀 Basic Setup Complete!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Yellow
Write-Host "`n📊 Database URL: mongodb://localhost:27018/ehb" -ForegroundColor Cyan
Write-Host "🌐 Application URL: http://localhost:5500" -ForegroundColor Cyan

Write-Host "`n=====================================" -ForegroundColor Yellow
Write-Host "🎯 EHB Basic Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Yellow 