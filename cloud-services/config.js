require('dotenv').config();

const config = {
  // Primary Cloud (Google Cloud)
  primary: {
    name: 'google',
    apiUrl: process.env.GCP_DB_API || 'https://gcp-api.ehb.com',
    timeout: 5000, // 5 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // Secondary Cloud (AWS)
  secondary: {
    name: 'aws',
    apiUrl: process.env.AWS_DB_API || 'https://aws-api.ehb.com',
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Health check endpoints
  healthCheck: {
    google: '/api/google-health',
    aws: '/api/aws-health',
  },

  // Logging
  logLevel: process.env.CLOUD_LOG_LEVEL || 'info',
  logFile: process.env.CLOUD_LOG_FILE || 'logs/cloud-failover.log',
};

module.exports = config;
