#!/usr/bin/env node
// ehb-accessibility-fix.js
// Accessibility auto-fixer for React/Next.js (Urdu/Hindi)

const fs = require('fs');
const path = require('path');

const LOG_FILE = 'accessibility-fix-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

// Project ke sare .tsx/.jsx files dhoondo
function getAllJSXFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllJSXFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Inline style pattern
const inlineStylePattern = /style=\{[^}]+\}/g;

// Accessibility fix patterns
const elements = [
  { tag: 'button', fix: 'title="Button"' },
  { tag: 'input', fix: 'aria-label="Input"' },
  { tag: 'select', fix: 'title="Select"' },
  { tag: 'form', fix: 'aria-label="Form"' },
];

function fixAccessibility(file) {
  let content = fs.readFileSync(file, 'utf-8');
  let lines = content.split('\n');
  let changed = false;
  let newLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // Inline style check
    if (inlineStylePattern.test(line)) {
      print(`⚠️  Inline style mila: ${file} (Line ${i + 1})`);
    }
    // Accessibility fixes
    for (const el of elements) {
      const regex = new RegExp(`<${el.tag}(?![\w-])([^>]*)(?<!/)>`, 'i');
      if (regex.test(line)) {
        // Check if already has title/aria-label
        if (!/title=|aria-label=/.test(line)) {
          // Auto add fix
          const fixedLine = line.replace(`<${el.tag}`, `<${el.tag} ${el.fix}`);
          print(`✅ ${el.tag} par accessibility fix lagaya: ${file} (Line ${i + 1})`);
          line = fixedLine;
          changed = true;
        }
      }
    }
    // Input ke liye label suggestion
    if (/<input(?![\w-])/.test(line) && !/aria-label=|title=/.test(line)) {
      // Check if previous line is label
      if (i === 0 || !/label/i.test(lines[i - 1])) {
        newLines.push('// ⚠️ Input ke liye <label> add karein (Accessibility)', line);
        continue;
      }
    }
    newLines.push(line);
  }
  if (changed) {
    fs.writeFileSync(file, newLines.join('\n'));
    print(`🔧 File update kiya: ${file}`);
  }
}

// Main
fs.writeFileSync(LOG_FILE, 'EHB Accessibility Fix Log\n================\n');
print('EHB Accessibility Auto-Fix Tool (React/Next.js, Urdu/Hindi)\n');
const jsxFiles = getAllJSXFiles('.', []);
print(`Total files scan kiye: ${jsxFiles.length}`);
jsxFiles.forEach(fixAccessibility);
print('\nScan complete! Inline style warnings aur accessibility fixes ki tafseel log file me hai.');
