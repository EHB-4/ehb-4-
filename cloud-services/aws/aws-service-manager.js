const {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
  DeleteItemCommand,
} = require('@aws-sdk/client-dynamodb');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
} = require('@aws-sdk/client-s3');
const {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require('@aws-sdk/client-sqs');
const { SNSClient, PublishCommand, SubscribeCommand } = require('@aws-sdk/client-sns');
const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
const { RDSClient, DescribeDBInstancesCommand } = require('@aws-sdk/client-rds');
const { CloudWatchClient, PutMetricDataCommand } = require('@aws-sdk/client-cloudwatch');
const { ElastiCacheClient, DescribeCacheClustersCommand } = require('@aws-sdk/client-elasticache');
const { loadCredentials } = require('./credentials-loader');

// Initialize clients with default credential provider
const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const sqs = new SQSClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  endpoint: process.env.AWS_SQS_ENDPOINT || 'https://sqs.ap-south-1.amazonaws.com',
});

const sns = new SNSClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const lambda = new LambdaClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const ec2 = new EC2Client({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const rds = new RDSClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const cloudwatch = new CloudWatchClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const elasticache = new ElastiCacheClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

class AWSServiceManager {
  constructor() {
    this.dynamo = dynamo;
    this.s3 = s3;
    this.sqs = sqs;
    this.sns = sns;
    this.lambda = lambda;
    this.ec2 = ec2;
    this.rds = rds;
    this.cloudwatch = cloudwatch;
    this.elasticache = elasticache;
  }

  // Helper method to safely execute AWS commands
  async safeExecute(command, client) {
    try {
      return await client.send(command);
    } catch (error) {
      console.warn(`⚠️ Warning: ${error.message}`);
      return null;
    }
  }

  // Helper method to check if service is available
  isServiceAvailable(service) {
    return !!this[service];
  }

  // DynamoDB Operations
  async createTable(tableName) {
    if (!this.isServiceAvailable('dynamo')) {
      console.warn('⚠️ DynamoDB service not available');
      return null;
    }

    try {
      // First check if table exists
      const describeCommand = new DescribeTableCommand({
        TableName: tableName,
      });
      await this.safeExecute(describeCommand, this.dynamo);
      console.log('ℹ️ Table already exists:', tableName);
      return null;
    } catch (error) {
      if (error.name === 'ResourceNotFoundException') {
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

        // Create table command
        const command = new CreateTableCommand(tableParams);

        // Execute with retry logic
        let retries = 3;
        while (retries > 0) {
          try {
            const result = await this.safeExecute(command, this.dynamo);
            console.log('ℹ️ DynamoDB table creation result:', JSON.stringify(result, null, 2));
            return result;
          } catch (error) {
            if (error.name === 'ValidationException') {
              console.error('❌ DynamoDB validation error:', error.message);
              console.error('❌ Validation details:', {
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
            } else if (error.name === 'ResourceInUseException') {
              console.log('ℹ️ Table already exists:', tableName);
              return null;
            } else if (error.name === 'ProvisionedThroughputExceededException') {
              console.log('ℹ️ Retrying due to throughput limit...');
              retries--;
              await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
              throw error;
            }
          }
        }
        throw new Error('Failed to create table after retries');
      }
      throw error;
    }
  }

  async putItem(tableName, item) {
    const formattedItem = {};
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'string') {
        formattedItem[key] = { S: value };
      } else if (typeof value === 'number') {
        formattedItem[key] = { N: value.toString() };
      } else if (Array.isArray(value)) {
        formattedItem[key] = { L: value.map(v => ({ S: v })) };
      } else if (value !== null && typeof value === 'object') {
        formattedItem[key] = { M: this.formatDynamoItem(value) };
      }
    }

    const command = new PutItemCommand({
      TableName: tableName,
      Item: formattedItem,
    });
    return await this.safeExecute(command, this.dynamo);
  }

  async getItem(tableName, key) {
    const formattedKey = {};
    for (const [key, value] of Object.entries(key)) {
      formattedKey[key] = { S: value };
    }

    const command = new GetItemCommand({
      TableName: tableName,
      Key: formattedKey,
    });
    return await this.dynamo.send(command);
  }

  formatDynamoItem(item) {
    const formattedItem = {};
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'string') {
        formattedItem[key] = { S: value };
      } else if (typeof value === 'number') {
        formattedItem[key] = { N: value.toString() };
      } else if (Array.isArray(value)) {
        formattedItem[key] = { L: value.map(v => ({ S: v })) };
      } else if (value !== null && typeof value === 'object') {
        formattedItem[key] = { M: this.formatDynamoItem(value) };
      }
    }
    return formattedItem;
  }

  async createTable(tableName, keySchema, attributeDefinitions) {
    const command = new CreateTableCommand({
      TableName: tableName,
      KeySchema: keySchema,
      AttributeDefinitions: attributeDefinitions,
      BillingMode: 'PAY_PER_REQUEST',
    });
    return await this.dynamo.send(command);
  }

  async query(tableName, keyCondition) {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyCondition.expression,
      ExpressionAttributeValues: keyCondition.values,
    });
    return await this.dynamo.send(command);
  }

  // S3 Operations
  async listS3Objects(bucket) {
    const command = new ListObjectsCommand({
      Bucket: bucket,
    });
    return await this.safeExecute(command, this.s3);
  }

  async uploadFile(bucket, key, body, contentType = 'text/plain') {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });
    return await this.safeExecute(command, this.s3);
  }

  async downloadFile(bucket, key) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    return await this.safeExecute(command, this.s3);
  }

  // SQS Operations
  async sendMessage(queueUrl, message) {
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: message,
    });
    return await this.sqs.send(command);
  }

  async receiveMessage(queueUrl) {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    });
    return await this.sqs.send(command);
  }

  // SNS Operations
  async publish(topicArn, message) {
    const command = new PublishCommand({
      TopicArn: topicArn,
      Message: message,
    });
    return await this.sns.send(command);
  }

  // Lambda Operations
  async invokeFunction(functionName, payload) {
    if (!this.isServiceAvailable('lambda')) {
      console.warn('⚠️ Lambda service not available');
      return null;
    }

    try {
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: JSON.stringify(payload),
      });
      return await this.safeExecute(command, this.lambda);
    } catch (error) {
      console.error('❌ Lambda error:', error.message);
      throw error;
    }
  }

  // ElastiCache Operations
  async describeCacheClusters() {
    if (!this.isServiceAvailable('elasticache')) {
      console.warn('⚠️ ElastiCache service not available');
      return null;
    }

    const command = new DescribeCacheClustersCommand({});
    return await this.safeExecute(command, this.elasticache);
  }

  // Health Check
  async healthCheck() {
    try {
      const [dynamoHealth, s3Health, sqsHealth, snsHealth, lambdaHealth] = await Promise.all([
        this.dynamo.describeTable({ TableName: 'health-check' }),
        this.s3.listBuckets(),
        this.sqs.listQueues(),
        this.sns.listTopics(),
        this.lambda.listFunctions(),
      ]);

      return {
        status: 'healthy',
        services: {
          dynamodb: !!dynamoHealth,
          s3: !!s3Health,
          sqs: !!sqsHealth,
          sns: !!snsHealth,
          lambda: !!lambdaHealth,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
      };
    }
  }
}

module.exports = new AWSServiceManager();
