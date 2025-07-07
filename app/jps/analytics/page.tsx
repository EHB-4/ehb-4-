'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { useJPSRole } from '../../../components/JPS/JPSRoleContext';
import {
  ChartBarIcon,
  TrendingUpIcon,
  UsersIcon,
  BriefcaseIcon,
  MapPinIcon,
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  totalJobs: number;
  totalCandidates: number;
  totalEmployers: number;
  totalMatches: number;
  successRate: number;
  avgTimeToHire: number;
  avgSalary: number;
  topSkills: string[];
  topLocations: string[];
  monthlyStats: {
    month: string;
    jobs: number;
    candidates: number;
    matches: number;
  }[];
  skillDemand: {
    skill: string;
    demand: number;
    supply: number;
  }[];
  industryStats: {
    industry: string;
    jobs: number;
    candidates: number;
    avgSalary: number;
  }[];
}

const AnalyticsPage: React.FC = () => {
  const { role } = useJPSRole();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = () => {
    // Mock analytics data
    const mockData: AnalyticsData = {
      totalJobs: 1247,
      totalCandidates: 3421,
      totalEmployers: 156,
      totalMatches: 892,
      successRate: 78.5,
      avgTimeToHire: 23,
      avgSalary: 85000,
      topSkills: ['JavaScript', 'React', 'Python', 'AWS', 'Node.js'],
      topLocations: ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston'],
      monthlyStats: [
        { month: 'Jan', jobs: 120, candidates: 350, matches: 85 },
        { month: 'Feb', jobs: 135, candidates: 380, matches: 92 },
        { month: 'Mar', jobs: 110, candidates: 320, matches: 78 },
        { month: 'Apr', jobs: 145, candidates: 410, matches: 105 },
        { month: 'May', jobs: 160, candidates: 450, matches: 120 },
        { month: 'Jun', jobs: 175, candidates: 480, matches: 135 },
      ],
      skillDemand: [
        { skill: 'JavaScript', demand: 85, supply: 72 },
        { skill: 'React', demand: 78, supply: 65 },
        { skill: 'Python', demand: 92, supply: 88 },
        { skill: 'AWS', demand: 68, supply: 45 },
        { skill: 'Node.js', demand: 75, supply: 58 },
      ],
      industryStats: [
        { industry: 'Technology', jobs: 450, candidates: 1200, avgSalary: 95000 },
        { industry: 'Healthcare', jobs: 180, candidates: 320, avgSalary: 75000 },
        { industry: 'Finance', jobs: 220, candidates: 480, avgSalary: 88000 },
        { industry: 'Education', jobs: 95, candidates: 210, avgSalary: 65000 },
        { industry: 'Manufacturing', jobs: 120, candidates: 280, avgSalary: 72000 },
      ],
    };
    setAnalyticsData(mockData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">JPS Analytics</h1>
              <p className="text-sm text-gray-500">Comprehensive insights and metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="time-range-select" className="sr-only">
                Time Range
              </label>
              <select
                id="time-range-select"
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Time Range"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Role-based Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {role === 'jobseeker' && (
          <div className="mb-4">Track your job search progress and application statistics.</div>
        )}
        {role === 'employer' && (
          <div className="mb-4">
            Analyze your job postings, candidate engagement, and hiring metrics.
          </div>
        )}
        {role === 'admin' && (
          <div className="mb-4">View platform-wide analytics and system health.</div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalJobs.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              +12.5% from last month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalCandidates.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              +8.3% from last month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.successRate}%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              +2.1% from last month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Time to Hire</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.avgTimeToHire} days
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              -3.2 days from last month
            </div>
          </div>
        </div>
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.monthlyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gray-200 rounded-t"
                  style={{ height: `${(stat.jobs / 200) * 200}px` }}
                >
                  <div className="bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-t mt-1"
                  style={{ height: `${(stat.candidates / 500) * 200}px` }}
                >
                  <div className="bg-green-500 rounded-t" style={{ height: '100%' }}></div>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-t mt-1"
                  style={{ height: `${(stat.matches / 150) * 200}px` }}
                >
                  <div className="bg-purple-500 rounded-t" style={{ height: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{stat.month}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Jobs</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Candidates</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Matches</span>
            </div>
          </div>
        </div>
        {/* Skill Demand vs Supply */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Demand vs Supply</h3>
          <div className="space-y-4">
            {analyticsData.skillDemand.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                  <span className="text-sm text-gray-600">
                    {skill.demand}% demand, {skill.supply}% supply
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${skill.demand}%` }}
                  ></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${skill.supply}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Demand</span>
                  <span>Supply</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Industry Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Statistics</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jobs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.industryStats.map((industry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {industry.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {industry.jobs.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {industry.candidates.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${industry.avgSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Math.round((industry.jobs / industry.candidates) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Skills and Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Demand</h3>
            <div className="space-y-3">
              {analyticsData.topSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{skill}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">#{index + 1}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${100 - index * 15}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Job Locations</h3>
            <div className="space-y-3">
              {analyticsData.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">#{index + 1}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${100 - index * 15}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
