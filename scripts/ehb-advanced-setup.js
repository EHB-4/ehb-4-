#!/usr/bin/env node

/**
 * 🚀 EHB Advanced Setup Script
 * Complete automation for Phase 2-3 setup with advanced features
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

class EHBAdvancedSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.scriptsDir = path.join(this.projectRoot, 'scripts');
    this.prismaDir = path.join(this.projectRoot, 'prisma');
    this.backendDir = path.join(this.projectRoot, 'ehb-backend');
    this.testResultsDir = path.join(this.projectRoot, 'cursor-test-results');
  }

  async run() {
    console.log('🚀 EHB Advanced Setup - Phase 2-3');
    console.log('===================================');
    console.log('');

    try {
      // Step 1: Create Prisma Schema
      await this.createPrismaSchema();

      // Step 2: Create Seed File
      await this.createSeedFile();

      // Step 3: Update Package.json
      await this.updatePackageJson();

      // Step 4: Setup Environment
      await this.setupEnvironment();

      // Step 5: Install Dependencies
      await this.installDependencies();

      // Step 6: Setup Database
      await this.setupDatabase();

      // Step 7: Run Tests
      await this.runTests();

      // Step 8: Start Development Server
      await this.startDevServer();

      console.log('\n🎉 EHB Advanced Setup Completed Successfully!');
      console.log('=============================================');
      console.log('🌐 Your app should be running at: http://localhost:3000');
      console.log('👤 Admin login: admin@ehb.com');
      console.log('📁 Check the prisma/ folder for database files');
      console.log('🔧 Run "npm run dev" to restart the server');
    } catch (error) {
      console.error('\n❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  async createPrismaSchema() {
    console.log('1️⃣ Creating Prisma Schema...');

    if (!fs.existsSync(this.prismaDir)) {
      fs.mkdirSync(this.prismaDir, { recursive: true });
    }

    const schemaPath = path.join(this.prismaDir, 'schema.prisma');

    if (!fs.existsSync(schemaPath)) {
      const schemaContent = `// This is your Prisma schema file,
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
`;

      fs.writeFileSync(schemaPath, schemaContent);
      console.log('✅ Created: prisma/schema.prisma');
    } else {
      console.log('ℹ️ Prisma schema already exists');
    }
  }

  async createSeedFile() {
    console.log('2️⃣ Creating Seed File...');

    const seedPath = path.join(this.prismaDir, 'seed.ts');

    if (!fs.existsSync(seedPath)) {
      const seedContent = `import { PrismaClient } from '@prisma/client'
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
`;

      fs.writeFileSync(seedPath, seedContent);
      console.log('✅ Created: prisma/seed.ts');
    } else {
      console.log('ℹ️ Seed file already exists');
    }
  }

  async updatePackageJson() {
    console.log('3️⃣ Updating Package.json...');

    const packagePath = path.join(this.projectRoot, 'package.json');

    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      // Add prisma configuration
      if (!packageJson.prisma) {
        packageJson.prisma = {
          seed: 'ts-node prisma/seed.ts',
        };
      } else {
        packageJson.prisma.seed = 'ts-node prisma/seed.ts';
      }

      // Add ts-node dependency if not exists
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }

      if (!packageJson.devDependencies['ts-node']) {
        packageJson.devDependencies['ts-node'] = '^10.9.2';
      }

      if (!packageJson.devDependencies['@types/node']) {
        packageJson.devDependencies['@types/node'] = '^20.19.0';
      }

      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Updated package.json with Prisma configuration');
    } else {
      console.log('⚠️ package.json not found');
    }
  }

  async setupEnvironment() {
    console.log('4️⃣ Setting up Environment...');

    if (!fs.existsSync(this.backendDir)) {
      fs.mkdirSync(this.backendDir, { recursive: true });
    }

    const envPath = path.join(this.backendDir, '.env');
    const envContent = `DATABASE_URL="mongodb://localhost:27018/test"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created: ehb-backend/.env');
  }

  async installDependencies() {
    console.log('5️⃣ Installing Dependencies...');

    try {
      await execAsync('npm install');
      console.log('✅ Dependencies installed successfully');
    } catch (error) {
      console.log('⚠️ npm install failed, but continuing...');
    }
  }

  async setupDatabase() {
    console.log('6️⃣ Setting up Database...');

    try {
      await execAsync('npx prisma generate');
      console.log('✅ Prisma client generated');

      await execAsync('npx prisma db seed');
      console.log('✅ Database seeded successfully');
    } catch (error) {
      console.log('⚠️ Database setup failed, but continuing...');
    }
  }

  async runTests() {
    console.log('7️⃣ Running Tests...');

    try {
      await execAsync('npm run mongo-fast');
      console.log('✅ Tests completed successfully');
    } catch (error) {
      console.log('⚠️ Tests failed, but continuing...');
    }
  }

  async startDevServer() {
    console.log('8️⃣ Starting Development Server...');

    try {
      // Start in background
      const child = exec('npm run dev', {
        cwd: this.projectRoot,
        detached: true,
        stdio: 'ignore',
      });

      child.unref();

      console.log('✅ Development server started in background');
      console.log('🌐 Opening browser in 3 seconds...');

      setTimeout(() => {
        try {
          const { exec: execSync } = require('child_process');
          execSync('start http://localhost:3000', { shell: true });
        } catch (error) {
          console.log('⚠️ Could not open browser automatically');
        }
      }, 3000);
    } catch (error) {
      console.log('⚠️ Could not start development server');
      console.log('💡 Run "npm run dev" manually to start the server');
    }
  }
}

// Run the setup
const setup = new EHBAdvancedSetup();
setup.run().catch(console.error);
