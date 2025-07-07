const fs = require('fs');
const path = require('path');

// Update configuration files
const filesToUpdate = [
  '../ehb-backend/server.js',
  '../cloud-services/config.js',
  '../cloud-services/failover-service.js',
  '../cloud-services/aws-test.js',
  '../.env',
  '../.env.test',
  '../cloud-services/test-server.js',
  '../cloud-services/aws-test-server.js',
];

// Update each file
filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);

  try {
    // Read file
    let content = fs.readFileSync(filePath, 'utf8');

    // Update AWS-related configurations
    content = content.replace(/AWS_DB_API=[^\n]*/g, 'AWS_DB_API=https://aws-api.ehb.com');
    content = content.replace(/GCP_DB_API=[^\n]*/g, 'GCP_DB_API=https://gcp-api.ehb.com');

    // Update connection strings
    content = content.replace(/mongodb:\/\/.*\/ehb_db/g, 'mongodb://localhost:27017/ehb_db');

    // Update any hardcoded AWS credentials
    content = content.replace(/AWS_ACCESS_KEY_ID=[^\n]*/g, '');
    content = content.replace(/AWS_SECRET_ACCESS_KEY=[^\n]*/g, '');
    content = content.replace(/AWS_REGION=[^\n]*/g, '');

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

    // Add new environment variables for AWS
    content += `\n# AWS Configuration\n`;
    content += `AWS_API_KEY=${process.env.AWS_API_KEY || 'your_api_key'}\n`;
    content += `AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID || 'your_access_key_id'}\n`;
    content += `AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY || 'your_secret_access_key'}\n`;
    content += `AWS_REGION=${process.env.AWS_REGION || 'us-east-1'}\n`;

    // Write updated content
    fs.writeFileSync(file, content);
    console.log(`✅ Updated environment variables in: ${file}`);
  } catch (error) {
    console.error(`❌ Error updating environment variables in ${file}:`, error.message);
  }
});

console.log('✅ All AWS configurations have been updated!');
