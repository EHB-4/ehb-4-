#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Running permanent fixes for EHB Next.js Platform...');

// Function to run commands safely
function runCommand(command, description) {
  try {
    console.log(`\n📋 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully`);
  } catch (error) {
    console.log(`⚠️  ${description} failed: ${error.message}`);
  }
}

// Function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to create directory if it doesn't exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Main fix function
function runPermanentFixes() {
  console.log('\n🚀 Starting permanent fixes...\n');

  // 1. Kill any existing Node processes
  runCommand(
    'taskkill /F /IM node.exe 2>nul || echo No Node processes to kill',
    'Killing existing Node processes'
  );

  // 2. Clean npm cache
  runCommand('npm cache clean --force', 'Cleaning npm cache');

  // 3. Remove problematic directories
  const dirsToRemove = ['.next', 'node_modules/.cache', 'out', 'dist'];
  dirsToRemove.forEach(dir => {
    if (fileExists(dir)) {
      runCommand(`rimraf ${dir}`, `Removing ${dir} directory`);
    }
  });

  // 4. Remove package-lock.json if corrupted
  if (fileExists('package-lock.json')) {
    try {
      const lockContent = fs.readFileSync('package-lock.json', 'utf8');
      if (lockContent.includes('UNKNOWN') || lockContent.length < 100) {
        runCommand('Remove-Item -Force package-lock.json', 'Removing corrupted package-lock.json');
      }
    } catch (error) {
      runCommand('Remove-Item -Force package-lock.json', 'Removing corrupted package-lock.json');
    }
  }

  // 5. Ensure essential directories exist
  const essentialDirs = [
    'components',
    'lib',
    'types',
    'hooks',
    'contexts',
    'middleware',
    'models',
    'services',
    'scripts',
    'config',
    'docs',
    'public',
    'styles',
    'translations',
  ];

  essentialDirs.forEach(dir => ensureDir(dir));

  // 6. Reinstall dependencies with legacy peer deps
  runCommand('npm install --legacy-peer-deps', 'Reinstalling dependencies with legacy peer deps');

  // 7. Generate Prisma client if needed
  if (fileExists('prisma/schema.prisma')) {
    runCommand('npx prisma generate', 'Generating Prisma client');
  }

  // 8. Run TypeScript check
  runCommand('npx tsc --noEmit', 'Running TypeScript check');

  // 9. Run ESLint fix
  runCommand('npm run lint:fix', 'Running ESLint fixes');

  console.log('\n🎉 Permanent fixes completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Run: npm run dev:safe');
  console.log('2. If issues persist, run: npm run clean:all');
  console.log('3. For specific errors, check the logs above');
}

// Run the fixes
runPermanentFixes();
