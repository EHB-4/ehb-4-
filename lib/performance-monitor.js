const fs = require('fs');
const path = require('path');

class PerformanceMonitor {
  constructor() {
    this.metricsFile = path.join(process.cwd(), 'logs', 'performance-metrics.json');
  }

  logMetric(name, value, unit = 'ms') {
    const metric = {
      timestamp: new Date().toISOString(),
      name,
      value,
      unit
    };

    let metrics = [];
    if (fs.existsSync(this.metricsFile)) {
      metrics = JSON.parse(fs.readFileSync(this.metricsFile, 'utf8'));
    }

    metrics.push(metric);
    fs.writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));
  }

  measurePageLoad(page, loadTime) {
    this.logMetric(`page_load_${page}`, loadTime);
  }

  measureAPICall(endpoint, responseTime) {
    this.logMetric(`api_call_${endpoint}`, responseTime);
  }

  measureDatabaseQuery(query, executionTime) {
    this.logMetric(`db_query_${query}`, executionTime);
  }
}

module.exports = PerformanceMonitor;
