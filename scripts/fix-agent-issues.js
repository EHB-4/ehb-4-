const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Agent Issues Diagnosis & Fix');
console.log('================================\n');

// Check common issues
const issues = [];

// 1. Check Node.js processes
console.log('1. 🔍 Checking Node.js processes...');
try {
  const nodeProcesses = execSync('tasklist | findstr node', { encoding: 'utf8' });
  console.log(
    '   ✅ Node.js processes running:',
    nodeProcesses.split('\n').filter(line => line.trim()).length
  );
} catch (error) {
  console.log('   ⚠️ No Node.js processes found');
  issues.push('No Node.js processes running');
}

// 2. Check package.json
console.log('\n2. 🔍 Checking package.json...');
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log('   ✅ Package.json exists');
  console.log('   📦 Dependencies:', Object.keys(packageJson.dependencies || {}).length);
  console.log('   🛠️ DevDependencies:', Object.keys(packageJson.devDependencies || {}).length);
} else {
  console.log('   ❌ Package.json not found');
  issues.push('Package.json missing');
}

// 3. Check environment variables
console.log('\n3. 🔍 Checking environment variables...');
const envVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'];
envVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`   ✅ ${envVar}: Set`);
  } else {
    console.log(`   ⚠️ ${envVar}: Not set`);
    issues.push(`${envVar} not configured`);
  }
});

// 4. Check database files
console.log('\n4. 🔍 Checking database files...');
const dbFiles = [
  'lib/awsOnlyClient.ts',
  'lib/jsonDatabase.ts',
  'lib/memoryDatabase.ts',
  'lib/databaseClient.ts',
];

dbFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}: Exists`);
  } else {
    console.log(`   ❌ ${file}: Missing`);
    issues.push(`${file} missing`);
  }
});

// 5. Check scripts
console.log('\n5. 🔍 Checking scripts...');
const scripts = [
  'scripts/setup-aws-database.js',
  'scripts/test-aws-database.js',
  'scripts/remove-supabase.js',
];

scripts.forEach(script => {
  const scriptPath = path.join(__dirname, '..', script);
  if (fs.existsSync(scriptPath)) {
    console.log(`   ✅ ${script}: Exists`);
  } else {
    console.log(`   ❌ ${script}: Missing`);
    issues.push(`${script} missing`);
  }
});

// 6. Check Next.js configuration
console.log('\n6. 🔍 Checking Next.js configuration...');
const nextConfig = path.join(__dirname, '..', 'next.config.js');
if (fs.existsSync(nextConfig)) {
  console.log('   ✅ Next.config.js: Exists');
} else {
  console.log('   ⚠️ Next.config.js: Not found (may be optional)');
}

// 7. Check TypeScript configuration
console.log('\n7. 🔍 Checking TypeScript configuration...');
const tsConfig = path.join(__dirname, '..', 'tsconfig.json');
if (fs.existsSync(tsConfig)) {
  console.log('   ✅ tsconfig.json: Exists');
} else {
  console.log('   ⚠️ tsconfig.json: Not found');
  issues.push('TypeScript configuration missing');
}

// Summary
console.log('\n📋 Issues Found:');
console.log('================');
if (issues.length === 0) {
  console.log('✅ No issues found! Agent should work properly.');
} else {
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ❌ ${issue}`);
  });
}

// Solutions
console.log('\n🔧 Solutions:');
console.log('=============');

if (issues.includes('No Node.js processes running')) {
  console.log('\n1. 🚀 Start Node.js processes:');
  console.log('   npm run dev');
  console.log('   # or');
  console.log('   node scripts/test-aws-database.js');
}

if (issues.some(issue => issue.includes('not configured'))) {
  console.log('\n2. 🔑 Configure AWS credentials:');
  console.log('   export AWS_ACCESS_KEY_ID=your_key');
  console.log('   export AWS_SECRET_ACCESS_KEY=your_secret');
  console.log('   export AWS_REGION=ap-south-1');
}

if (issues.includes('Package.json missing')) {
  console.log('\n3. 📦 Reinstall dependencies:');
  console.log('   npm install');
}

if (issues.includes('TypeScript configuration missing')) {
  console.log('\n4. 📝 Create TypeScript config:');
  console.log('   npx tsc --init');
}

// Common fixes
console.log('\n🛠️ Common Fixes:');
console.log('================');

console.log('\n1. 🔄 Restart Agent:');
console.log('   - Stop current agent');
console.log('   - Clear terminal');
console.log('   - Restart agent');

console.log('\n2. 🧹 Clear Cache:');
console.log('   npm run build');
console.log('   # or');
console.log('   rm -rf .next && npm run dev');

console.log('\n3. 🔧 Check Ports:');
console.log('   netstat -ano | findstr :3000');
console.log('   # Kill process if port is busy');

console.log('\n4. 📊 Monitor Resources:');
console.log('   - Check CPU usage');
console.log('   - Check memory usage');
console.log('   - Check disk space');

console.log('\n5. 🐛 Debug Mode:');
console.log('   NODE_ENV=development npm run dev');
console.log('   # or');
console.log('   DEBUG=* npm run dev');

// Auto-fix script
console.log('\n🚀 Auto-Fix Commands:');
console.log('=====================');

console.log('\n# Kill all Node processes');
console.log('taskkill /f /im node.exe');

console.log('\n# Clear npm cache');
console.log('npm cache clean --force');

console.log('\n# Reinstall dependencies');
console.log('rm -rf node_modules package-lock.json');
console.log('npm install');

console.log('\n# Start fresh');
console.log('npm run dev');

console.log('\n✅ Diagnosis completed!');
console.log('\n💡 If agent still stops:');
console.log('1. Check system resources');
console.log('2. Update Node.js version');
console.log('3. Check firewall settings');
console.log('4. Restart your computer');
