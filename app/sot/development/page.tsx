"use client";

/**
 * SOT Development Page
 *
 * Development hub for creating and managing projects
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
  Code,
  Brain,
  Zap,
  ArrowRight,
  Plus,
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Smartphone,
  Database,
  Server,
  Network,
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
  Activity,
  BarChart3 as BarChart3Icon,
  MessageSquare as MessageSquareIcon,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  GitBranch,
  Terminal,
  FileText,
  Users,
  Shield,
  TrendingUp,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'mobile' | 'ai' | 'backend' | 'fullstack';
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed';
  progress: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  team: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }[];
  technologies: string[];
  features: string[];
  aiAssistance: {
    codeReview: boolean;
    testing: boolean;
    deployment: boolean;
    monitoring: boolean;
  };
}

interface DevelopmentTool {
  id: string;
  name: string;
  description: string;
  category: 'ide' | 'testing' | 'deployment' | 'monitoring' | 'ai';
  status: 'available' | 'in_use' | 'maintenance';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  features: string[];
  rating: number;
  usage: number;
}

export default function SOTDevelopmentPage() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [tools, setTools] = useState<DevelopmentTool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    setProjects([
      {
        id: 'proj_1',
        name: 'E-commerce Platform',
        description: 'Modern e-commerce platform with AI-powered recommendations',
        type: 'fullstack',
        status: 'development',
        progress: 65,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-15'),
        budget: 50000,
        spent: 32500,
        team: [
          { id: '1', name: 'Ahmed Khan', role: 'Lead Developer', avatar: 'AK' },
          { id: '2', name: 'Sarah Chen', role: 'Frontend Developer', avatar: 'SC' },
          { id: '3', name: 'Muhammad Ali', role: 'Backend Developer', avatar: 'MA' },
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
        features: ['User authentication', 'Product catalog', 'Payment integration', 'AI recommendations'],
        aiAssistance: {
          codeReview: true,
          testing: true,
          deployment: false,
          monitoring: true,
        },
      },
      {
        id: 'proj_2',
        name: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        type: 'mobile',
        status: 'testing',
        progress: 85,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-05-01'),
        budget: 75000,
        spent: 63750,
        team: [
          { id: '4', name: 'Fatima Ahmed', role: 'Mobile Developer', avatar: 'FA' },
          { id: '5', name: 'Hassan Ali', role: 'Security Expert', avatar: 'HA' },
        ],
        technologies: ['React Native', 'Firebase', 'Biometric SDK'],
        features: ['Account management', 'Fund transfers', 'Biometric login', 'Transaction history'],
        aiAssistance: {
          codeReview: true,
          testing: true,
          deployment: true,
          monitoring: true,
        },
      },
      {
        id: 'proj_3',
        name: 'AI Chatbot System',
        description: 'Intelligent chatbot for customer support automation',
        type: 'ai',
        status: 'planning',
        progress: 25,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-08-01'),
        budget: 30000,
        spent: 7500,
        team: [
          { id: '6', name: 'Aisha Khan', role: 'AI Engineer', avatar: 'AK' },
          { id: '7', name: 'Omar Hassan', role: 'NLP Specialist', avatar: 'OH' },
        ],
        technologies: ['Python', 'TensorFlow', 'NLP', 'WebSocket'],
        features: ['Natural language processing', 'Multi-language support', 'Integration APIs', 'Analytics dashboard'],
        aiAssistance: {
          codeReview: true,
          testing: false,
          deployment: false,
          monitoring: false,
        },
      },
    ]);

    setTools([
      {
        id: 'tool_1',
        name: 'AI Code Assistant',
        description: 'Intelligent code completion and review',
        category: 'ai',
        status: 'available',
        icon: <Brain className="h-6 w-6" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        features: ['Code completion', 'Bug detection', 'Performance optimization', 'Security scanning'],
        rating: 4.8,
        usage: 85,
      },
      {
        id: 'tool_2',
        name: 'Automated Testing Suite',
        description: 'Comprehensive testing automation',
        category: 'testing',
        status: 'in_use',
        icon: <CheckCircle className="h-6 w-6" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        features: ['Unit testing', 'Integration testing', 'E2E testing', 'Performance testing'],
        rating: 4.6,
        usage: 92,
      },
      {
        id: 'tool_3',
        name: 'Deployment Pipeline',
        description: 'Automated deployment and CI/CD',
        category: 'deployment',
        status: 'available',
        icon: <GitBranch className="h-6 w-6" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        features: ['Git integration', 'Auto deployment', 'Rollback capability', 'Environment management'],
        rating: 4.7,
        usage: 78,
      },
      {
        id: 'tool_4',
        name: 'Performance Monitor',
        description: 'Real-time application monitoring',
        category: 'monitoring',
        status: 'in_use',
        icon: <BarChart3 className="h-6 w-6" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        features: ['Performance metrics', 'Error tracking', 'User analytics', 'Alert system'],
        rating: 4.5,
        usage: 88,
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'deployment': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return <Globe className="h-5 w-5" />;
      case 'mobile': return <Smartphone className="h-5 w-5" />;
      case 'ai': return <Brain className="h-5 w-5" />;
      case 'backend': return <Server className="h-5 w-5" />;
      case 'fullstack': return <Code className="h-5 w-5" />;
      default: return <Code className="h-5 w-5" />;
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOT Development Hub</h1>
              <p className="text-gray-600">Create, manage, and deploy projects with AI assistance</p>
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
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Projects</p>
                    <p className="text-lg font-bold text-gray-900">{projects.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Team Members</p>
                    <p className="text-lg font-bold text-gray-900">
                      {projects.reduce((sum, project) => sum + project.team.length, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">AI Tools</p>
                    <p className="text-lg font-bold text-gray-900">{tools.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg Progress</p>
                    <p className="text-lg font-bold text-gray-900">
                      {Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)}%
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
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tools">Development Tools</TabsTrigger>
            <TabsTrigger value="ai">AI Assistance</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(project.type)}
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline">
                            {project.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      {/* Budget */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Budget</p>
                          <p className="font-medium">${project.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Spent</p>
                          <p className="font-medium">${project.spent.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Team */}
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Team ({project.team.length} members)</p>
                        <div className="flex space-x-2">
                          {project.team.slice(0, 3).map((member) => (
                            <div
                              key={member.id}
                              className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600"
                            >
                              {member.avatar}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Technologies</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* AI Assistance */}
                      <div>
                        <p className="text-sm text-gray-500 mb-2">AI Assistance</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(project.aiAssistance).map(([key, enabled]) => (
                            <div key={key} className="flex items-center space-x-1">
                              {enabled ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 text-gray-400" />
                              )}
                              <span className={enabled ? 'text-green-600' : 'text-gray-500'}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Development Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`h-12 w-12 ${tool.bgColor} rounded-lg flex items-center justify-center`}>
                        <div className={tool.color}>{tool.icon}</div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <p className="text-sm text-gray-500">{tool.category}</p>
                      </div>
                      <Badge variant={tool.status === 'available' ? 'default' : 'secondary'}>
                        {tool.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{tool.description}</p>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Usage</span>
                          <span>{tool.usage}%</span>
                        </div>
                        <Progress value={tool.usage} className="h-2" />
                      </div>

                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{tool.rating}</span>
                        <span className="text-sm text-gray-500">rating</span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">Features</p>
                        <div className="space-y-1">
                          {tool.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {tool.features.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{tool.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Use Tool
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Assistance Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="text-center py-12">
              <div className="max-w-2xl mx-auto">
                <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Development</h2>
                <p className="text-gray-600 mb-8">
                  Leverage advanced AI assistance for code review, testing, deployment, and monitoring
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Code className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">AI Code Review</h3>
                          <p className="text-sm text-gray-500">Automated code quality analysis</p>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Start Code Review
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">AI Testing</h3>
                          <p className="text-sm text-gray-500">Intelligent test generation</p>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Generate Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <GitBranch className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">AI Deployment</h3>
                          <p className="text-sm text-gray-500">Smart deployment automation</p>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Deploy Project
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">AI Monitoring</h3>
                          <p className="text-sm text-gray-500">Predictive performance monitoring</p>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Activity className="h-4 w-4 mr-2" />
                        Monitor System
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 