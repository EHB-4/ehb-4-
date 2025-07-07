import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';

// AWS DynamoDB Client
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

// AWS-Only Database Interface
export class AWSDatabaseClient {
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
      updated_at: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: 'users',
      Item: item,
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getUserById(id: string) {
    const command = new GetItemCommand({
      TableName: 'users',
      Key: { id: { S: id } },
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Item);
  }

  async getUserByEmail(email: string) {
    const command = new QueryCommand({
      TableName: 'users',
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': { S: email } },
    });

    const result = await dynamoClient.send(command);
    return result.Items?.[0] ? this.unformatDynamoItem(result.Items[0]) : null;
  }

  async updateUser(id: string, updates: any) {
    const updateExpressions = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.entries(updates).forEach(([key, value]) => {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;

      updateExpressions.push(`${attributeName} = ${attributeValue}`);
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
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
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
      updated_at: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: 'jobs',
      Item: item,
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
        ExpressionAttributeValues: { ':status': { S: filters.status } },
      });
    } else {
      // Scan all jobs
      command = new ScanCommand({
        TableName: 'jobs',
      });
    }

    const result = await dynamoClient.send(command);
    return result.Items?.map(item => this.unformatDynamoItem(item)) || [];
  }

  async getJobById(id: string) {
    const command = new GetItemCommand({
      TableName: 'jobs',
      Key: { id: { S: id } },
    });

    const result = await dynamoClient.send(command);
    return this.unformatDynamoItem(result.Item);
  }

  // Wallet Operations
  async getWallet(userId: string) {
    const command = new GetItemCommand({
      TableName: 'wallets',
      Key: { user_id: { S: userId } },
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
      updated_at: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: 'wallets',
      Item: item,
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async updateWallet(userId: string, updates: any) {
    const updateExpressions = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.entries(updates).forEach(([key, value]) => {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;

      updateExpressions.push(`${attributeName} = ${attributeValue}`);
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
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
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
      created_at: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: 'transactions',
      Item: item,
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getTransactions(walletId: string, filters: any = {}) {
    const command = new QueryCommand({
      TableName: 'transactions',
      KeyConditionExpression: 'wallet_id = :wallet_id',
      ExpressionAttributeValues: { ':wallet_id': { S: walletId } },
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
      updated_at: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: 'products',
      Item: item,
    });

    await dynamoClient.send(command);
    return this.unformatDynamoItem(item);
  }

  async getProducts(filters: any = {}) {
    const command = new ScanCommand({
      TableName: 'products',
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
export const awsDb = new AWSDatabaseClient();
