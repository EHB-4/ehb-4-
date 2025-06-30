// EHB Auto Installer Script
// Roman Urdu: Yeh script sab zaruri npm packages aur SDKs ko auto install karta hai

const { execSync } = require('child_process');

const packages = [
  'chokidar',
  'fs-extra',
  // Yahan aur packages add karen agar zarurat ho
];

console.log('NPM Packages Install Ho Rahe Hain... (Roman Urdu)');
execSync(`npm install -D ${packages.join(' ')}`, { stdio: 'inherit' });

// Yahan aap SDKs/extensions ka install logic bhi add kar sakte hain
// Example: TurboRepo, Nx, Bit, etc.

console.log('Sab Packages Install Ho Gaye! (Roman Urdu)');
