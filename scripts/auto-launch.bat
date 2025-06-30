@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 EHB Auto-Launch Services
echo ============================

:: Service configurations
set "HOME_PORT=3000"
set "HOME_URL=http://localhost:3000"
set "HOME_FOLDER=ehb-home"

set "ADMIN_PORT=5000"
set "ADMIN_URL=http://localhost:5000"
set "ADMIN_FOLDER=ehb-admin-panel"

set "DEV_PORTAL_PORT=8080"
set "DEV_PORTAL_URL=http://localhost:8080"
set "DEV_PORTAL_FOLDER=ehb-dev-portal"

set "GOSELLR_PORT=4000"
set "GOSELLR_URL=http://localhost:4000"
set "GOSELLR_FOLDER=ehb-gosellr"

:: Function to check if port is available
:check_port
set "port=%1"
powershell -Command "try { $connection = New-Object System.Net.Sockets.TcpClient; $connection.Connect('localhost', %port%); $connection.Close(); exit 0 } catch { exit 1 }"
if %errorlevel% equ 0 (
    exit /b 0
) else (
    exit /b 1
)

:: Function to wait for service
:wait_for_service
set "port=%1"
set "service_name=%2"
echo ⏳ Waiting for %service_name% to be ready on port %port%...
:wait_loop
call :check_port %port%
if %errorlevel% neq 0 (
    timeout /t 1 /nobreak >nul
    goto wait_loop
)
echo ✅ %service_name% is ready on port %port%
exit /b 0

:: Function to start service
:start_service
set "service_name=%1"
set "port=%2"
set "url=%3"
set "folder=%4"

echo 🚀 Starting %service_name%...

:: Check if folder exists
if not exist "%folder%" (
    echo ⚠️  Folder %folder% not found, skipping...
    exit /b 1
)

:: Change to service directory
cd /d "%folder%"

:: Start the service in background
start "EHB %service_name%" cmd /c "npm run dev -- --port %port%"

:: Wait for service to be ready
call :wait_for_service %port% "%service_name%"

:: Open in browser after 2 seconds
timeout /t 2 /nobreak >nul
start "" "%url%"

:: Return to original directory
cd /d "%~dp0"

echo ✅ %service_name% started successfully
exit /b 0

:: Main execution
if "%1"=="home" (
    call :start_service "Home Page" %HOME_PORT% %HOME_URL% %HOME_FOLDER%
) else if "%1"=="admin" (
    call :start_service "Admin Panel" %ADMIN_PORT% %ADMIN_URL% %ADMIN_FOLDER%
) else if "%1"=="dev-portal" (
    call :start_service "Development Portal" %DEV_PORTAL_PORT% %DEV_PORTAL_URL% %DEV_PORTAL_FOLDER%
) else if "%1"=="gosellr" (
    call :start_service "GoSellr" %GOSELLR_PORT% %GOSELLR_URL% %GOSELLR_FOLDER%
) else if "%1"=="all" (
    echo Starting all services...
    call :start_service "Home Page" %HOME_PORT% %HOME_URL% %HOME_FOLDER%
    timeout /t 2 /nobreak >nul
    call :start_service "Admin Panel" %ADMIN_PORT% %ADMIN_URL% %ADMIN_FOLDER%
    timeout /t 2 /nobreak >nul
    call :start_service "Development Portal" %DEV_PORTAL_PORT% %DEV_PORTAL_URL% %DEV_PORTAL_FOLDER%
    timeout /t 2 /nobreak >nul
    call :start_service "GoSellr" %GOSELLR_PORT% %GOSELLR_URL% %GOSELLR_FOLDER%
) else (
    echo Usage: %0 [home^|admin^|dev-portal^|gosellr^|all]
    echo.
    echo Examples:
    echo   %0 home        - Start Home Page on port 3000
    echo   %0 admin       - Start Admin Panel on port 5000
    echo   %0 dev-portal  - Start Development Portal on port 8080
    echo   %0 gosellr     - Start GoSellr on port 4000
    echo   %0 all         - Start all services
)

echo.
echo 🎉 Services launched successfully!
echo Press any key to exit...
pause >nul 