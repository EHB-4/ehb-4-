#!/usr/bin/env node

/**
 * EHB Franchise Auto Manager
 * Coordinates franchise scanning, merging, and system integration
 * 
 * Features:
 * - Auto-starts franchise scanner
 * - Manages system integration
 * - Handles data synchronization
 * - Provides REST API for control
 * - Real-time monitoring dashboard
 * - Automatic error recovery
 */

const FranchiseAutoScanner = require('./franchise-auto-scanner');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

class FranchiseAutoManager {
  constructor() {
    this.scanner = new FranchiseAutoScanner();
    this.app = express();
    this.server = null;
    this.port = process.env.FRANCHISE_MANAGER_PORT || 3001;
    
    this.config = {
      autoStart: true,
      autoRecovery: true,
      recoveryInterval: 60000, // 1 minute
      maxRetries: 3,
      healthCheckInterval: 30000, // 30 seconds
      logFile: './logs/franchise-manager.log'
    };

    this.status = {
      isRunning: false,
      startTime: null,
      lastHealthCheck: null,
      retryCount: 0,
      errors: [],
      performance: {
        uptime: 0,
        scansCompleted: 0,
        mergesCompleted: 0,
        backupsCompleted: 0
      }
    };

    this.recoveryTimer = null;
    this.healthTimer = null;
  }

  /**
   * Initialize the auto manager
   */
  async initialize() {
    console.log('🚀 Initializing EHB Franchise Auto Manager...');
    
    try {
      // Setup logging
      await this.setupLogging();
      
      // Setup Express server
      await this.setupServer();
      
      // Initialize scanner
      await this.scanner.initialize();
      
      // Start auto management
      if (this.config.autoStart) {
        await this.start();
      }
      
      // Start health monitoring
      this.startHealthMonitoring();
      
      // Start auto recovery
      if (this.config.autoRecovery) {
        this.startAutoRecovery();
      }
      
      console.log('✅ Franchise Auto Manager initialized successfully');
      this.log('INFO', 'Franchise Auto Manager initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize Franchise Auto Manager:', error);
      this.log('ERROR', `Initialization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Setup logging
   */
  async setupLogging() {
    const logDir = path.dirname(this.config.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    if (!fs.existsSync(this.config.logFile)) {
      fs.writeFileSync(this.config.logFile, '');
    }
  }

  /**
   * Log messages
   */
  log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    
    fs.appendFileSync(this.config.logFile, logEntry);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level}] ${message}`);
    }
  }

