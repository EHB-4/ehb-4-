// GoSellr AI Scoring Features Template
// Comprehensive AI scoring system for trust, risk, and fraud detection

// ========================================
// 1. AI SCORING FEATURE DEFINITIONS
// ========================================

export interface AIScoringFeatures {
  // User Profile Features
  userProfile: UserProfileFeatures;

  // Transaction History Features
  transactionHistory: TransactionHistoryFeatures;

  // Behavioral Features
  behavioral: BehavioralFeatures;

  // Financial Features
  financial: FinancialFeatures;

  // Device & Security Features
  deviceSecurity: DeviceSecurityFeatures;

  // Social & Network Features
  socialNetwork: SocialNetworkFeatures;

  // Geographic Features
  geographic: GeographicFeatures;

  // Temporal Features
  temporal: TemporalFeatures;

  // Product & Category Features
  productCategory: ProductCategoryFeatures;

  // Communication Features
  communication: CommunicationFeatures;

  // Risk Indicators
  riskIndicators: RiskIndicatorFeatures;

  // Blockchain Features
  blockchain: BlockchainFeatures;
}

// ========================================
// 2. USER PROFILE FEATURES
// ========================================

export interface UserProfileFeatures {
  // Account Information
  accountAge: number; // Days since account creation
  accountStatus: 'active' | 'suspended' | 'banned' | 'pending';
  verificationLevel: 'none' | 'basic' | 'verified' | 'premium';

  // Identity Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  kycVerified: boolean;
  kycLevel: 'none' | 'basic' | 'enhanced' | 'full';
  kycDocumentsSubmitted: number;
  kycApprovalTime: number; // Days to approve KYC

  // Profile Completeness
  profileCompleteness: number; // 0-100 percentage
  profilePictureUploaded: boolean;
  bioCompleted: boolean;
  addressVerified: boolean;

  // Account Activity
  lastLoginDate: Date;
  loginFrequency: number; // Logins per month
  sessionDuration: number; // Average session duration in minutes
  passwordChangeFrequency: number; // Days between password changes

  // Account Security
  twoFactorEnabled: boolean;
  securityQuestionsSet: boolean;
  backupEmailSet: boolean;
  accountLockoutHistory: number; // Number of times account was locked
}

// ========================================
// 3. TRANSACTION HISTORY FEATURES
// ========================================

export interface TransactionHistoryFeatures {
  // Overall Transaction Stats
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  cancelledTransactions: number;
  pendingTransactions: number;

  // Success Rates
  successRate: number; // 0-1 percentage
  failureRate: number; // 0-1 percentage
  cancellationRate: number; // 0-1 percentage

  // Transaction Values
  totalSpent: number;
  totalReceived: number;
  averageTransactionValue: number;
  medianTransactionValue: number;
  largestTransactionValue: number;
  smallestTransactionValue: number;

  // Transaction Frequency
  transactionsPerMonth: number;
  transactionsPerWeek: number;
  transactionsPerDay: number;
  averageDaysBetweenTransactions: number;

  // Transaction Types
  purchaseTransactions: number;
  saleTransactions: number;
  refundTransactions: number;
  disputeTransactions: number;

  // Recent Activity
  transactionsLast7Days: number;
  transactionsLast30Days: number;
  transactionsLast90Days: number;
  transactionsLastYear: number;

  // Transaction Patterns
  transactionTimePattern: 'regular' | 'irregular' | 'seasonal' | 'random';
  transactionValuePattern: 'consistent' | 'variable' | 'increasing' | 'decreasing';
  transactionCategoryPattern: 'diverse' | 'focused' | 'random';
}

// ========================================
// 4. BEHAVIORAL FEATURES
// ========================================

export interface BehavioralFeatures {
  // Browsing Behavior
  pagesViewedPerSession: number;
  averageTimeOnPage: number; // Seconds
  bounceRate: number; // 0-1 percentage
  sessionDepth: number; // Number of pages per session

  // Search Behavior
  searchQueriesPerSession: number;
  searchQueryLength: number; // Average characters
  searchRefinementRate: number; // 0-1 percentage
  searchToPurchaseRate: number; // 0-1 percentage

  // Purchase Behavior
  cartAbandonmentRate: number; // 0-1 percentage
  purchaseDecisionTime: number; // Minutes from cart to purchase
  impulsePurchaseRate: number; // 0-1 percentage
  repeatPurchaseRate: number; // 0-1 percentage

  // Product Interaction
  productViewsPerSession: number;
  productComparisonRate: number; // 0-1 percentage
  wishlistAddRate: number; // 0-1 percentage
  reviewSubmissionRate: number; // 0-1 percentage

