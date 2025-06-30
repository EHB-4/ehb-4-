/**
 * EHB Master Information System
 * This file contains all official EHB company information, services, and roadmap data
 * Agents must ALWAYS reference this file for accurate information
 * Last Updated: 2024-01-25
 */

export interface EHBService {
  id: string;
  name: string;
  fullName: string;
  description: string;
  purpose: string;
  status: 'Completed' | 'Working' | 'Under Development' | 'Not Started' | 'Planned';
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  team: string[];
  features: string[];
  dependencies: string[];
  path: string;
  lastUpdated: string;
}

export interface EHBCompanyInfo {
  name: string;
  fullName: string;
  description: string;
  mission: string;
  vision: string;
  coreValues: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
    website: string;
    twitter: string;
    github: string;
  };
  techStack: Array<{ name: string; version: string }>;
  departments: Array<{ name: string; size?: number; desc?: string }>;
  targetMarkets: string[];
  futureGoals: string[];
}

// ========================================
// EHB COMPANY INFORMATION
// ========================================

export const ehbCompanyInfo: EHBCompanyInfo = {
  name: 'EHB Technologies',
  fullName: 'EHB (Excellence in Human Business) Technologies',
  description:
    'A modern software house delivering innovative solutions with AI-powered services and blockchain technology.',
  mission:
    'To deliver innovative, reliable, and scalable technology solutions that empower businesses and individuals worldwide.',
  vision:
    'To be a global leader in technology, setting standards for excellence, integrity, and impact.',
  coreValues: [
    'Integrity - We uphold the highest standards of integrity in all our actions',
    'Teamwork - We work together, across boundaries, to meet the needs of our customers',
    'Accountability - We are personally accountable for delivering on our commitments',
    'Innovation - We foster innovation to drive growth and success',
    'Customer Focus - We value our customers and strive to exceed their expectations',
    'Zero Tolerance for Fraud',
  ],
  contact: {
    email: 'info@ehb.com',
    phone: '+92-XXX-XXXXXXX',
    address: 'Karachi, Pakistan',
    website: 'https://ehb.com',
    twitter: 'https://twitter.com/ehb_tech',
    github: 'https://github.com/ehb-technologies',
  },
  techStack: [
    { name: 'Next.js', version: '15.3.4' },
    { name: 'React', version: '19.1.0' },
    { name: 'TypeScript', version: '5.8.3' },
    { name: 'Node.js', version: '20.0.0' },
    { name: 'MongoDB', version: '6.17.0' },
    { name: 'PostgreSQL', version: '15.0' },
    { name: 'Redis', version: '7.0' },
    { name: 'Docker', version: '24.0' },
    { name: 'AWS', version: 'Latest' },
    { name: 'Moonbeam + BEP20', version: 'Blockchain' },
    { name: 'Custom AI Assistant', version: '' },
    { name: 'Tailwind CSS', version: '3.4.17' },
  ],
  departments: [
    { name: 'Engineering', size: 50 },
    { name: 'Product', size: 20 },
    { name: 'Design', size: 15 },
    { name: 'Marketing', size: 10 },
    { name: 'Sales', size: 25 },
    { name: 'PSS', desc: 'Verification, KYC, fraud prevention' },
    { name: 'Franchise', desc: 'Franchise management' },
    { name: 'AI', desc: 'AI agent development' },
  ],
  targetMarkets: [
    'Education Sector',
    'Healthcare Industry',
    'Business Services',
    'Public Services',
    'Justice System',
    'Public Safety',
    'Global product sellers and buyers',
    'Service providers',
    'Students, teachers, doctors, lawyers',
    'Franchise investors',
    'Freelancers',
    'Underserved regions',
  ],
  futureGoals: [
    'Global expansion',
    'Multi-language support',
    'Blockchain integration',
    'AI-powered services',
    'Quantum-proof security',
  ],
};

// ========================================
// EHB SERVICES - OFFICIAL DEFINITIONS
// ========================================

