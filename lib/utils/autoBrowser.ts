/**
 * Auto Browser Opening System
 * Automatically opens pages in the browser and manages development agents
 */

import { urlManager, type PageInfo } from './urlManager';

export interface BrowserConfig {
  autoOpen: boolean;
  defaultBrowser: 'chrome' | 'firefox' | 'edge' | 'safari';
  newTab: boolean;
  incognito: boolean;
}

export interface DevelopmentAgent {
  id: string;
  name: string;
  expertise: string[];
  currentPages: string[];
  status: 'available' | 'busy' | 'offline';
  lastActive: Date;
}

class AutoBrowserManager {
  private config: BrowserConfig;
  private agents: Map<string, DevelopmentAgent> = new Map();
  private activeSessions: Map<string, { pageId: string; openedAt: Date }> = new Map();

  constructor() {
    this.config = {
      autoOpen: true,
      defaultBrowser: 'chrome',
      newTab: true,
      incognito: false,
    };
    this.initializeAgents();
  }

  private initializeAgents() {
    // Initialize development agents
    const agents: DevelopmentAgent[] = [
      {
        id: 'agent-001',
        name: 'Frontend Specialist',
        expertise: ['react', 'nextjs', 'typescript', 'ui/ux'],
        currentPages: [],
        status: 'available',
        lastActive: new Date(),
      },
      {
        id: 'agent-002',
        name: 'Backend Developer',
        expertise: ['nodejs', 'api', 'database', 'authentication'],
        currentPages: [],
        status: 'available',
        lastActive: new Date(),
      },
      {
        id: 'agent-003',
        name: 'AI/ML Engineer',
        expertise: ['ai', 'machine-learning', 'analytics', 'automation'],
        currentPages: [],
        status: 'available',
        lastActive: new Date(),
      },
      {
        id: 'agent-004',
        name: 'DevOps Engineer',
        expertise: ['deployment', 'infrastructure', 'monitoring', 'security'],
        currentPages: [],
        status: 'available',
        lastActive: new Date(),
      },
      {
        id: 'agent-005',
        name: 'Full Stack Developer',
        expertise: ['react', 'nodejs', 'database', 'api', 'deployment'],
        currentPages: [],
        status: 'available',
        lastActive: new Date(),
      },
    ];

    agents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }

  /**
   * Open a page in the browser
   */
  async openPage(pageId: string, agentId?: string): Promise<boolean> {
    try {
      const page = urlManager.getPage(pageId);
      if (!page) {
        console.error(`Page not found: ${pageId}`);
        return false;
      }

      const fullUrl = urlManager.getFullUrl(pageId);

      // Assign development agent if provided
      if (agentId) {
        this.assignAgentToPage(pageId, agentId);
      } else {
        // Auto-assign best available agent
        const bestAgent = this.findBestAgentForPage(page);
        if (bestAgent) {
          this.assignAgentToPage(pageId, bestAgent.id);
        }
      }

      // Open in browser
      await this.openInBrowser(fullUrl);

      // Track session
      this.activeSessions.set(pageId, {
        pageId,
        openedAt: new Date(),
      });

      console.log(`✅ Opened page: ${page.title} (${fullUrl})`);
      return true;
    } catch (error) {
      console.error(`❌ Error opening page ${pageId}:`, error);
      return false;
    }
  }

  /**
   * Open URL in browser
   */
  private async openInBrowser(url: string): Promise<void> {
    if (!this.config.autoOpen) return;

    try {
      // For Node.js environment, use child_process to open browser
      if (typeof window === 'undefined') {
        const { exec } = require('child_process');

        let command = '';
        switch (this.config.defaultBrowser) {
          case 'chrome':
            command = `start chrome ${this.config.incognito ? '--incognito' : ''} "${url}"`;
            break;
          case 'firefox':
            command = `start firefox ${this.config.incognito ? '--private-window' : ''} "${url}"`;
            break;
          case 'edge':
            command = `start msedge ${this.config.incognito ? '--inprivate' : ''} "${url}"`;
            break;
          case 'safari':
            command = `open -a Safari "${url}"`;
            break;
          default:
            command = `start "${url}"`;
        }

        exec(command, (error: any) => {
          if (error) {
            console.error('Error opening browser:', error);
            // Fallback to default browser
            exec(`start "${url}"`);
          }
        });
      } else {
        // For browser environment, use window.open
        window.open(url, this.config.newTab ? '_blank' : '_self');
      }
    } catch (error) {
      console.error('Error opening browser:', error);
    }
  }

