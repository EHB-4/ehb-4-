const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
const { DynamoDBClient, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const { SQSClient, ListQueuesCommand } = require('@aws-sdk/client-sqs');
const { loadCredentials } = require('../credentials-loader');

// Load credentials
const credentials = loadCredentials();
const awsCredentials = credentials.aws;

// Initialize S3 client
const s3 = new S3Client({
  region: awsCredentials.region,
  credentials: {
    accessKeyId: awsCredentials.accessKeyId,
    secretAccessKey: awsCredentials.secretAccessKey,
  },
});

async function testAWSBasic() {
  try {
    console.log('\n🚀 Testing Basic AWS Connectivity...');

    // Test S3 bucket listing
    console.log('\n🔍 Testing S3 Bucket Listing...');
    const command = new ListBucketsCommand({});
    const response = await s3.send(command);
    console.log(
      '✅ Buckets found:',
      response.Buckets?.map(b => b.Name)
    );

    // Test DynamoDB permissions
    console.log('\n🔍 Testing DynamoDB Permissions...');
    try {
      const dynamo = new DynamoDBClient({
        region: awsCredentials.region,
        credentials: {
          accessKeyId: awsCredentials.accessKeyId,
          secretAccessKey: awsCredentials.secretAccessKey,
        },
      });

      // List tables to test permissions
      const command = new ListTablesCommand({});
      const tables = await dynamo.send(command);
      console.log('✅ DynamoDB tables:', tables.TableNames);
    } catch (error) {
      console.log('ℹ️ DynamoDB permissions error:', error.message);
    }

    // Test SQS permissions
    console.log('\n🔍 Testing SQS Permissions...');
    try {
      const sqs = new SQSClient({
        region: awsCredentials.region,
        credentials: {
          accessKeyId: awsCredentials.accessKeyId,
          secretAccessKey: awsCredentials.secretAccessKey,
        },
      });

      // List queues to test permissions
      const command = new ListQueuesCommand({});
      const queues = await sqs.send(command);
      console.log('✅ SQS queues:', queues.QueueUrls);
    } catch (error) {
      console.log('ℹ️ SQS permissions error:', error.message);
    }

    console.log('\n✅ Basic AWS connectivity test completed!');
    return true;
  } catch (error) {
    console.error('❌ Basic test failed:', error.message);
    return false;
  }
}

// Run the test
testAWSBasic();
