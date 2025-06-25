/**
 * FraudWatchAgent - Detect fake profiles, multi-accounting, spam tasks, stolen code
 *
 * Purpose: Protects the SOT system from fraud by:
 * - Detecting fake profiles and multi-accounting
 * - Identifying spam tasks and malicious content
 * - Detecting stolen or plagiarized code
 * - Monitoring behavioral patterns
 * - Flagging suspicious activities for human review
 *
 * @author EHB AI System
 * @version 1.0.0
 */

export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  name: string;
  ipAddresses: string[];
  deviceFingerprints: string[];
  voicePatterns?: string[];
  facePatterns?: string[];
  registrationDate: Date;
  lastActive: Date;
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  verified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  location: string;
  timezone: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: 'login' | 'task_create' | 'task_submit' | 'code_upload' | 'payment' | 'withdrawal';
  timestamp: Date;
  ipAddress: string;
  deviceFingerprint: string;
  userAgent: string;
  location: string;
  details: Record<string, any>;
}

export interface FraudSignal {
  id: string;
  userId: string;
  type: 'multi_account' | 'fake_profile' | 'spam_content' | 'stolen_code' | 'suspicious_behavior';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number; // 0-100
  description: string;
  evidence: string[];
  detectedAt: Date;
  status: 'pending' | 'reviewed' | 'confirmed' | 'false_positive';
  reviewedBy?: string;
  reviewedAt?: Date;
  action: 'warning' | 'suspension' | 'ban' | 'none';
}

export interface CodeSubmission {
  id: string;
  userId: string;
  taskId: string;
  codeFiles: CodeFile[];
  submittedAt: Date;
  language: string;
  framework?: string;
}

export interface CodeFile {
  name: string;
  content: string;
  hash: string;
  size: number;
}

export interface BehavioralPattern {
  userId: string;
  loginPattern: {
    frequency: number; // logins per day
    timeDistribution: number[]; // hourly distribution
    locationConsistency: number; // 0-1
  };
  taskPattern: {
    creationRate: number; // tasks per day
    completionRate: number; // 0-1
    averageTaskSize: number; // estimated hours
  };
  codePattern: {
    similarityScore: number; // 0-1 with other users
    plagiarismRisk: number; // 0-1
    complexityDistribution: number[]; // complexity scores
  };
}

export class FraudWatchAgent {
  private userProfiles: Map<string, UserProfile> = new Map();
  private userActivities: UserActivity[] = [];
  private fraudSignals: FraudSignal[] = [];
  private behavioralPatterns: Map<string, BehavioralPattern> = new Map();
  private codeDatabase: Map<string, CodeFile[]> = new Map(); // For plagiarism detection

  constructor() {
    this.startMonitoring();
    console.log('🛡️ FraudWatchAgent initialized');
  }

  /**
   * Register new user activity for monitoring
   */
  async recordActivity(activity: Omit<UserActivity, 'id'>): Promise<string> {
    const activityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newActivity: UserActivity = {
      ...activity,
      id: activityId,
    };

    this.userActivities.push(newActivity);

    // Analyze activity for fraud signals
    await this.analyzeActivity(newActivity);

    console.log(
      `📊 FraudWatchAgent: Recorded ${activity.action} activity for user ${activity.userId}`
    );

    return activityId;
  }

  /**
   * Register new user profile
   */
  async registerUser(
    profile: Omit<UserProfile, 'id' | 'registrationDate' | 'lastActive'>
  ): Promise<string> {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newProfile: UserProfile = {
      ...profile,
      id: userId,
      registrationDate: new Date(),
      lastActive: new Date(),
    };

    this.userProfiles.set(userId, newProfile);

    // Check for potential multi-accounting
    await this.checkMultiAccounting(newProfile);

    console.log(`👤 FraudWatchAgent: Registered user ${profile.name} (${profile.email})`);

    return userId;
  }

