const { spawn, exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

class DevTools {
  constructor() {
    this.projectRoot = process.cwd();
    this.port = 5500;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  async openInBrowser() {
    const url = `http://localhost:${this.port}`;
    const command = process.platform === 'win32' ? 'start' : 'open';
    await execAsync(`${command} ${url}`);
    this.log(`🌐 Opened ${url} in browser`);
  }

  async watchFiles() {
    const { default: chokidar } = await import('chokidar');

    const watcher = chokidar.watch(['app/**/*', 'components/**/*', 'lib/**/*', 'styles/**/*'], {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    watcher.on('change', path => {
      this.log(`📝 File changed: ${path}`);
    });

    this.log('👀 Watching for file changes...');
  }

  async startDevTools() {
    this.log('🛠️ Starting development tools...');

    // Start Next.js development server
    const nextProcess = spawn('npm', ['run', 'start-dev'], {
      stdio: 'inherit',
      shell: true,
    });

    // Start TypeScript type checking in watch mode
    const typeCheckProcess = spawn('npm', ['run', 'type-check', '--', '--watch'], {
      stdio: 'inherit',
      shell: true,
    });

    // Start ESLint in watch mode
    const lintProcess = spawn('npm', ['run', 'lint', '--', '--watch'], {
      stdio: 'inherit',
      shell: true,
    });

    // Start file watcher
    await this.watchFiles();

    // Open in browser after delay
    setTimeout(() => this.openInBrowser(), 5000);

    // Handle process termination
    const cleanup = () => {
      nextProcess.kill();
      typeCheckProcess.kill();
      lintProcess.kill();
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  }

  async generateComponent(name) {
    const componentDir = path.join(this.projectRoot, 'components');
    const componentPath = path.join(componentDir, `${name}.tsx`);
    const testPath = path.join(this.projectRoot, '__tests__', 'components', `${name}.test.tsx`);

    const componentContent = `import React from 'react';

interface ${name}Props {
  // Add props here
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div>
      {/* Add component content */}
    </div>
  );
};

export default ${name};
`;

    const testContent = `import { render, screen } from '@testing-library/react';
import { ${name} } from '@/components/${name}';

describe('${name}', () => {
  it('renders correctly', () => {
    render(<${name} />);
    // Add your test assertions here
  });
});
`;

    fs.writeFileSync(componentPath, componentContent);
    fs.writeFileSync(testPath, testContent);

    this.log(`✅ Generated component ${name}`);
  }

  async generatePage(name) {
    const pagePath = path.join(this.projectRoot, 'app', name, 'page.tsx');
    const layoutPath = path.join(this.projectRoot, 'app', name, 'layout.tsx');

    const pageContent = `export default function ${name}Page() {
  return (
    <div>
      <h1>${name} Page</h1>
    </div>
  );
}
`;

    const layoutContent = `import { ReactNode } from 'react';

interface ${name}LayoutProps {
  children: ReactNode;
}

export default function ${name}Layout({ children }: ${name}LayoutProps) {
  return (
    <div>
      {children}
    </div>
  );
}
`;

    fs.mkdirSync(path.dirname(pagePath), { recursive: true });
    fs.writeFileSync(pagePath, pageContent);
    fs.writeFileSync(layoutPath, layoutContent);

    this.log(`✅ Generated page ${name}`);
  }

  async generateApi(name) {
    const apiPath = path.join(this.projectRoot, 'app', 'api', name, 'route.ts');

    const apiContent = `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'Success', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
`;

    fs.mkdirSync(path.dirname(apiPath), { recursive: true });
    fs.writeFileSync(apiPath, apiContent);

    this.log(`✅ Generated API route ${name}`);
  }

  async runCommand(command, args) {
    switch (command) {
      case 'start':
        await this.startDevTools();
        break;
      case 'gen:component':
        await this.generateComponent(args[0]);
        break;
      case 'gen:page':
        await this.generatePage(args[0]);
        break;
      case 'gen:api':
        await this.generateApi(args[0]);
        break;
      default:
        this.log(`❌ Unknown command: ${command}`);
    }
  }
}

// Start if run directly
if (require.main === module) {
  const tools = new DevTools();
  const [command, ...args] = process.argv.slice(2);
  tools.runCommand(command, args);
}

module.exports = DevTools;
