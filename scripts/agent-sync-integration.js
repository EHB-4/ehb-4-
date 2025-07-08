#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Agent Sync Integration Script
 * Automatically manages the sync system based on agent activity
 * 
 * Features:
 * - Detects when AI agents are active
 * - Automatically starts/stops sync based on agent activity
 * - Monitors file changes during agent work
 * - Provides hooks for agent completion
 * - Manages sync timing and conflicts
 */

class AgentSyncIntegration {
  constructor() {
    this.projectRoot = process.cwd();
    this.syncScript = path.join(this.projectRoot, 'scripts', 'agent-auto-sync.js');
    this.integrationFile = path.join(this.projectRoot, '.agent-integration');
    this.agentProcesses = new Set();
    this.syncProcess = null;
    this.isMonitoring = false;
    this.lastAgentActivity = null;
    
    // Agent detection patterns
    this.agentPatterns = [
      'cursor',
      'agent',
      'ai',
      'automation',
      'assistant',
      'copilot'
    ];
    
    // File patterns that indicate agent work
    this.workPatterns = [
      '**/*.tsx',
      '**/*.ts',
      '**/*.js',
      '**/*.jsx',
      '**/*.json',
      '**/*.md'
    ];
    
    // Integration hooks
    this.hooks = {
      onAgentStart: [],
      onAgentStop: [],
      onWorkComplete: [],
      onSyncStart: [],
      onSyncComplete: []
    };
  }

  /**
   * Initialize the integration system
   */
  async initialize() {
    console.log('🔗 Initializing Agent Sync Integration...');
    
    // Create integration file
    this.updateIntegrationStatus({
      isActive: false,
      lastActivity: null,
      syncStatus: 'stopped',
      agentProcesses: []
    });
    
    // Start monitoring
    await this.startMonitoring();
    
    console.log('✅ Agent Sync Integration initialized');
    return true;
  }

  /**
   * Start monitoring for agent activity
   */
  async startMonitoring() {
    if (this.isMonitoring) {
      return;
    }
    
    this.isMonitoring = true;
    console.log('👀 Starting agent activity monitoring...');
    
    // Check for existing agent processes
    this.detectAgentProcesses();
    
    // Set up monitoring interval
    this.monitoringInterval = setInterval(() => {
      this.monitorAgentActivity();
    }, 5000); // Check every 5 seconds
    
    // Set up file change monitoring
    this.setupFileMonitoring();
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    
    if (this.fileWatcher) {
      this.fileWatcher.close();
    }
    
    this.isMonitoring = false;
    console.log('🛑 Agent activity monitoring stopped');
  }

