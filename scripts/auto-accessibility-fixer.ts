import * as fs from 'fs/promises';
import * as path from 'path';

import * as glob from 'glob';

interface AccessibilityFix {
  pattern: RegExp;
  fix: string | ((match: string, ...args: string[]) => string);
}

const accessibilityFixes: AccessibilityFix[] = [
  // Button accessibility fixes
  {
    pattern: /<button([^>]*)>([^<]*)<\/button>/g,
    fix: '<button$1 aria-label="$2">$2</button>',
  },
  // Form element label fixes
  {
    pattern: /<input([^>]*)>/g,
    fix: (match: string, p1: string) => {
      const id = Math.random().toString(36).substring(7);
      return `<label for="${id}">Input field</label><input${p1} id="${id}">`;
    },
  },
  // Select element accessibility fixes
  {
    pattern: /<select([^>]*)>/g,
    fix: (match: string, p1: string) => {
      const id = Math.random().toString(36).substring(7);
      return `<label for="${id}">Select option</label><select${p1} id="${id}">`;
    },
  },
];

async function findFiles(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob.glob(pattern, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

async function fixAccessibilityIssues(filePath: string): Promise<void> {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let modified = false;

    // Apply each fix
    for (const fix of accessibilityFixes) {
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.fix as any);
        modified = true;
      }
    }

    // Move inline styles to external CSS
    const inlineStylePattern = /style=["']([^"']+)["']/g;
    if (inlineStylePattern.test(content)) {
      const cssFileName = path.basename(filePath, path.extname(filePath)) + '.module.css';
      const cssFilePath = path.join(path.dirname(filePath), cssFileName);

      let cssContent = '';
      let classCounter = 1;

      content = content.replace(inlineStylePattern, (match, styles) => {
        const className = `autoFixed${classCounter}`;
        cssContent += `.${className} {\n  ${styles.replace(/;/g, ';\n  ')}\n}\n\n`;
        classCounter++;
        return `className="${className}"`;
      });

      if (cssContent) {
        await fs.writeFile(cssFilePath, cssContent);
        modified = true;
      }
    }

    if (modified) {
      await fs.writeFile(filePath, content);
      console.log(`Fixed accessibility issues in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main(): Promise<void> {
  const files = await findFiles('./app/**/*.{tsx,jsx}');
  files.push(...(await findFiles('./components/**/*.{tsx,jsx}')));

  for (const file of files) {
    await fixAccessibilityIssues(file);
  }
}

main().catch(console.error);
