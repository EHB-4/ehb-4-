#!/usr/bin/env node

/**
 * EHB Next.js 04 - Master Auto Runner
 * Automatically starts and manages all auto scripts
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class MasterAutoRunner {
  constructor() {
    this.processes = new Map();
    this.isRunning = true;
    this.restartCounts = new Map();
    this.maxRestarts = 5;

    // Auto scripts to manage
    this.autoScripts = [
      {
        name: '🚀 Ultra-Fast Agent',
        script: 'scripts/ehb-ultra-fast-agent.cjs',
        autoRestart: true,
        maxRestarts: 3,
      },
      {
        name: '🤖 AI Auto System',
        script: 'scripts/ehb-auto-system.js',
        autoRestart: true,
        maxRestarts: 5,
      },
      {
        name: '📊 24/7 Monitor',
        script: 'scripts/ehb-24-7-monitor.js',
        autoRestart: true,
        maxRestarts: 3,
      },
      {
        name: '🔄 Forever Runner',
        script: 'scripts/ehb-forever.js',
        autoRestart: true,
        maxRestarts: 3,
      },
      {
        name: '⚡ Auto Launch',
        script: 'scripts/auto-launch-services.js',
        autoRestart: true,
        maxRestarts: 3,
      },
      {
        name: '🎯 Real-time Runner',
        script: 'scripts/real-time-auto-runner.js',
        autoRestart: true,
        maxRestarts: 3,
      },
    ];
  }

  /**
   * Start all auto scripts
   */
  async startAll() {
    console.log('🚀 Starting EHB Master Auto Runner...');
    console.log('📋 Managing', this.autoScripts.length, 'auto scripts');

    for (const script of this.autoScripts) {
      await this.startScript(script);
      // Wait a bit between starts to avoid overwhelming the system
      await this.sleep(2000);
    }

    console.log('✅ All auto scripts started!');
    this.startMonitoring();
  }

  /**
   * Start a single auto script
   */
  async startScript(script) {
    console.log(`🚀 Starting ${script.name}...`);

    const scriptPath = path.join(process.cwd(), script.script);

    if (!fs.existsSync(scriptPath)) {
      console.log(`⚠️  Script not found: ${scriptPath}`);
      return;
    }

    const child = spawn('node', [script.script], {
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false,
    });

    this.processes.set(script.name, {
      process: child,
      script: script,
      startTime: Date.now(),
    });

    child.stdout.on('data', data => {
      console.log(`[${script.name}] ${data.toString().trim()}`);
    });

    child.stderr.on('data', data => {
      console.log(`[${script.name}] ERROR: ${data.toString().trim()}`);
    });

    child.on('close', code => {
      console.log(`🛑 ${script.name} stopped with code ${code}`);

      if (script.autoRestart && this.isRunning) {
        const currentRestarts = this.restartCounts.get(script.name) || 0;
        if (currentRestarts < script.maxRestarts) {
          console.log(
            `🔄 Restarting ${script.name} (${currentRestarts + 1}/${script.maxRestarts})...`
          );
          this.restartCounts.set(script.name, currentRestarts + 1);
          setTimeout(() => this.startScript(script), 5000);
        } else {
          console.log(`❌ ${script.name} exceeded max restart attempts`);
        }
      }
    });

    child.on('error', error => {
      console.log(`❌ ${script.name} error:`, error.message);
    });
  }

  /**
   * Start monitoring all processes
   */
  startMonitoring() {
    setInterval(() => {
      console.log('\n📊 Master Auto Runner Status:');
      console.log('==============================');

      for (const [name, info] of this.processes) {
        const uptime = Date.now() - info.startTime;
        const uptimeMinutes = Math.floor(uptime / 60000);
        const restarts = this.restartCounts.get(name) || 0;

        console.log(`${name}:`);
        console.log(`  ⏱️  Uptime: ${uptimeMinutes} minutes`);
        console.log(`  🔄 Restarts: ${restarts}`);
        console.log(`  📈 Status: ${info.process.killed ? 'Stopped' : 'Running'}`);
      }

      console.log('==============================\n');
    }, 30000); // Status every 30 seconds
  }

  /**
   * Stop all processes
   */
  stopAll() {
    console.log('🛑 Stopping all auto scripts...');
    this.isRunning = false;

    for (const [name, info] of this.processes) {
      if (!info.process.killed) {
        info.process.kill('SIGTERM');
        console.log(`🛑 Stopped ${name}`);
      }
    }

    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, stopping all processes...');
  const runner = new MasterAutoRunner();
  runner.stopAll();
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, stopping all processes...');
  const runner = new MasterAutoRunner();
  runner.stopAll();
});

// Start the master auto runner
if (require.main === module) {
  const runner = new MasterAutoRunner();
  runner.startAll().catch(console.error);
}

module.exports = MasterAutoRunner;
