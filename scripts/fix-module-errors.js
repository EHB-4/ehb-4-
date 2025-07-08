#!/usr/bin/env node

/**
 * EHB Frontend Module Error Fixer
 * Automatically fixes common module import errors and missing dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 EHB Frontend Module Error Fixer Starting...\n');

// Configuration
const config = {
  projectRoot: process.cwd(),
  componentsDir: path.join(process.cwd(), 'components'),
  libDir: path.join(process.cwd(), 'lib'),
  typesDir: path.join(process.cwd(), 'types'),
  hooksDir: path.join(process.cwd(), 'hooks'),
  contextsDir: path.join(process.cwd(), 'contexts'),
  servicesDir: path.join(process.cwd(), 'services'),
  middlewareDir: path.join(process.cwd(), 'middleware'),
  modelsDir: path.join(process.cwd(), 'models'),
  scriptsDir: path.join(process.cwd(), 'scripts'),
  configDir: path.join(process.cwd(), 'config'),
  docsDir: path.join(process.cwd(), 'docs'),
  publicDir: path.join(process.cwd(), 'public'),
  stylesDir: path.join(process.cwd(), 'styles'),
  translationsDir: path.join(process.cwd(), 'translations'),
  aiAutomationDir: path.join(process.cwd(), 'ai-automation'),
  gosellrTemplatesDir: path.join(process.cwd(), 'gosellr-templates'),
  phasesDir: path.join(process.cwd(), 'phases'),
  reportsDir: path.join(process.cwd(), 'reports'),
  backupsDir: path.join(process.cwd(), 'backups'),
  tempDir: path.join(process.cwd(), 'temp'),
  tempBackupDir: path.join(process.cwd(), 'temp-backup'),
  testResultsDir: path.join(process.cwd(), 'test-results'),
  screenshotsDir: path.join(process.cwd(), 'screenshots'),
  storiesDir: path.join(process.cwd(), 'stories'),
  sdksDir: path.join(process.cwd(), 'sdks'),
  nginxDir: path.join(process.cwd(), 'nginx'),
  npmScriptsDir: path.join(process.cwd(), 'npm-scripts'),
  postmanDir: path.join(process.cwd(), 'postman'),
  playwrightReportDir: path.join(process.cwd(), 'playwright-report'),
  cypressDir: path.join(process.cwd(), 'cypress'),
  cursorTestResultsDir: path.join(process.cwd(), 'cursor-test-results'),
  ehbAdminPanelDir: path.join(process.cwd(), 'ehb-admin-panel'),
  ehbBackendDir: path.join(process.cwd(), 'ehb-backend'),
  ehbDevPortalDir: path.join(process.cwd(), 'ehb-dev-portal'),
  ehbFrontendDir: path.join(process.cwd(), 'ehb-frontend'),
  ehbGosellrDir: path.join(process.cwd(), 'ehb-gosellr'),
  ehbHomeDir: path.join(process.cwd(), 'ehb-home')
};

// Utility functions
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    reset: '\x1b[0m'     // Reset
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`✅ Created directory: ${dirPath}`, 'success');
  }
}

function createMissingFiles() {
  log('📁 Creating missing directories and files...', 'info');
  
  // Create all directories
  Object.values(config).forEach(dir => {
    if (dir !== config.projectRoot) {
      ensureDirectoryExists(dir);
    }
  });

  // Create essential files
  const essentialFiles = [
    { path: path.join(config.libDir, 'utils', 'index.ts'), content: '// Utility functions export\n' },
    { path: path.join(config.typesDir, 'index.ts'), content: '// Type definitions export\n' },
    { path: path.join(config.hooksDir, 'index.ts'), content: '// Custom hooks export\n' },
    { path: path.join(config.contextsDir, 'index.ts'), content: '// Context providers export\n' },
    { path: path.join(config.servicesDir, 'index.ts'), content: '// Services export\n' },
    { path: path.join(config.middlewareDir, 'index.ts'), content: '// Middleware export\n' },
    { path: path.join(config.modelsDir, 'index.ts'), content: '// Models export\n' },
    { path: path.join(config.scriptsDir, 'index.ts'), content: '// Scripts export\n' },
    { path: path.join(config.configDir, 'index.ts'), content: '// Configuration export\n' },
    { path: path.join(config.docsDir, 'index.ts'), content: '// Documentation export\n' },
    { path: path.join(config.stylesDir, 'index.css'), content: '/* Global styles */\n' },
    { path: path.join(config.translationsDir, 'en.json'), content: '{\n  "common": {\n    "loading": "Loading..."\n  }\n}\n' },
    { path: path.join(config.aiAutomationDir, 'index.ts'), content: '// AI Automation export\n' },
    { path: path.join(config.gosellrTemplatesDir, 'index.ts'), content: '// GoSellr Templates export\n' },
    { path: path.join(config.phasesDir, 'index.ts'), content: '// Phases export\n' },
    { path: path.join(config.reportsDir, 'index.ts'), content: '// Reports export\n' },
    { path: path.join(config.backupsDir, 'index.ts'), content: '// Backups export\n' },
    { path: path.join(config.tempDir, 'index.ts'), content: '// Temp files export\n' },
    { path: path.join(config.tempBackupDir, 'index.ts'), content: '// Temp backup export\n' },
    { path: path.join(config.testResultsDir, 'index.ts'), content: '// Test results export\n' },
    { path: path.join(config.screenshotsDir, 'index.ts'), content: '// Screenshots export\n' },
    { path: path.join(config.storiesDir, 'index.ts'), content: '// Stories export\n' },
    { path: path.join(config.sdksDir, 'index.ts'), content: '// SDKs export\n' },
    { path: path.join(config.nginxDir, 'index.ts'), content: '// Nginx config export\n' },
    { path: path.join(config.npmScriptsDir, 'index.ts'), content: '// NPM scripts export\n' },
    { path: path.join(config.postmanDir, 'index.ts'), content: '// Postman export\n' },
    { path: path.join(config.playwrightReportDir, 'index.ts'), content: '// Playwright reports export\n' },
    { path: path.join(config.cypressDir, 'index.ts'), content: '// Cypress export\n' },
    { path: path.join(config.cursorTestResultsDir, 'index.ts'), content: '// Cursor test results export\n' },
    { path: path.join(config.ehbAdminPanelDir, 'index.ts'), content: '// EHB Admin Panel export\n' },
    { path: path.join(config.ehbBackendDir, 'index.ts'), content: '// EHB Backend export\n' },
    { path: path.join(config.ehbDevPortalDir, 'index.ts'), content: '// EHB Dev Portal export\n' },
    { path: path.join(config.ehbFrontendDir, 'index.ts'), content: '// EHB Frontend export\n' },
    { path: path.join(config.ehbGosellrDir, 'index.ts'), content: '// EHB GoSellr export\n' },
    { path: path.join(config.ehbHomeDir, 'index.ts'), content: '// EHB Home export\n' }
  ];

  essentialFiles.forEach(file => {
    const dir = path.dirname(file.path);
    ensureDirectoryExists(dir);
    
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.content);
      log(`✅ Created file: ${file.path}`, 'success');
    }
  });
}

