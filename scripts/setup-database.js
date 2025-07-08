#!/usr/bin/env node

const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

console.log('🚀 Setting up database...');

// Initialize DynamoDB
const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
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
    if (walletsError)
      console.log('ℹ️ Wallets table already exists or error:', walletsError.message);

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
            BillingMode: 'PAY_PER_REQUEST',
          });

          await dynamo.send(command);
          console.log(`  ✅ Created DynamoDB table: ${tableName}`);
        } catch (error) {
          if (error.name === 'ResourceInUseException') {
            console.log(`  ℹ️ DynamoDB table already exists: ${tableName}`);
          } else {
            console.log(`  ⚠️ Error creating DynamoDB table ${tableName}: ${error.message}`);
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
