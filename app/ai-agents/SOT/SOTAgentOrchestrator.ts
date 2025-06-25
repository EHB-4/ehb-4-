/**
 * SOT Agent Orchestrator - Coordinates all AI agents in the SOT system
 *
 * Purpose: Manages and coordinates all SOT AI agents:
 * - DevMatchAgent: Task-developer matching
 * - CodeCheckAgent: Code review and quality assurance
 * - SchedulerAgent: Timeline and deadline management
 * - FraudWatchAgent: Fraud detection and prevention
 * - ComplaintBot: User complaint handling
 * - SQLScoreAgent: SQL level management
 *
 * @author EHB AI System
 * @version 1.0.0
 */

import DevMatchAgent from './DevMatchAgent';
import CodeCheckAgent from './CodeCheckAgent';
import SchedulerAgent from './SchedulerAgent';
import FraudWatchAgent from './FraudWatchAgent';
import ComplaintBot from './ComplaintBot';
import SQLScoreAgent from './SQLScoreAgent';

export interface SOTSystemConfig {
  enableDevMatching: boolean;
  enableCodeReview: boolean;
  enableScheduling: boolean;
  enableFraudDetection: boolean;
  enableComplaintHandling: boolean;
  enableSQLScoring: boolean;
  autoEscalationEnabled: boolean;
  blockchainLoggingEnabled: boolean;
  aiModelVersion: string;
  maxConcurrentTasks: number;
}

export interface SOTTask {
  id: string;
  type: 'development' | 'review' | 'scheduling' | 'fraud_check' | 'complaint' | 'sql_update';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  data: any;
  assignedAgent: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
}

export interface SOTSystemMetrics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageProcessingTime: number;
  agentUtilization: Record<string, number>;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: Date;
}

export class SOTAgentOrchestrator {
  private devMatchAgent: DevMatchAgent;
  private codeCheckAgent: CodeCheckAgent;
  private schedulerAgent: SchedulerAgent;
  private fraudWatchAgent: FraudWatchAgent;
  private complaintBot: ComplaintBot;
  private sqlScoreAgent: SQLScoreAgent;

  private config: SOTSystemConfig;
  private taskQueue: SOTTask[] = [];
  private activeTasks: Map<string, SOTTask> = new Map();
  private completedTasks: SOTTask[] = [];
  private systemMetrics: SOTSystemMetrics;

  constructor(config: Partial<SOTSystemConfig> = {}) {
    // Initialize default configuration
    this.config = {
      enableDevMatching: true,
      enableCodeReview: true,
      enableScheduling: true,
      enableFraudDetection: true,
      enableComplaintHandling: true,
      enableSQLScoring: true,
      autoEscalationEnabled: true,
      blockchainLoggingEnabled: true,
      aiModelVersion: '1.0.0',
      maxConcurrentTasks: 50,
      ...config,
    };

    // Initialize all agents
    this.devMatchAgent = new DevMatchAgent();
    this.codeCheckAgent = new CodeCheckAgent();
    this.schedulerAgent = new SchedulerAgent();
    this.fraudWatchAgent = new FraudWatchAgent();
    this.complaintBot = new ComplaintBot();
    this.sqlScoreAgent = new SQLScoreAgent();

    // Initialize system metrics
    this.systemMetrics = {
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      averageProcessingTime: 0,
      agentUtilization: {},
      systemHealth: 'excellent',
      lastUpdated: new Date(),
    };

    this.startTaskProcessor();
    console.log('🎯 SOT Agent Orchestrator initialized');
  }