  // Communication Behavior
  messageResponseTime: number; // Average hours
  messageLength: number; // Average characters
  communicationFrequency: number; // Messages per day
  communicationQuality: 'poor' | 'fair' | 'good' | 'excellent';

  // Platform Usage
  mobileUsageRate: number; // 0-1 percentage
  desktopUsageRate: number; // 0-1 percentage
  appUsageRate: number; // 0-1 percentage
  webUsageRate: number; // 0-1 percentage
}

// ========================================
// 5. FINANCIAL FEATURES
// ========================================

export interface FinancialFeatures {
  // Payment Methods
  paymentMethodsUsed: string[]; // ['credit_card', 'paypal', 'crypto', etc.]
  primaryPaymentMethod: string;
  paymentMethodDiversity: number; // Number of different payment methods

  // Payment Success
  paymentSuccessRate: number; // 0-1 percentage
  paymentFailureRate: number; // 0-1 percentage
  averagePaymentProcessingTime: number; // Minutes

  // Chargeback & Disputes
  chargebackRate: number; // 0-1 percentage
  disputeRate: number; // 0-1 percentage
  chargebackAmount: number;
  disputeAmount: number;
  chargebackResolutionTime: number; // Days

  // Credit & Risk
  creditScore: number; // If available
  creditUtilization: number; // 0-1 percentage
  paymentHistory: 'excellent' | 'good' | 'fair' | 'poor';
  debtToIncomeRatio: number; // If available

  // Crypto Transactions
  cryptoTransactions: number;
  cryptoTransactionValue: number;
  cryptoWalletAge: number; // Days
  cryptoTransactionFrequency: number;

  // Bank Account
  bankAccountAge: number; // Days
  bankAccountVerified: boolean;
  bankTransactionHistory: number; // Number of transactions
  bankBalanceStability: 'stable' | 'variable' | 'unstable';
}

// ========================================
// 6. DEVICE & SECURITY FEATURES
// ========================================

export interface DeviceSecurityFeatures {
  // Device Information
  deviceFingerprint: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  operatingSystem: string;
  browser: string;
  browserVersion: string;

  // Device History
  devicesUsed: number; // Number of different devices
  primaryDevice: string;
  deviceConsistency: number; // 0-1 percentage of sessions from same device

  // IP Information
  ipAddress: string;
  ipCountry: string;
  ipCity: string;
  ipConsistency: number; // 0-1 percentage of sessions from same IP
  vpnUsage: boolean;
  proxyUsage: boolean;

  // Security Events
  failedLoginAttempts: number;
  suspiciousLoginAttempts: number;
  accountTakeoverAttempts: number;
  securityAlerts: number;

  // Session Security
  sessionHijackingAttempts: number;
  crossSiteScriptingAttempts: number;
  sqlInjectionAttempts: number;
  bruteForceAttempts: number;

  // Authentication
  multiFactorAuthentication: boolean;
  biometricAuthentication: boolean;
  passwordStrength: 'weak' | 'medium' | 'strong' | 'very_strong';
  lastPasswordChange: Date;
}

// ========================================
// 7. SOCIAL & NETWORK FEATURES
// ========================================

export interface SocialNetworkFeatures {
  // Social Connections
  socialConnections: number;
  verifiedConnections: number;
  connectionQuality: 'low' | 'medium' | 'high';

  // Social Proof
  reviewsReceived: number;
  reviewsGiven: number;
  averageRating: number; // 1-5 stars
  reviewResponseRate: number; // 0-1 percentage

  // Reputation
  reputationScore: number; // 0-100
  trustScore: number; // 0-100
  reliabilityScore: number; // 0-100

  // Network Analysis
  networkDensity: number; // 0-1 percentage
  networkCentrality: number; // 0-1 percentage
  networkInfluence: number; // 0-1 percentage

  // Social Activity
  socialPosts: number;
  socialEngagement: number; // Likes, comments, shares
  socialInfluence: number; // Followers, reach
  socialSentiment: 'positive' | 'neutral' | 'negative';

  // Referral Network
  referralsGiven: number;
  referralsReceived: number;
  referralSuccessRate: number; // 0-1 percentage
  referralNetworkSize: number;
}

// ========================================
// 8. GEOGRAPHIC FEATURES
// ========================================

export interface GeographicFeatures {
  // Location Information
  primaryLocation: {
    country: string;
    state: string;
    city: string;
    latitude: number;
    longitude: number;
  };

  // Location Consistency
  locationConsistency: number; // 0-1 percentage
  locationChanges: number; // Number of location changes
  locationChangeFrequency: number; // Changes per month

  // Geographic Risk
  highRiskCountry: boolean;
  sanctionedCountry: boolean;
  embargoedCountry: boolean;
  geographicRiskScore: number; // 0-100

