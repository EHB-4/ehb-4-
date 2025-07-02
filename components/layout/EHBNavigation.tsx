'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  Users,
  Brain,
  Shield,
  BookOpen,
  Briefcase,
  Globe,
  Settings,
  User,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
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
} from 'lucide-react';

interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description: string;
  status: 'active' | 'development' | 'planned' | 'completed';
  category: 'core' | 'marketplace' | 'support' | 'analytics' | 'admin';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  // Core Services
  {
    id: 'home',
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Main landing page',
    status: 'completed',
    category: 'core',
    priority: 'high',
    progress: 100,
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Main EHB dashboard',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 85,
  },
  {
    id: 'ehb-dashboard',
    name: 'EHB Dashboard',
    href: '/ehb-dashboard',
    icon: Target,
    description: 'Central service dashboard',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 85,
  },
  {
    id: 'ehb-home-page',
    name: 'EHB Home',
    href: '/ehb-home-page',
    icon: Home,
    description: 'Enhanced home page',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 90,
  },

  // Marketplace Services
  {
    id: 'gosellr',
    name: 'GoSellr',
    href: '/gosellr',
    icon: ShoppingCart,
    description: 'E-commerce marketplace',
    status: 'active',
    category: 'marketplace',
    priority: 'high',
    progress: 95,
    children: [
      {
        id: 'gosellr-marketplace',
        name: 'Marketplace',
        href: '/gosellr/marketplace',
        icon: ShoppingCart,
        description: 'Browse products and services',
        status: 'active',
        category: 'marketplace',
        priority: 'high',
        progress: 100,
      },
      {
        id: 'gosellr-shop',
        name: 'My Shop',
        href: '/gosellr/shop',
        icon: Building,
        description: 'Manage your shop',
        status: 'active',
        category: 'marketplace',
        priority: 'high',
        progress: 100,
      },
      {
        id: 'gosellr-orders',
        name: 'Orders',
        href: '/gosellr/orders',
        icon: FileText,
        description: 'Order management',
        status: 'active',
        category: 'marketplace',
        priority: 'high',
        progress: 100,
      },
      {
        id: 'gosellr-products',
        name: 'My Products',
        href: '/gosellr/my-products',
        icon: Package,
        description: 'Product management',
        status: 'active',
        category: 'marketplace',
        priority: 'high',
        progress: 100,
      },
    ],
  },
  {
    id: 'ai-marketplace',
    name: 'AI Marketplace',
    href: '/ai-marketplace',
    icon: Brain,
    description: 'AI services marketplace',
    status: 'development',
    category: 'marketplace',
    priority: 'high',
    progress: 70,
  },
  {
    id: 'ehb-ai-market-place',
    name: 'EHB AI Market',
    href: '/ehb-ai-market-place',
    icon: Brain,
    description: 'Enhanced AI marketplace',
    status: 'development',
    category: 'marketplace',
    priority: 'high',
    progress: 65,
  },

  // Core Business Services
  {
    id: 'pss',
    name: 'PSS',
    href: '/pss',
    icon: Shield,
    description: 'Personal Security System',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 75,
  },
  {
    id: 'edr',
    name: 'EDR',
    href: '/edr',
    icon: GraduationCap,
    description: 'Exam Decision Registration',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 60,
  },
  {
    id: 'emo',
    name: 'EMO',
    href: '/emo',
    icon: Users,
    description: 'EHB Management Organization',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 80,
  },
  {
    id: 'jps',
    name: 'JPS',
    href: '/jps',
    icon: Briefcase,
    description: 'Job Placement System',
    status: 'planned',
    category: 'core',
    priority: 'medium',
    progress: 0,
  },
  {
    id: 'franchise',
    name: 'Franchise',
    href: '/franchise',
    icon: Building,
    description: 'Franchise Management',
    status: 'planned',
    category: 'core',
    priority: 'medium',
    progress: 0,
  },

  // Support Services
  {
    id: 'wallet',
    name: 'Wallet',
    href: '/wallet',
    icon: Wallet,
    description: 'Digital wallet system',
    status: 'active',
    category: 'support',
    priority: 'high',
    progress: 100,
  },
  {
    id: 'ehb-wallet',
    name: 'EHB Wallet',
    href: '/ehb-wallet',
    icon: CreditCard,
    description: 'Enhanced wallet system',
    status: 'active',
    category: 'support',
    priority: 'high',
    progress: 85,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
    description: 'Analytics and reporting',
    status: 'active',
    category: 'analytics',
    priority: 'high',
    progress: 70,
  },
  {
    id: 'search',
    name: 'Search',
    href: '/search',
    icon: Search,
    description: 'Universal search system',
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 80,
  },

  // Admin & Development
  {
    id: 'admin',
    name: 'Admin',
    href: '/admin',
    icon: Settings,
    description: 'Admin panel',
    status: 'active',
    category: 'admin',
    priority: 'high',
    progress: 80,
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    href: '/admin-panel',
    icon: Settings,
    description: 'Enhanced admin panel',
    status: 'active',
    category: 'admin',
    priority: 'high',
    progress: 75,
  },
  {
    id: 'development-portal',
    name: 'Dev Portal',
    href: '/development-portal',
    icon: Code,
    description: 'Development portal',
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 80,
  },

  // Additional Services
  {
    id: 'ai-agents',
    name: 'AI Agents',
    href: '/ai-agents',
    icon: Zap,
    description: 'AI agent system',
    status: 'development',
    category: 'analytics',
    priority: 'high',
    progress: 65,
  },
  {
    id: 'roadmap',
    name: 'Roadmap',
    href: '/roadmap',
    icon: MapPin,
    description: 'Development roadmap',
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 90,
  },
  {
    id: 'roadmap-agent',
    name: 'Roadmap Agent',
    href: '/roadmap-agent',
    icon: Brain,
    description: 'AI roadmap agent',
    status: 'development',
    category: 'analytics',
    priority: 'medium',
    progress: 70,
  },
  {
    id: 'project-tracker',
    name: 'Project Tracker',
    href: '/project-tracker',
    icon: Calendar,
    description: 'Project tracking system',
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 75,
  },
  {
    id: 'sco',
    name: 'SCO',
    href: '/sco',
    icon: Award,
    description: 'Service level agreements',
    status: 'active',
    category: 'support',
    priority: 'medium',
    progress: 70,
  },

  // User Management
  {
    id: 'profile',
    name: 'Profile',
    href: '/profile',
    icon: User,
    description: 'User profile management',
    status: 'active',
    category: 'core',
    priority: 'high',
    progress: 85,
  },
  {
    id: 'settings',
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Application settings',
    status: 'active',
    category: 'core',
    priority: 'medium',
    progress: 80,
  },
  {
    id: 'cart',
    name: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    description: 'Shopping cart',
    status: 'active',
    category: 'marketplace',
    priority: 'high',
    progress: 90,
  },
  {
    id: 'orders',
    name: 'Orders',
    href: '/orders',
    icon: FileText,
    description: 'Order management',
    status: 'active',
    category: 'marketplace',
    priority: 'high',
    progress: 85,
  },
  {
    id: 'wishlist',
    name: 'Wishlist',
    href: '/wishlist',
    icon: Star,
    description: 'Wishlist management',
    status: 'active',
    category: 'marketplace',
    priority: 'medium',
    progress: 80,
  },
];

