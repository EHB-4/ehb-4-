const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Quick Start Agent');
console.log('====================\n');

// Step 1: Check and install TypeScript dependencies
console.log('1. 🔍 Checking TypeScript dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const devDeps = packageJson.devDependencies || {};

  const requiredDeps = ['typescript', '@types/react', '@types/node'];
  const missingDeps = requiredDeps.filter(dep => !devDeps[dep]);

  if (missingDeps.length > 0) {
    console.log(`   ⚠️ Missing dependencies: ${missingDeps.join(', ')}`);
    console.log('   🔧 Installing missing dependencies...');
    execSync(`npm install ${missingDeps.join(' ')} --save-dev`, { stdio: 'inherit' });
    console.log('   ✅ Dependencies installed');
  } else {
    console.log('   ✅ All TypeScript dependencies present');
  }
} catch (error) {
  console.log('   ❌ Error checking dependencies:', error.message);
}

// Step 2: Kill existing processes
console.log('\n2. 🔄 Cleaning up existing processes...');
try {
  execSync('taskkill /f /im node.exe', { stdio: 'ignore' });
  console.log('   ✅ Killed existing Node processes');
} catch (error) {
  console.log('   ℹ️ No processes to kill');
}

// Step 3: Clear Next.js cache
console.log('\n3. 🧹 Clearing Next.js cache...');
try {
  const nextCache = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextCache)) {
    execSync('rmdir /s /q .next', { stdio: 'ignore' });
    console.log('   ✅ Cleared Next.js cache');
  } else {
    console.log('   ℹ️ No cache to clear');
  }
} catch (error) {
  console.log('   ⚠️ Could not clear cache:', error.message);
}

// Step 4: Check port availability
console.log('\n4. 🔧 Checking port 3000...');
try {
  const portCheck = execSync('netstat -ano | findstr :3000', { encoding: 'utf8' });
  if (portCheck.trim()) {
    console.log('   ⚠️ Port 3000 is busy, killing process...');
    const lines = portCheck.split('\n');
    for (const line of lines) {
      if (line.includes('LISTENING')) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
          console.log(`   ✅ Killed process ${pid}`);
        } catch (error) {
          // Ignore errors
        }
      }
    }
  } else {
    console.log('   ✅ Port 3000 is available');
  }
} catch (error) {
  console.log('   ✅ Port 3000 is available');
}

// Step 5: Start development server
console.log('\n5. 🚀 Starting development server...');
console.log('   Starting with auto-restart capability...');

try {
  // Start the monitor script which will handle the development server
  execSync('node scripts/agent-monitor.js', { stdio: 'inherit' });
} catch (error) {
  console.log('   ❌ Failed to start monitor, trying direct start...');

  try {
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (directError) {
    console.log('   ❌ Failed to start development server:', directError.message);
    console.log('\n🔧 Trying alternative approach...');

    // Try with different port
    try {
      console.log('   🔄 Trying port 3001...');
      execSync('next dev --port 3001', { stdio: 'inherit' });
    } catch (portError) {
      console.log('   ❌ All attempts failed');
      console.log('\n💡 Manual steps to try:');
      console.log('1. npm install');
      console.log('2. npm run build');
      console.log('3. npm run dev');
    }
  }
}

console.log('\n✅ Quick start completed!');
console.log('\n📋 If agent stops again:');
console.log('- Run: npm run monitor (for auto-restart)');
console.log('- Run: npm run fix-agent (for diagnosis)');
console.log('- Run: npm run auto-fix (for automatic fixes)');
