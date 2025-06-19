const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Production Build Process...');

try {
  // Step 1: Clean previous build
  console.log('📦 Cleaning previous build...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }

  // Step 2: Install dependencies
  console.log('📥 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Step 3: Generate Prisma client
  console.log('🗄️ Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Step 4: Build the application
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Production build completed successfully!');
  console.log('');
  console.log('🎯 Next Steps:');
  console.log('1. Test the build: npm run start');
  console.log('2. Deploy to your preferred platform');
  console.log('3. Set up environment variables in production');
  console.log('4. Configure monitoring and logging');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('');
  console.log('🔧 Troubleshooting:');
  console.log('1. Check for missing dependencies');
  console.log('2. Verify all imports are correct');
  console.log('3. Ensure all components are properly configured');
  process.exit(1);
}
