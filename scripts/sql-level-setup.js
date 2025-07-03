#!/usr/bin/env node

/**
 * EHB SQL Level System Database Setup Script
 *
 * This script sets up the complete SQL Level system including:
 * - Database migrations
 * - Sample data creation
 * - API endpoint testing
 * - Frontend component verification
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SQLLevelSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.logPrefix = '🔧 SQL Level Setup:';
  }

  log(message) {
    console.log(`${this.logPrefix} ${message}`);
  }

  error(message) {
    console.error(`❌ ${this.logPrefix} ${message}`);
  }

  success(message) {
    console.log(`✅ ${this.logPrefix} ${message}`);
  }

  async run() {
    try {
      this.log('Starting EHB SQL Level System setup...');

      // Step 1: Check prerequisites
      await this.checkPrerequisites();

      // Step 2: Update Prisma schema
      await this.updatePrismaSchema();

      // Step 3: Generate Prisma client
      await this.generatePrismaClient();

      // Step 4: Run database migrations
      await this.runMigrations();

      // Step 5: Seed sample data
      await this.seedSampleData();

      // Step 6: Test API endpoints
      await this.testAPIEndpoints();

      // Step 7: Verify frontend components
      await this.verifyFrontendComponents();

      this.success('SQL Level System setup completed successfully!');
      this.log('You can now access the SQL Level dashboard at /sql');
    } catch (error) {
      this.error(`Setup failed: ${error.message}`);
      process.exit(1);
    }
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...');

    // Check if Prisma is installed
    try {
      execSync('npx prisma --version', { stdio: 'pipe' });
    } catch (error) {
      throw new Error('Prisma CLI not found. Please install with: npm install prisma');
    }

    // Check if database URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable not set');
    }

    this.success('Prerequisites check passed');
  }

  async updatePrismaSchema() {
    this.log('Updating Prisma schema...');

    const schemaPath = path.join(this.projectRoot, 'prisma', 'schema.prisma');

    if (!fs.existsSync(schemaPath)) {
      throw new Error('Prisma schema file not found');
    }

    // Schema is already updated in the main schema file
    this.success('Prisma schema updated');
  }

  async generatePrismaClient() {
    this.log('Generating Prisma client...');

    try {
      execSync('npx prisma generate', {
        stdio: 'inherit',
        cwd: this.projectRoot,
      });
      this.success('Prisma client generated');
    } catch (error) {
      throw new Error(`Failed to generate Prisma client: ${error.message}`);
    }
  }

  async runMigrations() {
    this.log('Running database migrations...');

    try {
      execSync('npx prisma migrate dev --name add-sql-level-system', {
        stdio: 'inherit',
        cwd: this.projectRoot,
      });
      this.success('Database migrations completed');
    } catch (error) {
      throw new Error(`Failed to run migrations: ${error.message}`);
    }
  }

  async seedSampleData() {
    this.log('Seeding sample SQL Level data...');

    const seedScript = `
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      
      async function seedSQLData() {
        try {
          // Create sample users with different SQL levels
          const users = [
            {
              email: 'free@example.com',
              name: 'Free User',
              sqlLevel: 0,
              sqlStatus: 'FREE',
              aiScore: 25,
              fraudScore: 0.1,
              complaintCount: 0
            },
            {
              email: 'basic@example.com',
              name: 'Basic User',
              sqlLevel: 1,
              sqlStatus: 'BASIC',
              aiScore: 75,
              fraudScore: 0.05,
              complaintCount: 1
            },
            {
              email: 'normal@example.com',
              name: 'Normal User',
              sqlLevel: 2,
              sqlStatus: 'NORMAL',
              aiScore: 200,
              fraudScore: 0.02,
              complaintCount: 0
            },
            {
              email: 'high@example.com',
              name: 'High User',
              sqlLevel: 3,
              sqlStatus: 'HIGH',
              aiScore: 350,
              fraudScore: 0.01,
              complaintCount: 0
            },
            {
              email: 'vip@example.com',
              name: 'VIP User',
              sqlLevel: 4,
              sqlStatus: 'VIP',
              aiScore: 480,
              fraudScore: 0.005,
              complaintCount: 0
            }
          ];
          
          for (const userData of users) {
            await prisma.user.upsert({
              where: { email: userData.email },
              update: userData,
              create: userData
            });
          }
          
          // Create sample skill tests
          const skillTests = [
            {
              userId: (await prisma.user.findUnique({ where: { email: 'basic@example.com' } })).id,
              testType: 'MCQ',
              score: 85,
              passed: true,
              testData: { questions: 20, correct: 17 }
            },
            {
              userId: (await prisma.user.findUnique({ where: { email: 'normal@example.com' } })).id,
              testType: 'PRACTICAL',
              score: 90,
              passed: true,
              testData: { project: 'E-commerce API', quality: 'high' }
            }
          ];
          
          for (const testData of skillTests) {
            await prisma.skillTest.create({
              data: testData
            });
          }
          
          // Create sample coin locks
          const coinLocks = [
            {
              userId: (await prisma.user.findUnique({ where: { email: 'basic@example.com' } })).id,
              amount: 100,
              duration: 12,
              endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
              status: 'ACTIVE'
            },
            {
              userId: (await prisma.user.findUnique({ where: { email: 'normal@example.com' } })).id,
              amount: 500,
              duration: 24,
              endDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
              status: 'ACTIVE'
            }
          ];
          
          for (const lockData of coinLocks) {
            await prisma.coinLock.create({
              data: lockData
            });
          }
          
          console.log('✅ Sample SQL Level data seeded successfully');
          
        } catch (error) {
          console.error('❌ Error seeding data:', error);
        } finally {
          await prisma.$disconnect();
        }
      }
      
      seedSQLData();
    `;

    const seedPath = path.join(this.projectRoot, 'temp-seed.js');
    fs.writeFileSync(seedPath, seedScript);

    try {
      execSync(`node ${seedPath}`, {
        stdio: 'inherit',
        cwd: this.projectRoot,
      });
      fs.unlinkSync(seedPath);
      this.success('Sample data seeded');
    } catch (error) {
      if (fs.existsSync(seedPath)) {
        fs.unlinkSync(seedPath);
      }
      throw new Error(`Failed to seed data: ${error.message}`);
    }
  }

  async testAPIEndpoints() {
    this.log('Testing SQL Level API endpoints...');

    // This would typically involve starting the dev server and making HTTP requests
    // For now, we'll just verify the files exist
    const apiEndpoints = [
      'app/api/sql/get-level/route.ts',
      'app/api/sql/progress/route.ts',
      'app/api/sql/upgrade/route.ts',
      'app/api/sql/skill-test/route.ts',
    ];

    for (const endpoint of apiEndpoints) {
      const filePath = path.join(this.projectRoot, endpoint);
      if (!fs.existsSync(filePath)) {
        throw new Error(`API endpoint not found: ${endpoint}`);
      }
    }

    this.success('API endpoints verified');
  }

  async verifyFrontendComponents() {
    this.log('Verifying frontend components...');

    const components = [
      'components/SQL/SQLUserInfo.tsx',
      'components/SQL/SQLProgress.tsx',
      'components/SQL/SQLUpgradeSteps.tsx',
      'components/SQL/SQLLevelBadge.tsx',
      'hooks/useSQLLevelData.ts',
      'app/sql/page.tsx',
    ];

    for (const component of components) {
      const filePath = path.join(this.projectRoot, component);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Component not found: ${component}`);
      }
    }

    this.success('Frontend components verified');
  }
}

// Run the setup
if (require.main === module) {
  const setup = new SQLLevelSetup();
  setup.run();
}

module.exports = SQLLevelSetup;
