/**
 * SOT Marketplace Page
 *
 * Main marketplace for AI tools, services, and developers
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Globe,
  Brain,
  Zap,
  ArrowRight,
  Download,
  Eye,
  Heart,
  Share2,
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
  featured: boolean;
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
  featured: boolean;
}

export default function SOTMarketplacePage() {
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
        featured: true,
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
        featured: false,
      },
      {
        id: 'tool_3',
        name: 'Code Quality Analyzer',
        description: 'Automated code review and quality assessment tool',
        category: 'development',
        developer: {
          id: 'dev_3',
          name: 'Muhammad Ali',
          sqlLevel: 'High',
          rating: 4.6,
        },
        price: 75,
        rating: 4.5,
        downloads: 567,
        tags: ['Code', 'Quality', 'Review'],
        sqlRequired: 'Normal',
        verified: true,
        aiPowered: true,
        featured: true,
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
      {
        id: 'task_3',
        title: 'AI Chatbot Integration',
        description: 'Integrate AI chatbot into existing customer support system',
        category: 'ai',
        budget: 800,
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        status: 'open',
        applicants: 5,
        complexity: 'expert',
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
        featured: true,
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
        featured: false,
      },
      {
        id: 'dev_3',
        name: 'Muhammad Ali',
        email: 'ali@ehb.dev',
        sqlLevel: 'High',
        rating: 4.6,
        completedTasks: 156,
        skills: ['Angular', 'Java', 'Spring Boot', 'Microservices'],
        hourlyRate: 45,
        availability: false,
        verified: true,
        location: 'Islamabad, Pakistan',
        featured: true,
      },
    ]);
  }, []);

  const getSQLBadgeColor = (sqlLevel: string) => {
    switch (sqlLevel) {
      case 'Free': return 'bg-gray-100 text-gray-800';
      case 'Basic': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'VIP': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSQL = selectedSQL === 'all' || tool.sqlRequired === selectedSQL;
    return matchesSearch && matchesCategory && matchesSQL;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         developer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSQL = selectedSQL === 'all' || developer.sqlLevel === selectedSQL;
    return matchesSearch && matchesSQL;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOT Marketplace</h1>
              <p className="text-gray-600">Discover AI tools, services, and connect with verified developers</p>
            </div>
            <Link href="/sot">
              <Button variant="outline">
                Back to SOT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for tools, tasks, or developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ai">AI & ML</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSQL} onValueChange={setSelectedSQL}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="SQL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All SQL</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tools">AI Tools & Services</TabsTrigger>
            <TabsTrigger value="tasks">Development Tasks</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
          </TabsList>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          {tool.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getSQLBadgeColor(tool.sqlRequired)}>
                            {tool.sqlRequired}
                          </Badge>
                          {tool.verified && (
                            <Badge className="bg-green-100 text-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {tool.aiPowered && (
                            <Badge className="bg-purple-100 text-purple-800">
                              <Brain className="h-3 w-3 mr-1" />
                              AI Powered
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{tool.rating}</span>
                        <span className="text-sm text-gray-500">({tool.downloads} downloads)</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">${tool.price}</div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        by {tool.developer.name}
                      </div>
                      <Badge className={getSQLBadgeColor(tool.developer.sqlLevel)}>
                        {tool.developer.sqlLevel}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {tool.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Get Tool
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{task.title}</CardTitle>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getComplexityColor(task.complexity)}>
                            {task.complexity}
                          </Badge>
                          <Badge variant="outline">
                            {task.applicants} applicants
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-green-600">${task.budget}</div>
                      <div className="text-sm text-gray-500">
                        Due: {task.deadline.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Developers Tab */}
          <TabsContent value="developers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.map((developer) => (
                <Card key={developer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{developer.name}</CardTitle>
                          {developer.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{developer.location}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getSQLBadgeColor(developer.sqlLevel)}>
                            {developer.sqlLevel}
                          </Badge>
                          {developer.verified && (
                            <Badge className="bg-green-100 text-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge variant={developer.availability ? "default" : "secondary"}>
                            {developer.availability ? 'Available' : 'Busy'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{developer.rating}</span>
                        <span className="text-sm text-gray-500">({developer.completedTasks} tasks)</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">${developer.hourlyRate}/hr</div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {developer.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {developer.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{developer.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Hire Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 