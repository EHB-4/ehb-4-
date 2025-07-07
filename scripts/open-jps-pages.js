#!/usr/bin/env node

const open = require('open');

console.log('🌐 Opening all JPS pages...');

const jpsPages = [
  { url: 'http://localhost:4005/jps', name: 'JPS Dashboard' },
  { url: 'http://localhost:4005/jps/analytics', name: 'JPS Analytics' },
  { url: 'http://localhost:4005/jps/matching', name: 'JPS AI Matching' },
  { url: 'http://localhost:4005/jps/assessment', name: 'JPS Assessment' },
  { url: 'http://localhost:4005/jps/interviews', name: 'JPS Interviews' },
  { url: 'http://localhost:4005/jps/settings', name: 'JPS Settings' },
];

jpsPages.forEach((page, index) => {
  setTimeout(() => {
    console.log(`📄 Opening ${page.name}...`);
    open(page.url);
  }, index * 1000);
});

console.log('✅ All JPS pages will be opened in sequence');
console.log('📋 Pages:');
jpsPages.forEach(page => {
  console.log(`   • ${page.name}: ${page.url}`);
});