  /**
   * Detect agent processes
   */
  detectAgentProcesses() {
    try {
      const processes = execSync('tasklist /FO CSV', { encoding: 'utf8' });
      const lines = processes.split('\n');
      
      this.agentProcesses.clear();
      
      for (const line of lines) {
        for (const pattern of this.agentPatterns) {
          if (line.toLowerCase().includes(pattern.toLowerCase())) {
            const parts = line.split(',');
            if (parts.length > 1) {
              const processName = parts[0].replace(/"/g, '');
              this.agentProcesses.add(processName);
            }
          }
        }
      }
      
      return this.agentProcesses.size > 0;
    } catch (error) {
      console.log('⚠️ Could not detect agent processes:', error.message);
      return false;
    }
  }

  /**
   * Monitor agent activity
   */
  monitorAgentActivity() {
    const wasActive = this.agentProcesses.size > 0;
    const isActive = this.detectAgentProcesses();
    
    if (isActive && !wasActive) {
      // Agent started
      this.onAgentStart();
    } else if (!isActive && wasActive) {
      // Agent stopped
      this.onAgentStop();
    }
    
    if (isActive) {
      this.lastAgentActivity = new Date().toISOString();
      this.updateIntegrationStatus({
        isActive: true,
        lastActivity: this.lastAgentActivity,
        syncStatus: this.syncProcess ? 'running' : 'stopped',
        agentProcesses: Array.from(this.agentProcesses)
      });
    }
  }

  /**
   * Set up file monitoring
   */
  setupFileMonitoring() {
    try {
      // Monitor specific directories for changes
      const watchDirs = [
        path.join(this.projectRoot, 'app'),
        path.join(this.projectRoot, 'components'),
        path.join(this.projectRoot, 'scripts'),
        path.join(this.projectRoot, 'lib')
      ];
      
      for (const dir of watchDirs) {
        if (fs.existsSync(dir)) {
          fs.watch(dir, { recursive: true }, (eventType, filename) => {
            if (this.agentProcesses.size > 0) {
              this.onFileChange(filename, eventType);
            }
          });
        }
      }
    } catch (error) {
      console.log('⚠️ File monitoring setup failed:', error.message);
    }
  }

  /**
   * Handle file changes during agent work
   */
  onFileChange(filename, eventType) {
    if (this.agentProcesses.size > 0) {
      console.log(`📝 Agent file change: ${filename} (${eventType})`);
      
      // Schedule work completion check
      this.scheduleWorkCompletionCheck();
    }
  }

  /**
   * Schedule work completion check
   */
  scheduleWorkCompletionCheck() {
    if (this.workCompletionTimeout) {
      clearTimeout(this.workCompletionTimeout);
    }
    
    this.workCompletionTimeout = setTimeout(() => {
      this.checkWorkCompletion();
    }, 10000); // Wait 10 seconds after last change
  }

  /**
   * Check if agent work is complete
   */
  checkWorkCompletion() {
    if (this.agentProcesses.size === 0) {
      this.onWorkComplete();
    }
  }

  /**
   * Handle agent start
   */
  onAgentStart() {
    console.log('🤖 Agent activity detected - starting sync system');
    
    // Trigger hooks
    this.hooks.onAgentStart.forEach(hook => {
      try {
        hook();
      } catch (error) {
        console.log('⚠️ Hook error:', error.message);
      }
    });
    
    // Start sync system
    this.startSyncSystem();
  }

  /**
   * Handle agent stop
   */
  onAgentStop() {
    console.log('🛑 Agent activity stopped - managing sync system');
    
    // Trigger hooks
    this.hooks.onAgentStop.forEach(hook => {
      try {
        hook();
      } catch (error) {
        console.log('⚠️ Hook error:', error.message);
      }
    });
    
    // Wait a bit then check if work is complete
    setTimeout(() => {
      this.checkWorkCompletion();
    }, 5000);
  }

  /**
   * Handle work completion
   */
  onWorkComplete() {
    console.log('✅ Agent work completed - finalizing sync');
    
    // Trigger hooks
    this.hooks.onWorkComplete.forEach(hook => {
      try {
        hook();
      } catch (error) {
        console.log('⚠️ Hook error:', error.message);
      }
    });
    
    // Perform final sync
    this.performFinalSync();
  }

  /**
   * Start sync system
   */
  startSyncSystem() {
    if (this.syncProcess) {
      return; // Already running
    }
    
    try {
      console.log('🚀 Starting sync system...');
      
      // Trigger hooks
      this.hooks.onSyncStart.forEach(hook => {
        try {
          hook();
        } catch (error) {
          console.log('⚠️ Hook error:', error.message);
        }
      });
      
      // Start the sync process
      this.syncProcess = spawn('node', [this.syncScript, 'start'], {
        stdio: 'pipe',
        detached: true
      });
      
      this.syncProcess.on('error', (error) => {
        console.log('❌ Sync process error:', error.message);
        this.syncProcess = null;
      });
      
      this.syncProcess.on('exit', (code) => {
        console.log(`🛑 Sync process exited with code ${code}`);
        this.syncProcess = null;
      });
      
      console.log('✅ Sync system started');
    } catch (error) {
      console.log('❌ Failed to start sync system:', error.message);
    }
  }

  /**
   * Stop sync system
   */
  stopSyncSystem() {
    if (!this.syncProcess) {
      return;
    }
    
    try {
      console.log('🛑 Stopping sync system...');
      this.syncProcess.kill();
      this.syncProcess = null;
      console.log('✅ Sync system stopped');
    } catch (error) {
      console.log('❌ Failed to stop sync system:', error.message);
    }
  }

  /**
   * Perform final sync
   */
  async performFinalSync() {
    try {
      console.log('🔄 Performing final sync...');
      
      // Run one-time sync
      execSync(`node "${this.syncScript}" sync`, { stdio: 'inherit' });
      
      // Trigger hooks
      this.hooks.onSyncComplete.forEach(hook => {
        try {
          hook();
        } catch (error) {
          console.log('⚠️ Hook error:', error.message);
        }
      });
      
      console.log('✅ Final sync completed');
    } catch (error) {
      console.log('❌ Final sync failed:', error.message);
    }
  }

  /**
   * Update integration status
   */
  updateIntegrationStatus(status) {
    try {
      fs.writeFileSync(this.integrationFile, JSON.stringify(status, null, 2));
    } catch (error) {
      console.log('⚠️ Could not update integration status');
    }
  }

  /**
   * Get integration status
   */
  getIntegrationStatus() {
    try {
      if (fs.existsSync(this.integrationFile)) {
        return JSON.parse(fs.readFileSync(this.integrationFile, 'utf8'));
      }
    } catch (error) {
      console.log('⚠️ Could not read integration status');
    }
    
    return {
      isActive: false,
      lastActivity: null,
      syncStatus: 'unknown',
      agentProcesses: []
    };
  }

  /**
   * Add hook
   */
  addHook(event, callback) {
    if (this.hooks[event]) {
      this.hooks[event].push(callback);
    }
  }

  /**
   * Remove hook
   */
  removeHook(event, callback) {
    if (this.hooks[event]) {
      const index = this.hooks[event].indexOf(callback);
      if (index > -1) {
        this.hooks[event].splice(index, 1);
      }
    }
  }

  /**
   * Start the integration service
   */
  async start() {
    console.log('🚀 Starting Agent Sync Integration Service...');
    console.log('📁 Project:', this.projectRoot);
    console.log('🔗 Integration file:', this.integrationFile);
    console.log('🔄 Press Ctrl+C to stop\n');
    
    await this.initialize();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      this.stop();
    });
    
