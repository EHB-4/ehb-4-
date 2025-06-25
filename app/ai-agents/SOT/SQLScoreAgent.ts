/**
 * SQLScoreAgent - Maintain and update SQL levels of all users and companies
 *
 * Purpose: Manages SQL (Service Quality Level) scoring system by:
 * - Calculating SQL scores based on KYC, task history, feedback, skills
 * - Handling SQL upgrades and downgrades
 * - Logging all SQL changes on blockchain
 * - Integrating with PSS, EMO, EDR departments
 * - Managing bonus and penalty systems
 *
 * @author EHB AI System
 * @version 1.0.0
 */

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  currentSQL: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  sqlScore: number; // 0-1000
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycScore: number; // 0-100
  taskHistory: TaskRecord[];
  feedbackHistory: FeedbackRecord[];
  skillTests: SkillTestRecord[];
  walletBalance: number; // EHBGC
  lockedCoins: number; // EHBGC
  registrationDate: Date;
  lastActivity: Date;
  location: string;
  verified: boolean;
  fraudFlags: number;
  bonusPoints: number;
  penaltyPoints: number;
}

export interface TaskRecord {
  id: string;
  taskId: string;
  taskType: 'development' | 'design' | 'content' | 'support' | 'validation';
  status: 'completed' | 'failed' | 'cancelled';
  rating: number; // 1-5
  completedAt: Date;
  earnings: number; // EHBGC
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  clientFeedback?: string;
}

export interface FeedbackRecord {
  id: string;
  fromUserId: string;
  rating: number; // 1-5
  comment: string;
  category: 'communication' | 'quality' | 'timeliness' | 'professionalism';
  submittedAt: Date;
  verified: boolean;
}

export interface SkillTestRecord {
  id: string;
  testType: 'technical' | 'communication' | 'problem_solving' | 'domain_knowledge';
  score: number; // 0-100
  passed: boolean;
  takenAt: Date;
  expiresAt: Date;
  retakeCount: number;
}

export interface SQLChangeLog {
  id: string;
  userId: string;
  oldSQL: UserProfile['currentSQL'];
  newSQL: UserProfile['currentSQL'];
  oldScore: number;
  newScore: number;
  reason: string;
  triggeredBy: 'system' | 'admin' | 'user_request' | 'automatic';
  timestamp: Date;
  blockchainTxHash?: string;
  details: Record<string, any>;
}

export interface SQLCriteria {
  level: UserProfile['currentSQL'];
  minScore: number;
  maxScore: number;
  requirements: {
    kycVerified: boolean;
    minTasks: number;
    minRating: number;
    minWalletBalance: number;
    minLockedCoins: number;
    maxFraudFlags: number;
    skillTests: string[];
  };
  benefits: {
    maxEarnings: number;
    prioritySupport: boolean;
    advancedFeatures: boolean;
    referralBonus: number;
  };
}

export class SQLScoreAgent {
  private userProfiles: Map<string, UserProfile> = new Map();
  private sqlChangeLogs: SQLChangeLog[] = [];
  private sqlCriteria: Map<UserProfile['currentSQL'], SQLCriteria> = new Map();

  constructor() {
    this.initializeSQLCriteria();
    this.startPeriodicScoring();
    console.log('📊 SQLScoreAgent initialized');
  }

