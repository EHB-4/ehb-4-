#!/usr/bin/env node

/**
 * EHB URL Management Quick Demo
 * Demonstrates the URL management system capabilities
 */

const { exec } = require('child_process');

class QuickURLDemo {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.pages = [
      { id: 'home', title: 'EHB Home', url: '/' },
      { id: 'jps', title: 'Job Placement System', url: '/jps' },
      { id: 'gosellr', title: 'GoSellr Marketplace', url: '/gosellr' },
      { id: 'franchise', title: 'Franchise System', url: '/franchise' },
      { id: 'wallet', title: 'Trusty Wallet', url: '/wallet' },
      { id: 'dashboard', title: 'EHB Dashboard', url: '/dashboard' },
      { id: 'services', title: 'All Services', url: '/services' },
    ];
  }

  async openPage(pageId) {
    const page = this.pages.find(p => p.id === pageId);
    if (!page) {
      console.log(`❌ Page not found: ${pageId}`);
      return false;
    }

    const fullUrl = `${this.baseUrl}${page.url}`;
    console.log(`🔗 Opening: ${page.title} (${fullUrl})`);

    try {
      exec(`start "${fullUrl}"`, error => {
        if (error) {
          exec(`open "${fullUrl}"`, error2 => {
            if (error2) {
              console.log(`❌ Failed to open browser: ${error2.message}`);
            } else {
              console.log(`✅ Opened: ${page.title}`);
            }
          });
        } else {
          console.log(`✅ Opened: ${page.title}`);
        }
      });
      return true;
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      return false;
    }
  }

  async runDemo() {
    console.log('🚀 EHB URL Management System - Quick Demo');
    console.log('='.repeat(50));

    // Step 1: Open main pages
    console.log('\n📋 Step 1: Opening Main Pages...');
    await this.openPage('home');
    await new Promise(resolve => setTimeout(resolve, 1000));

    await this.openPage('services');
    await new Promise(resolve => setTimeout(resolve, 1000));

    await this.openPage('dashboard');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Open core services
    console.log('\n🛠️ Step 2: Opening Core Services...');
    await this.openPage('jps');
    await new Promise(resolve => setTimeout(resolve, 1000));

    await this.openPage('gosellr');
    await new Promise(resolve => setTimeout(resolve, 1000));

    await this.openPage('franchise');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: Open financial services
    console.log('\n💰 Step 3: Opening Financial Services...');
    await this.openPage('wallet');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 4: Open URL management dashboard
    console.log('\n🎛️ Step 4: Opening URL Management Dashboard...');
    await this.openPage('url-management');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('\n✅ Demo completed!');
    console.log('\n📊 Summary:');
    console.log(`   • Total pages opened: ${this.pages.length}`);
    console.log(`   • Base URL: ${this.baseUrl}`);
    console.log(`   • URL Management Dashboard: ${this.baseUrl}/url-management`);

    console.log('\n🎯 Next Steps:');
    console.log('   1. Visit URL Management Dashboard for full control');
    console.log('   2. Use CLI: npm run url-manager');
    console.log('   3. Explore API endpoints: /api/url-management');
    console.log('   4. Check system status and agent assignments');
  }

  showSystemInfo() {
    console.log('\n📋 EHB URL Management System Info:');
    console.log('='.repeat(40));
    console.log(`🌐 Base URL: ${this.baseUrl}`);
    console.log(`📄 Total Pages: ${this.pages.length}`);
    console.log(`🤖 Development Agents: 5`);
    console.log(`🔗 Auto-browser: Enabled`);
    console.log(`🎛️ Dashboard: ${this.baseUrl}/url-management`);
    console.log(`📡 API: ${this.baseUrl}/api/url-management`);

    console.log('\n📋 Available Pages:');
    this.pages.forEach((page, index) => {
      console.log(`   ${index + 1}. ${page.title} (${page.url})`);
    });
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  const demo = new QuickURLDemo();

  if (process.argv.includes('--info')) {
    demo.showSystemInfo();
  } else {
    demo.runDemo();
  }
}

module.exports = QuickURLDemo;
