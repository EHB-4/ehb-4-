const { spawn } = require('child_process');

console.log('🚀 EHB Auto Runner Starting...');
console.log('=============================');

// Kill existing Node processes
console.log('🔄 Stopping existing processes...');
if (process.platform === 'win32') {
  spawn('taskkill', ['/F', '/IM', 'node.exe'], { stdio: 'ignore' });
} else {
  spawn('pkill', ['-f', 'node'], { stdio: 'ignore' });
}

// Start development server
console.log('🚀 Starting development server...');
const dev = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

// Open browser after 5 seconds
setTimeout(() => {
  console.log('🌐 Opening browser...');
  if (process.platform === 'win32') {
    spawn('start', ['http://localhost:3000'], { shell: true });
    spawn('start', ['http://localhost:3000/development-portal'], { shell: true });
  } else {
    spawn('open', ['http://localhost:3000']);
  }
}, 5000);

// Handle process exit
dev.on('close', code => {
  console.log(`Dev server exited with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping auto runner...');
  dev.kill();
  process.exit(0);
});
