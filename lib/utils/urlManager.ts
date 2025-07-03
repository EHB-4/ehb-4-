/**
 * EHB URL Management System
 * Manages all project URLs and provides auto-routing capabilities
 */

export interface PageInfo {
  id: string;
  title: string;
  url: string;
  description: string;
  status: 'active' | 'development' | 'planned';
  completion: number;
  category: string;
  subPages?: PageInfo[];
  parentId?: string;
  lastUpdated: Date;
  developmentAgent?: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

export interface URLConfig {
  baseUrl: string;
  port: number;
  protocol: string;
  environment: 'development' | 'production' | 'staging';
}

class URLManager {
  private pages: Map<string, PageInfo> = new Map();
  private config: URLConfig;
  private activeAgents: Map<string, string> = new Map();

  constructor() {
    this.config = {
      baseUrl: 'localhost',
      port: 3000,
      protocol: 'http',
      environment: 'development',
    };
    this.initializePages();
  }

  private initializePages() {
    // Core Services
    this.addPage({
      id: 'home',
      title: 'EHB Home',
      url: '/',
      description: 'Main landing page with comprehensive service overview',
      status: 'active',
      completion: 100,
      category: 'Core',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['landing', 'main'],
    });

    // AM Affiliate System
    this.addPage({
      id: 'am-affiliate',
      title: 'AM Affiliate Program',
      url: '/am-affiliate',
      description: 'AI-based affiliate marketing program with real-time tracking and payouts',
      status: 'active',
      completion: 85,
      category: 'Marketing',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['affiliate', 'marketing', 'ai', 'earnings'],
      subPages: [
        {
          id: 'am-dashboard',
          title: 'AM Dashboard',
          url: '/am-affiliate/dashboard',
          description: 'Affiliate dashboard with earnings and referrals',
          status: 'active',
          completion: 90,
          category: 'AM Affiliate',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['dashboard', 'affiliate'],
          parentId: 'am-affiliate',
        },
        {
          id: 'am-referrals',
          title: 'AM Referrals',
          url: '/am-affiliate/referrals',
          description: 'Referral management and tracking',
          status: 'active',
          completion: 85,
          category: 'AM Affiliate',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['referrals', 'affiliate'],
          parentId: 'am-affiliate',
        },
        {
          id: 'am-earnings',
          title: 'AM Earnings',
          url: '/am-affiliate/earnings',
          description: 'Earnings tracking and commission breakdown',
          status: 'active',
          completion: 80,
          category: 'AM Affiliate',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['earnings', 'commission'],
          parentId: 'am-affiliate',
        },
        {
          id: 'am-tools',
          title: 'AM Marketing Tools',
          url: '/am-affiliate/tools',
          description: 'Marketing tools and campaign management',
          status: 'active',
          completion: 75,
          category: 'AM Affiliate',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['tools', 'marketing'],
          parentId: 'am-affiliate',
        },
      ],
    });

    // EHB SQL Level System
    this.addPage({
      id: 'sql-level',
      title: 'EHB SQL Level System',
      url: '/sql-level',
      description: 'SQL level management and upgrade system',
      status: 'active',
      completion: 90,
      category: 'User Management',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['sql', 'levels', 'upgrade'],
      subPages: [
        {
          id: 'sql-dashboard',
          title: 'SQL Dashboard',
          url: '/sql-level/dashboard',
          description: 'SQL level overview and progress tracking',
          status: 'active',
          completion: 95,
          category: 'SQL Level',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['dashboard', 'sql'],
          parentId: 'sql-level',
        },
        {
          id: 'sql-progress',
          title: 'SQL Progress',
          url: '/sql-level/progress',
          description: 'Progress tracking and level requirements',
          status: 'active',
          completion: 90,
          category: 'SQL Level',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['progress', 'sql'],
          parentId: 'sql-level',
        },
        {
          id: 'sql-upgrade',
          title: 'SQL Upgrade',
          url: '/sql-level/upgrade',
          description: 'Level upgrade application and requirements',
          status: 'active',
          completion: 85,
          category: 'SQL Level',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['upgrade', 'sql'],
          parentId: 'sql-level',
        },
        {
          id: 'sql-services',
          title: 'SQL Services',
          url: '/sql-level/services',
          description: 'Services available at different SQL levels',
          status: 'active',
          completion: 80,
          category: 'SQL Level',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['services', 'sql'],
          parentId: 'sql-level',
        },
      ],
    });

    // Franchise System
    this.addPage({
      id: 'franchise',
      title: 'EHB Franchise Network',
      url: '/franchise',
      description: 'Global franchise management and expansion platform',
      status: 'active',
      completion: 100,
      category: 'Business',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['franchise', 'business', 'expansion'],
      subPages: [
        {
          id: 'franchise-apply',
          title: 'Franchise Application',
          url: '/franchise/apply',
          description: 'Apply for franchise opportunities',
          status: 'active',
          completion: 95,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['application', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-health',
          title: 'Health & Wellness Franchise',
          url: '/franchise/health',
          description: 'Healthcare and wellness franchise opportunities',
          status: 'active',
          completion: 90,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['health', 'wellness', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-law',
          title: 'Legal Services Franchise',
          url: '/franchise/law',
          description: 'Legal services franchise opportunities',
          status: 'active',
          completion: 90,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['legal', 'services', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-status',
          title: 'Application Status',
          url: '/franchise/status',
          description: 'Track franchise application status',
          status: 'active',
          completion: 85,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['status', 'tracking', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-education',
          title: 'Education Franchise',
          url: '/franchise/education',
          description: 'Educational franchise opportunities',
          status: 'active',
          completion: 80,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['education', 'franchise'],
          parentId: 'franchise',
        },
      ],
    });

    // JPS System
    this.addPage({
      id: 'jps',
      title: 'Job Placement System',
      url: '/jps',
      description: 'AI-powered job matching and placement platform',
      status: 'active',
      completion: 100,
      category: 'Core Services',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['jobs', 'ai', 'placement'],
      subPages: [
        {
          id: 'jps-analytics',
          title: 'JPS Analytics',
          url: '/jps/analytics',
          description: 'Job placement analytics and reporting',
          status: 'active',
          completion: 90,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['analytics', 'jps'],
          parentId: 'jps',
        },
        {
          id: 'jps-assessment',
          title: 'JPS Assessment',
          url: '/jps/assessment',
          description: 'Candidate assessment tools',
          status: 'active',
          completion: 85,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['assessment', 'jps'],
          parentId: 'jps',
        },
        {
          id: 'jps-candidates',
          title: 'JPS Candidates',
          url: '/jps/candidates',
          description: 'Candidate management system',
          status: 'active',
          completion: 95,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['candidates', 'jps'],
          parentId: 'jps',
        },
        {
          id: 'jps-interviews',
          title: 'JPS Interviews',
          url: '/jps/interviews',
          description: 'Interview management system',
          status: 'active',
          completion: 80,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['interviews', 'jps'],
          parentId: 'jps',
        },
        {
          id: 'jps-job-listings',
          title: 'JPS Job Listings',
          url: '/jps/job-listings',
          description: 'Job listings management',
          status: 'active',
          completion: 90,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['jobs', 'listings', 'jps'],
          parentId: 'jps',
        },
        {
          id: 'jps-matching',
          title: 'JPS AI Matching',
          url: '/jps/matching',
          description: 'AI-powered job matching system',
          status: 'active',
          completion: 95,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['ai', 'matching', 'jps'],
          parentId: 'jps',
        },
        {
          id: 'jps-settings',
          title: 'JPS Settings',
          url: '/jps/settings',
          description: 'JPS system settings',
          status: 'active',
          completion: 75,
          category: 'JPS',
          lastUpdated: new Date(),
          priority: 'low',
          tags: ['settings', 'jps'],
          parentId: 'jps',
        },
      ],
    });

    // GoSellr System
    this.addPage({
      id: 'gosellr',
      title: 'GoSellr Marketplace',
      url: '/gosellr',
      description: 'E-commerce marketplace platform',
      status: 'active',
      completion: 95,
      category: 'Marketplace',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['ecommerce', 'marketplace'],
      subPages: [
        {
          id: 'gosellr-analytics',
          title: 'GoSellr Analytics',
          url: '/gosellr/analytics',
          description: 'Sales and performance analytics',
          status: 'active',
          completion: 90,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['analytics', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-checkout',
          title: 'GoSellr Checkout',
          url: '/gosellr/checkout',
          description: 'Secure checkout system',
          status: 'active',
          completion: 95,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['checkout', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-my-orders',
          title: 'GoSellr My Orders',
          url: '/gosellr/my-orders',
          description: 'Order management for users',
          status: 'active',
          completion: 90,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['orders', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-my-products',
          title: 'GoSellr My Products',
          url: '/gosellr/my-products',
          description: 'Product management for sellers',
          status: 'active',
          completion: 85,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['products', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-my-shop',
          title: 'GoSellr My Shop',
          url: '/gosellr/my-shop',
          description: 'Shop management dashboard',
          status: 'active',
          completion: 80,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['shop', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-orders',
          title: 'GoSellr Orders',
          url: '/gosellr/orders',
          description: 'Order processing system',
          status: 'active',
          completion: 90,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['orders', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-settings',
          title: 'GoSellr Settings',
          url: '/gosellr/settings',
          description: 'GoSellr system settings',
          status: 'active',
          completion: 75,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'low',
          tags: ['settings', 'gosellr'],
          parentId: 'gosellr',
        },
        {
          id: 'gosellr-shop',
          title: 'GoSellr Shop',
          url: '/gosellr/shop',
          description: 'Public shop interface',
          status: 'active',
          completion: 95,
          category: 'GoSellr',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['shop', 'gosellr'],
          parentId: 'gosellr',
        },
      ],
    });

    // Franchise System
    this.addPage({
      id: 'franchise',
      title: 'Franchise System',
      url: '/franchise',
      description: 'Global franchise management and expansion platform',
      status: 'active',
      completion: 100,
      category: 'Core Services',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['franchise', 'business'],
      subPages: [
        {
          id: 'franchise-apply',
          title: 'Franchise Apply',
          url: '/franchise/apply',
          description: 'Franchise application system',
          status: 'active',
          completion: 95,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['apply', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-education',
          title: 'Franchise Education',
          url: '/franchise/education',
          description: 'Educational resources for franchisees',
          status: 'active',
          completion: 90,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['education', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-health',
          title: 'Franchise Health',
          url: '/franchise/health',
          description: 'Health services for franchisees',
          status: 'active',
          completion: 85,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['health', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-law',
          title: 'Franchise Law',
          url: '/franchise/law',
          description: 'Legal services for franchisees',
          status: 'active',
          completion: 80,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['law', 'franchise'],
          parentId: 'franchise',
        },
        {
          id: 'franchise-status',
          title: 'Franchise Status',
          url: '/franchise/status',
          description: 'Application status tracking',
          status: 'active',
          completion: 90,
          category: 'Franchise',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['status', 'franchise'],
          parentId: 'franchise',
        },
      ],
    });

    // WMS System
    this.addPage({
      id: 'wms',
      title: 'World Medical Services',
      url: '/wms',
      description: 'Online + offline verified healthcare system',
      status: 'active',
      completion: 100,
      category: 'Healthcare',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['healthcare', 'medical'],
      subPages: [],
    });

    // OLS System
    this.addPage({
      id: 'ols',
      title: 'Online Law Services',
      url: '/ols',
      description: 'AI-Powered Legal Services Platform',
      status: 'active',
      completion: 100,
      category: 'Legal',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['legal', 'law'],
      subPages: [],
    });

    // AGTS System
    this.addPage({
      id: 'agts',
      title: 'Advanced Global Travel Services',
      url: '/agts',
      description: 'AI-powered Travel Ecosystem',
      status: 'active',
      completion: 100,
      category: 'Travel',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['travel', 'tourism'],
      subPages: [],
    });

    // PSS System
    this.addPage({
      id: 'pss',
      title: 'Personal Security System',
      url: '/pss',
      description: 'Identity verification, KYC, fraud prevention',
      status: 'development',
      completion: 75,
      category: 'Security',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['security', 'kyc'],
      subPages: [
        {
          id: 'pss-admin',
          title: 'PSS Admin',
          url: '/pss/admin',
          description: 'PSS administration panel',
          status: 'development',
          completion: 70,
          category: 'PSS',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['admin', 'pss'],
          parentId: 'pss',
        },
        {
          id: 'pss-request',
          title: 'PSS Request',
          url: '/pss/request',
          description: 'Security request system',
          status: 'development',
          completion: 80,
          category: 'PSS',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['request', 'pss'],
          parentId: 'pss',
        },
        {
          id: 'pss-requests',
          title: 'PSS Requests',
          url: '/pss/requests',
          description: 'Request management system',
          status: 'development',
          completion: 75,
          category: 'PSS',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['requests', 'pss'],
          parentId: 'pss',
        },
        {
          id: 'pss-verify',
          title: 'PSS Verify',
          url: '/pss/verify',
          description: 'Verification system',
          status: 'development',
          completion: 70,
          category: 'PSS',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['verify', 'pss'],
          parentId: 'pss',
        },
      ],
    });

    // EDR System
    this.addPage({
      id: 'edr',
      title: 'Emergency Decision Registration',
      url: '/edr',
      description: 'AI-powered skill verification, exams',
      status: 'development',
      completion: 60,
      category: 'Education',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['education', 'exams'],
      subPages: [
        {
          id: 'edr-my-courses',
          title: 'EDR My Courses',
          url: '/edr/my-courses',
          description: 'Course management system',
          status: 'development',
          completion: 65,
          category: 'EDR',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['courses', 'edr'],
          parentId: 'edr',
        },
        {
          id: 'edr-tutor-dashboard',
          title: 'EDR Tutor Dashboard',
          url: '/edr/tutor-dashboard',
          description: 'Tutor management dashboard',
          status: 'development',
          completion: 55,
          category: 'EDR',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['tutor', 'edr'],
          parentId: 'edr',
        },
      ],
    });

    // Wallet System
    this.addPage({
      id: 'wallet',
      title: 'Trusty Wallet',
      url: '/wallet',
      description: 'Digital wallet and payment processing',
      status: 'active',
      completion: 100,
      category: 'Finance',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['wallet', 'payment'],
      subPages: [],
    });

    // Dashboard
    this.addPage({
      id: 'dashboard',
      title: 'EHB Dashboard',
      url: '/dashboard',
      description: 'Main EHB dashboard',
      status: 'active',
      completion: 85,
      category: 'Core',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['dashboard', 'main'],
      subPages: [
        {
          id: 'dashboard-enhanced',
          title: 'Enhanced Dashboard',
          url: '/dashboard/enhanced',
          description: 'Enhanced dashboard with advanced features',
          status: 'active',
          completion: 80,
          category: 'Dashboard',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['enhanced', 'dashboard'],
          parentId: 'dashboard',
        },
      ],
    });

    // Services
    this.addPage({
      id: 'services',
      title: 'All Services',
      url: '/services',
      description: 'Complete list of all EHB services',
      status: 'active',
      completion: 90,
      category: 'Core',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['services', 'overview'],
      subPages: [],
    });

    // AI Services
    this.addPage({
      id: 'ai-agents',
      title: 'AI Agents',
      url: '/ai-agents',
      description: 'AI agent system',
      status: 'development',
      completion: 65,
      category: 'AI',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['ai', 'agents'],
      subPages: [
        {
          id: 'ai-agents-analytics',
          title: 'AI Agents Analytics',
          url: '/ai-agents/analytics',
          description: 'AI analytics dashboard',
          status: 'development',
          completion: 60,
          category: 'AI Agents',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['analytics', 'ai'],
          parentId: 'ai-agents',
        },
        {
          id: 'ai-agents-development',
          title: 'AI Agents Development',
          url: '/ai-agents/development',
          description: 'AI development tools',
          status: 'development',
          completion: 55,
          category: 'AI Agents',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['development', 'ai'],
          parentId: 'ai-agents',
        },
        {
          id: 'ai-agents-monitoring',
          title: 'AI Agents Monitoring',
          url: '/ai-agents/monitoring',
          description: 'Real-time AI monitoring',
          status: 'development',
          completion: 70,
          category: 'AI Agents',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['monitoring', 'ai'],
          parentId: 'ai-agents',
        },
      ],
    });

    // Admin Services
    this.addPage({
      id: 'admin',
      title: 'Admin Panel',
      url: '/admin',
      description: 'Admin panel',
      status: 'active',
      completion: 80,
      category: 'Admin',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['admin', 'management'],
      subPages: [
        {
          id: 'admin-dashboard',
          title: 'Admin Dashboard',
          url: '/admin/dashboard',
          description: 'Admin dashboard',
          status: 'active',
          completion: 85,
          category: 'Admin',
          lastUpdated: new Date(),
          priority: 'high',
          tags: ['dashboard', 'admin'],
          parentId: 'admin',
        },
        {
          id: 'admin-products',
          title: 'Admin Products',
          url: '/admin/products',
          description: 'Product management',
          status: 'active',
          completion: 75,
          category: 'Admin',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['products', 'admin'],
          parentId: 'admin',
        },
        {
          id: 'admin-affiliate',
          title: 'Admin Affiliate',
          url: '/admin/affiliate',
          description: 'Affiliate management',
          status: 'active',
          completion: 70,
          category: 'Admin',
          lastUpdated: new Date(),
          priority: 'medium',
          tags: ['affiliate', 'admin'],
          parentId: 'admin',
        },
      ],
    });

    // Authentication
    this.addPage({
      id: 'login',
      title: 'Login',
      url: '/login',
      description: 'User login system',
      status: 'active',
      completion: 90,
      category: 'Auth',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['login', 'auth'],
      subPages: [],
    });

    this.addPage({
      id: 'register',
      title: 'Register',
      url: '/register',
      description: 'User registration system',
      status: 'active',
      completion: 85,
      category: 'Auth',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['register', 'auth'],
      subPages: [],
    });

    // Profile
    this.addPage({
      id: 'profile',
      title: 'User Profile',
      url: '/profile',
      description: 'User profile management',
      status: 'active',
      completion: 85,
      category: 'User',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['profile', 'user'],
      subPages: [],
    });

    // Settings
    this.addPage({
      id: 'settings',
      title: 'Settings',
      url: '/settings',
      description: 'Application settings',
      status: 'active',
      completion: 80,
      category: 'User',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['settings', 'user'],
      subPages: [],
    });

    // Development Portal
    this.addPage({
      id: 'development-portal',
      title: 'Development Portal',
      url: '/development-portal',
      description: 'Development portal for developers',
      status: 'active',
      completion: 75,
      category: 'Development',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['development', 'portal'],
      subPages: [],
    });

    // Analytics
    this.addPage({
      id: 'analytics',
      title: 'Analytics',
      url: '/analytics',
      description: 'Analytics and reporting',
      status: 'active',
      completion: 70,
      category: 'Analytics',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['analytics', 'reporting'],
      subPages: [],
    });

    // Search
    this.addPage({
      id: 'search',
      title: 'Search',
      url: '/search',
      description: 'Universal search system',
      status: 'active',
      completion: 80,
      category: 'Core',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['search', 'core'],
      subPages: [],
    });

    // Cart
    this.addPage({
      id: 'cart',
      title: 'Shopping Cart',
      url: '/cart',
      description: 'Shopping cart system',
      status: 'active',
      completion: 90,
      category: 'E-commerce',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['cart', 'ecommerce'],
      subPages: [],
    });

    // Orders
    this.addPage({
      id: 'orders',
      title: 'Orders',
      url: '/orders',
      description: 'Order management',
      status: 'active',
      completion: 85,
      category: 'E-commerce',
      lastUpdated: new Date(),
      priority: 'high',
      tags: ['orders', 'ecommerce'],
      subPages: [],
    });

    // Roadmap
    this.addPage({
      id: 'roadmap',
      title: 'Project Roadmap',
      url: '/roadmap',
      description: 'Project roadmap and planning',
      status: 'active',
      completion: 85,
      category: 'Planning',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['roadmap', 'planning'],
      subPages: [],
    });

    // Roadmap Agent
    this.addPage({
      id: 'roadmap-agent',
      title: 'Roadmap AI Agent',
      url: '/roadmap-agent',
      description: 'AI roadmap agent',
      status: 'development',
      completion: 70,
      category: 'AI',
      lastUpdated: new Date(),
      priority: 'medium',
      tags: ['roadmap', 'ai'],
      subPages: [],
    });
  }

  addPage(page: PageInfo) {
    this.pages.set(page.id, page);

    // Add sub-pages if they exist
    if (page.subPages) {
      page.subPages.forEach(subPage => {
        this.pages.set(subPage.id, subPage);
      });
    }
  }

  getPage(id: string): PageInfo | undefined {
    return this.pages.get(id);
  }

  getPageByUrl(url: string): PageInfo | undefined {
    for (const page of this.pages.values()) {
      if (page.url === url) {
        return page;
      }
      if (page.subPages) {
        const subPage = page.subPages.find(sp => sp.url === url);
        if (subPage) return subPage;
      }
    }
    return undefined;
  }

  getAllPages(): PageInfo[] {
    return Array.from(this.pages.values());
  }

  getPagesByCategory(category: string): PageInfo[] {
    return Array.from(this.pages.values()).filter(page => page.category === category);
  }

  getPagesByStatus(status: string): PageInfo[] {
    return Array.from(this.pages.values()).filter(page => page.status === status);
  }

  getPagesByTag(tag: string): PageInfo[] {
    return Array.from(this.pages.values()).filter(page => page.tags.includes(tag));
  }

  getFullUrl(pageId: string): string {
    const page = this.getPage(pageId);
    if (!page) return '';

    return `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}${page.url}`;
  }

  assignDevelopmentAgent(pageId: string, agentId: string) {
    const page = this.getPage(pageId);
    if (page) {
      page.developmentAgent = agentId;
      page.lastUpdated = new Date();
      this.activeAgents.set(pageId, agentId);
    }
  }

  getActiveAgents(): Map<string, string> {
    return this.activeAgents;
  }

  getPagesByAgent(agentId: string): PageInfo[] {
    return Array.from(this.pages.values()).filter(page => page.developmentAgent === agentId);
  }

  updatePageStatus(pageId: string, status: string, completion: number) {
    const page = this.getPage(pageId);
    if (page) {
      page.status = status as any;
      page.completion = completion;
      page.lastUpdated = new Date();
    }
  }

  searchPages(query: string): PageInfo[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.pages.values()).filter(
      page =>
        page.title.toLowerCase().includes(lowerQuery) ||
        page.description.toLowerCase().includes(lowerQuery) ||
        page.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  getPageHierarchy(): PageInfo[] {
    return Array.from(this.pages.values()).filter(page => !page.parentId);
  }

  getSubPages(parentId: string): PageInfo[] {
    return Array.from(this.pages.values()).filter(page => page.parentId === parentId);
  }

  getConfig(): URLConfig {
    return this.config;
  }

  updateConfig(newConfig: Partial<URLConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  exportPages(): string {
    return JSON.stringify(Array.from(this.pages.values()), null, 2);
  }

  importPages(pagesData: string) {
    try {
      const pages = JSON.parse(pagesData);
      this.pages.clear();
      pages.forEach((page: PageInfo) => {
        this.addPage(page);
      });
    } catch (error) {
      console.error('Error importing pages:', error);
    }
  }
}

// Create singleton instance
export const urlManager = new URLManager();

// Export the class for direct usage
export { URLManager };
