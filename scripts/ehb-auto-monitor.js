#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class EHBAutoMonitor {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/ehb-monitor.log');
    this.ports = [3001, 3002, 3003, 3004, 3005];
    this.isMonitoring = false;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  async checkPort(port) {
    return new Promise((resolve) => {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        resolve(!error && stdout.trim() !== '');
      });
    });
  }

  async monitorPorts() {
    this.log('🔍 Checking port status...');
    
    for (const port of this.ports) {
      const isActive = await this.checkPort(port);
      const status = isActive ? '✅ Active' : '❌ Inactive';
      this.log(`Port ${port}: ${status}`);
    }
  }

  start() {
    this.isMonitoring = true;
    this.log('🚀 Starting EHB Auto Monitor...');
    
    setInterval(() => {
      if (this.isMonitoring) {
        this.monitorPorts();
      }
    }, 30000); // Check every 30 seconds
  }

  stop() {
    this.isMonitoring = false;
    this.log('🛑 Stopping EHB Auto Monitor...');
  }
}

const monitor = new EHBAutoMonitor();
monitor.start();

process.on('SIGINT', () => {
  monitor.stop();
  process.exit(0);
});