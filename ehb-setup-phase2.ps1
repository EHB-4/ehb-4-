# 📁 EHB Project Setup Phase 2 - Advanced Configuration
# 👉 Cursor AI Ready Script - Auto Schema + Seed + Dev Server

Write-Host "🚀 Starting EHB Setup Phase 2..." -ForegroundColor Green

# Step 1: Create Prisma Directory if not exists
$prismaDir = "prisma"
if (!(Test-Path $prismaDir)) {
    Write-Host "📁 Creating prisma directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $prismaDir -Force | Out-Null
}

# Step 2: Create/Update Prisma Schema
$schemaFile = "prisma/schema.prisma"
$schemaContent = @'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  role          UserRole  @default(USER)
  isActive      Boolean   @default(true)
  
  // EHB specific fields
  phone         String?
  address       String?
  city          String?
  state         String?
  zipCode       String?
  country       String?
  
  // Referral system
  referralCode  String?   @unique
  referredBy    String?   @db.ObjectId
  referralCount Int       @default(0)
  
  // Business fields
  businessName  String?
  businessType  String?
  taxId         String?
  
  // Financial fields
  balance       Float     @default(0)
  totalEarnings Float     @default(0)
  totalSpent    Float     @default(0)
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Service {
  id          String        @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String?
  category    String
  price       Float
  duration    Int           // in minutes
  isActive    Boolean       @default(true)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  // Relationships
  bookings    Booking[]
  providerId  String        @db.ObjectId
  provider    User          @relation(fields: [providerId], references: [id])
}

