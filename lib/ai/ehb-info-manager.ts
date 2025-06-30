/**
 * EHB Information Manager
 * Simple utility for managing EHB information updates
 */

import {
  ehbCompanyInfo,
  ehbServices,
  getServiceById,
  getOverallProgress,
} from '../../app/roadmap/data/ehb-master-information';

export interface EHBUpdate {
  type: 'service' | 'company' | 'new-service';
  data: any;
  timestamp: string;
  agent: string;
}

class EHBInformationManager {
  private updates: EHBUpdate[] = [];

  constructor() {
    this.loadUpdates();
  }

  private loadUpdates(): void {
    if (typeof window !== 'undefined') {
      const savedUpdates = localStorage.getItem('ehb-updates');
      if (savedUpdates) {
        this.updates = JSON.parse(savedUpdates);
      }
    }
  }

  private saveUpdates(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ehb-updates', JSON.stringify(this.updates));
    }
  }

  addUpdate(update: EHBUpdate): void {
    this.updates.push(update);
    this.saveUpdates();
  }

  getUpdates(): EHBUpdate[] {
    return this.updates;
  }

  getStatusSummary() {
    return {
      overallProgress: getOverallProgress(),
      totalServices: ehbServices.length,
      completed: ehbServices.filter(s => s.status === 'Completed').length,
      working: ehbServices.filter(s => s.status === 'Working').length,
      underDevelopment: ehbServices.filter(s => s.status === 'Under Development').length,
      notStarted: ehbServices.filter(s => s.status === 'Not Started').length,
    };
  }

  getAgentInstructions(): string {
    return `
EHB AI Agent Instructions:

1. ALWAYS reference master information file first
2. NEVER use outdated information
3. Focus on frontend development only
4. Use TypeScript, Next.js 14+, Tailwind CSS
5. Follow EHB coding standards
6. Update information when provided
7. Current Progress: ${getOverallProgress()}%
8. Mission: ${ehbCompanyInfo.mission}
    `;
  }
}

const ehbInfoManager = new EHBInformationManager();

export default ehbInfoManager;
