const fs = require('fs');
const path = require('path');

class PerformanceMonitor {
  constructor() {
    this.projectRoot = process.cwd();
    this.metrics = new Map();
    this.startTime = Date.now();
  }

  startMonitoring() {
    console.log('📊 Performance monitoring started...');

    setInterval(() => {
      this.monitorMemory();
    }, 5000);

    setInterval(() => {
      this.monitorCPU();
    }, 10000);

    setInterval(() => {
      this.autoOptimize();
    }, 30000);
  }

  monitorMemory() {
    const memUsage = process.memoryUsage();
    this.metrics.set('memory', {
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      timestamp: Date.now(),
    });

    if (memUsage.heapUsed > 2 * 1024 * 1024 * 1024) {
      console.log('⚠️ High memory usage detected');
      if (global.gc) global.gc();
    }
  }

  monitorCPU() {
    const startUsage = process.cpuUsage();
    setTimeout(() => {
      const endUsage = process.cpuUsage(startUsage);
      this.metrics.set('cpu', {
        user: endUsage.user,
        system: endUsage.system,
        timestamp: Date.now(),
      });
    }, 100);
  }

  autoOptimize() {
    const memory = this.metrics.get('memory');
    if (memory && memory.heapUsed > 1.5 * 1024 * 1024 * 1024) {
      console.log('🔧 Auto-optimizing memory...');
      if (global.gc) global.gc();
    }
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}

module.exports = PerformanceMonitor;
