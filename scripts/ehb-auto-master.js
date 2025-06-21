const AutoTestMonitor = require('./auto-test-monitor');
const AutoDeployMonitor = require('./auto-deploy-monitor');
const AutoErrorChecker = require('./auto-error-checker');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

class EHBAutoMaster {
  constructor() {
    this.testMonitor = null;
    this.deployMonitor = null;
    this.errorChecker = null;
    this.isRunning = false;
    this.masterLog = [];
    this.logFile = './logs/master-log.json';
    this.statusFile = './logs/master-status.json';

    this.ensureDirectories();
    this.loadStatus();
  }

  ensureDirectories() {
    const dirs = ['./logs', './reports', './screenshots', './backups'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  loadStatus() {
    try {
      if (fs.existsSync(this.statusFile)) {
        this.status = JSON.parse(fs.readFileSync(this.statusFile, 'utf8'));
      } else {
        this.status = {
          lastStart: null,
          totalRuns: 0,
          successfulRuns: 0,
          failedRuns: 0,
          lastError: null,
          components: {
            testMonitor: false,
            deployMonitor: false,
            errorChecker: false,
          },
        };
      }
    } catch (error) {
      console.error('Failed to load status:', error);
      this.status = {
        lastStart: null,
        totalRuns: 0,
        successfulRuns: 0,
        failedRuns: 0,
        lastError: null,
        components: {
          testMonitor: false,
          deployMonitor: false,
          errorChecker: false,
        },
      };
    }
  }

  saveStatus() {
    try {
      fs.writeFileSync(this.statusFile, JSON.stringify(this.status, null, 2));
    } catch (error) {
      console.error('Failed to save status:', error);
    }
  }

  log(message, type = 'info', component = 'master') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, type, component, message };

    this.masterLog.push(logEntry);
    console.log(`[${timestamp}] [${component.toUpperCase()}] [${type.toUpperCase()}] ${message}`);

    // Save to log file
    try {
      fs.writeFileSync(this.logFile, JSON.stringify(this.masterLog, null, 2));
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  }

  async initialize() {
    this.log('🚀 Initializing EHB Auto Master System...');

    try {
      // Initialize all components
      this.testMonitor = new AutoTestMonitor();
      this.deployMonitor = new AutoDeployMonitor();
      this.errorChecker = new AutoErrorChecker();

      // Initialize test monitor
      const testInit = await this.testMonitor.initialize();
      this.status.components.testMonitor = testInit;
      this.log(`Test Monitor: ${testInit ? '✅' : '❌'}`, testInit ? 'success' : 'error');

      // Initialize error checker
      const errorInit = await this.errorChecker.initialize();
      this.status.components.errorChecker = errorInit;
      this.log(`Error Checker: ${errorInit ? '✅' : '❌'}`, errorInit ? 'success' : 'error');

      this.saveStatus();

      const allInitialized = testInit && errorInit;
      this.log(`System initialization: ${allInitialized ? '✅ Complete' : '❌ Failed'}`);

      return allInitialized;
    } catch (error) {
      this.log(`Initialization failed: ${error.message}`, 'error');
      this.status.lastError = error.message;
      this.saveStatus();
      return false;
    }
  }

  async runFullCycle() {
    this.log('🔄 Starting full automation cycle...');
    this.status.totalRuns++;
    this.status.lastStart = new Date().toISOString();

    try {
      // Step 1: Deploy and build
      this.log('📦 Step 1: Deploying application...');
      const deploySuccess = await this.deployMonitor.deploy();

      if (!deploySuccess) {
        throw new Error('Deployment failed');
      }

      // Step 2: Run comprehensive tests
      this.log('🧪 Step 2: Running comprehensive tests...');
      await this.testMonitor.runAllTests();
      const testReport = await this.testMonitor.generateReport();

      // Step 3: Run error checking
      this.log('🚨 Step 3: Checking for errors...');
      await this.errorChecker.runErrorCheck();
      const errorReport = this.errorChecker.generateErrorReport();

      // Step 4: Generate master report
      this.log('📊 Step 4: Generating master report...');
      const masterReport = this.generateMasterReport(testReport, errorReport);

      // Step 5: Send notifications if needed
      this.log('📧 Step 5: Sending notifications...');
      await this.sendNotifications(masterReport);

      this.status.successfulRuns++;
      this.log('✅ Full cycle completed successfully');
    } catch (error) {
      this.status.failedRuns++;
      this.status.lastError = error.message;
      this.log(`❌ Full cycle failed: ${error.message}`, 'error');

      // Send error notification
      await this.sendErrorNotification(error);
    }

    this.saveStatus();
  }

  generateMasterReport(testReport, errorReport) {
    const report = {
      timestamp: new Date().toISOString(),
      cycle: this.status.totalRuns,
      deployment: {
        success: true,
        timestamp: new Date().toISOString(),
      },
      testing: testReport,
      errors: errorReport,
      summary: {
        totalTests: testReport?.totalTests || 0,
        passedTests: testReport?.passedTests || 0,
        failedTests: testReport?.failedTests || 0,
        totalErrors: errorReport?.totalErrors || 0,
        criticalErrors: errorReport?.errorsBySeverity?.critical || 0,
        highErrors: errorReport?.errorsBySeverity?.high || 0,
        systemHealth: this.calculateSystemHealth(testReport, errorReport),
      },
    };

    const reportFile = `./reports/master-report-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

    this.log(`📊 Master report generated: ${reportFile}`);
    return report;
  }

  calculateSystemHealth(testReport, errorReport) {
    const testSuccessRate =
      testReport?.totalTests > 0 ? (testReport.passedTests / testReport.totalTests) * 100 : 100;

    const errorScore = errorReport?.totalErrors || 0;
    const criticalErrors = errorReport?.errorsBySeverity?.critical || 0;

    if (criticalErrors > 0) return 'critical';
    if (errorScore > 10) return 'poor';
    if (testSuccessRate < 80) return 'fair';
    if (testSuccessRate < 95) return 'good';
    return 'excellent';
  }

  async sendNotifications(report) {
    if (
      report.summary.systemHealth === 'critical' ||
      report.summary.criticalErrors > 0 ||
      report.summary.failedTests > 0
    ) {
      await this.sendAlertNotification(report);
    } else if (report.summary.systemHealth === 'excellent') {
      await this.sendSuccessNotification(report);
    }
  }

  async sendAlertNotification(report) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      this.log('⚠️ Email credentials not configured, skipping alert notification', 'warning');
      return;
    }

    try {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL || process.env.EMAIL_USER,
        subject: `🚨 EHB System Alert - Cycle ${report.cycle} - ${report.summary.systemHealth.toUpperCase()}`,
        html: `
          <h2>🚨 EHB System Alert</h2>
          <p><strong>Cycle:</strong> ${report.cycle}</p>
          <p><strong>Time:</strong> ${new Date(report.timestamp).toLocaleString()}</p>
          <p><strong>System Health:</strong> <span style="color: red;">${report.summary.systemHealth.toUpperCase()}</span></p>
          
          <h3>Test Results:</h3>
          <p>✅ Passed: ${report.summary.passedTests}</p>
          <p>❌ Failed: ${report.summary.failedTests}</p>
          <p>📊 Success Rate: ${((report.summary.passedTests / report.summary.totalTests) * 100).toFixed(1)}%</p>
          
          <h3>Error Summary:</h3>
          <p>🚨 Critical: ${report.summary.criticalErrors}</p>
          <p>⚠️ High: ${report.summary.highErrors}</p>
          <p>📝 Total: ${report.summary.totalErrors}</p>
          
          <p><strong>Action Required:</strong> Please check the application immediately.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      this.log('📧 Alert notification sent');
    } catch (error) {
      this.log(`❌ Failed to send alert notification: ${error.message}`, 'error');
    }
  }

