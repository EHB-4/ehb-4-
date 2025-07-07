'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Code,
  Play,
  Settings,
  Download,
  Upload,
  TestTube,
  Bug,
  Zap,
  Lightbulb,
  Rocket,
  Terminal,
  FileText,
  GitBranch,
  Database,
  Server,
  Network,
  Globe,
  Smartphone,
  Monitor,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  DollarSign,
  Euro,
  PoundSterling,
  MessageSquare,
  BarChart3,
  Activity,
  Star,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

/**
 * AI Agent Development Tools - Build, test, and deploy custom AI agents
 * @returns {JSX.Element} The AI agent development tools component
 */
export default function AIAgentDevelopmentPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Mock development data
  const templates = [
    {
      id: 'chatbot',
      name: 'Chatbot Agent',
      description: 'Create conversational AI agents with natural language processing',
      category: 'Conversational',
      difficulty: 'Beginner',
      estimatedTime: '2-4 hours',
      features: ['NLP Integration', 'Conversation Flow', 'Response Templates'],
      icon: MessageSquare,
      color: 'blue',
      downloads: 15420,
      rating: 4.8,
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics Agent',
      description: 'Build agents for data processing and analytics tasks',
      category: 'Analytics',
      difficulty: 'Intermediate',
      estimatedTime: '4-6 hours',
      features: ['Data Processing', 'Visualization', 'Reporting'],
      icon: BarChart3,
      color: 'green',
      downloads: 8920,
      rating: 4.6,
    },
    {
      id: 'automation',
      name: 'Workflow Automation Agent',
      description: 'Automate business processes and workflows',
      category: 'Automation',
      difficulty: 'Advanced',
      estimatedTime: '6-8 hours',
      features: ['Process Automation', 'API Integration', 'Scheduling'],
      icon: Zap,
      color: 'purple',
      downloads: 5670,
      rating: 4.7,
    },
    {
      id: 'monitoring',
      name: 'Monitoring Agent',
      description: 'Create agents for system monitoring and alerting',
      category: 'Monitoring',
      difficulty: 'Intermediate',
      estimatedTime: '3-5 hours',
      features: ['System Monitoring', 'Alerting', 'Logging'],
      icon: Activity,
      color: 'orange',
      downloads: 3450,
      rating: 4.5,
    },
  ];

  const developmentTools = [
    {
      name: 'Agent Builder',
      description: 'Visual drag-and-drop interface for building AI agents',
      icon: Code,
      color: 'blue',
      status: 'available',
      features: ['Visual Editor', 'Code Generation', 'Template Library'],
    },
    {
      name: 'Testing Framework',
      description: 'Comprehensive testing tools for AI agent validation',
      icon: TestTube,
      color: 'green',
      status: 'available',
      features: ['Unit Testing', 'Integration Testing', 'Performance Testing'],
    },
    {
      name: 'Deployment Manager',
      description: 'Deploy and manage AI agents across different environments',
      icon: Rocket,
      color: 'purple',
      status: 'available',
      features: ['Cloud Deployment', 'Version Control', 'Rollback'],
    },
    {
      name: 'Performance Monitor',
      description: 'Monitor and optimize AI agent performance',
      icon: Activity,
      color: 'orange',
      status: 'coming-soon',
      features: ['Real-time Monitoring', 'Performance Metrics', 'Optimization'],
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Customer Support Bot',
      type: 'chatbot',
      lastModified: '2024-01-15T10:30:00Z',
      status: 'active',
      progress: 85,
    },
    {
      id: 2,
      name: 'Sales Analytics Agent',
      type: 'analytics',
      lastModified: '2024-01-14T16:45:00Z',
      status: 'testing',
      progress: 60,
    },
    {
      id: 3,
      name: 'Inventory Monitor',
      type: 'monitoring',
      lastModified: '2024-01-13T09:15:00Z',
      status: 'draft',
      progress: 30,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'testing':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'draft':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI Agent Development
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Build, test, and deploy custom AI agents with powerful development tools
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai-agents">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Brain className="w-4 h-4" />
                    Back to Agents
                  </button>
                </Link>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'templates', name: 'Templates', icon: FileText },
                { id: 'tools', name: 'Development Tools', icon: Code },
                { id: 'projects', name: 'My Projects', icon: GitBranch },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Agent Templates
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Start building AI agents with pre-built templates and examples
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
                Import Custom Template
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-${template.color}-100 dark:bg-${template.color}-900 rounded-lg`}
                    >
                      <template.icon className={`w-6 h-6 text-${template.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {template.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Difficulty: {template.difficulty}</span>
                    <span>Time: {template.estimatedTime}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{template.downloads.toLocaleString()} downloads</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Play className="w-4 h-4" />
                      Use Template
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Development Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Development Tools
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Powerful tools to help you build, test, and deploy AI agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {developmentTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-${tool.color}-100 dark:bg-${tool.color}-900 rounded-lg`}
                    >
                      <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tool.status === 'available'
                          ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
                          : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {tool.status === 'available' ? 'Available' : 'Coming Soon'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={tool.status !== 'available'}
                    >
                      <Play className="w-4 h-4" />
                      Launch Tool
                    </button>
                    {tool.status === 'coming-soon' && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Lightbulb className="w-4 h-4" />
                        Get Notified
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* My Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  My Projects
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage and track your AI agent development projects
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentProjects.map(project => (
                      <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {project.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {project.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {project.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(project.lastModified)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400">
                              <Settings className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
