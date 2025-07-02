/**
 * EHB Service Routes Configuration
 * Complete URL mapping for all EHB services with auto-redirect functionality
 */

export interface ServiceRoute {
  id: string;
  name: string;
  fullName: string;
  path: string;
  port: number;
  status: 'complete' | 'working' | 'under-dev' | 'not-started';
  progress: number;
  category: string;
  department: string;
  description: string;
  icon: string;
  color: string;
  featured: boolean;
  autoRedirect: boolean;
  subRoutes?: string[];
}

/**
 * Complete EHB Services Routes Configuration
 */
export const EHB_SERVICE_ROUTES: ServiceRoute[] = [
  // Core Services (100% Complete)
  {
    id: 'jps',
    name: 'JPS',
    fullName: 'Job Placement System',
    path: '/jps',
    port: 4005,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'HR Team',
    description: 'AI-powered job matching and placement platform',
    icon: 'Briefcase',
    color: 'bg-blue-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/jps/candidates', '/jps/jobs', '/jps/employers', '/jps/admin'],
  },
  {
    id: 'franchise',
    name: 'Franchise System',
    fullName: 'Global Franchise Network',
    path: '/franchise',
    port: 4006,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Business Team',
    description: 'Franchise management and expansion platform',
    icon: 'Building',
    color: 'bg-green-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/franchise/apply', '/franchise/locations', '/franchise/management'],
  },
  {
    id: 'wms',
    name: 'WMS',
    fullName: 'World Medical Services',
    path: '/wms',
    port: 4009,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Healthcare Team',
    description: 'Online + offline verified healthcare system',
    icon: 'Shield',
    color: 'bg-red-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/wms/doctors', '/wms/appointments', '/wms/prescriptions', '/wms/health-records'],
  },
  {
    id: 'ols',
    name: 'OLS',
    fullName: 'Online Law Services',
    path: '/ols',
    port: 4010,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Legal Team',
    description: 'AI-Powered Legal Services Platform',
    icon: 'BookOpen',
    color: 'bg-purple-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/ols/lawyers', '/ols/consultations', '/ols/contracts', '/ols/legal-advice'],
  },
  {
    id: 'agts',
    name: 'AGTS',
    fullName: 'Advanced Global Travel Services',
    path: '/agts',
    port: 4012,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Travel Team',
    description: 'AI-powered Travel Ecosystem',
    icon: 'Globe',
    color: 'bg-indigo-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/agts/flights', '/agts/hotels', '/agts/packages', '/agts/bookings'],
  },
  {
    id: 'obs',
    name: 'OBS',
    fullName: 'Online Book Store',
    path: '/obs',
    port: 4011,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Education Team',
    description: 'AI-Powered Educational Book Platform',
    icon: 'BookOpen',
    color: 'bg-orange-500',
    featured: false,
    autoRedirect: true,
    subRoutes: ['/obs/books', '/obs/study-materials', '/obs/teachers', '/obs/courses'],
  },
  {
    id: 'wallet',
    name: 'Trusty Wallet',
    fullName: 'EHB Wallet System',
    path: '/wallet',
    port: 5001,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Payment Team',
    description: 'Digital wallet and payment processing',
    icon: 'Wallet',
    color: 'bg-emerald-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/wallet/balance', '/wallet/transactions', '/wallet/send', '/wallet/receive'],
  },
  {
    id: 'ehbgc-token',
    name: 'EHBGC Token',
    fullName: 'EHB Global Currency Token',
    path: '/token',
    port: 5007,
    status: 'complete',
    progress: 100,
    category: 'Core Services',
    department: 'Blockchain Team',
    description: 'Blockchain-based global currency token',
    icon: 'Coins',
    color: 'bg-yellow-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/token/buy', '/token/sell', '/token/stake', '/token/history'],
  },

  // In Progress Services
  {
    id: 'pss',
    name: 'PSS',
    fullName: 'Personal Security System',
    path: '/pss',
    port: 4001,
    status: 'working',
    progress: 75,
    category: 'In Progress',
    department: 'Security Team',
    description: 'Identity verification, KYC, fraud prevention',
    icon: 'Shield',
    color: 'bg-purple-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/pss/verify', '/pss/kyc', '/pss/trust-score', '/pss/admin'],
  },
  {
    id: 'edr',
    name: 'EDR',
    fullName: 'Emergency Decision Registration',
    path: '/edr',
    port: 4002,
    status: 'working',
    progress: 60,
    category: 'In Progress',
    department: 'AI Team',
    description: 'AI-powered skill verification, exams',
    icon: 'Brain',
    color: 'bg-blue-500',
    featured: false,
    autoRedirect: true,
    subRoutes: ['/edr/exams', '/edr/skills', '/edr/certificates', '/edr/admin'],
  },
  {
    id: 'emo',
    name: 'EMO',
    fullName: 'EHB Management Organization',
    path: '/emo',
    port: 4003,
    status: 'working',
    progress: 80,
    category: 'In Progress',
    department: 'UI/UX Team',
    description: 'Central management, user dashboard',
    icon: 'Settings',
    color: 'bg-green-500',
    featured: false,
    autoRedirect: true,
    subRoutes: ['/emo/dashboard', '/emo/users', '/emo/settings', '/emo/reports'],
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    fullName: 'Administrative Dashboard',
    path: '/admin-panel',
    port: 3002,
    status: 'working',
    progress: 85,
    category: 'In Progress',
    department: 'Admin Team',
    description: 'Centralized admin management system',
    icon: 'Crown',
    color: 'bg-red-500',
    featured: true,
    autoRedirect: true,
    subRoutes: [
      '/admin-panel/users',
      '/admin-panel/services',
      '/admin-panel/analytics',
      '/admin-panel/settings',
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    fullName: 'EHB Analytics Platform',
    path: '/analytics',
    port: 5002,
    status: 'working',
    progress: 70,
    category: 'In Progress',
    department: 'Data Team',
    description: 'Comprehensive analytics and reporting',
    icon: 'BarChart3',
    color: 'bg-indigo-500',
    featured: false,
    autoRedirect: true,
    subRoutes: [
      '/analytics/dashboard',
      '/analytics/reports',
      '/analytics/insights',
      '/analytics/export',
    ],
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    fullName: 'AI Agent System',
    path: '/ai-agents',
    port: 4007,
    status: 'working',
    progress: 65,
    category: 'In Progress',
    department: 'AI Team',
    description: 'AI agents for automation and assistance',
    icon: 'Bot',
    color: 'bg-purple-500',
    featured: true,
    autoRedirect: true,
    subRoutes: [
      '/ai-agents/chat',
      '/ai-agents/tasks',
      '/ai-agents/automation',
      '/ai-agents/settings',
    ],
  },
  {
    id: 'ehb-dashboard',
    name: 'EHB Dashboard',
    fullName: 'Main EHB Dashboard',
    path: '/ehb-dashboard',
    port: 3001,
    status: 'working',
    progress: 85,
    category: 'In Progress',
    department: 'UI/UX Team',
    description: 'Central dashboard for all services',
    icon: 'Home',
    color: 'bg-blue-500',
    featured: true,
    autoRedirect: true,
    subRoutes: [
      '/ehb-dashboard/overview',
      '/ehb-dashboard/services',
      '/ehb-dashboard/profile',
      '/ehb-dashboard/settings',
    ],
  },
  {
    id: 'ehb-home',
    name: 'EHB Home Page',
    fullName: 'Main Landing Page',
    path: '/ehb-home-page',
    port: 3001,
    status: 'working',
    progress: 90,
    category: 'In Progress',
    department: 'Marketing Team',
    description: 'Primary landing page and entry point',
    icon: 'Home',
    color: 'bg-green-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/ehb-home-page/about', '/ehb-home-page/services', '/ehb-home-page/contact'],
  },
  {
    id: 'dev-portal',
    name: 'Development Portal',
    fullName: 'Developer Resources Portal',
    path: '/development-portal',
    port: 3003,
    status: 'working',
    progress: 80,
    category: 'In Progress',
    department: 'Developer Team',
    description: 'Development resources and documentation',
    icon: 'Code',
    color: 'bg-orange-500',
    featured: false,
    autoRedirect: true,
    subRoutes: [
      '/development-portal/docs',
      '/development-portal/api',
      '/development-portal/tools',
      '/development-portal/community',
    ],
  },
  {
    id: 'roadmap',
    name: 'Roadmap',
    fullName: 'EHB Development Roadmap',
    path: '/roadmap',
    port: 3000,
    status: 'working',
    progress: 90,
    category: 'In Progress',
    department: 'Project Team',
    description: 'Project roadmap and development timeline',
    icon: 'Route',
    color: 'bg-purple-500',
    featured: true,
    autoRedirect: true,
    subRoutes: ['/roadmap/phases', '/roadmap/timeline', '/roadmap/progress', '/roadmap/updates'],
  },
  {
    id: 'roadmap-agent',
    name: 'Roadmap Agent',
    fullName: 'AI Roadmap Assistant',
    path: '/roadmap-agent',
    port: 3000,
    status: 'working',
    progress: 75,
    category: 'In Progress',
    department: 'AI Team',
    description: 'AI-powered roadmap planning and management',
    icon: 'Sparkles',
    color: 'bg-indigo-500',
    featured: false,
    autoRedirect: true,
    subRoutes: [
      '/roadmap-agent/chat',
      '/roadmap-agent/planning',
      '/roadmap-agent/tracking',
      '/roadmap-agent/insights',
    ],
  },
  {
    id: 'ai-marketplace',
    name: 'EHB AI Marketplace',
    fullName: 'AI Services Marketplace',
    path: '/ehb-ai-marketplace',
    port: 3005,
    status: 'under-dev',
    progress: 50,
    category: 'In Progress',
    department: 'AI Team',
    description: 'Marketplace for AI services and agents',
    icon: 'Brain',
    color: 'bg-purple-500',
    featured: true,
    autoRedirect: true,
    subRoutes: [
      '/ehb-ai-marketplace/services',
      '/ehb-ai-marketplace/agents',
      '/ehb-ai-marketplace/pricing',
      '/ehb-ai-marketplace/orders',
    ],
  },
  {
    id: 'ehb-wallet',
    name: 'EHB Wallet',
    fullName: 'EHB Digital Wallet',
    path: '/ehb-wallet',
    port: 5001,
    status: 'working',
    progress: 85,
    category: 'In Progress',
    department: 'Payment Team',
    description: 'Advanced digital wallet with blockchain integration',
    icon: 'Wallet',
    color: 'bg-emerald-500',
    featured: true,
    autoRedirect: true,
    subRoutes: [
      '/ehb-wallet/balance',
      '/ehb-wallet/transactions',
      '/ehb-wallet/send',
      '/ehb-wallet/receive',
      '/ehb-wallet/settings',
    ],
  },
];

