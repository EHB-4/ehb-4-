const { exec } = require('child_process');
const os = require('os');

class AutoBrowser {
  constructor() {
    this.platform = os.platform();
    this.baseUrl = 'http://localhost:3000';
  }

  // Open browser based on platform
  openBrowser(url) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;

    let command;

    switch (this.platform) {
      case 'win32':
        command = `start ${fullUrl}`;
        break;
      case 'darwin':
        command = `open ${fullUrl}`;
        break;
      case 'linux':
        command = `xdg-open ${fullUrl}`;
        break;
      default:
        console.log(`Please open: ${fullUrl}`);
        return;
    }

    exec(command, error => {
      if (error) {
        console.error(`Error opening browser: ${error.message}`);
        console.log(`Please manually open: ${fullUrl}`);
      } else {
        console.log(`✅ Browser opened: ${fullUrl}`);
      }
    });
  }

  // Open specific pages
  openPSSDashboard() {
    this.openBrowser('/pss');
  }

  openPSSRequest() {
    this.openBrowser('/pss/request');
  }

  openPSSRequests() {
    this.openBrowser('/pss/requests');
  }

  openHome() {
    this.openBrowser('/');
  }

  openAdmin() {
    this.openBrowser('/admin');
  }

  openEMO() {
    this.openBrowser('/emo');
  }

  // Auto-detect and open based on recent changes
  autoOpen() {
    // Check for recent PSS changes and open accordingly
    this.openPSSDashboard();
  }
}

// Export for use in other scripts
module.exports = AutoBrowser;

// If run directly
if (require.main === module) {
  const browser = new AutoBrowser();
  const args = process.argv.slice(2);

  if (args.length > 0) {
    browser.openBrowser(args[0]);
  } else {
    browser.autoOpen();
  }
}
