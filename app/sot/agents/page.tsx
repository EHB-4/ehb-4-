/**
 * SOT AI Agents Page
 *
 * Manage and interact with AI agents
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
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Play,
  Pause,
  RotateCcw,
  Activity,
  AlertTriangle,
  Database,
  Server,
  Network,
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
  Bitcoin,
  DollarSign,
  Euro,
  PoundSterling,
  Rupee,
  Won,
  Ruble,
  Lira,
  Real,
  Peso,
  Franc,
  Krona,
  Forint,
  Zloty,
  Koruna,
  Leu,
  Lev,
  Hryvnia,
  Tenge,
  Som,
  Tugrik,
  Kyat,
  Kip,
  Dong,
  Baht,
  Ringgit,
  SingaporeDollar,
  HongKongDollar,
  TaiwanDollar,
  NewZealandDollar,
  AustralianDollar,
  CanadianDollar,
  NorwegianKrone,
  SwedishKrona,
  DanishKrone,
  IcelandicKrona,
  PolishZloty,
  CzechKoruna,
  HungarianForint,
  RomanianLeu,
  BulgarianLev,
  CroatianKuna,
  SerbianDinar,
  BosnianMark,
  AlbanianLek,
  MacedonianDenar,
  MontenegrinEuro,
  KosovoEuro,
  MoldovanLeu,
  UkrainianHryvnia,
  BelarusianRuble,
  GeorgianLari,
  ArmenianDram,
  AzerbaijaniManat,
  KazakhstaniTenge,
  KyrgyzstaniSom,
  TajikistaniSomoni,
  TurkmenistaniManat,
  UzbekistaniSom,
  AfghanAfghani,
  PakistaniRupee,
  IndianRupee,
  BangladeshiTaka,
  SriLankanRupee,
  NepaleseRupee,
  BhutaneseNgultrum,
  MaldivianRufiyaa,
  BurmeseKyat,
  CambodianRiel,
  LaotianKip,
  VietnameseDong,
  ThaiBaht,
  MalaysianRinggit,
  Activity as ActivityIcon,
  BarChart3 as BarChart3Icon,
  MessageSquare as MessageSquareIcon,
  Star as StarIcon,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'error' | 'maintenance';
  type: 'matching' | 'review' | 'scheduling' | 'fraud' | 'support' | 'scoring';
  accuracy: number;
  tasksProcessed: number;
  successRate: number;
  averageProcessingTime: number;
  lastActivity: Date;
  errors: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  features: string[];
  config: {
    autoRestart: boolean;
    maxConcurrentTasks: number;
    timeout: number;
    retryAttempts: number;
  };
}

export default function SOTAgentsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    setAgents([
      {
        id: 'devmatch',
        name: 'DevMatchAgent',
        description: 'Intelligent developer-task matching using advanced AI algorithms',
        status: 'online',
        type: 'matching',
        accuracy: 98.5,
        tasksProcessed: 12450,
        successRate: 98.5,
        averageProcessingTime: 0.8,
        lastActivity: new Date(),
        errors: 2,
        icon: <Users className="h-6 w-6" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        features: ['Skill-based matching', 'Availability checking', 'Performance analysis', 'Real-time updates'],
        config: {
          autoRestart: true,
          maxConcurrentTasks: 50,
          timeout: 30,
          retryAttempts: 3,
        },
      },
      {
        id: 'codecheck',
        name: 'CodeCheckAgent',
        description: 'Automated code review and quality assessment',
        status: 'online',
        type: 'review',
        accuracy: 96.2,
        tasksProcessed: 8920,
        successRate: 96.2,
        averageProcessingTime: 2.1,
        lastActivity: new Date(),
        errors: 5,
        icon: <Code className="h-6 w-6" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        features: ['Static analysis', 'Security scanning', 'Performance optimization', 'Plagiarism detection'],
        config: {
          autoRestart: true,
          maxConcurrentTasks: 25,
          timeout: 60,
          retryAttempts: 2,
        },
      },
      {
        id: 'scheduler',
        name: 'SchedulerAgent',
        description: 'Intelligent project timeline and deadline management',
        status: 'online',
        type: 'scheduling',
        accuracy: 99.1,
        tasksProcessed: 15670,
        successRate: 99.1,
        averageProcessingTime: 0.3,
        lastActivity: new Date(),
        errors: 1,
        icon: <Clock className="h-6 w-6" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        features: ['Deadline tracking', 'Timezone management', 'Escalation handling', 'Milestone monitoring'],
        config: {
          autoRestart: true,
          maxConcurrentTasks: 100,
          timeout: 10,
          retryAttempts: 5,
        },
      },
      {
        id: 'fraudwatch',
        name: 'FraudWatchAgent',
        description: 'Advanced fraud detection and prevention system',
        status: 'online',
        type: 'fraud',
        accuracy: 97.8,
        tasksProcessed: 23450,
        successRate: 97.8,
        averageProcessingTime: 1.5,
        lastActivity: new Date(),
        errors: 3,
        icon: <Shield className="h-6 w-6" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        features: ['Behavioral analysis', 'Pattern recognition', 'Real-time monitoring', 'Risk scoring'],
        config: {
          autoRestart: true,
          maxConcurrentTasks: 200,
          timeout: 15,
          retryAttempts: 1,
        },
      },
      {
        id: 'complaintbot',
        name: 'ComplaintBot',
        description: 'AI-powered complaint handling and support',
        status: 'online',
        type: 'support',
        accuracy: 94.5,
        tasksProcessed: 3450,
        successRate: 94.5,
        averageProcessingTime: 3.2,
        lastActivity: new Date(),
        errors: 8,
        icon: <MessageSquare className="h-6 w-6" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        features: ['NLP processing', 'Sentiment analysis', 'Auto-resolution', 'Escalation routing'],
        config: {
          autoRestart: true,
          maxConcurrentTasks: 75,
          timeout: 45,
          retryAttempts: 2,
        },
      },
      {
        id: 'sqlscore',
        name: 'SQLScoreAgent',
        description: 'SQL level management and reputation scoring',
        status: 'online',
        type: 'scoring',
        accuracy: 99.3,
        tasksProcessed: 8900,
        successRate: 99.3,
        averageProcessingTime: 0.5,
        lastActivity: new Date(),
        errors: 1,
        icon: <Star className="h-6 w-6" />,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        features: ['Score calculation', 'Level management', 'Bonus/penalty system', 'Blockchain verification'],
        config: {
          autoRestart: true,
          maxConcurrentTasks: 150,
          timeout: 20,
          retryAttempts: 3,
        },
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'error': return 'text-orange-600';
      case 'maintenance': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-orange-100 text-orange-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAgentAction = (agentId: string, action: 'start' | 'stop' | 'restart') => {
    console.log(`${action} agent ${agentId}`);
    // In real implementation, this would call API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOT AI Agents</h1>
              <p className="text-gray-600">Manage and monitor intelligent AI agents</p>
            </div>
            <Link href="/sot">
              <Button variant="outline">
                Back to SOT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Online Agents</p>
                    <p className="text-lg font-bold text-gray-900">
                      {agents.filter(a => a.status === 'online').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Tasks</p>
                    <p className="text-lg font-bold text-gray-900">
                      {agents.reduce((sum, agent) => sum + agent.tasksProcessed, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg Success Rate</p>
                    <p className="text-lg font-bold text-gray-900">
                      {(agents.reduce((sum, agent) => sum + agent.successRate, 0) / agents.length).toFixed(1)}%
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
                    <p className="text-sm text-gray-500">Total Errors</p>
                    <p className="text-lg font-bold text-gray-900">
                      {agents.reduce((sum, agent) => sum + agent.errors, 0)}
                    </p>
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">All Agents</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedAgent(agent)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-12 w-12 ${agent.bgColor} rounded-lg flex items-center justify-center`}>
                          <div className={agent.color}>{agent.icon}</div>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <p className="text-sm text-gray-500">{agent.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusBadgeColor(agent.status)}>
                        {agent.status}
                      </Badge>
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
                          <p className="text-gray-500">Tasks</p>
                          <p className="font-medium">{agent.tasksProcessed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Avg Time</p>
                          <p className="font-medium">{agent.averageProcessingTime}s</p>
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

          {/* All Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="space-y-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`h-16 w-16 ${agent.bgColor} rounded-lg flex items-center justify-center`}>
                          <div className={`${agent.color} h-8 w-8`}>{agent.icon}</div>
                        </div>
                        <div>
                          <CardTitle className="text-xl">{agent.name}</CardTitle>
                          <p className="text-gray-600">{agent.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={getStatusBadgeColor(agent.status)}>
                              {agent.status}
                            </Badge>
                            <Badge variant="outline">
                              {agent.accuracy}% accuracy
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={agent.status === 'online' ? 'outline' : 'default'}
                          onClick={() => handleAgentAction(agent.id, agent.status === 'online' ? 'stop' : 'start')}
                        >
                          {agent.status === 'online' ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAgentAction(agent.id, 'restart')}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restart
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Performance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Tasks Processed:</span>
                            <span className="font-medium">{agent.tasksProcessed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Success Rate:</span>
                            <span className="font-medium">{agent.successRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Processing:</span>
                            <span className="font-medium">{agent.averageProcessingTime}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Errors:</span>
                            <span className="font-medium text-red-600">{agent.errors}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Configuration</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Auto Restart:</span>
                            <span className="font-medium">{agent.config.autoRestart ? 'Yes' : 'No'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Tasks:</span>
                            <span className="font-medium">{agent.config.maxConcurrentTasks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Timeout:</span>
                            <span className="font-medium">{agent.config.timeout}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Retry Attempts:</span>
                            <span className="font-medium">{agent.config.retryAttempts}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Features</h4>
                        <div className="space-y-1">
                          {agent.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Last Activity</h4>
                        <div className="text-sm text-gray-600">
                          {agent.lastActivity.toLocaleString()}
                        </div>
                        <div className="mt-4">
                          <Button size="sm" className="w-full">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Agent Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`h-3 w-3 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className={`h-10 w-10 ${agent.bgColor} rounded-lg flex items-center justify-center`}>
                          <div className={agent.color}>{agent.icon}</div>
                        </div>
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-gray-500">
                            {agent.tasksProcessed} tasks • {agent.successRate}% success
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{agent.averageProcessingTime}s</p>
                          <p className="text-xs text-gray-500">avg time</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{agent.errors}</p>
                          <p className="text-xs text-gray-500">errors</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Activity className="h-4 w-4" />
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