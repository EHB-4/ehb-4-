const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

class AutoTestMonitor {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = [];
    this.errorLog = [];
    this.isRunning = false;
    this.baseUrl = 'http://localhost:3000';
    this.testInterval = 5 * 60 * 1000; // 5 minutes
    this.screenshotDir = './test-screenshots';
    this.logFile = './logs/auto-test-log.json';

    // Create directories if they don't exist
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = ['./logs', this.screenshotDir, './test-reports'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async initialize() {
    try {
      console.log('🚀 Initializing Auto Test Monitor...');

      this.browser = await puppeteer.launch({
        headless: false, // Show browser for debugging
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

      // Enable console logging
      this.page.on('console', msg => {
        const logEntry = {
          timestamp: new Date().toISOString(),
          type: msg.type(),
          message: msg.text(),
          url: this.page.url(),
        };
        this.errorLog.push(logEntry);
        console.log(`[${msg.type()}] ${msg.text()}`);
      });

      // Enable error logging
      this.page.on('pageerror', error => {
        const errorEntry = {
          timestamp: new Date().toISOString(),
          type: 'pageerror',
          message: error.message,
          stack: error.stack,
          url: this.page.url(),
        };
        this.errorLog.push(errorEntry);
        console.error(`❌ Page Error: ${error.message}`);
      });

      // Enable request logging
      this.page.on('requestfailed', request => {
        const failEntry = {
          timestamp: new Date().toISOString(),
          type: 'requestfailed',
          url: request.url(),
          failure: request.failure().errorText,
          pageUrl: this.page.url(),
        };
        this.errorLog.push(failEntry);
        console.error(`❌ Request Failed: ${request.url()} - ${request.failure().errorText}`);
      });

      console.log('✅ Browser initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize browser:', error);
      return false;
    }
  }

  async takeScreenshot(name) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${name}-${timestamp}.png`;
      const filepath = path.join(this.screenshotDir, filename);
      await this.page.screenshot({
        path: filepath,
        fullPage: true,
      });
      return filepath;
    } catch (error) {
      console.error('❌ Screenshot failed:', error);
      return null;
    }
  }

  async testPage(url, testName) {
    const result = {
      testName,
      url,
      timestamp: new Date().toISOString(),
      success: false,
      errors: [],
      warnings: [],
      performance: {},
      screenshot: null,
    };

    try {
      console.log(`\n🔍 Testing: ${testName} (${url})`);

      // Navigate to page
      await this.page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait for page to load
      await this.page.waitForTimeout(2000);

      // Check for common errors
      const errors = await this.page.evaluate(() => {
        const errorElements = document.querySelectorAll('.error, .alert-error, [role="alert"]');
        return Array.from(errorElements).map(el => el.textContent.trim());
      });

      // Check for console errors
      const consoleErrors = this.errorLog.filter(
        log => log.url === url && (log.type === 'error' || log.type === 'pageerror')
      );

      // Check for JavaScript errors
      const jsErrors = await this.page.evaluate(() => {
        return window.errors || [];
      });

      // Check for broken links
      const brokenLinks = await this.page.evaluate(() => {
        const links = document.querySelectorAll('a[href]');
        const broken = [];
        links.forEach(link => {
          if (link.href.includes('undefined') || link.href.includes('null')) {
            broken.push(link.href);
          }
        });
        return broken;
      });

      // Check for missing images
      const missingImages = await this.page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const missing = [];
        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            missing.push(img.src);
          }
        });
        return missing;
      });

      // Performance metrics
      const performance = await this.page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        return {
          loadTime: perf.loadEventEnd - perf.loadEventStart,
          domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint:
            performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        };
      });

      // Take screenshot
      const screenshot = await this.takeScreenshot(testName);

      // Compile results
      result.success = errors.length === 0 && consoleErrors.length === 0 && jsErrors.length === 0;
      result.errors = [...errors, ...consoleErrors.map(e => e.message), ...jsErrors];
      result.warnings = [...brokenLinks, ...missingImages];
      result.performance = performance;
      result.screenshot = screenshot;

      if (result.success) {
        console.log(`✅ ${testName} - PASSED`);
      } else {
        console.log(`❌ ${testName} - FAILED`);
        console.log('Errors:', result.errors);
        console.log('Warnings:', result.warnings);
      }
    } catch (error) {
      console.error(`❌ Test failed for ${testName}:`, error);
      result.errors.push(error.message);
      result.screenshot = await this.takeScreenshot(`${testName}-error`);
    }

    this.testResults.push(result);
    return result;
  }

  async runAuthenticationTests() {
    console.log('\n🔐 Running Authentication Tests...');

    const authTests = [
      { url: '/auth/login', name: 'Login Page' },
      { url: '/auth/register', name: 'Registration Page' },
      { url: '/auth/forgot-password', name: 'Forgot Password Page' },
      { url: '/unauthorized', name: 'Unauthorized Page' },
    ];

    for (const test of authTests) {
      await this.testPage(`${this.baseUrl}${test.url}`, test.name);
      await this.page.waitForTimeout(1000);
    }
  }

  async runLoginFlowTest() {
    console.log('\n🔑 Testing Login Flow...');

    try {
      // Go to login page
      await this.page.goto(`${this.baseUrl}/auth/login`);
      await this.page.waitForTimeout(1000);

      // Fill login form
      await this.page.type('input[type="email"]', 'admin@ehb.com');
      await this.page.type('input[type="password"]', 'admin123');

      // Click login button
      await this.page.click('button[type="submit"]');

      // Wait for redirect
      await this.page.waitForTimeout(3000);

      // Check if redirected to admin dashboard
      const currentUrl = this.page.url();
      if (currentUrl.includes('/admin/dashboard')) {
        console.log('✅ Login flow successful');
        await this.takeScreenshot('login-success');
      } else {
        console.log('❌ Login flow failed');
        await this.takeScreenshot('login-failed');
      }
    } catch (error) {
      console.error('❌ Login flow test failed:', error);
    }
  }

  async runProtectedRouteTests() {
    console.log('\n🛡️ Testing Protected Routes...');

    const protectedTests = [
      { url: '/admin/dashboard', name: 'Admin Dashboard' },
      { url: '/profile', name: 'User Profile' },
      { url: '/dashboard', name: 'User Dashboard' },
    ];

    for (const test of protectedTests) {
      await this.testPage(`${this.baseUrl}${test.url}`, test.name);
      await this.page.waitForTimeout(1000);
    }
  }

  async runAllTests() {
    console.log('\n🚀 Starting Comprehensive Test Suite...');

    await this.runAuthenticationTests();
    await this.runLoginFlowTest();
    await this.runProtectedRouteTests();

    // Test homepage
    await this.testPage(this.baseUrl, 'Homepage');

    console.log('\n✅ All tests completed!');
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.testResults.length,
      passedTests: this.testResults.filter(r => r.success).length,
      failedTests: this.testResults.filter(r => !r.success).length,
      totalErrors: this.errorLog.length,
      testResults: this.testResults,
      errors: this.errorLog,
      summary: {
        performance: {
          averageLoadTime:
            this.testResults.reduce((acc, r) => acc + (r.performance.loadTime || 0), 0) /
            this.testResults.length,
          slowestPage: this.testResults.reduce((max, r) =>
            (r.performance.loadTime || 0) > (max.performance.loadTime || 0) ? r : max
          ),
        },
      },
    };

    const reportFile = `./test-reports/report-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

    console.log(`\n📊 Report generated: ${reportFile}`);
    console.log(`📈 Test Summary: ${report.passedTests}/${report.totalTests} passed`);
    console.log(`❌ Errors found: ${report.totalErrors}`);

    return report;
  }

  async sendEmailAlert(report) {
    // Email configuration (you'll need to set up your email service)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_EMAIL,
      subject: `EHB Auto Test Report - ${new Date().toLocaleDateString()}`,
      html: `
        <h2>EHB Auto Test Report</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Tests Passed:</strong> ${report.passedTests}/${report.totalTests}</p>
        <p><strong>Errors Found:</strong> ${report.totalErrors}</p>
        <p><strong>Average Load Time:</strong> ${report.summary.performance.averageLoadTime.toFixed(2)}ms</p>
        
        <h3>Failed Tests:</h3>
        <ul>
          ${report.testResults
            .filter(r => !r.success)
            .map(r => `<li>${r.testName}: ${r.errors.join(', ')}</li>`)
            .join('')}
        </ul>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('📧 Alert email sent');
    } catch (error) {
      console.error('❌ Failed to send email alert:', error);
    }
  }

  async startMonitoring() {
    if (this.isRunning) {
      console.log('⚠️ Monitoring is already running');
      return;
    }

    this.isRunning = true;
    console.log('🔄 Starting continuous monitoring...');

    while (this.isRunning) {
      try {
        console.log(`\n🕐 Running tests at ${new Date().toLocaleString()}`);

        // Clear previous results
        this.testResults = [];
        this.errorLog = [];

        // Run all tests
        await this.runAllTests();

        // Generate report
        const report = await this.generateReport();

        // Send alert if there are failures
        if (report.failedTests > 0 || report.totalErrors > 0) {
          await this.sendEmailAlert(report);
        }

        // Wait for next interval
        console.log(`⏰ Waiting ${this.testInterval / 1000 / 60} minutes until next test...`);
        await new Promise(resolve => setTimeout(resolve, this.testInterval));
      } catch (error) {
        console.error('❌ Monitoring cycle failed:', error);
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute before retry
      }
    }
  }

  async stopMonitoring() {
    this.isRunning = false;
    console.log('🛑 Stopping monitoring...');

    if (this.browser) {
      await this.browser.close();
    }
  }
}

// CLI Interface
async function main() {
  const monitor = new AutoTestMonitor();

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    await monitor.stopMonitoring();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    await monitor.stopMonitoring();
    process.exit(0);
  });

  const args = process.argv.slice(2);

  if (args.includes('--init')) {
    const initialized = await monitor.initialize();
    if (initialized) {
      console.log('✅ Monitor initialized successfully');
    } else {
      console.log('❌ Failed to initialize monitor');
      process.exit(1);
    }
  } else if (args.includes('--test')) {
    await monitor.initialize();
    await monitor.runAllTests();
    await monitor.generateReport();
    await monitor.stopMonitoring();
  } else if (args.includes('--monitor')) {
    await monitor.initialize();
    await monitor.startMonitoring();
  } else {
    console.log(`
🤖 EHB Auto Test Monitor

Usage:
  node auto-test-monitor.js --init     Initialize the monitor
  node auto-test-monitor.js --test     Run tests once
  node auto-test-monitor.js --monitor  Start continuous monitoring

Features:
  ✅ Automatic browser testing
  ✅ Error detection and logging
  ✅ Performance monitoring
  ✅ Screenshot capture
  ✅ Email alerts
  ✅ Continuous monitoring
  ✅ Detailed reporting
    `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoTestMonitor;
