const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 AWS Credentials Updater');
console.log('==========================\n');

// Function to ask for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to update file
function updateFile(filePath, oldValue, newValue) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(new RegExp(oldValue, 'g'), newValue);
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.log(`❌ Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

async function updateCredentials() {
  try {
    // Get new credentials from user
    console.log('Please enter your new AWS credentials:\n');
    
    const newAccessKeyId = await askQuestion('Enter your new AWS Access Key ID: ');
    const newSecretAccessKey = await askQuestion('Enter your new AWS Secret Access Key: ');
    const region = await askQuestion('Enter your AWS Region (default: ap-south-1): ') || 'ap-south-1';
    const bucket = await askQuestion('Enter your S3 Bucket name (default: ehb-main-pro): ') || 'ehb-main-pro';

    console.log('\n🔄 Updating files...\n');

    // Files to update
    const files = [
      '.env.development',
      '.env.test',
      'cloud-credentials.json',
      '.env.aws'
    ];

    let successCount = 0;

    // Update .env.development
    if (updateFile('.env.development', 'AWS_ACCESS_KEY_ID=.*', `AWS_ACCESS_KEY_ID=${newAccessKeyId}`)) successCount++;
    if (updateFile('.env.development', 'AWS_SECRET_ACCESS_KEY=.*', `AWS_SECRET_ACCESS_KEY=${newSecretAccessKey}`)) successCount++;
    if (updateFile('.env.development', 'AWS_REGION=.*', `AWS_REGION=${region}`)) successCount++;
    if (updateFile('.env.development', 'AWS_S3_BUCKET=.*', `AWS_S3_BUCKET=${bucket}`)) successCount++;

    // Update .env.test
    if (updateFile('.env.test', 'AWS_ACCESS_KEY_ID=.*', `AWS_ACCESS_KEY_ID=${newAccessKeyId}`)) successCount++;
    if (updateFile('.env.test', 'AWS_SECRET_ACCESS_KEY=.*', `AWS_SECRET_ACCESS_KEY=${newSecretAccessKey}`)) successCount++;
    if (updateFile('.env.test', 'AWS_REGION=.*', `AWS_REGION=${region}`)) successCount++;
    if (updateFile('.env.test', 'AWS_S3_BUCKET=.*', `AWS_S3_BUCKET=${bucket}`)) successCount++;

    // Update cloud-credentials.json
    try {
      const credsContent = fs.readFileSync('cloud-credentials.json', 'utf8');
      const creds = JSON.parse(credsContent);
      creds.aws.accessKeyId = newAccessKeyId;
      creds.aws.secretAccessKey = newSecretAccessKey;
      creds.aws.region = region;
      fs.writeFileSync('cloud-credentials.json', JSON.stringify(creds, null, 2));
      console.log('✅ Updated: cloud-credentials.json');
      successCount++;
    } catch (error) {
      console.log('❌ Error updating cloud-credentials.json:', error.message);
    }

    // Update .env.aws
    if (fs.existsSync('.env.aws')) {
      if (updateFile('.env.aws', 'AWS_ACCESS_KEY_ID=.*', `AWS_ACCESS_KEY_ID=${newAccessKeyId}`)) successCount++;
      if (updateFile('.env.aws', 'AWS_SECRET_ACCESS_KEY=.*', `AWS_SECRET_ACCESS_KEY=${newSecretAccessKey}`)) successCount++;
      if (updateFile('.env.aws', 'AWS_REGION=.*', `AWS_REGION=${region}`)) successCount++;
      if (updateFile('.env.aws', 'AWS_S3_BUCKET=.*', `AWS_S3_BUCKET=${bucket}`)) successCount++;
    }

    console.log(`\n📊 Summary: ${successCount} files updated successfully`);

    // Test the connection
    console.log('\n🧪 Testing AWS connection...');
    
    const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
    
    const s3 = new S3Client({
      region: region,
      credentials: {
        accessKeyId: newAccessKeyId,
        secretAccessKey: newSecretAccessKey,
      },
    });

    try {
      const command = new ListBucketsCommand({});
      const response = await s3.send(command);
      console.log('✅ AWS Connection Successful!');
      console.log('Available Buckets:', response.Buckets?.map(b => b.Name));
    } catch (error) {
      console.error('❌ AWS Connection Failed:', error.message);
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Check if your AWS keys are correct');
      console.log('2. Verify your AWS account is active');
      console.log('3. Make sure you have the right permissions');
      console.log('4. Check if you\'re using the correct region');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Run the updater
updateCredentials(); 