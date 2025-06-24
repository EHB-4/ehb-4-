# Voice Control for Cursor IDE - PowerShell Launcher
Write-Host "🎤 Starting Voice Control for Cursor IDE..." -ForegroundColor Green
Write-Host ""
Write-Host "📋 Available Commands:" -ForegroundColor Cyan
Write-Host "- File: new file, save file, open file, close file" -ForegroundColor White
Write-Host "- Edit: copy, paste, cut, undo, redo, select all" -ForegroundColor White
Write-Host "- Navigation: go to line, find, replace, next tab, previous tab" -ForegroundColor White
Write-Host "- AI: ask ai, explain code, optimize code, fix errors, generate test" -ForegroundColor White
Write-Host "- Git: commit, push, pull, status" -ForegroundColor White
Write-Host "- Terminal: open terminal, run command" -ForegroundColor White
Write-Host "- Cursor: cursor chat, cursor explain, cursor refactor, cursor debug" -ForegroundColor White
Write-Host "- Control: stop listening" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Make sure Cursor IDE is open and focused!" -ForegroundColor Yellow
Write-Host ""

# Check if Python is available
try {
    python --version | Out-Null
    Write-Host "✅ Python found" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if required packages are installed
Write-Host "🔍 Checking required packages..." -ForegroundColor Yellow
$required_packages = @("speech_recognition", "keyboard", "pyautogui", "openai-whisper")

foreach ($package in $required_packages) {
    try {
        python -c "import $package" 2>$null
        Write-Host "✅ $package found" -ForegroundColor Green
    } catch {
        Write-Host "❌ $package not found. Installing..." -ForegroundColor Yellow
        pip install $package
    }
}

Write-Host ""
Write-Host "🚀 Starting voice control..." -ForegroundColor Green
python scripts/voice-control-cursor.py

Read-Host "Press Enter to exit"
