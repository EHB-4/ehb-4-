const fs = require('fs');
const path = require('path');

function findFilesWithReactHooks(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findFilesWithReactHooks(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if file uses React hooks that require client components
        const hasReactHooks =
          /useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|useLayoutEffect|useImperativeHandle|useDebugValue/.test(
            content
          );
        const hasEventHandlers =
          /onClick|onChange|onSubmit|onKeyDown|onKeyUp|onKeyPress|onMouseEnter|onMouseLeave|onFocus|onBlur/.test(
            content
          );
        const hasBrowserAPIs = /window\.|document\.|localStorage|sessionStorage|navigator\./.test(
          content
        );

        if (
          (hasReactHooks || hasEventHandlers || hasBrowserAPIs) &&
          !content.includes('"use client"')
        ) {
          fileList.push(filePath);
        }
      } catch (error) {
        console.log(`Error reading ${filePath}:`, error.message);
      }
    }
  });

  return fileList;
}

function addUseClientDirective(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has "use client"
    if (content.includes('"use client"')) {
      return false;
    }

    // Add "use client" directive at the beginning
    const newContent = '"use client";\n\n' + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Find all files that need "use client"
console.log('Scanning for files that need "use client" directive...');
const filesToFix = findFilesWithReactHooks('app');
const componentFilesToFix = findFilesWithReactHooks('components');

const allFiles = [...filesToFix, ...componentFilesToFix];

console.log(`Found ${allFiles.length} files that need "use client" directive:`);

// Process files
let fixedCount = 0;
allFiles.forEach(file => {
  if (addUseClientDirective(file)) {
    console.log(`✓ Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files with "use client" directive.`);
console.log('Build should now work!');
