'use client';

import React, { useState } from 'react';
import { Menu, X, Search, Filter, User, Briefcase, Calendar, BarChart3 } from 'lucide-react';

/**
 * Roman Urdu: JPS Mobile Responsive Component
 * Mobile devices par optimize kiya gaya hai
 */
export default function MobileResponsive() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">JPS</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-gray-100">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="bg-white border-b">
          <div className="px-4 py-2 space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
              Dashboard
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
              Jobs
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
              Candidates
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
              Interviews
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Content */}
      <main className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, candidates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex space-x-1 mb-4 bg-white rounded-lg p-1">
          {[
            { id: 'jobs', icon: Briefcase, label: 'Jobs' },
            { id: 'candidates', icon: User, label: 'Candidates' },
            { id: 'interviews', icon: Calendar, label: 'Interviews' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4">
          {[1, 2, 3].map(item => (
            <div key={item} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">
                  {activeTab === 'jobs' && 'Senior React Developer'}
                  {activeTab === 'candidates' && 'Ahmed Khan'}
                  {activeTab === 'interviews' && 'Interview #123'}
                  {activeTab === 'analytics' && 'Monthly Report'}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {activeTab === 'jobs' && 'TechCorp Solutions • Karachi • 150K PKR'}
                {activeTab === 'candidates' && 'SQL Level 3 • 5 years experience'}
                {activeTab === 'interviews' && 'Tomorrow 2:00 PM • Virtual'}
                {activeTab === 'analytics' && '15 placements • 85% success rate'}
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  View Details
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
