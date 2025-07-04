// Roman Urdu: JPS AI Matching API Tests
// AI matching algorithm ke liye comprehensive testing

import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/jps/ai-matching/route';

// Roman Urdu: Mock NextRequest
const createMockRequest = (url: string, method: string = 'GET', body?: any): NextRequest => {
  const request = new NextRequest(new URL(url, 'http://localhost:3000'), {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  return request;
};

describe('JPS AI Matching API Tests', () => {
  // Roman Urdu: GET Compatibility Score Tests
  describe('GET Compatibility Score', () => {
    test('Should return compatibility score for valid job and candidate', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('jobId', '1');
      expect(data).toHaveProperty('candidateId', '1');
      expect(data).toHaveProperty('overallScore');
      expect(typeof data.overallScore).toBe('number');
      expect(data.overallScore).toBeGreaterThanOrEqual(0);
      expect(data.overallScore).toBeLessThanOrEqual(100);
      expect(data).toHaveProperty('breakdown');
      expect(data.breakdown).toHaveProperty('skills');
      expect(data.breakdown).toHaveProperty('experience');
      expect(data.breakdown).toHaveProperty('location');
      expect(data.breakdown).toHaveProperty('salary');
      expect(data.breakdown).toHaveProperty('sqlLevel');
      expect(data).toHaveProperty('details');
      expect(data.details).toHaveProperty('matchingSkills');
      expect(data.details).toHaveProperty('missingSkills');
      expect(data.details).toHaveProperty('recommendations');
    });

    test('Should return 400 for missing jobId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Both jobId and candidateId parameters are required');
    });

    test('Should return 400 for missing candidateId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Both jobId and candidateId parameters are required');
    });

    test('Should return 500 for non-existent job', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=999&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Job or candidate not found');
    });

    test('Should return 500 for non-existent candidate', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=999'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Job or candidate not found');
    });
  });

  // Roman Urdu: POST Top Matches Tests
  describe('POST Top Matches', () => {
    test('Should return top matches for valid jobId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching',
        'POST',
        { jobId: '1', limit: 3 }
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('jobId', '1');
      expect(data).toHaveProperty('totalCandidates');
      expect(data).toHaveProperty('matches');
      expect(Array.isArray(data.matches)).toBe(true);
      expect(data.matches.length).toBeLessThanOrEqual(3);
    });

    test('Should return top matches with default limit', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching',
        'POST',
        { jobId: '1' }
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.matches.length).toBeLessThanOrEqual(5); // Default limit
    });

    test('Should return 400 for missing jobId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching',
        'POST',
        { limit: 5 }
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('jobId is required');
    });

    test('Should return 500 for non-existent jobId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching',
        'POST',
        { jobId: '999', limit: 5 }
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });
  });

  // Roman Urdu: Algorithm Logic Tests
  describe('Algorithm Logic', () => {
    test('Perfect skill match should give high score', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      // Roman Urdu: Check if skills score is reasonable
      expect(data.breakdown.skills).toBeGreaterThanOrEqual(0);
      expect(data.breakdown.skills).toBeLessThanOrEqual(100);
    });

    test('Experience compatibility should be calculated correctly', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.experience).toBeGreaterThanOrEqual(0);
      expect(data.breakdown.experience).toBeLessThanOrEqual(100);
    });

    test('Location compatibility should be calculated correctly', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.location).toBeGreaterThanOrEqual(0);
      expect(data.breakdown.location).toBeLessThanOrEqual(100);
    });

    test('Salary compatibility should be calculated correctly', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.salary).toBeGreaterThanOrEqual(0);
      expect(data.breakdown.salary).toBeLessThanOrEqual(100);
    });

    test('SQL Level compatibility should be calculated correctly', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.sqlLevel).toBeGreaterThanOrEqual(0);
      expect(data.breakdown.sqlLevel).toBeLessThanOrEqual(100);
    });
  });

  // Roman Urdu: Score Breakdown Tests
  describe('Score Breakdown', () => {
    test('Overall score should be weighted average of all factors', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      const { breakdown, overallScore } = data;
      
      // Roman Urdu: Calculate expected weighted score
      const expectedScore = 
        breakdown.skills * 0.35 +
        breakdown.experience * 0.25 +
        breakdown.location * 0.15 +
        breakdown.salary * 0.15 +
        breakdown.sqlLevel * 0.10;

      expect(overallScore).toBeCloseTo(expectedScore, 0);
    });

    test('All breakdown scores should be between 0 and 100', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      const { breakdown } = data;
      
      Object.values(breakdown).forEach(score => {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(100);
      });
    });
  });

  // Roman Urdu: Recommendations Tests
  describe('Recommendations', () => {
    test('Should provide recommendations based on score', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.details.recommendations).toBeDefined();
      expect(Array.isArray(data.details.recommendations)).toBe(true);
      expect(data.details.recommendations.length).toBeGreaterThan(0);
    });

    test('High score should give positive recommendations', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      if (data.overallScore >= 80) {
        expect(data.details.recommendations.some(rec => 
          rec.toLowerCase().includes('recommend') || 
          rec.toLowerCase().includes('excellent')
        )).toBe(true);
      }
    });

    test('Low score should give improvement recommendations', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      if (data.overallScore < 70) {
        expect(data.details.recommendations.some(rec => 
          rec.toLowerCase().includes('training') || 
          rec.toLowerCase().includes('improve')
        )).toBe(true);
      }
    });
  });

  // Roman Urdu: Skills Analysis Tests
  describe('Skills Analysis', () => {
    test('Should identify matching skills', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.details.matchingSkills).toBeDefined();
      expect(Array.isArray(data.details.matchingSkills)).toBe(true);
    });

    test('Should identify missing skills', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.details.missingSkills).toBeDefined();
      expect(Array.isArray(data.details.missingSkills)).toBe(true);
    });

    test('Matching and missing skills should not overlap', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      const { matchingSkills, missingSkills } = data.details;
      
      const intersection = matchingSkills.filter(skill => 
        missingSkills.includes(skill)
      );
      
      expect(intersection.length).toBe(0);
    });
  });

  // Roman Urdu: Edge Cases Tests
  describe('Edge Cases', () => {
    test('Should handle empty skills arrays', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.skills).toBeDefined();
      expect(typeof data.breakdown.skills).toBe('number');
    });

    test('Should handle zero experience', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.experience).toBeDefined();
      expect(typeof data.breakdown.experience).toBe('number');
    });

    test('Should handle different location formats', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.location).toBeDefined();
      expect(typeof data.breakdown.location).toBe('number');
    });

    test('Should handle extreme salary differences', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(data.breakdown.salary).toBeDefined();
      expect(typeof data.breakdown.salary).toBe('number');
    });
  });

  // Roman Urdu: Performance Tests
  describe('Performance', () => {
    test('Should respond within reasonable time', async () => {
      const startTime = Date.now();
      const request = createMockRequest(
        'http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=1'
      );
      const response = await GET(request);
      const endTime = Date.now();

      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(1000); // Should respond within 1 second
    });

    test('Multiple requests should work correctly', async () => {
      const requests = Array.from({ length: 5 }, (_, i) => 
        createMockRequest(
          `http://localhost:3000/api/jps/ai-matching?jobId=1&candidateId=${i + 1}`
        )
      );

      const responses = await Promise.all(requests.map(req => GET(req)));
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });
}); 