  // Shipping Patterns
  shippingAddresses: number; // Number of different shipping addresses
  shippingAddressConsistency: number; // 0-1 percentage
  internationalShipping: boolean;
  shippingDistance: number; // Average distance in km

  // Travel Patterns
  travelFrequency: number; // Trips per year
  internationalTravel: boolean;
  travelConsistency: number; // 0-1 percentage
  travelRiskScore: number; // 0-100
}

// ========================================
// 9. TEMPORAL FEATURES
// ========================================

export interface TemporalFeatures {
  // Time Patterns
  activityTimePattern: 'day' | 'night' | 'mixed' | 'irregular';
  peakActivityHours: number[]; // Hours of peak activity
  activityConsistency: number; // 0-1 percentage

  // Seasonal Patterns
  seasonalActivity: boolean;
  seasonalPeaks: string[]; // ['christmas', 'black_friday', etc.]
  seasonalConsistency: number; // 0-1 percentage

  // Weekly Patterns
  weekdayActivity: number; // 0-1 percentage
  weekendActivity: number; // 0-1 percentage
  weeklyConsistency: number; // 0-1 percentage

  // Monthly Patterns
  monthlyActivityTrend: 'increasing' | 'decreasing' | 'stable' | 'variable';
  monthlyConsistency: number; // 0-1 percentage

  // Holiday Patterns
  holidayActivity: boolean;
  holidaySpending: number;
  holidayConsistency: number; // 0-1 percentage

  // Time Zone
  timeZone: string;
  timeZoneConsistency: number; // 0-1 percentage
  timeZoneChanges: number; // Number of time zone changes
}

// ========================================
// 10. PRODUCT & CATEGORY FEATURES
// ========================================

export interface ProductCategoryFeatures {
  // Product Preferences
  preferredCategories: string[];
  categoryDiversity: number; // Number of different categories
  categoryConsistency: number; // 0-1 percentage

  // Product Values
  averageProductValue: number;
  productValueRange: number; // Max - Min
  productValueConsistency: number; // 0-1 percentage

  // Product Types
  digitalProducts: number;
  physicalProducts: number;
  serviceProducts: number;
  productTypePreference: 'digital' | 'physical' | 'service' | 'mixed';

  // Product Risk
  highRiskProducts: number; // Number of high-risk products
  restrictedProducts: number; // Number of restricted products
  productRiskScore: number; // 0-100

  // Brand Preferences
  preferredBrands: string[];
  brandLoyalty: number; // 0-1 percentage
  brandDiversity: number; // Number of different brands

  // Product Quality
  productQualityPreference: 'budget' | 'mid_range' | 'premium' | 'luxury';
  qualityConsistency: number; // 0-1 percentage
  returnRate: number; // 0-1 percentage
}

// ========================================
// 11. COMMUNICATION FEATURES
// ========================================

export interface CommunicationFeatures {
  // Message Patterns
  messageFrequency: number; // Messages per day
  messageLength: number; // Average characters
  messageResponseTime: number; // Average hours
  messageQuality: 'poor' | 'fair' | 'good' | 'excellent';

  // Communication Channels
  preferredChannels: string[]; // ['email', 'sms', 'chat', 'phone']
  channelDiversity: number; // Number of different channels
  channelEffectiveness: number; // 0-1 percentage

  // Language & Communication
  primaryLanguage: string;
  languageProficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
  communicationStyle: 'formal' | 'casual' | 'professional' | 'friendly';

  // Response Patterns
  responseRate: number; // 0-1 percentage
  responseTime: number; // Average hours
  responseQuality: 'poor' | 'fair' | 'good' | 'excellent';

  // Dispute Communication
  disputeCommunication: number; // Number of dispute-related messages
  disputeResolutionTime: number; // Average days
  disputeCommunicationQuality: 'poor' | 'fair' | 'good' | 'excellent';

  // Support Interaction
  supportTickets: number;
  supportTicketResolution: number; // 0-1 percentage
  supportSatisfaction: number; // 1-5 rating
}

// ========================================
// 12. RISK INDICATOR FEATURES
// ========================================

export interface RiskIndicatorFeatures {
  // Fraud Indicators
  fraudScore: number; // 0-100
  fraudIndicators: string[]; // List of fraud indicators
  fraudHistory: number; // Number of fraud incidents

  // Risk Patterns
  highRiskBehavior: boolean;
  riskPatterns: string[]; // List of risk patterns
  riskScore: number; // 0-100

  // Suspicious Activity
  suspiciousActivity: number; // Number of suspicious activities
  suspiciousPatterns: string[]; // List of suspicious patterns
  suspiciousScore: number; // 0-100

