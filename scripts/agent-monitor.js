const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 Agent Monitor Started');
console.log('========================\n');

let devServer = null;
let isRestarting = false;
let restartCount = 0;
const MAX_RESTARTS = 5;

// Function to start development server
function startDevServer() {
  if (isRestarting) return;

  console.log(`🚀 Starting development server (attempt ${restartCount + 1})...`);

  // Kill any existing Node processes on port 3000
  try {
    exec('taskkill /f /im node.exe', error => {
      if (error) {
        console.log('   ℹ️ No existing processes to kill');
      } else {
        console.log('   ✅ Killed existing processes');
      }
    });
  } catch (error) {
    // Ignore errors
  }

  // Start new development server
  devServer = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true,
    cwd: process.cwd(),
  });

  devServer.stdout.on('data', data => {
    const output = data.toString();
    console.log(`📤 ${output.trim()}`);

    // Check if server started successfully
    if (output.includes('Local:') && output.includes('http://localhost:3000')) {
      console.log('✅ Development server started successfully!');
      restartCount = 0; // Reset restart count on success
    }
  });

  devServer.stderr.on('data', data => {
    const error = data.toString();
    console.log(`❌ ${error.trim()}`);

    // Check for common errors
    if (error.includes('yarn') && error.includes('not recognized')) {
      console.log('🔧 Fixing yarn issue...');
      fixYarnIssue();
    }

    if (error.includes('typescript') && error.includes('not found')) {
      console.log('🔧 Installing TypeScript dependencies...');
      installTypeScriptDeps();
    }
  });

  devServer.on('close', code => {
    console.log(`⚠️ Development server stopped with code ${code}`);

    if (restartCount < MAX_RESTARTS) {
      restartCount++;
      console.log(`🔄 Restarting in 3 seconds... (${restartCount}/${MAX_RESTARTS})`);

      setTimeout(() => {
        isRestarting = false;
        startDevServer();
      }, 3000);
    } else {
      console.log('❌ Max restart attempts reached. Please check manually.');
      process.exit(1);
    }
  });

  devServer.on('error', error => {
    console.log(`❌ Failed to start development server: ${error.message}`);
  });
}

// Function to fix yarn issues
function fixYarnIssue() {
  console.log('   🔧 Installing dependencies with npm instead of yarn...');

  exec('npm install typescript @types/react @types/node --save-dev', (error, stdout, stderr) => {
    if (error) {
      console.log(`   ❌ Error installing dependencies: ${error.message}`);
    } else {
      console.log('   ✅ Dependencies installed successfully');
    }
  });
}

// Function to install TypeScript dependencies
function installTypeScriptDeps() {
  console.log('   🔧 Installing TypeScript dependencies...');

  exec('npm install typescript @types/react @types/node --save-dev', (error, stdout, stderr) => {
    if (error) {
      console.log(`   ❌ Error installing TypeScript: ${error.message}`);
    } else {
      console.log('   ✅ TypeScript dependencies installed');
    }
  });
}

// Function to check if server is running
function checkServerHealth() {
  exec('netstat -ano | findstr :3000', (error, stdout, stderr) => {
    if (error || !stdout.trim()) {
      console.log('⚠️ Server not responding, restarting...');
      if (devServer) {
        devServer.kill();
      }
    }
  });
}

// Function to monitor system resources
function monitorResources() {
  exec('tasklist | findstr node', (error, stdout, stderr) => {
    const nodeProcesses = stdout.split('\n').filter(line => line.trim()).length;
    console.log(`📊 Node processes running: ${nodeProcesses}`);

    if (nodeProcesses > 10) {
      console.log('⚠️ Too many Node processes, cleaning up...');
      exec('taskkill /f /im node.exe', error => {
        if (!error) {
          console.log('✅ Cleaned up Node processes');
        }
      });
    }
  });
}

// Health check interval
setInterval(checkServerHealth, 30000); // Check every 30 seconds
setInterval(monitorResources, 60000); // Monitor resources every minute

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down agent monitor...');
  if (devServer) {
    devServer.kill();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down agent monitor...');
  if (devServer) {
    devServer.kill();
  }
  process.exit(0);
});

// Start the development server
startDevServer();

console.log('\n📋 Monitor Features:');
console.log('- ✅ Auto-restart on failure');
console.log('- ✅ Dependency auto-install');
console.log('- ✅ Process cleanup');
console.log('- ✅ Health monitoring');
console.log('- ✅ Resource management');
console.log('- ✅ Error recovery');

console.log('\n🎯 Agent monitor is now running!');
console.log('The development server will automatically restart if it stops.');
console.log('Press Ctrl+C to stop the monitor.');
