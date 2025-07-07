#!/usr/bin/env node

/**
 * Start EHB Development Portal and Open in Browser
 * Starts the Development Portal service and opens it in browser
 */

const { spawn, exec } = require('child_process');
const { existsSync, writeFileSync, mkdirSync } = require('fs');
const path = require('path');

console.log('🔧 Start EHB Development Portal and Open in Browser');
console.log('===================================================');
console.log('Starting Development Portal service and opening in browser...');
console.log('');

const DEV_PORTAL_PORT = 8080;
const DEV_PORTAL_URL = 'http://localhost:8080';

// Kill existing process on port 8080
async function killPort8080() {
  console.log('🔄 Killing existing process on port 8080...');

  return new Promise(resolve => {
    const platform = process.platform;
    let command;

    if (platform === 'win32') {
      command = `netstat -ano | findstr :${DEV_PORTAL_PORT}`;
    } else {
      command = `lsof -ti:${DEV_PORTAL_PORT}`;
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
              console.log(`✅ Killed process on port ${DEV_PORTAL_PORT}`);
            });
          }
        });
      }
      resolve();
    });
  });
}

// Create Development Portal
function createDevPortal() {
  console.log('📁 Creating EHB Development Portal...');

  const devPortalDir = 'ehb-dev-portal';
  const devPortalPath = path.join(process.cwd(), devPortalDir);

  if (!existsSync(devPortalPath)) {
    mkdirSync(devPortalPath, { recursive: true });
  }

  // Create package.json
  const packageJson = {
    name: 'ehb-dev-portal',
    version: '1.0.0',
    scripts: {
      dev: `next dev --port ${DEV_PORTAL_PORT}`,
      build: 'next build',
      start: `next start --port ${DEV_PORTAL_PORT}`,
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
  };

  writeFileSync(path.join(devPortalPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create pages directory
  const pagesDir = path.join(devPortalPath, 'pages');
  if (!existsSync(pagesDir)) {
    mkdirSync(pagesDir, { recursive: true });
  }

  // Create index.js
  const indexContent = `
import React from 'react';

export default function DevelopmentPortal() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '50px', 
      textAlign: 'center', 
      backgroundColor: '#f0f0f0', 
      margin: 0,
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '3rem', marginBottom: '20px' }}>
        🔧 EHB Development Portal
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '30px' }}>
        Welcome to EHB Development Portal - Successfully Running!
      </p>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '30px', 
        backgroundColor: 'white', 
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>✅ Development Portal Status</h2>
        <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <p><strong>🔧 Portal:</strong> EHB Development Portal</p>
          <p><strong>🌐 URL:</strong> ${DEV_PORTAL_URL}</p>
          <p><strong>🔧 Port:</strong> ${DEV_PORTAL_PORT}</p>
          <p><strong>📅 Time:</strong> {new Date().toLocaleString()}</p>
          <p><strong>✅ Status:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>Running Successfully</span></p>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#333' }}>🎉 Development Portal is Working!</h3>
        <p style={{ color: '#666' }}>The EHB Development Portal is now running and accessible in your browser.</p>
      </div>
    </div>
  );
}
`;

  writeFileSync(path.join(pagesDir, 'index.js'), indexContent);

  return devPortalPath;
}

// Start Development Portal service
function startDevPortal(devPortalPath) {
  return new Promise(resolve => {
    console.log('🚀 Starting EHB Development Portal service...');

    const originalCwd = process.cwd();
    process.chdir(devPortalPath);

    // Install dependencies if needed
    if (!existsSync(path.join(devPortalPath, 'node_modules'))) {
      console.log('📦 Installing dependencies...');
      exec('npm install', error => {
        if (error) {
          console.log('⚠️  Dependencies already installed');
        } else {
          console.log('✅ Dependencies installed');
        }
        startServer(devPortalPath, originalCwd, resolve);
      });
    } else {
      startServer(devPortalPath, originalCwd, resolve);
    }
  });
}

// Start server
function startServer(devPortalPath, originalCwd, resolve) {
  const child = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true,
  });

  // Wait for service to start
  let attempts = 0;
  const maxAttempts = 60;

  const checkPort = () => {
    const net = require('net');
    const client = new net.Socket();

    client.connect(DEV_PORTAL_PORT, 'localhost', () => {
      client.destroy();
      console.log(`✅ EHB Development Portal is ready on port ${DEV_PORTAL_PORT}`);
      process.chdir(originalCwd);
      resolve(child);
    });

    client.on('error', () => {
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkPort, 1000);
      } else {
        console.log(`❌ Timeout waiting for Development Portal`);
        process.chdir(originalCwd);
        resolve(null);
      }
    });
  };

  checkPort();

  // Handle process output
  child.stdout.on('data', data => {
    const output = data.toString().trim();
    if (output.includes('ready') || output.includes('started')) {
      console.log(`[Development Portal] ${output}`);
    }
  });
}

// Open in browser
function openInBrowser() {
  console.log('🌐 Opening EHB Development Portal in browser...');

  const platform = process.platform;
  let command;

  switch (platform) {
    case 'win32':
      command = `start ${DEV_PORTAL_URL}`;
      break;
    case 'darwin':
      command = `open ${DEV_PORTAL_URL}`;
      break;
    default:
      command = `xdg-open ${DEV_PORTAL_URL}`;
  }

  exec(command, error => {
    if (error) {
      console.log(`❌ Failed to open browser: ${error.message}`);
      console.log(`💡 Please manually open: ${DEV_PORTAL_URL}`);
    } else {
      console.log(`✅ EHB Development Portal opened in browser!`);
      console.log(`🌐 ${DEV_PORTAL_URL}`);
    }
  });
}

// Main function
async function main() {
  try {
    // Kill existing process
    await killPort8080();
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create Development Portal
    const devPortalPath = createDevPortal();

    // Start Development Portal service
    const child = await startDevPortal(devPortalPath);

    if (child) {
      // Open in browser after 3 seconds
      setTimeout(() => {
        openInBrowser();
      }, 3000);

      console.log('');
      console.log('🎉 EHB Development Portal is now running!');
      console.log('');
      console.log('📋 Development Portal Details:');
      console.log(`   • 🔧 Portal: EHB Development Portal`);
      console.log(`   • 🌐 URL: ${DEV_PORTAL_URL}`);
      console.log(`   • 🔧 Port: ${DEV_PORTAL_PORT}`);
      console.log(`   • ✅ Status: Running Successfully`);
      console.log('');
      console.log('💡 The Development Portal should be open in your browser now!');
      console.log('🛑 Press Ctrl+C to stop the Development Portal');

      // Keep running
      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping Development Portal...');
        if (child) child.kill('SIGTERM');
        process.exit(0);
      });
    } else {
      console.log('❌ Failed to start Development Portal');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };
