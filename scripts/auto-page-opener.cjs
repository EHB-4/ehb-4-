const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const logFile = path.join(__dirname, '../logs/auto-page-opener.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  try {
    if (!fs.existsSync(path.dirname(logFile))) {
      fs.mkdirSync(path.dirname(logFile), { recursive: true });
    }
    fs.appendFileSync(logFile, logMessage);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
}

// Debounce function to avoid rapid firing
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

function openUrlInBrowser(url) {
  log(`Attempting to open URL: ${url}`);
  const command = process.platform === 'win32' ? 'start' : 'open';
  exec(`${command} ${url}`, error => {
    if (error) {
      log(`Error opening URL: ${error.message}`);
      return;
    }
    log(`Successfully opened ${url} in browser.`);
  });
}

const handleFileChange = debounce(filePath => {
  log(`File changed: ${filePath}`);
  const baseDirApp = 'app';
  const baseDirPages = 'pages';
  const port = 3000;
  let relativePath = '';

  if (filePath.startsWith(baseDirApp)) {
    relativePath = path.relative(baseDirApp, filePath);
  } else if (filePath.startsWith(baseDirPages)) {
    relativePath = path.relative(baseDirPages, filePath);
  } else {
    log(`File is not in a watched page directory. Ignoring.`);
    return;
  }

  // Normalize path separators to forward slashes for URL
  let urlPath = relativePath.replace(/\\/g, '/');

  // Remove /page.tsx, /page.js, /index.tsx, or /index.js from the end
  urlPath = urlPath.replace(/\/page\.(tsx|js)$/, '');
  urlPath = urlPath.replace(/\/index\.(tsx|js)$/, '');

  // For root page.tsx (e.g., app/page.tsx), the path becomes empty.
  if (urlPath === 'page.tsx' || urlPath === 'page.js') {
    urlPath = '';
  }

  const url = `http://localhost:${port}/${urlPath}`;

  openUrlInBrowser(url);
}, 1000); // 1-second debounce delay

const watcher = chokidar.watch(['app', 'pages'], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 500,
    pollInterval: 100,
  },
});

log('🚀 EHB Auto Page Opener is running...');
log('Watching for changes in `app` and `pages` directories...');

watcher
  .on('add', filePath => {
    if (path.basename(filePath).match(/^(page|index)\.(tsx|js)$/)) {
      log(`New page detected: ${filePath}`);
      handleFileChange(filePath);
    }
  })
  .on('change', filePath => {
    if (path.basename(filePath).match(/^(page|index)\.(tsx|js)$/)) {
      handleFileChange(filePath);
    }
  })
  .on('error', error => log(`Watcher error: ${error}`));

process.on('SIGINT', () => {
  log('🛑 Shutting down Auto Page Opener...');
  watcher.close();
  process.exit(0);
});
