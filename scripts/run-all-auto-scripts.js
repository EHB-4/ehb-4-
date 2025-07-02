#!/usr/bin/env node

/**
 * EHB Run All Auto Scripts
 * Runs all auto scripts in the project
 */

const { spawn, exec } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

console.log('🚀 EHB Run All Auto Scripts');
console.log('===========================');
console.log('Running all auto scripts in the project...');
console.log('');

// List of all auto scripts to run
const autoScripts = [
  {
    name: 'Home Page',
    description: 'Open EHB Home Page in browser',
    script: 'scripts/open-home-now.js',
    icon: '🏠',
  },
  {
    name: 'Development Portal',
    description: 'Open EHB Development Portal in browser',
    script: 'scripts/open-dev-portal.js',
    icon: '🔧',
  },
  {
    name: 'Admin Panel',
    description: 'Open EHB Admin Panel in browser',
    script: 'scripts/open-admin.js',
    icon: '⚙️',
  },
  {
    name: 'GoSellr',
    description: 'Open EHB GoSellr in browser',
    script: 'scripts/open-gosellr.js',
    icon: '🛒',
  },
  {
    name: 'All Pages',
    description: 'Open all EHB pages in browser',
    script: 'scripts/ehb-force-open.js',
    icon: '🌐',
  },
  {
    name: 'Ultra-Fast Agent',
    description: 'Start EHB Ultra-Fast Agent',
    script: 'scripts/ehb-ultra-fast-agent.cjs',
    icon: '🚀',
  },
  {
    name: '24/7 Monitor',
    description: 'Start EHB 24/7 monitoring',
    script: 'scripts/ehb-24-7-monitor.js',
    icon: '📊',
  },
  {
    name: 'Forever Runner',
    description: 'Start EHB forever runner',
    script: 'scripts/ehb-forever.js',
    icon: '🔄',
  },
  {
    name: 'Start and Open All',
    description: 'Start all services and open in browser',
    script: 'scripts/ehb-auto-start-and-open.js',
    icon: '🔧',
  },
  {
    name: 'Fix Home Page',
    description: 'Fix and open EHB home page',
    script: 'scripts/fix-home-page.js',
    icon: '🏠',
  },

  // Franchise Automation Scripts
  {
    name: 'Franchise Auto Launcher',
    description: 'Start franchise automation system',
    script: 'scripts/franchise-auto-launcher.js',
    icon: '🏢',
  },
  {
    name: 'Franchise Auto Manager',
    description: 'Manage franchise automation',
    script: 'scripts/franchise-auto-manager.js',
    icon: '⚙️',
  },
  {
    name: 'Franchise Auto Scanner',
    description: 'Scan and merge franchise data',
    script: 'scripts/franchise-auto-scanner.js',
    icon: '🔍',
  },

  // EHB System Automation
  {
    name: 'EHB Auto Agent',
    description: 'Real-time data monitor',
    script: 'scripts/ehb-auto-agent.js',
    icon: '🤖',
  },
  {
    name: 'EHB Auto Developer',
    description: 'Auto development system',
    script: 'scripts/ehb-auto-developer.js',
    icon: '👨‍💻',
  },
  {
    name: 'EHB Auto Install',
    description: 'Auto installer for packages',
    script: 'scripts/ehb-auto-install.js',
    icon: '📦',
  },
  {
    name: 'EHB Auto Monitor',
    description: 'System monitoring',
    script: 'scripts/ehb-auto-monitor.js',
    icon: '📊',
  },
  {
    name: 'EHB Auto Push',
    description: 'Auto push to GitHub',
    script: 'scripts/ehb-auto-push.js',
    icon: '📤',
  },
  {
    name: 'EHB Auto Setup',
    description: 'Complete system setup',
    script: 'scripts/ehb-auto-setup.js',
    icon: '🔧',
  },
  {
    name: 'EHB Auto Sync',
    description: 'Sync all modules',
    script: 'scripts/ehb-auto-sync.js',
    icon: '🔄',
  },
  {
    name: 'EHB Auto System',
    description: 'Main automation system',
    script: 'scripts/ehb-auto-system.js',
    icon: '⚙️',
  },

  // Ultra Fast/Advanced Automation
  {
    name: 'Ultra Fast Frontend Agent',
    description: 'Frontend automation agent',
    script: 'scripts/ehb-ultra-fast-frontend-agent.cjs',
    icon: '⚡',
  },
  {
    name: 'Advanced Setup',
    description: 'Advanced system setup',
    script: 'scripts/ehb-advanced-setup.js',
    icon: '🚀',
  },
  {
    name: 'Ultra Fast Setup',
    description: 'Ultra fast environment setup',
    script: 'scripts/ultra-fast-setup.js',
    icon: '⚡',
  },

  // Real-Time/Continuous Automation
  {
    name: 'Real Time Auto Runner',
    description: 'Real-time automation runner',
    script: 'scripts/real-time-auto-runner.js',
    icon: '⏱️',
  },

  // Enhanced Automation
  {
    name: 'Enhanced Auto Fixer',
    description: 'Enhanced error fixing',
    script: 'scripts/enhanced-auto-fixer.cjs',
    icon: '🔧',
  },
  {
    name: 'Enhanced GitHub Auto Push',
    description: 'Enhanced GitHub sync',
    script: 'scripts/enhanced-github-auto-push.js',
    icon: '📤',
  },

  // Auto-Push/Git Automation
  {
    name: 'GitHub Auto Push',
    description: 'GitHub auto push system',
    script: 'scripts/github-auto-push.js',
    icon: '📤',
  },
  {
    name: 'GitHub Auto Push Simple',
    description: 'Simple GitHub auto push',
    script: 'scripts/github-auto-push-simple.js',
    icon: '📤',
  },
  {
    name: 'GitHub to Cursor Auto Push',
    description: 'GitHub to Cursor sync',
    script: 'scripts/github-to-cursor-auto-push.js',
    icon: '🔄',
  },
  {
    name: 'Start Auto Push',
    description: 'Start auto push system',
    script: 'scripts/start-auto-push.js',
    icon: '📤',
  },

  // Master/Batch Automation
  {
    name: 'Master Auto Command',
    description: 'Master command runner',
    script: 'scripts/master-auto-command.bat',
    icon: '🎯',
  },
  {
    name: 'Master Auto Push',
    description: 'Master push system',
    script: 'scripts/master-auto-push.bat',
    icon: '📤',
  },
  {
    name: 'Master Auto Server',
    description: 'Master server system',
    script: 'scripts/master-auto-server.bat',
    icon: '🖥️',
  },

  // Auto Startup/System
  {
    name: 'EHB Auto Startup',
    description: 'Auto startup system',
    script: 'scripts/ehb-auto-startup.bat',
    icon: '🚀',
  },
  {
    name: 'EHB Windows Startup',
    description: 'Windows startup system',
    script: 'scripts/ehb-windows-startup.bat',
    icon: '🪟',
  },

  // Auto Fix/Recovery
  {
    name: 'Enhanced Auto Fixer',
    description: 'Enhanced error fixing',
    script: 'scripts/enhanced-auto-fixer.cjs',
    icon: '🔧',
  },
  {
    name: 'Fix All',
    description: 'Fix all errors',
    script: 'scripts/fix-all.cjs',
    icon: '🔧',
  },

  // Performance & Monitoring
  {
    name: 'Performance Monitor',
    description: 'Performance monitoring',
    script: 'scripts/performance-monitor.cjs',
    icon: '📊',
  },
  {
    name: 'Performance Optimizer',
    description: 'Performance optimization',
    script: 'scripts/performance-optimizer.cjs',
    icon: '⚡',
  },

  // Browser & Port Management
  {
    name: 'EHB Browser Launcher',
    description: 'Browser launcher',
    script: 'scripts/ehb-browser-launcher.bat',
    icon: '🌐',
  },
  {
    name: 'EHB Open All Ports',
    description: 'Open all service ports',
    script: 'scripts/ehb-open-all-ports.js',
    icon: '🔌',
  },

  // Complete Setup & Migration
  {
    name: 'EHB Complete Setup',
    description: 'Complete setup automation',
    script: 'scripts/ehb-complete-setup.bat',
    icon: '🎯',
  },
  {
    name: 'Safe Migration',
    description: 'Safe migration system',
    script: 'scripts/safe-migration.js',
    icon: '🔄',
  },
];

