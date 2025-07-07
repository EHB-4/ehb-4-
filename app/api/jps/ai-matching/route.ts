// Roman Urdu: JPS AI Matching API Route
// Candidates aur jobs ke beech compatibility score calculate karta hai

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Roman Urdu: AI Matching Request Schema
const MatchingRequestSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  candidateId: z.string().min(1, 'Candidate ID is required'),
});

// Roman Urdu: Mock data (replace with database calls)
const jobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    skills: ['React', 'TypeScript', 'Node.js', 'JavaScript', 'HTML', 'CSS'],
    salary: 150000,
    location: 'Karachi, Pakistan',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Digital Solutions',
    requirements: ['JavaScript', 'Python', 'Django', '3+ years experience'],
    skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL', 'HTML', 'CSS'],
    salary: 120000,
    location: 'Lahore, Pakistan',
  },
];

const candidates = [
  {
    id: '1',
    name: 'Ahmed Khan',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'JavaScript'],
    sqlLevel: 3,
    experience: 5,
    preferredLocation: 'Karachi, Pakistan',
    expectedSalary: 140000,
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL', 'HTML'],
    sqlLevel: 2,
    experience: 3,
    preferredLocation: 'Lahore, Pakistan',
    expectedSalary: 110000,
  },
];

// Roman Urdu: AI Matching Algorithm
class AIMatchingEngine {
  // Roman Urdu: Calculate skill compatibility
  static calculateSkillCompatibility(jobSkills: string[], candidateSkills: string[]): number {
    if (jobSkills.length === 0) return 0;

    const matchingSkills = jobSkills.filter(skill =>
      candidateSkills.some(
        candidateSkill =>
          candidateSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(candidateSkill.toLowerCase())
      )
    );

    return (matchingSkills.length / jobSkills.length) * 100;
  }

  // Roman Urdu: Calculate experience compatibility
  static calculateExperienceCompatibility(
    jobRequirements: string[],
    candidateExperience: number
  ): number {
    const experienceRequirement = jobRequirements.find(req => req.includes('years'));
    if (!experienceRequirement) return 80; // Default score if no experience requirement

    const match = experienceRequirement.match(/(\d+)/);
    const requiredYears = match ? parseInt(match[1]) : 0;
    if (candidateExperience >= requiredYears) {
      return 100;
    } else if (candidateExperience >= requiredYears * 0.8) {
      return 90;
    } else if (candidateExperience >= requiredYears * 0.6) {
      return 70;
    } else {
      return Math.max(30, (candidateExperience / requiredYears) * 100);
    }
  }

  // Roman Urdu: Calculate location compatibility
  static calculateLocationCompatibility(jobLocation: string, candidateLocation: string): number {
    const jobCity = jobLocation.split(',')[0]?.trim().toLowerCase() || '';
    const candidateCity = candidateLocation.split(',')[0]?.trim().toLowerCase() || '';

    if (jobCity === candidateCity) {
      return 100;
    } else if (jobCity.includes(candidateCity) || candidateCity.includes(jobCity)) {
      return 80;
    } else {
      return 50; // Different cities
    }
  }

  // Roman Urdu: Calculate salary compatibility
  static calculateSalaryCompatibility(jobSalary: number, candidateExpectedSalary: number): number {
    const difference = Math.abs(jobSalary - candidateExpectedSalary);
    const percentage = (difference / jobSalary) * 100;

    if (percentage <= 10) return 100;
    if (percentage <= 20) return 90;
    if (percentage <= 30) return 70;
    if (percentage <= 50) return 50;
    return 30;
  }

  // Roman Urdu: Calculate SQL Level compatibility
  static calculateSQLLevelCompatibility(candidateSQLLevel: number): number {
    // Higher SQL Level = Lower commission rate = Better for company
    const levelScores = [80, 85, 90, 95, 100]; // Level 0-4
    return levelScores[candidateSQLLevel] || 80;
  }

