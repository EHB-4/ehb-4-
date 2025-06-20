#!/usr/bin/env node

const { exec } = require('child_process');

const services = [
  { url: 'http://localhost:3000', name: 'Main App' },
  { url: 'http://localhost:3000/admin', name: 'Admin Panel' },
  { url: 'http://localhost:3000/dashboard', name: 'Dashboard' },
  { url: 'http://localhost:3000/ai', name: 'AI Services' },
  { url: 'http://localhost:3000/wallet', name: 'Wallet' },
  { url: 'http://localhost:3000/analytics', name: 'Analytics' },
  { url: 'http://localhost:3000/ehb-dashboard', name: 'EHB Dashboard' },
  { url: 'http://localhost:3000/ehb-home-page', name: 'EHB Home' },
  { url: 'http://localhost:3000/ehb-ai-market-place', name: 'AI Marketplace' },
  { url: 'http://localhost:3000/ehb-tube', name: 'EHB Tube' },
  { url: 'http://localhost:3000/ehb-wallet', name: 'EHB Wallet' },
  { url: 'http://localhost:3000/ehb-ads', name: 'EHB Ads' },
  { url: 'http://localhost:3000/gosellr', name: 'GoSellr' },
  { url: 'http://localhost:3000/franchise', name: 'Franchise' },
  { url: 'http://localhost:3000/orders', name: 'Orders' },
  { url: 'http://localhost:3000/cart', name: 'Cart' },
  { url: 'http://localhost:3000/wishlist', name: 'Wishlist' },
  { url: 'http://localhost:3000/profile', name: 'Profile' },
  { url: 'http://localhost:3000/settings', name: 'Settings' },
  { url: 'http://localhost:3000/search', name: 'Search' },
  { url: 'http://localhost:3000/reviews', name: 'Reviews' },
  { url: 'http://localhost:3000/notifications', name: 'Notifications' },
  { url: 'http://localhost:3000/roadmap', name: 'Roadmap' },
  { url: 'http://localhost:3000/development', name: 'Development' },
  { url: 'http://localhost:3000/development-portal', name: 'Development Portal' },
  { url: 'http://localhost:3000/am-affiliate', name: 'AM Affiliate' },
  { url: 'http://localhost:3000/assistant', name: 'Assistant' },
  { url: 'http://localhost:3000/auth', name: 'Auth' },
  { url: 'http://localhost:3000/signup', name: 'Signup' },
  { url: 'http://localhost:3000/register', name: 'Register' },
  { url: 'http://localhost:3000/unauthorized', name: 'Unauthorized' },
  { url: 'http://localhost:3000/error', name: 'Error Page' },
];

console.log('🚀 Opening all EHB services in browser...');

let delay = 0;
const delayIncrement = 500; // 500ms between each tab

services.forEach((service, index) => {
  setTimeout(() => {
    console.log(`📱 Opening ${service.name}: ${service.url}`);

    exec(`start ${service.url}`, error => {
      if (error) {
        console.log(`❌ Failed to open ${service.name}: ${error.message}`);
      } else {
        console.log(`✅ Opened ${service.name}`);
      }
    });
  }, delay);

  delay += delayIncrement;
});

console.log('🎉 All services are being opened!');
console.log('⏳ Please wait for all tabs to open...');
console.log('📊 Total services: ' + services.length);
