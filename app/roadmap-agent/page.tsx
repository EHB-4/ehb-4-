'use client';

import {
  ehbModules,
  ehbServices,
  getOverallProgress,
  getModulesByStatus,
  getModulesByPriority,
} from '../roadmap/data/enhancedRoadmapData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Activity,
  Box,
  CheckCircle,
  Clock,
  Cpu,
  Zap,
  Briefcase,
  Target,
  Building,
  Users,
  Code,
  Globe,
  TrendingUp,
  Shield,
  BookOpen,
  Heart,
  Gavel,
  Plane,
  Store,
  Wallet,
  MessageSquare,
  Send,
  AlertCircle,
  Play,
  Pause,
  CheckSquare,
  Square,
  BarChart3,
  Settings,
  FileText,
  Database,
  Server,
  Smartphone,
  Monitor,
  Cloud,
  Lock,
  Eye,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'done':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'working':
    case 'in progress':
      return <Activity className="h-5 w-5 text-blue-500" />;
    case 'under development':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'not started':
    case 'planned':
      return <Square className="h-5 w-5 text-gray-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-red-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'working':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'under development':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'not started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-red-100 text-red-800 border-red-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div
      className={`h-2.5 rounded-full transition-all duration-300 ${
        progress >= 80
          ? 'bg-green-600'
          : progress >= 60
            ? 'bg-blue-600'
            : progress >= 40
              ? 'bg-yellow-600'
              : progress >= 20
                ? 'bg-orange-600'
                : 'bg-red-600'
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const getModuleIcon = (moduleName: string) => {
  const iconMap: { [key: string]: any } = {
    pss: Shield,
    edr: BookOpen,
    emo: Building,
    gosellr: Store,
    jps: Users,
    franchise: Globe,
    'ai-marketplace': Cpu,
    wallet: Wallet,
    analytics: BarChart3,
    'admin-panel': Settings,
    roadmap: Target,
    'roadmap-agent': Cpu,
    'development-portal': Code,
    'ai-agents': Cpu,
    'ehb-dashboard': Monitor,
    'ehb-home-page': Globe,
  };
  return iconMap[moduleName] || Building;
};

export default function RoadmapAgentPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: 'Hello! I am your EHB Roadmap AI Agent. I can help you track all modules, services, and development progress. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Calculate overall progress
  const overallProgress = getOverallProgress();
  const workingModules = getModulesByStatus('Working');
  const underDevelopmentModules = getModulesByStatus('Under Development');
  const notStartedModules = getModulesByStatus('Not Started');
  const completedModules = getModulesByStatus('Completed');

  // Filter modules based on search and filters
  const filteredModules = ehbModules.filter(module => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || module.status.toLowerCase() === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || module.priority.toLowerCase() === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate agent response based on input
    setTimeout(() => {
      let response = '';
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('progress') || lowerInput.includes('status')) {
        response = `Overall project progress is ${overallProgress}%. We have ${completedModules.length} completed, ${workingModules.length} working, ${underDevelopmentModules.length} under development, and ${notStartedModules.length} not started modules.`;
      } else if (lowerInput.includes('module') || lowerInput.includes('service')) {
        response = `We have ${ehbModules.length} modules across ${ehbServices.length} service categories. You can view detailed information in the modules tab.`;
      } else if (lowerInput.includes('help') || lowerInput.includes('assist')) {
        response =
          'I can help you with: checking module status, viewing progress, finding specific modules, and getting development insights. Just ask!';
      } else {
        response = `I've processed your query: "${input}". I can provide information about module status, progress, dependencies, and development insights. What specific information would you like?`;
      }

      const agentMessage: Message = {
        sender: 'agent',
        text: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                EHB Development Roadmap Agent
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                AI-powered roadmap management and real-time project tracking
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Overall Progress: {overallProgress}%
              </Badge>
              <Badge variant="outline" className="text-sm">
                {ehbModules.length} Modules
              </Badge>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Overall Project Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Project Completion</span>
                    <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
                  </div>
                  <ProgressBar progress={overallProgress} />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {completedModules.length}
                      </div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {workingModules.length}
                      </div>
                      <div className="text-sm text-blue-700">Working</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {underDevelopmentModules.length}
                      </div>
                      <div className="text-sm text-yellow-700">In Development</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        {notStartedModules.length}
                      </div>
                      <div className="text-sm text-gray-700">Not Started</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Categories */}
            <div className="grid md:grid-cols-2 gap-6">
              {ehbServices.map(service => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {service.category === 'Core' && <Shield className="h-5 w-5" />}
                      {service.category === 'Marketplace' && <Store className="h-5 w-5" />}
                      {service.category === 'Support' && <Settings className="h-5 w-5" />}
                      {service.category === 'Analytics' && <BarChart3 className="h-5 w-5" />}
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline">{service.status}</Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {service.modules.length} modules
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.modules.slice(0, 3).map(module => (
                          <Badge key={module.id} variant="secondary" className="text-xs">
                            {module.name}
                          </Badge>
                        ))}
                        {service.modules.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{service.modules.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search modules..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="working">Working</option>
                      <option value="under development">Under Development</option>
                      <option value="not started">Not Started</option>
                    </select>
                    <select
                      value={priorityFilter}
                      onChange={e => setPriorityFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map(module => {
                const IconComponent = getModuleIcon(module.id);
                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                        </div>
                        {getStatusIcon(module.status)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{module.title}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-bold">{module.progress}%</span>
                      </div>
                      <ProgressBar progress={module.progress} />

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                        <Badge className={getPriorityColor(module.priority)}>
                          {module.priority}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {module.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {module.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{module.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Updated: {module.lastUpdated}</span>
                        <Link href={module.path} className="text-blue-600 hover:underline">
                          View →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            {ehbServices.map(service => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {service.category === 'Core' && <Shield className="h-6 w-6" />}
                    {service.category === 'Marketplace' && <Store className="h-6 w-6" />}
                    {service.category === 'Support' && <Settings className="h-6 w-6" />}
                    {service.category === 'Analytics' && <BarChart3 className="h-6 w-6" />}
                    {service.name}
                  </CardTitle>
                  <Badge variant="outline">{service.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.modules.map(module => {
                      const IconComponent = getModuleIcon(module.id);
                      return (
                        <div key={module.id} className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{module.name}</span>
                          </div>
                          <div className="space-y-2">
                            <ProgressBar progress={module.progress} />
                            <div className="flex justify-between text-xs">
                              <span>{module.progress}%</span>
                              <Badge className={getStatusColor(module.status)}>
                                {module.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  AI Assistant Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about modules, progress, or development status..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
