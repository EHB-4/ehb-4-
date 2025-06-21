const fs = require('fs');
const path = require('path');

class ComponentGeneratorAgent {
  constructor() {
    this.componentsDir = path.join(process.cwd(), 'components');
  }

  async generateComponent(name, type = 'functional') {
    console.log(`🤖 Generating ${type} component: ${name}`);
    
    const componentTemplate = `import React from 'react';
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

    const componentPath = path.join(this.componentsDir, `${name}.tsx`);
    fs.writeFileSync(componentPath, componentTemplate);

    // Generate test file
    const testTemplate = `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ${name} } from '@/components/${name}';

describe('${name}', () => {
  test('should render correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
`;

    const testPath = path.join(process.cwd(), '__tests__', 'components', `${name}.test.tsx`);
    const testDir = path.dirname(testPath);
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    fs.writeFileSync(testPath, testTemplate);

    console.log(`✅ Component ${name} generated with test!`);
    return { componentPath, testPath };
  }
}

module.exports = ComponentGeneratorAgent;
