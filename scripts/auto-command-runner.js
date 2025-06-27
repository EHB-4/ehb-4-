#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * EHB Auto Command Runner
 * Automatically runs all npm scripts and commands
 */
class AutoCommandRunner {
  constructor() {
    this.runningCommands = new Map();
    this.packageJson = this.loadPackageJson();
    this.config = {
      autoRun: true,
      parallel: true,
      maxConcurrent: 5,
      retryFailed: true,
      maxRetries: 3,
    };
  }

  loadPackageJson() {
    try {
      const packagePath = path.join(process.cwd(), 'package.json');
      return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    } catch (error) {
      console.error('❌ Failed to load package.json:', error.message);
      return {};
    }
  }

  async init() {
    console.log('🚀 Starting EHB Auto Command Runner...');

    if (this.config.autoRun) {
      await this.runAllCommands();
    }

    this.setupFileWatcher();
    this.setupPeriodicRuns();

    console.log('✅ Auto Command Runner is now active!');
  }

  async runAllCommands() {
    const scripts = this.packageJson.scripts || {};
    const commandList = Object.entries(scripts);

    console.log(`📋 Found ${commandList.length} commands to run`);

    if (this.config.parallel) {
      await this.runCommandsParallel(commandList);
    } else {
      await this.runCommandsSequential(commandList);
    }
  }

  async runCommandsParallel(commandList) {
    const chunks = this.chunkArray(commandList, this.config.maxConcurrent);

    for (const chunk of chunks) {
      const promises = chunk.map(([name, command]) => this.runCommand(name, command));
      await Promise.all(promises);
    }
  }

  async runCommandsSequential(commandList) {
    for (const [name, command] of commandList) {
      await this.runCommand(name, command);
    }
  }

  async runCommand(name, command) {
    try {
      console.log(`🔄 Running: ${name} (${command})`);

      const process = spawn('npm', ['run', name], {
        shell: true,
        stdio: 'pipe',
        detached: false,
      });

      this.runningCommands.set(name, {
        process,
        command,
        startTime: Date.now(),
        retries: 0,
        status: 'running',
      });

      return new Promise((resolve, reject) => {
        let output = '';
        let errorOutput = '';

        process.stdout.on('data', data => {
          const message = data.toString().trim();
          output += message + '\n';
          console.log(`[${name}] ${message}`);
        });

        process.stderr.on('data', data => {
          const message = data.toString().trim();
          errorOutput += message + '\n';
          console.error(`[${name}] ERROR: ${message}`);
        });

        process.on('close', code => {
          const commandInfo = this.runningCommands.get(name);
          if (commandInfo) {
            commandInfo.status = code === 0 ? 'completed' : 'failed';
            commandInfo.exitCode = code;
            commandInfo.output = output;
            commandInfo.errorOutput = errorOutput;
          }

          console.log(`[${name}] Completed with code ${code}`);

          if (code !== 0 && this.config.retryFailed) {
            this.retryCommand(name, command);
          }

          resolve(code);
        });

        process.on('error', error => {
          console.error(`[${name}] Process error:`, error.message);

          const commandInfo = this.runningCommands.get(name);
          if (commandInfo) {
            commandInfo.status = 'error';
            commandInfo.error = error.message;
          }

          if (this.config.retryFailed) {
            this.retryCommand(name, command);
          }

          reject(error);
        });
      });
    } catch (error) {
      console.error(`❌ Failed to run ${name}:`, error.message);
    }
  }

  retryCommand(name, command) {
    const commandInfo = this.runningCommands.get(name);

    if (!commandInfo || commandInfo.retries >= this.config.maxRetries) {
      console.error(`❌ Max retries reached for ${name}`);
      return;
    }

    console.log(
      `🔄 Retrying ${name} (attempt ${commandInfo.retries + 1}/${this.config.maxRetries})`
    );

    setTimeout(async () => {
      commandInfo.retries++;
      await this.runCommand(name, command);
    }, 2000);
  }

  setupFileWatcher() {
    const watcher = require('chokidar').watch(
      ['package.json', 'scripts/**/*.js', 'scripts/**/*.ts'],
      {
        ignored: ['node_modules/**', '.next/**', '*.log'],
        persistent: true,
      }
    );

    watcher.on('change', filePath => {
      console.log(`📝 File changed: ${filePath}`);

      if (filePath.endsWith('package.json')) {
        console.log('🔄 Package.json changed, reloading commands...');
        this.packageJson = this.loadPackageJson();
        this.runAllCommands();
      }
    });
  }

  setupPeriodicRuns() {
    // Run all commands every hour
    setInterval(
      async () => {
        console.log('⏰ Periodic command execution...');
        await this.runAllCommands();
      },
      60 * 60 * 1000
    ); // 1 hour
  }

  getStatus() {
    const status = {};

    for (const [name, commandInfo] of this.runningCommands) {
      status[name] = {
        status: commandInfo.status,
        uptime: Date.now() - commandInfo.startTime,
        retries: commandInfo.retries,
        exitCode: commandInfo.exitCode,
      };
    }

    return status;
  }

  async stop() {
    console.log('🛑 Stopping Auto Command Runner...');

    for (const [name, commandInfo] of this.runningCommands) {
      console.log(`🛑 Stopping ${name}...`);
      commandInfo.process.kill();
    }

    this.runningCommands.clear();
    console.log('✅ Auto Command Runner stopped');
    process.exit(0);
  }
}

// Main execution
async function main() {
  const autoRunner = new AutoCommandRunner();

  // Handle graceful shutdown
  process.on('SIGINT', () => autoRunner.stop());
  process.on('SIGTERM', () => autoRunner.stop());

  // Start the system
  await autoRunner.init();

  // Keep the process alive and show status
  setInterval(() => {
    const status = autoRunner.getStatus();
    console.log('📊 Command Runner Status:', status);
  }, 60000); // Log status every minute
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoCommandRunner;
