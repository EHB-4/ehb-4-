# Auto CLI Manager Script for Windows PowerShell
# Author: AI Agent (EHB Next.js 04)
# Purpose: CLI tool (task-master-ai) ko auto install, update, local install, PATH set, aliases, aur config files generate karna

# 1. Node.js check
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js install nahi hai. Pehle Node.js install karein." -ForegroundColor Red
    exit 1
}

# 2. Global CLI install/update
$cliName = "task-master-ai"
$cliCheck = npm list -g $cliName --depth=0 2>&1
if ($cliCheck -notmatch $cliName) {
    Write-Host "$cliName install nahi hai. Installing globally..." -ForegroundColor Yellow
    npm install -g $cliName
} else {
    Write-Host "$cliName already installed hai. Updating..." -ForegroundColor Green
    npm update -g $cliName
}

# 3. Local install
if (-not (Test-Path "./node_modules/$cliName")) {
    Write-Host "$cliName project ke andar install nahi hai. Installing locally..." -ForegroundColor Yellow
    npm install --save-dev $cliName
}

# 4. PATH set (current session)
$globalNpmBin = (npm bin -g).Trim()
if ($env:PATH -notlike "*$globalNpmBin*") {
    $env:PATH += ";$globalNpmBin"
    Write-Host "Global npm bin PATH set for this session." -ForegroundColor Cyan
}

# 5. Aliases (PowerShell profile)
$profilePath = $PROFILE
$aliasLine = "Set-Alias tm task-master-ai"
if (-not (Test-Path $profilePath)) {
    New-Item -ItemType File -Path $profilePath -Force | Out-Null
}
if (-not (Select-String -Path $profilePath -Pattern "Set-Alias tm task-master-ai" -Quiet)) {
    Add-Content -Path $profilePath -Value $aliasLine
    Write-Host "Alias 'tm' add kar diya PowerShell profile mein." -ForegroundColor Cyan
}

# 6. .env file
if (-not (Test-Path ".env")) {
    Write-Host ".env file missing hai. Creating default .env..." -ForegroundColor Yellow
    Set-Content -Path ".env" -Value "NODE_ENV=development`n"
}

# 7. .taskmaster/config.json
if (-not (Test-Path ".taskmaster/config.json")) {
    Write-Host "Taskmaster config.json missing hai. Creating default config..." -ForegroundColor Yellow
    if (-not (Test-Path ".taskmaster")) {
        New-Item -ItemType Directory -Force -Path ".taskmaster" | Out-Null
    }
    Set-Content -Path ".taskmaster/config.json" -Value "{}"
}

Write-Host "\n[Auto CLI setup complete] Ab aap CLI commands direct chala sakte hain. Sab kuch auto-manage ho gaya hai!" -ForegroundColor Green

# --- Windows Startup Integration ---
# Script ko startup par run karne ke liye shortcut bana kar Startup folder mein daalna
$scriptPath = (Resolve-Path $MyInvocation.MyCommand.Path).Path
$WshShell = New-Object -ComObject WScript.Shell
$startupFolder = [Environment]::GetFolderPath('Startup')
$shortcutPath = Join-Path $startupFolder "auto-cli-manager.lnk"

if (-not (Test-Path $shortcutPath)) {
    $shortcut = $WshShell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = "pwsh.exe"
    $shortcut.Arguments = "-File `"$scriptPath`""
    $shortcut.WorkingDirectory = (Get-Location).Path
    $shortcut.WindowStyle = 1
    $shortcut.Description = "Auto CLI Manager for EHB Next.js 04"
    $shortcut.Save()
    Write-Host "Windows Startup folder mein shortcut add kar diya gaya hai. Ab yeh script har Windows boot par auto-run hogi." -ForegroundColor Yellow
} else {
    Write-Host "Startup shortcut already maujood hai. Script har Windows boot par auto-run hogi." -ForegroundColor Yellow
} 
{
    "projectName": "ehb-next-js-04",
    "mainModel": "gpt-4",
    "researchModel": "gpt-4",
    "fallbackModel": "gpt-3.5-turbo",
    "global": {
      "defaultTag": "master"
    }
  }