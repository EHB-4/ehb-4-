const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { loadCredentials } = require('./credentials-loader');

// Load credentials
const credentials = loadCredentials();
const awsCredentials = credentials.aws;

// Create S3 client
const s3 = new S3Client({
  region: awsCredentials.region || 'us-east-1',
  credentials: {
    accessKeyId: awsCredentials.accessKeyId,
    secretAccessKey: awsCredentials.secretAccessKey,
  },
});

async function testAWSFull() {
  try {
    // 1. Test S3 bucket listing
    console.log('\n🔍 Testing S3 Bucket Listing...');
    const listCommand = new ListBucketsCommand({});
    const listResponse = await s3.send(listCommand);
    console.log(
      '✅ Buckets found:',
      listResponse.Buckets?.map(b => b.Name)
    );

    // 2. Use existing bucket
    const existingBucket = 'ehb-dev-files';
    console.log('\n📦 Using existing bucket:', existingBucket);

    // Upload test file
    const uploadCommand = new PutObjectCommand({
      Bucket: existingBucket,
      Key: 'test-file-' + Date.now() + '.txt',
      Body: 'Hello from AWS SDK v3 - Test File',
      ContentType: 'text/plain',
    });
    const uploadResponse = await s3.send(uploadCommand);
    console.log('✅ File uploaded successfully:', uploadResponse);

    // 3. Test file download
    console.log('\n📥 Testing file download...');
    const downloadCommand = new GetObjectCommand({
      Bucket: testBucket,
      Key: 'test-file.txt',
    });
    const downloadResponse = await s3.send(downloadCommand);
    const content = await downloadResponse.Body.transformToString();
    console.log('✅ File content:', content);

    // 4. Test file deletion
    console.log('\n🗑️ Testing file deletion...');
    const deleteCommand = new DeleteObjectCommand({
      Bucket: existingBucket,
      Key: uploadCommand.input.Key,
    });
    const deleteResponse = await s3.send(deleteCommand);
    console.log('✅ File deleted successfully:', deleteResponse);

    // 6. Test failover system
    console.log('\n🔄 Testing failover system...');
    const failoverService = require('./failover-service');

    // Test GET request
    console.log('\n🔄 Testing GET request...');
    const getUsers = await failoverService.executeRequest('/users');
    console.log('✅ Response:', getUsers.data);

    // Test POST request
    console.log('\n🔄 Testing POST request...');
    const newUser = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
    };
    const postUser = await failoverService.executeRequest('/users', 'POST', newUser);
    console.log('✅ Created user:', postUser.data);

    console.log('\n✅ All tests completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

// Run the test
testAWSFull();
