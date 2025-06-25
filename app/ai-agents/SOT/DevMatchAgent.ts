/**
 * DevMatchAgent - Auto-match tasks with the most suitable developer
 *
 * Purpose: Automatically matches development tasks with developers based on:
 * - Task requirements and complexity
 * - Developer skills and SQL level
 * - Historical performance and ratings
 * - Availability and timeline
 *
 * @author EHB AI System
 * @version 1.0.0
 */

export interface TaskRequirements {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'ai' | 'blockchain' | 'mobile' | 'devops';
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  timeline: number; // days
  budget: number; // EHBGC
  requiredSkills: string[];
  preferredSQL: 'Basic' | 'Normal' | 'High' | 'VIP';
  location?: string;
  language?: string;
}

export interface DeveloperProfile {
  id: string;
  name: string;
  email: string;
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  skills: string[];
  rating: number; // 1-5
  completedTasks: number;
  successRate: number; // percentage
  averageCompletionTime: number; // days
  availability: boolean;
  hourlyRate: number; // EHBGC
  location: string;
  languages: string[];
  portfolio: string[];
  verified: boolean;
  lastActive: Date;
}

export interface MatchResult {
  developerId: string;
  developerName: string;
  matchScore: number; // 0-100
  reasons: string[];
  estimatedCompletionTime: number;
  proposedRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export class DevMatchAgent {
  private developers: DeveloperProfile[] = [];
  private tasks: TaskRequirements[] = [];

  constructor() {
    this.loadDevelopers();
  }

  /**
   * Main matching function - finds top 5 developers for a task
   */
  async findBestMatches(task: TaskRequirements): Promise<MatchResult[]> {
    console.log(`🔍 DevMatchAgent: Finding matches for task "${task.title}"`);

    const matches: MatchResult[] = [];

    for (const dev of this.developers) {
      if (!dev.availability) continue;

      const matchScore = this.calculateMatchScore(task, dev);

      if (matchScore > 30) {
        // Only consider reasonable matches
        const match: MatchResult = {
          developerId: dev.id,
          developerName: dev.name,
          matchScore,
          reasons: this.getMatchReasons(task, dev),
          estimatedCompletionTime: this.estimateCompletionTime(task, dev),
          proposedRate: this.calculateProposedRate(task, dev),
          riskLevel: this.assessRiskLevel(dev),
          recommendations: this.generateRecommendations(task, dev),
        };

        matches.push(match);
      }
    }

    // Sort by match score and return top 5
    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
  }

  /**
   * Calculate match score based on multiple factors
   */
  private calculateMatchScore(task: TaskRequirements, dev: DeveloperProfile): number {
    let score = 0;

    // SQL Level Match (30 points)
    const sqlScore = this.getSQLMatchScore(task.preferredSQL, dev.sqlLevel);
    score += sqlScore * 30;

    // Skills Match (25 points)
    const skillMatch = this.calculateSkillMatch(task.requiredSkills, dev.skills);
    score += skillMatch * 25;

    // Rating & Performance (20 points)
    const performanceScore = dev.rating * 0.6 + dev.successRate * 0.4;
    score += performanceScore * 20;

    // Location Match (10 points)
    if (task.location && dev.location.includes(task.location)) {
      score += 10;
    }

    // Language Match (10 points)
    if (task.language && dev.languages.includes(task.language)) {
      score += 10;
    }

    // Availability & Timeline (5 points)
    if (dev.averageCompletionTime <= task.timeline) {
      score += 5;
    }

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Get SQL level compatibility score
   */
  private getSQLMatchScore(required: string, actual: string): number {
    const levels = ['Free', 'Basic', 'Normal', 'High', 'VIP'];
    const requiredIndex = levels.indexOf(required);
    const actualIndex = levels.indexOf(actual);

    if (actualIndex >= requiredIndex) {
      return 1.0; // Perfect or better match
    } else if (actualIndex === requiredIndex - 1) {
      return 0.7; // One level below
    } else {
      return 0.3; // Much lower level
    }
  }

  /**
   * Calculate skill match percentage
   */
  private calculateSkillMatch(required: string[], available: string[]): number {
    if (required.length === 0) return 1.0;

    const matchedSkills = required.filter(skill =>
      available.some(
        availableSkill =>
          availableSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(availableSkill.toLowerCase())
      )
    );

    return matchedSkills.length / required.length;
  }

  /**
   * Estimate completion time based on developer history
   */
  private estimateCompletionTime(task: TaskRequirements, dev: DeveloperProfile): number {
    const baseTime = task.timeline;
    const devEfficiency = dev.averageCompletionTime / baseTime;

    // Adjust based on complexity and developer rating
    let adjustedTime = baseTime * devEfficiency;

    if (task.complexity === 'expert' && dev.sqlLevel === 'VIP') {
      adjustedTime *= 0.8; // Expert devs are faster on complex tasks
    } else if (task.complexity === 'basic' && dev.sqlLevel === 'High') {
      adjustedTime *= 0.9; // High-level devs are faster on basic tasks
    }

    return Math.ceil(adjustedTime);
  }

  /**
   * Calculate proposed rate based on task and developer
   */
  private calculateProposedRate(task: TaskRequirements, dev: DeveloperProfile): number {
    let baseRate = dev.hourlyRate;

    // Adjust for complexity
    switch (task.complexity) {
      case 'expert':
        baseRate *= 1.5;
        break;
      case 'advanced':
        baseRate *= 1.3;
        break;
      case 'intermediate':
        baseRate *= 1.1;
        break;
      case 'basic':
        baseRate *= 0.9;
        break;
    }

    // Adjust for urgency
    if (task.timeline < 7) {
      baseRate *= 1.2; // Rush fee
    }

    return Math.round(baseRate);
  }

  /**
   * Assess risk level of working with this developer
   */
  private assessRiskLevel(dev: DeveloperProfile): 'low' | 'medium' | 'high' {
    if (dev.successRate >= 95 && dev.rating >= 4.5) return 'low';
    if (dev.successRate >= 85 && dev.rating >= 4.0) return 'medium';
    return 'high';
  }

  /**
   * Generate match reasons for transparency
   */
  private getMatchReasons(task: TaskRequirements, dev: DeveloperProfile): string[] {
    const reasons: string[] = [];

    // SQL Level
    if (dev.sqlLevel === task.preferredSQL) {
      reasons.push(`Perfect SQL level match (${dev.sqlLevel})`);
    } else if (this.getSQLMatchScore(task.preferredSQL, dev.sqlLevel) > 0.7) {
      reasons.push(`Good SQL level compatibility (${dev.sqlLevel})`);
    }

    // Skills
    const skillMatch = this.calculateSkillMatch(task.requiredSkills, dev.skills);
    if (skillMatch >= 0.8) {
      reasons.push(`Excellent skill match (${Math.round(skillMatch * 100)}%)`);
    } else if (skillMatch >= 0.6) {
      reasons.push(`Good skill match (${Math.round(skillMatch * 100)}%)`);
    }

    // Performance
    if (dev.rating >= 4.5) {
      reasons.push(`High rating (${dev.rating}/5)`);
    }
    if (dev.successRate >= 90) {
      reasons.push(`Excellent success rate (${dev.successRate}%)`);
    }

    // Experience
    if (dev.completedTasks >= 50) {
      reasons.push(`Experienced developer (${dev.completedTasks} tasks completed)`);
    }

    return reasons;
  }

  /**
   * Generate recommendations for the match
   */
  private generateRecommendations(task: TaskRequirements, dev: DeveloperProfile): string[] {
    const recommendations: string[] = [];

    // Timeline recommendations
    const estimatedTime = this.estimateCompletionTime(task, dev);
    if (estimatedTime > task.timeline) {
      recommendations.push(`Consider extending timeline by ${estimatedTime - task.timeline} days`);
    }

    // Budget recommendations
    const proposedRate = this.calculateProposedRate(task, dev);
    if (proposedRate > task.budget) {
      recommendations.push(`Budget may need adjustment (proposed: ${proposedRate} EHBGC)`);
    }

    // Risk mitigation
    if (this.assessRiskLevel(dev) === 'medium') {
      recommendations.push('Consider milestone-based payments for risk mitigation');
    }

    // Communication
    if (task.language && !dev.languages.includes(task.language)) {
      recommendations.push('Ensure clear communication plan due to language difference');
    }

    return recommendations;
  }

  /**
   * Load developers from database (mock data for now)
   */
  private loadDevelopers(): void {
    this.developers = [
      {
        id: 'dev_001',
        name: 'Ahmed Khan',
        email: 'ahmed@ehb.dev',
        sqlLevel: 'VIP',
        skills: ['React', 'Node.js', 'Python', 'AI/ML', 'Blockchain'],
        rating: 4.8,
        completedTasks: 127,
        successRate: 98,
        averageCompletionTime: 3.2,
        availability: true,
        hourlyRate: 50,
        location: 'Karachi, Pakistan',
        languages: ['English', 'Urdu'],
        portfolio: ['https://github.com/ahmedkhan', 'https://ahmed.dev'],
        verified: true,
        lastActive: new Date(),
      },
      {
        id: 'dev_002',
        name: 'Sarah Chen',
        email: 'sarah@ehb.dev',
        sqlLevel: 'High',
        skills: ['Vue.js', 'PHP', 'MySQL', 'DevOps', 'Mobile'],
        rating: 4.6,
        completedTasks: 89,
        successRate: 94,
        averageCompletionTime: 4.1,
        availability: true,
        hourlyRate: 35,
        location: 'Lahore, Pakistan',
        languages: ['English', 'Chinese'],
        portfolio: ['https://github.com/sarahchen'],
        verified: true,
        lastActive: new Date(),
      },
      {
        id: 'dev_003',
        name: 'Muhammad Ali',
        email: 'mali@ehb.dev',
        sqlLevel: 'Normal',
        skills: ['JavaScript', 'HTML/CSS', 'WordPress', 'SEO'],
        rating: 4.2,
        completedTasks: 45,
        successRate: 88,
        averageCompletionTime: 5.5,
        availability: true,
        hourlyRate: 20,
        location: 'Islamabad, Pakistan',
        languages: ['English', 'Urdu', 'Arabic'],
        portfolio: ['https://github.com/mali'],
        verified: true,
        lastActive: new Date(),
      },
    ];
  }

  /**
   * Update developer availability
   */
  async updateDeveloperAvailability(developerId: string, available: boolean): Promise<void> {
    const dev = this.developers.find(d => d.id === developerId);
    if (dev) {
      dev.availability = available;
      console.log(`📊 DevMatchAgent: Updated ${dev.name} availability to ${available}`);
    }
  }

  /**
   * Get developer profile by ID
   */
  async getDeveloperProfile(developerId: string): Promise<DeveloperProfile | null> {
    return this.developers.find(d => d.id === developerId) || null;
  }

  /**
   * Add new developer to the system
   */
  async addDeveloper(developer: Omit<DeveloperProfile, 'id'>): Promise<string> {
    const newId = `dev_${Date.now()}`;
    const newDeveloper: DeveloperProfile = {
      ...developer,
      id: newId,
    };

    this.developers.push(newDeveloper);
    console.log(`👨‍💻 DevMatchAgent: Added new developer ${developer.name}`);

    return newId;
  }
}

export default DevMatchAgent;
