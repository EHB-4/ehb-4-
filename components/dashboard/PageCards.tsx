'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Search,
  Star,
  TrendingUp,
  Users,
  Building,
  Briefcase,
  ShoppingCart,
  Shield,
  Settings,
  BarChart3,
  Globe,
  Award,
  Crown,
  Target,
  Zap,
  Heart,
  Wallet,
  BookOpen,
  Scale,
  Plane,
  Home,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface PageCard {
  id: string;
  title: string;
  url: string;
  description: string;
  status: 'active' | 'development' | 'planned';
  completion: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  icon?: React.ReactNode;
  color?: string;
}

const pageCards: PageCard[] = [
  // Core Services (100% Complete)
  {
    id: 'home',
    title: 'EHB Home',
    url: '/',
    description: 'Main landing page with comprehensive service overview',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['landing', 'main'],
    icon: <Home className="h-6 w-6" />,
    color: 'bg-blue-500',
  },
  {
    id: 'jps',
    title: 'Job Placement System',
    url: '/jps',
    description: 'AI-powered job matching and placement platform',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['jobs', 'ai', 'placement'],
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-green-500',
  },
  {
    id: 'franchise',
    title: 'EHB Franchise Network',
    url: '/franchise',
    description: 'Global franchise management and expansion platform',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['franchise', 'business', 'expansion'],
    icon: <Building className="h-6 w-6" />,
    color: 'bg-purple-500',
  },
  {
    id: 'wms',
    title: 'World Medical Services',
    url: '/wms',
    description: 'Online + offline verified healthcare system',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['health', 'medical', 'verified'],
    icon: <Heart className="h-6 w-6" />,
    color: 'bg-red-500',
  },
  {
    id: 'ols',
    title: 'Online Law Services',
    url: '/ols',
    description: 'AI-Powered Legal Services Platform',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['legal', 'ai', 'services'],
    icon: <Scale className="h-6 w-6" />,
    color: 'bg-yellow-500',
  },
  {
    id: 'agts',
    title: 'Advanced Global Travel Services',
    url: '/agts',
    description: 'AI-powered Travel Ecosystem',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['travel', 'ai', 'global'],
    icon: <Plane className="h-6 w-6" />,
    color: 'bg-indigo-500',
  },
  {
    id: 'wallet',
    title: 'Trusty Wallet',
    url: '/wallet',
    description: 'Digital wallet and payment processing',
    status: 'active',
    completion: 100,
    category: 'Core Services',
    priority: 'high',
    tags: ['wallet', 'payment', 'digital'],
    icon: <Wallet className="h-6 w-6" />,
    color: 'bg-emerald-500',
  },

  // Development Services
  {
    id: 'pss',
    title: 'Personal Security System',
    url: '/pss',
    description: 'Identity verification, KYC, fraud prevention',
    status: 'development',
    completion: 75,
    category: 'Development Services',
    priority: 'high',
    tags: ['security', 'kyc', 'verification'],
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-orange-500',
  },
  {
    id: 'edr',
    title: 'Emergency Decision Registration',
    url: '/edr',
    description: 'AI-powered skill verification, exams',
    status: 'development',
    completion: 60,
    category: 'Development Services',
    priority: 'medium',
    tags: ['education', 'ai', 'verification'],
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-pink-500',
  },

  // Marketing & Affiliate
  {
    id: 'am-affiliate',
    title: 'AM Affiliate Program',
    url: '/am-affiliate',
    description: 'AI-based affiliate marketing program with real-time tracking',
    status: 'active',
    completion: 85,
    category: 'Marketing & Affiliate',
    priority: 'high',
    tags: ['affiliate', 'marketing', 'ai', 'earnings'],
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'bg-cyan-500',
  },

  // User Management
  {
    id: 'sql-level',
    title: 'EHB SQL Level System',
    url: '/sql-level',
    description: 'SQL level management and upgrade system',
    status: 'active',
    completion: 90,
    category: 'User Management',
    priority: 'high',
    tags: ['sql', 'levels', 'upgrade'],
    icon: <Award className="h-6 w-6" />,
    color: 'bg-violet-500',
  },

  // Marketplace Services
  {
    id: 'gosellr',
    title: 'GoSellr Marketplace',
    url: '/gosellr',
    description: 'E-commerce marketplace platform',
    status: 'active',
    completion: 95,
    category: 'Marketplace Services',
    priority: 'high',
    tags: ['marketplace', 'ecommerce', 'selling'],
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'bg-teal-500',
  },
  {
    id: 'ai-marketplace',
    title: 'AI Marketplace',
    url: '/ai-marketplace',
    description: 'AI services and tools marketplace',
    status: 'development',
    completion: 70,
    category: 'Marketplace Services',
    priority: 'medium',
    tags: ['ai', 'marketplace', 'services'],
    icon: <Zap className="h-6 w-6" />,
    color: 'bg-amber-500',
  },

  // Support Services
  {
    id: 'dashboard',
    title: 'User Dashboard',
    url: '/dashboard',
    description: 'Personal dashboard and account management',
    status: 'active',
    completion: 85,
    category: 'Support Services',
    priority: 'high',
    tags: ['dashboard', 'account', 'management'],
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'bg-slate-500',
  },
  {
    id: 'search',
    title: 'Search System',
    url: '/search',
    description: 'Advanced search and discovery platform',
    status: 'development',
    completion: 80,
    category: 'Support Services',
    priority: 'medium',
    tags: ['search', 'discovery', 'platform'],
    icon: <Search className="h-6 w-6" />,
    color: 'bg-gray-500',
  },
];

const categories = [
  { id: 'all', name: 'All Pages', icon: <Globe className="h-4 w-4" /> },
  { id: 'Core Services', name: 'Core Services', icon: <Star className="h-4 w-4" /> },
  {
    id: 'Development Services',
    name: 'Development Services',
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: 'Marketing & Affiliate',
    name: 'Marketing & Affiliate',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  { id: 'User Management', name: 'User Management', icon: <Users className="h-4 w-4" /> },
  {
    id: 'Marketplace Services',
    name: 'Marketplace Services',
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  { id: 'Support Services', name: 'Support Services', icon: <Shield className="h-4 w-4" /> },
];

export default function PageCards() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState(pageCards);

  useEffect(() => {
    let filtered = pageCards;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(page => page.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        page =>
          page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPages(filtered);
  }, [activeCategory, searchQuery]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'development':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'planned':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EHB Page Management</h1>
          <p className="text-gray-600">Manage and monitor all project pages and services</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search pages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pages</p>
                  <p className="text-2xl font-bold">{pageCards.length}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Pages</p>
                  <p className="text-2xl font-bold">
                    {pageCards.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Development</p>
                  <p className="text-2xl font-bold">
                    {pageCards.filter(p => p.status === 'development').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Completion</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      pageCards.reduce((acc, page) => acc + page.completion, 0) / pageCards.length
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Page Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPages.map(page => (
            <Card key={page.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${page.color} text-white`}>{page.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{page.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(page.status)}
                        <Badge variant="outline" className={getPriorityColor(page.priority)}>
                          {page.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">{page.description}</CardDescription>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium">{page.completion}%</span>
                  </div>
                  <Progress value={page.completion} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {page.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {page.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{page.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={page.url} className="flex-1">
                    <Button className="w-full" size="sm">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Visit Page
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
