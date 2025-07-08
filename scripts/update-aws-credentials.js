const fs = require('fs');
const path = require('path');

// Load credentials
const credentials = require('../cloud-credentials.json');
const awsCredentials = credentials.aws;

// Files to update
const filesToUpdate = [
  '../ehb-backend/server.js',
  '../cloud-services/config.js',
  '../cloud-services/failover-service.js',
  '../cloud-services/aws-test.js',
  '../.env',
  '../.env.test',
];

// Update each file
filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);

  try {
    // Read file
    let content = fs.readFileSync(filePath, 'utf8');

    // Update AWS credentials
    content = content.replace(/AWS_API_KEY=[^\n]*/g, `AWS_API_KEY=${awsCredentials.apiKey}`);
    content = content.replace(
      /AWS_ACCESS_KEY_ID=[^\n]*/g,
      `AWS_ACCESS_KEY_ID=${awsCredentials.accessKeyId}`
    );
    content = content.replace(
      /AWS_SECRET_ACCESS_KEY=[^\n]*/g,
      `AWS_SECRET_ACCESS_KEY=${awsCredentials.secretAccessKey}`
    );
    content = content.replace(/AWS_REGION=[^\n]*/g, `AWS_REGION=${awsCredentials.region}`);

    // Update AWS API endpoints
    content = content.replace(
      /AWS_DB_API=[^\n]*/g,
      `AWS_DB_API=${awsCredentials.apiEndpoint || 'https://aws-api.ehb.com'}`
    );

    // Write updated content
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${file}`);
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
  }
});

// Update environment variables
const envFiles = ['../.env', '../.env.test'];
envFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');

    // Remove old AWS credentials
    content = content.replace(/AWS_API_KEY=[^\n]*\n?/g, '');
    content = content.replace(/AWS_ACCESS_KEY_ID=[^\n]*\n?/g, '');
    content = content.replace(/AWS_SECRET_ACCESS_KEY=[^\n]*\n?/g, '');
    content = content.replace(/AWS_REGION=[^\n]*\n?/g, '');

    // Add new AWS credentials
    content += `\nAWS_API_KEY=${awsCredentials.apiKey}`;
    content += `\nAWS_ACCESS_KEY_ID=${awsCredentials.accessKeyId}`;
    content += `\nAWS_SECRET_ACCESS_KEY=${awsCredentials.secretAccessKey}`;
    content += `\nAWS_REGION=${awsCredentials.region}`;

    // Write updated content
    fs.writeFileSync(file, content);
    console.log(`✅ Updated environment variables in: ${file}`);
  } catch (error) {
    console.error(`❌ Error updating environment variables in ${file}:`, error.message);
  }
});

console.log('✅ All AWS credentials have been updated!');
