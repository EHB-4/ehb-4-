@echo off
title EHB Master Auto Command & Batch Scripts

start "" node "scripts\auto-command-runner.js"
start "" "scripts\auto-commands.bat"
start "" powershell -ExecutionPolicy Bypass -File "scripts\auto-commands.ps1"
start "" node "scripts\auto-run-master.js"
start "" node "scripts\auto-dev.js"
start "" "scripts\auto-dev.bat"
start "" node "scripts\auto-start.cjs"
start "" node "scripts\auto-start.js"
start "" node "scripts\auto-startup.js"
start "" "scripts\start-auto-push.bat"
start "" powershell -ExecutionPolicy Bypass -File "scripts\start-auto-push.ps1"
start "" node "scripts\start-auto-push.js"
start "" node "scripts\ai-monitor.js"
start "" node "scripts\ai-deploy.js"
start "" node "scripts\ai-review.js"
start "" node "scripts\ai-setup.js"
start "" node "scripts\ai-test-generator.js"
echo All auto command & batch scripts launched!
exit 