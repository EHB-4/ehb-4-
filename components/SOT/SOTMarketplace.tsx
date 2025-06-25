/**
 * SOT Marketplace - Main interface for Services of Technology marketplace
 *
 * Features:
 * - Browse AI tools and services
 * - Submit development tasks
 * - View developer profiles
 * - Manage SQL levels
 * - AI-powered recommendations
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
  Search,
  Filter,
  Plus,
  Star,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Code,
  MessageSquare,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  developer: {
    id: string;
    name: string;
    sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
    rating: number;
  };
  price: number;
  rating: number;
  downloads: number;
  tags: string[];
  sqlRequired: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  verified: boolean;
  aiPowered: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: Date;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  assignedDeveloper?: {
    id: string;
    name: string;
    sqlLevel: string;
  };
  applicants: number;
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
}

interface Developer {
  id: string;
  name: string;
  email: string;
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  rating: number;
  completedTasks: number;
  skills: string[];
  hourlyRate: number;
  availability: boolean;
  verified: boolean;
  location: string;
}

export default function SOTMarketplace() {
  const [activeTab, setActiveTab] = useState('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSQL, setSelectedSQL] = useState('all');
  const [tools, setTools] = useState<Tool[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);
  const [userSQL, setUserSQL] = useState<'Free' | 'Basic' | 'Normal' | 'High' | 'VIP'>('Normal');

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    setTools([
      {
        id: 'tool_1',
        name: 'AI Resume Builder',
        description: 'Intelligent resume builder with AI-powered suggestions and templates',
        category: 'productivity',
        developer: {
          id: 'dev_1',
          name: 'Ahmed Khan',
          sqlLevel: 'High',
          rating: 4.8,
        },
        price: 25,
        rating: 4.7,
        downloads: 1250,
        tags: ['AI', 'Resume', 'Productivity'],
        sqlRequired: 'Basic',
        verified: true,
        aiPowered: true,
      },
      {
        id: 'tool_2',
        name: 'Voice-to-Text Converter',
        description: 'Advanced speech recognition tool with multi-language support',
        category: 'ai',
        developer: {
          id: 'dev_2',
          name: 'Sarah Chen',
          sqlLevel: 'VIP',
          rating: 4.9,
        },
        price: 50,
        rating: 4.8,
        downloads: 890,
        tags: ['Voice', 'AI', 'Translation'],
        sqlRequired: 'Normal',
        verified: true,
        aiPowered: true,
      },
    ]);

    setTasks([
      {
        id: 'task_1',
        title: 'E-commerce Website Development',
        description: 'Need a modern e-commerce website with payment integration',
        category: 'web-development',
        budget: 500,
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'open',
        applicants: 8,
        complexity: 'advanced',
      },
      {
        id: 'task_2',
        title: 'Mobile App UI Design',
        description: 'Design user interface for a fitness tracking mobile app',
        category: 'design',
        budget: 300,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'open',
        applicants: 12,
        complexity: 'intermediate',
      },
    ]);

    setDevelopers([
      {
        id: 'dev_1',
        name: 'Ahmed Khan',
        email: 'ahmed@ehb.dev',
        sqlLevel: 'High',
        rating: 4.8,
        completedTasks: 127,
        skills: ['React', 'Node.js', 'Python', 'AI/ML'],
        hourlyRate: 50,
        availability: true,
        verified: true,
        location: 'Karachi, Pakistan',
      },
      {
        id: 'dev_2',
        name: 'Sarah Chen',
        email: 'sarah@ehb.dev',
        sqlLevel: 'VIP',
        rating: 4.9,
        completedTasks: 89,
        skills: ['Vue.js', 'PHP', 'DevOps', 'Mobile'],
        hourlyRate: 35,
        availability: true,
        verified: true,
        location: 'Lahore, Pakistan',
      },
    ]);
  }, []);

  const filteredTools = tools.filter(tool => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSQL = selectedSQL === 'all' || tool.sqlRequired === selectedSQL;

    return matchesSearch && matchesCategory && matchesSQL;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredDevelopers = developers.filter(dev => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSQL = selectedSQL === 'all' || dev.sqlLevel === selectedSQL;

    return matchesSearch && matchesSQL;
  });

  const getSQLBadgeColor = (sqlLevel: string) => {
    switch (sqlLevel) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'High':
        return 'bg-blue-100 text-blue-800';
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Basic':
        return 'bg-yellow-100 text-yellow-800';
      case 'Free':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'expert':
        return 'bg-red-100 text-red-800';
      case 'advanced':
        return 'bg-orange-100 text-orange-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'basic':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SOT Marketplace</h1>
        <p className="text-gray-600">
          Discover AI-powered tools, hire developers, and manage your projects
        </p>
      </div>

      {/* User SQL Level Display */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Your SQL Level:</span>
              <Badge className={getSQLBadgeColor(userSQL)}>{userSQL}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={75} className="w-24" />
              <span className="text-sm text-gray-600">75% to next level</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tools, tasks, or developers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="ai">AI Tools</SelectItem>
              <SelectItem value="productivity">Productivity</SelectItem>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSQL} onValueChange={setSelectedSQL}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="SQL Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All SQL Levels</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>AI Tools</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="developers" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Developers</span>
          </TabsTrigger>
        </TabsList>

        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">AI-Powered Tools</h2>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Submit Tool</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    {tool.aiPowered && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        AI Powered
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSQLBadgeColor(tool.sqlRequired)}>{tool.sqlRequired}</Badge>
                    {tool.verified && (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{tool.description}</p>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                    <span className="text-sm text-gray-500">({tool.downloads} downloads)</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tool.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">by</span>
                      <span className="text-sm font-medium">{tool.developer.name}</span>
                      <Badge className={getSQLBadgeColor(tool.developer.sqlLevel)}>
                        {tool.developer.sqlLevel}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${tool.price}</div>
                      <div className="text-sm text-gray-500">EHBGC</div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={tool.sqlRequired !== 'Free' && userSQL === 'Free'}
                  >
                    {tool.sqlRequired !== 'Free' && userSQL === 'Free'
                      ? 'Upgrade Required'
                      : 'Use Tool'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Development Tasks</h2>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post Task</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTasks.map(task => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <Badge className={getComplexityColor(task.complexity)}>{task.complexity}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{task.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Due: {task.deadline.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{task.applicants} applicants</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <div className="text-right">
                      <div className="text-lg font-bold">${task.budget}</div>
                      <div className="text-sm text-gray-500">Budget</div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Developers Tab */}
        <TabsContent value="developers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Verified Developers</h2>
            <Button className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact All</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map(dev => (
              <Card key={dev.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{dev.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Badge className={getSQLBadgeColor(dev.sqlLevel)}>{dev.sqlLevel}</Badge>
                      {dev.verified && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{dev.rating}</span>
                    <span className="text-sm text-gray-500">({dev.completedTasks} tasks)</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>${dev.hourlyRate}/hour</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className={dev.availability ? 'text-green-600' : 'text-red-600'}>
                        {dev.availability ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {dev.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {dev.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dev.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-gray-500">📍 {dev.location}</div>

                  <Button className="w-full" disabled={!dev.availability}>
                    {dev.availability ? 'Hire Developer' : 'Currently Busy'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Based on your SQL level</h4>
              <p className="text-sm text-blue-700">
                Upgrade to High SQL to access premium AI tools and priority support
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Popular in your area</h4>
              <p className="text-sm text-green-700">
                "AI Resume Builder" is trending among developers in your region
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Skill enhancement</h4>
              <p className="text-sm text-purple-700">
                Consider taking the "Advanced AI Development" skill test
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