  // Compliance Issues
  complianceViolations: number;
  complianceScore: number; // 0-100
  regulatoryIssues: string[];

  // Security Issues
  securityIncidents: number;
  securityScore: number; // 0-100
  securityVulnerabilities: string[];

  // Reputation Issues
  reputationIncidents: number;
  reputationScore: number; // 0-100
  reputationIssues: string[];

  // Financial Risk
  financialRiskScore: number; // 0-100
  financialRiskFactors: string[];
  creditRisk: 'low' | 'medium' | 'high' | 'very_high';
}

// ========================================
// 13. BLOCKCHAIN FEATURES
// ========================================

export interface BlockchainFeatures {
  // Wallet Information
  walletAddress: string;
  walletAge: number; // Days since wallet creation
  walletBalance: number;
  walletTransactionCount: number;

  // Transaction History
  blockchainTransactions: number;
  successfulBlockchainTransactions: number;
  failedBlockchainTransactions: number;
  blockchainTransactionSuccessRate: number; // 0-1 percentage

  // Smart Contract Interactions
  smartContractInteractions: number;
  escrowTransactions: number;
  nftTransactions: number;
  defiTransactions: number;

  // Gas Usage
  totalGasUsed: number;
  averageGasUsed: number;
  gasEfficiency: number; // 0-1 percentage

  // Network Activity
  networkParticipation: number; // 0-1 percentage
  stakingActivity: boolean;
  governanceParticipation: boolean;

  // Security
  walletSecurityScore: number; // 0-100
  multiSigEnabled: boolean;
  hardwareWalletUsed: boolean;
  securityAuditScore: number; // 0-100
}

// ========================================
// 14. AI SCORING CALCULATION
// ========================================

export interface AIScoringResult {
  // Overall Scores
  trustScore: number; // 0-100
  riskScore: number; // 0-100
  fraudScore: number; // 0-100
  reliabilityScore: number; // 0-100

  // Component Scores
  userProfileScore: number; // 0-100
  transactionScore: number; // 0-100
  behavioralScore: number; // 0-100
  financialScore: number; // 0-100
  securityScore: number; // 0-100
  socialScore: number; // 0-100
  geographicScore: number; // 0-100
  temporalScore: number; // 0-100

  // Risk Categories
  riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  riskFactors: string[];
  riskRecommendations: string[];

  // Confidence
  confidenceScore: number; // 0-1 percentage
  dataQuality: number; // 0-1 percentage
  modelVersion: string;

  // Timestamps
  calculatedAt: Date;
  lastUpdated: Date;
  nextUpdate: Date;
}

// ========================================
// 15. FEATURE EXTRACTION UTILITIES
// ========================================

export class FeatureExtractor {
  static extractUserProfileFeatures(user: any): UserProfileFeatures {
    return {
      accountAge: this.calculateAccountAge(user.createdAt),
      accountStatus: user.status,
      verificationLevel: user.verificationLevel,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      kycVerified: user.kycVerified,
      kycLevel: user.kycLevel,
      kycDocumentsSubmitted: user.kycDocuments?.length || 0,
      kycApprovalTime: this.calculateKYCTime(user.kycSubmittedAt, user.kycApprovedAt),
      profileCompleteness: this.calculateProfileCompleteness(user),
      profilePictureUploaded: !!user.profilePicture,
      bioCompleted: !!user.bio,
      addressVerified: user.addressVerified,
      lastLoginDate: user.lastLoginAt,
      loginFrequency: this.calculateLoginFrequency(user.loginHistory),
      sessionDuration: this.calculateAverageSessionDuration(user.sessions),
      passwordChangeFrequency: this.calculatePasswordChangeFrequency(user.passwordHistory),
      twoFactorEnabled: user.twoFactorEnabled,
      securityQuestionsSet: user.securityQuestionsSet,
      backupEmailSet: !!user.backupEmail,
      accountLockoutHistory: user.lockoutHistory?.length || 0,
    };
  }

