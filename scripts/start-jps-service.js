#!/usr/bin/env node

/**
 * Start JPS (Job Placement System) Service
 * Runs on port 4005
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const JPS_PORT = 4005;
const JPS_NAME = 'JPS (Job Placement System)';
const LOG_FILE = path.join(__dirname, '../logs/jps-service.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(LOG_FILE))) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage);
}

function killProcessOnPort(port) {
  return new Promise(resolve => {
    const { exec } = require('child_process');
    const platform = process.platform;

    let command;
    if (platform === 'win32') {
      command = `netstat -ano | findstr :${port}`;
    } else {
      command = `lsof -ti:${port}`;
    }

    exec(command, (error, stdout) => {
      if (stdout) {
        const pids = stdout.trim().split('\n');
        pids.forEach(pid => {
          const cleanPid = platform === 'win32' ? pid.split(/\s+/).pop() : pid;
          if (cleanPid && !isNaN(cleanPid)) {
            try {
              process.kill(cleanPid, 'SIGTERM');
              log(`Killed process ${cleanPid} on port ${port}`);
            } catch (err) {
              log(`Could not kill process ${cleanPid}: ${err.message}`);
            }
          }
        });
      }
      resolve();
    });
  });
}

async function startJPSService() {
  log(`🚀 Starting ${JPS_NAME} on port ${JPS_PORT}...`);

  try {
    // Kill any existing process on the port
    await killProcessOnPort(JPS_PORT);

    // Start the Next.js development server
    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, PORT: JPS_PORT.toString() },
    });

    child.stdout.on('data', data => {
      const output = data.toString().trim();
      log(`📤 ${output}`);

      // Check if server is ready
      if (
        output.includes('Ready in') ||
        output.includes('Local:') ||
        output.includes(`localhost:${JPS_PORT}`)
      ) {
        log(`✅ ${JPS_NAME} is running on http://localhost:${JPS_PORT}`);
        log(`🎯 JPS Dashboard: http://localhost:${JPS_PORT}/jps`);
        log(`📊 Job Listings: http://localhost:${JPS_PORT}/jps?tab=jobs`);
        log(`👥 Candidate Profiles: http://localhost:${JPS_PORT}/jps?tab=candidates`);
        log(`🤖 AI Matching: http://localhost:${JPS_PORT}/jps?tab=matching`);
        log(`📈 Analytics: http://localhost:${JPS_PORT}/jps?tab=analytics`);
      }
    });

    child.stderr.on('data', data => {
      const error = data.toString().trim();
      log(`❌ Error: ${error}`);
    });

    child.on('close', code => {
      log(`⚠️ ${JPS_NAME} process closed with code ${code}`);
    });

    child.on('error', error => {
      log(`❌ Failed to start ${JPS_NAME}: ${error.message}`);
    });

    // Handle process termination
    process.on('SIGINT', () => {
      log(`🛑 Stopping ${JPS_NAME}...`);
      child.kill('SIGTERM');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      log(`🛑 Stopping ${JPS_NAME}...`);
      child.kill('SIGTERM');
      process.exit(0);
    });
  } catch (error) {
    log(`❌ Failed to start ${JPS_NAME}: ${error.message}`);
    process.exit(1);
  }
}

// Start the service
startJPSService();
