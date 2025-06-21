export interface EHBModule {
  id: string;
  name: string;
  title: string;
  description: string;
  status: 'Working' | 'Under Development' | 'Not Started' | 'Completed';
  path: string;
  lastUpdated: string;
  priority: 'High' | 'Medium' | 'Low';
  dependencies: string[];
  features: string[];
  team: string[];
  progress: number;
}

export interface EHBService {
  id: string;
  name: string;
  category: 'Core' | 'Support' | 'Analytics' | 'Marketplace';
  modules: EHBModule[];
  status: 'Active' | 'In Development' | 'Planned';
}

export const ehbModules: EHBModule[] = [
  {
    id: 'pss',
    name: 'PSS',
    title: 'Personal Security System',
    description: 'Identity verification and security management system',
    status: 'Working',
    path: '/pss',
    lastUpdated: '2024-01-15',
    priority: 'High',
    dependencies: ['auth', 'wallet'],
    features: ['KYC Verification', 'Document Validation', 'Fraud Prevention', 'Trust Scoring'],
    team: ['Security Team', 'AI Team'],
    progress: 75,
  },
  {
    id: 'edr',
    name: 'EDR',
    title: 'Exam Decision Registration',
    description: 'AI-powered skill verification and examination system',
    status: 'Working',
    path: '/edr',
    lastUpdated: '2024-01-20',
    priority: 'High',
    dependencies: ['pss', 'ai-agents'],
    features: ['AI Exam Generation', 'Proctoring System', 'Skill Assessment', 'Certification'],
    team: ['AI Team', 'Education Team'],
    progress: 60,
  },
  {
    id: 'emo',
    name: 'EMO',
    title: 'EHB Management Organization',
    description: 'Central management and user dashboard system',
    status: 'Working',
    path: '/emo',
    lastUpdated: '2024-01-18',
    priority: 'High',
    dependencies: ['auth', 'analytics'],
    features: ['User Dashboard', 'Profile Management', 'Service Integration', 'Notifications'],
    team: ['UI/UX Team', 'Backend Team'],
    progress: 80,
  },
  {
    id: 'gosellr',
    name: 'GoSellr',
    title: 'Global E-commerce Platform',
    description: 'Global marketplace for products and services',
    status: 'Under Development',
    path: '/gosellr',
    lastUpdated: '2024-01-10',
    priority: 'High',
    dependencies: ['pss', 'edr', 'wallet'],
    features: ['Product Listing', 'Vendor Management', 'Order Processing', 'Payment Integration'],
    team: ['E-commerce Team', 'Payment Team'],
    progress: 40,
  },
  {
    id: 'jps',
    name: 'JPS',
    title: 'Job Placement System',
    description: 'AI-powered job matching and placement platform',
    status: 'Not Started',
    path: '/jps',
    lastUpdated: '2024-01-05',
    priority: 'Medium',
    dependencies: ['edr', 'pss', 'ai-agents'],
    features: ['Job Matching', 'Skill Assessment', 'Interview Scheduling', 'Placement Tracking'],
    team: ['HR Team', 'AI Team'],
    progress: 0,
  },
  {
    id: 'franchise',
    name: 'Franchise',
    title: 'Global Franchise Network',
    description: 'Franchise management and expansion system',
    status: 'Not Started',
    path: '/franchise',
    lastUpdated: '2024-01-03',
    priority: 'Medium',
    dependencies: ['emo', 'analytics'],
    features: [
      'Franchise Registration',
      'Territory Management',
      'Performance Analytics',
      'Compliance',
    ],
    team: ['Business Team', 'Legal Team'],
    progress: 0,
  },
  {
    id: 'ai-marketplace',
    name: 'AI Marketplace',
    title: 'AI Services Marketplace',
    description: 'Marketplace for AI services and agents',
    status: 'Under Development',
    path: '/ai-marketplace',
    lastUpdated: '2024-01-12',
    priority: 'High',
    dependencies: ['ai-agents', 'wallet'],
    features: [
      'AI Service Listing',
      'Agent Management',
      'Service Delivery',
      'Performance Monitoring',
    ],
    team: ['AI Team', 'Marketplace Team'],
    progress: 50,
  },
  {
    id: 'wallet',
    name: 'Wallet',
    title: 'EHB Wallet System',
    description: 'Digital wallet and payment processing system',
    status: 'Completed',
    path: '/wallet',
    lastUpdated: '2024-01-25',
    priority: 'High',
    dependencies: ['auth'],
    features: ['Payment Processing', 'Transaction History', 'Security', 'Multi-currency Support'],
    team: ['Payment Team', 'Security Team'],
    progress: 100,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    title: 'EHB Analytics Platform',
    description: 'Comprehensive analytics and reporting system',
    status: 'Working',
    path: '/analytics',
    lastUpdated: '2024-01-22',
    priority: 'Medium',
    dependencies: ['all-modules'],
    features: ['Data Analysis', 'Reporting', 'Insights', 'Performance Monitoring'],
    team: ['Data Team', 'Analytics Team'],
    progress: 70,
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    title: 'Administrative Dashboard',
    description: 'Centralized admin management system',
    status: 'Working',
    path: '/admin',
    lastUpdated: '2024-01-20',
    priority: 'High',
    dependencies: ['auth'],
    features: ['User Management', 'System Monitoring', 'Content Management', 'Security Controls'],
    team: ['Admin Team', 'Security Team'],
    progress: 85,
  },
  {
    id: 'roadmap',
    name: 'Roadmap',
    title: 'Project Roadmap',
    description: 'Project tracking and roadmap visualization',
    status: 'Working',
    path: '/roadmap',
    lastUpdated: '2024-01-25',
    priority: 'Medium',
    dependencies: ['analytics'],
    features: [
      'Project Tracking',
      'Timeline Visualization',
      'Progress Monitoring',
      'Milestone Management',
    ],
    team: ['Project Team', 'UI/UX Team'],
    progress: 90,
  },
  {
    id: 'roadmap-agent',
    name: 'Roadmap Agent',
    title: 'AI Roadmap Management',
    description: 'AI-powered roadmap management and tracking',
    status: 'Working',
    path: '/roadmap-agent',
    lastUpdated: '2024-01-25',
    priority: 'Medium',
    dependencies: ['roadmap', 'ai-agents'],
    features: [
      'AI Project Management',
      'Automated Tracking',
      'Predictive Analytics',
      'Smart Recommendations',
    ],
    team: ['AI Team', 'Project Team'],
    progress: 75,
  },
  {
    id: 'development-portal',
    name: 'Development Portal',
    title: 'Developer Resources Portal',
    description: 'Centralized development resources and documentation',
    status: 'Working',
    path: '/development-portal',
    lastUpdated: '2024-01-25',
    priority: 'Medium',
    dependencies: ['admin-panel'],
    features: ['API Documentation', 'Developer Tools', 'Code Examples', 'Integration Guides'],
    team: ['Developer Team', 'Documentation Team'],
    progress: 80,
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    title: 'AI Agent System',
    description: 'AI agents for automation and assistance',
    status: 'Working',
    path: '/ai-agents',
    lastUpdated: '2024-01-25',
    priority: 'High',
    dependencies: ['ai-marketplace'],
    features: ['Automated Tasks', 'Smart Assistance', 'Process Automation', 'Intelligent Routing'],
    team: ['AI Team', 'Automation Team'],
    progress: 65,
  },
  {
    id: 'ehb-dashboard',
    name: 'EHB Dashboard',
    title: 'Main EHB Dashboard',
    description: 'Central dashboard for all EHB services',
    status: 'Working',
    path: '/ehb-dashboard',
    lastUpdated: '2024-01-25',
    priority: 'High',
    dependencies: ['emo', 'analytics'],
    features: ['Service Overview', 'Quick Actions', 'Notifications', 'Performance Metrics'],
    team: ['UI/UX Team', 'Backend Team'],
    progress: 85,
  },
  {
    id: 'ehb-home-page',
    name: 'EHB Home Page',
    title: 'Main Landing Page',
    description: 'Primary landing page for EHB platform',
    status: 'Working',
    path: '/ehb-home-page',
    lastUpdated: '2024-01-25',
    priority: 'High',
    dependencies: ['auth'],
    features: ['Service Showcase', 'User Registration', 'Information Hub', 'Navigation'],
    team: ['Marketing Team', 'UI/UX Team'],
    progress: 90,
  },
];

