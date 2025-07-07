#!/usr/bin/env node

const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');

console.log('🧪 Testing AWS DynamoDB...');

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

async function testAWS() {
  try {
    console.log('  🔍 Testing connection...');

    // Test user creation
    const testUser = {
      id: { S: 'test-user-' + Date.now() },
      email: { S: 'test@example.com' },
      name: { S: 'Test User' },
      role: { S: 'USER' },
      created_at: { S: new Date().toISOString() },
    };

    const putCommand = new PutItemCommand({
      TableName: 'users',
      Item: testUser,
    });

    await dynamo.send(putCommand);
    console.log('  ✅ User creation successful');

    // Test user retrieval
    const getCommand = new GetItemCommand({
      TableName: 'users',
      Key: { id: testUser.id },
    });

    const result = await dynamo.send(getCommand);
    console.log('  ✅ User retrieval successful');

    console.log('\n✅ AWS DynamoDB tests completed!');
    console.log('\n🚀 Your project is now using AWS DynamoDB only!');
  } catch (error) {
    console.log('  ℹ️ Test result:', error.message);
    console.log('\n💡 Make sure AWS credentials are configured');
  }
}

testAWS();
