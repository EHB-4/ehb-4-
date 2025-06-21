const fs = require('fs');
const path = require('path');
const AutoBrowser = require('./auto-browser');

class DevCompletionDetector {
  constructor() {
    this.browser = new AutoBrowser();
    this.lastCheck = Date.now();
    this.completionStates = {
      pss: false,
      emo: false,
      admin: false,
      auth: false,
    };
  }

  // Check if a module is complete
  checkModuleCompletion(moduleName) {
    const modulePaths = {
      pss: [
        'app/pss/page.tsx',
        'app/pss/request/page.tsx',
        'app/pss/requests/page.tsx',
        'app/pss/layout.tsx',
        'components/PSS/PSSDashboard.tsx',
        'components/PSS/VerificationRequestForm.tsx',
        'app/api/pss/requests/route.ts',
        'app/api/pss/requests/[id]/route.ts',
        'app/api/pss/stats/route.ts',
        'lib/pss/database.ts',
      ],
      emo: ['app/emo/page.tsx', 'components/EMO/', 'app/api/emo/'],
      admin: ['app/admin/page.tsx', 'components/admin/', 'app/api/admin/'],
      auth: ['app/auth/', 'components/auth/', 'app/api/auth/'],
    };

    const paths = modulePaths[moduleName];
    if (!paths) return false;

    let allFilesExist = true;
    for (const filePath of paths) {
      const fullPath = path.join(process.cwd(), filePath);
      if (!fs.existsSync(fullPath)) {
        allFilesExist = false;
        break;
      }
    }

    return allFilesExist;
  }

  // Monitor development progress
  monitorProgress() {
    console.log('🔍 Monitoring development progress...');

    const modules = Object.keys(this.completionStates);
    let completedModules = 0;

    modules.forEach(module => {
      const isComplete = this.checkModuleCompletion(module);
      if (isComplete && !this.completionStates[module]) {
        this.completionStates[module] = true;
        completedModules++;
        console.log(`✅ ${module.toUpperCase()} module completed!`);

        // Auto-open relevant page
        this.openRelevantPage(module);
      }
    });

    if (completedModules > 0) {
      console.log(`🎉 ${completedModules} module(s) completed! Opening browser...`);
    }

    return completedModules;
  }

  // Open relevant page based on completed module
  openRelevantPage(module) {
    switch (module) {
      case 'pss':
        this.browser.openPSSDashboard();
        break;
      case 'emo':
        this.browser.openEMO();
        break;
      case 'admin':
        this.browser.openAdmin();
        break;
      case 'auth':
        this.browser.openHome();
        break;
      default:
        this.browser.openHome();
    }
  }

  // Start monitoring
  start() {
    console.log('🚀 Starting development completion monitoring...');

    // Initial check
    this.monitorProgress();

    // Monitor every 30 seconds
    setInterval(() => {
      this.monitorProgress();
    }, 30000);
  }

  // Manual completion trigger
  markComplete(moduleName) {
    if (this.completionStates.hasOwnProperty(moduleName)) {
      this.completionStates[moduleName] = true;
      console.log(`✅ ${moduleName.toUpperCase()} marked as complete!`);
      this.openRelevantPage(moduleName);
    }
  }
}

// Export for use
module.exports = DevCompletionDetector;

// If run directly
if (require.main === module) {
  const detector = new DevCompletionDetector();

  const args = process.argv.slice(2);
  if (args.length > 0) {
    detector.markComplete(args[0]);
  } else {
    detector.start();
  }
}
