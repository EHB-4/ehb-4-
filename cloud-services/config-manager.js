const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration manager for secure credentials
const configManager = {
  // Load credentials from environment variables
  getCredentials: () => {
    return {
      google: {
        apiKey: process.env.GCP_API_KEY,
        projectId: process.env.GCP_PROJECT_ID,
        region: process.env.GCP_REGION || 'us-central1',
      },
      aws: {
        apiKey: process.env.AWS_API_KEY,
        region: process.env.AWS_REGION || 'ap-south-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };
  },

  // Validate credentials
  validateCredentials: () => {
    const credentials = this.getCredentials();

    const errors = [];

    // Validate Google credentials
    if (!credentials.google.apiKey) {
      errors.push('Google API Key is missing');
    }
    if (!credentials.google.projectId) {
      errors.push('Google Project ID is missing');
    }

    // Validate AWS credentials
    if (!credentials.aws.apiKey) {
      errors.push('AWS API Key is missing');
    }
    if (!credentials.aws.accessKeyId) {
      errors.push('AWS Access Key ID is missing');
    }
    if (!credentials.aws.secretAccessKey) {
      errors.push('AWS Secret Access Key is missing');
    }

    if (errors.length > 0) {
      throw new Error(`Missing credentials: ${errors.join(', ')}`);
    }

    return true;
  },

  // Get specific service credentials
  getServiceCredentials: service => {
    const credentials = this.getCredentials();
    if (!credentials[service]) {
      throw new Error(`Service ${service} not configured`);
    }
    return credentials[service];
  },
};

module.exports = configManager;