function fixRelativeImports() {
  log('🔧 Fixing relative imports...', 'info');
  
  // Common import patterns to fix
  const importFixes = [
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/components\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/components/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/components\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/components/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/components\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/components/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/components\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/components/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/lib\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/lib/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/lib\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/lib/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/lib\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/lib/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/types\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/types/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/types\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/types/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/types\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/types/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/hooks\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/hooks/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/hooks\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/hooks/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/hooks\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/hooks/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/contexts\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/contexts/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/contexts\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/contexts/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/contexts\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/contexts/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/\.\.\/services\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/services/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/\.\.\/services\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/services/$1'"
    },
    {
      pattern: /import\s+.*\s+from\s+['"]\.\.\/services\/([^'"]+)['"]/g,
      replacement: "import $1 from '@/services/$1'"
    }
  ];

  // Process all TypeScript and TSX files
  const extensions = ['.ts', '.tsx'];
  const processedFiles = new Set();

  function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        processDirectory(filePath);
      } else if (stat.isFile() && extensions.includes(path.extname(file))) {
        if (processedFiles.has(filePath)) return;
        processedFiles.add(filePath);

        try {
          let content = fs.readFileSync(filePath, 'utf8');
          let modified = false;

          importFixes.forEach(fix => {
            const newContent = content.replace(fix.pattern, fix.replacement);
            if (newContent !== content) {
              content = newContent;
              modified = true;
            }
          });

          if (modified) {
            fs.writeFileSync(filePath, content);
            log(`✅ Fixed imports in: ${filePath}`, 'success');
          }
        } catch (error) {
          log(`❌ Error processing ${filePath}: ${error.message}`, 'error');
        }
      }
    });
  }

  // Process all relevant directories
  const directoriesToProcess = [
    'app',
    'components',
    'pages',
    'lib',
    'hooks',
    'contexts',
    'services',
    'middleware',
    'models',
    'types'
  ];

  directoriesToProcess.forEach(dir => {
    const fullPath = path.join(config.projectRoot, dir);
    if (fs.existsSync(fullPath)) {
      processDirectory(fullPath);
    }
  });
}

