const fs = require('fs');
const path = require('path');

function addNodejsRuntimeToFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('export const runtime = "nodejs";')) return false;
  const newContent = 'export const runtime = "nodejs";\n' + content;
  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

function processDir(dir) {
  let changed = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      changed += processDir(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      if (addNodejsRuntimeToFile(filePath)) {
        console.log('Fixed:', filePath);
        changed++;
      }
    }
  }
  return changed;
}

const total = processDir(path.join(__dirname, '../app/api'));
console.log(`\nAdded Node.js runtime to ${total} API route files.`);
