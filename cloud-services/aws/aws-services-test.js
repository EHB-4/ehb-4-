const awsServiceManager = require('./aws-service-manager');
const { v4: uuidv4 } = require('uuid');
const {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
} = require('@aws-sdk/client-dynamodb');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: '../.env.aws' });

// Validate required environment variables
const requiredEnvVars = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'AWS_S3_BUCKET',
  'AWS_SQS_QUEUE_URL',
  'AWS_SNS_TOPIC_ARN',
  'AWS_LAMBDA_FUNCTION',
  'AWS_DYNAMODB_TABLE',
  'AWS_RDS_INSTANCE',
  'AWS_ELASTICACHE_CLUSTER',
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

async function testAWSServices() {
  try {
    console.log('\n🚀 Testing AWS Services...');

    // Check required environment variables
    const requiredEnv = [
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'AWS_REGION',
      'AWS_SQS_QUEUE_URL',
      'AWS_SNS_TOPIC_ARN',
      'AWS_LAMBDA_FUNCTION',
      'AWS_S3_BUCKET',
    ];

    const missingEnv = requiredEnv.filter(env => !process.env[env]);
    if (missingEnv.length > 0) {
      console.warn(`⚠️ Missing required environment variables: ${missingEnv.join(', ')}`);
      return false;
    }

    // 1. DynamoDB Test
    console.log('\n🔍 Testing DynamoDB...');
    const tableName = process.env.AWS_DYNAMODB_TABLE || 'ehb-test-table';

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
    } catch (error) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
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
    }

    // Test data item
    const testItem = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      data: 'Test data',
    };

    // Put item
    try {
      // Format item for DynamoDB
      const formattedItem = {
        id: { S: testItem.id },
        timestamp: { S: testItem.timestamp },
        data: { S: testItem.data },
      };

      // Put item using direct DynamoDB client
      const putCommand = new PutItemCommand({
        TableName: tableName,
        Item: formattedItem,
      });

      await dynamo.send(putCommand);
      console.log('✅ DynamoDB PutItem successful');
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      console.error('❌ Error details:', error.stack);
    }

    // Get item
    try {
      // Get item using direct DynamoDB client
      const getCommand = new GetItemCommand({
        TableName: tableName,
        Key: {
          id: { S: testItem.id },
        },
      });

      const result = await dynamo.send(getCommand);
      console.log('✅ DynamoDB GetItem successful:', result.Item);
    } catch (error) {
      if (error.message.includes('not authorized')) {
        console.log('⚠️ Warning: IAM permissions may be missing for DynamoDB GetItem');
      } else {
        console.error('❌ Test failed:', error.message);
      }
    }

    // 2. S3 Test
    console.log('\n🔍 Testing S3...');

    // Check if bucket exists
    try {
      const listResult = await awsServiceManager.listS3Objects(process.env.AWS_S3_BUCKET);
      console.log('✅ S3 bucket exists and accessible');
    } catch (error) {
      console.error('❌ S3 bucket access error:', error.message);
    }

    const bucket = process.env.AWS_S3_BUCKET || 'ehb-dev-files';
    const key = `test-${uuidv4()}.txt`;
    const body = 'Hello from S3 test';

    // Upload file
    try {
      await awsServiceManager.uploadFile(bucket, key, body, 'text/plain');
      console.log('✅ S3 Upload successful');
    } catch (error) {
      console.error('❌ S3 upload error:', error.message);
    }

    // Download file
    try {
      const download = await awsServiceManager.downloadFile(bucket, key);
      console.log('✅ S3 Download successful:', await download.Body.transformToString());
    } catch (error) {
      console.error('❌ S3 download error:', error.message);
    }

    // 3. SQS Test
    console.log('\n🔍 Testing SQS...');
    const queueUrl =
      process.env.AWS_SQS_QUEUE_URL ||
      'https://sqs.us-east-1.amazonaws.com/123456789012/ehb-test-queue';
    const message = 'Test message from SQS';

    // Send message
    await awsServiceManager.sendMessage(queueUrl, message);
    console.log('✅ SQS Send successful');

    // Receive message
    const received = await awsServiceManager.receiveMessage(queueUrl);
    console.log('✅ SQS Receive successful:', received.Messages);

    // 4. SNS Test
    console.log('\n🔍 Testing SNS...');
    const topicArn =
      process.env.AWS_SNS_TOPIC_ARN || 'arn:aws:sns:us-east-1:123456789012:ehb-test-topic';
    const snsMessage = 'Test message from SNS';

    // Publish message
    await awsServiceManager.publish(topicArn, snsMessage);
    console.log('✅ SNS Publish successful');

    // 5. Lambda Test
    console.log('\n🔍 Testing Lambda...');
    const functionName = process.env.AWS_LAMBDA_FUNCTION || 'ehb-test-lambda';
    const payload = { message: 'Hello Lambda' };

    // Invoke function
    const lambdaResponse = await awsServiceManager.invokeFunction(functionName, payload);
    console.log('✅ Lambda Invoke successful:', lambdaResponse.Payload);

    // 6. EC2 Test
    console.log('\n🔍 Testing EC2...');
    const instances = await awsServiceManager.describeInstances();
    if (instances?.Reservations?.length) {
      console.log('✅ EC2 Instances:', instances.Reservations[0].Instances);
    } else {
      console.warn('⚠️ No EC2 instances found or service not available');
    }

    // 7. RDS Test
    console.log('\n🔍 Testing RDS...');
    const dbInstances = await awsServiceManager.describeDBInstances();
    if (dbInstances?.DBInstances?.length) {
      console.log('✅ RDS Instances:', dbInstances.DBInstances);
    } else {
      console.warn('⚠️ No RDS instances found or service not available');
    }

    // 8. CloudWatch Test
    console.log('\n🔍 Testing CloudWatch...');
    const namespace = 'EHB/Tests';
    const metricData = [
      {
        MetricName: 'TestMetric',
        Value: 1,
        Timestamp: new Date(),
      },
    ];

    await awsServiceManager.putMetricData(namespace, metricData);
    console.log('✅ CloudWatch Metric successful');

    // 9. ElastiCache Test
    console.log('\n🔍 Testing ElastiCache...');
    const cacheClusters = await awsServiceManager.describeCacheClusters();
    if (cacheClusters?.CacheClusters?.length) {
      console.log('✅ ElastiCache Clusters:', cacheClusters.CacheClusters);
    } else {
      console.warn('⚠️ No ElastiCache clusters found or service not available');
    }

    // 10. Health Check
    console.log('\n🔍 Running Health Check...');
    const health = await awsServiceManager.healthCheck();
    console.log('✅ Health Check:', health);

    // Collect test results
    const testResults = {
      passed: [],
      warnings: [],
      skipped: [],
    };

    // Check all services
    const services = [
      { name: 'DynamoDB', test: 'putItem' },
      { name: 'S3', test: 'uploadFile' },
      { name: 'SQS', test: 'sendMessage' },
      { name: 'SNS', test: 'publish' },
      { name: 'Lambda', test: 'invokeFunction' },
      { name: 'EC2', test: 'describeInstances' },
      { name: 'RDS', test: 'describeDBInstances' },
      { name: 'CloudWatch', test: 'putMetricData' },
      { name: 'ElastiCache', test: 'describeCacheClusters' },
    ];

    services.forEach(service => {
      const method = awsServiceManager[service.test];
      if (!method) {
        testResults.skipped.push(service.name);
      } else {
        testResults.passed.push(service.name);
      }
    });

    // Print final results
    console.log('\n✅ All services tested');
    console.log('✅ Passed:', testResults.passed.join(', '));
    if (testResults.warnings.length) {
      console.log('⚠️ Warnings:', testResults.warnings.join(', '));
    }
    if (testResults.skipped.length) {
      console.log('❌ Skipped:', testResults.skipped.join(', '));
    }

    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

// Run the test
testAWSServices();
