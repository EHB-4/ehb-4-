@echo off
echo 🎤 Starting Voice Control for Cursor IDE...
echo.
echo 📋 Available Commands:
echo - File: new file, save file, open file, close file
echo - Edit: copy, paste, cut, undo, redo, select all
echo - Navigation: go to line, find, replace, next tab, previous tab
echo - AI: ask ai, explain code, optimize code, fix errors, generate test
echo - Git: commit, push, pull, status
echo - Terminal: open terminal, run command
echo - Cursor: cursor chat, cursor explain, cursor refactor, cursor debug
echo - Control: stop listening
echo.
echo 🎯 Make sure Cursor IDE is open and focused!
echo.
python scripts/voice-control-cursor.py
pause
