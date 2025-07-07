#!/usr/bin/env node

// EHB Auto System - JavaScript Version
// This script automatically manages EHB services

const fs = require('fs');
const path = require('path');

// EHB Services Data (simplified version)
const ehbServices = [
  {
    id: 'pss',
    name: 'PSS',
    fullName: 'Personal Security System',
    port: 4001,
    status: 'working',
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'edr',
    name: 'EDR',
    fullName: 'Emergency Decision Registration',
    port: 4002,
    status: 'working',
    autoStart: true,
    dependencies: ['pss'],
  },
  {
    id: 'emo',
    name: 'EMO',
    fullName: 'EHB Management Organization',
    port: 4003,
    status: 'working',
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'gosellr',
    name: 'GoSellr',
    fullName: 'Global E-commerce Platform',
    port: 4004,
    status: 'under-dev',
    autoStart: false,
    dependencies: ['pss', 'wallet'],
  },
  {
    id: 'wallet',
    name: 'Wallet',
    fullName: 'EHB Wallet System',
    port: 5001,
    status: 'complete',
    autoStart: true,
    dependencies: ['pss'],
  },
  {
    id: 'blockchain',
    name: 'EHB BLOCKCHAIN',
    fullName: 'EHB Blockchain Infrastructure',
    port: 5007,
    status: 'working',
    autoStart: true,
    dependencies: ['wallet'],
  },
  {
    id: 'sql-level',
    name: 'EHB SQL Level System',
    fullName: 'AI + Blockchain + Affiliate Integration',
    port: 4014,
    status: 'complete',
    autoStart: true,
    dependencies: ['wallet', 'blockchain'],
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    fullName: 'Administrative Dashboard',
    port: 3002,
    status: 'working',
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'ehb-dashboard',
    name: 'EHB Dashboard',
    fullName: 'Main EHB Dashboard',
    port: 3001,
    status: 'working',
    autoStart: true,
    dependencies: [],
  },
];

// Port Manager
class EHBPortManager {
  constructor() {
    this.portConfigs = new Map();
    this.nextAvailablePort = 7000;
    this.initializePorts();
  }

  initializePorts() {
    ehbServices.forEach(service => {
      this.portConfigs.set(service.port, {
        port: service.port,
        service: service.id,
        status: 'reserved',
        autoStart: service.autoStart || false,
        dependencies: service.dependencies || [],
        lastUsed: new Date(),
      });
    });
  }

  getPortConfig(port) {
    return this.portConfigs.get(port);
  }

  reservePort(port, service) {
    if (this.portConfigs.has(port)) {
      return false;
    }

    this.portConfigs.set(port, {
      port,
      service,
      status: 'reserved',
      autoStart: false,
      dependencies: [],
      lastUsed: new Date(),
    });

    return true;
  }

  getNextAvailablePort() {
    while (this.portConfigs.has(this.nextAvailablePort)) {
      this.nextAvailablePort++;
    }
    return this.nextAvailablePort;
  }

  autoAssignPort(serviceName) {
    const port = this.getNextAvailablePort();
    this.reservePort(port, serviceName);
    return port;
  }

  getActivePorts() {
    return Array.from(this.portConfigs.values()).filter(config => config.status === 'active');
  }

  getAutoStartServices() {
    return ehbServices.filter(service => service.autoStart);
  }
}

// Auto System Manager
class EHBAutoSystem {
  constructor() {
    this.portManager = new EHBPortManager();
  }

  async startAutoServices() {
    const autoStartServices = this.portManager.getAutoStartServices();

    log('🚀 Starting Auto-Start Services...');
    for (const service of autoStartServices) {
      await this.startService(service);
    }
    log('✅ All auto-start services initiated');
  }

  async startService(service) {
    try {
      const dependenciesMet = await this.checkDependencies(service);
      if (!dependenciesMet) {
        log(`❌ Cannot start ${service.name}: Dependencies not met`);
        return false;
      }

      log(`✅ Starting ${service.name} on port ${service.port}`);

      const portConfig = this.portManager.getPortConfig(service.port);
      if (portConfig) {
        portConfig.status = 'active';
        portConfig.lastUsed = new Date();
      }

      return true;
    } catch (error) {
      log(`❌ Error starting ${service.name}: ${error.message}`);
      return false;
    }
  }

  async checkDependencies(service) {
    if (!service.dependencies || service.dependencies.length === 0) {
      return true;
    }

    for (const depId of service.dependencies) {
      const depService = ehbServices.find(s => s.id === depId);
      if (!depService) continue;

      const portConfig = this.portManager.getPortConfig(depService.port);
      if (!portConfig || portConfig.status !== 'active') {
        return false;
      }
    }

    return true;
  }

  async addNewService(serviceData) {
    if (!serviceData.port) {
      serviceData.port = this.portManager.autoAssignPort(serviceData.id || 'new-service');
    }

    const newService = {
      id: serviceData.id || `service-${Date.now()}`,
      name: serviceData.name || 'New Service',
      fullName: serviceData.fullName || 'New EHB Service',
      purpose: serviceData.purpose || 'New service purpose',
      progress: serviceData.progress || 0,
      port: serviceData.port,
      status: serviceData.status || 'not-started',
      department: serviceData.department || 'General Team',
      category: serviceData.category || 'New Services',
      priority: serviceData.priority || 'medium',
      sqlLevel: serviceData.sqlLevel || 1,
      autoStart: serviceData.autoStart || false,
      dependencies: serviceData.dependencies || [],
    };

    ehbServices.push(newService);
    this.portManager.reservePort(newService.port, newService.id);

    return newService;
  }

