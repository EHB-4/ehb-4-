@echo off
title EHB Force Auto-Push
color 0C

echo.
echo ========================================
echo    EHB Force Auto-Push System
echo ========================================
echo.
echo WARNING: This will bypass pre-commit hooks!
echo.

:force_push_loop
echo [%date% %time%] Checking for changes...

REM Add all changes
git add .

REM Check if there are changes
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo [%date% %time%] No changes to commit
    goto :wait
)

REM Force commit (bypass hooks)
git commit --no-verify -m "Force auto-push: %date% %time%"
if %errorlevel% neq 0 (
    echo [%date% %time%] Error: Failed to commit
    goto :wait
)

REM Push to remote
git push origin main
if %errorlevel% neq 0 (
    echo [%date% %time%] Error: Failed to push
    goto :wait
)

echo [%date% %time%] Force auto-push completed successfully!

:wait
echo [%date% %time%] Waiting 2 minutes before next check...
echo Press Ctrl+C to stop
echo.
timeout /t 120 /nobreak >nul
goto :force_push_loop 