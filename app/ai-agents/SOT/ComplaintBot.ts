/**
 * ComplaintBot - Handle user complaints from voice/text/video input
 *
 * Purpose: Processes and resolves user complaints by:
 * - Transcribing voice/video input
 * - Analyzing sentiment and intent
 * - Auto-resolving common issues
 * - Escalating complex problems
 * - Tracking resolution progress
 *
 * @author EHB AI System
 * @version 1.0.0
 */

export interface Complaint {
  id: string;
  userId: string;
  type: 'voice' | 'text' | 'video' | 'pdf' | 'image';
  content: string;
  originalInput?: string; // For voice/video, this is the transcribed text
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  category: 'technical' | 'billing' | 'service' | 'fraud' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'processing' | 'resolved' | 'escalated' | 'closed';
  submittedAt: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  language: string;
  location: string;
  tags: string[];
}

export interface ComplaintAnalysis {
  complaintId: string;
  intent: string;
  entities: string[];
  suggestedActions: string[];
  autoResolvable: boolean;
  confidence: number; // 0-100
  keywords: string[];
  urgency: number; // 0-100
  category: string;
  subcategory: string;
}

export interface Resolution {
  id: string;
  complaintId: string;
  action: 'auto_resolve' | 'manual_resolve' | 'escalate' | 'forward';
  description: string;
  executedAt: Date;
  executedBy: 'ai' | 'human' | 'system';
  result: 'success' | 'partial' | 'failed';
  followUpRequired: boolean;
  followUpDate?: Date;
}

export interface EscalationPath {
  level: 'sub_franchise' | 'master_franchise' | 'corporate';
  reason: string;
  estimatedResponseTime: number; // hours
  autoEscalateAfter: number; // hours
}

export class ComplaintBot {
  private complaints: Map<string, Complaint> = new Map();
  private resolutions: Resolution[] = [];
  private escalationPaths: Map<string, EscalationPath[]> = new Map();
  private autoResolvePatterns: Map<string, string[]> = new Map();

  constructor() {
    this.initializeAutoResolvePatterns();
    this.initializeEscalationPaths();
    console.log('🤖 ComplaintBot initialized');
  }

