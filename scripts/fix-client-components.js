const fs = require('fs');
const path = require('path');

// Files that need "use client" directive
const filesToFix = [
  'app/sco/page.tsx',
  'app/profile/page.tsx',
  'app/search/page.tsx',
  'app/tracking/page.tsx',
  'app/roadmap/components/RoadmapSearch.tsx',
  'app/project-tracker/page.tsx',
  'app/pss/admin/page.tsx',
  'app/page.tsx',
  'app/gosellr/shop/page.tsx',
  'app/jps/interviews/page.tsx',
  'app/gosellr/page.tsx',
  'app/gosellr/orders/page.tsx',
  'app/jps/assessment/page.tsx',
  'app/gosellr/my-shop/page.tsx',
  'app/gosellr/my-products/page.tsx',
  'app/jps/analytics/page.tsx',
  'app/gosellr/my-orders/page.tsx',
  'app/error.tsx',
  'app/ehb-home-page/components/HeroSlider.tsx',
  'app/ehb-home-page/components/TopServicesNavBar.tsx',
  'app/edr/tutor-dashboard/page.tsx',
  'app/edr/my-courses/page.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/enhanced/page.tsx',
  'app/admin/dashboard/page.tsx',
  'app/admin/affiliate/page.tsx',
  'app/auth/reset-password/page.tsx',
  'app/analytics/page.tsx',
  'app/ai-agents/analytics/page.tsx',
  'app/ai-agents/page.tsx',
  'app/ai-agents/monitoring/page.tsx',
];

function addUseClientDirective(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Check if "use client" already exists
    if (content.includes('"use client"')) {
      console.log(`Already has "use client": ${filePath}`);
      return;
    }

    // Add "use client" directive at the beginning
    const newContent = '"use client";\n\n' + content;

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Added "use client" to: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all files
console.log('Adding "use client" directive to files...');
filesToFix.forEach(file => {
  addUseClientDirective(file);
});

console.log('Done!');
