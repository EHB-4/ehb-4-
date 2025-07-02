// open-homepage.js
// Usage: node open-homepage.js [url]
// Example: node open-homepage.js http://localhost:3000/ehb-home
// If no URL is provided, defaults to http://localhost:3000

const open = require('open');

const url = process.argv[2] || 'http://localhost:3000';

// Wait a few seconds to ensure the dev server is up
setTimeout(() => {
  (open.default || open)(url);
}, 4000); // 4 seconds delay