// Function to check if script exists
function scriptExists(scriptPath) {
  return existsSync(path.join(process.cwd(), scriptPath));
}

// Function to run a script
function runScript(scriptInfo) {
  return new Promise(resolve => {
    if (!scriptExists(scriptInfo.script)) {
      console.log(`⚠️  Script not found: ${scriptInfo.script}`);
      resolve(false);
      return;
    }

    console.log(`🚀 Running: ${scriptInfo.name}`);
    console.log(`📝 ${scriptInfo.description}`);
    console.log(`📄 Script: ${scriptInfo.script}`);
    console.log('');

    const child = spawn('node', [scriptInfo.script], {
      stdio: 'pipe',
      shell: true,
    });

    // Handle output
    child.stdout.on('data', data => {
      const output = data.toString().trim();
      if (output) {
        console.log(`[${scriptInfo.name}] ${output}`);
      }
    });

    child.stderr.on('data', data => {
      const output = data.toString().trim();
      if (output && !output.includes('warning')) {
        console.log(`[${scriptInfo.name}] ERROR: ${output}`);
      }
    });

    child.on('close', code => {
      if (code === 0) {
        console.log(`✅ ${scriptInfo.name} completed successfully`);
      } else {
        console.log(`❌ ${scriptInfo.name} failed with code ${code}`);
      }
      console.log('');
      resolve(code === 0);
    });

    child.on('error', error => {
      console.log(`❌ Error running ${scriptInfo.name}: ${error.message}`);
      console.log('');
      resolve(false);
    });
  });
}

