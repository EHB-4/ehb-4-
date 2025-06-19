const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create .env.local
const envContent = `NEXTAUTH_URL=http://localhost:5500
NEXTAUTH_SECRET=ehb-super-secret-key-2024
DATABASE_URL="mongodb://localhost:27017/ehb-nextjs-04"
NEXT_PUBLIC_API_URL=http://localhost:5500`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ Created .env.local');

// Update Prisma schema
const schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String
  email         String    @unique
  password      String?
  role          String    @default("user")
  sqlLevel      Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}`;

fs.writeFileSync('prisma/schema.prisma', schemaContent);
console.log('✅ Updated Prisma schema');

// Generate Prisma client
execSync('npx prisma generate', { stdio: 'inherit' });
console.log('✅ Generated Prisma client');

// Kill port if in use
try {
  execSync('npx kill-port 5500', { stdio: 'inherit' });
  console.log('✅ Cleared port 5500');
} catch (error) {
  console.log('ℹ️ Port 5500 was not in use');
}

// Start server
console.log('🚀 Starting server...');
execSync('npm run dev:5500', {
  stdio: 'inherit',
  detached: true,
});

console.log(`
✅ Setup complete! 

📝 Postman Setup:
1. URL: http://localhost:5500/api/auth/callback/credentials
2. Method: POST
3. Headers: Content-Type: application/json
4. Body: 
{
    "email": "test@ehb.com",
    "password": "123456"
}

To restart server: npm run dev:5500
`);
