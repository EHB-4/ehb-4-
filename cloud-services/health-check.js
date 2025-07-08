const failoverService = require('./failover-service');

async function googleHealthCheck(req, res) {
  try {
    // Check Google Cloud health
    const response = await failoverService.makeRequest('/health', 'GET');

    res.status(200).json({
      status: 'healthy',
      provider: 'google',
      timestamp: new Date().toISOString(),
      responseTime: response.headers['x-response-time'],
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      provider: 'google',
    });
  }
}

async function awsHealthCheck(req, res) {
  try {
    // Check AWS health
    const response = await failoverService.makeRequest('/health', 'GET');

    res.status(200).json({
      status: 'healthy',
      provider: 'aws',
      timestamp: new Date().toISOString(),
      responseTime: response.headers['x-response-time'],
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      provider: 'aws',
    });
  }
}

module.exports = {
  googleHealthCheck,
  awsHealthCheck,
};
