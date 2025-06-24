const { spawn } = require('child_process');
const { exec } = require('child_process');

// Configuration
const config = {
  devPort: 3001,
  storybookPort: 6006,
  browser: 'chrome', // or 'edge', 'firefox'
  delay: 3000, // 3 seconds delay
};

// Launch browser function
function launchBrowser(url) {
  const browserCommands = {
    chrome: `start chrome --new-window "${url}"`,
    edge: `start msedge --new-window "${url}"`,
    firefox: `start firefox --new-window "${url}"`,
  };

  const command = browserCommands[config.browser] || browserCommands.chrome;

  exec(command, error => {
    if (error) {
      console.log(`❌ Failed to launch browser: ${error.message}`);
      console.log(`🌐 Please manually open: ${url}`);
    } else {
      console.log(`✅ Browser launched successfully: ${url}`);
    }
  });
}

// Auto launch development server
function launchDevServer() {
  console.log('🚀 Starting Next.js development server...');

  const devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });

  // Launch browser after delay
  setTimeout(() => {
    launchBrowser(`http://localhost:${config.devPort}`);
  }, config.delay);

  return devProcess;
}

// Auto launch Storybook
function launchStorybook() {
  console.log('📚 Starting Storybook...');

  const storybookProcess = spawn('npm', ['run', 'storybook'], {
    stdio: 'inherit',
    shell: true,
  });

  // Launch browser after delay
  setTimeout(() => {
    launchBrowser(`http://localhost:${config.storybookPort}`);
  }, config.delay);

  return storybookProcess;
}

// Launch both servers
function launchBoth() {
  console.log('🎯 Launching both development server and Storybook...');

  const devProcess = launchDevServer();

  // Launch Storybook after additional delay
  setTimeout(() => {
    launchStorybook();
  }, config.delay + 2000);

  return { devProcess };
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'dev':
    launchDevServer();
    break;
  case 'storybook':
    launchStorybook();
    break;
  case 'both':
    launchBoth();
    break;
  default:
    console.log(`
🎯 EHB Auto Browser Launcher

Usage:
  node scripts/auto-browser-launcher.js [command]

Commands:
  dev        - Launch Next.js dev server + browser
  storybook  - Launch Storybook + browser  
  both       - Launch both servers + browsers

Examples:
  node scripts/auto-browser-launcher.js dev
  node scripts/auto-browser-launcher.js storybook
  node scripts/auto-browser-launcher.js both
    `);
}
