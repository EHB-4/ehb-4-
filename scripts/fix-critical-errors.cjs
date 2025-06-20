const fs = require('fs');
const path = require('path');

console.log('🔧 Starting to fix critical errors...');

// Function to fix empty interfaces
function fixEmptyInterfaces(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace empty interfaces with Record<string, unknown>
  content = content.replace(/interface\s+\w+\s*\{\s*\}/g, match => {
    const interfaceName = match.match(/interface\s+(\w+)/)[1];
    return `interface ${interfaceName} extends Record<string, unknown> {}`;
  });

  fs.writeFileSync(filePath, content);
}

// Function to fix module variable assignments
function fixModuleAssignments(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace module.exports with export const/let
  content = content.replace(/module\.exports\s*=\s*/g, 'export const moduleExports = ');

  fs.writeFileSync(filePath, content);
}

// List of files with empty interface errors
const emptyInterfaceFiles = [
  'components/ui/input.tsx',
  'components/ui/textarea.tsx',
  'lib/models/Availability.ts',
  'lib/models/Course.ts',
  'lib/models/Shop.ts',
  'lib/models/Tutor.ts',
];

// List of files with module assignment errors
const moduleAssignmentFiles = [
  'app/ehb-dashboard/roadmap/updateAgentStatus.ts',
  'app/roadmap/updateAgentStatus.ts',
];

// Fix empty interfaces
console.log('\nFixing empty interfaces...');
emptyInterfaceFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    fixEmptyInterfaces(filePath);
  }
});

// Fix module assignments
console.log('\nFixing module assignments...');
moduleAssignmentFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    fixModuleAssignments(filePath);
  }
});

console.log('\n✅ Finished fixing critical errors');
