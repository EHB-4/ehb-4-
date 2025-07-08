const axios = require('axios');
const config = require('./config');
const { createLogger, format, transports } = require('winston');
const { loadCredentials } = require('./credentials-loader');

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: config.logFile }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

class CloudFailoverService {
  constructor() {
    this.primary = config.primary;
    this.secondary = config.secondary;
    this.currentProvider = this.primary.name;
    this.credentials = loadCredentials();
  }

  async executeRequest(endpoint, method = 'GET', data = null) {
    try {
      logger.info(`Attempting request to ${this.currentProvider} cloud`);

      // Try primary cloud first
      let response = await this.makeRequest(this.primary.apiUrl + endpoint, method, data);

      logger.info(`Successfully executed request on ${this.primary.name}`);
      return response;
    } catch (primaryError) {
      logger.error(`Primary cloud (${this.primary.name}) failed:`, primaryError);

      // Fall back to secondary cloud
      logger.info(`Falling back to secondary cloud (${this.secondary.name})`);

      try {
        response = await this.makeRequest(this.secondary.apiUrl + endpoint, method, data);

        logger.info(`Successfully executed request on ${this.secondary.name}`);
        return response;
      } catch (secondaryError) {
        logger.error(`Secondary cloud (${this.secondary.name}) failed:`, secondaryError);
        throw new Error(
          `Both clouds failed: ${primaryError.message} and ${secondaryError.message}`
        );
      }
    }
  }

  async makeRequest(url, method, data) {
    const provider = this.currentProvider === 'google' ? 'google' : 'aws';
    const credentials = this.credentials[provider];

    const config = {
      method,
      url,
      data,
      timeout: this.currentProvider === 'google' ? this.primary.timeout : this.secondary.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.apiKey}`,
      },
    };

    if (provider === 'aws') {
      config.auth = {
        username: credentials.accessKeyId,
        password: credentials.secretAccessKey,
      };
    }

    return await axios(config);
  }

  async checkHealth() {
    try {
      const [googleHealth, awsHealth] = await Promise.all([
        axios.get(this.primary.apiUrl + config.healthCheck.google),
        axios.get(this.secondary.apiUrl + config.healthCheck.aws),
      ]);

      logger.info('Health check results:', {
        google: googleHealth.data,
        aws: awsHealth.data,
      });

      return {
        google: googleHealth.data,
        aws: awsHealth.data,
      };
    } catch (error) {
      logger.error('Health check failed:', error);
      return {
        error: error.message,
      };
    }
  }
}

module.exports = new CloudFailoverService();
