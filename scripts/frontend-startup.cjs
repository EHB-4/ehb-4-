const { spawn } = require('child_process');
const path = require('path');

class FrontendStartup {
  constructor() {
    this.projectRoot = process.cwd();
  }

  async start() {
    console.log('🚀 Starting Frontend Development Server...');
    console.log('⚡ Backend features are DISABLED for ultra-fast performance');
    console.log('🤖 Cursor AI is optimized for frontend development');
    console.log('');

    // Start development server
    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      cwd: this.projectRoot
    });

    devProcess.on('error', (error) => {
      console.error('❌ Frontend startup failed:', error.message);
    });

    devProcess.on('close', (code) => {
      console.log(`\n✅ Frontend server stopped with code: ${code}`);
    });
  }
}

module.exports = FrontendStartup;
