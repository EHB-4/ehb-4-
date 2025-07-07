/**
 * SOT Admin Dashboard Page
 *
 * Administrative interface for SOT system management
 *
 * @author EHB AI System
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  BarChart3,
  MessageSquare,
  Zap,
  Database,
  ArrowRight,
  Brain,
  Code,
  Star,
  Globe,
  Lock,
  Unlock,
} from 'lucide-react';

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalTasks: number;
  completedTasks: number;
  fraudSignals: number;
  pendingEscalations: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
  averageResponseTime: number;
  uptime: number;
}

interface AgentMetrics {
  name: string;
  status: 'online' | 'offline' | 'error';
  tasksProcessed: number;
  successRate: number;
  averageProcessingTime: number;
  lastActivity: Date;
  errors: number;
}

interface FraudSignal {
  id: string;
  userId: string;
  type: 'multi_account' | 'fake_profile' | 'spam_content' | 'stolen_code' | 'suspicious_behavior';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  detectedAt: Date;
  status: 'pending' | 'reviewed' | 'confirmed' | 'false_positive';
}

interface Escalation {
  id: string;
  taskId: string;
  reason: string;
  escalatedAt: Date;
  escalatedTo: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export default function SOTAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    fraudSignals: 0,
    pendingEscalations: 0,
    systemHealth: 'good',
    averageResponseTime: 0,
    uptime: 0,
  });
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics[]>([]);
  const [fraudSignals, setFraudSignals] = useState<FraudSignal[]>([]);
  const [escalations, setEscalations] = useState<Escalation[]>([]);

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    setSystemMetrics({
      totalUsers: 15420,
      activeUsers: 8920,
      totalTasks: 45670,
      completedTasks: 42340,
      fraudSignals: 23,
      pendingEscalations: 7,
      systemHealth: 'excellent',
      averageResponseTime: 1.2,
      uptime: 99.8,
    });

    setAgentMetrics([
      {
        name: 'DevMatchAgent',
        status: 'online',
        tasksProcessed: 12450,
        successRate: 98.5,
        averageProcessingTime: 0.8,
        lastActivity: new Date(),
        errors: 2,
      },
      {
        name: 'CodeCheckAgent',
        status: 'online',
        tasksProcessed: 8920,
        successRate: 96.2,
        averageProcessingTime: 2.1,
        lastActivity: new Date(),
        errors: 5,
      },
      {
        name: 'SchedulerAgent',
        status: 'online',
        tasksProcessed: 15670,
        successRate: 99.1,
        averageProcessingTime: 0.3,
        lastActivity: new Date(),
        errors: 1,
      },
      {
        name: 'FraudWatchAgent',
        status: 'online',
        tasksProcessed: 23450,
        successRate: 97.8,
        averageProcessingTime: 1.5,
        lastActivity: new Date(),
        errors: 3,
      },
      {
        name: 'ComplaintBot',
        status: 'online',
        tasksProcessed: 3450,
        successRate: 94.5,
        averageProcessingTime: 3.2,
        lastActivity: new Date(),
        errors: 8,
      },
      {
        name: 'SQLScoreAgent',
        status: 'online',
        tasksProcessed: 8900,
        successRate: 99.3,
        averageProcessingTime: 0.5,
        lastActivity: new Date(),
        errors: 1,
      },
    ]);

    setFraudSignals([
      {
        id: 'fraud_1',
        userId: 'user_123',
        type: 'multi_account',
        severity: 'high',
        confidence: 85,
        description: 'Multiple accounts detected from same IP address',
        detectedAt: new Date(),
        status: 'pending',
      },
      {
        id: 'fraud_2',
        userId: 'user_456',
        type: 'stolen_code',
        severity: 'critical',
        confidence: 92,
        description: 'Code submission matches known stolen repository',
        detectedAt: new Date(),
        status: 'reviewed',
      },
    ]);

    setEscalations([
      {
        id: 'esc_1',
        taskId: 'task_789',
        reason: 'Developer missed deadline by 3 days',
        escalatedAt: new Date(),
        escalatedTo: 'admin@ehb.dev',
        status: 'open',
        priority: 'high',
      },
      {
        id: 'esc_2',
        taskId: 'task_790',
        reason: 'Client complaint about code quality',
        escalatedAt: new Date(),
        escalatedTo: 'support@ehb.dev',
        status: 'in_progress',
        priority: 'medium',
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600';
      case 'offline':
        return 'text-red-600';
      case 'error':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOT Admin Dashboard</h1>
              <p className="text-gray-600">
                Monitor AI agents, system performance, and manage escalations
              </p>
            </div>
            <Link href="/sot">
              <Button variant="outline">
                Back to SOT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* System Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">System Health</p>
                    <p
                      className={`text-lg font-bold ${getSystemHealthColor(systemMetrics.systemHealth)}`}
                    >
                      {systemMetrics.systemHealth}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-lg font-bold text-gray-900">
                      {systemMetrics.activeUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fraud Signals</p>
                    <p className="text-lg font-bold text-gray-900">{systemMetrics.fraudSignals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Uptime</p>
                    <p className="text-lg font-bold text-gray-900">{systemMetrics.uptime}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
            <TabsTrigger value="escalations">Escalations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {systemMetrics.totalUsers.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {systemMetrics.completedTasks.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Completed Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{agentMetrics.length}</p>
                      <p className="text-sm text-gray-500">Active Agents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {systemMetrics.averageResponseTime}s
                      </p>
                      <p className="text-sm text-gray-500">Avg Response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentMetrics.slice(0, 3).map((agent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-3 w-3 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
                        ></div>
                        <span className="font-medium">{agent.name}</span>
                        <span className="text-sm text-gray-500">
                          processed {agent.tasksProcessed} tasks
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {agent.lastActivity.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentMetrics.map((agent, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <p className="text-sm text-gray-500">AI Agent</p>
                      </div>
                      <div
                        className={`h-3 w-3 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Success Rate</span>
                          <span>{agent.successRate}%</span>
                        </div>
                        <Progress value={agent.successRate} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Tasks Processed</p>
                          <p className="font-medium">{agent.tasksProcessed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Avg Time</p>
                          <p className="font-medium">{agent.averageProcessingTime}s</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Errors</p>
                          <p className="font-medium text-red-600">{agent.errors}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Last Activity</p>
                          <p className="font-medium">{agent.lastActivity.toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fraud Detection Tab */}
          <TabsContent value="fraud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudSignals.map(signal => (
                    <div
                      key={signal.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">User {signal.userId}</span>
                            <Badge className={getSeverityColor(signal.severity)}>
                              {signal.severity}
                            </Badge>
                            <Badge variant="outline">{signal.confidence}% confidence</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{signal.description}</p>
                          <p className="text-xs text-gray-500">
                            Detected: {signal.detectedAt.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Lock className="h-4 w-4 mr-2" />
                          Block
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Escalations Tab */}
          <TabsContent value="escalations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Escalations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {escalations.map(escalation => (
                    <div
                      key={escalation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">Task {escalation.taskId}</span>
                            <Badge className={getPriorityColor(escalation.priority)}>
                              {escalation.priority}
                            </Badge>
                            <Badge variant="outline">{escalation.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{escalation.reason}</p>
                          <p className="text-xs text-gray-500">
                            Escalated: {escalation.escalatedAt.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