  static extractTransactionHistoryFeatures(transactions: any[]): TransactionHistoryFeatures {
    const successful = transactions.filter(t => t.status === 'completed');
    const failed = transactions.filter(t => t.status === 'failed');
    const cancelled = transactions.filter(t => t.status === 'cancelled');

    return {
      totalTransactions: transactions.length,
      successfulTransactions: successful.length,
      failedTransactions: failed.length,
      cancelledTransactions: cancelled.length,
      pendingTransactions: transactions.filter(t => t.status === 'pending').length,
      successRate: successful.length / transactions.length,
      failureRate: failed.length / transactions.length,
      cancellationRate: cancelled.length / transactions.length,
      totalSpent: successful.reduce((sum, t) => sum + t.amount, 0),
      totalReceived: successful
        .filter(t => t.type === 'sale')
        .reduce((sum, t) => sum + t.amount, 0),
      averageTransactionValue: successful.reduce((sum, t) => sum + t.amount, 0) / successful.length,
      medianTransactionValue: this.calculateMedian(successful.map(t => t.amount)),
      largestTransactionValue: Math.max(...successful.map(t => t.amount)),
      smallestTransactionValue: Math.min(...successful.map(t => t.amount)),
      transactionsPerMonth: this.calculateTransactionsPerMonth(transactions),
      transactionsPerWeek: this.calculateTransactionsPerWeek(transactions),
      transactionsPerDay: this.calculateTransactionsPerDay(transactions),
      averageDaysBetweenTransactions: this.calculateAverageDaysBetweenTransactions(transactions),
      purchaseTransactions: transactions.filter(t => t.type === 'purchase').length,
      saleTransactions: transactions.filter(t => t.type === 'sale').length,
      refundTransactions: transactions.filter(t => t.type === 'refund').length,
      disputeTransactions: transactions.filter(t => t.type === 'dispute').length,
      transactionsLast7Days: this.countTransactionsInDays(transactions, 7),
      transactionsLast30Days: this.countTransactionsInDays(transactions, 30),
      transactionsLast90Days: this.countTransactionsInDays(transactions, 90),
      transactionsLastYear: this.countTransactionsInDays(transactions, 365),
      transactionTimePattern: this.analyzeTransactionTimePattern(transactions),
      transactionValuePattern: this.analyzeTransactionValuePattern(transactions),
      transactionCategoryPattern: this.analyzeTransactionCategoryPattern(transactions),
    };
  }

  // Helper methods for calculations
  private static calculateAccountAge(createdAt: Date): number {
    return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
  }

