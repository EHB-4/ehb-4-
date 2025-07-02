#!/usr/bin/env node

/**
 * EHB URL Management CLI
 * Command-line interface for managing URLs and development agents
 */

const { exec } = require('child_process');
const readline = require('readline');

// Mock data for CLI (in real implementation, this would connect to the actual system)
const mockPages = [
  { id: 'home', title: 'EHB Home', url: '/', status: 'active', completion: 100 },
  { id: 'jps', title: 'Job Placement System', url: '/jps', status: 'active', completion: 100 },
  {
    id: 'gosellr',
    title: 'GoSellr Marketplace',
    url: '/gosellr',
    status: 'active',
    completion: 95,
  },
  {
    id: 'franchise',
    title: 'Franchise System',
    url: '/franchise',
    status: 'active',
    completion: 100,
  },
  { id: 'wms', title: 'World Medical Services', url: '/wms', status: 'active', completion: 100 },
  { id: 'ols', title: 'Online Law Services', url: '/ols', status: 'active', completion: 100 },
  {
    id: 'agts',
    title: 'Advanced Global Travel Services',
    url: '/agts',
    status: 'active',
    completion: 100,
  },
  {
    id: 'pss',
    title: 'Personal Security System',
    url: '/pss',
    status: 'development',
    completion: 75,
  },
  {
    id: 'edr',
    title: 'Emergency Decision Registration',
    url: '/edr',
    status: 'development',
    completion: 60,
  },
  { id: 'wallet', title: 'Trusty Wallet', url: '/wallet', status: 'active', completion: 100 },
  { id: 'dashboard', title: 'EHB Dashboard', url: '/dashboard', status: 'active', completion: 85 },
  { id: 'services', title: 'All Services', url: '/services', status: 'active', completion: 90 },
  { id: 'ai-agents', title: 'AI Agents', url: '/ai-agents', status: 'development', completion: 65 },
  { id: 'admin', title: 'Admin Panel', url: '/admin', status: 'active', completion: 80 },
  { id: 'login', title: 'Login', url: '/login', status: 'active', completion: 90 },
  { id: 'register', title: 'Register', url: '/register', status: 'active', completion: 85 },
  { id: 'profile', title: 'User Profile', url: '/profile', status: 'active', completion: 85 },
  { id: 'settings', title: 'Settings', url: '/settings', status: 'active', completion: 80 },
  {
    id: 'development-portal',
    title: 'Development Portal',
    url: '/development-portal',
    status: 'active',
    completion: 75,
  },
  { id: 'analytics', title: 'Analytics', url: '/analytics', status: 'active', completion: 70 },
  { id: 'search', title: 'Search', url: '/search', status: 'active', completion: 80 },
  { id: 'cart', title: 'Shopping Cart', url: '/cart', status: 'active', completion: 90 },
  { id: 'orders', title: 'Orders', url: '/orders', status: 'active', completion: 85 },
  { id: 'roadmap', title: 'Project Roadmap', url: '/roadmap', status: 'active', completion: 85 },
  {
    id: 'roadmap-agent',
    title: 'Roadmap AI Agent',
    url: '/roadmap-agent',
    status: 'development',
    completion: 70,
  },
];

const mockAgents = [
  {
    id: 'agent-001',
    name: 'Frontend Specialist',
    status: 'available',
    expertise: ['react', 'nextjs', 'typescript'],
  },
  {
    id: 'agent-002',
    name: 'Backend Developer',
    status: 'available',
    expertise: ['nodejs', 'api', 'database'],
  },
  {
    id: 'agent-003',
    name: 'AI/ML Engineer',
    status: 'available',
    expertise: ['ai', 'machine-learning', 'analytics'],
  },
  {
    id: 'agent-004',
    name: 'DevOps Engineer',
    status: 'available',
    expertise: ['deployment', 'infrastructure', 'security'],
  },
  {
    id: 'agent-005',
    name: 'Full Stack Developer',
    status: 'available',
    expertise: ['react', 'nodejs', 'database'],
  },
];

class URLManagerCLI {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.baseUrl = 'http://localhost:3000';
  }

  async openPage(pageId) {
    const page = mockPages.find(p => p.id === pageId);
    if (!page) {
      console.log(`❌ Page not found: ${pageId}`);
      return false;
    }

    const fullUrl = `${this.baseUrl}${page.url}`;
    console.log(`🔗 Opening: ${page.title} (${fullUrl})`);

    try {
      // For Windows
      exec(`start "${fullUrl}"`, error => {
        if (error) {
          // Fallback for other platforms
          exec(`open "${fullUrl}"`, error2 => {
            if (error2) {
              console.log(`❌ Failed to open browser: ${error2.message}`);
            } else {
              console.log(`✅ Opened in browser: ${page.title}`);
            }
          });
        } else {
          console.log(`✅ Opened in browser: ${page.title}`);
        }
      });
      return true;
    } catch (error) {
      console.log(`❌ Error opening page: ${error.message}`);
      return false;
    }
  }

  async openMultiplePages(pageIds) {
    console.log(`🚀 Opening ${pageIds.length} pages...`);
    let successCount = 0;

    for (const pageId of pageIds) {
      const success = await this.openPage(pageId);
      if (success) successCount++;
      // Small delay between openings
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ Successfully opened ${successCount}/${pageIds.length} pages`);
    return successCount;
  }

  searchPages(query) {
    const lowerQuery = query.toLowerCase();
    return mockPages.filter(
      page =>
        page.title.toLowerCase().includes(lowerQuery) || page.id.toLowerCase().includes(lowerQuery)
    );
  }

  listPages(filter = 'all') {
    let filteredPages = mockPages;

    if (filter === 'active') {
      filteredPages = mockPages.filter(p => p.status === 'active');
    } else if (filter === 'development') {
      filteredPages = mockPages.filter(p => p.status === 'development');
    }

    console.log(`\n📋 Pages (${filteredPages.length} total):`);
    console.log('─'.repeat(80));

    filteredPages.forEach(page => {
      const statusIcon =
        page.status === 'active' ? '✅' : page.status === 'development' ? '🔧' : '📋';
      const completionBar =
        '█'.repeat(Math.floor(page.completion / 10)) +
        '░'.repeat(10 - Math.floor(page.completion / 10));

      console.log(
        `${statusIcon} ${page.title.padEnd(30)} | ${page.url.padEnd(20)} | ${page.completion}% ${completionBar}`
      );
    });
  }

  listAgents() {
    console.log(`\n🤖 Development Agents (${mockAgents.length} total):`);
    console.log('─'.repeat(80));

    mockAgents.forEach(agent => {
      const statusIcon =
        agent.status === 'available' ? '🟢' : agent.status === 'busy' ? '🟡' : '🔴';
      console.log(
        `${statusIcon} ${agent.name.padEnd(25)} | ${agent.status.padEnd(12)} | ${agent.expertise.join(', ')}`
      );
    });
  }

  showSystemStatus() {
    const activePages = mockPages.filter(p => p.status === 'active').length;
    const devPages = mockPages.filter(p => p.status === 'development').length;
    const availableAgents = mockAgents.filter(a => a.status === 'available').length;

    console.log('\n📊 System Status:');
    console.log('─'.repeat(40));
    console.log(`📄 Total Pages: ${mockPages.length}`);
    console.log(`✅ Active Pages: ${activePages}`);
    console.log(`🔧 Development Pages: ${devPages}`);
    console.log(`🤖 Total Agents: ${mockAgents.length}`);
    console.log(`🟢 Available Agents: ${availableAgents}`);
    console.log(`🌐 Base URL: ${this.baseUrl}`);
  }

  showHelp() {
    console.log('\n📖 EHB URL Management CLI - Help');
    console.log('─'.repeat(50));
    console.log('Commands:');
    console.log('  list                    - List all pages');
    console.log('  list active             - List active pages only');
    console.log('  list development        - List development pages only');
    console.log('  agents                  - List development agents');
    console.log('  status                  - Show system status');
    console.log('  open <page-id>          - Open specific page');
    console.log('  open-all                - Open all active pages');
    console.log('  open-dev                - Open all development pages');
    console.log('  search <query>          - Search pages');
    console.log('  search-open <query>     - Search and open pages');
    console.log('  help                    - Show this help');
    console.log('  exit                    - Exit CLI');
    console.log('\nExamples:');
    console.log('  open jps                - Open Job Placement System');
    console.log('  search wallet           - Search for wallet-related pages');
    console.log('  open-all                - Open all active pages');
  }

  async run() {
    console.log('🚀 EHB URL Management CLI');
    console.log('Type "help" for available commands\n');

    const askQuestion = () => {
      this.rl.question('🔗 URL Manager > ', async input => {
        const args = input.trim().split(' ');
        const command = args[0].toLowerCase();

        try {
          switch (command) {
            case 'list':
              const filter = args[1] || 'all';
              this.listPages(filter);
              break;

            case 'agents':
              this.listAgents();
              break;

            case 'status':
              this.showSystemStatus();
              break;

            case 'open':
              if (args[1]) {
                await this.openPage(args[1]);
              } else {
                console.log('❌ Please specify a page ID');
              }
              break;

            case 'open-all':
              const activePageIds = mockPages.filter(p => p.status === 'active').map(p => p.id);
              await this.openMultiplePages(activePageIds);
              break;

            case 'open-dev':
              const devPageIds = mockPages.filter(p => p.status === 'development').map(p => p.id);
              await this.openMultiplePages(devPageIds);
              break;

            case 'search':
              if (args[1]) {
                const query = args.slice(1).join(' ');
                const results = this.searchPages(query);
                console.log(`\n🔍 Search results for "${query}" (${results.length} found):`);
                results.forEach(page => {
                  console.log(`  • ${page.title} (${page.url}) - ${page.status}`);
                });
              } else {
                console.log('❌ Please specify a search query');
              }
              break;

            case 'search-open':
              if (args[1]) {
                const query = args.slice(1).join(' ');
                const results = this.searchPages(query);
                if (results.length > 0) {
                  const pageIds = results.map(p => p.id);
                  await this.openMultiplePages(pageIds);
                } else {
                  console.log(`❌ No pages found for query: ${query}`);
                }
              } else {
                console.log('❌ Please specify a search query');
              }
              break;

            case 'help':
              this.showHelp();
              break;

            case 'exit':
            case 'quit':
              console.log('👋 Goodbye!');
              this.rl.close();
              process.exit(0);
              break;

            default:
              if (command) {
                console.log(`❌ Unknown command: ${command}`);
                console.log('Type "help" for available commands');
              }
              break;
          }
        } catch (error) {
          console.log(`❌ Error: ${error.message}`);
        }

        askQuestion();
      });
    };

    askQuestion();
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  const cli = new URLManagerCLI();
  cli.run().catch(console.error);
}

module.exports = URLManagerCLI;
