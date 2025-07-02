"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { 
  BrainIcon,
  SparklesIcon,
  ChartBarIcon,
  StarIcon,
  UserIcon,
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CogIcon,
  LightBulbIcon,
  TrendingUpIcon,
  TargetIcon
} from '@heroicons/react/24/outline';

interface AIMatchingProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface Match {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  skillMatch: number;
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  status: 'pending' | 'accepted' | 'rejected' | 'interviewed';
  aiRecommendation: string;
  lastUpdated: string;
}

interface AlgorithmMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  totalMatches: number;
  successfulPlacements: number;
}

const AIMatching: React.FC<AIMatchingProps> = ({ userType }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [algorithmMetrics, setAlgorithmMetrics] = useState<AlgorithmMetrics>({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    totalMatches: 0,
    successfulPlacements: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showAlgorithmDetails, setShowAlgorithmDetails] = useState(false);

  useEffect(() => {
    loadAIMatchingData();
  }, [userType]);

  const loadAIMatchingData = () => {
    // Mock AI matching data
    const mockMatches: Match[] = [
      {
        id: '1',
        candidateId: '1',
        jobId: '1',
        candidateName: 'Sarah Johnson',
        jobTitle: 'Senior React Developer',
        company: 'TechCorp Inc.',
        matchScore: 95,
        skillMatch: 98,
        experienceMatch: 92,
        locationMatch: 85,
        salaryMatch: 90,
        status: 'pending',
        aiRecommendation: 'Excellent skill alignment with React and TypeScript. Strong experience match and salary expectations align well.',
        lastUpdated: '2 hours ago'
      },
      {
        id: '2',
        candidateId: '2',
        jobId: '2',
        candidateName: 'Mike Chen',
        jobTitle: 'Full Stack Developer',
        company: 'AI Solutions',
        matchScore: 87,
        skillMatch: 85,
        experienceMatch: 80,
        locationMatch: 95,
        salaryMatch: 85,
        status: 'accepted',
        aiRecommendation: 'Good technical skills match. Remote work preference aligns perfectly. Experience level suitable for the role.',
        lastUpdated: '1 day ago'
      },
      {
        id: '3',
        candidateId: '3',
        jobId: '3',
        candidateName: 'Alex Rodriguez',
        jobTitle: 'DevOps Engineer',
        company: 'CloudTech',
        matchScore: 82,
        skillMatch: 90,
        experienceMatch: 85,
        locationMatch: 70,
        salaryMatch: 88,
        status: 'interviewed',
        aiRecommendation: 'Strong DevOps skills match. Experience level is perfect. Location may require relocation consideration.',
        lastUpdated: '3 days ago'
      },
      {
        id: '4',
        candidateId: '1',
        jobId: '4',
        candidateName: 'Sarah Johnson',
        jobTitle: 'Frontend Lead',
        company: 'Creative Studio',
        matchScore: 78,
        skillMatch: 85,
        experienceMatch: 75,
        locationMatch: 80,
        salaryMatch: 70,
        status: 'rejected',
        aiRecommendation: 'Good technical skills but may be overqualified. Salary expectations higher than budget.',
        lastUpdated: '1 week ago'
      }
    ];

    setMatches(mockMatches);
    setAlgorithmMetrics({
      accuracy: 89.5,
      precision: 87.2,
      recall: 91.8,
      f1Score: 89.4,
      totalMatches: 1247,
      successfulPlacements: 892
    });
    setLoading(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'interviewed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'interviewed':
        return <ClockIcon className="h-4 w-4" />;
      case 'pending':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'rejected':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Matching</h2>
          <p className="text-gray-600">
            AI-powered job-candidate matching with intelligent recommendations
          </p>
        </div>
        
        <button
          onClick={() => setShowAlgorithmDetails(true)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <CogIcon className="h-5 w-5 mr-2" />
          Algorithm Details
        </button>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BrainIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Algorithm Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{algorithmMetrics.accuracy}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">F1 Score</p>
              <p className="text-2xl font-bold text-gray-900">{algorithmMetrics.f1Score}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TargetIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900">{algorithmMetrics.totalMatches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Successful Placements</p>
              <p className="text-2xl font-bold text-gray-900">{algorithmMetrics.successfulPlacements}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Matching Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Matching Results</h3>
          <p className="text-sm text-gray-600">Intelligent job-candidate matches with detailed scoring</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{match.candidateName}</span>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center space-x-2">
                        <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{match.jobTitle}</span>
                        <span className="text-gray-600">at {match.company}</span>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <SparklesIcon className="h-5 w-5 text-purple-600" />
                        <span className="text-lg font-semibold">AI Match Score:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                        {getStatusIcon(match.status)}
                        <span className="ml-1">{match.status}</span>
                      </span>
                    </div>

                    {/* Detailed Scoring */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Skills</p>
                        <p className="text-lg font-semibold text-blue-600">{match.skillMatch}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-lg font-semibold text-green-600">{match.experienceMatch}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-lg font-semibold text-purple-600">{match.locationMatch}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Salary</p>
                        <p className="text-lg font-semibold text-orange-600">{match.salaryMatch}%</p>
                      </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <LightBulbIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">AI Recommendation</h4>
                          <p className="text-sm text-gray-700">{match.aiRecommendation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        Last updated: {match.lastUpdated}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedMatch(match)}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </button>
                        
                        {userType === 'employer' && match.status === 'pending' && (
                          <>
                            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                              Accept
                            </button>
                            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
                              Reject
                            </button>
                          </>
                        )}
                        
                        {userType === 'jobseeker' && match.status === 'pending' && (
                          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Algorithm Details Modal */}
      {showAlgorithmDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">AI Matching Algorithm Details</h3>
              <button
                onClick={() => setShowAlgorithmDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Algorithm Overview */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Algorithm Overview</h4>
                <p className="text-gray-700 mb-4">
                  Our AI matching algorithm uses advanced machine learning techniques to analyze multiple factors 
                  and provide intelligent job-candidate matches with high accuracy.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Matching Factors</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Skills and technical expertise</li>
                      <li>• Experience level and background</li>
                      <li>• Location and work preferences</li>
                      <li>• Salary expectations</li>
                      <li>• Company culture fit</li>
                      <li>• Career goals alignment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">AI Technologies</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Natural Language Processing (NLP)</li>
                      <li>• Machine Learning Classification</li>
                      <li>• Collaborative Filtering</li>
                      <li>• Deep Learning Models</li>
                      <li>• Real-time Learning</li>
                      <li>• Predictive Analytics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{algorithmMetrics.accuracy}%</p>
                    <p className="text-sm text-gray-600">Accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{algorithmMetrics.precision}%</p>
                    <p className="text-sm text-gray-600">Precision</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{algorithmMetrics.recall}%</p>
                    <p className="text-sm text-gray-600">Recall</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{algorithmMetrics.f1Score}%</p>
                    <p className="text-sm text-gray-600">F1 Score</p>
                  </div>
                </div>
              </div>

              {/* Algorithm Process */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Matching Process</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h5 className="font-medium">Profile Analysis</h5>
                      <p className="text-sm text-gray-600">AI analyzes candidate profiles and job requirements</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h5 className="font-medium">Feature Extraction</h5>
                      <p className="text-sm text-gray-600">Extracts relevant features and patterns</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h5 className="font-medium">Similarity Scoring</h5>
                      <p className="text-sm text-gray-600">Calculates similarity scores across multiple dimensions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h5 className="font-medium">Ranking & Recommendations</h5>
                      <p className="text-sm text-gray-600">Ranks matches and generates intelligent recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowAlgorithmDetails(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMatching; 