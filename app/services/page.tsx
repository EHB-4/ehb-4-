'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Users,
  Brain,
  Shield,
  BookOpen,
  Briefcase,
  Globe,
  Settings,
  Wallet,
  BarChart3,
  FileText,
  MessageSquare,
  HelpCircle,
  Star,
  Zap,
  Target,
  TrendingUp,
  Award,
  Building,
  GraduationCap,
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Package,
  Code,
  ArrowRight,
  ExternalLink,
  Home,
  Search,
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'active' | 'development' | 'planned' | 'completed';
  progress: number;
  category: 'core' | 'marketplace' | 'support' | 'analytics' | 'admin';
  priority: 'high' | 'medium' | 'low';
  href: string;
  features: string[];
  team: string[];
}

const services: Service[] = [
  // Core Services
  {
    id: 'dashboard',
    name: 'EHB Dashboard',
    description: 'Central dashboard for all EHB services and user management',
    icon: BarChart3,
    status: 'active',
    progress: 85,
    category: 'core',
    priority: 'high',
    href: '/dashboard',
    features: ['Service Overview', 'Quick Actions', 'Notifications', 'Performance Metrics'],
    team: ['UI/UX Team', 'Backend Team'],
  },
  {
    id: 'ehb-home-page',
    name: 'EHB Home Page',
    description: 'Enhanced landing page with comprehensive service showcase',
    icon: Home,
    status: 'active',
    progress: 90,
    category: 'core',
    priority: 'high',
    href: '/ehb-home-page',
    features: ['Service Showcase', 'User Registration', 'Information Hub', 'Navigation'],
    team: ['Marketing Team', 'UI/UX Team'],
  },
  {
    id: 'pss',
    name: 'PSS (Personal Security System)',
    description: 'Identity verification and security management system',
    icon: Shield,
    status: 'active',
    progress: 75,
    category: 'core',
    priority: 'high',
    href: '/pss',
    features: ['KYC Verification', 'Document Validation', 'Fraud Prevention', 'Trust Scoring'],
    team: ['Security Team', 'AI Team'],
  },
  {
    id: 'edr',
    name: 'EDR (Exam Decision Registration)',
    description: 'AI-powered skill verification and examination system',
    icon: GraduationCap,
    status: 'active',
    progress: 60,
    category: 'core',
    priority: 'high',
    href: '/edr',
    features: ['AI Exam Generation', 'Proctoring System', 'Skill Assessment', 'Certification'],
    team: ['AI Team', 'Education Team'],
  },
  {
    id: 'emo',
    name: 'EMO (EHB Management Organization)',
    description: 'Central management and user dashboard system',
    icon: Users,
    status: 'active',
    progress: 80,
    category: 'core',
    priority: 'high',
    href: '/emo',
    features: ['User Dashboard', 'Profile Management', 'Service Integration', 'Notifications'],
    team: ['UI/UX Team', 'Backend Team'],
  },

  // Marketplace Services
  {
    id: 'gosellr',
    name: 'GoSellr',
    description: 'Comprehensive e-commerce marketplace with blockchain integration',
    icon: ShoppingCart,
    status: 'active',
    progress: 95,
    category: 'marketplace',
    priority: 'high',
    href: '/gosellr',
    features: ['Product Management', 'Order Processing', 'Payment Integration', 'Analytics'],
    team: ['E-commerce Team', 'Blockchain Team'],
  },
  {
    id: 'ai-marketplace',
    name: 'AI Marketplace',
    description: 'AI services marketplace with model management',
    icon: Brain,
    status: 'development',
    progress: 70,
    category: 'marketplace',
    priority: 'high',
    href: '/ai-marketplace',
    features: ['AI Services', 'Model Management', 'Service Delivery', 'Performance Monitoring'],
    team: ['AI Team', 'Marketplace Team'],
  },
  {
    id: 'ehb-ai-market-place',
    name: 'EHB AI Market',
    description: 'Enhanced AI marketplace with advanced features',
    icon: Brain,
    status: 'development',
    progress: 65,
    category: 'marketplace',
    priority: 'high',
    href: '/ehb-ai-market-place',
    features: ['Advanced AI Services', 'Model Marketplace', 'API Integration', 'Analytics'],
    team: ['AI Team', 'Development Team'],
  },

  // Support Services
  {
    id: 'wallet',
    name: 'EHB Wallet',
    description: 'Advanced digital wallet with blockchain integration',
    icon: Wallet,
    status: 'active',
    progress: 100,
    category: 'support',
    priority: 'high',
    href: '/wallet',
    features: ['Payment Processing', 'Transaction History', 'Security', 'Multi-currency Support'],
    team: ['Payment Team', 'Security Team'],
  },
  {
    id: 'ehb-wallet',
    name: 'Enhanced Wallet',
    description: 'Enhanced wallet system with advanced features',
    icon: CreditCard,
    status: 'active',
    progress: 85,
    category: 'support',
    priority: 'high',
    href: '/ehb-wallet',
    features: ['Advanced Payments', 'Crypto Support', 'Analytics', 'Security'],
    team: ['Payment Team', 'Blockchain Team'],
  },
  {
    id: 'analytics',
    name: 'Analytics Engine',
    description: 'Comprehensive analytics and reporting system',
    icon: TrendingUp,
    status: 'active',
    progress: 70,
    category: 'analytics',
    priority: 'high',
    href: '/analytics',
    features: ['Data Analysis', 'Reporting', 'Insights', 'Performance Monitoring'],
    team: ['Analytics Team', 'Data Team'],
  },
  {
    id: 'search',
    name: 'Search Hub',
    description: 'Universal multi-mode search system',
    icon: Search,
    status: 'active',
    progress: 80,
    category: 'support',
    priority: 'medium',
    href: '/search',
    features: ['Voice Search', 'Image Search', 'Text Search', 'Document Search'],
    team: ['AI Team', 'Search Team'],
  },

  // Admin & Development
  {
    id: 'admin',
    name: 'Admin Panel',
    description: 'Comprehensive administrative dashboard',
    icon: Settings,
    status: 'active',
    progress: 80,
    category: 'admin',
    priority: 'high',
    href: '/admin',
    features: ['User Management', 'System Monitoring', 'Content Management', 'Security Controls'],
    team: ['Admin Team', 'Security Team'],
  },
  {
    id: 'admin-panel',
    name: 'Enhanced Admin',
    description: 'Enhanced admin panel with advanced features',
    icon: Settings,
    status: 'active',
    progress: 75,
    category: 'admin',
    priority: 'high',
    href: '/admin-panel',
    features: ['Advanced Management', 'Analytics', 'Automation', 'Integration'],
    team: ['Admin Team', 'Development Team'],
  },
  {
    id: 'development-portal',
    name: 'Development Portal',
    description: 'Developer resources and documentation portal',
    icon: Code,
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 80,
    href: '/development-portal',
    features: ['API Documentation', 'Developer Tools', 'Code Examples', 'Integration Guides'],
    team: ['Developer Team', 'Documentation Team'],
  },

  // Additional Services
  {
    id: 'ai-agents',
    name: 'AI Agents',
    description: 'AI agents for automation and assistance',
    icon: Zap,
    status: 'development',
    category: 'analytics',
    priority: 'high',
    progress: 65,
    href: '/ai-agents',
    features: ['Automated Tasks', 'Smart Assistance', 'Process Automation', 'Intelligent Routing'],
    team: ['AI Team', 'Automation Team'],
  },
  {
    id: 'roadmap',
    name: 'Roadmap',
    description: 'Development roadmap and planning system',
    icon: MapPin,
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 90,
    href: '/roadmap',
    features: [
      'Project Planning',
      'Milestone Tracking',
      'Progress Monitoring',
      'Team Coordination',
    ],
    team: ['Project Management Team', 'Development Team'],
  },
  {
    id: 'roadmap-agent',
    name: 'Roadmap Agent',
    description: 'AI-powered roadmap management agent',
    icon: Brain,
    status: 'development',
    category: 'analytics',
    priority: 'medium',
    progress: 70,
    href: '/roadmap-agent',
    features: ['AI Planning', 'Smart Recommendations', 'Automated Updates', 'Predictive Analytics'],
    team: ['AI Team', 'Project Management Team'],
  },
  {
    id: 'project-tracker',
    name: 'Project Tracker',
    description: 'Project tracking and management system',
    icon: Calendar,
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 75,
    href: '/project-tracker',
    features: ['Project Management', 'Task Tracking', 'Team Collaboration', 'Progress Reporting'],
    team: ['Project Management Team', 'Development Team'],
  },
  {
    id: 'sco',
    name: 'SCO (Service Level Agreements)',
    description: 'Service level agreements and compliance monitoring',
    icon: Award,
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 70,
    href: '/sco',
    features: ['SLA Management', 'Compliance Monitoring', 'Performance Tracking', 'Reporting'],
    team: ['Compliance Team', 'Operations Team'],
  },

  // Planned Services
  {
    id: 'jps',
    name: 'JPS (Job Placement System)',
    description: 'AI-powered job matching and placement system',
    icon: Briefcase,
    status: 'planned',
    category: 'core',
    priority: 'medium',
    progress: 0,
    href: '/jps',
    features: ['Job Matching', 'Skill Assessment', 'Career Guidance', 'Placement Tracking'],
    team: ['HR Team', 'AI Team'],
  },
  {
    id: 'franchise',
    name: 'Franchise System',
    description: 'Franchise management and expansion system',
    icon: Building,
    status: 'planned',
    category: 'core',
    priority: 'medium',
    progress: 0,
    href: '/franchise',
    features: [
      'Franchise Management',
      'Territory Management',
      'Performance Tracking',
      'Expansion Planning',
    ],
    team: ['Business Development Team', 'Operations Team'],
  },
];

