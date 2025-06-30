# EHB Auto System Guide

## Overview
The EHB Auto System automatically manages all EHB services and ensures continuous development.

## Features
- Auto-start services
- Port management
- Service dependency checking
- Auto file creation
- Continuous development

## Usage
```bash
node scripts/ehb-auto-system.js start-all
node scripts/ehb-auto-system.js status
```

## Auto Startup
To enable auto startup on PC boot:
1. Copy `scripts/ehb-auto-startup.bat` to Windows Startup folder
2. Or use Task Scheduler to run on boot

## Port Ranges
- 3001-3003: Management Services
- 4001-4007: Core Services  
- 5001-5007: Financial Services
- 7000+: Auto-assigned

Last Updated: 2025-06-29T15:46:06.936Z
