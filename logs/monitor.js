const fs = require('fs');
const path = require('path');

console.log('📊 EHB Basic Monitoring Active');
console.log('==============================');

// Check for errors every 10 seconds
setInterval(() => {
  const logFiles = ['logs/error.log', 'accessibility-watcher-log.txt'];
  
  for (const logFile of logFiles) {
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf8');
      if (content.includes('error') || content.includes('Error')) {
        console.log(`⚠️ Error detected in ${logFile}`);
      }
    }
  }
}, 10000);

console.log('✅ Monitoring started');
