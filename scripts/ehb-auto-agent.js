// EHB Auto Agent - Real-Time Data Monitor
// Place a shortcut to this script in your Windows Startup folder or run via Task Scheduler for auto-start.
// Requires: npm install chokidar axios node-notifier

const chokidar = require('chokidar');
const axios = require('axios');
const notifier = require('node-notifier');
const fs = require('fs');
const path = require('path');

// === CONFIGURATION ===
const DATA_FILES = [
  path.join(__dirname, '../lib/utils/ehbDataPage.ts'),
  path.join(__dirname, '../app/development/page.tsx'),
  path.join(__dirname, '../app/roadmap-agent/page.tsx'),
];
const HTTP_ENDPOINTS = [
  'http://localhost:3001/roadmap-agent',
  'http://localhost:3001/development',
  'http://localhost:3001/roadmap',
];
const LOG_FILE = path.join(__dirname, '../logs/ehb-auto-agent-log.txt');
const SCAN_INTERVAL = 60 * 1000; // 60 seconds

// === FILE WATCHING ===
chokidar.watch(DATA_FILES, { ignoreInitial: true }).on('all', (event, filePath) => {
  const msg = `[${new Date().toLocaleString()}] File ${event}: ${filePath}`;
  logAndNotify(msg);
});

// === HTTP POLLING ===
async function pollEndpoints() {
  for (const url of HTTP_ENDPOINTS) {
    try {
      const res = await axios.get(url);
      const msg = `[${new Date().toLocaleString()}] Polled ${url} - Status: ${res.status}`;
      logAndNotify(msg);
    } catch (err) {
      const msg = `[${new Date().toLocaleString()}] ERROR polling ${url}: ${err.message}`;
      logAndNotify(msg);
    }
  }
}

setInterval(pollEndpoints, SCAN_INTERVAL);

// === LOGGING & NOTIFICATION ===
function logAndNotify(msg) {
  console.log(msg);
  fs.appendFileSync(LOG_FILE, msg + '\n');
  notifier.notify({
    title: 'EHB Auto Agent',
    message: msg,
    timeout: 5,
  });
}

console.log('EHB Auto Agent started. Monitoring files and endpoints...');
