/**
 * CodeCheckAgent - Automatically review submitted code and test its quality
 *
 * Purpose: Reviews code submissions for:
 * - Code quality and best practices
 * - Security vulnerabilities
 * - Performance issues
 * - Test coverage
 * - Documentation quality
 *
 * @author EHB AI System
 * @version 1.0.0
 */

export interface CodeSubmission {
  id: string;
  developerId: string;
  taskId: string;
  repositoryUrl?: string;
  zipFileUrl?: string;
  codeFiles: CodeFile[];
  language: string;
  framework?: string;
  description: string;
  submittedAt: Date;
}

export interface CodeFile {
  name: string;
  path: string;
  content: string;
  language: string;
  size: number;
}

export interface CodeReviewResult {
  submissionId: string;
  overallScore: number; // 0-100
  status: 'approved' | 'rejected' | 'needs_revision';
  categories: {
    codeQuality: ReviewCategory;
    security: ReviewCategory;
    performance: ReviewCategory;
    testing: ReviewCategory;
    documentation: ReviewCategory;
  };
  issues: CodeIssue[];
  suggestions: string[];
  estimatedRefactorTime: number; // hours
  aiRecommendations: string[];
  passedTests: number;
  totalTests: number;
  coverage: number; // percentage
}

export interface ReviewCategory {
  score: number; // 0-100
  issues: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string[];
}

export interface CodeIssue {
  id: string;
  type: 'error' | 'warning' | 'info' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  file: string;
  line: number;
  column: number;
  message: string;
  suggestion: string;
  rule: string;
}

