/**
 * EHB Information Manager
 * Centralized utility for managing EHB company and service information
 * Provides functions for agents to update and access information
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
  description: string;
}

export interface ServiceUpdate {
  id: string;
  progress?: number;
  status?: 'Completed' | 'Working' | 'Under Development' | 'Not Started';
  description?: string;
  purpose?: string;
  features?: string[];
  team?: string[];
  dependencies?: string[];
}

export interface CompanyUpdate {
  description?: string;
  mission?: string;
  vision?: string;
  coreValues?: string[];
  techStack?: Array<{ name: string; version: string }>;
}

export interface NewService {
  id: string;
  name: string;
  fullName: string;
  description: string;
  purpose: string;
  status: 'Completed' | 'Working' | 'Under Development' | 'Not Started';
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  team: string[];
  features: string[];
  dependencies: string[];
  path: string;
}

class EHBInformationManager {
  private updates: EHBUpdate[] = [];

  constructor() {
    this.loadUpdates();
  }

  /**
   * Load updates from localStorage
   */
  private loadUpdates(): void {
    if (typeof window !== 'undefined') {
      const savedUpdates = localStorage.getItem('ehb-updates');
      if (savedUpdates) {
        this.updates = JSON.parse(savedUpdates);
      }
    }
  }

  /**
   * Save updates to localStorage
   */
  private saveUpdates(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ehb-updates', JSON.stringify(this.updates));
    }
  }

  /**
   * Add a new update
   */
  addUpdate(update: EHBUpdate): void {
    this.updates.push(update);
    this.saveUpdates();
  }

  /**
   * Get all updates
   */
  getUpdates(): EHBUpdate[] {
    return this.updates;
  }

  /**
   * Get updates by type
   */
  getUpdatesByType(type: EHBUpdate['type']): EHBUpdate[] {
    return this.updates.filter(update => update.type === type);
  }

  /**
   * Update service information
   */
  updateService(serviceUpdate: ServiceUpdate, agent: string = 'AI Agent'): boolean {
    const service = getServiceById(serviceUpdate.id);
    if (!service) {
      console.error(`Service with ID '${serviceUpdate.id}' not found`);
      return false;
    }

    const update: EHBUpdate = {
      type: 'service',
      data: serviceUpdate,
      timestamp: new Date().toISOString(),
      agent,
      description: `Updated service: ${service.name}`,
    };

    this.addUpdate(update);
    return true;
  }

  /**
   * Update company information
   */
  updateCompany(companyUpdate: CompanyUpdate, agent: string = 'AI Agent'): boolean {
    const update: EHBUpdate = {
      type: 'company',
      data: companyUpdate,
      timestamp: new Date().toISOString(),
      agent,
      description: 'Updated company information',
    };

    this.addUpdate(update);
    return true;
  }

  /**
   * Add new service
   */
  addNewService(newService: NewService, agent: string = 'AI Agent'): boolean {
    const update: EHBUpdate = {
      type: 'new-service',
      data: newService,
      timestamp: new Date().toISOString(),
      agent,
      description: `Added new service: ${newService.name}`,
    };

    this.addUpdate(update);
    return true;
  }

  /**
   * Get current EHB status summary
   */
  getStatusSummary() {
    const overallProgress = getOverallProgress();
    const completedServices = ehbServices.filter(s => s.status === 'Completed');
    const workingServices = ehbServices.filter(s => s.status === 'Working');
    const underDevelopmentServices = ehbServices.filter(s => s.status === 'Under Development');
    const notStartedServices = ehbServices.filter(s => s.status === 'Not Started');

    return {
      overallProgress,
      totalServices: ehbServices.length,
      completed: completedServices.length,
      working: workingServices.length,
      underDevelopment: underDevelopmentServices.length,
      notStarted: notStartedServices.length,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get services by status
   */
  getServicesByStatus(status: string) {
    return ehbServices.filter(service => service.status === status);
  }

  /**
   * Get services by priority
   */
  getServicesByPriority(priority: string) {
    return ehbServices.filter(service => service.priority === priority);
  }

  /**
   * Get development recommendations
   */
  getDevelopmentRecommendations() {
    const highPriorityServices = this.getServicesByPriority('High');
    const workingServices = this.getServicesByStatus('Working');
    const underDevelopmentServices = this.getServicesByStatus('Under Development');

    return {
      highPriority: highPriorityServices.filter(s => s.status !== 'Completed'),
      nextSteps: [
        ...workingServices.filter(s => s.progress < 80),
        ...underDevelopmentServices,
      ].slice(0, 5),
      completed: this.getServicesByStatus('Completed'),
      needsAttention: ehbServices.filter(s => s.progress < 50),
    };
  }

  /**
   * Validate service information
   */
  validateService(service: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const requiredFields = [
      'id',
      'name',
      'fullName',
      'description',
      'purpose',
      'status',
      'progress',
      'priority',
      'team',
      'features',
      'dependencies',
      'path',
    ];

    requiredFields.forEach(field => {
      if (!service[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    if (service.progress && (service.progress < 0 || service.progress > 100)) {
      errors.push('Progress must be between 0 and 100');
    }

    if (
      service.status &&
      !['Completed', 'Working', 'Under Development', 'Not Started'].includes(service.status)
    ) {
      errors.push('Invalid status value');
    }

    if (service.priority && !['High', 'Medium', 'Low'].includes(service.priority)) {
      errors.push('Invalid priority value');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get agent instructions
   */
  getAgentInstructions(): string {
    return `
EHB AI Agent Instructions - ALWAYS FOLLOW THESE RULES:

1. INFORMATION MANAGEMENT:
   - ALWAYS reference the master information file first
   - NEVER use outdated or conflicting information
   - Update master information when new data is provided
   - Ask for clarification if information is unclear
   - Provide suggestions based on current EHB architecture

2. FRONTEND DEVELOPMENT FOCUS:
   - Use TypeScript for all components
   - Follow Next.js 14+ App Router patterns
   - Use Tailwind CSS for styling
   - Implement proper component structure
   - Add comprehensive JSDoc comments
   - Use React hooks effectively

3. BACKEND FEATURES (DISABLED):
   - MongoDB setup disabled
   - Database operations disabled
   - Backend API development disabled
   - Docker services disabled
   - Focus on frontend development only

4. QUALITY STANDARDS:
   - Write clean, readable, and maintainable code
   - Follow EHB coding standards and conventions
   - Implement proper error handling
   - Add comprehensive testing
   - Ensure accessibility compliance
   - Optimize for performance

5. CURRENT EHB STATUS:
   - Overall Progress: ${getOverallProgress()}%
   - Mission: ${ehbCompanyInfo.mission}
   - Vision: ${ehbCompanyInfo.vision}
   - Total Services: ${ehbServices.length}

6. ALWAYS PRIORITIZE:
   - EHB's mission and vision
   - Frontend development excellence
   - Code quality and maintainability
   - User experience and accessibility
   - Performance optimization
    `;
  }

  /**
   * Export updates for backup
   */
  exportUpdates(): string {
    return JSON.stringify(
      {
        updates: this.updates,
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      },
      null,
      2
    );
  }

  /**
   * Import updates from backup
   */
  importUpdates(backupData: string): boolean {
    try {
      const data = JSON.parse(backupData);
      if (data.updates && Array.isArray(data.updates)) {
        this.updates = data.updates;
        this.saveUpdates();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing updates:', error);
      return false;
    }
  }

  /**
   * Clear all updates
   */
  clearUpdates(): void {
    this.updates = [];
    this.saveUpdates();
  }
}

// Create singleton instance
const ehbInformationManager = new EHBInformationManager();

export default ehbInformationManager;

// Export utility functions
export const getEHBStatus = () => ehbInformationManager.getStatusSummary();
export const getDevelopmentRecommendations = () =>
  ehbInformationManager.getDevelopmentRecommendations();
export const getAgentInstructions = () => ehbInformationManager.getAgentInstructions();
export const updateService = (serviceUpdate: ServiceUpdate, agent?: string) =>
  ehbInformationManager.updateService(serviceUpdate, agent);
export const updateCompany = (companyUpdate: CompanyUpdate, agent?: string) =>
  ehbInformationManager.updateCompany(companyUpdate, agent);
export const addNewService = (newService: NewService, agent?: string) =>
  ehbInformationManager.addNewService(newService, agent);
export const validateService = (service: any) => ehbInformationManager.validateService(service);
