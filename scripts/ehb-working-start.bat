@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 EHB Working Start - Actually Works!
echo =====================================
echo Starting all ports and opening in browser...
echo.

:: Kill existing processes
echo 🔄 Killing existing processes...
for %%p in (3000 5000 8080 4000) do (
    netstat -ano | findstr :%%p >nul 2>&1
    if !errorlevel! equ 0 (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%p') do (
            taskkill /PID %%a /F >nul 2>&1
            echo ✅ Killed process on port %%p
        )
    )
)

timeout /t 2 /nobreak >nul

:: Service configurations
set "services[0].name=Home Page"
set "services[0].port=3000"
set "services[0].url=http://localhost:3000"

set "services[1].name=Admin Panel"
set "services[1].port=5000"
set "services[1].url=http://localhost:5000"

set "services[2].name=Development Portal"
set "services[2].port=8080"
set "services[2].url=http://localhost:8080"

set "services[3].name=GoSellr"
set "services[3].port=4000"
set "services[3].url=http://localhost:4000"

:: Start each service
for /L %%i in (0,1,3) do (
    echo.
    echo 🚀 Starting !services[%%i].name! on port !services[%%i].port!...
    
    :: Create app directory
    set "appDir=ehb-app-!services[%%i].port!"
    if not exist "!appDir!" (
        echo 📁 Creating !appDir!...
        mkdir "!appDir!"
        mkdir "!appDir!\pages"
        
        :: Create package.json
        echo {> "!appDir!\package.json"
        echo   "name": "!appDir!",>> "!appDir!\package.json"
        echo   "version": "1.0.0",>> "!appDir!\package.json"
        echo   "scripts": {>> "!appDir!\package.json"
        echo     "dev": "next dev --port !services[%%i].port!",>> "!appDir!\package.json"
        echo     "build": "next build",>> "!appDir!\package.json"
        echo     "start": "next start --port !services[%%i].port!">> "!appDir!\package.json"
        echo   },>> "!appDir!\package.json"
        echo   "dependencies": {>> "!appDir!\package.json"
        echo     "next": "^14.0.0",>> "!appDir!\package.json"
        echo     "react": "^18.0.0",>> "!appDir!\package.json"
        echo     "react-dom": "^18.0.0">> "!appDir!\package.json"
        echo   }>> "!appDir!\package.json"
        echo }>> "!appDir!\package.json"
        
        :: Create simple index.js
        echo import React from 'react';> "!appDir!\pages\index.js"
        echo.>> "!appDir!\pages\index.js"
        echo export default function Home() {>> "!appDir!\pages\index.js"
        echo   return (>> "!appDir!\pages\index.js"
        echo     ^<div style={{ fontFamily: 'Arial, sans-serif', padding: '50px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh' }}^>>> "!appDir!\pages\index.js"
        echo       ^<h1 style={{ color: '#333', fontSize: '3rem', marginBottom: '20px' }}^>🚀 EHB !services[%%i].port! Port^</h1^>>> "!appDir!\pages\index.js"
        echo       ^<p style={{ fontSize: '1.5rem', color: '#666' }}^>This is the !services[%%i].port! port running successfully!^</p^>>> "!appDir!\pages\index.js"
        echo       ^<div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}^>>> "!appDir!\pages\index.js"
        echo         ^<h2^>Service Information:^</h2^>>> "!appDir!\pages\index.js"
        echo         ^<p^>^<strong^>Port:^</strong^> !services[%%i].port!^</p^>>> "!appDir!\pages\index.js"
        echo         ^<p^>^<strong^>Status:^</strong^> ✅ Running^</p^>>> "!appDir!\pages\index.js"
        echo         ^<p^>^<strong^>Time:^</strong^> %date% %time%^</p^>>> "!appDir!\pages\index.js"
        echo       ^</div^>>> "!appDir!\pages\index.js"
        echo     ^</div^>>> "!appDir!\pages\index.js"
        echo   );>> "!appDir!\pages\index.js"
        echo }>> "!appDir!\pages\index.js"
    )
    
    :: Install dependencies if needed
    if not exist "!appDir!\node_modules" (
        echo 📦 Installing dependencies for !services[%%i].name!...
        cd /d "!appDir!"
        npm install >nul 2>&1
        cd /d "%~dp0"
    )
    
    :: Start service in background
    start "EHB !services[%%i].name!" cmd /c "cd /d !appDir! && npm run dev"
    
    echo ✅ !services[%%i].name! started
    echo ⏳ Waiting for service to be ready...
    
    :: Wait for service to be ready
    :wait_loop_%%i
    timeout /t 1 /nobreak >nul
    netstat -ano | findstr :!services[%%i].port! >nul 2>&1
    if !errorlevel! neq 0 (
        goto wait_loop_%%i
    )
    
    echo ✅ !services[%%i].name! is ready on port !services[%%i].port!
    
    :: Open in browser after 2 seconds
    timeout /t 2 /nobreak >nul
    start "" "!services[%%i].url!"
    echo 🌐 Opened !services[%%i].name! in browser
    
    :: Wait before next service
    if %%i lss 3 (
        echo ⏳ Waiting 3 seconds before next service...
        timeout /t 3 /nobreak >nul
    )
)

echo.
echo 🎉 All services started successfully!
echo.
echo 📋 Services running:
echo    • Home Page - http://localhost:3000
echo    • Admin Panel - http://localhost:5000
echo    • Development Portal - http://localhost:8080
echo    • GoSellr - http://localhost:4000
echo.
echo 💡 All pages should be open in your browser now!
echo 🛑 Press any key to exit
echo.
pause 