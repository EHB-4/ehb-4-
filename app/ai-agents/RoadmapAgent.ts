// RoadmapAgent.ts
// Handles real-time roadmap information, progress tracking, and development insights

import { roadmapData, MasterRoadmapData } from '../roadmap/data/roadmapData';

export interface RoadmapInsight {
  type: 'progress' | 'milestone' | 'alert' | 'recommendation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  module?: string;
  phase?: string;
}

export interface ProgressUpdate {
  module: string;
  previousProgress: number;
  currentProgress: number;
  change: number;
  timestamp: Date;
}

export class RoadmapAgent {
  private roadmapData: MasterRoadmapData;
  private insights: RoadmapInsight[] = [];
  private progressHistory: ProgressUpdate[] = [];

  constructor() {
    this.roadmapData = roadmapData;
    this.initializeInsights();
  }

  // Initialize default insights
  private initializeInsights(): void {
    this.insights = [
      {
        type: 'milestone',
        title: 'Phase 1 Foundation Complete',
        description: 'Core infrastructure and authentication systems are operational',
        priority: 'high',
        timestamp: new Date(),
        phase: 'phase-1-foundation',
      },
      {
        type: 'recommendation',
        title: 'Focus on GoSellr Development',
        description: 'E-commerce platform should be prioritized for MVP launch',
        priority: 'medium',
        timestamp: new Date(),
        module: 'GoSellr',
      },
    ];
  }

  // Get overall project progress
  getOverallProgress(): number {
    const totalTasks = this.roadmapData.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
    const completedTasks = this.roadmapData.phases.reduce(
      (acc, phase) => acc + phase.tasks.filter(task => task.status === 'Done').length,
      0
    );
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }

  // Get department status summary
  getDepartmentStatus(): { completed: number; inProgress: number; planned: number } {
    const completed = this.roadmapData.departments.filter(
      dept => dept.status === 'Completed'
    ).length;
    const inProgress = this.roadmapData.departments.filter(
      dept => dept.status === 'In Progress'
    ).length;
    const planned = this.roadmapData.departments.filter(dept => dept.status === 'Planned').length;

    return { completed, inProgress, planned };
  }

  // Get phase progress
  getPhaseProgress(phaseId: string): number {
    const phase = this.roadmapData.phases.find(p => p.id === phaseId);
    if (!phase) return 0;

    const completedTasks = phase.tasks.filter(task => task.status === 'Done').length;
    return phase.tasks.length > 0 ? (completedTasks / phase.tasks.length) * 100 : 0;
  }

  // Get module progress
  getModuleProgress(moduleName: string): number {
    const moduleTasks = this.roadmapData.phases.flatMap(phase =>
      phase.tasks.filter(task => task.module === moduleName)
    );

    if (moduleTasks.length === 0) return 0;

    const completedTasks = moduleTasks.filter(task => task.status === 'Done').length;
    return (completedTasks / moduleTasks.length) * 100;
  }

  // Get recent insights
  getRecentInsights(limit: number = 5): RoadmapInsight[] {
    return this.insights
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Add new insight
  addInsight(insight: Omit<RoadmapInsight, 'timestamp'>): void {
    this.insights.push({
      ...insight,
      timestamp: new Date(),
    });
  }

  // Get next milestones
  getNextMilestones(): { phase: string; title: string; progress: number; eta?: string }[] {
    return this.roadmapData.phases
      .filter(phase => {
        const progress = this.getPhaseProgress(phase.id);
        return progress < 100 && progress > 0;
      })
      .map(phase => ({
        phase: phase.id,
        title: phase.title,
        progress: this.getPhaseProgress(phase.id),
        eta: this.estimateETA(phase.id),
      }))
      .sort((a, b) => b.progress - a.progress);
  }

  // Estimate ETA for phase completion
  private estimateETA(phaseId: string): string {
    const phase = this.roadmapData.phases.find(p => p.id === phaseId);
    if (!phase) return 'Unknown';

    const progress = this.getPhaseProgress(phaseId);
    const remainingTasks = phase.tasks.filter(task => task.status !== 'Done').length;

    // Rough estimation: 1 week per remaining task
    const estimatedWeeks = remainingTasks;
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + estimatedWeeks * 7);

    return estimatedDate.toLocaleDateString();
  }

  // Get critical alerts
  getCriticalAlerts(): RoadmapInsight[] {
    return this.insights.filter(insight => insight.priority === 'critical');
  }

  // Get AI agent assignments
  getAgentAssignments(): { module: string; agent: string; status: string }[] {
    return this.roadmapData.agentAssignments.map(assignment => ({
      module: assignment.module,
      agent: assignment.agent,
      status: this.getAgentStatus(assignment.module),
    }));
  }

  // Get a random status for a module
  private getAgentStatus(module: string): string {
    const statuses = ['active', 'idle', 'processing', 'error'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return status || 'idle';
  }

  // Get development recommendations
  getDevelopmentRecommendations(): string[] {
    const recommendations: string[] = [];

    // Check for departments that need attention
    const plannedDepartments = this.roadmapData.departments.filter(
      dept => dept.status === 'Planned'
    );
    if (plannedDepartments.length > 0) {
      const nextDepartment = plannedDepartments[0];
      if (nextDepartment) {
        recommendations.push(`Consider starting development for ${nextDepartment.name} department`);
      }
    }

    // Check for phases with low progress
    const lowProgressPhases = this.roadmapData.phases.filter(phase => {
      const progress = this.getPhaseProgress(phase.id);
      return progress < 30 && progress > 0;
    });

    if (lowProgressPhases.length > 0) {
      recommendations.push(`Focus on accelerating progress in ${lowProgressPhases[0].title}`);
    }

    return recommendations;
  }

  // Get real-time dashboard data
  getDashboardData(): {
    overallProgress: number;
    departmentStatus: { completed: number; inProgress: number; planned: number };
    nextMilestones: { phase: string; title: string; progress: number; eta?: string }[];
    recentInsights: RoadmapInsight[];
    criticalAlerts: RoadmapInsight[];
    recommendations: string[];
  } {
    return {
      overallProgress: this.getOverallProgress(),
      departmentStatus: this.getDepartmentStatus(),
      nextMilestones: this.getNextMilestones(),
      recentInsights: this.getRecentInsights(),
      criticalAlerts: this.getCriticalAlerts(),
      recommendations: this.getDevelopmentRecommendations(),
    };
  }

  // Update task status (for real-time updates)
  updateTaskStatus(
    phaseId: string,
    taskId: string,
    status: 'Done' | 'In Progress' | 'Planned'
  ): void {
    const phase = this.roadmapData.phases.find(p => p.id === phaseId);
    if (!phase) return;

    const task = phase.tasks.find(t => t.id === taskId);
    if (!task) return;

    const previousProgress = this.getPhaseProgress(phaseId);
    task.status = status;
    const currentProgress = this.getPhaseProgress(phaseId);

    // Record progress update
    this.progressHistory.push({
      module: task.module,
      previousProgress,
      currentProgress,
      change: currentProgress - previousProgress,
      timestamp: new Date(),
    });

    // Add insight for significant progress
    if (currentProgress - previousProgress > 10) {
      this.addInsight({
        type: 'progress',
        title: `Significant Progress in ${phase.title}`,
        description: `Progress increased by ${(currentProgress - previousProgress).toFixed(1)}%`,
        priority: 'medium',
        phase: phaseId,
      });
    }
  }

  // Get progress history
  getProgressHistory(module?: string): ProgressUpdate[] {
    let history = this.progressHistory;
    if (module) {
      history = history.filter(update => update.module === module);
    }
    return history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}