export const ehbServices: EHBService[] = [
  {
    id: 'pss',
    name: 'PSS',
    fullName: 'Personal Security System',
    description: 'Identity verification and security management system',
    purpose:
      'KYC, identity verification, document validation, fraud prevention, complaint judgment',
    status: 'Working',
    progress: 75,
    priority: 'High',
    team: ['Security Team', 'AI Team'],
    features: ['KYC Verification', 'Document Validation', 'Fraud Prevention', 'Trust Scoring'],
    dependencies: ['auth', 'wallet'],
    path: '/pss',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'edr',
    name: 'EDR',
    fullName: 'Exam Decision Registration',
    description: 'AI-powered skill verification and examination system',
    purpose: 'Skill assessment, exam management, certification, SQL level assignment',
    status: 'Working',
    progress: 60,
    priority: 'High',
    team: ['AI Team', 'Education Team'],
    features: ['AI Exam Generation', 'Proctoring System', 'Skill Assessment', 'Certification'],
    dependencies: ['pss', 'ai-agents'],
    path: '/edr',
    lastUpdated: '2024-01-20',
  },
  {
    id: 'emo',
    name: 'EMO',
    fullName: 'EHB Management Organization',
    description: 'Central management and user dashboard system',
    purpose:
      'AI-based onboarding, automated KYC/verification, smart workflow management, real-time analytics',
    status: 'Working',
    progress: 80,
    priority: 'High',
    team: ['UI/UX Team', 'Backend Team'],
    features: ['User Dashboard', 'Profile Management', 'Service Integration', 'Notifications'],
    dependencies: ['auth', 'analytics'],
    path: '/emo',
    lastUpdated: '2024-01-18',
  },
  {
    id: 'gosellr',
    name: 'GoSellr',
    fullName: 'Global E-commerce Platform',
    description: 'Global marketplace for products and services',
    purpose: 'Product listing, sales, marketplace management, vendor verification',
    status: 'Under Development',
    progress: 40,
    priority: 'High',
    team: ['E-commerce Team', 'Payment Team'],
    features: ['Product Listing', 'Vendor Management', 'Order Processing', 'Payment Integration'],
    dependencies: ['pss', 'edr', 'wallet'],
    path: '/gosellr',
    lastUpdated: '2024-01-10',
  },
  {
    id: 'jps',
    name: 'JPS',
    fullName: 'Job Placement System',
    description: 'AI-powered job matching and placement platform',
    purpose: 'Job posting, candidate matching, skill verification, placement',
    status: 'Not Started',
    progress: 0,
    priority: 'Medium',
    team: ['HR Team', 'AI Team'],
    features: ['Job Matching', 'Skill Assessment', 'Interview Scheduling', 'Placement Tracking'],
    dependencies: ['edr', 'pss', 'ai-agents'],
    path: '/jps',
    lastUpdated: '2024-01-05',
  },
  {
    id: 'franchise',
    name: 'Franchise',
    fullName: 'Global Franchise Network',
    description: 'Franchise management and expansion system',
    purpose: 'Franchise onboarding, income tracking, order control, area monitoring, auto-fines',
    status: 'Not Started',
    progress: 0,
    priority: 'Medium',
    team: ['Business Team', 'Legal Team'],
    features: [
      'Franchise Registration',
      'Territory Management',
      'Performance Analytics',
      'Compliance',
    ],
    dependencies: ['emo', 'analytics'],
    path: '/franchise',
    lastUpdated: '2024-01-03',
  },
  {
    id: 'ai-marketplace',
    name: 'AI Marketplace',
    fullName: 'AI Services Marketplace',
    description: 'Marketplace for AI services and agents',
    purpose: 'AI service listing, agent management, service delivery, performance monitoring',
    status: 'Under Development',
    progress: 50,
    priority: 'High',
    team: ['AI Team', 'Marketplace Team'],
    features: [
      'AI Service Listing',
      'Agent Management',
      'Service Delivery',
      'Performance Monitoring',
    ],
    dependencies: ['ai-agents', 'wallet'],
    path: '/ai-marketplace',
    lastUpdated: '2024-01-12',
  },
  {
    id: 'wallet',
    name: 'Wallet',
    fullName: 'EHB Wallet System',
    description: 'Digital wallet and payment processing system',
    purpose: 'Payment processing, transaction history, security, multi-currency support',
    status: 'Completed',
    progress: 100,
    priority: 'High',
    team: ['Payment Team', 'Security Team'],
    features: ['Payment Processing', 'Transaction History', 'Security', 'Multi-currency Support'],
    dependencies: ['auth'],
    path: '/wallet',
    lastUpdated: '2024-01-25',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    fullName: 'EHB Analytics Platform',
    description: 'Comprehensive analytics and reporting system',
    purpose: 'Data analysis, reporting, insights, performance monitoring',
    status: 'Working',
    progress: 70,
    priority: 'Medium',
    team: ['Data Team', 'Analytics Team'],
    features: ['Data Analysis', 'Reporting', 'Insights', 'Performance Monitoring'],
    dependencies: ['all-modules'],
    path: '/analytics',
    lastUpdated: '2024-01-22',
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    fullName: 'Administrative Dashboard',
    description: 'Centralized admin management system',
    purpose: 'User management, system monitoring, content management, security controls',
    status: 'Working',
    progress: 85,
    priority: 'High',
    team: ['Admin Team', 'Security Team'],
    features: ['User Management', 'System Monitoring', 'Content Management', 'Security Controls'],
    dependencies: ['auth'],
    path: '/admin',
    lastUpdated: '2024-01-20',
  },
  {
    id: 'development-portal',
    name: 'Development Portal',
    fullName: 'Developer Resources Portal',
    description: 'Centralized development resources and documentation',
    purpose: 'API documentation, developer tools, code examples, integration guides',
    status: 'Working',
    progress: 80,
    priority: 'Medium',
    team: ['Developer Team', 'Documentation Team'],
    features: ['API Documentation', 'Developer Tools', 'Code Examples', 'Integration Guides'],
    dependencies: ['admin-panel'],
    path: '/development-portal',
    lastUpdated: '2024-01-25',
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    fullName: 'AI Agent System',
    description: 'AI agents for automation and assistance',
    purpose: 'Automated tasks, smart assistance, process automation, intelligent routing',
    status: 'Working',
    progress: 65,
    priority: 'High',
    team: ['AI Team', 'Automation Team'],
    features: ['Automated Tasks', 'Smart Assistance', 'Process Automation', 'Intelligent Routing'],
    dependencies: ['ai-marketplace'],
    path: '/ai-agents',
    lastUpdated: '2024-01-25',
  },
  {
    id: 'ehb-dashboard',
    name: 'EHB Dashboard',
    fullName: 'Main EHB Dashboard',
    description: 'Central dashboard for all EHB services',
    purpose: 'Service overview, quick actions, notifications, performance metrics',
    status: 'Working',
    progress: 85,
    priority: 'High',
    team: ['UI/UX Team', 'Backend Team'],
    features: ['Service Overview', 'Quick Actions', 'Notifications', 'Performance Metrics'],
    dependencies: ['emo', 'analytics'],
    path: '/ehb-dashboard',
    lastUpdated: '2024-01-25',
  },
  {
    id: 'ehb-home-page',
    name: 'EHB Home Page',
    fullName: 'Main Landing Page',
    description: 'Primary landing page for EHB platform',
    purpose: 'Service showcase, user registration, information hub, navigation',
    status: 'Working',
    progress: 90,
    priority: 'High',
    team: ['Marketing Team', 'UI/UX Team'],
    features: ['Service Showcase', 'User Registration', 'Information Hub', 'Navigation'],
    dependencies: ['auth'],
    path: '/ehb-home-page',
    lastUpdated: '2024-01-25',
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

export const getServiceById = (id: string): EHBService | undefined => {
  return ehbServices.find(service => service.id === id);
};

export const getServicesByStatus = (status: EHBService['status']): EHBService[] => {
  return ehbServices.filter(service => service.status === status);
};

export const getServicesByPriority = (priority: EHBService['priority']): EHBService[] => {
  return ehbServices.filter(service => service.priority === priority);
};

export const getOverallProgress = (): number => {
  const totalProgress = ehbServices.reduce((sum, service) => sum + service.progress, 0);
  return Math.round(totalProgress / ehbServices.length);
};

export const getCompletedServices = (): EHBService[] => {
  return getServicesByStatus('Completed');
};

export const getWorkingServices = (): EHBService[] => {
  return getServicesByStatus('Working');
};

export const getUnderDevelopmentServices = (): EHBService[] => {
  return getServicesByStatus('Under Development');
};

export const getNotStartedServices = (): EHBService[] => {
  return getServicesByStatus('Not Started');
};

// ========================================
// AGENT INSTRUCTIONS
// ========================================

export const AGENT_INSTRUCTIONS = `
IMPORTANT: EHB AI Agents must ALWAYS reference this file for accurate information.

BEFORE making any development decisions or providing information:

1. ALWAYS check this master information file first
2. NEVER use outdated or conflicting information from other sources
3. If information is missing or unclear, ask the user for clarification
4. Update this file when new information is provided
5. Provide suggestions based on current EHB architecture and goals

Current EHB Status:
- Overall Progress: ${getOverallProgress()}%
- Completed Services: ${getCompletedServices().length}
- Working Services: ${getWorkingServices().length}
- Under Development: ${getUnderDevelopmentServices().length}
- Not Started: ${getNotStartedServices().length}

Always prioritize EHB's mission: ${ehbCompanyInfo.mission}
`;

export default {
  ehbCompanyInfo,
  ehbServices,
  getServiceById,
  getServicesByStatus,
  getServicesByPriority,
  getOverallProgress,
  getCompletedServices,
  getWorkingServices,
  getUnderDevelopmentServices,
  getNotStartedServices,
  AGENT_INSTRUCTIONS,
};