  /**
   * Calculate and update SQL score for a user
   */
  async calculateSQLScore(userId: string): Promise<{
    newScore: number;
    newSQL: UserProfile['currentSQL'];
    changes: string[];
    recommendations: string[];
  }> {
    console.log(`📊 SQLScoreAgent: Calculating SQL score for user ${userId}`);

    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    let newScore = 0;
    const changes: string[] = [];
    const recommendations: string[] = [];

    // Base score from KYC verification
    if (user.kycStatus === 'verified') {
      newScore += user.kycScore * 2; // KYC score weighted heavily
      changes.push(`KYC verified: +${user.kycScore * 2} points`);
    } else {
      recommendations.push('Complete KYC verification to boost SQL score');
    }

    // Task completion history
    const completedTasks = user.taskHistory.filter(t => t.status === 'completed');
    const totalEarnings = completedTasks.reduce((sum, task) => sum + task.earnings, 0);
    const averageRating =
      completedTasks.length > 0
        ? completedTasks.reduce((sum, task) => sum + task.rating, 0) / completedTasks.length
        : 0;

    newScore += completedTasks.length * 5; // 5 points per completed task
    newScore += totalEarnings * 0.1; // 0.1 points per EHBGC earned
    newScore += averageRating * 10; // 10 points per average rating point

    changes.push(`Completed tasks: +${completedTasks.length * 5} points`);
    changes.push(`Total earnings: +${totalEarnings * 0.1} points`);
    changes.push(`Average rating: +${averageRating * 10} points`);

    // Skill test scores
    const passedTests = user.skillTests.filter(t => t.passed);
    const averageTestScore =
      passedTests.length > 0
        ? passedTests.reduce((sum, test) => sum + test.score, 0) / passedTests.length
        : 0;

    newScore += passedTests.length * 15; // 15 points per passed test
    newScore += averageTestScore * 0.5; // 0.5 points per test score point

    changes.push(`Passed skill tests: +${passedTests.length * 15} points`);
    changes.push(`Average test score: +${averageTestScore * 0.5} points`);

    // Wallet and locked coins
    newScore += user.walletBalance * 0.05; // 0.05 points per EHBGC in wallet
    newScore += user.lockedCoins * 0.1; // 0.1 points per locked EHBGC

    changes.push(`Wallet balance: +${user.walletBalance * 0.05} points`);
    changes.push(`Locked coins: +${user.lockedCoins * 0.1} points`);

    // Bonus points
    newScore += user.bonusPoints;
    if (user.bonusPoints > 0) {
      changes.push(`Bonus points: +${user.bonusPoints} points`);
    }

    // Penalty deductions
    newScore -= user.penaltyPoints;
    if (user.penaltyPoints > 0) {
      changes.push(`Penalty points: -${user.penaltyPoints} points`);
    }

    // Fraud flag deductions
    newScore -= user.fraudFlags * 50; // 50 points deduction per fraud flag
    if (user.fraudFlags > 0) {
      changes.push(`Fraud flags: -${user.fraudFlags * 50} points`);
      recommendations.push('Address fraud flags to improve SQL score');
    }

    // Activity bonus
    const daysSinceLastActivity =
      (new Date().getTime() - user.lastActivity.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastActivity <= 7) {
      newScore += 20; // Active user bonus
      changes.push('Recent activity: +20 points');
    } else if (daysSinceLastActivity > 30) {
      newScore -= 10; // Inactivity penalty
      changes.push('Inactivity penalty: -10 points');
      recommendations.push('Stay active to maintain SQL score');
    }

    // Ensure score is within bounds
    newScore = Math.max(0, Math.min(1000, newScore));

    // Determine new SQL level
    const newSQL = this.determineSQLLevel(newScore);

    // Update user profile
    user.sqlScore = newScore;
    user.currentSQL = newSQL;
    user.lastActivity = new Date();

    // Log the change if SQL level changed
    if (newSQL !== user.currentSQL) {
      await this.logSQLChange(
        userId,
        user.currentSQL,
        newSQL,
        user.sqlScore,
        newScore,
        'automatic'
      );
    }

    console.log(`✅ SQLScoreAgent: Updated SQL score for user ${userId}: ${newScore} (${newSQL})`);

    return {
      newScore,
      newSQL,
      changes,
      recommendations,
    };
  }

  /**
   * Add task completion record
   */
  async addTaskCompletion(userId: string, taskRecord: Omit<TaskRecord, 'id'>): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const task: TaskRecord = {
      ...taskRecord,
      id: taskId,
    };