  /**
   * Submit a task to the SOT system
   */
  async submitTask(
    taskType: SOTTask['type'],
    data: any,
    priority: SOTTask['priority'] = 'medium'
  ): Promise<string> {
    const taskId = `sot_task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const task: SOTTask = {
      id: taskId,
      type: taskType,
      priority,
      data,
      assignedAgent: this.determineAssignedAgent(taskType),
      status: 'pending',
      createdAt: new Date(),
    };

    this.taskQueue.push(task);
    this.systemMetrics.totalTasks++;

    // Sort queue by priority
    this.taskQueue.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    console.log(
      `📥 SOT Orchestrator: Submitted ${taskType} task ${taskId} with priority ${priority}`
    );

    return taskId;
  }

  /**
   * Get task status and result
   */
  async getTaskStatus(taskId: string): Promise<SOTTask | null> {
    // Check active tasks
    const activeTask = this.activeTasks.get(taskId);
    if (activeTask) return activeTask;

    // Check completed tasks
    return this.completedTasks.find(task => task.id === taskId) || null;
  }

  /**
   * Get system metrics
   */
  async getSystemMetrics(): Promise<SOTSystemMetrics> {
    // Update metrics
    this.updateSystemMetrics();
    return this.systemMetrics;
  }

  /**
   * Process development task with full pipeline
   */
  async processDevelopmentTask(taskData: {
    taskId: string;
    requirements: any;
    developerId: string;
    deadline: Date;
    budget: number;
  }): Promise<{
    devMatch: any;
    codeReview: any;
    scheduling: any;
    fraudCheck: any;
    sqlUpdate: any;
  }> {
    console.log(`🔄 SOT Orchestrator: Processing development task ${taskData.taskId}`);

    const results: any = {};

    try {
      // Step 1: Developer Matching
      if (this.config.enableDevMatching) {
        const devMatchTaskId = await this.submitTask(
          'development',
          {
            action: 'find_developer',
            requirements: taskData.requirements,
            budget: taskData.budget,
          },
          'high'
        );

        const devMatchResult = await this.waitForTaskCompletion(devMatchTaskId);
        results.devMatch = devMatchResult;
      }

      // Step 2: Schedule the task
      if (this.config.enableScheduling) {
        const scheduleTaskId = await this.submitTask(
          'scheduling',
          {
            action: 'create_task',
            taskId: taskData.taskId,
            developerId: taskData.developerId,
            deadline: taskData.deadline,
            estimatedHours: taskData.requirements.estimatedHours,
          },
          'high'
        );

        const scheduleResult = await this.waitForTaskCompletion(scheduleTaskId);
        results.scheduling = scheduleResult;
      }

      // Step 3: Fraud check on developer
      if (this.config.enableFraudDetection) {
        const fraudTaskId = await this.submitTask(
          'fraud_check',
          {
            action: 'check_developer',
            developerId: taskData.developerId,
            taskId: taskData.taskId,
          },
          'medium'
        );

        const fraudResult = await this.waitForTaskCompletion(fraudTaskId);
        results.fraudCheck = fraudResult;
      }

      // Step 4: Update SQL score
      if (this.config.enableSQLScoring) {
        const sqlTaskId = await this.submitTask(
          'sql_update',
          {
            action: 'add_task_assignment',
            userId: taskData.developerId,
            taskType: 'development',
            complexity: taskData.requirements.complexity,
          },
          'low'
        );

        const sqlResult = await this.waitForTaskCompletion(sqlTaskId);
        results.sqlUpdate = sqlResult;
      }

      console.log(
        `✅ SOT Orchestrator: Completed development task processing for ${taskData.taskId}`
      );
    } catch (error) {
      console.error(
        `❌ SOT Orchestrator: Error processing development task ${taskData.taskId}:`,
        error
      );
      throw error;
    }

    return results;
  }

  /**
   * Process code submission with review pipeline
   */
  async processCodeSubmission(submissionData: {
    submissionId: string;
    developerId: string;
    codeFiles: any[];
    taskId: string;
  }): Promise<{
    codeReview: any;
    fraudCheck: any;
    sqlUpdate: any;
    scheduling: any;
  }> {
    console.log(`🔄 SOT Orchestrator: Processing code submission ${submissionData.submissionId}`);

    const results: any = {};

    try {
      // Step 1: Code Review
      if (this.config.enableCodeReview) {
        const reviewTaskId = await this.submitTask(
          'review',
          {
            action: 'review_code',
            submission: submissionData,
          },
          'high'
        );

        const reviewResult = await this.waitForTaskCompletion(reviewTaskId);
        results.codeReview = reviewResult;
      }

      // Step 2: Fraud check on code
      if (this.config.enableFraudDetection) {
        const fraudTaskId = await this.submitTask(
          'fraud_check',
          {
            action: 'check_code',
            submission: submissionData,
          },
          'high'
        );

        const fraudResult = await this.waitForTaskCompletion(fraudTaskId);
        results.fraudCheck = fraudResult;
      }

      // Step 3: Update SQL score based on code quality
      if (this.config.enableSQLScoring && results.codeReview) {
        const sqlTaskId = await this.submitTask(
          'sql_update',
          {
            action: 'add_code_submission',
            userId: submissionData.developerId,
            quality: results.codeReview.overallScore,
            passed: results.codeReview.status === 'approved',
          },
          'medium'
        );

        const sqlResult = await this.waitForTaskCompletion(sqlTaskId);
        results.sqlUpdate = sqlResult;
      }

      // Step 4: Update scheduling
      if (this.config.enableScheduling) {
        const scheduleTaskId = await this.submitTask(
          'scheduling',
          {
            action: 'update_task_progress',
            taskId: submissionData.taskId,
            status: results.codeReview?.status === 'approved' ? 'review' : 'revision_needed',
          },
          'medium'
        );

        const scheduleResult = await this.waitForTaskCompletion(scheduleTaskId);
        results.scheduling = scheduleResult;
      }

      console.log(
        `✅ SOT Orchestrator: Completed code submission processing for ${submissionData.submissionId}`
      );
    } catch (error) {
      console.error(
        `❌ SOT Orchestrator: Error processing code submission ${submissionData.submissionId}:`,
        error
      );
      throw error;
    }

    return results;
  }

  /**
   * Process user complaint
   */
  async processComplaint(complaintData: {
    userId: string;
    type: 'voice' | 'text' | 'video' | 'pdf';
    content: string;
    category: string;
  }): Promise<{
    complaint: any;
    fraudCheck: any;
    sqlUpdate: any;
    escalation?: any;
  }> {
    console.log(`🔄 SOT Orchestrator: Processing complaint from user ${complaintData.userId}`);

    const results: any = {};

    try {
      // Step 1: Process complaint
      if (this.config.enableComplaintHandling) {
        const complaintTaskId = await this.submitTask(
          'complaint',
          {
            action: 'process_complaint',
            complaint: complaintData,
          },
          'high'
        );

        const complaintResult = await this.waitForTaskCompletion(complaintTaskId);
        results.complaint = complaintResult;
      }

      // Step 2: Fraud check on user
      if (this.config.enableFraudDetection) {
        const fraudTaskId = await this.submitTask(
          'fraud_check',
          {
            action: 'check_user_activity',
            userId: complaintData.userId,
            recentActivity: true,
          },
          'medium'
        );

        const fraudResult = await this.waitForTaskCompletion(fraudTaskId);
        results.fraudCheck = fraudResult;
      }

      // Step 3: Update SQL score
      if (this.config.enableSQLScoring) {
        const sqlTaskId = await this.submitTask(
          'sql_update',
          {
            action: 'add_complaint_record',
            userId: complaintData.userId,
            complaintType: complaintData.category,
            resolved: results.complaint?.resolution?.result === 'success',
          },
          'low'
        );

        const sqlResult = await this.waitForTaskCompletion(sqlTaskId);
        results.sqlUpdate = sqlResult;
      }

      // Step 4: Handle escalation if needed
      if (results.complaint?.escalationPath && this.config.autoEscalationEnabled) {
        results.escalation = {
          level: results.complaint.escalationPath.level,
          reason: results.complaint.escalationPath.reason,
          estimatedResponseTime: results.complaint.escalationPath.estimatedResponseTime,
        };
      }

      console.log(
        `✅ SOT Orchestrator: Completed complaint processing for user ${complaintData.userId}`
      );
    } catch (error) {
      console.error(
        `❌ SOT Orchestrator: Error processing complaint for user ${complaintData.userId}:`,
        error
      );
      throw error;
    }

    return results;
  }

  /**
   * Get agent-specific methods for direct access
   */
  getDevMatchAgent(): DevMatchAgent {
    return this.devMatchAgent;
  }

  getCodeCheckAgent(): CodeCheckAgent {
    return this.codeCheckAgent;
  }

  getSchedulerAgent(): SchedulerAgent {
    return this.schedulerAgent;
  }

  getFraudWatchAgent(): FraudWatchAgent {
    return this.fraudWatchAgent;
  }

  getComplaintBot(): ComplaintBot {
    return this.complaintBot;
  }

  getSQLScoreAgent(): SQLScoreAgent {
    return this.sqlScoreAgent;
  }

  /**
   * Update system configuration
   */
  updateConfig(newConfig: Partial<SOTSystemConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log(`⚙️ SOT Orchestrator: Updated configuration`);
  }

  /**
   * Get current configuration
   */
  getConfig(): SOTSystemConfig {
    return { ...this.config };
  }

  // Private helper methods

  private determineAssignedAgent(taskType: SOTTask['type']): string {
    switch (taskType) {
      case 'development':
        return 'DevMatchAgent';
      case 'review':
        return 'CodeCheckAgent';
      case 'scheduling':
        return 'SchedulerAgent';
      case 'fraud_check':
        return 'FraudWatchAgent';
      case 'complaint':
        return 'ComplaintBot';
      case 'sql_update':
        return 'SQLScoreAgent';
      default:
        return 'UnknownAgent';
    }
  }

  private async waitForTaskCompletion(taskId: string, timeout: number = 30000): Promise<any> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const task = await this.getTaskStatus(taskId);

      if (task?.status === 'completed') {
        return task.result;
      }

      if (task?.status === 'failed') {
        throw new Error(`Task ${taskId} failed: ${task.error}`);
      }

      // Wait 100ms before checking again
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error(`Task ${taskId} timed out after ${timeout}ms`);
  }

  private async processTask(task: SOTTask): Promise<void> {
    console.log(`🔄 SOT Orchestrator: Processing task ${task.id} with ${task.assignedAgent}`);

    task.status = 'processing';
    this.activeTasks.set(task.id, task);

    const startTime = Date.now();

    try {
      let result: any;

      // Route task to appropriate agent
      switch (task.assignedAgent) {
        case 'DevMatchAgent':
          if (task.data.action === 'find_developer') {
            result = await this.devMatchAgent.findBestMatches(task.data.requirements);
          } else {
            throw new Error(`Unknown action for DevMatchAgent: ${task.data.action}`);
          }
          break;

        case 'CodeCheckAgent':
          if (task.data.action === 'review_code') {
            result = await this.codeCheckAgent.reviewCode(task.data.submission);
          } else {
            throw new Error(`Unknown action for CodeCheckAgent: ${task.data.action}`);
          }
          break;

        case 'SchedulerAgent':
          if (task.data.action === 'create_task') {
            result = await this.schedulerAgent.createTask(task.data);
          } else if (task.data.action === 'update_task_progress') {
            await this.schedulerAgent.updateTaskStatus(task.data.taskId, task.data.status);
            result = { status: 'updated' };
          } else {
            throw new Error(`Unknown action for SchedulerAgent: ${task.data.action}`);
          }
          break;

        case 'FraudWatchAgent':
          if (task.data.action === 'check_developer') {
            const riskScore = await this.fraudWatchAgent.getUserRiskScore(task.data.developerId);
            result = riskScore;
          } else if (task.data.action === 'check_code') {
            result = await this.fraudWatchAgent.analyzeCodeSubmission(task.data.submission);
          } else if (task.data.action === 'check_user_activity') {
            const signals = await this.fraudWatchAgent.getUserFraudSignals(task.data.userId);
            result = { signals, riskLevel: signals.length > 0 ? 'medium' : 'low' };
          } else {
            throw new Error(`Unknown action for FraudWatchAgent: ${task.data.action}`);
          }
          break;

        case 'ComplaintBot':
          if (task.data.action === 'process_complaint') {
            result = await this.complaintBot.processComplaint(task.data.complaint);
          } else {
            throw new Error(`Unknown action for ComplaintBot: ${task.data.action}`);
          }
          break;

        case 'SQLScoreAgent':
          if (task.data.action === 'add_task_assignment') {
            await this.sqlScoreAgent.addTaskCompletion(task.data.userId, {
              taskId: task.data.taskId,
              taskType: task.data.taskType,
              status: 'completed',
              rating: 5,
              completedAt: new Date(),
              earnings: 0,
              complexity: task.data.complexity,
            });
            result = { status: 'updated' };
          } else if (task.data.action === 'add_code_submission') {
            // Add bonus/penalty based on code quality
            if (task.data.passed) {
              await this.sqlScoreAgent.addBonusPoints(
                task.data.userId,
                10,
                'High quality code submission'
              );
            } else {
              await this.sqlScoreAgent.addPenaltyPoints(
                task.data.userId,
                5,
                'Poor quality code submission'
              );
            }
            result = { status: 'updated' };
          } else if (task.data.action === 'add_complaint_record') {
            if (!task.data.resolved) {
              await this.sqlScoreAgent.addPenaltyPoints(
                task.data.userId,
                2,
                'Unresolved complaint'
              );
            }
            result = { status: 'updated' };
          } else {
            throw new Error(`Unknown action for SQLScoreAgent: ${task.data.action}`);
          }
          break;

        default:
          throw new Error(`Unknown agent: ${task.assignedAgent}`);
      }

      // Mark task as completed
      task.status = 'completed';
      task.result = result;
      task.completedAt = new Date();

      this.completedTasks.push(task);
      this.activeTasks.delete(task.id);

      const processingTime = Date.now() - startTime;
      console.log(`✅ SOT Orchestrator: Completed task ${task.id} in ${processingTime}ms`);
    } catch (error) {
      // Mark task as failed
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'Unknown error';
      task.completedAt = new Date();

      this.completedTasks.push(task);
      this.activeTasks.delete(task.id);

      console.error(`❌ SOT Orchestrator: Failed task ${task.id}:`, error);
    }
  }

  private startTaskProcessor(): void {
    // Process tasks every 100ms
    setInterval(async () => {
      // Check if we can process more tasks
      if (this.activeTasks.size >= this.config.maxConcurrentTasks) {
        return;
      }

      // Get next task from queue
      const nextTask = this.taskQueue.shift();
      if (!nextTask) {
        return;
      }

      // Process the task
      await this.processTask(nextTask);
    }, 100);

    console.log('🔄 SOT Orchestrator: Started task processor');
  }

  private updateSystemMetrics(): void {
    const now = new Date();

    // Calculate processing times
    const recentTasks = this.completedTasks.filter(
      task => task.completedAt && now.getTime() - task.completedAt.getTime() < 24 * 60 * 60 * 1000
    );

    if (recentTasks.length > 0) {
      const totalProcessingTime = recentTasks.reduce((sum, task) => {
        if (task.completedAt) {
          return sum + (task.completedAt.getTime() - task.createdAt.getTime());
        }
        return sum;
      }, 0);

      this.systemMetrics.averageProcessingTime = totalProcessingTime / recentTasks.length;
    }

    // Calculate agent utilization
    const agentCounts: Record<string, number> = {};
    this.completedTasks.forEach(task => {
      agentCounts[task.assignedAgent] = (agentCounts[task.assignedAgent] || 0) + 1;
    });

    const totalTasks = this.completedTasks.length;
    Object.keys(agentCounts).forEach(agent => {
      this.systemMetrics.agentUtilization[agent] = (agentCounts[agent] / totalTasks) * 100;
    });

    // Determine system health
    const failureRate = this.systemMetrics.failedTasks / this.systemMetrics.totalTasks;
    if (failureRate < 0.01) {
      this.systemMetrics.systemHealth = 'excellent';
    } else if (failureRate < 0.05) {
      this.systemMetrics.systemHealth = 'good';
    } else if (failureRate < 0.1) {
      this.systemMetrics.systemHealth = 'fair';
    } else {
      this.systemMetrics.systemHealth = 'poor';
    }

    this.systemMetrics.lastUpdated = now;
  }
}

export default SOTAgentOrchestrator;
