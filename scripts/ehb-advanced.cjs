const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function advancedSetup() {
  console.log('🚀 EHB Advanced Setup - Phase 2-3');
  console.log('===================================');
  console.log('');

  try {
    // 1. Create Prisma Schema
    console.log('1️⃣ Creating Prisma Schema...');
    if (!fs.existsSync('prisma')) {
      fs.mkdirSync('prisma', { recursive: true });
    }

    const schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String?
  email String? @unique
  role  String @default("user")
}
`;

    fs.writeFileSync('prisma/schema.prisma', schemaContent);
    console.log('✅ Created: prisma/schema.prisma');

    // 2. Create Environment
    console.log('2️⃣ Setting up Environment...');
    const envContent = `DATABASE_URL="mongodb://localhost:27018/test"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
`;

    if (!fs.existsSync('ehb-backend')) {
      fs.mkdirSync('ehb-backend', { recursive: true });
    }
    fs.writeFileSync('ehb-backend/.env', envContent);
    console.log('✅ Created: ehb-backend/.env');

    // 3. Run MongoDB Test
    console.log('3️⃣ Running MongoDB Test...');
    await execAsync('npm run mongo-fast');
    console.log('✅ MongoDB test completed');

    // 4. Generate Prisma Client
    console.log('4️⃣ Generating Prisma Client...');
    await execAsync('npx prisma generate');
    console.log('✅ Prisma client generated');

    console.log('\n🎉 EHB Advanced Setup Completed!');
    console.log('🌐 Your app is ready at: http://localhost:3000');
    console.log('🔧 Run "npm run dev" to start the server');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

advancedSetup();
