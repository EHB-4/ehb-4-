const fs = require('fs');
const path = require('path');

class FrontendComponentGenerator {
  constructor() {
    this.projectRoot = process.cwd();
    this.componentsDir = path.join(this.projectRoot, 'components');
  }

  async generateComponent(name) {
    console.log(`🤖 Generating component: ${name}`);

    // Create component content
    const componentContent = `import React from 'react';
import { cn } from '@/lib/utils';

interface ${name}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${name}: React.FC<${name}Props> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};

export default ${name};
`;

    // Create component file
    const componentPath = path.join(this.componentsDir, `${name}.tsx`);
    fs.writeFileSync(componentPath, componentContent);

    // Create test file
    const testContent = `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ${name} } from '@/components/${name}';

describe('${name}', () => {
  test('should render correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should apply custom className', () => {
    render(<${name} className="custom-class">Test</${name}>);
    const element = screen.getByText('Test');
    expect(element.parentElement).toHaveClass('custom-class');
  });
});
`;

    const testDir = path.join(this.projectRoot, '__tests__', 'components');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    const testPath = path.join(testDir, `${name}.test.tsx`);
    fs.writeFileSync(testPath, testContent);

    console.log(`✅ Component ${name} generated successfully!`);
    console.log(`📁 Component: ${componentPath}`);
    console.log(`🧪 Test: ${testPath}`);

    return { componentPath, testPath };
  }

  async generateHook(name) {
    console.log(`🤖 Generating hook: ${name}`);

    const hooksDir = path.join(this.projectRoot, 'hooks');
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    const hookContent = `import { useState, useEffect } from 'react';

export const use${name.charAt(0).toUpperCase() + name.slice(1)} = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Initialize hook logic here
  }, []);

  return {
    state,
    setState,
  };
};

export default use${name.charAt(0).toUpperCase() + name.slice(1)};
`;

    const hookPath = path.join(hooksDir, `use${name}.ts`);
    fs.writeFileSync(hookPath, hookContent);

    console.log(`✅ Hook use${name} generated successfully!`);
    console.log(`📁 Hook: ${hookPath}`);

    return { hookPath };
  }
}

// CLI interface
if (require.main === module) {
  const generator = new FrontendComponentGenerator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node frontend-component-generator.cjs <component-name> [hook-name]');
    console.log('Example: node frontend-component-generator.cjs Button useButton');
    process.exit(1);
  }

  const componentName = args[0];
  const hookName = args[1];

  generator.generateComponent(componentName);

  if (hookName) {
    generator.generateHook(hookName);
  }
}

module.exports = FrontendComponentGenerator;
