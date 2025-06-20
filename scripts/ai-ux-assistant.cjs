const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const LOG_DIR = path.join(process.cwd(), 'ai-automation', 'logs');
const STATE_FILE = path.join(LOG_DIR, 'uiAssistantState.json');

class UIUXAssistant {
  constructor() {
    this.state = {
      suggestions: [],
      actions: [],
      dailySummary: {
        date: new Date().toISOString().split('T')[0],
        improvements: 0,
        suggestionsAdded: 0,
      },
      autoMode: true,
      isRunning: false,
    };
  }

  async loadState() {
    try {
      await fs.mkdir(LOG_DIR, { recursive: true });
      const data = await fs.readFile(STATE_FILE, 'utf-8');
      const savedState = JSON.parse(data);

      // Check if the saved summary is from today
      const today = new Date().toISOString().split('T')[0];
      if (savedState.dailySummary && savedState.dailySummary.date === today) {
        this.state = savedState;
      } else {
        // Reset summary for the new day
        savedState.dailySummary = {
          date: today,
          improvements: 0,
          suggestionsAdded: 0,
        };
        this.state = savedState;
      }
      console.log('🤖 Agent state loaded successfully.');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('🧠 No previous state found. Initializing new state.');
        await this.saveState();
      } else {
        console.error('❌ Error loading state:', error);
      }
    }
  }

  async saveState() {
    try {
      await fs.writeFile(STATE_FILE, JSON.stringify(this.state, null, 2));
    } catch (error) {
      console.error('❌ Error saving state:', error);
    }
  }

  addSuggestion(suggestion) {
    if (!this.state.suggestions.find(s => s.id === suggestion.id)) {
      this.state.suggestions.push({
        ...suggestion,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      this.state.dailySummary.suggestionsAdded++;
      console.log(`✨ New Suggestion: ${suggestion.description}`);
    }
  }

  logAction(action) {
    this.state.actions.unshift({ ...action, timestamp: new Date().toISOString() });
    if (this.state.actions.length > 50) {
      // Keep log size manageable
      this.state.actions.pop();
    }
    if (action.isImprovement) {
      this.state.dailySummary.improvements++;
    }
    console.log(`✅ Action Logged: ${action.description}`);
  }

  async runGitCommit(message) {
    try {
      await execAsync('git add .');
      await execAsync(`git commit -m "🤖 AI-UX Assistant: ${message}"`);
      console.log(`✅ Auto-committed: ${message}`);
      // In a real CI/CD, you might enable this:
      // await execAsync('git push');
      // console.log('✅ Auto-pushed to repository.');
    } catch (error) {
      console.warn(
        `⚠️ Git auto-commit failed. Maybe no changes to commit. Details: ${error.message}`
      );
    }
  }

  async checkAndApplyThemeSwitcher() {
    const headerPath = path.join(process.cwd(), 'components', 'EHB-Dashboard', 'HeaderBar.tsx');
    try {
      const headerContent = await fs.readFile(headerPath, 'utf-8');
      if (headerContent.includes('<ThemeSwitcher />')) {
        console.log('✅ Theme Switcher already implemented.');
        return;
      }

      this.addSuggestion({
        id: 'theme-switcher',
        description: 'Add a theme switcher to the main header for user convenience.',
      });

      if (this.state.autoMode) {
        console.log('⚡ Auto-applying Theme Switcher...');
        const newContent = headerContent.replace(
          /(<FiSettings.*?\/>\s*<\/Button>)/s,
          `$1\n            <ThemeSwitcher />`
        );

        const importStatement = `import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";\n`;

        await fs.writeFile(headerPath, importStatement + newContent);

        this.logAction({
          description: 'Automatically added ThemeSwitcher to HeaderBar.',
          isImprovement: true,
        });
        await this.runGitCommit('Add Theme Switcher to HeaderBar');

        // Update suggestion status
        const suggestion = this.state.suggestions.find(s => s.id === 'theme-switcher');
        if (suggestion) suggestion.status = 'completed';
      }
    } catch (error) {
      console.error(`❌ Error processing HeaderBar.tsx: ${error.message}`);
    }
  }

  async start() {
    console.log('--- 🚀 Starting Ultimate Auto UI/UX AI Assistant ---');
    this.state.isRunning = true;
    await this.loadState();

    // Run scans and improvements
    await this.scanAndImprove();

    this.state.isRunning = false;
    await this.saveState();
    console.log('--- ✅ Assistant has finished its cycle. ---');
  }

  // Placeholder for scanning logic
  async scanAndImprove() {
    console.log('🧐 Scanning project for UI/UX improvements...');

    await this.checkAndApplyThemeSwitcher();
    // More checks will be added here...

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate scan time
    console.log('✅ Scan complete.');
  }
}

const assistant = new UIUXAssistant();
assistant.start().catch(console.error);
