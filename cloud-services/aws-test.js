const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { loadCredentials } = require('./credentials-loader');

// Load credentials
const credentials = loadCredentials();
const awsCredentials = credentials.aws;

// Create S3 client
const s3 = new S3Client({
  region: awsCredentials.region,
  endpoint: `https://s3.${awsCredentials.region}.amazonaws.com`,
  credentials: {
    accessKeyId: awsCredentials.accessKeyId,
    secretAccessKey: awsCredentials.secretAccessKey,
  },
});

async function testAWSConnection() {
  try {
    // Test listing buckets
    const command = new ListBucketsCommand({});
    const bucketsResponse = await s3.send(command);
    console.log('✅ AWS Connection Successful!');
    console.log(
      'Available Buckets:',
      bucketsResponse.Buckets?.map(b => b.Name)
    );

    // Test file upload
    const uploadCommand = new PutObjectCommand({
      Bucket: 'ehb-main-data',
      Key: 'test-file.txt',
      Body: 'Hello from AWS SDK v3!',
      ContentType: 'text/plain',
    });

    const uploadResponse = await s3.send(uploadCommand);
    console.log('✅ File uploaded successfully:', uploadResponse);

    // Test file download
    const downloadCommand = new GetObjectCommand({
      Bucket: 'ehb-main-data',
      Key: 'test-file.txt',
    });

    const downloadResponse = await s3.send(downloadCommand);
    const fileContent = await downloadResponse.Body.transformToString();
    console.log('✅ File content:', fileContent);

    // Test health check endpoint
    const healthResponse = await fetch('http://localhost:5001/health');
    const health = await healthResponse.json();
    console.log('AWS Service Health:', health);

    return true;
  } catch (error) {
    console.error('❌ AWS Connection Error:', error.message);
    return false;
  }
}

// Run the test
testAWSConnection();
