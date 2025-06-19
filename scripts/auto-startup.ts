import * as childProcess from 'child_process';
import * as path from 'path';

async function runScript(scriptPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = childProcess.spawn('npx', ['ts-node', scriptPath], {
      stdio: 'inherit',
    });

    process.on('close', (code: number | null) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${scriptPath} exited with code ${code}`));
      }
    });
  });
}

async function main(): Promise<void> {
  console.log('🚀 Starting auto-fix scripts...');

  try {
    // Run accessibility fixer
    console.log('Running accessibility fixes...');
    await runScript(path.join(__dirname, 'auto-accessibility-fixer.ts'));

    // Run type fixer
    console.log('Running type fixes...');
    await runScript(path.join(__dirname, 'auto-type-fixer.ts'));

    console.log('✅ All auto-fix scripts completed successfully!');
  } catch (error) {
    console.error('❌ Error running auto-fix scripts:', error);
  }
}

main().catch(console.error);
