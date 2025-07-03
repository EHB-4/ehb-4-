import fs from 'fs';
import path from 'path';

class PerformanceMonitor {
  private metricsFile: string;

  constructor() {
    this.metricsFile = path.join(process.cwd(), 'logs', 'performance-metrics.json');
  }

  logMetric(name: string, value: number, unit: string = 'ms') {
    const metric = {
      timestamp: new Date().toISOString(),
      name,
      value,
      unit,
    };

    let metrics: any[] = [];
    if (fs.existsSync(this.metricsFile)) {
      metrics = JSON.parse(fs.readFileSync(this.metricsFile, 'utf8'));
    }

    metrics.push(metric);
    fs.writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));
  }

  measurePageLoad(page: string, loadTime: number) {
    this.logMetric(`page_load_${page}`, loadTime);
  }

  measureAPICall(endpoint: string, responseTime: number) {
    this.logMetric(`api_call_${endpoint}`, responseTime);
  }

  measureDatabaseQuery(query: string, executionTime: number) {
    this.logMetric(`db_query_${query}`, executionTime);
  }
}

export default PerformanceMonitor;
