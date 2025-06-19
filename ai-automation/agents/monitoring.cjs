const fs = require('fs');
const path = require('path');

class EHBMonitoring {
  constructor() {
    this.logsDir = path.join(process.cwd(), 'logs');
    this.metricsFile = path.join(this.logsDir, 'metrics.json');
  }

  logMetric(type, data) {
    const timestamp = new Date().toISOString();
    const metric = {
      timestamp,
      type,
      data
    };

    let metrics = [];
    if (fs.existsSync(this.metricsFile)) {
      metrics = JSON.parse(fs.readFileSync(this.metricsFile, 'utf8'));
    }

    metrics.push(metric);
    fs.writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));
  }

  logError(error) {
    this.logMetric('error', {
      message: error.message,
      stack: error.stack
    });
  }

  logPerformance(operation, duration) {
    this.logMetric('performance', {
      operation,
      duration
    });
  }

  logUsage(feature) {
    this.logMetric('usage', {
      feature
    });
  }
}

module.exports = EHBMonitoring;
