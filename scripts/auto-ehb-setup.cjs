const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class EHBAutoSetup {
  constructor() {
    this.rootDir = process.cwd();
  }

  createEnvFile() {
    console.log('📝 Creating .env.local file...');
    const envContent = `NEXTAUTH_URL=http://localhost:5500
NEXTAUTH_SECRET=ehb-super-secret-key-2024
DATABASE_URL="mongodb://localhost:27017/ehb-nextjs-04"
NEXT_PUBLIC_API_URL=http://localhost:5500`;

    fs.writeFileSync(path.join(this.rootDir, '.env.local'), envContent);
    console.log('✅ .env.local created successfully');
  }

  async setupPrisma() {
    console.log('🔄 Setting up Prisma...');

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

    fs.writeFileSync(path.join(this.rootDir, 'prisma', 'schema.prisma'), schemaContent);
    console.log('✅ Prisma schema created');

    try {
      execSync('npx prisma generate', { stdio: 'inherit' });
      console.log('✅ Prisma client generated');
    } catch (error) {
      console.error('❌ Error generating Prisma client:', error);
      throw error;
    }
  }

  killPort(port) {
    try {
      execSync(`npx kill-port ${port}`, { stdio: 'inherit' });
      console.log(`✅ Port ${port} cleared`);
    } catch (error) {
      console.log(`ℹ️ Port ${port} was not in use`);
    }
  }

  async checkServerHealth(port) {
    console.log(`🔍 Checking server health on port ${port}...`);

    return new Promise(resolve => {
      const checkInterval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:${port}/api/auth/signin`);
          if (response.ok) {
            clearInterval(checkInterval);
            console.log('✅ Server is healthy and responding');
            resolve(true);
          }
        } catch (error) {
          console.log('⏳ Waiting for server to become ready...');
        }
      }, 1000);

      // Timeout after 30 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        console.log('⚠️ Server health check timed out');
        resolve(false);
      }, 30000);
    });
  }

  async run() {
    console.log('🚀 Starting EHB Auto Setup...');

    try {
      // Create necessary files
      this.createEnvFile();
      await this.setupPrisma();

      // Clear port and start server
      this.killPort(5500);

      console.log('🌐 Starting server...');
      const serverProcess = execSync('npm run dev:5500', {
        stdio: 'inherit',
        detached: true,
      });

      // Check server health
      const isHealthy = await this.checkServerHealth(5500);

      if (isHealthy) {
        console.log(`
🎉 Setup Complete! 
Server is running at http://localhost:5500

📝 Postman Setup Instructions:
1. Create new POST request to: http://localhost:5500/api/auth/callback/credentials
2. Set Content-Type header to: application/json
3. Add this JSON body:
   {
       "email": "test@ehb.com",
       "password": "123456"
   }
4. Send request

To stop the server: npx kill-port 5500
To restart: npm run dev:5500
                `);
      } else {
        console.log('❌ Server failed to start properly');
      }
    } catch (error) {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    }
  }
}

// Run the setup
const setup = new EHBAutoSetup();
setup.run();