const getStatusColor = (status: Service['status']) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'active':
      return 'text-blue-600 bg-blue-100';
    case 'development':
      return 'text-yellow-600 bg-yellow-100';
    case 'planned':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusIcon = (status: Service['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'active':
      return <Zap className="w-4 h-4" />;
    case 'development':
      return <Clock className="w-4 h-4" />;
    case 'planned':
      return <Info className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: Service['category']) => {
  switch (category) {
    case 'core':
      return 'border-l-blue-500 bg-blue-50';
    case 'marketplace':
      return 'border-l-green-500 bg-green-50';
    case 'support':
      return 'border-l-purple-500 bg-purple-50';
    case 'analytics':
      return 'border-l-orange-500 bg-orange-50';
    case 'admin':
      return 'border-l-red-500 bg-red-50';
    default:
      return 'border-l-gray-500 bg-gray-50';
  }
};

const getPriorityColor = (priority: Service['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    {
      id: 'core',
      name: 'Core Services',
      count: services.filter(s => s.category === 'core').length,
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      count: services.filter(s => s.category === 'marketplace').length,
    },
    {
      id: 'support',
      name: 'Support Services',
      count: services.filter(s => s.category === 'support').length,
    },
    {
      id: 'analytics',
      name: 'Analytics & AI',
      count: services.filter(s => s.category === 'analytics').length,
    },
    {
      id: 'admin',
      name: 'Admin & Development',
      count: services.filter(s => s.category === 'admin').length,
    },
  ];

  const statuses = [
    { id: 'all', name: 'All Status', count: services.length },
    { id: 'active', name: 'Active', count: services.filter(s => s.status === 'active').length },
    {
      id: 'development',
      name: 'In Development',
      count: services.filter(s => s.status === 'development').length,
    },
    {
      id: 'completed',
      name: 'Completed',
      count: services.filter(s => s.status === 'completed').length,
    },
    { id: 'planned', name: 'Planned', count: services.filter(s => s.status === 'planned').length },
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    development: services.filter(s => s.status === 'development').length,
    completed: services.filter(s => s.status === 'completed').length,
    planned: services.filter(s => s.status === 'planned').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">EHB Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive suite of digital services designed to meet all your business and
              personal needs. From e-commerce to AI, security to analytics - we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.development}</div>
              <div className="text-sm text-gray-600">In Development</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.planned}</div>
              <div className="text-sm text-gray-600">Planned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {statuses.map(status => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedStatus === status.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.name} ({status.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`bg-white rounded-lg shadow-md border-l-4 ${getCategoryColor(service.category)} hover:shadow-lg transition-shadow`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <service.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}
                        >
                          {service.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(service.priority)}`}
                        >
                          {service.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={service.href}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View Service"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{service.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Team */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Team</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.team.map((member, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <Link
                  href={service.href}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>View Service</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
