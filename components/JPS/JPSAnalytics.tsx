"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  TrendingUpIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  StarIcon,
  CalendarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface JPSAnalyticsProps {
  userType: 'jobseeker' | 'employer' | 'admin';
}

interface AnalyticsData {
  totalJobs: number;
  totalCandidates: number;
  totalApplications: number;
  successfulPlacements: number;
  averageTimeToHire: number;
  averageSalary: number;
  placementRate: number;
  satisfactionScore: number;
}

interface TimeSeriesData {
  date: string;
  applications: number;
  placements: number;
  activeJobs: number;
}

interface TopSkills {
  skill: string;
  demand: number;
  supply: number;
  gap: number;
}

const JPSAnalytics: React.FC<JPSAnalyticsProps> = ({ userType }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalJobs: 0,
    totalCandidates: 0,
    totalApplications: 0,
    successfulPlacements: 0,
    averageTimeToHire: 0,
    averageSalary: 0,
    placementRate: 0,
    satisfactionScore: 0
  });
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [topSkills, setTopSkills] = useState<TopSkills[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [userType, selectedPeriod]);

  const loadAnalyticsData = () => {
    // Mock analytics data
    setAnalyticsData({
      totalJobs: 1247,
      totalCandidates: 3456,
      totalApplications: 8923,
      successfulPlacements: 892,
      averageTimeToHire: 23,
      averageSalary: 85000,
      placementRate: 78.5,
      satisfactionScore: 4.6
    });

    // Mock time series data
    const mockTimeSeries: TimeSeriesData[] = [
      { date: '2024-01-01', applications: 45, placements: 12, activeJobs: 156 },
      { date: '2024-01-02', applications: 52, placements: 15, activeJobs: 162 },
      { date: '2024-01-03', applications: 38, placements: 8, activeJobs: 158 },
      { date: '2024-01-04', applications: 67, placements: 22, activeJobs: 175 },
      { date: '2024-01-05', applications: 43, placements: 11, activeJobs: 168 },
      { date: '2024-01-06', applications: 29, placements: 7, activeJobs: 155 },
      { date: '2024-01-07', applications: 34, placements: 9, activeJobs: 160 }
    ];
    setTimeSeriesData(mockTimeSeries);

    // Mock top skills data
    const mockTopSkills: TopSkills[] = [
      { skill: 'React', demand: 85, supply: 72, gap: 13 },
      { skill: 'Python', demand: 78, supply: 65, gap: 13 },
      { skill: 'AWS', demand: 92, supply: 58, gap: 34 },
      { skill: 'TypeScript', demand: 76, supply: 68, gap: 8 },
      { skill: 'Docker', demand: 88, supply: 45, gap: 43 }
    ];
    setTopSkills(mockTopSkills);

    setLoading(false);
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'jobs':
        return <BriefcaseIcon className="h-6 w-6" />;
      case 'candidates':
        return <UserGroupIcon className="h-6 w-6" />;
      case 'applications':
        return <ChartBarIcon className="h-6 w-6" />;
      case 'placements':
        return <CheckCircleIcon className="h-6 w-6" />;
      case 'time':
        return <ClockIcon className="h-6 w-6" />;
      case 'salary':
        return <CurrencyDollarIcon className="h-6 w-6" />;
      case 'rate':
        return <TrendingUpIcon className="h-6 w-6" />;
      case 'satisfaction':
        return <StarIcon className="h-6 w-6" />;
      default:
        return <ChartBarIcon className="h-6 w-6" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'jobs':
        return 'bg-blue-100 text-blue-600';
      case 'candidates':
        return 'bg-green-100 text-green-600';
      case 'applications':
        return 'bg-purple-100 text-purple-600';
      case 'placements':
        return 'bg-yellow-100 text-yellow-600';
      case 'time':
        return 'bg-red-100 text-red-600';
      case 'salary':
        return 'bg-indigo-100 text-indigo-600';
      case 'rate':
        return 'bg-pink-100 text-pink-600';
      case 'satisfaction':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
          <h2 className="text-2xl font-bold text-gray-900">JPS Analytics</h2>
          <p className="text-gray-600">
            Comprehensive insights and performance metrics for the job placement system
          </p>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Select time period"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('jobs')}`}>
              {getMetricIcon('jobs')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalJobs.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('candidates')}`}>
              {getMetricIcon('candidates')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCandidates.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('applications')}`}>
              {getMetricIcon('applications')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalApplications.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('placements')}`}>
              {getMetricIcon('placements')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Placements</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.successfulPlacements.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('time')}`}>
              {getMetricIcon('time')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Time to Hire</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.averageTimeToHire} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('salary')}`}>
              {getMetricIcon('salary')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Salary</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsData.averageSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('rate')}`}>
              {getMetricIcon('rate')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Placement Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.placementRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getMetricColor('satisfaction')}`}>
              {getMetricIcon('satisfaction')}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Satisfaction Score</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.satisfactionScore}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Over Time</h3>
          <div className="space-y-4">
            {timeSeriesData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{data.date}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Applications</p>
                    <p className="text-sm font-semibold text-blue-600">{data.applications}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Placements</p>
                    <p className="text-sm font-semibold text-green-600">{data.placements}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Active Jobs</p>
                    <p className="text-sm font-semibold text-purple-600">{data.activeJobs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Gap Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Gap Analysis</h3>
          <div className="space-y-4">
            {topSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                  <span className="text-sm text-gray-600">Gap: {skill.gap}%</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${skill.supply}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Demand: {skill.demand}%</span>
                  <span>Supply: {skill.supply}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUpIcon className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Growing Demand</h4>
            </div>
            <p className="text-sm text-blue-700">
              React and AWS skills show the highest demand growth at 15% month-over-month.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-900">High Success Rate</h4>
            </div>
            <p className="text-sm text-green-700">
              Candidates with verified skills have 85% higher placement success rate.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-900">Skills Gap Alert</h4>
            </div>
            <p className="text-sm text-yellow-700">
              DevOps and cloud skills gap is widening. Consider upskilling programs.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPinIcon className="h-5 w-5 text-purple-600" />
              <h4 className="font-medium text-purple-900">Location Trends</h4>
            </div>
            <p className="text-sm text-purple-700">
              Remote work preferences increased by 40% in the last quarter.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CurrencyDollarIcon className="h-5 w-5 text-indigo-600" />
              <h4 className="font-medium text-indigo-900">Salary Insights</h4>
            </div>
            <p className="text-sm text-indigo-700">
              Average salaries increased by 8% for AI/ML and blockchain roles.
            </p>
          </div>

          <div className="bg-pink-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <StarIcon className="h-5 w-5 text-pink-600" />
              <h4 className="font-medium text-pink-900">User Satisfaction</h4>
            </div>
            <p className="text-sm text-pink-700">
              Platform satisfaction score improved to 4.6/5 with AI matching.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <CogIcon className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Optimize Job Postings</h4>
              <p className="text-sm text-gray-700">
                Jobs with detailed skill requirements and clear salary ranges receive 35% more qualified applications.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <TrendingUpIcon className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Focus on High-Demand Skills</h4>
              <p className="text-sm text-gray-700">
                Prioritize candidates with AWS, Docker, and TypeScript skills as they have the highest placement rates.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <ClockIcon className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Reduce Time to Hire</h4>
              <p className="text-sm text-gray-700">
                Implement automated interview scheduling to reduce average time to hire by 40%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JPSAnalytics; 