  /**
   * Find the best available agent for a page
   */
  private findBestAgentForPage(page: PageInfo): DevelopmentAgent | null {
    const availableAgents = Array.from(this.agents.values()).filter(
      agent => agent.status === 'available'
    );

    if (availableAgents.length === 0) return null;

    // Score agents based on expertise match
    const scoredAgents = availableAgents.map(agent => {
      let score = 0;

      // Check expertise match with page tags
      page.tags.forEach(tag => {
        if (agent.expertise.includes(tag)) {
          score += 2;
        }
      });

      // Check category match
      if (
        agent.expertise.some(
          exp =>
            page.category.toLowerCase().includes(exp) || exp.includes(page.category.toLowerCase())
        )
      ) {
        score += 1;
      }

      // Prefer agents with fewer current pages
      score += 10 - agent.currentPages.length;

      return { agent, score };
    });

    // Return agent with highest score
    scoredAgents.sort((a, b) => b.score - a.score);
    return scoredAgents[0]?.agent || null;
  }

  /**
   * Assign an agent to a page
   */
  assignAgentToPage(pageId: string, agentId: string): boolean {
    const page = urlManager.getPage(pageId);
    const agent = this.agents.get(agentId);

    if (!page || !agent) {
      console.error(`Page or agent not found: ${pageId}, ${agentId}`);
      return false;
    }

    // Update URL manager
    urlManager.assignDevelopmentAgent(pageId, agentId);

    // Update agent status
    agent.currentPages.push(pageId);
    agent.status = 'busy';
    agent.lastActive = new Date();

    console.log(`🤖 Assigned agent ${agent.name} to page: ${page.title}`);
    return true;
  }

  /**
   * Release an agent from a page
   */
  releaseAgentFromPage(pageId: string): boolean {
    const page = urlManager.getPage(pageId);
    if (!page || !page.developmentAgent) return false;

    const agent = this.agents.get(page.developmentAgent);
    if (!agent) return false;

    // Remove page from agent's current pages
    agent.currentPages = agent.currentPages.filter(id => id !== pageId);

    // Update agent status
    if (agent.currentPages.length === 0) {
      agent.status = 'available';
    }
    agent.lastActive = new Date();

    // Remove from active sessions
    this.activeSessions.delete(pageId);

    console.log(`🔓 Released agent ${agent.name} from page: ${page.title}`);
    return true;
  }

  /**
   * Get all available agents
   */
  getAvailableAgents(): DevelopmentAgent[] {
    return Array.from(this.agents.values()).filter(agent => agent.status === 'available');
  }

  /**
   * Get agent by ID
   */
  getAgent(agentId: string): DevelopmentAgent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get all agents
   */
  getAllAgents(): DevelopmentAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get active sessions
   */
  getActiveSessions(): Map<string, { pageId: string; openedAt: Date }> {
    return this.activeSessions;
  }

  /**
   * Update agent status
   */
  updateAgentStatus(agentId: string, status: 'available' | 'busy' | 'offline'): boolean {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    agent.status = status;
    agent.lastActive = new Date();
    return true;
  }

  /**
   * Get pages assigned to an agent
   */
  getPagesByAgent(agentId: string): PageInfo[] {
    return urlManager.getPagesByAgent(agentId);
  }

  /**
   * Search for pages and open them
   */
  async searchAndOpenPages(query: string, agentId?: string): Promise<string[]> {
    const pages = urlManager.searchPages(query);
    const openedPages: string[] = [];

    for (const page of pages) {
      const success = await this.openPage(page.id, agentId);
      if (success) {
        openedPages.push(page.id);
      }
    }

    return openedPages;
  }

  /**
   * Open multiple pages
   */
  async openMultiplePages(pageIds: string[], agentId?: string): Promise<string[]> {
    const openedPages: string[] = [];

    for (const pageId of pageIds) {
      const success = await this.openPage(pageId, agentId);
      if (success) {
        openedPages.push(pageId);
      }
    }

    return openedPages;
  }

  /**
   * Get configuration
   */
  getConfig(): BrowserConfig {
    return this.config;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<BrowserConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Close all active sessions
   */
  closeAllSessions(): void {
    this.activeSessions.clear();
    console.log('🔒 Closed all active sessions');
  }

  /**
   * Get system status
   */
  getSystemStatus() {
    return {
      totalAgents: this.agents.size,
      availableAgents: this.getAvailableAgents().length,
      activeSessions: this.activeSessions.size,
      config: this.config,
    };
  }
}

// Create singleton instance
export const autoBrowser = new AutoBrowserManager();

// Export the class for direct usage
export { AutoBrowserManager };
