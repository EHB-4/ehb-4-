#!/usr/bin/env node

const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

console.log('🚀 Setting up AWS DynamoDB...');

// Initialize DynamoDB
const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

async function setupAWSDatabase() {
  try {
    console.log('📊 Setting up DynamoDB tables...');

    const tables = [
      {
        name: 'users',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      },
      {
        name: 'jobs',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      },
      {
        name: 'wallets',
        keySchema: [{ AttributeName: 'user_id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'user_id', AttributeType: 'S' }],
      },
      {
        name: 'transactions',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      },
      {
        name: 'products',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      },
    ];

    for (const table of tables) {
      try {
        const command = new CreateTableCommand({
          TableName: table.name,
          KeySchema: table.keySchema,
          AttributeDefinitions: table.attributeDefinitions,
          BillingMode: 'PAY_PER_REQUEST',
        });

        await dynamo.send(command);
        console.log(`  ✅ Created DynamoDB table: ${table.name}`);
      } catch (error) {
        if (error.name === 'ResourceInUseException') {
          console.log(`  ℹ️ DynamoDB table already exists: ${table.name}`);
        } else {
          console.log(`  ⚠️ Error creating DynamoDB table ${table.name}: ${error.message}`);
        }
      }
    }

    console.log('✅ AWS DynamoDB setup completed!');
  } catch (error) {
    console.error('❌ AWS setup failed:', error.message);
    process.exit(1);
  }
}

setupAWSDatabase();
