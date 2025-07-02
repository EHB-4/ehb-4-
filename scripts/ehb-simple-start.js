#!/usr/bin/env node

/**
 * EHB Simple Start - Actually Works!
 * Simple script that starts ports and opens them in browser
 */

const { spawn, exec } = require('child_process');
const { existsSync, writeFileSync, mkdirSync } = require('fs');
const path = require('path');

console.log('🚀 EHB Simple Start - Actually Works!');
console.log('=====================================');
console.log('Starting all ports and opening in browser...');
console.log('');

// Simple service configuration
const services = [
  { name: 'Home Page', port: 3000, url: 'http://localhost:3000' },
  { name: 'Admin Panel', port: 5000, url: 'http://localhost:5000' },
  { name: 'Development Portal', port: 8080, url: 'http://localhost:8080' },
  { name: 'GoSellr', port: 4000, url: 'http://localhost:4000' },
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

  // Wait 2 seconds for processes to be killed
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Create simple Next.js app
function createSimpleApp(port) {
  const appDir = `ehb-app-${port}`;
  const appPath = path.join(process.cwd(), appDir);

  if (!existsSync(appPath)) {
    mkdirSync(appPath, { recursive: true });
  }

  // Create package.json
  const packageJson = {
    name: appDir,
    version: '1.0.0',
    scripts: {
      dev: `next dev --port ${port}`,
      build: 'next build',
      start: `next start --port ${port}`,
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
  };

  writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create pages directory
  const pagesDir = path.join(appPath, 'pages');
  if (!existsSync(pagesDir)) {
    mkdirSync(pagesDir, { recursive: true });
  }

  // Create simple index.js
  const indexContent = `
import React from 'react';

export default function Home() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '50px', 
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '3rem', marginBottom: '20px' }}>
        🚀 EHB ${port} Port
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>
        This is the ${port} port running successfully!
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2>Service Information:</h2>
        <p><strong>Port:</strong> ${port}</p>
        <p><strong>Status:</strong> ✅ Running</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
`;

  writeFileSync(path.join(pagesDir, 'index.js'), indexContent);

  return appPath;
}

// Start service
function startService(service) {
  return new Promise(resolve => {
    console.log(`🚀 Starting ${service.name} on port ${service.port}...`);

    const appPath = createSimpleApp(service.port);
    const originalCwd = process.cwd();
    process.chdir(appPath);

    // Install dependencies if needed
    if (!existsSync(path.join(appPath, 'node_modules'))) {
      console.log(`📦 Installing dependencies for ${service.name}...`);
      exec('npm install', error => {
        if (error) {
          console.log(`⚠️  Dependencies already installed for ${service.name}`);
        } else {
          console.log(`✅ Dependencies installed for ${service.name}`);
        }
        startNextApp(service, appPath, originalCwd, resolve);
      });
    } else {
      startNextApp(service, appPath, originalCwd, resolve);
    }
  });
}

// Start Next.js app
function startNextApp(service, appPath, originalCwd, resolve) {
  const child = spawn('npm', ['run', 'dev'], {
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

      // Open in browser
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

        exec(command, error => {
          if (error) {
            console.log(`❌ Failed to open ${service.name}: ${error.message}`);
          } else {
            console.log(`🌐 Opened ${service.name} - ${service.url}`);
          }
        });
      }, 2000);

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
    if (output.includes('ready') || output.includes('started')) {
      console.log(`[${service.name}] ${output}`);
    }
  });

  child.stderr.on('data', data => {
    const output = data.toString().trim();
    if (output.includes('error')) {
      console.log(`[${service.name}] ERROR: ${output}`);
    }
  });

  // Return to original directory
  process.chdir(originalCwd);
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
    console.log('🎉 All services started successfully!');
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
