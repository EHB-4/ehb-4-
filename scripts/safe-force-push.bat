@echo off
echo ========================================
echo EHB Safe Force Push Script
echo ========================================
echo.

echo [1/5] Creating backup of current state...
git branch backup-before-cleanup
echo ✓ Backup created: backup-before-cleanup

echo.
echo [2/5] Adding all changes...
git add .
echo ✓ All changes added

echo.
echo [3/5] Committing changes...
git commit -m "EHB Project Cleanup - Fresh Start $(date /t)"
echo ✓ Changes committed

echo.
echo [4/5] Force pushing to GitHub...
echo ⚠️  WARNING: This will overwrite GitHub repository!
echo ⚠️  Old data will be replaced with new clean data
echo.
set /p confirm="Are you sure? Type 'YES' to continue: "
if /i "%confirm%"=="YES" (
    git push origin main --force
    echo ✓ Force push completed
) else (
    echo ❌ Push cancelled
    exit /b 1
)

echo.
echo [5/5] Cleanup...
git branch -d backup-before-cleanup
echo ✓ Backup branch deleted

echo.
echo ========================================
echo ✅ EHB Project Successfully Updated!
echo ========================================
echo.
echo 📋 What happened:
echo    • Old data backed up to 'backup-before-cleanup' branch
echo    • New clean data pushed to GitHub
echo    • GitHub repository now has fresh data
echo.
echo ⚠️  Team Members Instructions:
echo    1. Run: git fetch origin
echo    2. Run: git reset --hard origin/main
echo    3. Run: npm install (if needed)
echo.
pause 