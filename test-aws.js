require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

const s3 = new AWS.S3();

s3.listBuckets((err, data) => {
  if (err) {
    console.error('❌ AWS S3 Error:', err);
  } else {
    console.log('✅ AWS S3 Buckets:', data.Buckets);
  }
});
