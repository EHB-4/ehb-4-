'use client';

import React, { useState, useEffect } from 'react';
import JPS/JPSRoleContext from '@/components/JPS/JPSRoleContext';
import {
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ChartBarIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

interface Assessment {
  id: string;
  title: string;
  type: 'mcq' | 'coding' | 'video' | 'practical';
  duration: number;
  questions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  maxScore: number;
  lastAttempt?: string;
}

const AssessmentPage: React.FC = () => {
  const { role } = useJPSRole();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTest, setCurrentTest] = useState<any>(null);
  const [testTimer, setTestTimer] = useState(0);

  useEffect(() => {
    loadAssessments();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentTest && testTimer > 0) {
      interval = setInterval(() => {
        setTestTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentTest, testTimer]);

  const loadAssessments = () => {
    // Mock assessment data
    const mockAssessments: Assessment[] = [
      {
        id: '1',
        title: 'JavaScript Fundamentals',
        type: 'mcq',
        duration: 30,
        questions: 20,
        difficulty: 'beginner',
        status: 'completed',
        score: 85,
        maxScore: 100,
        lastAttempt: '2024-01-15',
      },
      {
        id: '2',
        title: 'React Development',
        type: 'coding',
        duration: 60,
        questions: 5,
        difficulty: 'intermediate',
        status: 'in_progress',
        maxScore: 100,
      },
      {
        id: '3',
        title: 'System Design Interview',
        type: 'video',
        duration: 45,
        questions: 3,
        difficulty: 'advanced',
        status: 'not_started',
        maxScore: 100,
      },
      {
        id: '4',
        title: 'Data Structures & Algorithms',
        type: 'coding',
        duration: 90,
        questions: 8,
        difficulty: 'advanced',
        status: 'completed',
        score: 92,
        maxScore: 100,
        lastAttempt: '2024-01-10',
      },
      {
        id: '5',
        title: 'AWS Cloud Practitioner',
        type: 'mcq',
        duration: 45,
        questions: 25,
        difficulty: 'intermediate',
        status: 'not_started',
        maxScore: 100,
      },
    ];
    setAssessments(mockAssessments);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'in_progress':
        return <ClockIcon className="h-4 w-4" />;
      case 'not_started':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq':
        return <DocumentTextIcon className="h-5 w-5" />;
      case 'coding':
        return <CodeBracketIcon className="h-5 w-5" />;
      case 'video':
        return <VideoCameraIcon className="h-5 w-5" />;
      case 'practical':
        return <AcademicCapIcon className="h-5 w-5" />;
      default:
        return <DocumentTextIcon className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentTest({
      id: assessment.id,
      title: assessment.title,
      timeRemaining: assessment.duration * 60,
      currentQuestion: 1,
      totalQuestions: assessment.questions,
    });
    setTestTimer(assessment.duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Skill Assessment</h1>
              <p className="text-sm text-gray-500">EDR-powered skill verification and testing</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Overall Score</p>
                <p className="text-2xl font-bold text-blue-600">78%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Tests Completed</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Current Test Timer */}
      {currentTest && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Currently taking: {currentTest.title}
                </span>
                <span className="text-sm text-yellow-700">
                  Question {currentTest.currentQuestion} of {currentTest.totalQuestions}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-yellow-800">
                  Time: {formatTime(testTimer)}
                </span>
                <div className="flex space-x-2">
                  <button className="p-1 text-yellow-600 hover:text-yellow-700">
                    <PauseIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-red-600 hover:text-red-700">
                    <StopIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role-based Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {role === 'jobseeker' && (
          <div className="mb-4">
            Take skill assessments to improve your profile and earn certifications.
          </div>
        )}
        {role === 'employer' && (
          <div className="mb-4">Assign assessments to candidates and review their results.</div>
        )}
        {role === 'admin' && (
          <div className="mb-4">Manage assessment library and monitor platform-wide results.</div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map(assessment => (
            <div
              key={assessment.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">{getTypeIcon(assessment.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {assessment.type} Assessment
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}
                  >
                    {getStatusIcon(assessment.status)}
                    <span className="ml-1">{assessment.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{assessment.duration} minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{assessment.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Difficulty:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}
                    >
                      {assessment.difficulty}
                    </span>
                  </div>
                  {assessment.score && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-medium text-green-600">
                        {assessment.score}/{assessment.maxScore}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {assessment.lastAttempt && (
                    <span className="text-xs text-gray-500">Last: {assessment.lastAttempt}</span>
                  )}
                  <div className="flex space-x-2">
                    {assessment.status === 'completed' && (
                      <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                        Retake
                      </button>
                    )}
                    {assessment.status === 'not_started' && (
                      <button
                        onClick={() => startAssessment(assessment)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Start Test
                      </button>
                    )}
                    {assessment.status === 'in_progress' && (
                      <button
                        onClick={() => startAssessment(assessment)}
                        className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Tests Completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-gray-600">Hours Spent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <StarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Certifications</p>
            </div>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Progress</h3>
          <div className="space-y-4">
            {[
              { skill: 'JavaScript', progress: 85, level: 'Advanced' },
              { skill: 'React', progress: 78, level: 'Intermediate' },
              { skill: 'Node.js', progress: 72, level: 'Intermediate' },
              { skill: 'AWS', progress: 65, level: 'Beginner' },
              { skill: 'Python', progress: 90, level: 'Advanced' },
            ].map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                  <span className="text-sm text-gray-600">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{skill.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssessmentPage;
