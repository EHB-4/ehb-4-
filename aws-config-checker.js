const fs = require('fs');
const path = require('path');
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

/**
 * Comprehensive AWS Configuration Checker and Fixer
 * This script will check all AWS configurations across the project and fix inconsistencies
 */

// Your actual AWS credentials (replace with your real credentials)
const ACTUAL_AWS_CREDENTIALS = {
  accessKeyId: 'AKIA3SMX5DWFY6LLZL',
  secretAccessKey: 'QwWcHcL7lLhK2hKpQnyZzILkP2yWecCQ0Q',
  region: 'ap-south-1',
  s3Bucket: 'ehb-main-pro'
};

// Files to check and update
const FILES_TO_CHECK = [
  '.env.development',
  '.env.test',
  'cloud-credentials.json',
  'test-aws.js',
  'cloud-services/aws-test.js',
  'cloud-services/aws-full-test.js',
  'cloud-services/aws/aws-basic-test.js',
  'cloud-services/aws/aws-services-test.js',
  'cloud-services/aws/aws-service-manager.js',
  'cloud-services/aws/setup-aws-credentials.js',
  'cloud-services/credentials-loader.js',
  'cloud-services/config-manager.js'
];

class AWSConfigChecker {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  /**
   * Check if a file exists
   */
  fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Read file content
   */
  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      this.issues.push(`Cannot read file: ${filePath} - ${error.message}`);
      return null;
    }
  }

  /**
   * Write file content
   */
  writeFile(filePath, content) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      this.fixes.push(`Updated: ${filePath}`);
      return true;
    } catch (error) {
      this.issues.push(`Cannot write file: ${filePath} - ${error.message}`);
      return false;
    }
  }

  /**
   * Check environment file
   */
  checkEnvFile(filePath) {
    console.log(`\n🔍 Checking: ${filePath}`);
    
    if (!this.fileExists(filePath)) {
      this.issues.push(`Missing file: ${filePath}`);
      return;
    }

    const content = this.readFile(filePath);
    if (!content) return;

    let updated = false;
    let newContent = content;

    // Check and fix AWS_ACCESS_KEY_ID
    if (!content.includes(`AWS_ACCESS_KEY_ID=${ACTUAL_AWS_CREDENTIALS.accessKeyId}`)) {
      newContent = newContent.replace(
        /AWS_ACCESS_KEY_ID=.*/g,
        `AWS_ACCESS_KEY_ID=${ACTUAL_AWS_CREDENTIALS.accessKeyId}`
      );
      updated = true;
    }

    // Check and fix AWS_SECRET_ACCESS_KEY
    if (!content.includes(`AWS_SECRET_ACCESS_KEY=${ACTUAL_AWS_CREDENTIALS.secretAccessKey}`)) {
      newContent = newContent.replace(
        /AWS_SECRET_ACCESS_KEY=.*/g,
        `AWS_SECRET_ACCESS_KEY=${ACTUAL_AWS_CREDENTIALS.secretAccessKey}`
      );
      updated = true;
    }

    // Check and fix AWS_REGION
    if (!content.includes(`AWS_REGION=${ACTUAL_AWS_CREDENTIALS.region}`)) {
      newContent = newContent.replace(
        /AWS_REGION=.*/g,
        `AWS_REGION=${ACTUAL_AWS_CREDENTIALS.region}`
      );
      updated = true;
    }

    // Check and fix AWS_S3_BUCKET
    if (!content.includes(`AWS_S3_BUCKET=${ACTUAL_AWS_CREDENTIALS.s3Bucket}`)) {
      newContent = newContent.replace(
        /AWS_S3_BUCKET=.*/g,
        `AWS_S3_BUCKET=${ACTUAL_AWS_CREDENTIALS.s3Bucket}`
      );
      updated = true;
    }

    // Add missing AWS variables if they don't exist
    if (!content.includes('AWS_ACCESS_KEY_ID=')) {
      newContent += `\nAWS_ACCESS_KEY_ID=${ACTUAL_AWS_CREDENTIALS.accessKeyId}`;
      updated = true;
    }
    if (!content.includes('AWS_SECRET_ACCESS_KEY=')) {
      newContent += `\nAWS_SECRET_ACCESS_KEY=${ACTUAL_AWS_CREDENTIALS.secretAccessKey}`;
      updated = true;
    }
    if (!content.includes('AWS_REGION=')) {
      newContent += `\nAWS_REGION=${ACTUAL_AWS_CREDENTIALS.region}`;
      updated = true;
    }
    if (!content.includes('AWS_S3_BUCKET=')) {
      newContent += `\nAWS_S3_BUCKET=${ACTUAL_AWS_CREDENTIALS.s3Bucket}`;
      updated = true;
    }

    if (updated) {
      this.writeFile(filePath, newContent);
    } else {
      console.log(`✅ ${filePath} - No changes needed`);
    }
  }

  /**
   * Check JSON configuration file
   */
  checkJsonFile(filePath) {
    console.log(`\n🔍 Checking: ${filePath}`);
    
    if (!this.fileExists(filePath)) {
      this.issues.push(`Missing file: ${filePath}`);
      return;
    }

    try {
      const content = this.readFile(filePath);
      if (!content) return;

      const config = JSON.parse(content);
      let updated = false;

      // Check AWS credentials in JSON
      if (config.aws) {
        if (config.aws.accessKeyId !== ACTUAL_AWS_CREDENTIALS.accessKeyId) {
          config.aws.accessKeyId = ACTUAL_AWS_CREDENTIALS.accessKeyId;
          updated = true;
        }
        if (config.aws.secretAccessKey !== ACTUAL_AWS_CREDENTIALS.secretAccessKey) {
          config.aws.secretAccessKey = ACTUAL_AWS_CREDENTIALS.secretAccessKey;
          updated = true;
        }
        if (config.aws.region !== ACTUAL_AWS_CREDENTIALS.region) {
          config.aws.region = ACTUAL_AWS_CREDENTIALS.region;
          updated = true;
        }
      } else {
        config.aws = {
          apiKey: "",
          accessKeyId: ACTUAL_AWS_CREDENTIALS.accessKeyId,
          secretAccessKey: ACTUAL_AWS_CREDENTIALS.secretAccessKey,
          region: ACTUAL_AWS_CREDENTIALS.region
        };
        updated = true;
      }

      if (updated) {
        this.writeFile(filePath, JSON.stringify(config, null, 2));
      } else {
        console.log(`✅ ${filePath} - No changes needed`);
      }
    } catch (error) {
      this.issues.push(`Error parsing JSON file: ${filePath} - ${error.message}`);
    }
  }

  /**
   * Check JavaScript files for AWS configurations
   */
  checkJsFile(filePath) {
    console.log(`\n🔍 Checking: ${filePath}`);
    
    if (!this.fileExists(filePath)) {
      this.issues.push(`Missing file: ${filePath}`);
      return;
    }

    const content = this.readFile(filePath);
    if (!content) return;

    let updated = false;
    let newContent = content;

    // Replace placeholder credentials with actual ones
    newContent = newContent.replace(
      /accessKeyId:\s*['"`][^'"`]*['"`]/g,
      `accessKeyId: '${ACTUAL_AWS_CREDENTIALS.accessKeyId}'`
    );
    newContent = newContent.replace(
      /secretAccessKey:\s*['"`][^'"`]*['"`]/g,
      `secretAccessKey: '${ACTUAL_AWS_CREDENTIALS.secretAccessKey}'`
    );
    newContent = newContent.replace(
      /region:\s*['"`][^'"`]*['"`]/g,
      `region: '${ACTUAL_AWS_CREDENTIALS.region}'`
    );

    // Replace environment variable references
    newContent = newContent.replace(
      /process\.env\.AWS_ACCESS_KEY_ID\s*\|\|\s*['"`][^'"`]*['"`]/g,
      `process.env.AWS_ACCESS_KEY_ID || '${ACTUAL_AWS_CREDENTIALS.accessKeyId}'`
    );
    newContent = newContent.replace(
      /process\.env\.AWS_SECRET_ACCESS_KEY\s*\|\|\s*['"`][^'"`]*['"`]/g,
      `process.env.AWS_SECRET_ACCESS_KEY || '${ACTUAL_AWS_CREDENTIALS.secretAccessKey}'`
    );
    newContent = newContent.replace(
      /process\.env\.AWS_REGION\s*\|\|\s*['"`][^'"`]*['"`]/g,
      `process.env.AWS_REGION || '${ACTUAL_AWS_CREDENTIALS.region}'`
    );

    if (newContent !== content) {
      this.writeFile(filePath, newContent);
    } else {
      console.log(`✅ ${filePath} - No changes needed`);
    }
  }

  /**
   * Create .env.aws file
   */
  createEnvAwsFile() {
    const envAwsPath = '.env.aws';
    console.log(`\n🔍 Creating: ${envAwsPath}`);
    
    const content = `# AWS Configuration
AWS_ACCESS_KEY_ID=${ACTUAL_AWS_CREDENTIALS.accessKeyId}
AWS_SECRET_ACCESS_KEY=${ACTUAL_AWS_CREDENTIALS.secretAccessKey}
AWS_REGION=${ACTUAL_AWS_CREDENTIALS.region}

# S3 Configuration
AWS_S3_BUCKET=${ACTUAL_AWS_CREDENTIALS.s3Bucket}

# SQS Configuration
AWS_SQS_QUEUE_URL=https://sqs.${ACTUAL_AWS_CREDENTIALS.region}.amazonaws.com/123456789012/ehb-test-queue

# SNS Configuration
AWS_SNS_TOPIC_ARN=arn:aws:sns:${ACTUAL_AWS_CREDENTIALS.region}:123456789012:ehb-test-topic

# Lambda Configuration
AWS_LAMBDA_FUNCTION=ehb-test-lambda

# DynamoDB Configuration
AWS_DYNAMODB_TABLE=ehb-test-table

# RDS Configuration
AWS_RDS_INSTANCE=ehb-test-db

# ElastiCache Configuration
AWS_ELASTICACHE_CLUSTER=ehb-test-cache`;

    this.writeFile(envAwsPath, content);
  }

  /**
   * Test AWS connection
   */
  async testAWSConnection() {
    console.log('\n🧪 Testing AWS Connection...');
    
    try {
      const s3 = new S3Client({
        region: ACTUAL_AWS_CREDENTIALS.region,
        credentials: {
          accessKeyId: ACTUAL_AWS_CREDENTIALS.accessKeyId,
          secretAccessKey: ACTUAL_AWS_CREDENTIALS.secretAccessKey,
        },
      });

      const command = new ListBucketsCommand({});
      const response = await s3.send(command);
      
      console.log('✅ AWS Connection Successful!');
      console.log('Available Buckets:', response.Buckets?.map(b => b.Name));
      return true;
    } catch (error) {
      console.error('❌ AWS Connection Failed:', error.message);
      this.issues.push(`AWS Connection Error: ${error.message}`);
      return false;
    }
  }

  /**
   * Run comprehensive check
   */
  async runCheck() {
    console.log('🚀 Starting Comprehensive AWS Configuration Check...\n');
    
    // Check all files
    for (const file of FILES_TO_CHECK) {
      if (file.endsWith('.json')) {
        this.checkJsonFile(file);
      } else if (file.includes('.env')) {
        this.checkEnvFile(file);
      } else if (file.endsWith('.js')) {
        this.checkJsFile(file);
      }
    }

    // Create .env.aws file
    this.createEnvAwsFile();

    // Test AWS connection
    await this.testAWSConnection();

    // Print summary
    console.log('\n📊 SUMMARY:');
    console.log('===========');
    
    if (this.fixes.length > 0) {
      console.log('\n✅ FIXES APPLIED:');
      this.fixes.forEach(fix => console.log(`  - ${fix}`));
    }
    
    if (this.issues.length > 0) {
      console.log('\n❌ ISSUES FOUND:');
      this.issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n✅ No issues found!');
    }

    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Restart your development server');
    console.log('2. Run: npm run dev');
    console.log('3. Test AWS functionality in your app');
    console.log('4. If issues persist, check AWS Console for key status');
  }
}

// Run the checker
const checker = new AWSConfigChecker();
checker.runCheck().catch(console.error); 