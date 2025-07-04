"use client";

/**
 * SOT (Services of Technology) - Main Page
 *
 * Entry point for the SOT system with AI agent integration
 *
 * @author EHB AI System
 * @version 2.0.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Code,
  Shield,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
  Search,
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Smartphone,
  Database,
  Server,
  Lock,
  Activity,
  Play,
  Pause,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import { ehbMainAgent, AgentStatus, AgentTask } from '@/lib/ai/EHBMainAgent';

export default function SOTMainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [agentsStatus, setAgentsStatus] = useState<AgentStatus[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [mainAgentStatus, setMainAgentStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadAgentData();
    
    // Set up real-time updates
    const interval = setInterval(loadAgentData, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadAgentData = () => {
    setAgentsStatus(ehbMainAgent.getAllAgentsStatus());
    setTasks(ehbMainAgent.getAllTasks());
    setMainAgentStatus(ehbMainAgent.getStatus());
  };

  const handleStartMainAgent = async () => {
    setIsLoading(true);
    try {
      await ehbMainAgent.start();
      loadAgentData();
    } catch (error) {
      console.error('Failed to start main agent:', error);
    }
    setIsLoading(false);
  };

  const handleStopMainAgent = async () => {
    setIsLoading(true);
    try {
      await ehbMainAgent.stop();
      loadAgentData();
    } catch (error) {
      console.error('Failed to stop main agent:', error);
    }
    setIsLoading(false);
  };

  const handleStartAgent = async (agentId: string) => {
    try {
      await ehbMainAgent.startAgent(agentId);
      loadAgentData();
    } catch (error) {
      console.error(`Failed to start agent ${agentId}:`, error);
    }
  };

  const handleStopAgent = async (agentId: string) => {
    try {
      await ehbMainAgent.stopAgent(agentId);
      loadAgentData();
    } catch (error) {
      console.error(`Failed to stop agent ${agentId}:`, error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'error': return 'bg-yellow-500';
      case 'idle': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'stopped': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'idle': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredAgents = agentsStatus.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">SOT Platform</h1>
              </div>
              <Badge variant={mainAgentStatus?.status === 'running' ? 'default' : 'secondary'}>
                {mainAgentStatus?.status === 'running' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Main Agent:</span>
                {mainAgentStatus?.status === 'running' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStopMainAgent}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pause className="w-4 h-4" />}
                    Stop
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartMainAgent}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    Start
                  </Button>
                )}
              </div>
              
              <Button onClick={loadAgentData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mainAgentStatus?.agentsCount || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {mainAgentStatus?.runningAgents || 0} running
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'running').length}</div>
                  <p className="text-xs text-muted-foreground">
                    {tasks.filter(t => t.status === 'pending').length} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'completed').length}</div>
                  <p className="text-xs text-muted-foreground">
                    {tasks.filter(t => t.status === 'failed').length} failed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <p className="text-xs text-muted-foreground">
                    All systems operational
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/sot/marketplace">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                      <Globe className="w-6 h-6 mb-2" />
                      <span className="text-sm">Marketplace</span>
                    </Button>
                  </Link>
                  
                  <Link href="/sot/development">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                      <Code className="w-6 h-6 mb-2" />
                      <span className="text-sm">Development</span>
                    </Button>
                  </Link>
                  
                  <Link href="/sot/agents">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                      <Brain className="w-6 h-6 mb-2" />
                      <span className="text-sm">AI Agents</span>
                    </Button>
                  </Link>
                  
                  <Link href="/sot/analytics">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      <span className="text-sm">Analytics</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">AI Agents Status</h2>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      {getStatusIcon(agent.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                      <span className="text-sm text-gray-600 capitalize">{agent.status}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Tasks Completed:</span>
                        <span className="font-medium">{agent.tasks.completed}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending Tasks:</span>
                        <span className="font-medium">{agent.tasks.pending}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Failed Tasks:</span>
                        <span className="font-medium text-red-600">{agent.tasks.failed}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Activity:</span>
                        <span className="font-medium">
                          {new Date(agent.lastActivity).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        {agent.status === 'running' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStopAgent(agent.id)}
                            className="flex-1"
                          >
                            <Pause className="w-4 h-4 mr-1" />
                            Stop
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartAgent(agent.id)}
                            className="flex-1"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Tasks</h2>
              <Button variant="outline" onClick={loadAgentData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(task.status)}
                        <div>
                          <h3 className="font-medium">{task.description}</h3>
                          <p className="text-sm text-gray-600">
                            Assigned to: {agentsStatus.find(a => a.id === task.agentId)?.name || task.agentId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={task.priority === 'critical' ? 'destructive' : 'secondary'}>
                          {task.priority}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(task.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/sot/marketplace">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="w-5 h-5" />
                      <span>Marketplace</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Browse and purchase technology services, AI agents, and products.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/sot/development">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Code className="w-5 h-5" />
                      <span>Development</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Real-time coding environment with AI assistance and project management.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/sot/agents">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Agents</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Manage and monitor all AI agents in the SOT ecosystem.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/sot/security">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Security</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Advanced security monitoring and threat detection systems.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/sot/analytics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Analytics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Comprehensive analytics and performance monitoring dashboard.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/sot/admin">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Administrative controls and system configuration management.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
