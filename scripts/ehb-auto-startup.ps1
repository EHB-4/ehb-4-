# EHB Auto Startup Script
# Roman Urdu: Yeh script Windows Startup folder mein shortcut add karti hai taake jab bhi PC on ho, auto sync system start ho jaye

$TargetPath = "$PSScriptRoot\\..\\node_modules\\.bin\\node.exe"
$ScriptPath = "$PSScriptRoot\\ehb-auto-sync.js"
$ShortcutPath = "$env:APPDATA\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\EHB-AutoSync.lnk"

$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetPath
$Shortcut.Arguments = $ScriptPath
$Shortcut.WorkingDirectory = "$PSScriptRoot"
$Shortcut.Save()

Write-Host 'EHB AutoSync Startup Shortcut Ban Gaya! (Roman Urdu)' 