'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  Cpu,
  Memory,
  Target,
  Settings,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

export default function AIAgentPerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const performanceOverview = {
    overallScore: 87,
    averageResponseTime: '1.2s',
    throughput: '2,847 req/min',
    errorRate: '0.3%',
    uptime: '99.97%',
    activeAgents: 12,
  };

  const agents = [
    {
      id: 1,
      name: 'SOT Orchestrator',
      status: 'optimal',
      responseTime: '0.8s',
      throughput: '450 req/min',
      errorRate: '0.1%',
      cpu: 23,
      memory: 45,
      score: 94,
    },
    {
      id: 2,
      name: 'Code Check Agent',
      status: 'good',
      responseTime: '2.1s',
      throughput: '320 req/min',
      errorRate: '0.5%',
      cpu: 67,
      memory: 78,
      score: 82,
    },
    {
      id: 3,
      name: 'Fraud Watch Agent',
      status: 'optimal',
      responseTime: '0.3s',
      throughput: '890 req/min',
      errorRate: '0.05%',
      cpu: 34,
      memory: 52,
      score: 96,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'good':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI Agent Performance
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Performance monitoring and optimization
                </p>
              </div>
              <Link href="/ai-agents">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Brain className="w-4 h-4" />
                  Back to Agents
                </button>
              </Link>
            </div>

            <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'overview', name: 'Performance Overview', icon: Activity },
                { id: 'agents', name: 'Agent Performance', icon: BarChart3 },
                { id: 'optimization', name: 'Optimization', icon: Zap },
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Performance Overview
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Overall Performance Score
                </h3>
                <span className="text-3xl font-bold text-blue-600">
                  {performanceOverview.overallScore}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${performanceOverview.overallScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Response Time',
                  value: performanceOverview.averageResponseTime,
                  icon: Clock,
                  color: 'blue',
                },
                {
                  label: 'Throughput',
                  value: performanceOverview.throughput,
                  icon: Activity,
                  color: 'green',
                },
                {
                  label: 'Error Rate',
                  value: performanceOverview.errorRate,
                  icon: TrendingDown,
                  color: 'red',
                },
                {
                  label: 'Uptime',
                  value: performanceOverview.uptime,
                  icon: Target,
                  color: 'purple',
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 bg-${metric.color}-100 dark:bg-${metric.color}-900 rounded-lg`}
                    >
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Agents</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performanceOverview.activeAgents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Performance Score
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performanceOverview.overallScore}/100
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Agent Performance
                </h2>
              </div>
              <select
                value={selectedAgent}
                onChange={e => setSelectedAgent(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Agents</option>
                <option value="SOT Orchestrator">SOT Orchestrator</option>
                <option value="Code Check Agent">Code Check Agent</option>
                <option value="Fraud Watch Agent">Fraud Watch Agent</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents
                .filter(agent => selectedAgent === 'all' || agent.name === selectedAgent)
                .map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Performance Score: {agent.score}/100
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status
                        )}`}
                      >
                        {agent.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {agent.responseTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Throughput</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {agent.throughput}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Error Rate</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {agent.errorRate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Performance Score
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {agent.score}/100
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Resource Usage
                      </p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400">CPU</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {agent.cpu}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                agent.cpu > 80
                                  ? 'bg-red-600'
                                  : agent.cpu > 60
                                    ? 'bg-yellow-600'
                                    : 'bg-green-600'
                              }`}
                              style={{ width: `${agent.cpu}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Memory</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {agent.memory}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                agent.memory > 80
                                  ? 'bg-red-600'
                                  : agent.memory > 60
                                    ? 'bg-yellow-600'
                                    : 'bg-green-600'
                              }`}
                              style={{ width: `${agent.memory}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Performance Optimization
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Optimize system performance and efficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Database Query Optimization',
                  description: 'Optimize slow database queries',
                  impact: 'high',
                  estimatedImprovement: '25%',
                  status: 'pending',
                },
                {
                  name: 'Caching Implementation',
                  description: 'Add Redis caching layer',
                  impact: 'high',
                  estimatedImprovement: '40%',
                  status: 'in-progress',
                },
                {
                  name: 'Load Balancing',
                  description: 'Implement round-robin load balancing',
                  impact: 'medium',
                  estimatedImprovement: '15%',
                  status: 'completed',
                },
                {
                  name: 'Code Optimization',
                  description: 'Optimize algorithm efficiency',
                  impact: 'medium',
                  estimatedImprovement: '20%',
                  status: 'pending',
                },
              ].map((optimization, index) => (
                <motion.div
                  key={optimization.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {optimization.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {optimization.description}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        optimization.impact === 'high'
                          ? 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
                          : optimization.impact === 'medium'
                            ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {optimization.impact}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated Improvement
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {optimization.estimatedImprovement}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                      <span
                        className={`text-sm font-medium ${
                          optimization.status === 'completed'
                            ? 'text-green-600'
                            : optimization.status === 'in-progress'
                              ? 'text-blue-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {optimization.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Settings className="w-4 h-4" />
                      Configure
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
