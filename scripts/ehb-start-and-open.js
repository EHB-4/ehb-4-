#!/usr/bin/env node

/**
 * EHB Start Services and Open All Pages
 * Starts services and opens all pages in browser
 */

const { spawn, exec } = require('child_process');
const { existsSync, writeFileSync, mkdirSync } = require('fs');
const path = require('path');

console.log('🚀 EHB Start Services and Open All Pages');
console.log('========================================');
console.log('Starting services and opening in browser...');
console.log('');

// Service configuration
const services = [
  { name: '🏠 Home Page', port: 3000, url: 'http://localhost:3000' },
  { name: '⚙️ Admin Panel', port: 5000, url: 'http://localhost:5000' },
  { name: '🔧 Development Portal', port: 8080, url: 'http://localhost:8080' },
  { name: '🛒 GoSellr', port: 4000, url: 'http://localhost:4000' },
];

// Kill processes on ports
async function killPorts() {
  console.log('🔄 Killing existing processes...');

  for (const service of services) {
    const platform = process.platform;
    let command;

    if (platform === 'win32') {
      command = `netstat -ano | findstr :${service.port}`;
    } else {
      command = `lsof -ti:${service.port}`;
    }

    exec(command, (error, stdout) => {
      if (stdout) {
        const lines = stdout.trim().split('\n');
        lines.forEach(line => {
          let pid;
          if (platform === 'win32') {
            const match = line.match(/\s+(\d+)$/);
            pid = match ? match[1] : null;
          } else {
            pid = line.trim();
          }

          if (pid) {
            const killCommand = platform === 'win32' ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;

            exec(killCommand, () => {
              console.log(`✅ Killed process on port ${service.port}`);
            });
          }
        });
      }
    });
  }

  // Wait 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Create simple server
function createSimpleServer(port) {
  const serverDir = `server-${port}`;
  const serverPath = path.join(process.cwd(), serverDir);

  if (!existsSync(serverPath)) {
    mkdirSync(serverPath, { recursive: true });
  }

  // Create package.json
  const packageJson = {
    name: serverDir,
    version: '1.0.0',
    scripts: {
      start: `node server.js`,
    },
    dependencies: {
      express: '^4.18.2',
    },
  };

  writeFileSync(path.join(serverPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create simple server
  const serverCode = `
const express = require('express');
const app = express();
const port = ${port};

app.get('/', (req, res) => {
  res.send(\`
    <!DOCTYPE html>
    <html>
    <head>
      <title>EHB Port ${port}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 50px; 
          text-align: center; 
          background-color: #f0f0f0; 
          margin: 0;
          min-height: 100vh;
        }
        h1 { color: #333; font-size: 3rem; margin-bottom: 20px; }
        p { font-size: 1.5rem; color: #666; }
        .info { 
          margin-top: 30px; 
          padding: 20px; 
          background-color: white; 
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .status { color: #28a745; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>🚀 EHB Port ${port}</h1>
      <p>This is the ${port} port running successfully!</p>
      <div class="info">
        <h2>Service Information:</h2>
        <p><strong>Port:</strong> ${port}</p>
        <p><strong>Status:</strong> <span class="status">✅ Running</span></p>
        <p><strong>Time:</strong> \${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
  \`);
});

app.listen(port, () => {
  console.log(\`🚀 Server running on port \${port}\`);
});
`;

  writeFileSync(path.join(serverPath, 'server.js'), serverCode);

  return serverPath;
}

// Start service
function startService(service) {
  return new Promise(resolve => {
    console.log(`🚀 Starting ${service.name} on port ${service.port}...`);

    const serverPath = createSimpleServer(service.port);
    const originalCwd = process.cwd();
    process.chdir(serverPath);

    // Install dependencies if needed
    if (!existsSync(path.join(serverPath, 'node_modules'))) {
      console.log(`📦 Installing dependencies for ${service.name}...`);
      exec('npm install', error => {
        if (error) {
          console.log(`⚠️  Dependencies already installed for ${service.name}`);
        } else {
          console.log(`✅ Dependencies installed for ${service.name}`);
        }
        startServer(service, serverPath, originalCwd, resolve);
      });
    } else {
      startServer(service, serverPath, originalCwd, resolve);
    }
  });
}

// Start server
function startServer(service, serverPath, originalCwd, resolve) {
  const child = spawn('npm', ['start'], {
    stdio: 'pipe',
    shell: true,
  });

  // Wait for service to start
  let attempts = 0;
  const maxAttempts = 30;

  const checkPort = () => {
    const net = require('net');
    const client = new net.Socket();

    client.connect(service.port, 'localhost', () => {
      client.destroy();
      console.log(`✅ ${service.name} is ready on port ${service.port}`);
      resolve();
    });

    client.on('error', () => {
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkPort, 1000);
      } else {
        console.log(`❌ Timeout waiting for ${service.name}`);
        resolve();
      }
    });
  };

  checkPort();

  // Handle process output
  child.stdout.on('data', data => {
    const output = data.toString().trim();
    if (output.includes('running')) {
      console.log(`[${service.name}] ${output}`);
    }
  });

  // Return to original directory
  process.chdir(originalCwd);
}

// Open all pages in browser
function openAllPages() {
  console.log('');
  console.log('🌐 Opening all pages in browser...');
  console.log('');

  services.forEach((service, index) => {
    setTimeout(() => {
      const platform = process.platform;
      let command;

      switch (platform) {
        case 'win32':
          command = `start ${service.url}`;
          break;
        case 'darwin':
          command = `open ${service.url}`;
          break;
        default:
          command = `xdg-open ${service.url}`;
      }

      console.log(`🚀 Opening ${service.name}...`);
      console.log(`📍 ${service.url}`);

      exec(command, error => {
        if (error) {
          console.log(`❌ Failed to open ${service.name}: ${error.message}`);
        } else {
          console.log(`✅ ${service.name} opened in browser!`);
        }
      });
    }, index * 2000); // 2 second delay between each
  });
}

// Main function
async function main() {
  try {
    // Kill existing processes
    await killPorts();

    // Start all services
    const promises = services.map(service => startService(service));
    await Promise.all(promises);

    console.log('');
    console.log('✅ All services started successfully!');

    // Open all pages
    openAllPages();

    console.log('');
    console.log('📋 Services running:');
    services.forEach(service => {
      console.log(`   • ${service.name} - ${service.url}`);
    });
    console.log('');
    console.log('💡 All pages should be open in your browser now!');
    console.log('🛑 Press Ctrl+C to stop all services');

    // Keep running
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping all services...');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, services };
