const { execSync } = require('child_process');

function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-');
}

function autoPush() {
  try {
    // Get current branch
    const currentBranch = execSync('git branch --show-current').toString().trim();
    console.log(`📍 Current branch: ${currentBranch}`);

    // Add all changes
    console.log('📦 Adding changes...');
    execSync('git add .');

    // Create commit with timestamp
    const timestamp = getCurrentTimestamp();
    const commitMessage = `Auto-commit: Changes from Cursor AI Agent - ${timestamp}`;
    console.log('✍️ Creating commit...');
    execSync(`git commit -m "${commitMessage}"`);

    // Push changes
    console.log('🚀 Pushing to GitHub...');
    execSync(`git push origin ${currentBranch}`);

    console.log('✅ Successfully pushed to GitHub!');
  } catch (error) {
    console.error('❌ Error during git operations:', error.message);
    process.exit(1);
  }
}

// Run auto push
autoPush();
