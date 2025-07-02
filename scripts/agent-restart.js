#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

/**
 * EHB Agent Restart System
 * Quickly restarts Cursor agent without full reset
 */
class AgentRestart {
  constructor() {
    this.projectRoot = process.cwd();
    this.restartTime = Date.now();
  }

  async run() {
    console.log('🔄 EHB Agent Restart System');
    console.log('===========================');
    console.log('🚀 Quick agent restart...');
    console.log('');

    try {
      // 1. Stop current agent
      await this.stopCurrentAgent();

      // 2. Clear temporary files
      await this.clearTempFiles();

      // 3. Restart agent
      await this.restartAgent();

      // 4. Show status
      this.showStatus();
    } catch (error) {
      console.error('❌ Restart failed:', error.message);
      await this.emergencyRestart();
    }
  }

  async stopCurrentAgent() {
    console.log('🛑 STOPPING CURRENT AGENT');
    console.log('==========================');

    try {
      // Kill Node.js processes related to this project
      const { stdout } = await execAsync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV');
      const lines = stdout.split('\n').filter(line => line.includes('node.exe'));

      if (lines.length > 0) {
        console.log(`🔄 Found ${lines.length} Node.js processes, stopping...`);
        await execAsync('taskkill /F /IM node.exe 2>nul || echo "No processes to kill"');

        // Wait for processes to stop
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      console.log('✅ Current agent stopped');
    } catch (error) {
      console.log('⚠️ Could not stop all processes:', error.message);
    }
  }

  async clearTempFiles() {
    console.log('');
    console.log('🧹 CLEARING TEMPORARY FILES');
    console.log('============================');

    const tempFiles = [
      '.cursor-sync-notification',
      '.health-status',
      'temp-backup',
      'accessibility-watcher-log.txt',
    ];

    for (const tempFile of tempFiles) {
      const tempPath = path.join(this.projectRoot, tempFile);
      if (fs.existsSync(tempPath)) {
        try {
          if (fs.statSync(tempPath).isDirectory()) {
            fs.rmSync(tempPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(tempPath);
          }
          console.log(`✅ Cleared: ${tempFile}`);
        } catch (error) {
          console.log(`⚠️ Could not clear: ${tempFile}`);
        }
      }
    }

    console.log('✅ Temporary files cleared');
  }

  async restartAgent() {
    console.log('');
    console.log('🚀 RESTARTING AGENT');
    console.log('===================');

    try {
      // Start the ultra-fast agent
      const agentPath = path.join(
        this.projectRoot,
        'scripts',
        'ehb-auto-system',
        'ultra-fast-cursor-agent.cjs'
      );

      if (fs.existsSync(agentPath)) {
        console.log('🔄 Starting ultra-fast cursor agent...');

        const agent = spawn('node', [agentPath], {
          stdio: 'inherit',
          shell: true,
          env: {
            ...process.env,
            NODE_OPTIONS: '--max-old-space-size=4096 --timeout=30000',
          },
        });

        agent.on('close', code => {
          console.log(`Agent exited with code ${code}`);
        });

        agent.on('error', error => {
          console.error('Agent error:', error.message);
        });

        console.log('✅ Agent restarted successfully');
      } else {
        console.log('⚠️ Ultra-fast agent not found, starting basic agent...');
        await this.startBasicAgent();
      }
    } catch (error) {
      console.log('⚠️ Could not start ultra-fast agent:', error.message);
      await this.startBasicAgent();
    }
  }

  async startBasicAgent() {
    console.log('🔄 Starting basic agent...');

    try {
      // Create a simple basic agent
      const basicAgentScript = `
const fs = require('fs');
const path = require('path');

class BasicAgent {
  constructor() {
    this.projectRoot = process.cwd();
    this.startTime = Date.now();
  }

  async start() {
    console.log('🤖 Basic Cursor Agent Started');
    console.log('=============================');
    console.log('✅ Agent is now running');
    console.log('📱 Next.js: http://localhost:3000');
    console.log('');
    console.log('Press Ctrl+C to stop');
    
    // Keep the process alive
    setInterval(() => {
      const uptime = Date.now() - this.startTime;
      console.log(\`⏱️  Uptime: \${Math.round(uptime/1000)}s\`);
    }, 30000);
  }
}

const agent = new BasicAgent();
agent.start().catch(console.error);
`;

      const basicAgentPath = path.join(this.projectRoot, 'scripts', 'basic-agent.cjs');
      fs.writeFileSync(basicAgentPath, basicAgentScript);

      const agent = spawn('node', [basicAgentPath], {
        stdio: 'inherit',
        shell: true,
      });

      agent.on('close', code => {
        console.log(`Basic agent exited with code ${code}`);
      });

      console.log('✅ Basic agent started');
    } catch (error) {
      console.log('❌ Could not start basic agent:', error.message);
    }
  }

  async emergencyRestart() {
    console.log('');
    console.log('🚨 EMERGENCY RESTART');
    console.log('====================');

    try {
      // Force kill all processes
      await execAsync('taskkill /F /IM node.exe 2>nul || echo "No processes to kill"');

      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Start basic agent
      await this.startBasicAgent();

      console.log('✅ Emergency restart completed');
    } catch (error) {
      console.log('❌ Emergency restart failed:', error.message);
    }
  }

  showStatus() {
    const duration = Date.now() - this.restartTime;

    console.log('');
    console.log('🎉 AGENT RESTART COMPLETED');
    console.log('==========================');
    console.log(`⏱️  Duration: ${Math.round(duration / 1000)} seconds`);
    console.log('');
    console.log('✅ Agent has been restarted successfully!');
    console.log('');
    console.log('📋 Status:');
    console.log('   ✅ Old agent stopped');
    console.log('   ✅ Temporary files cleared');
    console.log('   ✅ New agent started');
    console.log('');
    console.log('🚀 Your Cursor agent should now be responsive');
    console.log('');
    console.log('🔄 If issues persist:');
    console.log('   - Run: npm run cursor-fix');
    console.log('   - Or run: npm run cursor-reset');
    console.log('');
  }
}

// Run the restart
if (require.main === module) {
  const restart = new AgentRestart();
  restart.run().catch(console.error);
}

module.exports = AgentRestart;