/**
 * Get service by ID
 */
export function getServiceById(id: string): ServiceRoute | undefined {
  return EHB_SERVICE_ROUTES.find(service => service.id === id);
}

/**
 * Get service by path
 */
export function getServiceByPath(path: string): ServiceRoute | undefined {
  return EHB_SERVICE_ROUTES.find(
    service => service.path === path || service.subRoutes?.some(subRoute => subRoute === path)
  );
}

/**
 * Get all services by category
 */
export function getServicesByCategory(category: string): ServiceRoute[] {
  return EHB_SERVICE_ROUTES.filter(service => service.category === category);
}

/**
 * Get all featured services
 */
export function getFeaturedServices(): ServiceRoute[] {
  return EHB_SERVICE_ROUTES.filter(service => service.featured);
}

/**
 * Get services by status
 */
export function getServicesByStatus(status: ServiceRoute['status']): ServiceRoute[] {
  return EHB_SERVICE_ROUTES.filter(service => service.status === status);
}

/**
 * Get services by department
 */
export function getServicesByDepartment(department: string): ServiceRoute[] {
  return EHB_SERVICE_ROUTES.filter(service => service.department === department);
}

/**
 * Search services by name or description
 */
export function searchServices(query: string): ServiceRoute[] {
  const lowerQuery = query.toLowerCase();
  return EHB_SERVICE_ROUTES.filter(
    service =>
      service.name.toLowerCase().includes(lowerQuery) ||
      service.fullName.toLowerCase().includes(lowerQuery) ||
      service.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get service statistics
 */
export function getServiceStats() {
  const total = EHB_SERVICE_ROUTES.length;
  const complete = EHB_SERVICE_ROUTES.filter(s => s.status === 'complete').length;
  const working = EHB_SERVICE_ROUTES.filter(s => s.status === 'working').length;
  const underDev = EHB_SERVICE_ROUTES.filter(s => s.status === 'under-dev').length;
  const notStarted = EHB_SERVICE_ROUTES.filter(s => s.status === 'not-started').length;

  return {
    total,
    complete,
    working,
    underDev,
    notStarted,
    completionRate: Math.round((complete / total) * 100),
  };
}

/**
 * Generate service URL with port
 */
export function getServiceUrl(service: ServiceRoute, subPath?: string): string {
  const baseUrl = `http://localhost:${service.port}`;
  const path = subPath || service.path;
  return `${baseUrl}${path}`;
}

/**
 * Get all service URLs for quick access
 */
export function getAllServiceUrls(): { [key: string]: string } {
  const urls: { [key: string]: string } = {};

  EHB_SERVICE_ROUTES.forEach(service => {
    urls[service.id] = getServiceUrl(service);
    if (service.subRoutes) {
      service.subRoutes.forEach(subRoute => {
        const subKey = `${service.id}${subRoute.replace(service.path, '')}`;
        urls[subKey] = getServiceUrl(service, subRoute);
      });
    }
  });

  return urls;
}

/**
 * Auto-redirect to service based on agent activity
 */
export function getAutoRedirectService(agentActivity?: string): ServiceRoute | null {
  if (!agentActivity) return null;

  const activity = agentActivity.toLowerCase();

  // Map agent activities to services
  const activityMap: { [key: string]: string } = {
    job: 'jps',
    franchise: 'franchise',
    medical: 'wms',
    legal: 'ols',
    travel: 'agts',
    book: 'obs',
    wallet: 'wallet',
    token: 'ehbgc-token',
    security: 'pss',
    exam: 'edr',
    management: 'emo',
    admin: 'admin-panel',
    analytics: 'analytics',
    ai: 'ai-agents',
    dashboard: 'ehb-dashboard',
    home: 'ehb-home',
    development: 'dev-portal',
    roadmap: 'roadmap',
    marketplace: 'ai-marketplace',
  };

  for (const [keyword, serviceId] of Object.entries(activityMap)) {
    if (activity.includes(keyword)) {
      const service = getServiceById(serviceId);
      if (service && service.autoRedirect) {
        return service;
      }
    }
  }

  return null;
}

/**
 * Get service breadcrumb navigation
 */
export function getServiceBreadcrumbs(path: string): { name: string; path: string }[] {
  const service = getServiceByPath(path);
  if (!service) return [];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: service.path },
  ];

  // Add sub-route breadcrumb if applicable
  if (path !== service.path) {
    const subRoute = service.subRoutes?.find(sub => sub === path);
    if (subRoute) {
      const subName = subRoute.split('/').pop()?.replace(/-/g, ' ') || '';
      breadcrumbs.push({ name: subName, path });
    }
  }

  return breadcrumbs;
}

export default EHB_SERVICE_ROUTES;