  /**
   * Analyze code submission for plagiarism and stolen code
   */
  async analyzeCodeSubmission(submission: CodeSubmission): Promise<{
    plagiarismRisk: number;
    stolenCodeRisk: number;
    suspiciousPatterns: string[];
    recommendations: string[];
  }> {
    console.log(`🔍 FraudWatchAgent: Analyzing code submission from user ${submission.userId}`);

    let plagiarismRisk = 0;
    let stolenCodeRisk = 0;
    const suspiciousPatterns: string[] = [];
    const recommendations: string[] = [];

    // Check each file for plagiarism
    for (const file of submission.codeFiles) {
      const fileAnalysis = await this.analyzeCodeFile(file, submission.userId);

      plagiarismRisk = Math.max(plagiarismRisk, fileAnalysis.plagiarismScore);
      stolenCodeRisk = Math.max(stolenCodeRisk, fileAnalysis.stolenCodeScore);

      if (fileAnalysis.suspiciousPatterns.length > 0) {
        suspiciousPatterns.push(...fileAnalysis.suspiciousPatterns);
      }
    }

    // Check for behavioral patterns
    const userPattern = this.behavioralPatterns.get(submission.userId);
    if (userPattern) {
      if (userPattern.codePattern.plagiarismRisk > 0.7) {
        suspiciousPatterns.push('User has history of code similarity issues');
        recommendations.push('Manual review recommended for this submission');
      }
    }

    // Generate fraud signal if risk is high
    if (plagiarismRisk > 0.8 || stolenCodeRisk > 0.8) {
      await this.createFraudSignal({
        userId: submission.userId,
        type: 'stolen_code',
        severity: plagiarismRisk > 0.9 ? 'critical' : 'high',
        confidence: Math.max(plagiarismRisk, stolenCodeRisk) * 100,
        description: `High plagiarism/stolen code risk detected in submission`,
        evidence: suspiciousPatterns,
        action: 'suspension',
      });
    }

    return {
      plagiarismRisk,
      stolenCodeRisk,
      suspiciousPatterns,
      recommendations,
    };
  }

  /**
   * Get fraud signals for a user
   */
  async getUserFraudSignals(userId: string): Promise<FraudSignal[]> {
    return this.fraudSignals.filter(signal => signal.userId === userId);
  }

  /**
   * Get all pending fraud signals for admin review
   */
  async getPendingFraudSignals(): Promise<FraudSignal[]> {
    return this.fraudSignals.filter(signal => signal.status === 'pending');
  }

  /**
   * Review and update fraud signal status
   */
  async reviewFraudSignal(
    signalId: string,
    status: FraudSignal['status'],
    reviewedBy: string,
    notes?: string
  ): Promise<void> {
    const signal = this.fraudSignals.find(s => s.id === signalId);
    if (!signal) {
      throw new Error(`Fraud signal ${signalId} not found`);
    }

    signal.status = status;
    signal.reviewedBy = reviewedBy;
    signal.reviewedAt = new Date();

    if (notes) {
      signal.description += ` | Review Notes: ${notes}`;
    }

    // Take action based on signal
    if (signal.action !== 'none') {
      await this.executeFraudAction(signal);
    }

    console.log(`✅ FraudWatchAgent: Fraud signal ${signalId} reviewed as ${status}`);
  }

