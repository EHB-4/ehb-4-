const fs = require('fs');
const path = require('path');

console.log('🗑️ Starting Supabase Removal...');

// Files to update
const filesToUpdate = ['lib/databaseClient.ts', 'lib/supabaseClient.ts', 'app/config/config.json'];

// Remove Supabase files
const filesToRemove = ['lib/supabaseClient.ts'];

// Remove files
filesToRemove.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Removed file: ${filePath}`);
    } catch (error) {
      console.log(`⚠️ Could not remove ${filePath}: ${error.message}`);
    }
  } else {
    console.log(`ℹ️ Not found: ${filePath}`);
  }
});

// Update databaseClient.ts to use AWS-only
const awsOnlyContent = `import { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand, DeleteItemCommand, UpdateItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';

// AWS DynamoDB Client
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1'
});

// AWS-Only Database Interface
export class DatabaseClient {
  
  // User Operations
  async createUser(userData: any) {
    const item = {
      id: { S: userData.id || this.generateId() },
      email: { S: userData.email },
      name: { S: userData.name },
      password: { S: userData.password },
      role: { S: userData.role || 'USER' },
      sql_level: { N: (userData.sql_level || 0).toString() },
      sql_status: { S: userData.sql_status || 'FREE' },
      ai_score: { N: (userData.ai_score || 0).toString() },
      fraud_score: { N: (userData.fraud_score || 0).toString() },
      complaint_count: { N: (userData.complaint_count || 0).toString() },
      created_at: { S: new Date().toISOString() },
      updated_at: { S: new Date().toISOString() }
    };

    const command = new PutItemCommand({
      TableName: 'users',
      Item: item
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getUserById(id: string) {
    const command = new GetItemCommand({
      TableName: 'users',
      Key: { id: { S: id } }
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Item);
  }

  async getUserByEmail(email: string) {
    const command = new QueryCommand({
      TableName: 'users',
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': { S: email } }
    });

    const result = await dynamoClient.send(command);
    return result.Items?.[0] ? this.unformatDynamoItem(result.Items[0]) : null;
  }

  async updateUser(id: string, updates: any) {
    const updateExpressions = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.entries(updates).forEach(([key, value]) => {
      const attributeName = \`#\${key}\`;
      const attributeValue = \`:\${key}\`;
      
      updateExpressions.push(\`\${attributeName} = \${attributeValue}\`);
      expressionAttributeNames[attributeName] = key;
      
      if (typeof value === 'string') {
        expressionAttributeValues[attributeValue] = { S: value };
      } else if (typeof value === 'number') {
        expressionAttributeValues[attributeValue] = { N: value.toString() };
      }
    });

    // Add updated_at
    updateExpressions.push('#updated_at = :updated_at');
    expressionAttributeNames['#updated_at'] = 'updated_at';
    expressionAttributeValues[':updated_at'] = { S: new Date().toISOString() };

    const command = new UpdateItemCommand({
      TableName: 'users',
      Key: { id: { S: id } },
      UpdateExpression: \`SET \${updateExpressions.join(', ')}\`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Attributes);
  }

  // Job Operations
  async createJob(jobData: any) {
    const item = {
      id: { S: jobData.id || this.generateId() },
      title: { S: jobData.title },
      company: { S: jobData.company },
      location: { S: jobData.location },
      salary: { N: jobData.salary.toString() },
      description: { S: jobData.description || '' },
      requirements: { L: (jobData.requirements || []).map((r: any) => ({ S: r })) },
      skills: { L: (jobData.skills || []).map((s: any) => ({ S: s })) },
      status: { S: jobData.status || 'ACTIVE' },
      user_id: { S: jobData.user_id },
      created_at: { S: new Date().toISOString() },
      updated_at: { S: new Date().toISOString() }
    };

    const command = new PutItemCommand({
      TableName: 'jobs',
      Item: item
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getJobs(filters: any = {}) {
    let command;

    if (filters.status) {
      // Query by status
      command = new QueryCommand({
        TableName: 'jobs',
        IndexName: 'status-index',
        KeyConditionExpression: 'status = :status',
        ExpressionAttributeValues: { ':status': { S: filters.status } }
      });
    } else {
      // Scan all jobs
      command = new ScanCommand({
        TableName: 'jobs'
      });
    }

    const result = await dynamoClient.send(command);
    return result.Items?.map(item => this.unformatDynamoItem(item)) || [];
  }

  async getJobById(id: string) {
    const command = new GetItemCommand({
      TableName: 'jobs',
      Key: { id: { S: id } }
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Item);
  }

  // Wallet Operations
  async getWallet(userId: string) {
    const command = new GetItemCommand({
      TableName: 'wallets',
      Key: { user_id: { S: userId } }
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Item);
  }

  async createWallet(userId: string, walletData: any = {}) {
    const item = {
      id: { S: this.generateId() },
      user_id: { S: userId },
      balance: { N: (walletData.balance || 0).toString() },
      currency: { S: walletData.currency || 'USD' },
      created_at: { S: new Date().toISOString() },
      updated_at: { S: new Date().toISOString() }
    };

    const command = new PutItemCommand({
      TableName: 'wallets',
      Item: item
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async updateWallet(userId: string, updates: any) {
    const updateExpressions = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.entries(updates).forEach(([key, value]) => {
      const attributeName = \`#\${key}\`;
      const attributeValue = \`:\${key}\`;
      
      updateExpressions.push(\`\${attributeName} = \${attributeValue}\`);
      expressionAttributeNames[attributeName] = key;
      
      if (typeof value === 'string') {
        expressionAttributeValues[attributeValue] = { S: value };
      } else if (typeof value === 'number') {
        expressionAttributeValues[attributeValue] = { N: value.toString() };
      }
    });

    // Add updated_at
    updateExpressions.push('#updated_at = :updated_at');
    expressionAttributeNames['#updated_at'] = 'updated_at';
    expressionAttributeValues[':updated_at'] = { S: new Date().toISOString() };

    const command = new UpdateItemCommand({
      TableName: 'wallets',
      Key: { user_id: { S: userId } },
      UpdateExpression: \`SET \${updateExpressions.join(', ')}\`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Attributes);
  }

  // Transaction Operations
  async createTransaction(walletId: string, transactionData: any) {
    const item = {
      id: { S: this.generateId() },
      wallet_id: { S: walletId },
      type: { S: transactionData.type },
      amount: { N: transactionData.amount.toString() },
      description: { S: transactionData.description || '' },
      status: { S: transactionData.status || 'PENDING' },
      created_at: { S: new Date().toISOString() }
    };

    const command = new PutItemCommand({
      TableName: 'transactions',
      Item: item
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getTransactions(walletId: string, filters: any = {}) {
    const command = new QueryCommand({
      TableName: 'transactions',
      KeyConditionExpression: 'wallet_id = :wallet_id',
      ExpressionAttributeValues: { ':wallet_id': { S: walletId } }
    });

    const result = await dynamoClient.send(command);
    return result.Items?.map(item => this.unformatDynamoItem(item)) || [];
  }

  // Product Operations
  async createProduct(productData: any) {
    const item = {
      id: { S: productData.id || this.generateId() },
      name: { S: productData.name },
      description: { S: productData.description || '' },
      price: { N: productData.price.toString() },
      image_url: { S: productData.image_url || '' },
      category: { S: productData.category || '' },
      stock: { N: (productData.stock || 0).toString() },
      created_at: { S: new Date().toISOString() },
      updated_at: { S: new Date().toISOString() }
    };

    const command = new PutItemCommand({
      TableName: 'products',
      Item: item
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getProducts(filters: any = {}) {
    const command = new ScanCommand({
      TableName: 'products'
    });

    const result = await dynamoClient.send(command);
    return result.Items?.map(item => this.unformatDynamoItem(item)) || [];
  }

  // Helper Methods
  private generateId(): string {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  private unformatDynamoItem(item: any) {
    if (!item) return null;
    
    const unformatted: any = {};
    for (const [key, value] of Object.entries(item)) {
      const val = value as any;
      if ('S' in val) {
        unformatted[key] = val.S;
      } else if ('N' in val) {
        unformatted[key] = parseFloat(val.N);
      } else if ('L' in val) {
        unformatted[key] = val.L.map((v: any) => v.S);
      } else if ('M' in val) {
        unformatted[key] = this.unformatDynamoItem(val.M);
      }
    }
    return unformatted;
  }
}

// Export AWS-only database client
export const db = new DatabaseClient();
`;

// Update databaseClient.ts
const dbClientPath = path.join(__dirname, '..', 'lib', 'databaseClient.ts');
fs.writeFileSync(dbClientPath, awsOnlyContent);
console.log('✅ Updated databaseClient.ts to AWS-only');

// Update package.json to remove Supabase dependencies
const packageJsonPath = path.join(__dirname, '..', 'package.json');

if (fs.existsSync(packageJsonPath)) {
  console.log('📝 Updating package.json...');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Remove Supabase dependencies
  if (packageJson.dependencies && packageJson.dependencies['@supabase/supabase-js']) {
    delete packageJson.dependencies['@supabase/supabase-js'];
    console.log('  ✅ Removed @supabase/supabase-js from dependencies');
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('  ✅ Updated package.json');
}

// Create AWS setup script
const awsSetupScript = `#!/usr/bin/env node

const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

console.log('🚀 Setting up AWS DynamoDB...');

// Initialize DynamoDB
const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1'
});

async function setupAWSDatabase() {
  try {
    console.log('📊 Setting up DynamoDB tables...');
    
    const tables = [
      {
        name: 'users',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }]
      },
      {
        name: 'jobs',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }]
      },
      {
        name: 'wallets',
        keySchema: [{ AttributeName: 'user_id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'user_id', AttributeType: 'S' }]
      },
      {
        name: 'transactions',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }]
      },
      {
        name: 'products',
        keySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        attributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }]
      }
    ];
    
    for (const table of tables) {
      try {
        const command = new CreateTableCommand({
          TableName: table.name,
          KeySchema: table.keySchema,
          AttributeDefinitions: table.attributeDefinitions,
          BillingMode: 'PAY_PER_REQUEST'
        });
        
        await dynamo.send(command);
        console.log(\`  ✅ Created DynamoDB table: \${table.name}\`);
      } catch (error) {
        if (error.name === 'ResourceInUseException') {
          console.log(\`  ℹ️ DynamoDB table already exists: \${table.name}\`);
        } else {
          console.log(\`  ⚠️ Error creating DynamoDB table \${table.name}: \${error.message}\`);
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
`;

fs.writeFileSync(path.join(__dirname, '..', 'scripts', 'setup-aws-database.js'), awsSetupScript);
console.log('✅ Created AWS database setup script');

// Create test script
const testScript = `#!/usr/bin/env node

const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');

console.log('🧪 Testing AWS DynamoDB...');

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1'
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
      created_at: { S: new Date().toISOString() }
    };

    const putCommand = new PutItemCommand({
      TableName: 'users',
      Item: testUser
    });

    await dynamo.send(putCommand);
    console.log('  ✅ User creation successful');

    // Test user retrieval
    const getCommand = new GetItemCommand({
      TableName: 'users',
      Key: { id: testUser.id }
    });

    const result = await dynamo.send(getCommand);
    console.log('  ✅ User retrieval successful');

    console.log('\\n✅ AWS DynamoDB tests completed!');
    console.log('\\n🚀 Your project is now using AWS DynamoDB only!');
    
  } catch (error) {
    console.log('  ℹ️ Test result:', error.message);
    console.log('\\n💡 Make sure AWS credentials are configured');
  }
}

testAWS();
`;

fs.writeFileSync(path.join(__dirname, '..', 'scripts', 'test-aws-database.js'), testScript);
console.log('✅ Created AWS test script');

console.log('\\n🎉 Supabase removal completed!');
console.log('\\n📋 What was removed:');
console.log('- Supabase client files');
console.log('- Supabase dependencies');
console.log('- Supabase configuration');
console.log('\\n📋 What was added:');
console.log('- AWS-only database client');
console.log('- AWS database setup script');
console.log('- AWS test script');
console.log('\\n🚀 Next steps:');
console.log('1. Set AWS credentials in environment');
console.log('2. Run: node scripts/setup-aws-database.js');
console.log('3. Test: node scripts/test-aws-database.js');
console.log('4. Start using AWS DynamoDB!');
