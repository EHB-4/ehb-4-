'use client';

/**
 * SOT Marketplace - Enhanced Version
 *
 * Real-time marketplace with products, AI agents, and services
 * Integrated with EHBMainAgent for live status updates
 *
 * @author EHB AI System
 * @version 2.0.0
 */

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
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Download,
  Play,
  Pause,
  RefreshCw,
  Brain,
  Code,
  Shield,
  Globe,
  Smartphone,
  Database,
  Server,
  Lock,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Settings,
  BarChart3,
  MessageSquare,
  Star as StarIcon,
} from 'lucide-react';
import { ehbMainAgent, AgentStatus } from '@/lib/ai/EHBMainAgent';

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'ai-agent' | 'service' | 'product' | 'template';
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  status: 'available' | 'in-use' | 'maintenance';
  agentId?: string;
  features: string[];
  tags: string[];
  image?: string;
  downloads?: number;
  lastUpdated: Date;
}

export default function SOTMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [activeTab, setActiveTab] = useState('all');
  const [agentsStatus, setAgentsStatus] = useState<AgentStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock marketplace data
  const [marketplaceItems] = useState<MarketplaceItem[]>([
    {
      id: 'monitoring-agent',
      name: 'EHB Monitoring Agent',
      description:
        'Advanced 24/7 system monitoring with real-time alerts and performance optimization',
      category: 'ai-agent',
      price: 99.99,
      currency: 'USD',
      rating: 4.8,
      reviews: 156,
      status: 'available',
      agentId: 'monitoring',
      features: ['Real-time monitoring', 'Performance alerts', 'Auto-scaling', 'Health checks'],
      tags: ['monitoring', 'performance', 'automation'],
      downloads: 1247,
      lastUpdated: new Date('2024-01-15'),
    },
    {
      id: 'deployment-agent',
      name: 'EHB Deployment Agent',
      description: 'Automated CI/CD pipeline management with rollback capabilities',
      category: 'ai-agent',
      price: 149.99,
      currency: 'USD',
      rating: 4.9,
      reviews: 89,
      status: 'available',
      agentId: 'deployment',
      features: [
        'Auto-deployment',
        'Rollback support',
        'Environment management',
        'Version control',
      ],
      tags: ['deployment', 'ci-cd', 'automation'],
      downloads: 892,
      lastUpdated: new Date('2024-01-10'),
    },
    {
      id: 'fixer-agent',
      name: 'EHB Fixer Agent',
      description: 'Intelligent bug detection and automatic code fixing',
      category: 'ai-agent',
      price: 199.99,
      currency: 'USD',
      rating: 4.7,
      reviews: 203,
      status: 'available',
      agentId: 'fixer',
      features: ['Bug detection', 'Auto-fixing', 'Code optimization', 'Security scanning'],
      tags: ['bug-fixing', 'optimization', 'security'],
      downloads: 1567,
      lastUpdated: new Date('2024-01-12'),
    },
    {
      id: 'franchise-agent',
      name: 'EHB Franchise Agent',
      description: 'Comprehensive franchise management and expansion analysis',
      category: 'ai-agent',
      price: 299.99,
      currency: 'USD',
      rating: 4.6,
      reviews: 67,
      status: 'available',
      agentId: 'franchise',
      features: ['Location analysis', 'Growth planning', 'Market research', 'Performance tracking'],
      tags: ['franchise', 'business', 'analytics'],
      downloads: 445,
      lastUpdated: new Date('2024-01-08'),
    },
    {
      id: 'seo-agent',
      name: 'EHB SEO Agent',
      description: 'Advanced SEO optimization and content management',
      category: 'ai-agent',
      price: 179.99,
      currency: 'USD',
      rating: 4.8,
      reviews: 134,
      status: 'available',
      agentId: 'seo',
      features: [
        'Keyword research',
        'Content optimization',
        'Ranking tracking',
        'Competitor analysis',
      ],
      tags: ['seo', 'marketing', 'content'],
      downloads: 1123,
      lastUpdated: new Date('2024-01-14'),
    },
    {
      id: 'development-agent',
      name: 'EHB AI DEV Agent',
      description: 'Real-time coding assistant with project management',
      category: 'ai-agent',
      price: 399.99,
      currency: 'USD',
      rating: 4.9,
      reviews: 278,
      status: 'available',
      agentId: 'development',
      features: ['Real-time coding', 'Project management', 'Code review', 'Testing automation'],
      tags: ['development', 'coding', 'project-management'],
      downloads: 2034,
      lastUpdated: new Date('2024-01-16'),
    },
    {
      id: 'web-template',
      name: 'Modern Web Template',
      description: 'Responsive web template with modern UI/UX design',
      category: 'template',
      price: 49.99,
      currency: 'USD',
      rating: 4.5,
      reviews: 89,
      status: 'available',
      features: ['Responsive design', 'Modern UI', 'SEO optimized', 'Fast loading'],
      tags: ['template', 'web', 'ui-ux'],
      downloads: 567,
      lastUpdated: new Date('2024-01-05'),
    },
    {
      id: 'api-service',
      name: 'EHB API Service',
      description: 'High-performance API service with authentication and rate limiting',
      category: 'service',
      price: 79.99,
      currency: 'USD',
      rating: 4.7,
      reviews: 112,
      status: 'available',
      features: ['Authentication', 'Rate limiting', 'Documentation', 'Analytics'],
      tags: ['api', 'service', 'backend'],
      downloads: 789,
      lastUpdated: new Date('2024-01-11'),
    },
  ]);

  // Load agent status
  useEffect(() => {
    loadAgentStatus();
    const interval = setInterval(loadAgentStatus, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAgentStatus = () => {
    setAgentsStatus(ehbMainAgent.getAllAgentsStatus());
  };

  const getAgentStatus = (agentId: string) => {
    return agentsStatus.find(agent => agent.id === agentId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'stopped':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'idle':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-agent':
        return <Brain className="w-5 h-5" />;
      case 'service':
        return <Server className="w-5 h-5" />;
      case 'product':
        return <Smartphone className="w-5 h-5" />;
      case 'template':
        return <Code className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return (b.downloads || 0) - (a.downloads || 0);
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const handlePurchase = (item: MarketplaceItem) => {
    setIsLoading(true);
    // Simulate purchase process
    setTimeout(() => {
      alert(`Purchase successful! ${item.name} has been added to your account.`);
      setIsLoading(false);
    }, 2000);
  };

  const handleDownload = (item: MarketplaceItem) => {
    setIsLoading(true);
    // Simulate download process
    setTimeout(() => {
      alert(`Download started for ${item.name}`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">SOT Marketplace</h1>
              </div>
              <Badge variant="default">{filteredItems.length} items available</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={loadAgentStatus}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ai-agent">AI Agents</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                  <SelectItem value="product">Products</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-use">In Use</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map(item => {
              const agentStatus = item.agentId ? getAgentStatus(item.agentId) : null;

              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(item.category)}
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </div>
                      {agentStatus && getStatusIcon(agentStatus.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-gray-500">({item.reviews})</span>
                      </div>
                      <Badge variant={item.status === 'available' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">
                          {item.currency} {item.price}
                        </span>
                        {item.downloads && (
                          <span className="text-sm text-gray-500">{item.downloads} downloads</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {agentStatus && (
                        <div className="bg-gray-50 rounded p-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span>Agent Status:</span>
                            <span
                              className={`font-medium ${
                                agentStatus.status === 'running'
                                  ? 'text-green-600'
                                  : agentStatus.status === 'stopped'
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                              }`}
                            >
                              {agentStatus.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span>Tasks:</span>
                            <span className="font-medium">
                              {agentStatus.tasks.completed} completed, {agentStatus.tasks.pending}{' '}
                              pending
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handlePurchase(item)}
                          disabled={isLoading || item.status !== 'available'}
                          className="flex-1"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Purchase
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDownload(item)}
                          disabled={isLoading}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {sortedItems.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