model Booking {
  id          String        @id @default(auto()) @map("_id") @db.ObjectId
  serviceId   String        @db.ObjectId
  service     Service       @relation(fields: [serviceId], references: [id])
  customerId  String        @db.ObjectId
  customer    User          @relation(fields: [customerId], references: [id])
  providerId  String        @db.ObjectId
  provider    User          @relation(fields: [providerId], references: [id])
  date        DateTime
  startTime   String
  endTime     String
  status      BookingStatus @default(PENDING)
  totalAmount Float
  notes       String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Transaction {
  id          String            @id @default(auto()) @map("_id") @db.ObjectId
  userId      String            @db.ObjectId
  user        User              @relation(fields: [userId], references: [id])
  type        TransactionType
  amount      Float
  description String?
  status      TransactionStatus @default(PENDING)
  bookingId   String?           @db.ObjectId
  booking     Booking?          @relation(fields: [bookingId], references: [id])
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

model Notification {
  id        String             @id @default(auto()) @map("_id") @db.ObjectId
  userId    String             @db.ObjectId
  user      User               @relation(fields: [userId], references: [id])
  title     String
  message   String
  type      NotificationType
  isRead    Boolean            @default(false)
  createdAt DateTime           @default(now())
}

// Enums
enum UserRole {
  USER
  PROVIDER
  ADMIN
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
  NO_SHOW
}

enum TransactionType {
  PAYMENT
  REFUND
  COMMISSION
  WITHDRAWAL
  DEPOSIT
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}

enum NotificationType {
  BOOKING
  PAYMENT
  SYSTEM
  PROMOTION
}
'@

if (!(Test-Path $schemaFile)) {
    Write-Host "📝 Creating Prisma schema file..." -ForegroundColor Yellow
    Set-Content -Path $schemaFile -Value $schemaContent
    Write-Host "✅ Prisma schema created successfully!" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Prisma schema already exists" -ForegroundColor Cyan
}

# Step 3: Create Seed File
$seedFile = "prisma/seed.ts"
$seedContent = @'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ehb.com' },
    update: {},
    create: {
      email: 'admin@ehb.com',
      name: 'Admin User',
      role: 'ADMIN',
      referralCode: 'ADMIN001',
      phone: '+1234567890',
      address: '123 Admin Street',
      city: 'Admin City',
      state: 'AS',
      zipCode: '12345',
      country: 'USA',
      businessName: 'EHB Admin',
      businessType: 'Platform',
      taxId: 'ADMIN123456',
    },
  })

  // Create sample provider
  const providerUser = await prisma.user.upsert({
    where: { email: 'provider@ehb.com' },
    update: {},
    create: {
      email: 'provider@ehb.com',
      name: 'John Provider',
      role: 'PROVIDER',
      referralCode: 'PROV001',
      phone: '+1234567891',
      address: '456 Provider Ave',
      city: 'Provider City',
      state: 'PS',
      zipCode: '67890',
      country: 'USA',
      businessName: 'Provider Services',
      businessType: 'Service Provider',
      taxId: 'PROV123456',
    },
  })

  // Create sample customer
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@ehb.com' },
    update: {},
    create: {
      email: 'customer@ehb.com',
      name: 'Jane Customer',
      role: 'USER',
      referralCode: 'CUST001',
      phone: '+1234567892',
      address: '789 Customer Blvd',
      city: 'Customer City',
      state: 'CS',
      zipCode: '11111',
      country: 'USA',
    },
  })

  // Create sample services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service1' },
      update: {},
      create: {
        id: 'service1',
        name: 'House Cleaning',
        description: 'Professional house cleaning service',
        category: 'Cleaning',
        price: 80.00,
        duration: 120,
        providerId: providerUser.id,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service2' },
      update: {},
      create: {
        id: 'service2',
        name: 'Lawn Maintenance',
        description: 'Complete lawn care and maintenance',
        category: 'Landscaping',
        price: 60.00,
        duration: 90,
        providerId: providerUser.id,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service3' },
      update: {},
      create: {
        id: 'service3',
        name: 'Plumbing Repair',
        description: 'Emergency plumbing services',
        category: 'Plumbing',
        price: 120.00,
        duration: 60,
        providerId: providerUser.id,
      },
    }),
  ])

  // Create sample booking
  const booking = await prisma.booking.upsert({
    where: { id: 'booking1' },
    update: {},
    create: {
      id: 'booking1',
      serviceId: services[0].id,
      customerId: customerUser.id,
      providerId: providerUser.id,
      date: new Date('2024-01-15'),
      startTime: '09:00',
      endTime: '11:00',
      status: 'CONFIRMED',
      totalAmount: 80.00,
      notes: 'Please bring cleaning supplies',
    },
  })

  // Create sample transaction
  const transaction = await prisma.transaction.upsert({
    where: { id: 'trans1' },
    update: {},
    create: {
      id: 'trans1',
      userId: customerUser.id,
      type: 'PAYMENT',
      amount: 80.00,
      description: 'Payment for House Cleaning service',
      status: 'COMPLETED',
      bookingId: booking.id,
    },
  })

  // Create sample notification
  const notification = await prisma.notification.upsert({
    where: { id: 'notif1' },
    update: {},
    create: {
      id: 'notif1',
      userId: customerUser.id,
      title: 'Booking Confirmed',
      message: 'Your house cleaning appointment has been confirmed for January 15th, 2024.',
      type: 'BOOKING',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👥 Created users:', { admin: adminUser.email, provider: providerUser.email, customer: customerUser.email })
  console.log('🔧 Created services:', services.length)
  console.log('📅 Created booking:', booking.id)
  console.log('💰 Created transaction:', transaction.id)
  console.log('🔔 Created notification:', notification.id)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
'@

if (!(Test-Path $seedFile)) {
    Write-Host "📝 Creating seed file..." -ForegroundColor Yellow
    Set-Content -Path $seedFile -Value $seedContent
    Write-Host "✅ Seed file created successfully!" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Seed file already exists" -ForegroundColor Cyan
}

# Step 4: Update package.json to include seed script
$packageJsonPath = "package.json"
if (Test-Path $packageJsonPath) {
    Write-Host "📦 Updating package.json with seed script..." -ForegroundColor Yellow
    $packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
    
    if (-not $packageJson.scripts.prisma) {
        $packageJson.scripts | Add-Member -MemberType NoteProperty -Name "prisma" -Value "prisma"
    }
    
    if (-not $packageJson.prisma) {
        $packageJson | Add-Member -MemberType NoteProperty -Name "prisma" -Value @{
            seed = "ts-node prisma/seed.ts"
        }
    } else {
        $packageJson.prisma.seed = "ts-node prisma/seed.ts"
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath
    Write-Host "✅ Package.json updated with seed configuration!" -ForegroundColor Green
}

# Step 5: Install additional dependencies if needed
Write-Host "📦 Installing additional dependencies..." -ForegroundColor Cyan
npm install ts-node @types/node --save-dev

# Step 6: Regenerate Prisma client with new schema
Write-Host "🔄 Regenerating Prisma client with new schema..." -ForegroundColor Cyan
npx prisma generate

# Step 7: Push updated schema and seed
Write-Host "📤 Pushing updated schema to database..." -ForegroundColor Cyan
npx prisma db push

Write-Host "🌱 Seeding database with sample data..." -ForegroundColor Cyan
npx prisma db seed

# Step 8: Start development server
Write-Host "`n🚀 Starting development server..." -ForegroundColor Green
Write-Host "📱 Your EHB app will be available at: http://localhost:5500" -ForegroundColor Cyan
Write-Host "🔑 Admin login: admin@ehb.com" -ForegroundColor Yellow
Write-Host "👤 Provider login: provider@ehb.com" -ForegroundColor Yellow
Write-Host "👥 Customer login: customer@ehb.com" -ForegroundColor Yellow

# Start the development server
npm run dev 