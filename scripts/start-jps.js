#!/usr/bin/env node

const { spawn } = require('child_process');
const open = require('open');
const path = require('path');

console.log('🚀 Starting JPS (Job Placement System) Development Server...');

// Kill any existing processes on port 4005
const killProcess = spawn('npx', ['kill-port', '4005'], { 
    stdio: 'inherit',
    shell: true 
});

killProcess.on('close', () => {
    console.log('✅ Port 4005 cleared');
    
    // Start JPS development server
    const jpsProcess = spawn('npm', ['run', 'dev'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: true,
        env: {
            ...process.env,
            PORT: '4005'
        }
    });

    // Wait a moment for server to start
    setTimeout(() => {
        console.log('🌐 Opening JPS Dashboard...');
        open('http://localhost:4005/jps');
        
        // Open additional JPS pages
        setTimeout(() => {
            console.log('📊 Opening JPS Analytics...');
            open('http://localhost:4005/jps/analytics');
        }, 2000);
        
        setTimeout(() => {
            console.log('🎯 Opening JPS Matching...');
            open('http://localhost:4005/jps/matching');
        }, 4000);
        
        setTimeout(() => {
            console.log('📝 Opening JPS Assessment...');
            open('http://localhost:4005/jps/assessment');
        }, 6000);
        
        setTimeout(() => {
            console.log('📅 Opening JPS Interviews...');
            open('http://localhost:4005/jps/interviews');
        }, 8000);
        
        setTimeout(() => {
            console.log('⚙️ Opening JPS Settings...');
            open('http://localhost:4005/jps/settings');
        }, 10000);
    }, 3000);

    jpsProcess.on('close', (code) => {
        console.log(`JPS server exited with code ${code}`);
    });

    jpsProcess.on('error', (err) => {
        console.error('Failed to start JPS server:', err);
    });
});

console.log('📋 JPS Pages that will be opened:');
console.log('   • Main Dashboard: http://localhost:4005/jps');
console.log('   • Analytics: http://localhost:4005/jps/analytics');
console.log('   • AI Matching: http://localhost:4005/jps/matching');
console.log('   • Skill Assessment: http://localhost:4005/jps/assessment');
console.log('   • Interview Management: http://localhost:4005/jps/interviews');
console.log('   • Settings: http://localhost:4005/jps/settings'); 