    user.taskHistory.push(task);

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(`📝 SQLScoreAgent: Added task completion for user ${userId}`);
  }

  /**
   * Add feedback record
   */
  async addFeedback(userId: string, feedbackRecord: Omit<FeedbackRecord, 'id'>): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const feedback: FeedbackRecord = {
      ...feedbackRecord,
      id: feedbackId,
    };

    user.feedbackHistory.push(feedback);

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(`📝 SQLScoreAgent: Added feedback for user ${userId}`);
  }

  /**
   * Add skill test result
   */
  async addSkillTestResult(userId: string, testRecord: Omit<SkillTestRecord, 'id'>): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const test: SkillTestRecord = {
      ...testRecord,
      id: testId,
    };

    user.skillTests.push(test);

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(`📝 SQLScoreAgent: Added skill test result for user ${userId}`);
  }

  /**
   * Update KYC status and score
   */
  async updateKYCStatus(
    userId: string,
    status: UserProfile['kycStatus'],
    score: number
  ): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    user.kycStatus = status;
    user.kycScore = score;

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(`📝 SQLScoreAgent: Updated KYC status for user ${userId}: ${status} (${score})`);
  }

  /**
   * Add bonus points
   */
  async addBonusPoints(userId: string, points: number, reason: string): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    user.bonusPoints += points;

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(`🎁 SQLScoreAgent: Added ${points} bonus points to user ${userId} for: ${reason}`);
  }

  /**
   * Add penalty points
   */
  async addPenaltyPoints(userId: string, points: number, reason: string): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    user.penaltyPoints += points;

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(
      `⚠️ SQLScoreAgent: Added ${points} penalty points to user ${userId} for: ${reason}`
    );
  }

  /**
   * Add fraud flag
   */
  async addFraudFlag(userId: string): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    user.fraudFlags += 1;

    // Recalculate SQL score
    await this.calculateSQLScore(userId);

    console.log(`🚨 SQLScoreAgent: Added fraud flag to user ${userId}`);
  }

  /**
   * Get user SQL profile
   */
  async getUserSQLProfile(userId: string): Promise<UserProfile | null> {
    return this.userProfiles.get(userId) || null;
  }

  /**
   * Get SQL change history
   */
  async getSQLChangeHistory(userId: string): Promise<SQLChangeLog[]> {
    return this.sqlChangeLogs.filter(log => log.userId === userId);
  }

  /**
   * Get users by SQL level
   */
  async getUsersBySQLLevel(sqlLevel: UserProfile['currentSQL']): Promise<UserProfile[]> {
    return Array.from(this.userProfiles.values()).filter(user => user.currentSQL === sqlLevel);
  }

  /**
   * Get SQL criteria for a level
   */
  getSQLCriteria(sqlLevel: UserProfile['currentSQL']): SQLCriteria | null {
    return this.sqlCriteria.get(sqlLevel) || null;
  }

  /**
   * Check if user meets requirements for SQL upgrade
   */
  async checkUpgradeEligibility(
    userId: string,
    targetSQL: UserProfile['currentSQL']
  ): Promise<{
    eligible: boolean;
    missingRequirements: string[];
    currentScore: number;
    requiredScore: number;
  }> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const criteria = this.sqlCriteria.get(targetSQL);
    if (!criteria) {
      throw new Error(`SQL criteria for level ${targetSQL} not found`);
    }

    const missingRequirements: string[] = [];

    // Check KYC requirement
    if (criteria.requirements.kycVerified && user.kycStatus !== 'verified') {
      missingRequirements.push('KYC verification required');
    }

    // Check minimum tasks
    const completedTasks = user.taskHistory.filter(t => t.status === 'completed');
    if (completedTasks.length < criteria.requirements.minTasks) {
      missingRequirements.push(
        `Minimum ${criteria.requirements.minTasks} completed tasks required`
      );
    }

    // Check minimum rating
    const averageRating =
      completedTasks.length > 0
        ? completedTasks.reduce((sum, task) => sum + task.rating, 0) / completedTasks.length
        : 0;
    if (averageRating < criteria.requirements.minRating) {
      missingRequirements.push(
        `Minimum ${criteria.requirements.minRating} average rating required`
      );
    }

    // Check wallet balance
    if (user.walletBalance < criteria.requirements.minWalletBalance) {
      missingRequirements.push(
        `Minimum ${criteria.requirements.minWalletBalance} EHBGC wallet balance required`
      );
    }

    // Check locked coins
    if (user.lockedCoins < criteria.requirements.minLockedCoins) {
      missingRequirements.push(
        `Minimum ${criteria.requirements.minLockedCoins} EHBGC locked coins required`
      );
    }

    // Check fraud flags
    if (user.fraudFlags > criteria.requirements.maxFraudFlags) {
      missingRequirements.push(
        `Maximum ${criteria.requirements.maxFraudFlags} fraud flags allowed`
      );
    }

    // Check skill tests
    const passedTests = user.skillTests.filter(t => t.passed);
    for (const requiredTest of criteria.requirements.skillTests) {
      if (!passedTests.some(test => test.testType === requiredTest)) {
        missingRequirements.push(`Skill test "${requiredTest}" required`);
      }
    }

    const eligible = missingRequirements.length === 0 && user.sqlScore >= criteria.minScore;

    return {
      eligible,
      missingRequirements,
      currentScore: user.sqlScore,
      requiredScore: criteria.minScore,
    };
  }

  /**
   * Manually upgrade/downgrade user SQL level (admin only)
   */
  async manualSQLChange(
    userId: string,
    newSQL: UserProfile['currentSQL'],
    reason: string,
    adminId: string
  ): Promise<void> {
    const user = this.userProfiles.get(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const oldSQL = user.currentSQL;
    const oldScore = user.sqlScore;

    // Update user SQL level
    user.currentSQL = newSQL;

    // Adjust score to match new level criteria
    const criteria = this.sqlCriteria.get(newSQL);
    if (criteria) {
      user.sqlScore = Math.max(criteria.minScore, user.sqlScore);
    }

    // Log the change
    await this.logSQLChange(userId, oldSQL, newSQL, oldScore, user.sqlScore, 'admin', {
      reason,
      adminId,
    });

    console.log(`👨‍💼 SQLScoreAgent: Manual SQL change for user ${userId}: ${oldSQL} → ${newSQL}`);
  }

  // Private helper methods

  private determineSQLLevel(score: number): UserProfile['currentSQL'] {
    if (score >= 800) return 'VIP';
    if (score >= 600) return 'High';
    if (score >= 400) return 'Normal';
    if (score >= 200) return 'Basic';
    return 'Free';
  }

  private async logSQLChange(
    userId: string,
    oldSQL: UserProfile['currentSQL'],
    newSQL: UserProfile['currentSQL'],
    oldScore: number,
    newScore: number,
    triggeredBy: SQLChangeLog['triggeredBy'],
    details?: Record<string, any>
  ): Promise<void> {
    const logId = `sql_change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const log: SQLChangeLog = {
      id: logId,
      userId,
      oldSQL,
      newSQL,
      oldScore,
      newScore,
      reason: this.generateChangeReason(oldSQL, newSQL, oldScore, newScore),
      triggeredBy,
      timestamp: new Date(),
      details: details || {},
    };

    this.sqlChangeLogs.push(log);

    // In real implementation, this would be logged to blockchain
    console.log(`📝 SQLScoreAgent: Logged SQL change ${logId} to blockchain`);
  }

  private generateChangeReason(
    oldSQL: UserProfile['currentSQL'],
    newSQL: UserProfile['currentSQL'],
    oldScore: number,
    newScore: number
  ): string {
    if (oldSQL === newSQL) {
      return 'Score updated within same level';
    }

    const isUpgrade = this.getSQLLevelOrder(newSQL) > this.getSQLLevelOrder(oldSQL);

    if (isUpgrade) {
      return `Upgraded to ${newSQL} due to improved performance and score increase (${oldScore} → ${newScore})`;
    } else {
      return `Downgraded to ${newSQL} due to performance issues and score decrease (${oldScore} → ${newScore})`;
    }
  }

  private getSQLLevelOrder(sql: UserProfile['currentSQL']): number {
    const order = { Free: 0, Basic: 1, Normal: 2, High: 3, VIP: 4 };
    return order[sql];
  }

  private initializeSQLCriteria(): void {
    // Free level
    this.sqlCriteria.set('Free', {
      level: 'Free',
      minScore: 0,
      maxScore: 199,
      requirements: {
        kycVerified: false,
        minTasks: 0,
        minRating: 0,
        minWalletBalance: 0,
        minLockedCoins: 0,
        maxFraudFlags: 10,
        skillTests: [],
      },
      benefits: {
        maxEarnings: 100,
        prioritySupport: false,
        advancedFeatures: false,
        referralBonus: 0,
      },
    });

    // Basic level
    this.sqlCriteria.set('Basic', {
      level: 'Basic',
      minScore: 200,
      maxScore: 399,
      requirements: {
        kycVerified: true,
        minTasks: 5,
        minRating: 3.5,
        minWalletBalance: 50,
        minLockedCoins: 25,
        maxFraudFlags: 5,
        skillTests: ['communication'],
      },
      benefits: {
        maxEarnings: 500,
        prioritySupport: false,
        advancedFeatures: false,
        referralBonus: 5,
      },
    });

    // Normal level
    this.sqlCriteria.set('Normal', {
      level: 'Normal',
      minScore: 400,
      maxScore: 599,
      requirements: {
        kycVerified: true,
        minTasks: 20,
        minRating: 4.0,
        minWalletBalance: 200,
        minLockedCoins: 100,
        maxFraudFlags: 2,
        skillTests: ['communication', 'problem_solving'],
      },
      benefits: {
        maxEarnings: 2000,
        prioritySupport: true,
        advancedFeatures: true,
        referralBonus: 10,
      },
    });

    // High level
    this.sqlCriteria.set('High', {
      level: 'High',
      minScore: 600,
      maxScore: 799,
      requirements: {
        kycVerified: true,
        minTasks: 50,
        minRating: 4.5,
        minWalletBalance: 500,
        minLockedCoins: 250,
        maxFraudFlags: 1,
        skillTests: ['communication', 'problem_solving', 'technical'],
      },
      benefits: {
        maxEarnings: 10000,
        prioritySupport: true,
        advancedFeatures: true,
        referralBonus: 15,
      },
    });

    // VIP level
    this.sqlCriteria.set('VIP', {
      level: 'VIP',
      minScore: 800,
      maxScore: 1000,
      requirements: {
        kycVerified: true,
        minTasks: 100,
        minRating: 4.8,
        minWalletBalance: 1000,
        minLockedCoins: 500,
        maxFraudFlags: 0,
        skillTests: ['communication', 'problem_solving', 'technical', 'domain_knowledge'],
      },
      benefits: {
        maxEarnings: 50000,
        prioritySupport: true,
        advancedFeatures: true,
        referralBonus: 20,
      },
    });
  }

  private startPeriodicScoring(): void {
    // Recalculate SQL scores every 24 hours
    setInterval(
      async () => {
        console.log('📊 SQLScoreAgent: Running periodic SQL score updates...');

        for (const [userId, user] of this.userProfiles) {
          try {
            await this.calculateSQLScore(userId);
          } catch (error) {
            console.error(`❌ SQLScoreAgent: Error updating SQL score for user ${userId}:`, error);
          }
        }

        console.log('✅ SQLScoreAgent: Completed periodic SQL score updates');
      },
      24 * 60 * 60 * 1000
    );

    console.log('📊 SQLScoreAgent: Started periodic scoring every 24 hours');
  }
}

export default SQLScoreAgent;
