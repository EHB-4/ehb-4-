@echo off
title EHB Port 5500 Guardian
color 0A

echo.
echo ========================================
echo    EHB Port 5500 Guardian Starting
echo ========================================
echo.

cd /d "%~dp0.."

echo 🎯 Starting Port 5500 Guardian...
echo 📁 Project: %CD%
echo 🔧 Port: 5500
echo.

node scripts/port-5500-guardian.cjs

pause 