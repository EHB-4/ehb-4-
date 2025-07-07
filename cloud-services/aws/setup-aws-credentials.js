const fs = require('fs');
const path = require('path');

function setupAWSCredentials() {
  try {
    // Create .env.aws if it doesn't exist
    const envPath = path.join(__dirname, '../.env.aws');
    if (!fs.existsSync(envPath)) {
      const envContent =
        `# AWS Configuration\n` +
        `AWS_ACCESS_KEY_ID=your_access_key_id\n` +
        `AWS_SECRET_ACCESS_KEY=your_secret_access_key\n` +
        `AWS_REGION=us-east-1\n\n` +
        `# S3 Configuration\n` +
        `AWS_S3_BUCKET=ehb-dev-files\n\n` +
        `# SQS Configuration\n` +
        `AWS_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/ehb-test-queue\n\n` +
        `# SNS Configuration\n` +
        `AWS_SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:ehb-test-topic\n\n` +
        `# Lambda Configuration\n` +
        `AWS_LAMBDA_FUNCTION=ehb-test-lambda\n\n` +
        `# DynamoDB Configuration\n` +
        `AWS_DYNAMODB_TABLE=ehb-test-table\n\n` +
        `# RDS Configuration\n` +
        `AWS_RDS_INSTANCE=ehb-test-db\n\n` +
        `# ElastiCache Configuration\n` +
        `AWS_ELASTICACHE_CLUSTER=ehb-test-cache`;

      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created .env.aws file with template');
    }

    // Create cloud-credentials.json if it doesn't exist
    const credPath = path.join(__dirname, '../cloud-credentials.json');
    if (!fs.existsSync(credPath)) {
      const credContent = {
        aws: {
          apiKey: 'your_api_key',
          accessKeyId: 'your_access_key_id',
          secretAccessKey: 'your_secret_access_key',
          region: 'us-east-1',
        },
      };

      fs.writeFileSync(credPath, JSON.stringify(credContent, null, 2));
      console.log('✅ Created cloud-credentials.json file with template');
    }

    console.log('\n✅ AWS credentials setup completed!');
    console.log('Please update the following files with your actual AWS credentials:');
    console.log('- .env.aws');
    console.log('- cloud-credentials.json');
  } catch (error) {
    console.error('❌ Error setting up AWS credentials:', error.message);
  }
}

// Run the setup
setupAWSCredentials();
