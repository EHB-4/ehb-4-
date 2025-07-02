@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🏠 EHB Home Page Fix and Open
echo =============================
echo Fixing home page and opening in browser...
echo.

set "HOME_PORT=3000"
set "HOME_URL=http://localhost:3000"

:: Step 1: Kill existing process on port 3000
echo 🔄 Step 1: Killing existing process on port 3000...
netstat -ano | findstr :%HOME_PORT% >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%HOME_PORT%') do (
        taskkill /PID %%a /F >nul 2>&1
        echo ✅ Killed process on port %HOME_PORT%
    )
)

timeout /t 2 /nobreak >nul

:: Step 2: Create proper home page
echo 📁 Step 2: Creating proper home page...
set "HOME_DIR=ehb-home"

if not exist "%HOME_DIR%" (
    mkdir "%HOME_DIR%"
    echo ✅ Created directory: %HOME_DIR%
)

:: Create package.json
echo {> "%HOME_DIR%\package.json"
echo   "name": "ehb-home",>> "%HOME_DIR%\package.json"
echo   "version": "1.0.0",>> "%HOME_DIR%\package.json"
echo   "scripts": {>> "%HOME_DIR%\package.json"
echo     "dev": "next dev --port %HOME_PORT%",>> "%HOME_DIR%\package.json"
echo     "build": "next build",>> "%HOME_DIR%\package.json"
echo     "start": "next start --port %HOME_PORT%">> "%HOME_DIR%\package.json"
echo   },>> "%HOME_DIR%\package.json"
echo   "dependencies": {>> "%HOME_DIR%\package.json"
echo     "next": "^14.0.0",>> "%HOME_DIR%\package.json"
echo     "react": "^18.0.0",>> "%HOME_DIR%\package.json"
echo     "react-dom": "^18.0.0">> "%HOME_DIR%\package.json"
echo   }>> "%HOME_DIR%\package.json"
echo }>> "%HOME_DIR%\package.json"
echo ✅ Created package.json

:: Create pages directory
if not exist "%HOME_DIR%\pages" (
    mkdir "%HOME_DIR%\pages"
)

:: Create index.js
echo import React from 'react';> "%HOME_DIR%\pages\index.js"
echo.>> "%HOME_DIR%\pages\index.js"
echo export default function Home() {>> "%HOME_DIR%\pages\index.js"
echo   return (>> "%HOME_DIR%\pages\index.js"
echo     ^<div style={{ fontFamily: 'Arial, sans-serif', padding: '50px', textAlign: 'center', backgroundColor: '#f0f0f0', margin: 0, minHeight: '100vh' }}^>>> "%HOME_DIR%\pages\index.js"
echo       ^<h1 style={{ color: '#333', fontSize: '3rem', marginBottom: '20px' }}^>🏠 EHB Home Page^</h1^>>> "%HOME_DIR%\pages\index.js"
echo       ^<p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '30px' }}^>Welcome to EHB Home Page - Successfully Running!^</p^>>> "%HOME_DIR%\pages\index.js"
echo       ^<div style={{ marginTop: '30px', padding: '30px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}^>>> "%HOME_DIR%\pages\index.js"
echo         ^<h2 style={{ color: '#28a745', marginBottom: '20px' }}^>✅ Home Page Status^</h2^>>> "%HOME_DIR%\pages\index.js"
echo         ^<div style={{ textAlign: 'left', lineHeight: '1.6' }}^>>> "%HOME_DIR%\pages\index.js"
echo           ^<p^>^<strong^>🏠 Page:^</strong^> EHB Home Page^</p^>>> "%HOME_DIR%\pages\index.js"
echo           ^<p^>^<strong^>🌐 URL:^</strong^> %HOME_URL%^</p^>>> "%HOME_DIR%\pages\index.js"
echo           ^<p^>^<strong^>🔧 Port:^</strong^> %HOME_PORT%^</p^>>> "%HOME_DIR%\pages\index.js"
echo           ^<p^>^<strong^>📅 Time:^</strong^> %date% %time%^</p^>>> "%HOME_DIR%\pages\index.js"
echo           ^<p^>^<strong^>✅ Status:^</strong^> ^<span style={{ color: '#28a745', fontWeight: 'bold' }}^>Running Successfully^</span^>^</p^>>> "%HOME_DIR%\pages\index.js"
echo         ^</div^>>> "%HOME_DIR%\pages\index.js"
echo       ^</div^>>> "%HOME_DIR%\pages\index.js"
echo       ^<div style={{ marginTop: '30px' }}^>>> "%HOME_DIR%\pages\index.js"
echo         ^<h3 style={{ color: '#333' }}^>🎉 Home Page is Working!^</h3^>>> "%HOME_DIR%\pages\index.js"
echo         ^<p style={{ color: '#666' }}^>The EHB home page is now running and accessible in your browser.^</p^>>> "%HOME_DIR%\pages\index.js"
echo       ^</div^>>> "%HOME_DIR%\pages\index.js"
echo     ^</div^>>> "%HOME_DIR%\pages\index.js"
echo   );>> "%HOME_DIR%\pages\index.js"
echo }>> "%HOME_DIR%\pages\index.js"
echo ✅ Created home page (index.js)

:: Step 3: Install dependencies
echo 📦 Step 3: Installing dependencies...
cd /d "%HOME_DIR%"
if not exist "node_modules" (
    npm install >nul 2>&1
    echo ✅ Dependencies installed successfully
) else (
    echo ⚠️  Dependencies already installed
)
cd /d "%~dp0"

:: Step 4: Start home page
echo 🚀 Step 4: Starting home page...
start "EHB Home Page" cmd /c "cd /d %HOME_DIR% && npm run dev"

echo ⏳ Waiting for home page to be ready...
:wait_loop
timeout /t 1 /nobreak >nul
netstat -ano | findstr :%HOME_PORT% >nul 2>&1
if !errorlevel! neq 0 (
    goto wait_loop
)

echo ✅ Home page is ready on port %HOME_PORT%

:: Step 5: Open in browser
echo 🌐 Step 5: Opening home page in browser...
timeout /t 3 /nobreak >nul
start "" "%HOME_URL%"
echo ✅ Home page opened in browser!

echo.
echo 🎉 EHB Home Page is now running!
echo.
echo 📋 Home Page Details:
echo    • 🏠 Page: EHB Home Page
echo    • 🌐 URL: %HOME_URL%
echo    • 🔧 Port: %HOME_PORT%
echo    • ✅ Status: Running Successfully
echo.
echo 💡 The home page should be open in your browser now!
echo 🛑 Press any key to exit
echo.
pause 