  /**
   * Get user risk score
   */
  async getUserRiskScore(userId: string): Promise<{
    overallRisk: number; // 0-100
    riskFactors: string[];
    recommendations: string[];
  }> {
    const userSignals = await this.getUserFraudSignals(userId);
    const userProfile = this.userProfiles.get(userId);
    const userPattern = this.behavioralPatterns.get(userId);

    let overallRisk = 0;
    const riskFactors: string[] = [];
    const recommendations: string[] = [];

    // Calculate risk based on fraud signals
    const criticalSignals = userSignals.filter(s => s.severity === 'critical').length;
    const highSignals = userSignals.filter(s => s.severity === 'high').length;
    const mediumSignals = userSignals.filter(s => s.severity === 'medium').length;

    overallRisk += criticalSignals * 30;
    overallRisk += highSignals * 15;
    overallRisk += mediumSignals * 5;

    if (criticalSignals > 0) {
      riskFactors.push(`${criticalSignals} critical fraud signals`);
      recommendations.push('Immediate account suspension recommended');
    }

    if (highSignals > 2) {
      riskFactors.push(`${highSignals} high-severity fraud signals`);
      recommendations.push('Enhanced monitoring required');
    }

    // Check profile verification
    if (userProfile && !userProfile.verified) {
      overallRisk += 10;
      riskFactors.push('Unverified profile');
      recommendations.push('Complete KYC verification');
    }

    // Check behavioral patterns
    if (userPattern) {
      if (userPattern.loginPattern.locationConsistency < 0.5) {
        overallRisk += 15;
        riskFactors.push('Inconsistent login locations');
        recommendations.push('Enable 2FA and location verification');
      }

      if (userPattern.taskPattern.completionRate < 0.3) {
        overallRisk += 10;
        riskFactors.push('Low task completion rate');
        recommendations.push('Review task quality and commitment');
      }
    }

    return {
      overallRisk: Math.min(100, overallRisk),
      riskFactors,
      recommendations,
    };
  }