  /**
   * Setup Express server
   */
  async setupServer() {
    this.app.use(cors());
    this.app.use(express.json());
    
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: this.status.uptime,
        scanner: this.scanner.getStatus()
      });
    });

    // Status endpoint
    this.app.get('/status', (req, res) => {
      res.json({
        manager: this.status,
        scanner: this.scanner.getStatus()
      });
    });

    // Control endpoints
    this.app.post('/start', async (req, res) => {
      try {
        await this.start();
        res.json({ success: true, message: 'Manager started successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    this.app.post('/stop', async (req, res) => {
      try {
        await this.stop();
        res.json({ success: true, message: 'Manager stopped successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    this.app.post('/restart', async (req, res) => {
      try {
        await this.restart();
        res.json({ success: true, message: 'Manager restarted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // Manual scan endpoint
    this.app.post('/scan', async (req, res) => {
      try {
        await this.scanner.performFullScan();
        res.json({ success: true, message: 'Manual scan completed' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // Manual backup endpoint
    this.app.post('/backup', async (req, res) => {
      try {
        await this.scanner.performBackup();
        res.json({ success: true, message: 'Manual backup completed' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // Reports endpoint
    this.app.get('/reports', (req, res) => {
      try {
        const reportsDir = './reports/franchise';
        if (fs.existsSync(reportsDir)) {
          const reports = fs.readdirSync(reportsDir)
            .filter(file => file.endsWith('.json'))
            .map(file => ({
              name: file,
              path: `/reports/franchise/${file}`,
              size: fs.statSync(path.join(reportsDir, file)).size,
              modified: fs.statSync(path.join(reportsDir, file)).mtime
            }));
          res.json(reports);
        } else {
          res.json([]);
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // Serve static files
    this.app.use('/reports', express.static('./reports'));

    // Error handling middleware
    this.app.use((error, req, res, next) => {
      this.log('ERROR', `API Error: ${error.message}`);
      res.status(500).json({ success: false, error: error.message });
    });
  }

  /**
   * Start the manager
   */
  async start() {
    if (this.status.isRunning) {
      this.log('WARN', 'Manager is already running');
      return;
    }

    try {
      this.log('INFO', 'Starting Franchise Auto Manager...');
      
      // Start Express server
      this.server = this.app.listen(this.port, () => {
        console.log(`🌐 Franchise Auto Manager API running on port ${this.port}`);
        this.log('INFO', `API server started on port ${this.port}`);
      });

      this.status.isRunning = true;
      this.status.startTime = new Date().toISOString();
      this.status.retryCount = 0;
      
      this.log('INFO', 'Franchise Auto Manager started successfully');
      
    } catch (error) {
      this.log('ERROR', `Failed to start manager: ${error.message}`);
      throw error;
    }
  }

  /**
   * Stop the manager
   */
  async stop() {
    if (!this.status.isRunning) {
      this.log('WARN', 'Manager is not running');
      return;
    }

    try {
      this.log('INFO', 'Stopping Franchise Auto Manager...');
      
      // Stop Express server
      if (this.server) {
        this.server.close();
      }
      
      // Stop scanner
      await this.scanner.stop();
      
      // Clear timers
      if (this.recoveryTimer) {
        clearInterval(this.recoveryTimer);
      }
      
      if (this.healthTimer) {
        clearInterval(this.healthTimer);
      }
      
      this.status.isRunning = false;
      this.status.uptime = 0;
      
      this.log('INFO', 'Franchise Auto Manager stopped successfully');
      
    } catch (error) {
      this.log('ERROR', `Failed to stop manager: ${error.message}`);
      throw error;
    }
  }

  /**
   * Restart the manager
   */
  async restart() {
    this.log('INFO', 'Restarting Franchise Auto Manager...');
    
    await this.stop();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    await this.start();
    
    this.log('INFO', 'Franchise Auto Manager restarted successfully');
  }

  /**
   * Start health monitoring
   */
  startHealthMonitoring() {
    this.healthTimer = setInterval(() => {
      this.performHealthCheck();
    }, this.config.healthCheckInterval);
    
    this.log('INFO', `Health monitoring started (${this.config.healthCheckInterval}ms interval)`);
  }

  /**
   * Perform health check
   */
  async performHealthCheck() {
    try {
      const scannerStatus = this.scanner.getStatus();
      
      // Check if scanner is running
      if (!scannerStatus.isRunning) {
        this.log('WARN', 'Scanner is not running, attempting recovery...');
        await this.recoverScanner();
      }
      
      // Update uptime
      if (this.status.startTime) {
        this.status.uptime = Date.now() - new Date(this.status.startTime).getTime();
      }
      
      this.status.lastHealthCheck = new Date().toISOString();
      
    } catch (error) {
      this.log('ERROR', `Health check failed: ${error.message}`);
      this.status.errors.push({
        timestamp: new Date().toISOString(),
        type: 'health_check_error',
        error: error.message
      });
    }
  }

  /**
   * Start auto recovery
   */
  startAutoRecovery() {
    this.recoveryTimer = setInterval(() => {
      this.performAutoRecovery();
    }, this.config.recoveryInterval);
    
    this.log('INFO', `Auto recovery started (${this.config.recoveryInterval}ms interval)`);
  }

  /**
   * Perform auto recovery
   */
  async performAutoRecovery() {
    try {
      const scannerStatus = this.scanner.getStatus();
      
      // Check for errors
      if (scannerStatus.errors.length > 0) {
        this.log('WARN', `Found ${scannerStatus.errors.length} scanner errors, attempting recovery...`);
        await this.recoverScanner();
      }
      
      // Check for high error count
      if (this.status.errors.length > 10) {
        this.log('WARN', 'High error count detected, restarting manager...');
        await this.restart();
      }
      
    } catch (error) {
      this.log('ERROR', `Auto recovery failed: ${error.message}`);
    }
  }

  /**
   * Recover scanner
   */
  async recoverScanner() {
    if (this.status.retryCount >= this.config.maxRetries) {
      this.log('ERROR', 'Max retry count reached, stopping recovery attempts');
      return;
    }

    try {
      this.status.retryCount++;
      this.log('INFO', `Attempting scanner recovery (attempt ${this.status.retryCount})`);
      
      // Restart scanner
      await this.scanner.stop();
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      await this.scanner.initialize();
      
      this.log('INFO', 'Scanner recovery successful');
      this.status.retryCount = 0;
      
    } catch (error) {
      this.log('ERROR', `Scanner recovery failed: ${error.message}`);
    }
  }

  /**
   * Get manager status
   */
  getStatus() {
    return {
      ...this.status,
      scanner: this.scanner.getStatus(),
      config: this.config
    };
  }

  /**
   * Generate system report
   */
  async generateSystemReport() {
    const report = {
      timestamp: new Date().toISOString(),
      manager: this.status,
      scanner: this.scanner.getStatus(),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      }
    };

    const reportPath = `./reports/franchise/system-report-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.log('INFO', `System report generated: ${reportPath}`);
    return reportPath;
  }
}

// Auto-start the manager
const manager = new FranchiseAutoManager();

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await manager.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await manager.stop();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('❌ Uncaught Exception:', error);
  manager.log('ERROR', `Uncaught Exception: ${error.message}`);
  await manager.stop();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  manager.log('ERROR', `Unhandled Rejection: ${reason}`);
});

// Start the manager
manager.initialize().catch(error => {
  console.error('❌ Failed to start Franchise Auto Manager:', error);
  process.exit(1);
});

// Export for use in other modules
module.exports = FranchiseAutoManager; 