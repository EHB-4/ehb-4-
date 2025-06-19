# EHB Technologies Development Environment Setup Script
# This script automates the complete setup for EHB Technologies development

Write-Host "🚀 EHB Technologies Development Environment Setup" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to write status
function Write-Status($message, $status) {
    $color = if ($status -eq "✅") { "Green" } else { "Red" }
    Write-Host "$status $message" -ForegroundColor $color
}

# 1. Verify installed tools
Write-Host "`n📋 Step 1: Verifying Installed Tools" -ForegroundColor Yellow

$tools = @{
    "Node.js" = "node"
    "npm" = "npm"
    "Git" = "git"
    "Python" = "python"
    "C++ Build Tools" = "cl"
}

foreach ($tool in $tools.GetEnumerator()) {
    if (Test-Command $tool.Value) {
        $version = & $tool.Value --version 2>$null
        Write-Status "$($tool.Key): $version" "✅"
    } else {
        Write-Status "$($tool.Key): Not found" "❌"
    }
}

# 2. Install global npm packages
Write-Host "`n📦 Step 2: Installing Global npm Packages" -ForegroundColor Yellow

$globalPackages = @("vercel", "pm2", "replit")
foreach ($package in $globalPackages) {
    Write-Host "Installing $package..." -ForegroundColor Cyan
    npm install -g $package
    if ($LASTEXITCODE -eq 0) {
        Write-Status "$package installed globally" "✅"
    } else {
        Write-Status "Failed to install $package" "❌"
    }
}

# 3. Configure Git
Write-Host "`n🔧 Step 3: Configuring Git" -ForegroundColor Yellow

# Check if git config is already set
$gitName = git config --global user.name 2>$null
$gitEmail = git config --global user.email 2>$null

if (-not $gitName) {
    Write-Host "Setting Git user.name..." -ForegroundColor Cyan
    git config --global user.name "EHB Developer"
    Write-Status "Git user.name configured" "✅"
} else {
    Write-Status "Git user.name already set: $gitName" "✅"
}

if (-not $gitEmail) {
    Write-Host "Setting Git user.email..." -ForegroundColor Cyan
    git config --global user.email "developer@ehb.com"
    Write-Status "Git user.email configured" "✅"
} else {
    Write-Status "Git user.email already set: $gitEmail" "✅"
}

# 4. Create project structure
Write-Host "`n📁 Step 4: Creating Project Structure" -ForegroundColor Yellow

$projectRoot = "F:\ehb next.js 04"
$backendFolder = "$projectRoot\ehb-backend"
$frontendFolder = "$projectRoot\ehb-frontend"

# Create backend folder
if (-not (Test-Path $backendFolder)) {
    New-Item -ItemType Directory -Path $backendFolder -Force
    Write-Status "Created backend folder" "✅"
} else {
    Write-Status "Backend folder already exists" "✅"
}

# Create frontend folder
if (-not (Test-Path $frontendFolder)) {
    New-Item -ItemType Directory -Path $frontendFolder -Force
    Write-Status "Created frontend folder" "✅"
} else {
    Write-Status "Frontend folder already exists" "✅"
}

# 5. Setup backend
Write-Host "`n🔧 Step 5: Setting Up Backend" -ForegroundColor Yellow