// Function to run scripts sequentially
async function runScriptsSequentially() {
  console.log('🔄 Running scripts sequentially...');
  console.log('');

  let successCount = 0;
  let totalCount = 0;

  for (const scriptInfo of autoScripts) {
    if (scriptExists(scriptInfo.script)) {
      totalCount++;
      const success = await runScript(scriptInfo);
      if (success) successCount++;

      // Wait 2 seconds between scripts
      if (totalCount < autoScripts.length) {
        console.log('⏳ Waiting 2 seconds before next script...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('');
      }
    }
  }

  return { successCount, totalCount };
}

// Function to run scripts in parallel
async function runScriptsInParallel() {
  console.log('⚡ Running scripts in parallel...');
  console.log('');

  const existingScripts = autoScripts.filter(script => scriptExists(script.script));

  if (existingScripts.length === 0) {
    console.log('❌ No auto scripts found in the project');
    return { successCount: 0, totalCount: 0 };
  }

  const promises = existingScripts.map(scriptInfo => runScript(scriptInfo));
  const results = await Promise.all(promises);

  const successCount = results.filter(result => result).length;
  const totalCount = results.length;

  return { successCount, totalCount };
}

// Function to show available scripts
function showAvailableScripts() {
  console.log('📋 Available Auto Scripts:');
  console.log('==========================');
  console.log('');

  let availableCount = 0;

  autoScripts.forEach((scriptInfo, index) => {
    const exists = scriptExists(scriptInfo.script);
    const status = exists ? '✅' : '❌';
    const statusText = exists ? 'Available' : 'Not Found';

    console.log(`${index + 1}. ${status} ${scriptInfo.name}`);
    console.log(`   📝 ${scriptInfo.description}`);
    console.log(`   📄 ${scriptInfo.script}`);
    console.log(`   📊 Status: ${statusText}`);
    console.log('');

    if (exists) availableCount++;
  });

  console.log(`📊 Summary: ${availableCount}/${autoScripts.length} scripts available`);
  console.log('');
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'list';

  switch (mode) {
    case 'list':
      showAvailableScripts();
      break;

    case 'sequential':
    case 'seq':
      console.log('🔄 Running scripts sequentially...');
      console.log('');
      const seqResult = await runScriptsSequentially();
      console.log(
        `📊 Sequential Results: ${seqResult.successCount}/${seqResult.totalCount} scripts completed successfully`
      );
      break;

    case 'parallel':
    case 'par':
      console.log('⚡ Running scripts in parallel...');
      console.log('');
      const parResult = await runScriptsInParallel();
      console.log(
        `📊 Parallel Results: ${parResult.successCount}/${parResult.totalCount} scripts completed successfully`
      );
      break;

    case 'all':
      console.log('🚀 Running all available scripts...');
      console.log('');
      showAvailableScripts();
      const allResult = await runScriptsSequentially();
      console.log(
        `📊 All Results: ${allResult.successCount}/${allResult.totalCount} scripts completed successfully`
      );
      break;

    default:
      console.log('❌ Invalid mode. Available modes:');
      console.log('   • list - Show available scripts');
      console.log('   • sequential/seq - Run scripts one by one');
      console.log('   • parallel/par - Run scripts simultaneously');
      console.log('   • all - Show list and run all scripts');
      console.log('');
      console.log('Example: node scripts/run-all-auto-scripts.js sequential');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, autoScripts };
