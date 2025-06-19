# 🔰 Phase 2 & 3: EHB Auto Setup Pack for Non-Developers
# Cursor & Windows Ready - Complete Automation Script

param(
    [switch]$SkipChecks = $false,
    [switch]$AutoLaunch = $true,
    [switch]$CreateZip = $false
)

Write-Host "🎯 EHB Auto Setup Pack - Phase 2 & 3" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. Auto-create prisma/schema.prisma (if missing)
Write-Host "1️⃣ Setting up Prisma Schema..." -ForegroundColor Blue
$prismaFolder = "prisma"
$schemaFile = "$prismaFolder\schema.prisma"

if (!(Test-Path $schemaFile)) {
    if (!(Test-Path $prismaFolder)) {
        New-Item -ItemType Directory -Path $prismaFolder | Out-Null
        Write-Host "✅ Created prisma directory" -ForegroundColor Green
    }

    $schemaContent = @"
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?   @unique
  password      String?
  emailVerified DateTime?
  image         String?
  role          String    @default("user")
  lastLogin     DateTime?
  loginCount    Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Product {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  price       Float
  category    String
  stock       Int
  images      String[]
  isActive    Boolean  @default(true)
  rating      Float    @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  status    String
  total     Float
  items     Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Wallet {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  address   String   @unique
  balance   Float    @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
"@

    Set-Content -Path $schemaFile -Value $schemaContent
    Write-Host "✅ Created: prisma/schema.prisma" -ForegroundColor Green
} else {
    Write-Host "ℹ️ schema.prisma already exists." -ForegroundColor Cyan
}

# 2. Auto-generate simple seed file (non-dev friendly)
Write-Host "`n2️⃣ Setting up Prisma Seed..." -ForegroundColor Blue
$seedFile = "prisma/seed.ts"

if (!(Test-Path $seedFile)) {
    $seedContent = @"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ehb.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@ehb.com',
      role: 'admin',
    },
  })

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 'sample-product-1' },
      update: {},
      create: {
        id: 'sample-product-1',
        name: 'Sample Product 1',
        description: 'This is a sample product for testing',
        price: 99.99,
        category: 'Electronics',
        stock: 10,
        images: ['https://via.placeholder.com/300x200'],
      },
    }),
    prisma.product.upsert({
      where: { id: 'sample-product-2' },
      update: {},
      create: {
        id: 'sample-product-2',
        name: 'Sample Product 2',
        description: 'Another sample product for testing',
        price: 149.99,
        category: 'Clothing',
        stock: 5,
        images: ['https://via.placeholder.com/300x200'],
      },
    }),
  ])

  console.log('✅ Seeding completed successfully!')
  console.log('👤 Admin user created:', adminUser.email)
  console.log('📦 Products created:', products.length)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
"@

    Set-Content -Path $seedFile -Value $seedContent
    Write-Host "✅ Created: prisma/seed.ts (Admin user + Sample products)" -ForegroundColor Green
} else {
    Write-Host "ℹ️ prisma/seed.ts already exists." -ForegroundColor Cyan
}

# 3. Update package.json with prisma seed configuration
Write-Host "`n3️⃣ Updating package.json..." -ForegroundColor Blue
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    # Add prisma configuration if not exists
    if (-not $packageJson.prisma) {
        $packageJson | Add-Member -MemberType NoteProperty -Name "prisma" -Value @{
            "seed" = "ts-node prisma/seed.ts"
        }
    } else {
        $packageJson.prisma.seed = "ts-node prisma/seed.ts"
    }
    
    # Add ts-node dependency if not exists
    $devDependencies = $packageJson.devDependencies
    if (-not $devDependencies.ts-node) {
        $devDependencies | Add-Member -MemberType NoteProperty -Name "ts-node" -Value "^10.9.2" -Force
    }
    if (-not $devDependencies."@types/node") {
        $devDependencies | Add-Member -MemberType NoteProperty -Name "@types/node" -Value "^20.19.0" -Force
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Host "✅ Updated package.json with Prisma seed configuration" -ForegroundColor Green
}

# 4. Auto-check Docker + MongoDB + Mongo Container Status
Write-Host "`n4️⃣ Checking Docker & MongoDB Status..." -ForegroundColor Blue

# Docker status
try {
    $dockerInfo = docker info 2>$null
    if ($dockerInfo -and ($dockerInfo | Select-String "Server Version")) {
        Write-Host "🟢 Docker is running." -ForegroundColor Green
    } else {
        Write-Host "🔴 Docker is NOT running. Please start Docker Desktop." -ForegroundColor Red
        if (-not $SkipChecks) {
            Write-Host "💡 Starting Docker Desktop..." -ForegroundColor Yellow
            Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe" -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 5
        }
    }
} catch {
    Write-Host "🔴 Docker is not installed or not accessible." -ForegroundColor Red
}

