/**
 * SchedulerAgent - Handles task timelines, auto-deadline reminders, escalations
 *
 * Purpose: Manages project timelines and ensures timely delivery by:
 * - Setting and tracking deadlines
 * - Sending automated reminders
 * - Escalating overdue tasks
 * - Managing timezone differences
 * - Coordinating with other agents
 *
 * @author EHB AI System
 * @version 1.0.0
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  developerId: string;
  clientId: string;
  assignedAt: Date;
  deadline: Date;
  estimatedHours: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'overdue';
  category: string;
  budget: number; // EHBGC
  timezone: string;
  milestones: Milestone[];
  dependencies: string[]; // Task IDs this task depends on
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  description: string;
}

export interface Reminder {
  id: string;
  taskId: string;
  type: 'deadline' | 'milestone' | 'escalation' | 'checkin';
  message: string;
  sentAt: Date;
  recipientId: string;
  recipientType: 'developer' | 'client' | 'admin';
  status: 'pending' | 'sent' | 'acknowledged';
}

export interface Escalation {
  id: string;
  taskId: string;
  reason: 'overdue' | 'no_response' | 'quality_issue' | 'budget_exceeded';
  escalatedAt: Date;
  escalatedTo: string; // Admin/Franchise ID
  status: 'open' | 'in_progress' | 'resolved';
  description: string;
  actions: string[];
}

export interface TimezoneInfo {
  timezone: string;
  offset: number; // hours from UTC
  currentTime: Date;
  workingHours: {
    start: number; // hour in 24h format
    end: number;
    days: number[]; // 0=Sunday, 1=Monday, etc.
  };
}

export class SchedulerAgent {
  private tasks: Map<string, Task> = new Map();
  private reminders: Reminder[] = [];
  private escalations: Escalation[] = [];
  private timezones: Map<string, TimezoneInfo> = new Map();

  constructor() {
    this.initializeTimezones();
    this.startScheduler();
    console.log('⏰ SchedulerAgent initialized');
  }

  /**
   * Create a new task with timeline management
   */
  async createTask(taskData: Omit<Task, 'id' | 'assignedAt' | 'status'>): Promise<string> {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const task: Task = {
      ...taskData,
      id: taskId,
      assignedAt: new Date(),
      status: 'pending',
    };

    this.tasks.set(taskId, task);

    // Set up initial reminders
    await this.setupTaskReminders(task);

    console.log(
      `📅 SchedulerAgent: Created task "${task.title}" with deadline ${task.deadline.toISOString()}`
    );

    return taskId;
  }

  /**
   * Update task status and handle timeline adjustments
   */
  async updateTaskStatus(taskId: string, status: Task['status'], notes?: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const oldStatus = task.status;
    task.status = status;

    // Handle status-specific actions
    switch (status) {
      case 'in_progress':
        await this.handleTaskStarted(task);
        break;
      case 'completed':
        await this.handleTaskCompleted(task);
        break;
      case 'overdue':
        await this.handleTaskOverdue(task);
        break;
    }

    console.log(
      `📊 SchedulerAgent: Task "${task.title}" status updated from ${oldStatus} to ${status}`
    );
  }

  /**
   * Add milestone to task
   */
  async addMilestone(taskId: string, milestone: Omit<Milestone, 'id'>): Promise<string> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const milestoneId = `milestone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newMilestone: Milestone = {
      ...milestone,
      id: milestoneId,
    };

    task.milestones.push(newMilestone);

    // Set up milestone reminder
    await this.scheduleReminder({
      taskId,
      type: 'milestone',
      message: `Milestone "${milestone.title}" is due in 24 hours`,
      recipientId: task.developerId,
      recipientType: 'developer',
    });

    console.log(`🎯 SchedulerAgent: Added milestone "${milestone.title}" to task "${task.title}"`);

    return milestoneId;
  }

  /**
   * Complete a milestone
   */
  async completeMilestone(taskId: string, milestoneId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const milestone = task.milestones.find(m => m.id === milestoneId);
    if (!milestone) {
      throw new Error(`Milestone ${milestoneId} not found`);
    }

    milestone.completed = true;
    milestone.completedAt = new Date();

    console.log(`✅ SchedulerAgent: Milestone "${milestone.title}" completed`);
  }

  /**
   * Get tasks that need attention (overdue, due soon, etc.)
   */
  async getTasksNeedingAttention(): Promise<Task[]> {
    const now = new Date();
    const attentionTasks: Task[] = [];

    for (const task of this.tasks.values()) {
      const timeUntilDeadline = task.deadline.getTime() - now.getTime();
      const hoursUntilDeadline = timeUntilDeadline / (1000 * 60 * 60);

      // Overdue tasks
      if (timeUntilDeadline < 0 && task.status !== 'completed') {
        attentionTasks.push(task);
      }
      // Due within 24 hours
      else if (hoursUntilDeadline <= 24 && hoursUntilDeadline > 0) {
        attentionTasks.push(task);
      }
      // High priority tasks
      else if (task.priority === 'urgent' || task.priority === 'high') {
        attentionTasks.push(task);
      }
    }

    return attentionTasks;
  }

  /**
   * Get developer's current workload
   */
  async getDeveloperWorkload(developerId: string): Promise<{
    activeTasks: number;
    overdueTasks: number;
    totalEstimatedHours: number;
    nextDeadline?: Date;
  }> {
    const developerTasks = Array.from(this.tasks.values()).filter(
      task => task.developerId === developerId && task.status !== 'completed'
    );

    const activeTasks = developerTasks.filter(task => task.status === 'in_progress').length;
    const overdueTasks = developerTasks.filter(task => task.status === 'overdue').length;
    const totalEstimatedHours = developerTasks.reduce((sum, task) => sum + task.estimatedHours, 0);

    const nextDeadline = developerTasks
      .filter(task => task.deadline > new Date())
      .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())[0]?.deadline;

    return {
      activeTasks,
      overdueTasks,
      totalEstimatedHours,
      nextDeadline,
    };
  }

  /**
   * Check if developer is available for new tasks
   */
  async isDeveloperAvailable(
    developerId: string,
    estimatedHours: number
  ): Promise<{
    available: boolean;
    reason?: string;
    currentWorkload: number;
  }> {
    const workload = await this.getDeveloperWorkload(developerId);
    const maxWorkload = 40; // hours per week
    const available = workload.totalEstimatedHours + estimatedHours <= maxWorkload;

    return {
      available,
      reason: available ? undefined : 'Developer workload exceeds capacity',
      currentWorkload: workload.totalEstimatedHours,
    };
  }

  /**
   * Send reminder to developer or client
   */
  async sendReminder(
    taskId: string,
    type: Reminder['type'],
    recipientId: string,
    recipientType: Reminder['recipientType']
  ): Promise<string> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const reminderId = `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    let message = '';
    switch (type) {
      case 'deadline':
        message = `Task "${task.title}" is due in 24 hours. Please ensure completion.`;
        break;
      case 'milestone':
        message = `Milestone for task "${task.title}" is approaching. Please check progress.`;
        break;
      case 'escalation':
        message = `Task "${task.title}" has been escalated due to overdue status.`;
        break;
      case 'checkin':
        message = `Please provide an update on task "${task.title}" progress.`;
        break;
    }

    const reminder: Reminder = {
      id: reminderId,
      taskId,
      type,
      message,
      sentAt: new Date(),
      recipientId,
      recipientType,
      status: 'pending',
    };

    this.reminders.push(reminder);

    // Simulate sending reminder (in real implementation, this would send email/SMS)
    await this.deliverReminder(reminder);

    console.log(
      `📧 SchedulerAgent: Sent ${type} reminder for task "${task.title}" to ${recipientType}`
    );

    return reminderId;
  }

  /**
   * Escalate overdue or problematic tasks
   */
  async escalateTask(
    taskId: string,
    reason: Escalation['reason'],
    escalatedTo: string
  ): Promise<string> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const escalationId = `escalation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const escalation: Escalation = {
      id: escalationId,
      taskId,
      reason,
      escalatedAt: new Date(),
      escalatedTo,
      status: 'open',
      description: `Task "${task.title}" escalated due to ${reason}`,
      actions: [],
    };

    this.escalations.push(escalation);

    // Update task status to overdue if not already
    if (task.status !== 'overdue') {
      await this.updateTaskStatus(taskId, 'overdue');
    }

    // Send escalation notification
    await this.sendReminder(taskId, 'escalation', escalatedTo, 'admin');

    console.log(`🚨 SchedulerAgent: Escalated task "${task.title}" due to ${reason}`);

    return escalationId;
  }

  /**
   * Get timezone-aware working hours for a location
   */
  getWorkingHours(timezone: string): TimezoneInfo['workingHours'] | null {
    const tzInfo = this.timezones.get(timezone);
    return tzInfo ? tzInfo.workingHours : null;
  }

  /**
   * Check if it's currently working hours in a timezone
   */
  isWorkingHours(timezone: string): boolean {
    const tzInfo = this.timezones.get(timezone);
    if (!tzInfo) return false;

    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    return (
      tzInfo.workingHours.days.includes(currentDay) &&
      currentHour >= tzInfo.workingHours.start &&
      currentHour < tzInfo.workingHours.end
    );
  }

  /**
   * Get tasks due today for a developer
   */
  async getTasksDueToday(developerId: string): Promise<Task[]> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return Array.from(this.tasks.values()).filter(
      task =>
        task.developerId === developerId &&
        task.deadline >= today &&
        task.deadline < tomorrow &&
        task.status !== 'completed'
    );
  }

  /**
   * Get overdue tasks that need escalation
   */
  async getTasksNeedingEscalation(): Promise<Task[]> {
    const now = new Date();
    const overdueThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    return Array.from(this.tasks.values()).filter(
      task =>
        task.deadline < overdueThreshold &&
        task.status !== 'completed' &&
        !this.escalations.some(e => e.taskId === task.id && e.status === 'open')
    );
  }

  // Private helper methods

  private async setupTaskReminders(task: Task): Promise<void> {
    // Reminder 1 week before deadline
    const weekBefore = new Date(task.deadline.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (weekBefore > new Date()) {
      await this.scheduleReminder({
        taskId: task.id,
        type: 'deadline',
        message: `Task "${task.title}" is due in 1 week`,
        recipientId: task.developerId,
        recipientType: 'developer',
      });
    }

    // Reminder 24 hours before deadline
    const dayBefore = new Date(task.deadline.getTime() - 24 * 60 * 60 * 1000);
    if (dayBefore > new Date()) {
      await this.scheduleReminder({
        taskId: task.id,
        type: 'deadline',
        message: `Task "${task.title}" is due tomorrow`,
        recipientId: task.developerId,
        recipientType: 'developer',
      });
    }
  }

  private async handleTaskStarted(task: Task): Promise<void> {
    // Send notification to client
    await this.sendReminder(task.id, 'checkin', task.clientId, 'client');
  }

  private async handleTaskCompleted(task: Task): Promise<void> {
    // Mark all reminders as acknowledged
    this.reminders.filter(r => r.taskId === task.id).forEach(r => (r.status = 'acknowledged'));

    // Close any open escalations
    this.escalations
      .filter(e => e.taskId === task.id && e.status === 'open')
      .forEach(e => (e.status = 'resolved'));

    console.log(`🎉 SchedulerAgent: Task "${task.title}" completed successfully`);
  }

  private async handleTaskOverdue(task: Task): Promise<void> {
    // Auto-escalate if overdue for more than 24 hours
    const overdueHours = (new Date().getTime() - task.deadline.getTime()) / (1000 * 60 * 60);

    if (overdueHours > 24) {
      await this.escalateTask(task.id, 'overdue', 'admin_system');
    }
  }

  private async scheduleReminder(
    reminderData: Omit<Reminder, 'id' | 'sentAt' | 'status'>
  ): Promise<void> {
    const reminderId = `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const reminder: Reminder = {
      ...reminderData,
      id: reminderId,
      sentAt: new Date(),
      status: 'pending',
    };

    this.reminders.push(reminder);
  }

  private async deliverReminder(reminder: Reminder): Promise<void> {
    // Simulate delivery delay
    await new Promise(resolve => setTimeout(resolve, 100));

    reminder.status = 'sent';

    // In real implementation, this would:
    // - Send email via SMTP
    // - Send SMS via Twilio
    // - Send push notification
    // - Update in-app notifications
  }

  private initializeTimezones(): void {
    // Initialize common timezones with working hours
    const timezoneData: [string, TimezoneInfo][] = [
      [
        'Asia/Karachi',
        {
          timezone: 'Asia/Karachi',
          offset: 5,
          currentTime: new Date(),
          workingHours: { start: 9, end: 18, days: [1, 2, 3, 4, 5] }, // Mon-Fri 9AM-6PM
        },
      ],
      [
        'America/New_York',
        {
          timezone: 'America/New_York',
          offset: -5,
          currentTime: new Date(),
          workingHours: { start: 9, end: 17, days: [1, 2, 3, 4, 5] }, // Mon-Fri 9AM-5PM
        },
      ],
      [
        'Europe/London',
        {
          timezone: 'Europe/London',
          offset: 0,
          currentTime: new Date(),
          workingHours: { start: 9, end: 17, days: [1, 2, 3, 4, 5] }, // Mon-Fri 9AM-5PM
        },
      ],
    ];

    timezoneData.forEach(([tz, info]) => {
      this.timezones.set(tz, info);
    });
  }

  private startScheduler(): void {
    // Run scheduler every 15 minutes
    setInterval(
      async () => {
        await this.runScheduledChecks();
      },
      15 * 60 * 1000
    );

    console.log('⏰ SchedulerAgent: Started automated checks every 15 minutes');
  }

  private async runScheduledChecks(): Promise<void> {
    console.log('🔍 SchedulerAgent: Running scheduled checks...');

    // Check for overdue tasks
    const overdueTasks = await this.getTasksNeedingEscalation();
    for (const task of overdueTasks) {
      await this.escalateTask(task.id, 'overdue', 'admin_system');
    }

    // Check for tasks due soon
    const attentionTasks = await this.getTasksNeedingAttention();
    for (const task of attentionTasks) {
      const hoursUntilDeadline =
        (task.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60);

      if (hoursUntilDeadline <= 24 && hoursUntilDeadline > 0) {
        await this.sendReminder(task.id, 'deadline', task.developerId, 'developer');
      }
    }

    console.log(
      `✅ SchedulerAgent: Completed checks. ${overdueTasks.length} overdue, ${attentionTasks.length} need attention`
    );
  }
}

export default SchedulerAgent;