export const ehbServices: EHBService[] = [
  {
    id: 'core-services',
    name: 'Core Services',
    category: 'Core',
    modules: ehbModules.filter(m => ['pss', 'edr', 'emo', 'wallet'].includes(m.id)),
    status: 'Active',
  },
  {
    id: 'marketplace-services',
    name: 'Marketplace Services',
    category: 'Marketplace',
    modules: ehbModules.filter(m => ['gosellr', 'ai-marketplace', 'jps'].includes(m.id)),
    status: 'In Development',
  },
  {
    id: 'support-services',
    name: 'Support Services',
    category: 'Support',
    modules: ehbModules.filter(m =>
      ['admin-panel', 'development-portal', 'roadmap', 'roadmap-agent'].includes(m.id)
    ),
    status: 'Active',
  },
  {
    id: 'analytics-services',
    name: 'Analytics Services',
    category: 'Analytics',
    modules: ehbModules.filter(m => ['analytics', 'ai-agents'].includes(m.id)),
    status: 'Active',
  },
];

export const getModuleStatus = (moduleId: string): EHBModule | undefined => {
  return ehbModules.find(m => m.id === moduleId);
};

export const getServiceModules = (serviceId: string): EHBModule[] => {
  const service = ehbServices.find(s => s.id === serviceId);
  return service ? service.modules : [];
};

export const getOverallProgress = (): number => {
  const totalProgress = ehbModules.reduce((sum, module) => sum + module.progress, 0);
  return Math.round(totalProgress / ehbModules.length);
};

export const getModulesByStatus = (status: string): EHBModule[] => {
  return ehbModules.filter(m => m.status === status);
};

export const getModulesByPriority = (priority: string): EHBModule[] => {
  return ehbModules.filter(m => m.priority === priority);
};
