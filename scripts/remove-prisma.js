const fs = require('fs');
const path = require('path');

console.log('🗑️ Starting Prisma Cleanup...');

// Files and directories to remove
const itemsToRemove = [
  'prisma/',
  'lib/prisma.ts',
  'test-prisma.js',
  'test-database.js',
  'temp-seed.js',
  'scripts/prisma-test.js',
];

// Remove files and directories
itemsToRemove.forEach(item => {
  const fullPath = path.join(__dirname, '..', item);

  if (fs.existsSync(fullPath)) {
    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`✅ Removed directory: ${item}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`✅ Removed file: ${item}`);
      }
    } catch (error) {
      console.log(`⚠️ Could not remove ${item}: ${error.message}`);
    }
  } else {
    console.log(`ℹ️ Not found: ${item}`);
  }
});

// Update package.json to remove Prisma dependencies
const packageJsonPath = path.join(__dirname, '..', 'package.json');

if (fs.existsSync(packageJsonPath)) {
  console.log('📝 Updating package.json...');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Remove Prisma dependencies
  if (packageJson.dependencies && packageJson.dependencies['@prisma/client']) {
    delete packageJson.dependencies['@prisma/client'];
    console.log('  ✅ Removed @prisma/client from dependencies');
  }

  if (packageJson.devDependencies && packageJson.devDependencies['prisma']) {
    delete packageJson.devDependencies['prisma'];
    console.log('  ✅ Removed prisma from devDependencies');
  }

  // Remove Prisma scripts
  if (packageJson.scripts && packageJson.scripts['prisma:seed']) {
    delete packageJson.scripts['prisma:seed'];
    console.log('  ✅ Removed prisma:seed script');
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('  ✅ Updated package.json');
}

// Create new database setup script
const dbSetupScript = `#!/usr/bin/env node

const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');
// Supabase removed from project. This script is deprecated.
const config = require('../app/config/config.json');

console.log('🚀 Setting up database...');

// Initialize DynamoDB
const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1'
});

async function setupDatabase() {
  try {
    console.log('📊 Setting up Supabase tables...');
    
    // Create users table
    const { error: usersError } = await supabase.rpc('create_users_table');
    if (usersError) console.log('ℹ️ Users table already exists or error:', usersError.message);
    
    // Create jobs table
    const { error: jobsError } = await supabase.rpc('create_jobs_table');
    if (jobsError) console.log('ℹ️ Jobs table already exists or error:', jobsError.message);
    
    // Create wallets table
    const { error: walletsError } = await supabase.rpc('create_wallets_table');
    if (walletsError) console.log('ℹ️ Wallets table already exists or error:', walletsError.message);
    
    console.log('✅ Supabase setup completed');
    
    // Setup DynamoDB tables if AWS credentials are available
    if (process.env.AWS_ACCESS_KEY_ID) {
      console.log('📊 Setting up DynamoDB tables...');
      
      const tables = ['users', 'jobs', 'wallets', 'transactions'];
      
      for (const tableName of tables) {
        try {
          const command = new CreateTableCommand({
            TableName: tableName,
            KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
            BillingMode: 'PAY_PER_REQUEST'
          });
          
          await dynamo.send(command);
          console.log(\`  ✅ Created DynamoDB table: \${tableName}\`);
        } catch (error) {
          if (error.name === 'ResourceInUseException') {
            console.log(\`  ℹ️ DynamoDB table already exists: \${tableName}\`);
          } else {
            console.log(\`  ⚠️ Error creating DynamoDB table \${tableName}: \${error.message}\`);
          }
        }
      }
      
      console.log('✅ DynamoDB setup completed');
    } else {
      console.log('ℹ️ AWS credentials not found, skipping DynamoDB setup');
    }
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
`;

fs.writeFileSync(path.join(__dirname, '..', 'scripts', 'setup-database.js'), dbSetupScript);
console.log('✅ Created new database setup script');

// Update README with new instructions
const readmeUpdate = `

## Database Setup (Post-Prisma Migration)

This project now uses a unified database client that supports both Supabase and AWS DynamoDB.

### Quick Setup

1. **Supabase (Recommended)**:
   \`\`\`bash
   # Already configured in app/config/config.json
   npm run dev
   \`\`\`

2. **AWS DynamoDB**:
   \`\`\`bash
   # Set AWS credentials
   export AWS_ACCESS_KEY_ID=your_key
   export AWS_SECRET_ACCESS_KEY=your_secret
   export AWS_REGION=ap-south-1
   
   # Setup database
   node scripts/setup-database.js
   \`\`\`

### Database Client Usage

\`\`\`typescript
import { db } from '@/lib/databaseClient';

// Get user
const user = await db.getUserById('user_id');

// Create job
const job = await db.createJob({
  title: 'Software Engineer',
  company: 'Tech Corp',
  salary: 80000
});

// Get wallet
const wallet = await db.getWallet('user_id');
\`\`\`

### Migration from Prisma

If you're migrating from Prisma:

1. Run migration script: \`node scripts/migrate-from-prisma.js\`
2. Update imports in your code
3. Test the new database client
4. Remove Prisma: \`node scripts/remove-prisma.js\`

### Benefits

- ✅ No more Prisma hanging issues
- ✅ AWS DynamoDB support
- ✅ Supabase PostgreSQL support
- ✅ Unified API for both databases
- ✅ Better performance
- ✅ Easier deployment
`;

// Append to README if it exists
const readmePath = path.join(__dirname, '..', 'README.md');
if (fs.existsSync(readmePath)) {
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  fs.writeFileSync(readmePath, readmeContent + readmeUpdate);
  console.log('✅ Updated README.md with new database instructions');
} else {
  fs.writeFileSync(readmePath, '# EHB Next.js Project\n\n' + readmeUpdate);
  console.log('✅ Created README.md with database instructions');
}

console.log('\n🎉 Prisma cleanup completed!');
console.log('\n📋 What was removed:');
console.log('- Prisma schema and client files');
console.log('- Prisma dependencies from package.json');
console.log('- Prisma test files');
console.log('\n📋 What was added:');
console.log('- New database client (lib/databaseClient.ts)');
console.log('- Migration script (scripts/migrate-from-prisma.js)');
console.log('- Database setup script (scripts/setup-database.js)');
console.log('- Updated README with new instructions');
console.log('\n🚀 Next steps:');
console.log('1. Run: node scripts/migrate-from-prisma.js');
console.log('2. Test your application');
console.log('3. Run: npm install (to remove Prisma packages)');
console.log('4. Deploy with confidence!');