    process.on('SIGTERM', () => {
      this.stop();
    });
  }

  /**
   * Stop the integration service
   */
  stop() {
    console.log('\n🛑 Stopping Agent Sync Integration Service...');
    
    this.stopMonitoring();
    this.stopSyncSystem();
    
    this.updateIntegrationStatus({
      isActive: false,
      lastActivity: this.lastAgentActivity,
      syncStatus: 'stopped',
      agentProcesses: []
    });
    
    console.log('✅ Agent Sync Integration Service stopped');
    process.exit(0);
  }
}

// CLI Interface
if (require.main === module) {
  const integration = new AgentSyncIntegration();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      integration.start();
      break;
    case 'stop':
      integration.stop();
      break;
    case 'status':
      const status = integration.getIntegrationStatus();
      console.log('📊 Agent Sync Integration Status:');
      console.log('🤖 Agent Active:', status.isActive);
      console.log('🕒 Last Activity:', status.lastActivity || 'Never');
      console.log('🔄 Sync Status:', status.syncStatus);
      console.log('📝 Agent Processes:', status.agentProcesses.join(', ') || 'None');
      break;
    case 'test':
      console.log('🧪 Testing agent detection...');
      const isActive = integration.detectAgentProcesses();
      console.log('Agent detected:', isActive);
      console.log('Processes:', Array.from(integration.agentProcesses));
      break;
    default:
      console.log('🔗 Agent Sync Integration Tool');
      console.log('');
      console.log('Usage:');
      console.log('  node scripts/agent-sync-integration.js start   - Start integration service');
      console.log('  node scripts/agent-sync-integration.js stop    - Stop integration service');
      console.log('  node scripts/agent-sync-integration.js status  - Show integration status');
      console.log('  node scripts/agent-sync-integration.js test    - Test agent detection');
      console.log('');
      console.log('Features:');
      console.log('  ✅ Automatic agent detection');
      console.log('  ✅ Smart sync management');
      console.log('  ✅ Work completion detection');
      console.log('  ✅ Hook system for customization');
      console.log('  ✅ Real-time monitoring');
      console.log('  ✅ Graceful shutdown');
  }
}

module.exports = AgentSyncIntegration; 