# EHB Project Health Check & Auto Fix Script
# Windows PowerShell

Write-Host "--- EHB Health Check & Auto Fix Start ---"

# System Resource Health Check
Write-Host "Checking system resources..."
$disk = Get-PSDrive -Name C
$ram = Get-WmiObject Win32_OperatingSystem | Select-Object FreePhysicalMemory,TotalVisibleMemorySize
$cpu = Get-WmiObject Win32_Processor | Select-Object LoadPercentage

Write-Host ("Disk Free: {0:N2} GB / {1:N2} GB" -f ($disk.Free/1GB), ($disk.Used+$disk.Free)/1GB)
Write-Host ("RAM Free: {0:N2} GB / {1:N2} GB" -f ($ram.FreePhysicalMemory/1MB), ($ram.TotalVisibleMemorySize/1MB))
Write-Host ("CPU Load: {0}%" -f $cpu.LoadPercentage)

if (($disk.Free/1GB) -lt 5) { Write-Warning "⚠️  Low disk space! (C: < 5GB free)" }
if (($ram.FreePhysicalMemory/1MB) -lt 1) { Write-Warning "⚠️  Low RAM! (< 1GB free)" }
if ($cpu.LoadPercentage -gt 90) { Write-Warning "⚠️  High CPU usage! (> 90%)" }

# 1. Kill all node/npm/next processes
Write-Host "Killing all node, npm, next processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process npm -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process next -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Clean npm cache
Write-Host "Cleaning npm cache..."
npm cache clean --force

# 3. Remove node_modules and lockfile
Write-Host "Removing node_modules and package-lock.json..."
Remove-Item -Recurse -Force node_modules,package-lock.json

# 4. Reinstall dependencies
Write-Host "Reinstalling dependencies..."
npm install

# 5. Check for Tailwind/PostCSS plugin
Write-Host "Checking Tailwind/PostCSS plugin..."
npm install -D @tailwindcss/postcss

# 6. Update postcss.config.js (if needed)
$postcssConfig = @'
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
'@
Set-Content -Path "postcss.config.js" -Value $postcssConfig

# 7. Start Next.js dev server
Write-Host "Starting Next.js dev server..."
Start-Process "npx" "next dev"

Write-Host "--- EHB Health Check & Auto Fix Complete ---" 