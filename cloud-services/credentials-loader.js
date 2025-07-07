const fs = require('fs');
const path = require('path');

// Load credentials from file
function loadCredentialsFromFile(filePath) {
  try {
    const credentialsPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`Credentials file not found at ${credentialsPath}`);
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    return credentials;
  } catch (error) {
    console.error('Error loading credentials:', error);
    throw error;
  }
}

// Load credentials from environment variables
function loadCredentialsFromEnv() {
  return {
    google: {
      apiKey: process.env.GCP_API_KEY,
      projectId: process.env.GCP_PROJECT_ID,
      region: process.env.GCP_REGION || 'us-central1',
    },
    aws: {
      apiKey: process.env.AWS_API_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
    },
  };
}

// Main credentials loader
function loadCredentials() {
  try {
    // First try to load from file
    const fileCredentials = loadCredentialsFromFile('cloud-credentials.json');
    return fileCredentials;
  } catch (error) {
    console.log('No credentials file found, falling back to environment variables');
    return loadCredentialsFromEnv();
  }
}

module.exports = {
  loadCredentials,
};