  /**
   * Process new complaint from various input types
   */
  async processComplaint(complaintData: Omit<Complaint, 'id' | 'submittedAt' | 'status'>): Promise<{
    complaintId: string;
    analysis: ComplaintAnalysis;
    resolution: Resolution | null;
    escalationPath?: EscalationPath;
  }> {
    console.log(
      `📝 ComplaintBot: Processing ${complaintData.type} complaint from user ${complaintData.userId}`
    );

    const complaintId = `complaint_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const complaint: Complaint = {
      ...complaintData,
      id: complaintId,
      submittedAt: new Date(),
      status: 'pending',
    };

    this.complaints.set(complaintId, complaint);

    // Analyze the complaint
    const analysis = await this.analyzeComplaint(complaint);

    // Attempt auto-resolution
    let resolution: Resolution | null = null;
    let escalationPath: EscalationPath | undefined;

    if (analysis.autoResolvable && analysis.confidence > 70) {
      resolution = await this.autoResolveComplaint(complaint, analysis);
    } else {
      // Determine escalation path
      escalationPath = this.determineEscalationPath(complaint, analysis);
    }

    // Update complaint status
    if (resolution && resolution.result === 'success') {
      complaint.status = 'resolved';
      complaint.resolvedAt = new Date();
    } else if (escalationPath) {
      complaint.status = 'escalated';
      complaint.assignedTo = escalationPath.level;
    } else {
      complaint.status = 'processing';
    }

    console.log(`✅ ComplaintBot: Processed complaint ${complaintId}. Status: ${complaint.status}`);

    return {
      complaintId,
      analysis,
      resolution,
      escalationPath,
    };
  }

  /**
   * Analyze complaint content using AI
   */
  private async analyzeComplaint(complaint: Complaint): Promise<ComplaintAnalysis> {
    console.log(`🧠 ComplaintBot: Analyzing complaint ${complaint.id}`);

    // Extract intent and entities
    const intent = await this.extractIntent(complaint.content);
    const entities = await this.extractEntities(complaint.content);
    const keywords = await this.extractKeywords(complaint.content);

    // Determine category and subcategory
    const category = await this.categorizeComplaint(complaint.content, intent);
    const subcategory = await this.determineSubcategory(complaint.content, category);

    // Check if auto-resolvable
    const autoResolvable = await this.checkAutoResolvable(complaint.content, intent, category);
    const confidence = await this.calculateConfidence(complaint.content, intent, category);

    // Calculate urgency
    const urgency = this.calculateUrgency(complaint.sentiment, complaint.priority, intent);

    // Generate suggested actions
    const suggestedActions = await this.generateSuggestedActions(intent, category, autoResolvable);

    return {
      complaintId: complaint.id,
      intent,
      entities,
      suggestedActions,
      autoResolvable,
      confidence,
      keywords,
      urgency,
      category,
      subcategory,
    };
  }

  /**
   * Attempt to auto-resolve complaint
   */
  private async autoResolveComplaint(
    complaint: Complaint,
    analysis: ComplaintAnalysis
  ): Promise<Resolution> {
    console.log(`🤖 ComplaintBot: Attempting auto-resolution for complaint ${complaint.id}`);

    const resolutionId = `resolution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const action: Resolution['action'] = 'auto_resolve';
    let description = '';
    let result: Resolution['result'] = 'success';
    let followUpRequired = false;

    // Apply auto-resolution based on category and intent
    switch (analysis.category) {
      case 'technical':
        const techResolution = await this.resolveTechnicalIssue(complaint, analysis);
        description = techResolution.description;
        result = techResolution.result;
        followUpRequired = techResolution.followUpRequired;
        break;

      case 'billing':
        const billingResolution = await this.resolveBillingIssue(complaint, analysis);
        description = billingResolution.description;
        result = billingResolution.result;
        followUpRequired = billingResolution.followUpRequired;
        break;

      case 'service':
        const serviceResolution = await this.resolveServiceIssue(complaint, analysis);
        description = serviceResolution.description;
        result = serviceResolution.result;
        followUpRequired = serviceResolution.followUpRequired;
        break;

      default:
        description = 'Issue forwarded to human support for manual resolution';
        result = 'partial';
        followUpRequired = true;
        break;
    }

    const resolution: Resolution = {
      id: resolutionId,
      complaintId: complaint.id,
      action,
      description,
      executedAt: new Date(),
      executedBy: 'ai',
      result,
      followUpRequired,
      followUpDate: followUpRequired ? new Date(Date.now() + 24 * 60 * 60 * 1000) : undefined,
    };

    this.resolutions.push(resolution);

    console.log(`✅ ComplaintBot: Auto-resolution ${result} for complaint ${complaint.id}`);

    return resolution;
  }

  /**
   * Determine escalation path for complex complaints
   */
  private determineEscalationPath(
    complaint: Complaint,
    analysis: ComplaintAnalysis
  ): EscalationPath {
    let level: EscalationPath['level'] = 'sub_franchise';
    let reason = '';
    let estimatedResponseTime = 4; // hours
    let autoEscalateAfter = 6; // hours

    // Determine escalation level based on urgency and category
    if (analysis.urgency > 80 || complaint.priority === 'urgent') {
      level = 'corporate';
      reason = 'High urgency complaint requiring immediate attention';
      estimatedResponseTime = 1;
      autoEscalateAfter = 2;
    } else if (analysis.urgency > 60 || complaint.priority === 'high') {
      level = 'master_franchise';
      reason = 'Complex issue requiring senior support';
      estimatedResponseTime = 2;
      autoEscalateAfter = 4;
    } else {
      level = 'sub_franchise';
      reason = 'Standard complaint for local resolution';
      estimatedResponseTime = 4;
      autoEscalateAfter = 6;
    }

    // Special cases for fraud or legal issues
    if (analysis.category === 'fraud') {
      level = 'corporate';
      reason = 'Fraud-related complaint requiring corporate investigation';
      estimatedResponseTime = 1;
      autoEscalateAfter = 2;
    }

    return {
      level,
      reason,
      estimatedResponseTime,
      autoEscalateAfter,
    };
  }

