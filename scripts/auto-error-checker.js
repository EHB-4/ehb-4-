const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

class AutoErrorChecker {
  constructor() {
    this.browser = null;
    this.page = null;
    this.isRunning = false;
    this.errorHistory = [];
    this.alertThreshold = 5; // Number of errors before alert
    this.checkInterval = 30 * 1000; // 30 seconds
    this.baseUrl = 'http://localhost:3000';
    this.logFile = './logs/error-log.json';
    this.alertFile = './logs/alert-log.json';

    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = ['./logs', './error-screenshots', './error-reports'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, type, message };

    console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);

    // Save to log file
    const logs = this.loadLogs();
    logs.push(logEntry);
    fs.writeFileSync(this.logFile, JSON.stringify(logs, null, 2));
  }

  loadLogs() {
    try {
      if (fs.existsSync(this.logFile)) {
        return JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
    return [];
  }

  async initialize() {
    try {
      this.log('🚀 Initializing Auto Error Checker...');

      this.browser = await puppeteer.launch({
        headless: true, // Run in background
        defaultViewport: { width: 1920, height: 1080 },
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
        ],
      });

      this.page = await this.browser.newPage();

      // Set up error listeners
      this.setupErrorListeners();

      this.log('✅ Error checker initialized successfully');
      return true;
    } catch (error) {
      this.log(`❌ Failed to initialize error checker: ${error.message}`, 'error');
      return false;
    }
  }

  setupErrorListeners() {
    // Console errors
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.handleError('console', msg.text(), this.page.url());
      }
    });

    // Page errors
    this.page.on('pageerror', error => {
      this.handleError('pageerror', error.message, this.page.url(), error.stack);
    });

    // Request failures
    this.page.on('requestfailed', request => {
      this.handleError(
        'requestfailed',
        `Request failed: ${request.url()} - ${request.failure().errorText}`,
        this.page.url()
      );
    });

    // Response errors
    this.page.on('response', response => {
      if (response.status() >= 400) {
        this.handleError('http', `HTTP ${response.status()}: ${response.url()}`, this.page.url());
      }
    });
  }

  handleError(type, message, url, stack = null) {
    const error = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      type,
      message,
      url,
      stack,
      severity: this.calculateSeverity(type, message),
    };

    this.errorHistory.push(error);
    this.log(`❌ Error detected: ${type} - ${message}`, 'error');

    // Check if we should send alert
    if (this.shouldSendAlert()) {
      this.sendAlert();
    }

    // Take screenshot if it's a critical error
    if (error.severity === 'critical') {
      this.takeErrorScreenshot(error);
    }
  }

  calculateSeverity(type, message) {
    const criticalKeywords = ['fatal', 'crash', 'uncaught', 'syntax', 'parsing'];
    const highKeywords = ['error', 'failed', 'timeout', 'network'];
    const mediumKeywords = ['warning', 'deprecated', 'console'];

    const lowerMessage = message.toLowerCase();

    if (criticalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'critical';
    } else if (highKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    } else if (mediumKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium';
    }

    return 'low';
  }

  shouldSendAlert() {
    const recentErrors = this.errorHistory.filter(
      error => Date.now() - new Date(error.timestamp).getTime() < 5 * 60 * 1000 // Last 5 minutes
    );

    const criticalErrors = recentErrors.filter(error => error.severity === 'critical');
    const highErrors = recentErrors.filter(error => error.severity === 'high');

    return criticalErrors.length > 0 || highErrors.length >= this.alertThreshold;
  }

  async takeErrorScreenshot(error) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `error-${error.type}-${timestamp}.png`;
      const filepath = path.join('./error-screenshots', filename);

      await this.page.screenshot({
        path: filepath,
        fullPage: true,
      });

      error.screenshot = filepath;
      this.log(`📸 Error screenshot saved: ${filepath}`);
    } catch (screenshotError) {
      this.log(`❌ Failed to take error screenshot: ${screenshotError.message}`, 'error');
    }
  }

  async checkPageForErrors(url, pageName) {
    try {
      this.log(`🔍 Checking ${pageName} for errors...`);

      await this.page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait for page to load
      await this.page.waitForTimeout(3000);

      // Check for DOM errors
      const domErrors = await this.page.evaluate(() => {
        const errors = [];

        // Check for broken images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            errors.push(`Broken image: ${img.src}`);
          }
        });

        // Check for broken links
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
          if (link.href.includes('undefined') || link.href.includes('null')) {
            errors.push(`Broken link: ${link.href}`);
          }
        });

        // Check for form validation errors
        const formErrors = document.querySelectorAll('.error, .alert-error, [role="alert"]');
        formErrors.forEach(error => {
          errors.push(`Form error: ${error.textContent.trim()}`);
        });

        // Check for JavaScript errors in global scope
        if (window.errors && window.errors.length > 0) {
          errors.push(...window.errors);
        }

        return errors;
      });

      // Handle DOM errors
      domErrors.forEach(error => {
        this.handleError('dom', error, url);
      });

      // Check for accessibility issues
      const accessibilityIssues = await this.checkAccessibility();
      accessibilityIssues.forEach(issue => {
        this.handleError('accessibility', issue, url);
      });

      this.log(`✅ ${pageName} check completed`);
    } catch (error) {
      this.handleError('navigation', `Failed to check ${pageName}: ${error.message}`, url);
    }
  }

  async checkAccessibility() {
    try {
      const issues = await this.page.evaluate(() => {
        const problems = [];

        // Check for missing alt attributes
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.alt && !img.ariaLabel) {
            problems.push(`Image missing alt attribute: ${img.src}`);
          }
        });

        // Check for missing form labels
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
            problems.push(`Input missing label: ${input.type || 'input'}`);
          }
        });

        // Check for color contrast issues (basic check)
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          const color = style.color;
          const backgroundColor = style.backgroundColor;

          if (color === backgroundColor) {
            problems.push(`Potential color contrast issue: ${el.tagName}`);
          }
        });

        return problems;
      });

      return issues;
    } catch (error) {
      this.log(`❌ Accessibility check failed: ${error.message}`, 'error');
      return [];
    }
  }

  async runErrorCheck() {
    const pagesToCheck = [
      { url: '/', name: 'Homepage' },
      { url: '/auth/login', name: 'Login Page' },
      { url: '/auth/register', name: 'Registration Page' },
      { url: '/admin/dashboard', name: 'Admin Dashboard' },
      { url: '/profile', name: 'User Profile' },
      { url: '/unauthorized', name: 'Unauthorized Page' },
    ];

    for (const page of pagesToCheck) {
      await this.checkPageForErrors(`${this.baseUrl}${page.url}`, page.name);
      await this.page.waitForTimeout(2000); // Wait between pages
    }
  }

  async sendAlert() {
    const recentErrors = this.errorHistory.slice(-10); // Last 10 errors

    const alertData = {
      timestamp: new Date().toISOString(),
      errorCount: recentErrors.length,
      criticalErrors: recentErrors.filter(e => e.severity === 'critical').length,
      highErrors: recentErrors.filter(e => e.severity === 'high').length,
      errors: recentErrors,
    };

    // Save alert to file
    const alerts = this.loadAlerts();
    alerts.push(alertData);
    fs.writeFileSync(this.alertFile, JSON.stringify(alerts, null, 2));

    // Send email alert
    await this.sendEmailAlert(alertData);

    // Send console alert
    this.log('🚨 ALERT: Multiple errors detected!', 'alert');
    console.log(
      'Recent errors:',
      recentErrors.map(e => `${e.type}: ${e.message}`)
    );
  }

  loadAlerts() {
    try {
      if (fs.existsSync(this.alertFile)) {
        return JSON.parse(fs.readFileSync(this.alertFile, 'utf8'));
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
    }
    return [];
  }

  async sendEmailAlert(alertData) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      this.log('⚠️ Email credentials not configured, skipping email alert', 'warning');
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
        subject: `🚨 EHB Error Alert - ${alertData.criticalErrors} Critical, ${alertData.highErrors} High`,
        html: `
          <h2>🚨 EHB Application Error Alert</h2>
          <p><strong>Time:</strong> ${new Date(alertData.timestamp).toLocaleString()}</p>
          <p><strong>Critical Errors:</strong> ${alertData.criticalErrors}</p>
          <p><strong>High Priority Errors:</strong> ${alertData.highErrors}</p>
          <p><strong>Total Errors:</strong> ${alertData.errorCount}</p>
          
          <h3>Recent Errors:</h3>
          <ul>
            ${alertData.errors
              .map(error => `<li><strong>${error.type}</strong>: ${error.message}</li>`)
              .join('')}
          </ul>
          
          <p>Please check the application immediately.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      this.log('📧 Error alert email sent');
    } catch (error) {
      this.log(`❌ Failed to send email alert: ${error.message}`, 'error');
    }
  }

  async startContinuousChecking() {
    if (this.isRunning) {
      this.log('⚠️ Error checking is already running');
      return;
    }

    this.isRunning = true;
    this.log('🔄 Starting continuous error checking...');

    while (this.isRunning) {
      try {
        await this.runErrorCheck();

        // Generate error report
        this.generateErrorReport();

        // Wait for next check
        await new Promise(resolve => setTimeout(resolve, this.checkInterval));
      } catch (error) {
        this.log(`❌ Error check cycle failed: ${error.message}`, 'error');
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute before retry
      }
    }
  }

  generateErrorReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalErrors: this.errorHistory.length,
      errorsByType: this.errorHistory.reduce((acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1;
        return acc;
      }, {}),
      errorsBySeverity: this.errorHistory.reduce((acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1;
        return acc;
      }, {}),
      recentErrors: this.errorHistory.slice(-20),
      systemStatus: {
        checking: this.isRunning,
        lastCheck: new Date().toISOString(),
      },
    };

    const reportFile = `./error-reports/error-report-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

    this.log(`📊 Error report generated: ${reportFile}`);
    return report;
  }

  async stopChecking() {
    this.isRunning = false;
    this.log('🛑 Stopping error checking...');

    if (this.browser) {
      await this.browser.close();
    }
  }

  getErrorSummary() {
    const recentErrors = this.errorHistory.filter(
      error => Date.now() - new Date(error.timestamp).getTime() < 60 * 60 * 1000 // Last hour
    );

    return {
      total: recentErrors.length,
      critical: recentErrors.filter(e => e.severity === 'critical').length,
      high: recentErrors.filter(e => e.severity === 'high').length,
      medium: recentErrors.filter(e => e.severity === 'medium').length,
      low: recentErrors.filter(e => e.severity === 'low').length,
    };
  }
}

