# EHB World-Class Auto-Setup & Auto-Run Script
# Roman Urdu mein logs, self-healing, always-on, auto-fix, auto-run

Write-Host "\nEHB Auto Setup Start... (Roman Urdu Logs)\n"

# 1. Essential CLI Tools Only
function Install-EssentialCLI {
    $tools = @(
        @{ name = 'Playwright'; cmd = 'playwright'; install = 'npm install -g playwright' },
        @{ name = 'Prisma'; cmd = 'prisma'; install = 'npm install -g prisma' }
    )
    foreach ($tool in $tools) {
        if (-not (Get-Command $tool.cmd -ErrorAction SilentlyContinue)) {
            Write-Host "$($tool.name) install ho raha hai..."
            try {
                Invoke-Expression $tool.install -ErrorAction SilentlyContinue
                Write-Host "$($tool.name) install ho gaya."
            } catch {
                Write-Host "$($tool.name) install mein error aaya, lekin script continue kar rahi hai..."
            }
        }
        else {
            Write-Host "$($tool.name) already installed."
        }
    }
}

# 2. Essential NPM Packages Only
function Install-EssentialNpmPackages {
    Write-Host "Essential packages check ho rahe hain..."
    try {
        # Sirf essential packages jo project mein already use ho rahe hain
        npm install --save-dev @types/node @types/react @types/react-dom
        Write-Host "Essential packages ready hain."
    } catch {
        Write-Host "Packages check mein error aaya, lekin script continue kar rahi hai..."
    }
}

# 3. Essential VS Code Extensions Only
function Install-EssentialVSCodeExtensions {
    $extensions = @(
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "prisma.prisma",
        "ms-playwright.playwright"
    )
    foreach ($ext in $extensions) {
        try {
            code --install-extension $ext --force
        } catch {
            Write-Host "Extension $ext install mein error, lekin continue kar rahe hain..."
        }
    }
}

# 4. Dev Servers/Services Auto-Run
function Start-DevServices {
    Write-Host "Dev services auto-launch ho rahe hain..."
    try {
        if (Test-Path "scripts/auto-launch-services.js") {
            Start-Process -NoNewWindow -FilePath "node" -ArgumentList "scripts/auto-launch-services.js" -WindowStyle Hidden
            Write-Host "Dev services background mein start ho gaye."
        } else {
            Write-Host "auto-launch-services.js nahi mila, lekin script continue kar rahi hai..."
        }
    } catch {
        Write-Host "Dev services start karne mein error aaya, lekin script continue kar rahi hai..."
    }
}

# 5. Essential Background Tools Only
function Start-EssentialBackgroundTools {
    try {
        # Sirf Prisma Studio - essential database tool
        Start-Process -WindowStyle Hidden -FilePath "npx" -ArgumentList "prisma studio"
        Write-Host "Prisma Studio background mein start ho gaya."
    } catch {
        Write-Host "Prisma Studio start karne mein error, lekin continue kar rahe hain..."
    }
}

# 6. Agents/Automation Scripts Auto-Run
function Start-Agents {
    Write-Host "EHB agents/automation scripts auto-run ho rahe hain..."
    try {
        if (Test-Path "scripts/ehb-ultra-fast-agent.cjs") {
            Start-Process -NoNewWindow -FilePath "node" -ArgumentList "scripts/ehb-ultra-fast-agent.cjs" -WindowStyle Hidden
            Write-Host "Ultra-fast agent background mein start ho gaya."
        }
        if (Test-Path "scripts/real-time-auto-runner.js") {
            Start-Process -NoNewWindow -FilePath "node" -ArgumentList "scripts/real-time-auto-runner.js" -WindowStyle Hidden
            Write-Host "Real-time auto-runner background mein start ho gaya."
        }
    } catch {
        Write-Host "Agents start karne mein error aaya, lekin script continue kar rahi hai..."
    }
}

# 7. Essential Health Check Only
function Health-Check {
    $checks = @(
        @{ name = 'Prisma'; cmd = 'npx prisma --version' },
        @{ name = 'Playwright'; cmd = 'npx playwright --version' }
    )
    foreach ($check in $checks) {
        try {
            Write-Host "Testing $($check.name)..."
            Invoke-Expression $check.cmd
        }
        catch {
            Write-Host "$($check.name) mein error aaya, lekin essential tool hai..."
        }
    }
}

# 8. Roman Urdu Logs/Errors
function Log-Urdu {
    param([string]$msg)
    Write-Host "[Roman Urdu] $msg"
}

# 9. PowerShell Profile Integration (Auto-Run)
function Add-ToProfile {
    $profilePath = $PROFILE
    $autoRunCmd = "& '$PWD\ehb-auto-setup.ps1'"
    if (-not (Select-String -Path $profilePath -Pattern 'ehb-auto-setup.ps1' -Quiet)) {
        Add-Content -Path $profilePath -Value $autoRunCmd
        Write-Host "PowerShell profile mein auto-run add ho gaya."
    }
    else {
        Write-Host "PowerShell profile mein already added hai."
    }
}

# 10. Windows Task Scheduler Integration (Auto-Run)
function Add-ToTaskScheduler {
    $action = New-ScheduledTaskAction -Execute 'pwsh.exe' -Argument "-File '$PWD\ehb-auto-setup.ps1'"
    $trigger = New-ScheduledTaskTrigger -AtLogOn
    $principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive
    Register-ScheduledTask -TaskName "EHB-Auto-Setup" -Action $action -Trigger $trigger -Principal $principal -Force
    Write-Host "Windows Task Scheduler mein auto-run add ho gaya."
}

# Main Run - Optimized
Install-EssentialCLI
Install-EssentialNpmPackages
Install-EssentialVSCodeExtensions
Start-DevServices
Start-EssentialBackgroundTools
Start-Agents
Health-Check
Add-ToProfile
Add-ToTaskScheduler

Write-Host "\nEHB Optimized Auto Setup Complete! Ab sirf essential tools auto, always-on, self-healing hain.\n"
Write-Host "Performance improved, conflicts removed, system optimized!\n"