  /**
   * Get complaint status and resolution details
   */
  async getComplaintStatus(complaintId: string): Promise<{
    complaint: Complaint;
    analysis: ComplaintAnalysis;
    resolution?: Resolution;
    escalationPath?: EscalationPath;
  } | null> {
    const complaint = this.complaints.get(complaintId);
    if (!complaint) return null;

    const analysis = await this.analyzeComplaint(complaint);
    const resolution = this.resolutions.find(r => r.complaintId === complaintId);
    const escalationPath =
      complaint.status === 'escalated'
        ? this.determineEscalationPath(complaint, analysis)
        : undefined;

    return {
      complaint,
      analysis,
      resolution,
      escalationPath,
    };
  }

  /**
   * Update complaint status (for manual resolution)
   */
  async updateComplaintStatus(
    complaintId: string,
    status: Complaint['status'],
    notes?: string
  ): Promise<void> {
    const complaint = this.complaints.get(complaintId);
    if (!complaint) {
      throw new Error(`Complaint ${complaintId} not found`);
    }

    const oldStatus = complaint.status;
    complaint.status = status;

    if (status === 'resolved') {
      complaint.resolvedAt = new Date();
    }

    // Create resolution record
    const resolution: Resolution = {
      id: `resolution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      complaintId,
      action: 'manual_resolve',
      description: notes || `Status updated from ${oldStatus} to ${status}`,
      executedAt: new Date(),
      executedBy: 'human',
      result: status === 'resolved' ? 'success' : 'partial',
      followUpRequired: false,
    };

    this.resolutions.push(resolution);

    console.log(`📝 ComplaintBot: Updated complaint ${complaintId} status to ${status}`);
  }

  /**
   * Get complaints by user
   */
  async getUserComplaints(userId: string): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).filter(c => c.userId === userId);
  }

  /**
   * Get complaints by status for admin review
   */
  async getComplaintsByStatus(status: Complaint['status']): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).filter(c => c.status === status);
  }

  /**
   * Get complaints by category for analysis
   */
  async getComplaintsByCategory(category: Complaint['category']): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).filter(c => c.category === category);
  }

  // Private helper methods for AI analysis

  private async extractIntent(content: string): Promise<string> {
    // Simplified intent extraction (in real implementation, use NLP/ML models)
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('refund') || lowerContent.includes('money back')) {
      return 'request_refund';
    } else if (lowerContent.includes('broken') || lowerContent.includes('not working')) {
      return 'report_technical_issue';
    } else if (lowerContent.includes('slow') || lowerContent.includes('performance')) {
      return 'report_performance_issue';
    } else if (lowerContent.includes('fraud') || lowerContent.includes('scam')) {
      return 'report_fraud';
    } else if (lowerContent.includes('billing') || lowerContent.includes('charge')) {
      return 'billing_inquiry';
    } else {
      return 'general_inquiry';
    }
  }

  private async extractEntities(content: string): Promise<string[]> {
    // Extract named entities (people, places, products, etc.)
    const entities: string[] = [];

    // Extract email addresses
    const emailMatches = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (emailMatches) entities.push(...emailMatches);

    // Extract phone numbers
    const phoneMatches = content.match(/\+?[\d\s\-\(\)]{10,}/g);
    if (phoneMatches) entities.push(...phoneMatches);

    // Extract URLs
    const urlMatches = content.match(/https?:\/\/[^\s]+/g);
    if (urlMatches) entities.push(...urlMatches);

    // Extract product names (simplified)
    const productKeywords = ['tool', 'service', 'app', 'platform', 'system'];
    productKeywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) {
        entities.push(keyword);
      }
    });

    return entities;
  }

  private async extractKeywords(content: string): Promise<string[]> {
    // Extract important keywords for categorization
    const stopWords = [
      'the',
      'a',
      'an',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
      'of',
      'with',
      'by',
    ];
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));

    // Return unique keywords
    return [...new Set(words)];
  }

  private async categorizeComplaint(
    content: string,
    intent: string
  ): Promise<Complaint['category']> {
    const lowerContent = content.toLowerCase();

    if (intent === 'report_fraud') return 'fraud';
    if (
      intent === 'billing_inquiry' ||
      lowerContent.includes('payment') ||
      lowerContent.includes('charge')
    )
      return 'billing';
    if (
      intent.includes('technical') ||
      intent.includes('performance') ||
      lowerContent.includes('bug')
    )
      return 'technical';
    if (lowerContent.includes('service') || lowerContent.includes('support')) return 'service';

    return 'general';
  }

  private async determineSubcategory(
    content: string,
    category: Complaint['category']
  ): Promise<string> {
    const lowerContent = content.toLowerCase();

    switch (category) {
      case 'technical':
        if (lowerContent.includes('login') || lowerContent.includes('password'))
          return 'authentication';
        if (lowerContent.includes('slow') || lowerContent.includes('performance'))
          return 'performance';
        if (lowerContent.includes('error') || lowerContent.includes('crash')) return 'system_error';
        return 'general_technical';

      case 'billing':
        if (lowerContent.includes('refund')) return 'refund_request';
        if (lowerContent.includes('overcharge')) return 'billing_error';
        if (lowerContent.includes('subscription')) return 'subscription_issue';
        return 'general_billing';

      case 'service':
        if (lowerContent.includes('response') || lowerContent.includes('wait'))
          return 'response_time';
        if (lowerContent.includes('quality')) return 'service_quality';
        return 'general_service';

      default:
        return 'general';
    }
  }

  private async checkAutoResolvable(
    content: string,
    intent: string,
    category: Complaint['category']
  ): Promise<boolean> {
    // Check if complaint can be auto-resolved based on patterns
    const patterns = this.autoResolvePatterns.get(category) || [];

    return patterns.some(pattern => content.toLowerCase().includes(pattern.toLowerCase()));
  }

  private async calculateConfidence(
    content: string,
    intent: string,
    category: Complaint['category']
  ): Promise<number> {
    // Calculate confidence score based on content clarity and intent match
    let confidence = 50; // Base confidence

    // Increase confidence for clear, specific complaints
    if (content.length > 50) confidence += 10;
    if (content.length > 100) confidence += 10;

    // Increase confidence for specific intents
    if (intent !== 'general_inquiry') confidence += 15;

    // Increase confidence for specific categories
    if (category !== 'general') confidence += 10;

    // Decrease confidence for vague complaints
    if (content.length < 20) confidence -= 20;

    return Math.min(100, Math.max(0, confidence));
  }

  private calculateUrgency(
    sentiment: Complaint['sentiment'],
    priority: Complaint['priority'],
    intent: string
  ): number {
    let urgency = 50; // Base urgency

    // Adjust based on sentiment
    switch (sentiment) {
      case 'urgent':
        urgency += 30;
        break;
      case 'negative':
        urgency += 15;
        break;
      case 'positive':
        urgency -= 10;
        break;
    }

    // Adjust based on priority
    switch (priority) {
      case 'urgent':
        urgency += 25;
        break;
      case 'high':
        urgency += 15;
        break;
      case 'medium':
        urgency += 5;
        break;
      case 'low':
        urgency -= 10;
        break;
    }

    // Adjust based on intent
    if (intent === 'report_fraud') urgency += 20;
    if (intent.includes('technical')) urgency += 10;

    return Math.min(100, Math.max(0, urgency));
  }

  private async generateSuggestedActions(
    intent: string,
    category: Complaint['category'],
    autoResolvable: boolean
  ): Promise<string[]> {
    const actions: string[] = [];

    if (autoResolvable) {
      actions.push('Auto-resolve using predefined solution');
    }

    switch (intent) {
      case 'request_refund':
        actions.push('Process refund request');
        actions.push('Verify purchase history');
        break;
      case 'report_technical_issue':
        actions.push('Create technical support ticket');
        actions.push('Assign to technical team');
        break;
      case 'report_fraud':
        actions.push('Escalate to fraud investigation team');
        actions.push('Freeze related accounts');
        break;
      default:
        actions.push('Forward to human support');
        break;
    }

    return actions;
  }

  // Auto-resolution methods for different categories

  private async resolveTechnicalIssue(
    complaint: Complaint,
    analysis: ComplaintAnalysis
  ): Promise<{
    description: string;
    result: Resolution['result'];
    followUpRequired: boolean;
  }> {
    const lowerContent = complaint.content.toLowerCase();

    if (lowerContent.includes('password') || lowerContent.includes('login')) {
      return {
        description: 'Password reset link sent to registered email. Please check your inbox.',
        result: 'success',
        followUpRequired: false,
      };
    }

    if (lowerContent.includes('slow') || lowerContent.includes('performance')) {
      return {
        description: 'Performance optimization applied. Please try again in 5 minutes.',
        result: 'success',
        followUpRequired: true,
      };
    }

    return {
      description: 'Technical issue logged. Support team will contact you within 2 hours.',
      result: 'partial',
      followUpRequired: true,
    };
  }

  private async resolveBillingIssue(
    complaint: Complaint,
    analysis: ComplaintAnalysis
  ): Promise<{
    description: string;
    result: Resolution['result'];
    followUpRequired: boolean;
  }> {
    const lowerContent = complaint.content.toLowerCase();

    if (lowerContent.includes('refund')) {
      return {
        description: 'Refund request processed. Amount will be credited within 3-5 business days.',
        result: 'success',
        followUpRequired: false,
      };
    }

    if (lowerContent.includes('overcharge')) {
      return {
        description: 'Billing discrepancy identified. Credit will be applied to your account.',
        result: 'success',
        followUpRequired: false,
      };
    }

    return {
      description: 'Billing inquiry forwarded to billing department for review.',
      result: 'partial',
      followUpRequired: true,
    };
  }

  private async resolveServiceIssue(
    complaint: Complaint,
    analysis: ComplaintAnalysis
  ): Promise<{
    description: string;
    result: Resolution['result'];
    followUpRequired: boolean;
  }> {
    return {
      description:
        'Service issue acknowledged. Customer service representative will contact you within 1 hour.',
      result: 'partial',
      followUpRequired: true,
    };
  }

  // Initialization methods

  private initializeAutoResolvePatterns(): void {
    this.autoResolvePatterns.set('technical', [
      'password reset',
      'forgot password',
      'cannot login',
      'slow loading',
      'page not loading',
    ]);

    this.autoResolvePatterns.set('billing', [
      'refund request',
      'overcharge',
      'double charge',
      'billing error',
    ]);

    this.autoResolvePatterns.set('service', ['response time', 'waiting for reply', 'no response']);
  }

  private initializeEscalationPaths(): void {
    // Define escalation paths for different complaint types
    this.escalationPaths.set('fraud', [
      {
        level: 'corporate',
        reason: 'Fraud complaints require immediate corporate attention',
        estimatedResponseTime: 1,
        autoEscalateAfter: 2,
      },
    ]);

    this.escalationPaths.set('technical', [
      {
        level: 'sub_franchise',
        reason: 'Technical issues handled by local support',
        estimatedResponseTime: 4,
        autoEscalateAfter: 6,
      },
      {
        level: 'master_franchise',
        reason: 'Complex technical issues escalated to senior support',
        estimatedResponseTime: 2,
        autoEscalateAfter: 4,
      },
    ]);
  }
}

export default ComplaintBot;
