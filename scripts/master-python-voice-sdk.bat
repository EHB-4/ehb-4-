@echo off
title EHB Master Python, Voice, SDK Scripts

start "" python "scripts\generate-sdks.py"
start "" python "scripts\ehb-sdk-generator.py"
start "" python "scripts\ehb-service-discovery.py"
start "" python "scripts\simple-voice.py"
start "" python "scripts\voice-runner.py"
start "" python "scripts\test-voice.py"
start "" powershell -ExecutionPolicy Bypass -File "scripts\start-voice-control.ps1"
start "" "scripts\start-voice-control.bat"
start "" python "scripts\voice-control-cursor.py"
echo All python, voice, sdk scripts launched!
exit 