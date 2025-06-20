const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const watcher = chokidar.watch('.', {
  ignored: /(^|[\/\\])\../, 
  persistent: true,
  cwd: projectRoot,
});

let isPushing = false;
let needsPush = false;

console.log('👀 Watching for file changes to auto-push to GitHub...');

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: projectRoot }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}\n${stderr}`);
        return reject(stderr);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function gitPush() {
  if (isPushing) {
    needsPush = true;
    return;
  }

  isPushing = true;
  needsPush = false;

  try {
    console.log('➕ Staging changes...');
    await executeCommand('git add .');

    const commitMessage = uto-commit: ;
    console.log(📝 Committing changes with message: "");
    await executeCommand(git commit -m "");

    console.log('🚀 Pushing to origin main...');
    await executeCommand('git push origin main');
    console.log('✅ Successfully pushed to GitHub.');
  } catch (error) {
    console.error('Failed to push changes to GitHub.');
  } finally {
    isPushing = false;
    if (needsPush) {
      gitPush();
    }
  }
}

watcher.on('change', (filePath) => {
  console.log(\n📄 File changed: );
  gitPush();
});

watcher.on('add', (filePath) => {
  console.log(\n✨ File added: );
  gitPush();
});

watcher.on('unlink', (filePath) => {
  console.log(\n🗑️ File deleted: );
  gitPush();
});

// Initial push for any pending changes
gitPush();