  async sendSuccessNotification(report) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return;
    }

    try {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL || process.env.EMAIL_USER,
        subject: `✅ EHB System Status - Cycle ${report.cycle} - EXCELLENT`,
        html: `
          <h2>✅ EHB System Status - Excellent</h2>
          <p><strong>Cycle:</strong> ${report.cycle}</p>
          <p><strong>Time:</strong> ${new Date(report.timestamp).toLocaleString()}</p>
          <p><strong>System Health:</strong> <span style="color: green;">EXCELLENT</span></p>
          
          <h3>Test Results:</h3>
          <p>✅ All tests passed: ${report.summary.passedTests}/${report.summary.totalTests}</p>
          <p>📊 Success Rate: 100%</p>
          
          <h3>Error Status:</h3>
          <p>✅ No critical errors</p>
          <p>✅ No high priority errors</p>
          <p>📝 Total errors: ${report.summary.totalErrors}</p>
          
          <p><strong>Status:</strong> System is running perfectly! 🎉</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      this.log('📧 Success notification sent');
    } catch (error) {
      this.log(`❌ Failed to send success notification: ${error.message}`, 'error');
    }
  }

  async sendErrorNotification(error) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return;
    }

    try {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL || process.env.EMAIL_USER,
        subject: `💥 EHB System Failure - Cycle ${this.status.totalRuns}`,
        html: `
          <h2>💥 EHB System Failure</h2>
          <p><strong>Cycle:</strong> ${this.status.totalRuns}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Error:</strong> ${error.message}</p>
          
          <p><strong>Action Required:</strong> Immediate attention needed!</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      this.log('📧 Error notification sent');
    } catch (emailError) {
      this.log(`❌ Failed to send error notification: ${emailError.message}`, 'error');
    }
  }

  async startContinuousMonitoring() {
    if (this.isRunning) {
      this.log('⚠️ Continuous monitoring is already running');
      return;
    }

    this.isRunning = true;
    this.log('🔄 Starting continuous monitoring...');

    // Initial cycle
    await this.runFullCycle();

    // Start continuous monitoring
    const cycleInterval = 10 * 60 * 1000; // 10 minutes

    while (this.isRunning) {
      try {
        await new Promise(resolve => setTimeout(resolve, cycleInterval));

        if (this.isRunning) {
          await this.runFullCycle();
        }
      } catch (error) {
        this.log(`❌ Monitoring cycle failed: ${error.message}`, 'error');
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute before retry
      }
    }
  }

  async stopMonitoring() {
    this.isRunning = false;
    this.log('🛑 Stopping continuous monitoring...');

    if (this.testMonitor) {
      await this.testMonitor.stopMonitoring();
    }

    if (this.errorChecker) {
      await this.errorChecker.stopChecking();
    }

    if (this.deployMonitor) {
      await this.deployMonitor.stopMonitoring();
    }
  }

  getSystemStatus() {
    return {
      ...this.status,
      isRunning: this.isRunning,
      components: {
        ...this.status.components,
        master: this.isRunning,
      },
    };
  }

  async runQuickTest() {
    this.log('⚡ Running quick test...');

    try {
      await this.testMonitor.runAllTests();
      const testReport = await this.testMonitor.generateReport();

      await this.errorChecker.runErrorCheck();
      const errorReport = this.errorChecker.generateErrorReport();

      const quickReport = this.generateMasterReport(testReport, errorReport);

      this.log('✅ Quick test completed');
      return quickReport;
    } catch (error) {
      this.log(`❌ Quick test failed: ${error.message}`, 'error');
      throw error;
    }
  }
}

