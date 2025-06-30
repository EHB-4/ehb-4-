@echo off
title EHB Master Auto Start & Server Scripts

start "" powershell -ExecutionPolicy Bypass -File "scripts\start-dev-server.ps1"
start "" powershell -ExecutionPolicy Bypass -File "scripts\auto-start-dev-server.ps1"
start "" "scripts\start-ehb-server.bat"
start "" node "scripts\auto-startup-system.cjs"
start "" bash "scripts/start-auto-system.sh"
start "" "scripts\start-auto-system.bat"
start "" node "scripts\permanent-server.js"
start "" node "scripts\background-server.js"
start "" node "scripts\24-7-server.js"
start "" node "scripts\auto-browser-launcher.js"
start "" node "scripts\auto-page-opener.cjs"
start "" node "scripts\open-emo-page.js"
start "" node "scripts\open-all-services.js"
start "" node "scripts\ehb-live-launcher.cjs"
start "" node "scripts\live-monitor.js"
start "" node "scripts\live-monitor.cjs"
echo All auto start & server scripts launched!
exit 