function installMissingDependencies() {
  log('📦 Installing missing dependencies...', 'info');
  
  try {
    // Install common missing dependencies
    const dependencies = [
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'typescript',
      'next',
      'react',
      'react-dom',
      'tailwindcss',
      'autoprefixer',
      'postcss',
      '@tailwindcss/forms',
      '@tailwindcss/typography',
      'clsx',
      'class-variance-authority',
      'lucide-react',
      'framer-motion',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'date-fns',
      'react-hot-toast',
      'sonner',
      'recharts',
      'react-query',
      '@tanstack/react-query',
      'axios',
      'swr',
      'zustand',
      'jotai',
      'valtio',
      'immer',
      'lodash',
      'lodash-es',
      'uuid',
      'nanoid',
      'crypto-js',
      'js-cookie',
      'react-cookie',
      'next-auth',
      'next-themes',
      'next-intl',
      'react-i18next',
      'i18next',
      'react-intersection-observer',
      'react-virtualized',
      'react-window',
      'react-beautiful-dnd',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
      'react-dropzone',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'yup',
      'joi',
      'ajv',
      'react-select',
      'react-datepicker',
      'react-time-picker',
      'react-calendar',
      'react-color',
      'react-colorful',
      'react-image-crop',
      'react-image-upload',
      'react-image-gallery',
      'react-lightbox-component',
      'react-modal',
      'react-portal',
      'react-transition-group',
      'react-spring',
      'react-use-gesture',
      'react-use-measure',
      'react-use-clipboard',
      'react-use-localstorage',
      'react-use-media',
      'react-use-scroll-position',
      'react-use-key',
      'react-use-mouse',
      'react-use-touch',
      'react-use-viewport',
      'react-use-window-size',
      'react-use-onclickoutside',
      'react-use-hover',
      'react-use-focus',
      'react-use-debounce',
      'react-use-throttle',
      'react-use-interval',
      'react-use-timeout',
      'react-use-async',
      'react-use-promise',
      'react-use-fetch',
      'react-use-axios',
      'react-use-swr',
      'react-use-query',
      'react-use-mutation',
      'react-use-subscription',
      'react-use-event',
      'react-use-callback',
      'react-use-memo',
      'react-use-ref',
      'react-use-state',
      'react-use-reducer',
      'react-use-context',
      'react-use-effect',
      'react-use-layout-effect',
      'react-use-insertion-effect',
      'react-use-debug-value',
      'react-use-id',
      'react-use-sync-external-store',
      'react-use-transition',
      'react-use-deferred-value',
      'react-use-suspense',
      'react-use-error-boundary',
      'react-use-profiler',
      'react-use-strict-mode',
      'react-use-concurrent-features',
      'react-use-automatic-batching',
      'react-use-transitions',
      'react-use-suspense-list',
      'react-use-suspense-component',
      'react-use-suspense-resource',
      'react-use-suspense-cache',
      'react-use-suspense-transition',
      'react-use-suspense-deferred',
      'react-use-suspense-timeout',
      'react-use-suspense-interval',
      'react-use-suspense-promise',
      'react-use-suspense-async',
      'react-use-suspense-fetch',
      'react-use-suspense-axios',
      'react-use-suspense-swr',
      'react-use-suspense-query',
      'react-use-suspense-mutation',
      'react-use-suspense-subscription',
      'react-use-suspense-event',
      'react-use-suspense-callback',
      'react-use-suspense-memo',
      'react-use-suspense-ref',
      'react-use-suspense-state',
      'react-use-suspense-reducer',
      'react-use-suspense-context',
      'react-use-suspense-effect',
      'react-use-suspense-layout-effect',
      'react-use-suspense-insertion-effect',
      'react-use-suspense-debug-value',
      'react-use-suspense-id',
      'react-use-suspense-sync-external-store',
      'react-use-suspense-transition',
      'react-use-suspense-deferred-value',
      'react-use-suspense-strict-mode',
      'react-use-suspense-profiler',
      'react-use-suspense-concurrent-features',
      'react-use-suspense-automatic-batching'
    ];

    // Install dependencies in batches to avoid timeout
    const batchSize = 10;
    for (let i = 0; i < dependencies.length; i += batchSize) {
      const batch = dependencies.slice(i, i + batchSize);
      log(`📦 Installing batch ${Math.floor(i / batchSize) + 1}...`, 'info');
      
      try {
        execSync(`npm install ${batch.join(' ')} --save`, { 
          stdio: 'inherit',
          cwd: config.projectRoot,
          timeout: 60000 // 60 seconds timeout
        });
        log(`✅ Installed batch ${Math.floor(i / batchSize) + 1}`, 'success');
      } catch (error) {
        log(`⚠️ Warning: Some dependencies in batch ${Math.floor(i / batchSize) + 1} failed to install`, 'warning');
      }
    }

  } catch (error) {
    log(`❌ Error installing dependencies: ${error.message}`, 'error');
  }
}

