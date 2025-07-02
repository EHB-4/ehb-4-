"use client";

/**
 * SOT Admin Dashboard - Administrative interface for SOT system management
 *
 * Features:
 * - Monitor AI agent performance
 * - Manage user SQL levels
 * - Review fraud signals
 * - Handle escalations
 * - System analytics and metrics
 *
 * @author EHB AI System
 * @version 1.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface SQLChange {
  id: string;
  userId: string;
  oldSQL: string;
  newSQL: string;
  reason: string;
  triggeredBy: string;
  timestamp: Date;
  adminId?: string;
}

export default function SOTAdminDashboard() {
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
  const [sqlChanges, setSqlChanges] = useState<SQLChange[]>([]);
  const [loading, setLoading] = useState(true);

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
        detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'pending',
      },
      {
        id: 'fraud_2',
        userId: 'user_456',
        type: 'stolen_code',
        severity: 'critical',
        confidence: 92,
        description: 'High plagiarism detected in code submission',
        detectedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'pending',
      },
    ]);

    setEscalations([
      {
        id: 'esc_1',
        taskId: 'task_789',
        reason: 'Task overdue by 48 hours',
        escalatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        escalatedTo: 'master_franchise',
        status: 'in_progress',
        priority: 'high',
      },
      {
        id: 'esc_2',
        taskId: 'task_101',
        reason: 'Quality issues reported by client',
        escalatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        escalatedTo: 'sub_franchise',
        status: 'open',
        priority: 'medium',
      },
    ]);

    setSqlChanges([
      {
        id: 'sql_1',
        userId: 'user_789',
        oldSQL: 'Basic',
        newSQL: 'Normal',
        reason: 'Completed 25 tasks with 4.2 average rating',
        triggeredBy: 'automatic',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: 'sql_2',
        userId: 'user_101',
        oldSQL: 'High',
        newSQL: 'Normal',
        reason: 'Manual downgrade due to quality issues',
        triggeredBy: 'admin',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        adminId: 'admin_1',
      },
    ]);

    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReviewFraudSignal = (signalId: string, status: 'confirmed' | 'false_positive') => {
    setFraudSignals(prev =>
      prev.map(signal => (signal.id === signalId ? { ...signal, status: 'reviewed' } : signal))
    );
  };

  const handleResolveEscalation = (escalationId: string) => {
    setEscalations(prev =>
      prev.map(esc => (esc.id === escalationId ? { ...esc, status: 'resolved' } : esc))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SOT Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage the Services of Technology system</p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-green-600">{systemMetrics.systemHealth}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{systemMetrics.activeUsers.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold">{systemMetrics.uptime}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold">{systemMetrics.averageResponseTime}s</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>AI Agents</span>
          </TabsTrigger>
          <TabsTrigger value="fraud" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Fraud</span>
          </TabsTrigger>
          <TabsTrigger value="escalations" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Escalations</span>
          </TabsTrigger>
          <TabsTrigger value="sql" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>SQL Changes</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed Tasks</span>
                    <span className="text-sm font-medium">
                      {systemMetrics.completedTasks.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(systemMetrics.completedTasks / systemMetrics.totalTasks) * 100}
                  />
                  <div className="text-sm text-gray-500">
                    {((systemMetrics.completedTasks / systemMetrics.totalTasks) * 100).toFixed(1)}%
                    completion rate
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fraud Signals</span>
                    <Badge className="bg-red-100 text-red-800">{systemMetrics.fraudSignals}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Escalations</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      {systemMetrics.pendingEscalations}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentMetrics.map(agent => (
                  <div key={agent.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{agent.name}</h3>
                        <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Last active: {agent.lastActivity.toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tasks Processed:</span>
                        <div className="font-medium">{agent.tasksProcessed.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Success Rate:</span>
                        <div className="font-medium">{agent.successRate}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Time:</span>
                        <div className="font-medium">{agent.averageProcessingTime}s</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Errors:</span>
                        <div className="font-medium text-red-600">{agent.errors}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fraud Tab */}
        <TabsContent value="fraud" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Fraud Signals ({fraudSignals.filter(s => s.status === 'pending').length} pending)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fraudSignals.map(signal => (
                  <div key={signal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(signal.severity)}>
                          {signal.severity}
                        </Badge>
                        <span className="font-medium">User: {signal.userId}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {signal.detectedAt.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{signal.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <Progress value={signal.confidence} className="w-20" />
                        <span className="text-sm font-medium">{signal.confidence}%</span>
                      </div>

                      {signal.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReviewFraudSignal(signal.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReviewFraudSignal(signal.id, 'false_positive')}
                          >
                            False Positive
                          </Button>
                        </div>
                      )}

                      {signal.status === 'reviewed' && (
                        <Badge className="bg-blue-100 text-blue-800">Reviewed</Badge>
                      )}
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
              <CardTitle>
                Pending Escalations ({escalations.filter(e => e.status !== 'resolved').length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escalations.map(escalation => (
                  <div key={escalation.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getPriorityColor(escalation.priority)}>
                          {escalation.priority}
                        </Badge>
                        <span className="font-medium">Task: {escalation.taskId}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {escalation.escalatedAt.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{escalation.reason}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Escalated to:</span>
                        <Badge variant="outline">{escalation.escalatedTo}</Badge>
                      </div>

                      {escalation.status !== 'resolved' && (
                        <Button size="sm" onClick={() => handleResolveEscalation(escalation.id)}>
                          Mark Resolved
                        </Button>
                      )}

                      {escalation.status === 'resolved' && (
                        <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SQL Changes Tab */}
        <TabsContent value="sql" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent SQL Level Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sqlChanges.map(change => (
                  <div key={change.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">User: {change.userId}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{change.oldSQL}</Badge>
                          <span className="text-gray-400">→</span>
                          <Badge variant="outline">{change.newSQL}</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {change.timestamp.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{change.reason}</p>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{change.triggeredBy}</Badge>

                      {change.adminId && (
                        <span className="text-sm text-gray-500">Admin: {change.adminId}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <Settings className="h-5 w-5" />
              <span className="text-sm">System Settings</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <Users className="h-5 w-5" />
              <span className="text-sm">User Management</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">Support Tickets</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
