@echo off
REM Auto-start EHB Auto Agent on Windows startup
cd /d "F:\ehb next.js 04"
start "EHB Auto Agent" node scripts\ehb-auto-agent.js
REM You can create a shortcut to this file and place it in the Startup folder (shell:startup) 