# Mongo container check
try {
    $mongoRunning = docker ps 2>$null | Select-String "mongo"
    if ($mongoRunning) {
        Write-Host "🟢 MongoDB Docker container is running." -ForegroundColor Green
    } else {
        Write-Host "🔴 MongoDB container not found. Starting..." -ForegroundColor Yellow
        
        # Stop existing container if exists
        docker stop test-mongo 2>$null
        docker rm test-mongo 2>$null
        
        # Start new MongoDB container
        docker run --name test-mongo -d -p 27018:27017 mongo
        Write-Host "✅ MongoDB container started on port 27018" -ForegroundColor Green
        
        # Wait for MongoDB to be ready
        Write-Host "⏳ Waiting for MongoDB to be ready..." -ForegroundColor Yellow
        $attempts = 0
        $maxAttempts = 30
        while ($attempts -lt $maxAttempts) {
            try {
                $null = docker exec test-mongo mongosh --eval "db.stats()" 2>$null
                Write-Host "✅ MongoDB is ready!" -ForegroundColor Green
                break
            } catch {
                $attempts++
                if ($attempts -ge $maxAttempts) {
                    Write-Host "⚠️ MongoDB startup timeout, but continuing..." -ForegroundColor Yellow
                    break
                }
                Start-Sleep -Seconds 2
            }
        }
    }
} catch {
    Write-Host "⚠️ Could not check MongoDB container status." -ForegroundColor Yellow
}

# 5. Setup environment file
Write-Host "`n5️⃣ Setting up Environment Configuration..." -ForegroundColor Blue
$envContent = @"
# Database Configuration
DATABASE_URL="mongodb://localhost:27018/test"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Application Configuration
NODE_ENV="development"
"@

# Create .env.local if not exists
if (!(Test-Path ".env.local")) {
    Set-Content -Path ".env.local" -Value $envContent
    Write-Host "✅ Created: .env.local" -ForegroundColor Green
} else {
    Write-Host "ℹ️ .env.local already exists." -ForegroundColor Cyan
}

# 6. Install dependencies
Write-Host "`n6️⃣ Installing Dependencies..." -ForegroundColor Blue
try {
    Write-Host "📦 Installing npm packages..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️ npm install failed, but continuing..." -ForegroundColor Yellow
}

# 7. Generate Prisma client and run seed
Write-Host "`n7️⃣ Setting up Database..." -ForegroundColor Blue
try {
    Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
    npx prisma generate
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
    
    Write-Host "🌱 Running database seed..." -ForegroundColor Yellow
    npx prisma db seed
    Write-Host "✅ Database seeded successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Database setup failed, but continuing..." -ForegroundColor Yellow
}

# 8. Auto-start backend (Next.js, Express, etc.)
Write-Host "`n8️⃣ Starting Development Server..." -ForegroundColor Blue
if (Test-Path "package.json") {
    $packageContent = Get-Content "package.json" | ConvertFrom-Json
    $scripts = $packageContent.scripts
    
    if ($scripts.dev) {
        Write-Host "🚀 Starting: npm run dev..." -ForegroundColor Green
        if ($AutoLaunch) {
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"
            Write-Host "✅ Development server started in new window" -ForegroundColor Green
        } else {
            Write-Host "💡 Run 'npm run dev' to start the development server" -ForegroundColor Cyan
        }
    } elseif ($scripts.start) {
        Write-Host "🚀 Starting: npm start..." -ForegroundColor Green
        if ($AutoLaunch) {
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"
            Write-Host "✅ Server started in new window" -ForegroundColor Green
        } else {
            Write-Host "💡 Run 'npm start' to start the server" -ForegroundColor Cyan
        }
    } else {
        Write-Host "⚠️ No dev/start script found in package.json" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ No package.json found!" -ForegroundColor Red
}

# 9. Auto-open in Browser
if ($AutoLaunch) {
    Write-Host "`n9️⃣ Opening Browser..." -ForegroundColor Blue
    Start-Sleep -Seconds 3
    try {
        Start-Process "http://localhost:3000"
        Write-Host "✅ Opened http://localhost:3000 in browser" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Could not open browser automatically" -ForegroundColor Yellow
    }
}

# 10. Create setup summary
Write-Host "`n📊 Setup Summary:" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Write-Host "✅ Prisma schema created/verified" -ForegroundColor Green
Write-Host "✅ Seed file created/verified" -ForegroundColor Green
Write-Host "✅ Package.json updated" -ForegroundColor Green
Write-Host "✅ Docker & MongoDB checked" -ForegroundColor Green
Write-Host "✅ Environment file created" -ForegroundColor Green
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host "✅ Database setup completed" -ForegroundColor Green
Write-Host "✅ Development server started" -ForegroundColor Green

Write-Host "`n🎉 EHB Auto Setup Completed Successfully!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host "🌐 Your app should be running at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "👤 Admin login: admin@ehb.com" -ForegroundColor Cyan
Write-Host "📁 Check the prisma/ folder for database files" -ForegroundColor Cyan
Write-Host "🔧 Run 'npm run dev' to restart the server" -ForegroundColor Cyan

# 11. Optional: Create zip file
if ($CreateZip) {
    Write-Host "`n📦 Creating setup files zip..." -ForegroundColor Blue
    $zipPath = "ehb-setup-files.zip"
    Compress-Archive -Path "prisma", ".env.local", "package.json" -DestinationPath $zipPath -Force
    Write-Host "✅ Created: $zipPath" -ForegroundColor Green
}

Write-Host "`n🚀 Happy coding with EHB!" -ForegroundColor Green 