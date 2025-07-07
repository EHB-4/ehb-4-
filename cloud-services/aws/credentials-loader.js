const { fromEnv } = require('@aws-sdk/credential-provider-env');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { fromProcess } = require('@aws-sdk/credential-provider-process');
const { fromSSO } = require('@aws-sdk/credential-provider-sso');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');

function loadCredentials() {
  try {
    // Use AWS SDK v3's default credential provider chain
    const credentials = defaultProvider({
      profile: process.env.AWS_PROFILE,
      region: process.env.AWS_REGION || 'ap-south-1',
    })();

    // Also check for environment variables
    const envCreds = fromEnv()();
    if (envCreds) {
      return {
        aws: {
          accessKeyId: envCreds.accessKeyId,
          secretAccessKey: envCreds.secretAccessKey,
          region: process.env.AWS_REGION || 'ap-south-1',
        },
      };
    }

    // Fallback to AWS CLI credentials
    const iniCreds = fromIni()();
    if (iniCreds) {
      return {
        aws: {
          accessKeyId: iniCreds.accessKeyId,
          secretAccessKey: iniCreds.secretAccessKey,
          region: process.env.AWS_REGION || 'ap-south-1',
        },
      };
    }

    // If no credentials found, throw error
    throw new Error('No AWS credentials found');
  } catch (error) {
    console.error('Error loading AWS credentials:', error.message);
    throw error;
  }
}

module.exports = {
  loadCredentials,
};