  /**
   * Update user profile (e.g., after KYC verification)
   */
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      throw new Error(`User profile ${userId} not found`);
    }

    Object.assign(profile, updates);
    profile.lastActive = new Date();

    // Re-analyze for fraud signals after profile update
    await this.reanalyzeUser(userId);

    console.log(`📝 FraudWatchAgent: Updated profile for user ${userId}`);
  }

  // Private helper methods

  private async analyzeActivity(activity: UserActivity): Promise<void> {
    const userProfile = this.userProfiles.get(activity.userId);
    if (!userProfile) return;

    // Update user's IP addresses and device fingerprints
    if (!userProfile.ipAddresses.includes(activity.ipAddress)) {
      userProfile.ipAddresses.push(activity.ipAddress);
    }
    if (!userProfile.deviceFingerprints.includes(activity.deviceFingerprint)) {
      userProfile.deviceFingerprints.push(activity.deviceFingerprint);
    }

    // Check for suspicious patterns
    await this.checkSuspiciousBehavior(activity, userProfile);

    // Update behavioral patterns
    await this.updateBehavioralPattern(activity);
  }

  private async checkMultiAccounting(newProfile: UserProfile): Promise<void> {
    const suspiciousUsers: UserProfile[] = [];

    // Check for email similarity
    for (const profile of this.userProfiles.values()) {
      if (profile.id === newProfile.id) continue;

      // Check email patterns
      if (this.isSimilarEmail(newProfile.email, profile.email)) {
        suspiciousUsers.push(profile);
      }

      // Check IP address overlap
      const commonIPs = newProfile.ipAddresses.filter(ip => profile.ipAddresses.includes(ip));
      if (commonIPs.length > 0) {
        suspiciousUsers.push(profile);
      }

      // Check device fingerprint overlap
      const commonDevices = newProfile.deviceFingerprints.filter(device =>
        profile.deviceFingerprints.includes(device)
      );
      if (commonDevices.length > 0) {
        suspiciousUsers.push(profile);
      }
    }

    if (suspiciousUsers.length > 0) {
      await this.createFraudSignal({
        userId: newProfile.id,
        type: 'multi_account',
        severity: suspiciousUsers.length > 2 ? 'high' : 'medium',
        confidence: Math.min(90, suspiciousUsers.length * 30),
        description: `Potential multi-accounting detected. Similar to ${suspiciousUsers.length} other accounts`,
        evidence: suspiciousUsers.map(u => `Similar to ${u.email} (${u.id})`),
        action: 'warning',
      });
    }
  }

  private async checkSuspiciousBehavior(
    activity: UserActivity,
    profile: UserProfile
  ): Promise<void> {
    // Check for rapid-fire actions
    const recentActivities = this.userActivities.filter(
      a => a.userId === activity.userId && a.timestamp > new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
    );

    if (recentActivities.length > 20) {
      await this.createFraudSignal({
        userId: activity.userId,
        type: 'suspicious_behavior',
        severity: 'high',
        confidence: 85,
        description: 'Unusually high activity rate detected',
        evidence: [`${recentActivities.length} actions in 5 minutes`],
        action: 'suspension',
      });
    }

    // Check for location inconsistencies
    if (profile.location && activity.location) {
      const distance = this.calculateDistance(profile.location, activity.location);
      if (distance > 1000) {
        // More than 1000km in short time
        await this.createFraudSignal({
          userId: activity.userId,
          type: 'suspicious_behavior',
          severity: 'medium',
          confidence: 70,
          description: 'Unusual location change detected',
          evidence: [`From ${profile.location} to ${activity.location} (${distance}km)`],
          action: 'warning',
        });
      }
    }
  }

  private async updateBehavioralPattern(activity: UserActivity): Promise<void> {
    let pattern = this.behavioralPatterns.get(activity.userId);
    if (!pattern) {
      pattern = {
        userId: activity.userId,
        loginPattern: {
          frequency: 0,
          timeDistribution: new Array(24).fill(0),
          locationConsistency: 1,
        },
        taskPattern: { creationRate: 0, completionRate: 1, averageTaskSize: 0 },
        codePattern: { similarityScore: 0, plagiarismRisk: 0, complexityDistribution: [] },
      };
      this.behavioralPatterns.set(activity.userId, pattern);
    }

    // Update login pattern
    if (activity.action === 'login') {
      const hour = activity.timestamp.getHours();
      pattern.loginPattern.timeDistribution[hour]++;
      pattern.loginPattern.frequency = this.calculateLoginFrequency(activity.userId);
    }

    // Update task pattern
    if (activity.action === 'task_create') {
      pattern.taskPattern.creationRate = this.calculateTaskCreationRate(activity.userId);
    }

    // Update location consistency
    pattern.loginPattern.locationConsistency = this.calculateLocationConsistency(activity.userId);
  }

  private async analyzeCodeFile(
    file: CodeFile,
    userId: string
  ): Promise<{
    plagiarismScore: number;
    stolenCodeScore: number;
    suspiciousPatterns: string[];
  }> {
    let plagiarismScore = 0;
    let stolenCodeScore = 0;
    const suspiciousPatterns: string[] = [];

    // Check against existing code database
    for (const [existingUserId, existingFiles] of this.codeDatabase.entries()) {
      if (existingUserId === userId) continue; // Skip own code

      for (const existingFile of existingFiles) {
        const similarity = this.calculateCodeSimilarity(file.content, existingFile.content);

        if (similarity > 0.8) {
          plagiarismScore = Math.max(plagiarismScore, similarity);
          suspiciousPatterns.push(
            `High similarity with ${existingUserId}'s code (${Math.round(similarity * 100)}%)`
          );
        }
      }
    }

    // Check for common code patterns that might indicate stolen code
    const stolenCodeIndicators = this.detectStolenCodeIndicators(file.content);
    if (stolenCodeIndicators.length > 0) {
      stolenCodeScore = Math.min(0.9, stolenCodeIndicators.length * 0.2);
      suspiciousPatterns.push(...stolenCodeIndicators);
    }

    // Add to code database for future comparisons
    if (!this.codeDatabase.has(userId)) {
      this.codeDatabase.set(userId, []);
    }
    this.codeDatabase.get(userId)!.push(file);

    return {
      plagiarismScore,
      stolenCodeScore,
      suspiciousPatterns,
    };
  }

  private async createFraudSignal(
    signalData: Omit<FraudSignal, 'id' | 'detectedAt' | 'status'>
  ): Promise<string> {
    const signalId = `fraud_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const signal: FraudSignal = {
      ...signalData,
      id: signalId,
      detectedAt: new Date(),
      status: 'pending',
    };

    this.fraudSignals.push(signal);

    console.log(
      `🚨 FraudWatchAgent: Created fraud signal ${signalId} for user ${signalData.userId}`
    );

    return signalId;
  }

  private async executeFraudAction(signal: FraudSignal): Promise<void> {
    const userProfile = this.userProfiles.get(signal.userId);
    if (!userProfile) return;

    switch (signal.action) {
      case 'warning':
        // Send warning email/notification
        console.log(`⚠️ FraudWatchAgent: Warning sent to user ${signal.userId}`);
        break;

      case 'suspension':
        // Suspend account temporarily
        userProfile.sqlLevel = 'Free';
        console.log(`⏸️ FraudWatchAgent: User ${signal.userId} suspended`);
        break;

      case 'ban':
        // Ban account permanently
        userProfile.sqlLevel = 'Free';
        userProfile.verified = false;
        console.log(`🚫 FraudWatchAgent: User ${signal.userId} banned`);
        break;
    }
  }

  private async reanalyzeUser(userId: string): Promise<void> {
    // Re-analyze user's recent activities for fraud signals
    const recentActivities = this.userActivities.filter(
      a => a.userId === userId && a.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
    );

    for (const activity of recentActivities) {
      await this.analyzeActivity(activity);
    }
  }

  // Utility methods

  private isSimilarEmail(email1: string, email2: string): boolean {
    const [local1, domain1] = email1.split('@');
    const [local2, domain2] = email2.split('@');

    // Check for similar local parts
    if (this.calculateStringSimilarity(local1, local2) > 0.7) {
      return true;
    }

    // Check for common email patterns
    const patterns = [
      /^([a-zA-Z0-9]+)(\d+)$/, // username123
      /^([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)$/, // first.last
      /^([a-zA-Z0-9]+)_([a-zA-Z0-9]+)$/, // first_last
    ];

    for (const pattern of patterns) {
      const match1 = local1.match(pattern);
      const match2 = local2.match(pattern);

      if (match1 && match2 && match1[1] === match2[1]) {
        return true;
      }
    }

    return false;
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  private calculateDistance(location1: string, location2: string): number {
    // Simplified distance calculation (in real implementation, use geocoding API)
    // This is a placeholder that returns a random distance
    return Math.random() * 2000;
  }

  private calculateLoginFrequency(userId: string): number {
    const last24Hours = this.userActivities.filter(
      a =>
        a.userId === userId &&
        a.action === 'login' &&
        a.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;

    return last24Hours;
  }

  private calculateTaskCreationRate(userId: string): number {
    const last7Days = this.userActivities.filter(
      a =>
        a.userId === userId &&
        a.action === 'task_create' &&
        a.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    return last7Days / 7; // tasks per day
  }

  private calculateLocationConsistency(userId: string): number {
    const recentLogins = this.userActivities.filter(
      a =>
        a.userId === userId &&
        a.action === 'login' &&
        a.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    if (recentLogins.length < 2) return 1.0;

    const locations = [...new Set(recentLogins.map(a => a.location))];
    return 1 - (locations.length - 1) / recentLogins.length;
  }

  private calculateCodeSimilarity(code1: string, code2: string): number {
    // Simplified code similarity calculation
    // In real implementation, use more sophisticated algorithms like:
    // - Abstract Syntax Tree comparison
    // - Token-based similarity
    // - Semantic analysis

    const tokens1 = this.tokenizeCode(code1);
    const tokens2 = this.tokenizeCode(code2);

    const commonTokens = tokens1.filter(token => tokens2.includes(token));
    return commonTokens.length / Math.max(tokens1.length, tokens2.length);
  }

  private tokenizeCode(code: string): string[] {
    // Simplified tokenization
    return code
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2);
  }

  private detectStolenCodeIndicators(code: string): string[] {
    const indicators: string[] = [];

    // Check for hardcoded credentials
    if (code.includes('password') && code.includes('=')) {
      indicators.push('Hardcoded credentials detected');
    }

    // Check for suspicious comments
    const suspiciousComments = [
      'stolen from',
      'copied from',
      'found on github',
      'stackoverflow',
      'tutorial',
    ];

    suspiciousComments.forEach(comment => {
      if (code.toLowerCase().includes(comment)) {
        indicators.push(`Suspicious comment: "${comment}"`);
      }
    });

    // Check for inconsistent coding style
    const styleInconsistencies = this.detectStyleInconsistencies(code);
    if (styleInconsistencies.length > 0) {
      indicators.push(...styleInconsistencies);
    }

    return indicators;
  }

  private detectStyleInconsistencies(code: string): string[] {
    const inconsistencies: string[] = [];

    // Check for mixed indentation
    const lines = code.split('\n');
    const hasTabs = lines.some(line => line.startsWith('\t'));
    const hasSpaces = lines.some(line => line.startsWith(' '));

    if (hasTabs && hasSpaces) {
      inconsistencies.push('Mixed indentation (tabs and spaces)');
    }

    // Check for inconsistent naming conventions
    const camelCase = /[a-z][a-zA-Z0-9]*/g;
    const snakeCase = /[a-z][a-z_0-9]*/g;
    const pascalCase = /[A-Z][a-zA-Z0-9]*/g;

    const camelMatches = code.match(camelCase) || [];
    const snakeMatches = code.match(snakeCase) || [];
    const pascalMatches = code.match(pascalCase) || [];

    if (camelMatches.length > 0 && snakeMatches.length > 0 && pascalMatches.length > 0) {
      inconsistencies.push('Mixed naming conventions detected');
    }

    return inconsistencies;
  }

  private startMonitoring(): void {
    // Run fraud detection every 30 minutes
    setInterval(
      async () => {
        await this.runFraudDetection();
      },
      30 * 60 * 1000
    );

    console.log('🛡️ FraudWatchAgent: Started automated monitoring every 30 minutes');
  }

  private async runFraudDetection(): Promise<void> {
    console.log('🔍 FraudWatchAgent: Running automated fraud detection...');

    // Check for users with high risk scores
    for (const [userId, profile] of this.userProfiles) {
      const riskScore = await this.getUserRiskScore(userId);

      if (riskScore.overallRisk > 70) {
        await this.createFraudSignal({
          userId,
          type: 'suspicious_behavior',
          severity: 'high',
          confidence: riskScore.overallRisk,
          description: `High risk score detected: ${riskScore.overallRisk}/100`,
          evidence: riskScore.riskFactors,
          action: 'suspension',
        });
      }
    }

    // Check for patterns across multiple users
    await this.detectSystemWidePatterns();

    console.log('✅ FraudWatchAgent: Completed automated fraud detection');
  }

  private async detectSystemWidePatterns(): Promise<void> {
    // Detect coordinated attacks or spam campaigns
    const recentActivities = this.userActivities.filter(
      a => a.timestamp > new Date(Date.now() - 60 * 60 * 1000) // Last hour
    );

    // Group by IP address
    const ipGroups = new Map<string, string[]>();
    recentActivities.forEach(activity => {
      if (!ipGroups.has(activity.ipAddress)) {
        ipGroups.set(activity.ipAddress, []);
      }
      ipGroups.get(activity.ipAddress)!.push(activity.userId);
    });

    // Check for IPs with multiple users (potential proxy/VPN abuse)
    for (const [ip, userIds] of ipGroups) {
      if (userIds.length > 5) {
        for (const userId of userIds) {
          await this.createFraudSignal({
            userId,
            type: 'suspicious_behavior',
            severity: 'medium',
            confidence: 75,
            description: `Multiple users from same IP address detected`,
            evidence: [`IP: ${ip}, Users: ${userIds.length}`],
            action: 'warning',
          });
        }
      }
    }
  }
}

export default FraudWatchAgent;