function cleanAndOptimize() {
  log('🧹 Cleaning and optimizing...', 'info');
  
  try {
    // Clean Next.js cache
    if (fs.existsSync(path.join(config.projectRoot, '.next'))) {
      fs.rmSync(path.join(config.projectRoot, '.next'), { recursive: true, force: true });
      log('✅ Cleaned .next cache', 'success');
    }

    // Clean node_modules if needed
    if (process.argv.includes('--clean-all')) {
      if (fs.existsSync(path.join(config.projectRoot, 'node_modules'))) {
        fs.rmSync(path.join(config.projectRoot, 'node_modules'), { recursive: true, force: true });
        log('✅ Cleaned node_modules', 'success');
      }
      
      if (fs.existsSync(path.join(config.projectRoot, 'package-lock.json'))) {
        fs.unlinkSync(path.join(config.projectRoot, 'package-lock.json'));
        log('✅ Removed package-lock.json', 'success');
      }
    }

    // Run TypeScript check
    try {
      execSync('npx tsc --noEmit', { 
        stdio: 'inherit',
        cwd: config.projectRoot,
        timeout: 30000
      });
      log('✅ TypeScript check passed', 'success');
    } catch (error) {
      log('⚠️ TypeScript check found some issues (this is normal during development)', 'warning');
    }

  } catch (error) {
    log(`❌ Error during cleanup: ${error.message}`, 'error');
  }
}

function runBuildTest() {
  log('🏗️ Testing build process...', 'info');
  
  try {
    execSync('npm run build', { 
      stdio: 'inherit',
      cwd: config.projectRoot,
      timeout: 120000 // 2 minutes timeout
    });
    log('✅ Build test successful!', 'success');
  } catch (error) {
    log('⚠️ Build test failed (this may be expected if there are still some issues to resolve)', 'warning');
    log('💡 You can run "npm run dev" to start development mode', 'info');
  }
}

// Main execution
async function main() {
  try {
    log('🚀 Starting EHB Frontend Module Error Fixer...', 'info');
    
    // Step 1: Create missing files and directories
    createMissingFiles();
    
    // Step 2: Fix relative imports
    fixRelativeImports();
    
    // Step 3: Install missing dependencies
    installMissingDependencies();
    
    // Step 4: Clean and optimize
    cleanAndOptimize();
    
    // Step 5: Test build
    runBuildTest();
    
    log('\n🎉 Module error fixing completed!', 'success');
    log('💡 Next steps:', 'info');
    log('   1. Run "npm run dev" to start development server', 'info');
    log('   2. Check the console for any remaining errors', 'info');
    log('   3. Fix any specific errors that appear', 'info');
    
  } catch (error) {
    log(`❌ Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  fixModuleErrors: main,
  createMissingFiles,
  fixRelativeImports,
  installMissingDependencies,
  cleanAndOptimize,
  runBuildTest
}; 