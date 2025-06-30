'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Filter,
  Search,
} from 'lucide-react';

interface PredictionData {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
}

interface AgentPrediction {
  id: string;
  name: string;
  currentPerformance: number;
  predictions: {
    nextHour: number;
    nextDay: number;
    nextWeek: number;
    nextMonth: number;
  };
  riskFactors: string[];
  opportunities: string[];
  recommendations: string[];
}

interface SystemPrediction {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  alert: boolean;
  threshold: number;
}

/**
 * Predictive Analytics Component
 * Advanced AI-powered predictions and insights
 */
export default function PredictiveAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'insights'>('overview');

  const [predictions, setPredictions] = useState<PredictionData[]>([
    {
      metric: 'CPU Usage',
      currentValue: 45.2,
      predictedValue: 52.1,
      confidence: 87,
      trend: 'up',
      timeframe: 'Next 24 hours',
      impact: 'medium',
      recommendation: 'Consider scaling resources to handle increased load',
    },
    {
      metric: 'Memory Usage',
      currentValue: 67.8,
      predictedValue: 72.3,
      confidence: 92,
      trend: 'up',
      timeframe: 'Next 24 hours',
      impact: 'high',
      recommendation: 'Monitor memory usage closely and optimize if needed',
    },
    {
      metric: 'Error Rate',
      currentValue: 0.3,
      predictedValue: 0.2,
      confidence: 78,
      trend: 'down',
      timeframe: 'Next 24 hours',
      impact: 'low',
      recommendation: 'Error rate is improving, continue current practices',
    },
    {
      metric: 'Response Time',
      currentValue: 1.2,
      predictedValue: 1.1,
      confidence: 85,
      trend: 'down',
      timeframe: 'Next 24 hours',
      impact: 'medium',
      recommendation: 'Performance is improving, consider optimization opportunities',
    },
    {
      metric: 'User Growth',
      currentValue: 1247,
      predictedValue: 1320,
      confidence: 94,
      trend: 'up',
      timeframe: 'Next 7 days',
      impact: 'high',
      recommendation: 'Prepare for increased user load and scale accordingly',
    },
    {
      metric: 'Revenue',
      currentValue: 45678,
      predictedValue: 48920,
      confidence: 89,
      trend: 'up',
      timeframe: 'Next 30 days',
      impact: 'high',
      recommendation: 'Revenue growth expected, optimize conversion rates',
    },
  ]);

  const [agentPredictions, setAgentPredictions] = useState<AgentPrediction[]>([
    {
      id: 'sot-orchestrator',
      name: 'SOT Agent Orchestrator',
      currentPerformance: 95,
      predictions: {
        nextHour: 96,
        nextDay: 94,
        nextWeek: 92,
        nextMonth: 90,
      },
      riskFactors: ['High CPU usage trend', 'Memory pressure increasing'],
      opportunities: ['Optimize task distribution', 'Implement caching'],
      recommendations: ['Scale horizontally', 'Add more CPU cores'],
    },
    {
      id: 'code-check-agent',
      name: 'Code Check Agent',
      currentPerformance: 92,
      predictions: {
        nextHour: 90,
        nextDay: 88,
        nextWeek: 85,
        nextMonth: 82,
      },
      riskFactors: ['Memory usage at 85%', 'Response time increasing'],
      opportunities: ['Optimize algorithms', 'Implement parallel processing'],
      recommendations: ['Increase memory allocation', 'Optimize code analysis'],
    },
    {
      id: 'fraud-watch-agent',
      name: 'Fraud Watch Agent',
      currentPerformance: 98,
      predictions: {
        nextHour: 99,
        nextDay: 98,
        nextWeek: 97,
        nextMonth: 96,
      },
      riskFactors: ['High transaction volume expected'],
      opportunities: ['Improve detection algorithms', 'Add new fraud patterns'],
      recommendations: ['Scale up resources', 'Enhance ML models'],
    },
  ]);

  const [systemPredictions, setSystemPredictions] = useState<SystemPrediction[]>([
    {
      metric: 'System Load',
      current: 1.2,
      predicted: 1.8,
      confidence: 85,
      trend: 'up',
      alert: true,
      threshold: 2.0,
    },
    {
      metric: 'Network Latency',
      current: 12.3,
      predicted: 15.7,
      confidence: 78,
      trend: 'up',
      alert: false,
      threshold: 20.0,
    },
    {
      metric: 'Disk Usage',
      current: 23.4,
      predicted: 25.1,
      confidence: 92,
      trend: 'up',
      alert: false,
      threshold: 80.0,
    },
    {
      metric: 'Active Connections',
      current: 1247,
      predicted: 1380,
      confidence: 89,
      trend: 'up',
      alert: false,
      threshold: 2000,
    },
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Predictive Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered predictions and intelligent insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedTimeframe}
            onChange={e => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1h">Next Hour</option>
            <option value="24h">Next 24 Hours</option>
            <option value="7d">Next 7 Days</option>
            <option value="30d">Next 30 Days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'detailed', label: 'Detailed', icon: LineChart },
          { key: 'insights', label: 'Insights', icon: Target },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setViewMode(key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === key
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Key Predictions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.slice(0, 6).map((prediction, index) => (
              <motion.div
                key={prediction.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {prediction.metric}
                  </h3>
                  {getTrendIcon(prediction.trend)}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current:</span>
                    <span className="font-medium">{prediction.currentValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Predicted:</span>
                    <span className="font-medium">{prediction.predictedValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
                    <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Impact:</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                        prediction.impact
                      )}`}
                    >
                      {prediction.impact}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {prediction.recommendation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* System Predictions Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Predictions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.metric}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {prediction.metric}
                    </span>
                    {prediction.alert && <AlertTriangle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Current:</span>
                      <span className="font-medium">{prediction.current}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Predicted:</span>
                      <span className="font-medium">{prediction.predicted}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'detailed' && (
        <>
          {/* Agent Performance Predictions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Agent Performance Predictions
            </h3>
            <div className="space-y-6">
              {agentPredictions.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {agent.name}
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Current: {agent.currentPerformance}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Hour</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {agent.predictions.nextHour}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Day</p>
                      <p className="text-2xl font-bold text-green-600">
                        {agent.predictions.nextDay}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Week</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {agent.predictions.nextWeek}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Month</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {agent.predictions.nextMonth}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Risk Factors
                      </h5>
                      <ul className="space-y-1">
                        {agent.riskFactors.map((risk, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-red-600">
                            <AlertTriangle className="w-3 h-3" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Opportunities
                      </h5>
                      <ul className="space-y-1">
                        {agent.opportunities.map((opportunity, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Recommendations
                      </h5>
                      <ul className="space-y-1">
                        {agent.recommendations.map((recommendation, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-blue-600">
                            <Info className="w-3 h-3" />
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'insights' && (
        <>
          {/* AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Performance Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Positive Trend
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Overall system performance is improving with 87% confidence. Expected 5%
                    improvement in next 24 hours.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800 dark:text-yellow-200">
                      Attention Required
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Memory usage trending upward. Consider optimization to prevent performance
                    degradation.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Optimization Opportunity
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Code Check Agent can be optimized for 15% better performance with current
                    resources.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Predictive Recommendations
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Immediate Actions (Next Hour)
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Monitor CPU usage on SOT Orchestrator</li>
                    <li>• Check memory allocation for Code Check Agent</li>
                    <li>• Verify network connectivity for Fraud Watch Agent</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Short-term Planning (Next Week)
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Scale up resources for expected user growth</li>
                    <li>• Implement caching for improved performance</li>
                    <li>• Optimize database queries for better response times</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Long-term Strategy (Next Month)
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Plan for 20% user growth infrastructure</li>
                    <li>• Implement advanced ML models for fraud detection</li>
                    <li>• Consider microservices architecture for scalability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Prediction Confidence Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">94%</span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">High Confidence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Predictions with 90%+ confidence are highly reliable
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-600">85%</span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Medium Confidence
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Predictions with 80-89% confidence require monitoring
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-600">78%</span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Low Confidence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Predictions below 80% need additional data for accuracy
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
