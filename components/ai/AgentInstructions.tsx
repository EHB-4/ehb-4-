'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ehbCompanyInfo,
  ehbServices,
  getOverallProgress,
  AGENT_INSTRUCTIONS,
} from '../../app/roadmap/data/ehb-master-information';

export default function AgentInstructions() {
  const [activeTab, setActiveTab] = useState('instructions');
  const overallProgress = getOverallProgress();

  const tabs = [
    { id: 'instructions', label: 'Agent Instructions', icon: '📋' },
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'services', label: 'Services Overview', icon: '🔧' },
    { id: 'development', label: 'Development Rules', icon: '⚡' },
    { id: 'quality', label: 'Quality Standards', icon: '✅' },
  ];

  const developmentRules = [
    {
      title: 'Information Management',
      rules: [
        'ALWAYS reference the master information file first',
        'NEVER use outdated or conflicting information',
        'Update master information when new data is provided',
        'Ask for clarification if information is unclear',
        'Provide suggestions based on current EHB architecture',
      ],
    },
    {
      title: 'Frontend Development',
      rules: [
        'Use TypeScript for all components',
        'Follow Next.js 14+ App Router patterns',
        'Use Tailwind CSS for styling',
        'Implement proper component structure',
        'Add comprehensive JSDoc comments',
        'Use React hooks effectively',
      ],
    },
    {
      title: 'Code Quality',
      rules: [
        'Write clean, readable, and maintainable code',
        'Follow EHB coding standards and conventions',
        'Implement proper error handling',
        'Add comprehensive testing',
        'Ensure accessibility compliance',
        'Optimize for performance',
      ],
    },
    {
      title: 'Backend Features (DISABLED)',
      rules: [
        'MongoDB setup disabled',
        'Database operations disabled',
        'Backend API development disabled',
        'Docker services disabled',
        'Focus on frontend development only',
      ],
    },
  ];

  const qualityStandards = [
    {
      category: 'Performance',
      standards: [
        'Use Next.js Image optimization',
        'Implement lazy loading',
        'Optimize bundle size',
        'Use proper caching',
        'Monitor Core Web Vitals',
      ],
    },
    {
      category: 'Accessibility',
      standards: [
        'Use semantic HTML',
        'Implement ARIA labels',
        'Ensure keyboard navigation',
        'Maintain color contrast',
        'Test with screen readers',
      ],
    },
    {
      category: 'Security',
      standards: [
        'Follow security best practices',
        'Validate all inputs',
        'Implement proper authentication',
        'Use HTTPS for all connections',
        'Regular security audits',
      ],
    },
    {
      category: 'Testing',
      standards: [
        'Write unit tests for components',
        'Implement integration tests',
        'Add end-to-end tests',
        'Test across different browsers',
        'Mobile responsiveness testing',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">EHB AI Agent Instructions</h1>
              <p className="text-blue-100 mt-2">
                Complete guide for EHB development agents - Always reference this information
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <div className="text-sm text-blue-100">Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Agent Instructions Tab */}
          {activeTab === 'instructions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  ⚠️ CRITICAL: Agent Instructions
                </h3>
                <pre className="text-sm text-blue-800 whitespace-pre-wrap font-mono leading-relaxed">
                  {AGENT_INSTRUCTIONS}
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">
                    ✅ What Agents MUST Do
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Always check master information file first</li>
                    <li>• Use accurate EHB company information</li>
                    <li>• Follow EHB mission and vision</li>
                    <li>• Prioritize frontend development</li>
                    <li>• Maintain code quality standards</li>
                    <li>• Update information when provided</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-red-900 mb-3">
                    ❌ What Agents MUST NOT Do
                  </h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Use outdated or conflicting information</li>
                    <li>• Develop backend features (disabled)</li>
                    <li>• Ignore EHB coding standards</li>
                    <li>• Skip testing and quality checks</li>
                    <li>• Use non-EHB technologies</li>
                    <li>• Ignore accessibility requirements</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Company Info Tab */}
          {activeTab === 'company' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Company Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Name</h4>
                      <p className="text-gray-600">{ehbCompanyInfo.name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Full Name</h4>
                      <p className="text-gray-600">{ehbCompanyInfo.fullName}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Description</h4>
                      <p className="text-gray-600">{ehbCompanyInfo.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mission & Vision</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Mission</h4>
                      <p className="text-gray-600">{ehbCompanyInfo.mission}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Vision</h4>
                      <p className="text-gray-600">{ehbCompanyInfo.vision}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Core Values</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ehbCompanyInfo.coreValues.map((value, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{value.split(' - ')[0]}</h4>
                      <p className="text-sm text-gray-600">{value.split(' - ')[1]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {ehbCompanyInfo.techStack.map((tech, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-blue-900 text-sm">{tech.name}</div>
                      <div className="text-xs text-blue-700">{tech.version}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Services Overview Tab */}
          {activeTab === 'services' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ehbServices.map((service, index) => (
                  <div
                    key={service.id}
                    className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900">{service.name}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          service.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : service.status === 'Working'
                            ? 'bg-blue-100 text-blue-800'
                            : service.status === 'Under Development'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{service.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            service.progress >= 80
                              ? 'bg-green-500'
                              : service.progress >= 60
                              ? 'bg-blue-500'
                              : service.progress >= 40
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${service.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Priority: {service.priority} | Team: {service.team.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Development Rules Tab */}
          {activeTab === 'development' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {developmentRules.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          {/* Quality Standards Tab */}
          {activeTab === 'quality' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {qualityStandards.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.standards.map((standard, standardIndex) => (
                      <div key={standardIndex} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{standard}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
