# EHB Safe Force Push Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EHB Safe Force Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/5] Creating backup of current state..." -ForegroundColor Yellow
git branch backup-before-cleanup
Write-Host "✓ Backup created: backup-before-cleanup" -ForegroundColor Green

Write-Host ""
Write-Host "[2/5] Adding all changes..." -ForegroundColor Yellow
git add .
Write-Host "✓ All changes added" -ForegroundColor Green

Write-Host ""
Write-Host "[3/5] Committing changes..." -ForegroundColor Yellow
$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "EHB Project Cleanup - Fresh Start $date"
Write-Host "✓ Changes committed" -ForegroundColor Green

Write-Host ""
Write-Host "[4/5] Force pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  WARNING: This will overwrite GitHub repository!" -ForegroundColor Red
Write-Host "⚠️  Old data will be replaced with new clean data" -ForegroundColor Red
Write-Host ""
$confirm = Read-Host "Are you sure? Type 'YES' to continue"
if ($confirm -eq "YES") {
    git push origin main --force
    Write-Host "✓ Force push completed" -ForegroundColor Green
} else {
    Write-Host "❌ Push cancelled" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[5/5] Cleanup..." -ForegroundColor Yellow
git branch -d backup-before-cleanup
Write-Host "✓ Backup branch deleted" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ EHB Project Successfully Updated!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 What happened:" -ForegroundColor White
Write-Host "   • Old data backed up to 'backup-before-cleanup' branch" -ForegroundColor Gray
Write-Host "   • New clean data pushed to GitHub" -ForegroundColor Gray
Write-Host "   • GitHub repository now has fresh data" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  Team Members Instructions:" -ForegroundColor Yellow
Write-Host "   1. Run: git fetch origin" -ForegroundColor White
Write-Host "   2. Run: git reset --hard origin/main" -ForegroundColor White
Write-Host "   3. Run: npm install (if needed)" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue" 