// CLI Interface
async function main() {
  const errorChecker = new AutoErrorChecker();

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    await errorChecker.stopChecking();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    await errorChecker.stopChecking();
    process.exit(0);
  });

  const args = process.argv.slice(2);

  if (args.includes('--init')) {
    const initialized = await errorChecker.initialize();
    if (initialized) {
      console.log('✅ Error checker initialized successfully');
    } else {
      console.log('❌ Failed to initialize error checker');
      process.exit(1);
    }
  } else if (args.includes('--check')) {
    await errorChecker.initialize();
    await errorChecker.runErrorCheck();
    await errorChecker.stopChecking();
  } else if (args.includes('--monitor')) {
    await errorChecker.initialize();
    await errorChecker.startContinuousChecking();
  } else if (args.includes('--stop')) {
    await errorChecker.stopChecking();
  } else if (args.includes('--report')) {
    errorChecker.generateErrorReport();
  } else if (args.includes('--summary')) {
    const summary = errorChecker.getErrorSummary();
    console.log('Error Summary (Last Hour):', summary);
  } else {
    console.log(`
🚨 EHB Auto Error Checker

Usage:
  node auto-error-checker.js --init      Initialize the error checker
  node auto-error-checker.js --check     Run error check once
  node auto-error-checker.js --monitor   Start continuous error monitoring
  node auto-error-checker.js --stop      Stop error monitoring
  node auto-error-checker.js --report    Generate error report
  node auto-error-checker.js --summary   Show error summary

Features:
  ✅ Real-time error detection
  ✅ Multiple error types (console, page, network, DOM)
  ✅ Severity classification
  ✅ Automatic screenshots for critical errors
  ✅ Email alerts
  ✅ Accessibility checking
  ✅ Continuous monitoring
  ✅ Detailed reporting
    `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoErrorChecker;