  private static calculateKYCTime(submittedAt: Date, approvedAt: Date): number {
    if (!submittedAt || !approvedAt) return 0;
    return Math.floor(
      (new Date(approvedAt).getTime() - new Date(submittedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  private static calculateProfileCompleteness(user: any): number {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'bio', 'profilePicture'];
    const completedFields = fields.filter(field => !!user[field]).length;
    return (completedFields / fields.length) * 100;
  }

  private static calculateLoginFrequency(loginHistory: any[]): number {
    if (!loginHistory || loginHistory.length < 2) return 0;
    const days = this.calculateAccountAge(loginHistory[0].timestamp);
    return loginHistory.length / (days / 30); // Logins per month
  }

  private static calculateAverageSessionDuration(sessions: any[]): number {
    if (!sessions || sessions.length === 0) return 0;
    const totalDuration = sessions.reduce((sum, session) => {
      const duration = new Date(session.endTime).getTime() - new Date(session.startTime).getTime();
      return sum + duration;
    }, 0);
    return totalDuration / sessions.length / (1000 * 60); // Minutes
  }

  private static calculatePasswordChangeFrequency(passwordHistory: any[]): number {
    if (!passwordHistory || passwordHistory.length < 2) return 0;
    const totalDays = this.calculateAccountAge(passwordHistory[0].changedAt);
    return totalDays / passwordHistory.length;
  }

  private static calculateMedian(values: number[]): number {
    const sorted = values.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
  }

  private static calculateTransactionsPerMonth(transactions: any[]): number {
    if (transactions.length === 0) return 0;
    const firstTransaction = new Date(transactions[0].createdAt);
    const lastTransaction = new Date(transactions[transactions.length - 1].createdAt);
    const months =
      (lastTransaction.getTime() - firstTransaction.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return transactions.length / months;
  }

  private static calculateTransactionsPerWeek(transactions: any[]): number {
    return this.calculateTransactionsPerMonth(transactions) / 4;
  }

  private static calculateTransactionsPerDay(transactions: any[]): number {
    return this.calculateTransactionsPerMonth(transactions) / 30;
  }

  private static calculateAverageDaysBetweenTransactions(transactions: any[]): number {
    if (transactions.length < 2) return 0;
    const sortedTransactions = transactions.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    let totalDays = 0;

    for (let i = 1; i < sortedTransactions.length; i++) {
      const days =
        (new Date(sortedTransactions[i].createdAt).getTime() -
          new Date(sortedTransactions[i - 1].createdAt).getTime()) /
        (1000 * 60 * 60 * 24);
      totalDays += days;
    }

    return totalDays / (sortedTransactions.length - 1);
  }

  private static countTransactionsInDays(transactions: any[], days: number): number {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return transactions.filter(t => new Date(t.createdAt) >= cutoffDate).length;
  }

  private static analyzeTransactionTimePattern(
    transactions: any[]
  ): 'regular' | 'irregular' | 'seasonal' | 'random' {
    // Simplified analysis - in practice, use more sophisticated time series analysis
    const intervals = [];
    for (let i = 1; i < transactions.length; i++) {
      const interval =
        new Date(transactions[i].createdAt).getTime() -
        new Date(transactions[i - 1].createdAt).getTime();
      intervals.push(interval);
    }

    const variance = this.calculateVariance(intervals);
    const mean = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    const coefficientOfVariation = Math.sqrt(variance) / mean;

    if (coefficientOfVariation < 0.3) return 'regular';
    if (coefficientOfVariation < 0.7) return 'seasonal';
    return 'irregular';
  }

  private static analyzeTransactionValuePattern(
    transactions: any[]
  ): 'consistent' | 'variable' | 'increasing' | 'decreasing' {
    const values = transactions.map(t => t.amount);
    const trend = this.calculateTrend(values);

    if (Math.abs(trend) < 0.1) return 'consistent';
    if (trend > 0.1) return 'increasing';
    if (trend < -0.1) return 'decreasing';
    return 'variable';
  }

  private static analyzeTransactionCategoryPattern(
    transactions: any[]
  ): 'diverse' | 'focused' | 'random' {
    const categories = transactions.map(t => t.category);
    const uniqueCategories = new Set(categories).size;
    const diversityRatio = uniqueCategories / categories.length;

    if (diversityRatio > 0.7) return 'diverse';
    if (diversityRatio < 0.3) return 'focused';
    return 'random';
  }

  private static calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
    return squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private static calculateTrend(values: number[]): number {
    // Simple linear trend calculation
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, index) => sum + val * index, 0);
    const sumX2 = values.reduce((sum, val, index) => sum + index * index, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }
}

// ========================================
// 16. AI SCORING ENGINE
// ========================================

export class AIScoringEngine {
  private modelVersion: string = '1.0.0';

  async calculateScores(features: AIScoringFeatures): Promise<AIScoringResult> {
    // Calculate component scores
    const userProfileScore = this.calculateUserProfileScore(features.userProfile);
    const transactionScore = this.calculateTransactionScore(features.transactionHistory);
    const behavioralScore = this.calculateBehavioralScore(features.behavioral);
    const financialScore = this.calculateFinancialScore(features.financial);
    const securityScore = this.calculateSecurityScore(features.deviceSecurity);
    const socialScore = this.calculateSocialScore(features.socialNetwork);
    const geographicScore = this.calculateGeographicScore(features.geographic);
    const temporalScore = this.calculateTemporalScore(features.temporal);

    // Calculate overall scores
    const trustScore = this.calculateTrustScore({
      userProfileScore,
      transactionScore,
      behavioralScore,
      socialScore,
      geographicScore,
      temporalScore,
    });

    const riskScore = this.calculateRiskScore({
      financialScore,
      securityScore,
      riskIndicators: features.riskIndicators,
    });

    const fraudScore = this.calculateFraudScore({
      behavioralScore,
      securityScore,
      riskIndicators: features.riskIndicators,
    });

    const reliabilityScore = this.calculateReliabilityScore({
      transactionScore,
      behavioralScore,
      socialScore,
    });

    // Determine risk level
    const riskLevel = this.determineRiskLevel(riskScore);

    // Generate risk factors and recommendations
    const riskFactors = this.generateRiskFactors(features);
    const riskRecommendations = this.generateRiskRecommendations(riskFactors);

    // Calculate confidence
    const confidenceScore = this.calculateConfidenceScore(features);
    const dataQuality = this.calculateDataQuality(features);

    return {
      trustScore,
      riskScore,
      fraudScore,
      reliabilityScore,
      userProfileScore,
      transactionScore,
      behavioralScore,
      financialScore,
      securityScore,
      socialScore,
      geographicScore,
      temporalScore,
      riskLevel,
      riskFactors,
      riskRecommendations,
      confidenceScore,
      dataQuality,
      modelVersion: this.modelVersion,
      calculatedAt: new Date(),
      lastUpdated: new Date(),
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next update in 24 hours
    };
  }

  private calculateUserProfileScore(features: UserProfileFeatures): number {
    let score = 0;

    // Account age (0-20 points)
    score += Math.min((features.accountAge / 365) * 20, 20);

    // Verification level (0-25 points)
    const verificationScores = { none: 0, basic: 10, verified: 20, premium: 25 };
    score += verificationScores[features.verificationLevel];

    // Profile completeness (0-15 points)
    score += features.profileCompleteness * 0.15;

    // Account activity (0-20 points)
    score += Math.min(features.loginFrequency * 2, 20);

    // Security (0-20 points)
    score += features.twoFactorEnabled ? 10 : 0;
    score += features.securityQuestionsSet ? 5 : 0;
    score += features.backupEmailSet ? 5 : 0;

    return Math.min(score, 100);
  }

  private calculateTransactionScore(features: TransactionHistoryFeatures): number {
    let score = 0;

    // Success rate (0-30 points)
    score += features.successRate * 30;

    // Transaction volume (0-25 points)
    const volumeScore = Math.min((features.totalTransactions / 100) * 25, 25);
    score += volumeScore;

    // Transaction consistency (0-25 points)
    score += (1 - features.cancellationRate) * 25;

    // Transaction value (0-20 points)
    const valueScore = Math.min((features.averageTransactionValue / 1000) * 20, 20);
    score += valueScore;

    return Math.min(score, 100);
  }

  private calculateBehavioralScore(features: BehavioralFeatures): number {
    let score = 0;

    // Purchase behavior (0-30 points)
    score += (1 - features.cartAbandonmentRate) * 30;

    // Communication quality (0-25 points)
    const qualityScores = { poor: 0, fair: 10, good: 20, excellent: 25 };
    score += qualityScores[features.communicationQuality];

    // Platform usage (0-25 points)
    score += features.mobileUsageRate * 25;

    // Product interaction (0-20 points)
    score += features.reviewSubmissionRate * 20;

    return Math.min(score, 100);
  }

  private calculateFinancialScore(features: FinancialFeatures): number {
    let score = 0;

    // Payment success (0-30 points)
    score += features.paymentSuccessRate * 30;

    // Chargeback rate (0-30 points)
    score += (1 - features.chargebackRate) * 30;

    // Payment method diversity (0-20 points)
    score += Math.min(features.paymentMethodDiversity * 5, 20);

    // Crypto usage (0-20 points)
    if (features.cryptoTransactions > 0) {
      score += Math.min((features.cryptoTransactions / 10) * 20, 20);
    }

    return Math.min(score, 100);
  }

  private calculateSecurityScore(features: DeviceSecurityFeatures): number {
    let score = 0;

    // Device consistency (0-30 points)
    score += features.deviceConsistency * 30;

    // IP consistency (0-25 points)
    score += features.ipConsistency * 25;

    // Security events (0-25 points)
    score += Math.max(0, 25 - features.failedLoginAttempts * 2);

    // VPN/Proxy usage (0-20 points)
    score += features.vpnUsage ? 0 : 20;

    return Math.min(score, 100);
  }

  private calculateSocialScore(features: SocialNetworkFeatures): number {
    let score = 0;

    // Reviews and ratings (0-30 points)
    score += Math.min((features.reviewsReceived / 10) * 30, 30);
    score += features.averageRating * 6; // 5 stars = 30 points

    // Social connections (0-25 points)
    score += Math.min((features.socialConnections / 50) * 25, 25);

    // Reputation score (0-25 points)
    score += features.reputationScore * 0.25;

    // Network influence (0-20 points)
    score += features.networkInfluence * 20;

    return Math.min(score, 100);
  }

  private calculateGeographicScore(features: GeographicFeatures): number {
    let score = 0;

    // Location consistency (0-40 points)
    score += features.locationConsistency * 40;

    // Geographic risk (0-30 points)
    score += (100 - features.geographicRiskScore) * 0.3;

    // Shipping patterns (0-30 points)
    score += features.shippingAddressConsistency * 30;

    return Math.min(score, 100);
  }

  private calculateTemporalScore(features: TemporalFeatures): number {
    let score = 0;

    // Activity consistency (0-40 points)
    score += features.activityConsistency * 40;

    // Time patterns (0-30 points)
    score += features.weeklyConsistency * 30;

    // Seasonal patterns (0-30 points)
    score += features.seasonalConsistency * 30;

    return Math.min(score, 100);
  }

  private calculateTrustScore(componentScores: any): number {
    const weights = {
      userProfileScore: 0.25,
      transactionScore: 0.25,
      behavioralScore: 0.2,
      socialScore: 0.15,
      geographicScore: 0.1,
      temporalScore: 0.05,
    };

    return Object.keys(weights).reduce((score, key) => {
      return score + componentScores[key] * weights[key];
    }, 0);
  }

  private calculateRiskScore(componentScores: any): number {
    const weights = {
      financialScore: 0.4,
      securityScore: 0.35,
      riskIndicators: 0.25,
    };

    let score =
      componentScores.financialScore * weights.financialScore +
      componentScores.securityScore * weights.securityScore;

    // Add risk indicator penalties
    score -= componentScores.riskIndicators.fraudScore * 0.25;

    return Math.max(0, Math.min(100, score));
  }

  private calculateFraudScore(componentScores: any): number {
    const weights = {
      behavioralScore: 0.35,
      securityScore: 0.35,
      riskIndicators: 0.3,
    };

    let score =
      componentScores.behavioralScore * weights.behavioralScore +
      componentScores.securityScore * weights.securityScore;

    // Add fraud indicator penalties
    score += componentScores.riskIndicators.fraudScore * 0.3;

    return Math.max(0, Math.min(100, score));
  }

  private calculateReliabilityScore(componentScores: any): number {
    const weights = {
      transactionScore: 0.4,
      behavioralScore: 0.35,
      socialScore: 0.25,
    };

    return Object.keys(weights).reduce((score, key) => {
      return score + componentScores[key] * weights[key];
    }, 0);
  }

  private determineRiskLevel(riskScore: number): 'low' | 'medium' | 'high' | 'very_high' {
    if (riskScore < 25) return 'low';
    if (riskScore < 50) return 'medium';
    if (riskScore < 75) return 'high';
    return 'very_high';
  }

  private generateRiskFactors(features: AIScoringFeatures): string[] {
    const factors: string[] = [];

    if (features.userProfile.accountAge < 30) factors.push('New account');
    if (!features.userProfile.kycVerified) factors.push('KYC not verified');
    if (features.transactionHistory.successRate < 0.8) factors.push('Low transaction success rate');
    if (features.financial.chargebackRate > 0.05) factors.push('High chargeback rate');
    if (features.deviceSecurity.deviceConsistency < 0.7) factors.push('Multiple devices used');
    if (features.geographic.locationConsistency < 0.8) factors.push('Multiple locations');
    if (features.riskIndicators.fraudScore > 50) factors.push('High fraud risk');

    return factors;
  }

  private generateRiskRecommendations(riskFactors: string[]): string[] {
    const recommendations: string[] = [];

    if (riskFactors.includes('New account')) {
      recommendations.push('Complete KYC verification to build trust');
    }
    if (riskFactors.includes('KYC not verified')) {
      recommendations.push('Submit KYC documents for verification');
    }
    if (riskFactors.includes('Low transaction success rate')) {
      recommendations.push('Review and improve transaction processes');
    }
    if (riskFactors.includes('High chargeback rate')) {
      recommendations.push('Implement better fraud prevention measures');
    }
    if (riskFactors.includes('Multiple devices used')) {
      recommendations.push('Enable two-factor authentication for security');
    }
    if (riskFactors.includes('Multiple locations')) {
      recommendations.push('Verify account activity from new locations');
    }
    if (riskFactors.includes('High fraud risk')) {
      recommendations.push('Contact support for account review');
    }

    return recommendations;
  }

  private calculateConfidenceScore(features: AIScoringFeatures): number {
    // Calculate confidence based on data completeness and quality
    let confidence = 0;

    // Check data availability
    if (features.userProfile.accountAge > 0) confidence += 0.2;
    if (features.transactionHistory.totalTransactions > 0) confidence += 0.2;
    if (features.behavioral.pagesViewedPerSession > 0) confidence += 0.2;
    if (features.financial.paymentMethodsUsed.length > 0) confidence += 0.2;
    if (features.socialNetwork.reviewsReceived > 0) confidence += 0.2;

    return Math.min(confidence, 1);
  }

  private calculateDataQuality(features: AIScoringFeatures): number {
    // Calculate data quality based on completeness and consistency
    let quality = 0;

    // Profile completeness
    quality += features.userProfile.profileCompleteness * 0.3;

    // Transaction data quality
    quality += Math.min(features.transactionHistory.totalTransactions / 100, 1) * 0.3;

    // Behavioral data quality
    quality += Math.min(features.behavioral.pagesViewedPerSession / 10, 1) * 0.2;

    // Social data quality
    quality += Math.min(features.socialNetwork.reviewsReceived / 20, 1) * 0.2;

    return Math.min(quality, 1);
  }
}

// ========================================
// 17. EXPORT ALL FEATURES
// ========================================

export const aiScoringFeatures = {
  UserProfileFeatures,
  TransactionHistoryFeatures,
  BehavioralFeatures,
  FinancialFeatures,
  DeviceSecurityFeatures,
  SocialNetworkFeatures,
  GeographicFeatures,
  TemporalFeatures,
  ProductCategoryFeatures,
  CommunicationFeatures,
  RiskIndicatorFeatures,
  BlockchainFeatures,
  AIScoringFeatures,
  AIScoringResult,
  FeatureExtractor,
  AIScoringEngine,
};