const getStatusColor = (status: NavigationItem['status']) => {
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

const getStatusIcon = (status: NavigationItem['status']) => {
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

const getCategoryColor = (category: NavigationItem['category']) => {
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

export default function EHBNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const groupedItems = navigationItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, NavigationItem[]>
  );

  const categoryLabels = {
    core: 'Core Services',
    marketplace: 'Marketplace',
    support: 'Support Services',
    analytics: 'Analytics & AI',
    admin: 'Admin & Development',
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EHB</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <span>{categoryLabels[category as keyof typeof categoryLabels]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h3>
                    <div className="space-y-2">
                      {items.map(item => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                            isActive(item.href)
                              ? 'bg-blue-50 text-blue-600'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{item.name}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                              >
                                {item.progress}%
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900" title="Search">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/profile" className="p-2 text-gray-600 hover:text-gray-900" title="Profile">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id}>
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{item.name}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                            >
                              {item.progress}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </Link>

                      {/* Show children if any */}
                      {item.children && expandedItems.includes(item.id) && (
                        <div className="ml-8 mt-2 space-y-1">
                          {item.children.map(child => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                                isActive(child.href)
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'hover:bg-gray-50 text-gray-700'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <child.icon className="w-4 h-4" />
                              <span className="text-sm">{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
