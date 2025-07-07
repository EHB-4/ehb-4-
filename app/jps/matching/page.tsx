'use client';

'use client';

import React, { useState } from 'react';
import { useJPSRole } from '../../../components/JPS/JPSRoleContext';
import {
  // @ts-ignore
  SparklesIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import AIMatching from '../../../components/JPS/AIMatching';

const MatchingPage: React.FC = () => {
  const { role } = useJPSRole();
  // Advanced UI state from old .jsx
  const [matchingMode, setMatchingMode] = useState<'auto' | 'manual' | 'advanced'>('auto');
  const [filters, setFilters] = useState({
    skills: [] as string[],
    experience: '',
    location: '',
    salary: '',
    remote: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-purple-600">AI Matching</h1>
                <p className="text-sm text-gray-500">Intelligent job-candidate matching</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Matching Mode */}
              <label htmlFor="matching-mode-select" className="sr-only">
                Matching Mode
              </label>
              <select
                id="matching-mode-select"
                value={matchingMode}
                onChange={e => setMatchingMode(e.target.value as 'auto' | 'manual' | 'advanced')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Matching Mode"
              >
                <option value="auto">Auto Matching</option>
                <option value="manual">Manual Matching</option>
                <option value="advanced">Advanced AI</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Matching Mode Info */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <SparklesIcon className="h-8 w-8" />
            <div>
              <h2 className="text-xl font-semibold">
                {matchingMode === 'auto' && 'Automatic AI Matching'}
                {matchingMode === 'manual' && 'Manual Matching'}
                {matchingMode === 'advanced' && 'Advanced AI Algorithm'}
              </h2>
              <p className="text-purple-100">
                {matchingMode === 'auto' &&
                  'AI automatically finds the best matches based on your profile'}
                {matchingMode === 'manual' &&
                  'Manually configure matching criteria and preferences'}
                {matchingMode === 'advanced' && 'Advanced machine learning with custom parameters'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {matchingMode === 'advanced' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Advanced Filters:</span>
              <div className="flex items-center space-x-4">
                <label htmlFor="skills-input" className="sr-only">
                  Skills
                </label>
                <input
                  id="skills-input"
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={filters.skills.join(', ')}
                  onChange={e =>
                    setFilters({ ...filters, skills: e.target.value.split(',').map(s => s.trim()) })
                  }
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Skills"
                />
                <label htmlFor="experience-select" className="sr-only">
                  Experience
                </label>
                <select
                  id="experience-select"
                  value={filters.experience}
                  onChange={e => setFilters({ ...filters, experience: e.target.value })}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Experience"
                >
                  <option value="">Any Experience</option>
                  <option value="1+">1+ years</option>
                  <option value="3+">3+ years</option>
                  <option value="5+">5+ years</option>
                  <option value="10+">10+ years</option>
                </select>
                <label htmlFor="location-input" className="sr-only">
                  Location
                </label>
                <input
                  id="location-input"
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={e => setFilters({ ...filters, location: e.target.value })}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Location"
                />
                <label htmlFor="salary-input" className="sr-only">
                  Salary Range
                </label>
                <input
                  id="salary-input"
                  type="text"
                  placeholder="Salary Range"
                  value={filters.salary}
                  onChange={e => setFilters({ ...filters, salary: e.target.value })}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Salary Range"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.remote}
                    onChange={e => setFilters({ ...filters, remote: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    aria-label="Remote Only"
                  />
                  <span className="text-sm text-gray-700">Remote Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role-based Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {role === 'jobseeker' && (
          <div className="mb-4">
            Get matched to jobs that fit your skills and preferences using AI.
          </div>
        )}
        {role === 'employer' && (
          <div className="mb-4">
            Find the best candidates for your job openings with advanced AI matching.
          </div>
        )}
        {role === 'admin' && (
          <div className="mb-4">
            Monitor and configure AI matching algorithms and system performance.
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIMatching userType={role} />
      </main>
    </div>
  );
};

export default MatchingPage;