export class CodeCheckAgent {
  private supportedLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'php',
    'ruby',
    'go',
    'rust',
    'swift',
    'kotlin',
  ];

  private securityRules = [
    'sql_injection',
    'xss_vulnerability',
    'authentication_bypass',
    'insecure_deserialization',
    'sensitive_data_exposure',
    'broken_access_control',
  ];

  constructor() {
    console.log('🤖 CodeCheckAgent initialized');
  }

  /**
   * Main review function - analyzes code submission
   */
  async reviewCode(submission: CodeSubmission): Promise<CodeReviewResult> {
    console.log(`🔍 CodeCheckAgent: Reviewing submission ${submission.id}`);

    const startTime = Date.now();

    // Initialize review result
    const result: CodeReviewResult = {
      submissionId: submission.id,
      overallScore: 0,
      status: 'needs_revision',
      categories: {
        codeQuality: { score: 0, issues: 0, severity: 'low', details: [] },
        security: { score: 0, issues: 0, severity: 'low', details: [] },
        performance: { score: 0, issues: 0, severity: 'low', details: [] },
        testing: { score: 0, issues: 0, severity: 'low', details: [] },
        documentation: { score: 0, issues: 0, severity: 'low', details: [] },
      },
      issues: [],
      suggestions: [],
      estimatedRefactorTime: 0,
      aiRecommendations: [],
      passedTests: 0,
      totalTests: 0,
      coverage: 0,
    };

    try {
      // Run all analysis categories
      await Promise.all([
        this.analyzeCodeQuality(submission, result),
        this.analyzeSecurity(submission, result),
        this.analyzePerformance(submission, result),
        this.analyzeTesting(submission, result),
        this.analyzeDocumentation(submission, result),
      ]);

      // Calculate overall score
      result.overallScore = this.calculateOverallScore(result.categories);

      // Determine status
      result.status = this.determineStatus(result);

      // Generate AI recommendations
      result.aiRecommendations = this.generateAIRecommendations(result);

      // Estimate refactor time
      result.estimatedRefactorTime = this.estimateRefactorTime(result.issues);

      const duration = Date.now() - startTime;
      console.log(
        `✅ CodeCheckAgent: Review completed in ${duration}ms. Score: ${result.overallScore}/100`
      );

      return result;
    } catch (error) {
      console.error('❌ CodeCheckAgent: Review failed', error);
      throw new Error(`Code review failed: ${error}`);
    }
  }

  /**
   * Analyze code quality (structure, readability, best practices)
   */
  private async analyzeCodeQuality(
    submission: CodeSubmission,
    result: CodeReviewResult
  ): Promise<void> {
    const issues: CodeIssue[] = [];
    let score = 100;

    for (const file of submission.codeFiles) {
      // Check file naming conventions
      if (!this.isValidFileName(file.name)) {
        issues.push({
          id: `quality_${Date.now()}_${Math.random()}`,
          type: 'warning',
          severity: 'low',
          file: file.path,
          line: 1,
          column: 1,
          message: 'File naming does not follow conventions',
          suggestion: 'Use kebab-case or camelCase naming',
          rule: 'naming_convention',
        });
        score -= 2;
      }

      // Check code complexity
      const complexity = this.calculateComplexity(file.content);
      if (complexity > 10) {
        issues.push({
          id: `quality_${Date.now()}_${Math.random()}`,
          type: 'warning',
          severity: 'medium',
          file: file.path,
          line: 1,
          column: 1,
          message: `High cyclomatic complexity (${complexity})`,
          suggestion: 'Consider breaking down complex functions',
          rule: 'complexity',
        });
        score -= 5;
      }

      // Check for code smells
      const smells = this.detectCodeSmells(file.content);
      smells.forEach(smell => {
        issues.push({
          id: `quality_${Date.now()}_${Math.random()}`,
          type: 'warning',
          severity: 'medium',
          file: file.path,
          line: smell.line,
          column: smell.column,
          message: smell.message,
          suggestion: smell.suggestion,
          rule: 'code_smell',
        });
        score -= 3;
      });
    }

    result.categories.codeQuality = {
      score: Math.max(0, score),
      issues: issues.length,
      severity: this.getSeverity(score),
      details: issues.map(i => `${i.file}:${i.line} - ${i.message}`),
    };

    result.issues.push(...issues);
  }

  /**
   * Analyze security vulnerabilities
   */
  private async analyzeSecurity(
    submission: CodeSubmission,
    result: CodeReviewResult
  ): Promise<void> {
    const issues: CodeIssue[] = [];
    let score = 100;

    for (const file of submission.codeFiles) {
      // Check for SQL injection
      if (this.detectSQLInjection(file.content)) {
        issues.push({
          id: `security_${Date.now()}_${Math.random()}`,
          type: 'error',
          severity: 'critical',
          file: file.path,
          line: this.findLineNumber(file.content, 'sql'),
          column: 1,
          message: 'Potential SQL injection vulnerability',
          suggestion: 'Use parameterized queries or ORM',
          rule: 'sql_injection',
        });
        score -= 20;
      }

      // Check for XSS vulnerabilities
      if (this.detectXSS(file.content)) {
        issues.push({
          id: `security_${Date.now()}_${Math.random()}`,
          type: 'error',
          severity: 'high',
          file: file.path,
          line: this.findLineNumber(file.content, 'xss'),
          column: 1,
          message: 'Potential XSS vulnerability',
          suggestion: 'Sanitize user input before rendering',
          rule: 'xss_vulnerability',
        });
        score -= 15;
      }

      // Check for hardcoded secrets
      const secrets = this.detectHardcodedSecrets(file.content);
      secrets.forEach(secret => {
        issues.push({
          id: `security_${Date.now()}_${Math.random()}`,
          type: 'error',
          severity: 'high',
          file: file.path,
          line: secret.line,
          column: secret.column,
          message: 'Hardcoded secret detected',
          suggestion: 'Use environment variables or secure vault',
          rule: 'hardcoded_secret',
        });
        score -= 10;
      });
    }

    result.categories.security = {
      score: Math.max(0, score),
      issues: issues.length,
      severity: this.getSeverity(score),
      details: issues.map(i => `${i.file}:${i.line} - ${i.message}`),
    };

    result.issues.push(...issues);
  }

  /**
   * Analyze performance issues
   */
  private async analyzePerformance(
    submission: CodeSubmission,
    result: CodeReviewResult
  ): Promise<void> {
    const issues: CodeIssue[] = [];
    let score = 100;

    for (const file of submission.codeFiles) {
      // Check for inefficient algorithms
      if (this.detectInefficientAlgorithms(file.content)) {
        issues.push({
          id: `perf_${Date.now()}_${Math.random()}`,
          type: 'warning',
          severity: 'medium',
          file: file.path,
          line: 1,
          column: 1,
          message: 'Inefficient algorithm detected',
          suggestion: 'Consider using more efficient data structures',
          rule: 'inefficient_algorithm',
        });
        score -= 8;
      }

      // Check for memory leaks
      if (this.detectMemoryLeaks(file.content)) {
        issues.push({
          id: `perf_${Date.now()}_${Math.random()}`,
          type: 'warning',
          severity: 'high',
          file: file.path,
          line: 1,
          column: 1,
          message: 'Potential memory leak detected',
          suggestion: 'Ensure proper resource cleanup',
          rule: 'memory_leak',
        });
        score -= 12;
      }
    }

    result.categories.performance = {
      score: Math.max(0, score),
      issues: issues.length,
      severity: this.getSeverity(score),
      details: issues.map(i => `${i.file}:${i.line} - ${i.message}`),
    };

    result.issues.push(...issues);
  }

  /**
   * Analyze testing coverage and quality
   */
  private async analyzeTesting(
    submission: CodeSubmission,
    result: CodeReviewResult
  ): Promise<void> {
    const testFiles = submission.codeFiles.filter(
      f => f.name.includes('test') || f.name.includes('spec') || f.path.includes('test')
    );

    let score = 100;
    const issues: CodeIssue[] = [];

    // Check test coverage
    if (testFiles.length === 0) {
      issues.push({
        id: `test_${Date.now()}_${Math.random()}`,
        type: 'error',
        severity: 'high',
        file: 'N/A',
        line: 1,
        column: 1,
        message: 'No test files found',
        suggestion: 'Add unit tests and integration tests',
        rule: 'no_tests',
      });
      score -= 30;
    } else {
      // Analyze test quality
      const testQuality = this.analyzeTestQuality(testFiles);
      score -= testQuality.deductions;

      result.passedTests = testQuality.passedTests;
      result.totalTests = testQuality.totalTests;
      result.coverage = testQuality.coverage;
    }

    result.categories.testing = {
      score: Math.max(0, score),
      issues: issues.length,
      severity: this.getSeverity(score),
      details: issues.map(i => `${i.file}:${i.line} - ${i.message}`),
    };

    result.issues.push(...issues);
  }

  /**
   * Analyze documentation quality
   */
  private async analyzeDocumentation(
    submission: CodeSubmission,
    result: CodeReviewResult
  ): Promise<void> {
    const docFiles = submission.codeFiles.filter(
      f => f.name.includes('README') || f.name.includes('docs') || f.name.includes('.md')
    );

    let score = 100;
    const issues: CodeIssue[] = [];

    // Check for README
    if (!docFiles.some(f => f.name.toLowerCase().includes('readme'))) {
      issues.push({
        id: `doc_${Date.now()}_${Math.random()}`,
        type: 'warning',
        severity: 'medium',
        file: 'N/A',
        line: 1,
        column: 1,
        message: 'No README file found',
        suggestion: 'Add comprehensive README with setup instructions',
        rule: 'no_readme',
      });
      score -= 15;
    }

    // Check code comments
    const commentRatio = this.calculateCommentRatio(submission.codeFiles);
    if (commentRatio < 0.1) {
      issues.push({
        id: `doc_${Date.now()}_${Math.random()}`,
        type: 'warning',
        severity: 'low',
        file: 'N/A',
        line: 1,
        column: 1,
        message: 'Low code documentation',
        suggestion: 'Add more inline comments and documentation',
        rule: 'low_documentation',
      });
      score -= 10;
    }

    result.categories.documentation = {
      score: Math.max(0, score),
      issues: issues.length,
      severity: this.getSeverity(score),
      details: issues.map(i => `${i.file}:${i.line} - ${i.message}`),
    };

    result.issues.push(...issues);
  }

  /**
   * Calculate overall score from all categories
   */
  private calculateOverallScore(categories: CodeReviewResult['categories']): number {
    const weights = {
      codeQuality: 0.25,
      security: 0.3,
      performance: 0.2,
      testing: 0.15,
      documentation: 0.1,
    };

    return Math.round(
      categories.codeQuality.score * weights.codeQuality +
        categories.security.score * weights.security +
        categories.performance.score * weights.performance +
        categories.testing.score * weights.testing +
        categories.documentation.score * weights.documentation
    );
  }

  /**
   * Determine final status based on scores and critical issues
   */
  private determineStatus(result: CodeReviewResult): 'approved' | 'rejected' | 'needs_revision' {
    const criticalIssues = result.issues.filter(i => i.severity === 'critical');
    const highIssues = result.issues.filter(i => i.severity === 'high');

    if (criticalIssues.length > 0) {
      return 'rejected';
    }

    if (result.overallScore >= 80 && highIssues.length === 0) {
      return 'approved';
    }

    return 'needs_revision';
  }

  /**
   * Generate AI-powered recommendations
   */
  private generateAIRecommendations(result: CodeReviewResult): string[] {
    const recommendations: string[] = [];

    if (result.categories.security.score < 70) {
      recommendations.push('🔒 Prioritize security fixes before deployment');
    }

    if (result.categories.testing.score < 60) {
      recommendations.push('🧪 Add comprehensive test coverage for reliability');
    }

    if (result.categories.performance.score < 70) {
      recommendations.push('⚡ Optimize performance-critical sections');
    }

    if (result.estimatedRefactorTime > 8) {
      recommendations.push('⏰ Consider breaking refactoring into smaller tasks');
    }

    if (result.overallScore < 60) {
      recommendations.push('🔄 Major refactoring recommended before approval');
    }

    return recommendations;
  }

  /**
   * Estimate refactoring time based on issues
   */
  private estimateRefactorTime(issues: CodeIssue[]): number {
    let totalHours = 0;

    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          totalHours += 4;
          break;
        case 'high':
          totalHours += 2;
          break;
        case 'medium':
          totalHours += 1;
          break;
        case 'low':
          totalHours += 0.5;
          break;
      }
    });

    return Math.ceil(totalHours);
  }

  // Helper methods for code analysis
  private isValidFileName(name: string): boolean {
    return /^[a-zA-Z0-9\-_\.]+$/.test(name);
  }

  private calculateComplexity(content: string): number {
    // Simplified cyclomatic complexity calculation
    const complexityKeywords = [
      'if',
      'else',
      'for',
      'while',
      'switch',
      'case',
      'catch',
      '&&',
      '||',
    ];
    let complexity = 1;

    complexityKeywords.forEach(keyword => {
      const matches = content.match(new RegExp(keyword, 'gi'));
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }

  private detectCodeSmells(
    content: string
  ): Array<{ line: number; column: number; message: string; suggestion: string }> {
    const smells: Array<{ line: number; column: number; message: string; suggestion: string }> = [];

    // Detect long functions
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.length > 120) {
        smells.push({
          line: index + 1,
          column: 1,
          message: 'Long line detected',
          suggestion: 'Break into multiple lines for readability',
        });
      }
    });

    return smells;
  }

  private detectSQLInjection(content: string): boolean {
    const patterns = [
      /query\s*\(\s*['"`].*\$.*['"`]/i,
      /execute\s*\(\s*['"`].*\$.*['"`]/i,
      /sql\s*\+.*userInput/i,
    ];

    return patterns.some(pattern => pattern.test(content));
  }

  private detectXSS(content: string): boolean {
    const patterns = [
      /innerHTML\s*=\s*.*userInput/i,
      /document\.write\s*\(\s*.*userInput/i,
      /eval\s*\(\s*.*userInput/i,
    ];

    return patterns.some(pattern => pattern.test(content));
  }

  private detectHardcodedSecrets(content: string): Array<{ line: number; column: number }> {
    const secrets: Array<{ line: number; column: number }> = [];
    const patterns = [
      /password\s*=\s*['"`][^'"`]+['"`]/i,
      /api_key\s*=\s*['"`][^'"`]+['"`]/i,
      /secret\s*=\s*['"`][^'"`]+['"`]/i,
    ];

    const lines = content.split('\n');
    lines.forEach((line, index) => {
      patterns.forEach(pattern => {
        if (pattern.test(line)) {
          secrets.push({
            line: index + 1,
            column: line.indexOf('=') + 1,
          });
        }
      });
    });

    return secrets;
  }

  private detectInefficientAlgorithms(content: string): boolean {
    const patterns = [
      /for\s*\(.*for\s*\(.*for\s*\(/i, // Triple nested loops
      /O\(n\^3\)/i,
      /bubble\s*sort/i,
      /selection\s*sort/i,
    ];

    return patterns.some(pattern => pattern.test(content));
  }

  private detectMemoryLeaks(content: string): boolean {
    const patterns = [
      /setInterval\s*\([^)]+\)\s*[^;]*$/m,
      /addEventListener\s*\([^)]+\)\s*[^;]*$/m,
      /new\s+EventEmitter\s*\(\)/i,
    ];

    return patterns.some(pattern => pattern.test(content));
  }

  private analyzeTestQuality(testFiles: CodeFile[]): {
    passedTests: number;
    totalTests: number;
    coverage: number;
    deductions: number;
  } {
    let passedTests = 0;
    let totalTests = 0;
    let deductions = 0;

    testFiles.forEach(file => {
      const testMatches = file.content.match(/test\s*\(/gi);
      const expectMatches = file.content.match(/expect\s*\(/gi);

      if (testMatches) {
        totalTests += testMatches.length;
        passedTests += Math.floor(testMatches.length * 0.8); // Assume 80% pass rate
      }

      if (expectMatches) {
        deductions += Math.max(0, 10 - expectMatches.length); // Penalize low assertions
      }
    });

    const coverage = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return { passedTests, totalTests, coverage, deductions };
  }

  private calculateCommentRatio(files: CodeFile[]): number {
    let totalLines = 0;
    let commentLines = 0;

    files.forEach(file => {
      const lines = file.content.split('\n');
      totalLines += lines.length;

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
          commentLines++;
        }
      });
    });

    return totalLines > 0 ? commentLines / totalLines : 0;
  }

  private findLineNumber(content: string, pattern: string): number {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(pattern)) {
        return i + 1;
      }
    }
    return 1;
  }

  private getSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'high';
    return 'critical';
  }
}

export default CodeCheckAgent;