// CLI Interface
async function main() {
  const master = new EHBAutoMaster();

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    await master.stopMonitoring();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    await master.stopMonitoring();
    process.exit(0);
  });

  const args = process.argv.slice(2);

  if (args.includes('--init')) {
    const initialized = await master.initialize();
    if (initialized) {
      console.log('✅ EHB Auto Master initialized successfully');
    } else {
      console.log('❌ Failed to initialize EHB Auto Master');
      process.exit(1);
    }
  } else if (args.includes('--cycle')) {
    await master.initialize();
    await master.runFullCycle();
    await master.stopMonitoring();
  } else if (args.includes('--monitor')) {
    await master.initialize();
    await master.startContinuousMonitoring();
  } else if (args.includes('--stop')) {
    await master.stopMonitoring();
  } else if (args.includes('--status')) {
    const status = master.getSystemStatus();
    console.log('System Status:', JSON.stringify(status, null, 2));
  } else if (args.includes('--quick-test')) {
    await master.initialize();
    const report = await master.runQuickTest();
    console.log('Quick Test Report:', JSON.stringify(report, null, 2));
    await master.stopMonitoring();
  } else {
    console.log(`
🤖 EHB Auto Master System

Usage:
  node ehb-auto-master.js --init        Initialize the master system
  node ehb-auto-master.js --cycle       Run one full automation cycle
  node ehb-auto-master.js --monitor     Start continuous monitoring
  node ehb-auto-master.js --stop        Stop monitoring
  node ehb-auto-master.js --status      Show system status
  node ehb-auto-master.js --quick-test  Run quick test

Features:
  ✅ Complete automation system
  ✅ Deployment management
  ✅ Comprehensive testing
  ✅ Error monitoring
  ✅ Performance tracking
  ✅ Email notifications
  ✅ Continuous monitoring
  ✅ Detailed reporting
  ✅ System health assessment
  ✅ Automatic error recovery
    `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = EHBAutoMaster;
