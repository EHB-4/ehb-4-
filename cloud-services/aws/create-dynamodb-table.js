const {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
} = require('@aws-sdk/client-dynamodb');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env.aws' });

async function createTable(tableName) {
  try {
    // Initialize DynamoDB client
    const dynamo = new DynamoDBClient({
      region: process.env.AWS_REGION || 'ap-south-1',
    });

    // First check if table exists
    try {
      const describeCommand = new DescribeTableCommand({
        TableName: tableName,
      });
      await dynamo.send(describeCommand);
      console.log('ℹ️ Table already exists:', tableName);
      return;
    } catch (error) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
      }
    }

    // Define table structure
    const tableParams = {
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH', // Partition key
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
      Tags: [
        {
          Key: 'Environment',
          Value: 'test',
        },
      ],
    };

    // Create table
    const command = new CreateTableCommand(tableParams);
    const result = await dynamo.send(command);
    console.log('✅ Created DynamoDB table:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Error creating DynamoDB table:', error.message);
    console.error('❌ Error details:', {
      tableName,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId:
          process.env.AWS_ACCESS_KEY_ID.substring(0, 4) +
          '...' +
          process.env.AWS_ACCESS_KEY_ID.slice(-4),
        region: process.env.AWS_REGION,
      },
    });
    throw error;
  }
}

// Run the table creation
const tableName = process.env.AWS_DYNAMODB_TABLE || 'ehb-test-table';
createTable(tableName).catch(console.error);
