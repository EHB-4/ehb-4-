# EHB Error Fix Script for Windows PowerShell

Write-Host "🔧 EHB Error Fix Script Starting..." -ForegroundColor Green
Write-Host ""

try {
    # 1. Clear Next.js cache
    Write-Host "1️⃣ Clearing Next.js cache..." -ForegroundColor Yellow
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
        Write-Host "✅ Cache cleared" -ForegroundColor Green
    }

    # 2. Clear node_modules and reinstall
    Write-Host "`n2️⃣ Reinstalling dependencies..." -ForegroundColor Yellow
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
    }
    npm install

    # 3. Install missing dependencies
    Write-Host "`n3️⃣ Installing missing dependencies..." -ForegroundColor Yellow
    npm install postcss tailwindcss autoprefixer --save-dev
    npm install react@18.3.1 react-dom@18.3.1 --save

    # 4. Build the project
    Write-Host "`n4️⃣ Building project..." -ForegroundColor Yellow
    npm run build

    Write-Host "`n✅ All errors fixed! You can now run: npm run dev" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error during fix process: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 