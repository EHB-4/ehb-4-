// EHB Auto Sync Script
// Roman Urdu: Yeh script sab main EHB modules (Home, Dashboard, Portal, SOT, AI Agents) ki files ko auto sync karta hai.
// Jab bhi koi nayi file ya update ho, woh baqi sub modules mein bhi copy ho jati hai.

const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

// Roman Urdu: Yeh config define karta hai ke kaunse folders sync honge
const modules = [
  'app/ehb-home-page',
  'app/ehb-dashboard',
  'app/development-portal',
  'app/sot',
  'app/ai-agents',
];

// Roman Urdu: Yeh function file ko sab modules mein copy karta hai
async function syncFileToModules(src, relPath) {
  for (const mod of modules) {
    const dest = path.join(mod, relPath);
    await fs.copy(src, dest, { overwrite: true });
    console.log(`[AutoSync] ${src} -> ${dest}`);
  }
}

// Roman Urdu: Yeh watcher sab modules ke frontend/backend folders ko monitor karta hai
modules.forEach(mod => {
  const watchPath = path.join(mod, 'frontend');
  chokidar.watch(watchPath, { ignoreInitial: true }).on('all', (event, filePath) => {
    if (event === 'add' || event === 'change') {
      const relPath = path.relative(mod, filePath);
      syncFileToModules(filePath, relPath);
    }
  });
  // Backend ke liye bhi same logic apply karein agar zarurat ho
  const backendPath = path.join(mod, 'backend');
  if (fs.existsSync(backendPath)) {
    chokidar.watch(backendPath, { ignoreInitial: true }).on('all', (event, filePath) => {
      if (event === 'add' || event === 'change') {
        const relPath = path.relative(mod, filePath);
        syncFileToModules(filePath, relPath);
      }
    });
  }
});

console.log('EHB Auto Sync System Active Hai! (Roman Urdu)');
