const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting to fix common issues...');

// Function to add underscore prefix to unused variables
function fixUnusedVariables(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add underscore to unused parameters
  content = content.replace(
    /\(([\w\s,]*?)(\w+)(\s*:\s*[^)]+)?\)\s*=>/g,
    (match, before, param, type) => {
      if (!content.includes(param)) {
        return `(${before}_${param}${type || ''}) =>`;
      }
      return match;
    }
  );

  fs.writeFileSync(filePath, content);
}

// Function to fix empty interfaces
function fixEmptyInterfaces(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace empty interfaces with Record<string, unknown>
  content = content.replace(
    /interface\s+(\w+)\s*\{\s*\}/g,
    'interface $1 extends Record<string, unknown> {}'
  );

  fs.writeFileSync(filePath, content);
}

// Function to remove unused imports
function removeUnusedImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Get all import statements
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"][^'"]+['"];?/g;
  const imports = [...content.matchAll(importRegex)];

  imports.forEach(importMatch => {
    const importedItems = importMatch[1].split(',').map(item => item.trim());
    importedItems.forEach(item => {
      if (!content.includes(item)) {
        content = content.replace(new RegExp(`\\b${item}\\b,?\\s*`), '');
      }
    });
  });

  fs.writeFileSync(filePath, content);
}

// Function to fix React hooks dependencies
function fixReactHooksDeps(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add missing dependencies to useEffect
  const useEffectRegex = /useEffect\(\(\)\s*=>\s*{([^}]+)},\s*\[(.*?)\]\)/g;
  const matches = [...content.matchAll(useEffectRegex)];

  matches.forEach(match => {
    const effectBody = match[1];
    const deps = match[2];

    // Extract function calls from effect body
    const functionCalls = effectBody.match(/\b\w+\(/g) || [];
    const functions = functionCalls.map(fn => fn.slice(0, -1));

    // Add missing dependencies
    const newDeps = [...new Set([...deps.split(',').map(d => d.trim()), ...functions])]
      .filter(Boolean)
      .join(', ');

    content = content.replace(match[0], `useEffect(() => {${effectBody}}, [${newDeps}])`);
  });

  fs.writeFileSync(filePath, content);
}

try {
  // Get all TypeScript files
  const files = execSync('git ls-files "*.ts" "*.tsx"', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);

  files.forEach(file => {
    try {
      console.log(`Processing ${file}...`);
      fixUnusedVariables(file);
      fixEmptyInterfaces(file);
      removeUnusedImports(file);
      fixReactHooksDeps(file);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  });

  console.log('✅ Finished fixing common issues');
} catch (err) {
  console.error('❌ Error:', err);
}