  // Roman Urdu: Calculate overall compatibility score
  static calculateOverallScore(
    skillScore: number,
    experienceScore: number,
    locationScore: number,
    salaryScore: number,
    sqlLevelScore: number
  ): number {
    const weights = {
      skills: 0.35,
      experience: 0.25,
      location: 0.15,
      salary: 0.15,
      sqlLevel: 0.1,
    };

    return (
      skillScore * weights.skills +
      experienceScore * weights.experience +
      locationScore * weights.location +
      salaryScore * weights.salary +
      sqlLevelScore * weights.sqlLevel
    );
  }

  // Roman Urdu: Get detailed matching analysis
  static getMatchingAnalysis(jobId: string, candidateId: string) {
    const job = jobs.find(j => j.id === jobId);
    const candidate = candidates.find(c => c.id === candidateId);

    if (!job || !candidate) {
      throw new Error('Job or candidate not found');
    }

    const skillScore = this.calculateSkillCompatibility(job.skills, candidate.skills);
    const experienceScore = this.calculateExperienceCompatibility(
      job.requirements,
      candidate.experience
    );
    const locationScore = this.calculateLocationCompatibility(
      job.location,
      candidate.preferredLocation
    );
    const salaryScore = this.calculateSalaryCompatibility(job.salary, candidate.expectedSalary);
    const sqlLevelScore = this.calculateSQLLevelCompatibility(candidate.sqlLevel);

    const overallScore = this.calculateOverallScore(
      skillScore,
      experienceScore,
      locationScore,
      salaryScore,
      sqlLevelScore
    );

    return {
      jobId,
      candidateId,
      overallScore: Math.round(overallScore),
      breakdown: {
        skills: Math.round(skillScore),
        experience: Math.round(experienceScore),
        location: Math.round(locationScore),
        salary: Math.round(salaryScore),
        sqlLevel: Math.round(sqlLevelScore),
      },
      details: {
        matchingSkills: job.skills.filter(skill =>
          candidate.skills.some(
            candidateSkill =>
              candidateSkill.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(candidateSkill.toLowerCase())
          )
        ),
        missingSkills: job.skills.filter(
          skill =>
            !candidate.skills.some(
              candidateSkill =>
                candidateSkill.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(candidateSkill.toLowerCase())
            )
        ),
        recommendations: this.generateRecommendations(overallScore, skillScore, experienceScore),
      },
    };
  }

  // Roman Urdu: Generate recommendations
  static generateRecommendations(
    overallScore: number,
    skillScore: number,
    experienceScore: number
  ): string[] {
    const recommendations = [];

    if (overallScore >= 90) {
      recommendations.push('Excellent match! Strongly recommend for immediate interview.');
    } else if (overallScore >= 80) {
      recommendations.push('Good match. Recommend for interview with minor considerations.');
    } else if (overallScore >= 70) {
      recommendations.push(
        'Moderate match. Consider for interview if other candidates are limited.'
      );
    } else {
      recommendations.push('Poor match. Not recommended for this position.');
    }

    if (skillScore < 70) {
      recommendations.push('Consider additional training in required skills.');
    }

    if (experienceScore < 70) {
      recommendations.push('May need mentorship or junior role consideration.');
    }

    return recommendations;
  }
}

// Roman Urdu: GET - Get compatibility score
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const candidateId = searchParams.get('candidateId');

    if (!jobId || !candidateId) {
      return NextResponse.json(
        {
          error: 'Both jobId and candidateId parameters are required',
        },
        { status: 400 }
      );
    }

    const analysis = AIMatchingEngine.getMatchingAnalysis(jobId, candidateId);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI Matching GET Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Roman Urdu: POST - Get multiple matches
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, limit = 5 } = body;

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
    }

    // Roman Urdu: Get all candidates and calculate scores
    const matches = candidates
      .map(candidate => {
        try {
          const analysis = AIMatchingEngine.getMatchingAnalysis(jobId, candidate.id);
          return {
            candidate,
            ...analysis,
          };
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);

    // Roman Urdu: Sort by score and limit results
    const sortedMatches = matches
      .sort((a, b) => (b?.overallScore || 0) - (a?.overallScore || 0))
      .slice(0, limit);

    return NextResponse.json({
      jobId,
      totalCandidates: candidates.length,
      matches: sortedMatches,
    });
  } catch (error) {
    console.error('AI Matching POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
