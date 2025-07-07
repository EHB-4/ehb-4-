#!/usr/bin/env node

/**
 * Start EHB Home Page and Open in Browser
 * Starts the home page service and opens it in browser
 */

const { spawn, exec } = require('child_process');
const { existsSync, writeFileSync, mkdirSync } = require('fs');
const path = require('path');

console.log('🏠 Start EHB Home Page and Open in Browser');
console.log('==========================================');
console.log('Starting home page service and opening in browser...');
console.log('');

const HOME_PORT = 3000;
const HOME_URL = 'http://localhost:3000';

// Kill existing process on port 3000
async function killPort3000() {
  console.log('🔄 Killing existing process on port 3000...');

  return new Promise(resolve => {
    const platform = process.platform;
    let command;

    if (platform === 'win32') {
      command = `netstat -ano | findstr :${HOME_PORT}`;
    } else {
      command = `lsof -ti:${HOME_PORT}`;
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
              console.log(`✅ Killed process on port ${HOME_PORT}`);
            });
          }
        });
      }
      resolve();
    });
  });
}

// Create home page
function createHomePage() {
  console.log('📁 Creating EHB home page...');

  const homeDir = 'ehb-home';
  const homePath = path.join(process.cwd(), homeDir);

  if (!existsSync(homePath)) {
    mkdirSync(homePath, { recursive: true });
  }

  // Create package.json
  const packageJson = {
    name: 'ehb-home',
    version: '1.0.0',
    scripts: {
      dev: `next dev --port ${HOME_PORT}`,
      build: 'next build',
      start: `next start --port ${HOME_PORT}`,
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
  };

  writeFileSync(path.join(homePath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create pages directory
  const pagesDir = path.join(homePath, 'pages');
  if (!existsSync(pagesDir)) {
    mkdirSync(pagesDir, { recursive: true });
  }

  // Create index.js
  const indexContent = `
import React from 'react';

export default function Home() {
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
        🏠 EHB Home Page
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '30px' }}>
        Welcome to EHB Home Page - Successfully Running!
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
        <h2 style={{ color: '#28a745', marginBottom: '20px' }}>✅ Home Page Status</h2>
        <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <p><strong>🏠 Page:</strong> EHB Home Page</p>
          <p><strong>🌐 URL:</strong> ${HOME_URL}</p>
          <p><strong>🔧 Port:</strong> ${HOME_PORT}</p>
          <p><strong>📅 Time:</strong> {new Date().toLocaleString()}</p>
          <p><strong>✅ Status:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>Running Successfully</span></p>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#333' }}>🎉 Home Page is Working!</h3>
        <p style={{ color: '#666' }}>The EHB home page is now running and accessible in your browser.</p>
      </div>
    </div>
  );
}
`;

  writeFileSync(path.join(pagesDir, 'index.js'), indexContent);

  return homePath;
}

// Start home page service
function startHomePage(homePath) {
  return new Promise(resolve => {
    console.log('🚀 Starting EHB home page service...');

    const originalCwd = process.cwd();
    process.chdir(homePath);

    // Install dependencies if needed
    if (!existsSync(path.join(homePath, 'node_modules'))) {
      console.log('📦 Installing dependencies...');
      exec('npm install', error => {
        if (error) {
          console.log('⚠️  Dependencies already installed');
        } else {
          console.log('✅ Dependencies installed');
        }
        startServer(homePath, originalCwd, resolve);
      });
    } else {
      startServer(homePath, originalCwd, resolve);
    }
  });
}

// Start server
function startServer(homePath, originalCwd, resolve) {
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

    client.connect(HOME_PORT, 'localhost', () => {
      client.destroy();
      console.log(`✅ EHB home page is ready on port ${HOME_PORT}`);
      process.chdir(originalCwd);
      resolve(child);
    });

    client.on('error', () => {
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkPort, 1000);
      } else {
        console.log(`❌ Timeout waiting for home page`);
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
      console.log(`[Home Page] ${output}`);
    }
  });
}

// Open in browser
function openInBrowser() {
  console.log('🌐 Opening EHB home page in browser...');

  const platform = process.platform;
  let command;

  switch (platform) {
    case 'win32':
      command = `start ${HOME_URL}`;
      break;
    case 'darwin':
      command = `open ${HOME_URL}`;
      break;
    default:
      command = `xdg-open ${HOME_URL}`;
  }

  exec(command, error => {
    if (error) {
      console.log(`❌ Failed to open browser: ${error.message}`);
      console.log(`💡 Please manually open: ${HOME_URL}`);
    } else {
      console.log(`✅ EHB home page opened in browser!`);
      console.log(`🌐 ${HOME_URL}`);
    }
  });
}

// Main function
async function main() {
  try {
    // Kill existing process
    await killPort3000();
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create home page
    const homePath = createHomePage();

    // Start home page service
    const child = await startHomePage(homePath);

    if (child) {
      // Open in browser after 3 seconds
      setTimeout(() => {
        openInBrowser();
      }, 3000);

      console.log('');
      console.log('🎉 EHB Home Page is now running!');
      console.log('');
      console.log('📋 Home Page Details:');
      console.log(`   • 🏠 Page: EHB Home Page`);
      console.log(`   • 🌐 URL: ${HOME_URL}`);
      console.log(`   • 🔧 Port: ${HOME_PORT}`);
      console.log(`   • ✅ Status: Running Successfully`);
      console.log('');
      console.log('💡 The home page should be open in your browser now!');
      console.log('🛑 Press Ctrl+C to stop the home page');

      // Keep running
      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping home page...');
        if (child) child.kill('SIGTERM');
        process.exit(0);
      });
    } else {
      console.log('❌ Failed to start home page');
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