  getServiceByPort(port) {
    return ehbServices.find(service => service.port === port);
  }

  getServicesByStatus(status) {
    return ehbServices.filter(service => service.status === status);
  }

  getSQLLevelServices(level) {
    return ehbServices.filter(service => service.sqlLevel === level);
  }
}

// Utility Functions
function log(msg) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [EHB-AUTO-SYSTEM] ${msg}`);
}

function saveServiceMapping() {
  const mapping = ehbServices.map(s => ({
    id: s.id,
    name: s.name,
    port: s.port,
    status: s.status,
    autoStart: s.autoStart,
  }));

  const mappingPath = path.join(__dirname, '../lib/utils/ehb-service-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  log('📝 Service mapping updated');
}

function showStatus() {
  log('📊 EHB Services Status:');
  console.log('\n' + '='.repeat(80));

  const categories = {
    'Core Services': ehbServices.filter(s => s.port >= 4001 && s.port <= 4007),
    Marketplace: ehbServices.filter(s => s.port >= 4015 && s.port <= 4018),
    Professional: ehbServices.filter(s => s.port >= 4008 && s.port <= 4011),
    Global: ehbServices.filter(s => s.port >= 4012 && s.port <= 4014),
    Financial: ehbServices.filter(s => s.port >= 5001 && s.port <= 5007),
    Management: ehbServices.filter(s => s.port >= 3001 && s.port <= 3003),
  };

  Object.entries(categories).forEach(([category, services]) => {
    if (services.length > 0) {
      console.log(`\n🔹 ${category}:`);
      services.forEach(s => {
        const statusIcon =
          s.status === 'complete'
            ? '✅'
            : s.status === 'working'
              ? '🔄'
              : s.status === 'under-dev'
                ? '🚧'
                : '⏳';
        const autoIcon = s.autoStart ? '🚀' : '⏸️';
        console.log(`   ${statusIcon} ${s.name} (${s.fullName}) - Port: ${s.port} ${autoIcon}`);
      });
    }
  });

  console.log('\n' + '='.repeat(80));

  const stats = getEHBStatistics();
  console.log(`\n📈 Statistics:`);
  console.log(`   Total Services: ${stats.services.total}`);
  console.log(`   Completed: ${stats.services.completed} | Working: ${stats.services.working}`);
  console.log(
    `   Under Development: ${stats.services.underDev} | Not Started: ${stats.services.notStarted}`
  );
  console.log(`   Overall Progress: ${stats.services.progress}%`);
}

function getEHBStatistics() {
  const totalServices = ehbServices.length;
  const completedServices = ehbServices.filter(s => s.status === 'complete').length;
  const workingServices = ehbServices.filter(s => s.status === 'working').length;
  const underDevServices = ehbServices.filter(s => s.status === 'under-dev').length;
  const notStartedServices = ehbServices.filter(s => s.status === 'not-started').length;

  const overallProgress = Math.round(
    ((completedServices + workingServices * 0.7 + underDevServices * 0.3) / totalServices) * 100
  );

  return {
    services: {
      total: totalServices,
      completed: completedServices,
      working: workingServices,
      underDev: underDevServices,
      notStarted: notStartedServices,
      progress: overallProgress,
    },
  };
}

function showHelp() {
  console.log(`
🎯 EHB Auto System CLI
======================

Usage:
  node scripts/ehb-auto-system.js <command> [options]

Commands:
  start-all                🚀 Start all autoStart services
  add-service <json>       ➕ Add a new service (pass JSON string)
  status                   📊 Show status of all services
  help                     ❓ Show this help message

Examples:
  node scripts/ehb-auto-system.js start-all
  node scripts/ehb-auto-system.js status
  node scripts/ehb-auto-system.js add-service '{"id":"test","name":"Test Service","port":7001}'

Auto-Start Services:
  These services will automatically start when you run 'start-all':
  - PSS (Personal Security System) - Port 4001
  - EDR (Emergency Decision Registration) - Port 4002
  - EMO (EHB Management Organization) - Port 4003
  - Wallet (EHB Wallet System) - Port 5001
  - Blockchain (EHB Blockchain Infrastructure) - Port 5007
  - SQL Level (EHB SQL Level System) - Port 4014
  - Admin Panel (Administrative Dashboard) - Port 3002
  - EHB Dashboard (Main EHB Dashboard) - Port 3001

Port Ranges:
  - 3001-3003: Management & Admin Services
  - 4001-4007: Core Services
  - 4008-4018: Professional & Marketplace Services
  - 5001-5007: Financial & Infrastructure Services
  - 7000+: Auto-assigned for new services
`);
}

// Main CLI Handler
async function main() {
  const [, , cmd, ...args] = process.argv;

  console.log('🎯 EHB Auto System v1.0');
  console.log('='.repeat(50));

  switch (cmd) {
    case 'start-all':
      await autoSystem.startAutoServices();
      break;
    case 'add-service':
      if (!args[0]) {
        log('❌ Please provide service data as JSON string.');
        process.exit(1);
      }
      try {
        const serviceData = JSON.parse(args[0]);
        const newService = await autoSystem.addNewService(serviceData);
        log(`✅ Service added: ${newService.name} (Port: ${newService.port})`);
        saveServiceMapping();
      } catch (e) {
        log('❌ Invalid JSON for service data.');
      }
      break;
    case 'status':
      showStatus();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Initialize auto system
const autoSystem = new EHBAutoSystem();

// Run the main function
main().catch(console.error);