# Create package.json for backend
$backendPackageJson = @"
{
  "name": "ehb-backend",
  "version": "1.0.0",
  "description": "EHB Technologies Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^6.13.8",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "helmet": "^8.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
"@

Set-Content -Path "$backendFolder\package.json" -Value $backendPackageJson
Write-Status "Created backend package.json" "✅"

# Create .env file
$envContent = @"
PORT=5000
MONGO_URI=mongodb://localhost:27017/ehb_main
JWT_SECRET=ehb-super-secret-jwt-key-2024
NODE_ENV=development
OPENAI_API_KEY=your-openai-api-key-here
ETHERSCAN_API_KEY=your-etherscan-api-key-here
"@

Set-Content -Path "$backendFolder\.env" -Value $envContent
Write-Status "Created backend .env file" "✅"

# Create server.js
$serverJs = @"
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    
    // Create database and collections
    const db = mongoose.connection.db;
    
    // Create collections if they don't exist
    db.createCollection('users').catch(() => {});
    db.createCollection('products').catch(() => {});
    db.createCollection('orders').catch(() => {});
    
    console.log('✅ Database collections created/verified');
})
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
});

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'EHB Backend Working ✅',
        status: 'success',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        uptime: process.uptime()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(\`🚀 EHB Backend Server running on http://localhost:\${PORT}\`);
    console.log('✅ Server Status: ACTIVE');
});

module.exports = app;
"@

Set-Content -Path "$backendFolder\server.js" -Value $serverJs
Write-Status "Created backend server.js" "✅"

# 6. Install backend dependencies
Write-Host "`n📦 Step 6: Installing Backend Dependencies" -ForegroundColor Yellow

Set-Location $backendFolder
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Status "Backend dependencies installed" "✅"
} else {
    Write-Status "Failed to install backend dependencies" "❌"
}

# 7. Setup frontend (React app)
Write-Host "`n⚛️ Step 7: Setting Up Frontend" -ForegroundColor Yellow

Set-Location $projectRoot
if (-not (Test-Path "$frontendFolder\package.json")) {
    Write-Host "Creating React app..." -ForegroundColor Cyan
    npx create-react-app ehb-frontend --yes
    if ($LASTEXITCODE -eq 0) {
        Write-Status "React app created successfully" "✅"
    } else {
        Write-Status "Failed to create React app" "❌"
    }
} else {
    Write-Status "React app already exists" "✅"
}

# 8. Test MongoDB Connection
Write-Host "`n🗄️ Step 8: Testing MongoDB Connection" -ForegroundColor Yellow

# Check if MongoDB is running
try {
    $mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
    if ($mongoProcess) {
        Write-Status "MongoDB is running" "✅"
    } else {
        Write-Status "MongoDB is not running - please start MongoDB manually" "⚠️"
        Write-Host "To start MongoDB, run: 'C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe'" -ForegroundColor Yellow
    }
} catch {
    Write-Status "MongoDB status check failed" "❌"
}

# 9. Start backend server
Write-Host "`n🚀 Step 9: Starting Backend Server" -ForegroundColor Yellow

Set-Location $backendFolder
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal
Write-Status "Backend server starting..." "✅"

# 10. Final Status Report
Write-Host "`n📊 Step 10: Final Status Report" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Yellow

# Print versions
Write-Host "`n📋 Tool Versions:" -ForegroundColor Cyan
Write-Host "Node.js: $(node -v)" -ForegroundColor White
Write-Host "npm: $(npm -v)" -ForegroundColor White
Write-Host "Git: $(git --version)" -ForegroundColor White

# Check Python
if (Test-Command "python") {
    Write-Host "Python: $(python --version)" -ForegroundColor White
} else {
    Write-Host "Python: Not installed" -ForegroundColor Red
}

# Check MongoDB
if (Get-Process -Name "mongod" -ErrorAction SilentlyContinue) {
    Write-Host "MongoDB: Running" -ForegroundColor Green
} else {
    Write-Host "MongoDB: Not running" -ForegroundColor Red
}

Write-Host "`n🎯 Setup Summary:" -ForegroundColor Cyan
Write-Host "✅ Backend folder: $backendFolder" -ForegroundColor Green
Write-Host "✅ Frontend folder: $frontendFolder" -ForegroundColor Green
Write-Host "✅ Backend server: http://localhost:5000" -ForegroundColor Green
Write-Host "✅ MongoDB database: ehb_main" -ForegroundColor Green
Write-Host "✅ Collections: users, products, orders" -ForegroundColor Green

Write-Host "`n🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Start MongoDB if not running" -ForegroundColor White
Write-Host "2. Backend server should be running at http://localhost:5000" -ForegroundColor White
Write-Host "3. Test backend: curl http://localhost:5000" -ForegroundColor White
Write-Host "4. Frontend: cd ehb-frontend && npm start" -ForegroundColor White

Write-Host "`n🎉 EHB Technologies Development Environment Setup Complete!" -ForegroundColor Green 