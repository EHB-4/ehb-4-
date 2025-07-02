import { ehbModules, ehbServices } from '../../app/roadmap/data/enhancedRoadmapData';
import { roadmapData } from '../../app/roadmap/data/temp_roadmapData';
import { ehbCompanyInfo, EHBCompanyInfo } from './ehbCompanyInfo';
// import EHBServicesOverview from '../../app/roadmap/services/EHB-Services-Overview.md'; // Markdown parsing stub
// import companyInfo from '../../app/ehb-company-info/page'; // Not a pure data file, so stub for now

/**
 * Type for company info (stub, should match actual structure in company info page)
 */
export interface CompanyInfo {
  name: string;
  description: string;
  mission: string;
  vision: string;
  coreValues: string[];
  goals: string[];
  services: string[];
  techStack: any[];
  departments: any[];
  targetMarkets: string[];
  futureGoals: string[];
  contact?: any;
}

/**
 * EHB Service Interface
 */
export interface EHBService {
  id: string;
  name: string;
  fullName: string;
  purpose: string;
  progress: number;
  port: number;
  status: 'complete' | 'working' | 'under-dev' | 'not-started' | 'planned';
  department: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  sqlLevel?: number;
  autoStart?: boolean;
  dependencies?: string[];
}

/**
 * EHB Department Interface
 */
export interface EHBDepartment {
  id: string;
  name: string;
  size: number;
  purpose: string;
  services: string[];
  portRange: string;
  teamLead: string;
  status: 'active' | 'planned' | 'complete';
  category: string;
}

/**
 * Port Management Interface
 */
export interface PortConfig {
  port: number;
  service: string;
  status: 'active' | 'inactive' | 'reserved';
  autoStart: boolean;
  dependencies: string[];
  lastUsed: Date;
}

/**
 * Complete EHB Services List (26 Services)
 */
export const ehbCompleteServices: EHBService[] = [
  // Core Services (High Priority) - 7 Services
  {
    id: 'pss',
    name: 'PSS',
    fullName: 'Personal Security System',
    purpose: 'Identity verification, KYC, fraud prevention',
    progress: 75,
    port: 4001,
    status: 'working',
    department: 'Security Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'edr',
    name: 'EDR',
    fullName: 'Emergency Decision Registration',
    purpose: 'AI-powered skill verification, exams',
    progress: 60,
    port: 4002,
    status: 'working',
    department: 'AI Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 2,
    autoStart: true,
    dependencies: ['pss'],
  },
  {
    id: 'emo',
    name: 'EMO',
    fullName: 'EHB Management Organization',
    purpose: 'Central management, user dashboard',
    progress: 80,
    port: 4003,
    status: 'working',
    department: 'UI/UX Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'gosellr',
    name: 'GoSellr',
    fullName: 'Global E-commerce Platform',
    purpose: 'Global marketplace for products and services',
    progress: 40,
    port: 4004,
    status: 'under-dev',
    department: 'E-commerce Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 3,
    autoStart: false,
    dependencies: ['pss', 'wallet'],
  },
  {
    id: 'jps',
    name: 'JPS',
    fullName: 'Job Placement System',
    purpose: 'AI-powered job matching and placement',
    progress: 0,
    port: 4005,
    status: 'not-started',
    department: 'HR Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 2,
    autoStart: false,
    dependencies: ['pss', 'edr'],
  },
  {
    id: 'franchise',
    name: 'Franchise',
    fullName: 'Global Franchise Network',
    purpose: 'Franchise management and expansion',
    progress: 0,
    port: 4006,
    status: 'not-started',
    department: 'Business Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 2,
    autoStart: false,
    dependencies: ['pss', 'wallet'],
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    fullName: 'AI Agent System',
    purpose: 'AI agents for automation and assistance',
    progress: 65,
    port: 4007,
    status: 'working',
    department: 'AI Team',
    category: 'Core Services',
    priority: 'high',
    sqlLevel: 3,
    autoStart: true,
    dependencies: ['edr'],
  },

  // Marketplace Services - 4 Services
  {
    id: 'ai-marketplace',
    name: 'AI Marketplace',
    fullName: 'AI Services Marketplace',
    purpose: 'Marketplace for AI services and agents',
    progress: 50,
    port: 3005,
    status: 'under-dev',
    department: 'AI Team',
    category: 'Marketplace Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: false,
    dependencies: ['ai-agents'],
  },
  {
    id: 'ehb-aid',
    name: 'EHB Aid',
    fullName: 'Verified Ads & Classified Listings',
    purpose: 'Ads and classified listings platform',
    progress: 100,
    port: 4015,
    status: 'complete',
    department: 'Marketing Team',
    category: 'Marketplace Services',
    priority: 'medium',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'sot',
    name: 'SOT',
    fullName: 'Services of Technology',
    purpose: 'AI-Powered Tech Services Marketplace',
    progress: 100,
    port: 4016,
    status: 'complete',
    department: 'Tech Team',
    category: 'Marketplace Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    fullName: 'General Marketplace',
    purpose: 'General marketplace services',
    progress: 70,
    port: 4017,
    status: 'working',
    department: 'E-commerce Team',
    category: 'Marketplace Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: false,
    dependencies: ['wallet'],
  },

  // Professional Services - 4 Services
  {
    id: 'hps',
    name: 'HPS',
    fullName: 'Human Performance Solution',
    purpose: 'Education platform',
    progress: 100,
    port: 4008,
    status: 'complete',
    department: 'Education Team',
    category: 'Professional Services',
    priority: 'medium',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'wms',
    name: 'WMS',
    fullName: 'World Medical Services',
    purpose: 'Medical services platform',
    progress: 100,
    port: 4009,
    status: 'complete',
    department: 'Healthcare Team',
    category: 'Professional Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: true,
    dependencies: ['pss'],
  },
  {
    id: 'ols',
    name: 'OLS',
    fullName: 'Online Law Services',
    purpose: 'AI-Powered Legal Services Platform',
    progress: 100,
    port: 4010,
    status: 'complete',
    department: 'Legal Team',
    category: 'Professional Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'obs',
    name: 'OBS',
    fullName: 'Online Book Store',
    purpose: 'AI-Powered Educational Book Platform',
    progress: 100,
    port: 4011,
    status: 'complete',
    department: 'Education Team',
    category: 'Professional Services',
    priority: 'medium',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },

  // Global Services - 3 Services
  {
    id: 'agts',
    name: 'AGTS',
    fullName: 'Advanced Global Travel Services',
    purpose: 'AI-powered Travel Ecosystem',
    progress: 100,
    port: 4012,
    status: 'complete',
    department: 'Travel Team',
    category: 'Global Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'ehb-tube',
    name: 'EHB Tube',
    fullName: 'Verified Video Sharing & Educational',
    purpose: 'Video sharing and educational platform',
    progress: 100,
    port: 4013,
    status: 'complete',
    department: 'Media Team',
    category: 'Global Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'ehb-search',
    name: 'EHB AI Search Hub',
    fullName: 'Universal Multi-Mode AI Search',
    purpose: 'Universal search system',
    progress: 100,
    port: 5003,
    status: 'complete',
    department: 'AI Team',
    category: 'Global Services',
    priority: 'medium',
    sqlLevel: 3,
    autoStart: true,
    dependencies: [],
  },

  // Financial & Infrastructure Services - 5 Services
  {
    id: 'wallet',
    name: 'Wallet',
    fullName: 'EHB Wallet System',
    purpose: 'Digital wallet and payment processing',
    progress: 100,
    port: 5001,
    status: 'complete',
    department: 'Payment Team',
    category: 'Financial & Infrastructure',
    priority: 'high',
    sqlLevel: 2,
    autoStart: true,
    dependencies: ['pss'],
  },
  {
    id: 'wapos',
    name: 'WAPOS',
    fullName: 'Wallet Account Processing & Order Settlement',
    purpose: 'Payment processing system',
    progress: 100,
    port: 5006,
    status: 'complete',
    department: 'Payment Team',
    category: 'Financial & Infrastructure',
    priority: 'high',
    sqlLevel: 2,
    autoStart: true,
    dependencies: ['wallet'],
  },
  {
    id: 'sql-level',
    name: 'EHB SQL Level System',
    fullName: 'AI + Blockchain + Affiliate Integration',
    purpose: 'Trust framework and integration',
    progress: 100,
    port: 4014,
    status: 'complete',
    department: 'Tech Team',
    category: 'Financial & Infrastructure',
    priority: 'high',
    sqlLevel: 4,
    autoStart: true,
    dependencies: ['wallet', 'blockchain'],
  },
  {
    id: 'affiliate',
    name: 'EHB AI Affiliate Program',
    fullName: 'Ultra Advanced AI + Blockchain Affiliate',
    purpose: 'Affiliate marketing system',
    progress: 100,
    port: 4018,
    status: 'complete',
    department: 'Marketing Team',
    category: 'Financial & Infrastructure',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: true,
    dependencies: ['wallet'],
  },
  {
    id: 'blockchain',
    name: 'EHB BLOCKCHAIN',
    fullName: 'EHB Blockchain Infrastructure',
    purpose: 'Blockchain infrastructure and smart contracts',
    progress: 85,
    port: 5007,
    status: 'working',
    department: 'Blockchain Team',
    category: 'Financial & Infrastructure',
    priority: 'high',
    sqlLevel: 4,
    autoStart: true,
    dependencies: ['wallet'],
  },

  // Support Services - 4 Services
  {
    id: 'analytics',
    name: 'Analytics',
    fullName: 'EHB Analytics Platform',
    purpose: 'Comprehensive analytics and reporting',
    progress: 70,
    port: 5002,
    status: 'working',
    department: 'Data Team',
    category: 'Support Services',
    priority: 'medium',
    sqlLevel: 3,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'search',
    name: 'Search',
    fullName: 'Universal Search Hub',
    purpose: 'Multi-mode search system',
    progress: 80,
    port: 5003,
    status: 'working',
    department: 'AI Team',
    category: 'Support Services',
    priority: 'medium',
    sqlLevel: 2,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'notifications',
    name: 'Notifications',
    fullName: 'Notification System',
    purpose: 'Real-time notifications and alerts',
    progress: 85,
    port: 5004,
    status: 'working',
    department: 'Backend Team',
    category: 'Support Services',
    priority: 'medium',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'documentation',
    name: 'Documentation',
    fullName: 'API Documentation',
    purpose: 'Developer guides and tutorials',
    progress: 90,
    port: 5005,
    status: 'working',
    department: 'Documentation Team',
    category: 'Support Services',
    priority: 'low',
    sqlLevel: 1,
    autoStart: false,
    dependencies: [],
  },

  // Management & Admin Services - 4 Services
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    fullName: 'Administrative Dashboard',
    purpose: 'Centralized admin management',
    progress: 85,
    port: 3002,
    status: 'working',
    department: 'Admin Team',
    category: 'Management & Admin',
    priority: 'high',
    sqlLevel: 2,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'dev-portal',
    name: 'Development Portal',
    fullName: 'Developer Resources Portal',
    purpose: 'Development resources and docs',
    progress: 80,
    port: 3003,
    status: 'working',
    department: 'Developer Team',
    category: 'Management & Admin',
    priority: 'medium',
    sqlLevel: 1,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'ehb-dashboard',
    name: 'EHB Dashboard',
    fullName: 'Main EHB Dashboard',
    purpose: 'Central dashboard for all services',
    progress: 85,
    port: 3001,
    status: 'working',
    department: 'UI/UX Team',
    category: 'Management & Admin',
    priority: 'high',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },
  {
    id: 'ehb-home',
    name: 'EHB Home Page',
    fullName: 'Main Landing Page',
    purpose: 'Primary landing page',
    progress: 90,
    port: 3001,
    status: 'working',
    department: 'Marketing Team',
    category: 'Management & Admin',
    priority: 'high',
    sqlLevel: 1,
    autoStart: true,
    dependencies: [],
  },

  // Development & Testing Services - 5 Services
  {
    id: 'storybook',
    name: 'Storybook',
    fullName: 'Component Development',
    purpose: 'UI component library',
    progress: 85,
    port: 6001,
    status: 'complete',
    department: 'Design Team',
    category: 'Development & Testing',
    priority: 'low',
    sqlLevel: 1,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'testing',
    name: 'Testing',
    fullName: 'Testing Dashboard',
    purpose: 'Test results and coverage',
    progress: 70,
    port: 6002,
    status: 'working',
    department: 'QA Team',
    category: 'Development & Testing',
    priority: 'low',
    sqlLevel: 1,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'performance',
    name: 'Performance',
    fullName: 'Performance Monitor',
    purpose: 'Performance metrics and optimization',
    progress: 75,
    port: 6003,
    status: 'working',
    department: 'Performance Team',
    category: 'Development & Testing',
    priority: 'low',
    sqlLevel: 2,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    fullName: 'A11y Checker',
    purpose: 'Accessibility testing and compliance',
    progress: 80,
    port: 6004,
    status: 'working',
    department: 'A11y Team',
    category: 'Development & Testing',
    priority: 'low',
    sqlLevel: 1,
    autoStart: false,
    dependencies: [],
  },
  {
    id: 'code-quality',
    name: 'Code Quality',
    fullName: 'Linting & Formatting',
    purpose: 'Code standards and quality',
    progress: 90,
    port: 6005,
    status: 'complete',
    department: 'Code Quality Team',
    category: 'Development & Testing',
    priority: 'low',
    sqlLevel: 1,
    autoStart: false,
    dependencies: [],
  },
];

/**
 * Complete EHB Departments List (15+ Departments)
 */
export const ehbCompleteDepartments: EHBDepartment[] = [
  // Core Departments (High Priority) - 5 Departments
  {
    id: 'engineering',
    name: 'Engineering',
    size: 50,
    purpose: 'Core development, architecture',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'CTO',
    status: 'active',
    category: 'Core Departments',
  },
  {
    id: 'product',
    name: 'Product',
    size: 20,
    purpose: 'Product management, strategy',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'CPO',
    status: 'active',
    category: 'Core Departments',
  },
  {
    id: 'design',
    name: 'Design',
    size: 15,
    purpose: 'UI/UX, branding',
    services: ['all-frontend'],
    portRange: '3000-6999',
    teamLead: 'Design Lead',
    status: 'active',
    category: 'Core Departments',
  },
  {
    id: 'security',
    name: 'Security',
    size: 12,
    purpose: 'Security, compliance',
    services: ['pss', 'edr', 'wallet'],
    portRange: '4001-4002, 5001',
    teamLead: 'CISO',
    status: 'active',
    category: 'Core Departments',
  },
  {
    id: 'ai',
    name: 'AI',
    size: 18,
    purpose: 'AI development, ML',
    services: ['edr', 'ai-agents', 'ai-marketplace'],
    portRange: '4002, 4007, 3005',
    teamLead: 'AI Lead',
    status: 'active',
    category: 'Core Departments',
  },

  // Business Departments (Medium Priority) - 5 Departments
  {
    id: 'sales',
    name: 'Sales',
    size: 25,
    purpose: 'Sales, business development',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'Sales Director',
    status: 'active',
    category: 'Business Departments',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    size: 10,
    purpose: 'Marketing, branding',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'Marketing Lead',
    status: 'active',
    category: 'Business Departments',
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    size: 15,
    purpose: 'Support, helpdesk',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'Support Manager',
    status: 'active',
    category: 'Business Departments',
  },
  {
    id: 'finance',
    name: 'Finance',
    size: 8,
    purpose: 'Financial management',
    services: ['wallet', 'analytics'],
    portRange: '5001, 5002',
    teamLead: 'CFO',
    status: 'active',
    category: 'Business Departments',
  },
  {
    id: 'legal',
    name: 'Legal',
    size: 5,
    purpose: 'Legal compliance',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'Legal Counsel',
    status: 'active',
    category: 'Business Departments',
  },

  // Specialized Departments - 11 Departments
  {
    id: 'pss-team',
    name: 'PSS Team',
    size: 8,
    purpose: 'Identity verification',
    services: ['pss'],
    portRange: '4001',
    teamLead: 'PSS Manager',
    status: 'active',
    category: 'Specialized Departments',
  },
  {
    id: 'franchise-team',
    name: 'Franchise Team',
    size: 6,
    purpose: 'Franchise operations',
    services: ['franchise'],
    portRange: '4006',
    teamLead: 'Franchise Director',
    status: 'planned',
    category: 'Specialized Departments',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    size: 12,
    purpose: 'Online marketplace',
    services: ['gosellr'],
    portRange: '4004',
    teamLead: 'E-commerce Lead',
    status: 'active',
    category: 'Specialized Departments',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    size: 8,
    purpose: 'Healthcare services',
    services: ['wms'],
    portRange: '4009',
    teamLead: 'Healthcare Manager',
    status: 'complete',
    category: 'Specialized Departments',
  },
  {
    id: 'education',
    name: 'Education',
    size: 10,
    purpose: 'Education services',
    services: ['hps', 'obs'],
    portRange: '4008, 4011',
    teamLead: 'Education Manager',
    status: 'complete',
    category: 'Specialized Departments',
  },
  {
    id: 'legal-services',
    name: 'Legal Services',
    size: 6,
    purpose: 'Legal services',
    services: ['ols'],
    portRange: '4010',
    teamLead: 'Legal Services Manager',
    status: 'complete',
    category: 'Specialized Departments',
  },
  {
    id: 'travel',
    name: 'Travel',
    size: 8,
    purpose: 'Travel services',
    services: ['agts'],
    portRange: '4012',
    teamLead: 'Travel Manager',
    status: 'complete',
    category: 'Specialized Departments',
  },
  {
    id: 'media',
    name: 'Media',
    size: 6,
    purpose: 'Media services',
    services: ['ehb-tube'],
    portRange: '4013',
    teamLead: 'Media Manager',
    status: 'complete',
    category: 'Specialized Departments',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    size: 10,
    purpose: 'Supply chain',
    services: ['wms', 'obs'],
    portRange: '4009, 4011',
    teamLead: 'Logistics Manager',
    status: 'complete',
    category: 'Specialized Departments',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    size: 8,
    purpose: 'Data analysis',
    services: ['analytics'],
    portRange: '5002',
    teamLead: 'Data Lead',
    status: 'active',
    category: 'Specialized Departments',
  },
  {
    id: 'devops',
    name: 'DevOps',
    size: 6,
    purpose: 'Infrastructure, deployment',
    services: ['all'],
    portRange: '3000-6999',
    teamLead: 'DevOps Lead',
    status: 'active',
    category: 'Specialized Departments',
  },

  // Support Departments - 5 Departments
  {
    id: 'documentation',
    name: 'Documentation',
    size: 4,
    purpose: 'Technical writing',
    services: ['documentation'],
    portRange: '5005',
    teamLead: 'Doc Lead',
    status: 'active',
    category: 'Support Departments',
  },
  {
    id: 'qa-testing',
    name: 'QA/Testing',
    size: 8,
    purpose: 'Quality assurance',
    services: ['testing'],
    portRange: '6002',
    teamLead: 'QA Manager',
    status: 'active',
    category: 'Support Departments',
  },
  {
    id: 'performance',
    name: 'Performance',
    size: 4,
    purpose: 'Performance optimization',
    services: ['performance'],
    portRange: '6003',
    teamLead: 'Performance Lead',
    status: 'active',
    category: 'Support Departments',
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    size: 3,
    purpose: 'A11y compliance',
    services: ['accessibility'],
    portRange: '6004',
    teamLead: 'A11y Lead',
    status: 'active',
    category: 'Support Departments',
  },
  {
    id: 'code-quality',
    name: 'Code Quality',
    size: 3,
    purpose: 'Code standards',
    services: ['code-quality'],
    portRange: '6005',
    teamLead: 'Code Quality Lead',
    status: 'complete',
    category: 'Support Departments',
  },

  // Specialized Service Departments - 6 Departments
  {
    id: 'payment-team',
    name: 'Payment Team',
    size: 8,
    purpose: 'Payment processing',
    services: ['wallet', 'wapos'],
    portRange: '5001, 5006',
    teamLead: 'Payment Lead',
    status: 'complete',
    category: 'Specialized Service Departments',
  },
  {
    id: 'hr-team',
    name: 'HR Team',
    size: 6,
    purpose: 'Human resources',
    services: ['jps'],
    portRange: '4005',
    teamLead: 'HR Manager',
    status: 'planned',
    category: 'Specialized Service Departments',
  },
  {
    id: 'business-team',
    name: 'Business Team',
    size: 8,
    purpose: 'Business operations',
    services: ['franchise'],
    portRange: '4006',
    teamLead: 'Business Manager',
    status: 'planned',
    category: 'Specialized Service Departments',
  },
  {
    id: 'tech-team',
    name: 'Tech Team',
    size: 10,
    purpose: 'Technology services',
    services: ['sot', 'sql-level'],
    portRange: '4016, 4014',
    teamLead: 'Tech Lead',
    status: 'complete',
    category: 'Specialized Service Departments',
  },
  {
    id: 'admin-team',
    name: 'Admin Team',
    size: 5,
    purpose: 'Administration',
    services: ['admin-panel'],
    portRange: '3002',
    teamLead: 'Admin Manager',
    status: 'active',
    category: 'Specialized Service Departments',
  },
  {
    id: 'developer-team',
    name: 'Developer Team',
    size: 12,
    purpose: 'Development',
    services: ['dev-portal'],
    portRange: '3003',
    teamLead: 'Dev Lead',
    status: 'active',
    category: 'Specialized Service Departments',
  },
  {
    id: 'blockchain-team',
    name: 'Blockchain Team',
    size: 8,
    purpose: 'Blockchain infrastructure',
    services: ['blockchain', 'sql-level'],
    portRange: '5007, 4014',
    teamLead: 'Blockchain Lead',
    status: 'active',
    category: 'Specialized Service Departments',
  },
];

/**
 * Port Management System
 */
export class EHBPortManager {
  private static instance: EHBPortManager;
  private portConfigs: Map<number, PortConfig> = new Map();
  private nextAvailablePort = 7000;

  private constructor() {
    this.initializePorts();
  }

  public static getInstance(): EHBPortManager {
    if (!EHBPortManager.instance) {
      EHBPortManager.instance = new EHBPortManager();
    }
    return EHBPortManager.instance;
  }

  private initializePorts(): void {
    // Initialize all service ports
    ehbCompleteServices.forEach(service => {
      this.portConfigs.set(service.port, {
        port: service.port,
        service: service.id,
        status: 'reserved',
        autoStart: service.autoStart || false,
        dependencies: service.dependencies || [],
        lastUsed: new Date(),
      });
    });
  }

  public getPortConfig(port: number): PortConfig | undefined {
    return this.portConfigs.get(port);
  }

  public reservePort(port: number, service: string): boolean {
    if (this.portConfigs.has(port)) {
      return false; // Port already reserved
    }

    this.portConfigs.set(port, {
      port,
      service,
      status: 'reserved',
      autoStart: false,
      dependencies: [],
      lastUsed: new Date(),
    });

    return true;
  }

  public getNextAvailablePort(): number {
    while (this.portConfigs.has(this.nextAvailablePort)) {
      this.nextAvailablePort++;
    }
    return this.nextAvailablePort;
  }

  public autoAssignPort(serviceName: string): number {
    const port = this.getNextAvailablePort();
    this.reservePort(port, serviceName);
    return port;
  }

  public getActivePorts(): PortConfig[] {
    return Array.from(this.portConfigs.values()).filter(config => config.status === 'active');
  }

  public getAutoStartServices(): EHBService[] {
    return ehbCompleteServices.filter(service => service.autoStart);
  }
}

/**
 * Auto System Manager
 */
export class EHBAutoSystem {
  private static instance: EHBAutoSystem;
  private portManager: EHBPortManager;

  private constructor() {
    this.portManager = EHBPortManager.getInstance();
  }

  public static getInstance(): EHBAutoSystem {
    if (!EHBAutoSystem.instance) {
      EHBAutoSystem.instance = new EHBAutoSystem();
    }
    return EHBAutoSystem.instance;
  }

  public async startAutoServices(): Promise<void> {
    const autoStartServices = this.portManager.getAutoStartServices();

    for (const service of autoStartServices) {
      await this.startService(service);
    }
  }

  public async startService(service: EHBService): Promise<boolean> {
    try {
      // Check dependencies
      const dependenciesMet = await this.checkDependencies(service);
      if (!dependenciesMet) {
        console.log(`Cannot start ${service.name}: Dependencies not met`);
        return false;
      }

      // Start service on its assigned port
      console.log(`Starting ${service.name} on port ${service.port}`);

      // Update port status
      const portConfig = this.portManager.getPortConfig(service.port);
      if (portConfig) {
        portConfig.status = 'active';
        portConfig.lastUsed = new Date();
      }

      return true;
    } catch (error) {
      console.error(`Error starting ${service.name}:`, error);
      return false;
    }
  }

  private async checkDependencies(service: EHBService): Promise<boolean> {
    if (!service.dependencies || service.dependencies.length === 0) {
      return true;
    }

    for (const depId of service.dependencies) {
      const depService = ehbCompleteServices.find(s => s.id === depId);
      if (!depService) continue;

      const portConfig = this.portManager.getPortConfig(depService.port);
      if (!portConfig || portConfig.status !== 'active') {
        return false;
      }
    }

    return true;
  }

  public async addNewService(serviceData: Partial<EHBService>): Promise<EHBService> {
    // Auto-assign port if not provided
    if (!serviceData.port) {
      serviceData.port = this.portManager.autoAssignPort(serviceData.id || 'new-service');
    }

    // Create new service
    const newService: EHBService = {
      id: serviceData.id || `service-${Date.now()}`,
      name: serviceData.name || 'New Service',
      fullName: serviceData.fullName || 'New EHB Service',
      purpose: serviceData.purpose || 'New service purpose',
      progress: serviceData.progress || 0,
      port: serviceData.port,
      status: serviceData.status || 'not-started',
      department: serviceData.department || 'General Team',
      category: serviceData.category || 'New Services',
      priority: serviceData.priority || 'medium',
      sqlLevel: serviceData.sqlLevel || 1,
      autoStart: serviceData.autoStart || false,
      dependencies: serviceData.dependencies || [],
    };

    // Add to services list
    ehbCompleteServices.push(newService);

    // Reserve port
    this.portManager.reservePort(newService.port, newService.id);

    return newService;
  }

  public getServiceByPort(port: number): EHBService | undefined {
    return ehbCompleteServices.find(service => service.port === port);
  }

  public getServicesByDepartment(department: string): EHBService[] {
    return ehbCompleteServices.filter(service => service.department === department);
  }

  public getServicesByCategory(category: string): EHBService[] {
    return ehbCompleteServices.filter(service => service.category === category);
  }

  public getServicesByStatus(status: EHBService['status']): EHBService[] {
    return ehbCompleteServices.filter(service => service.status === status);
  }

  public getSQLLevelServices(level: number): EHBService[] {
    return ehbCompleteServices.filter(service => service.sqlLevel === level);
  }
}

/**
 * Aggregated roadmap/company data for use in roadmap and agent pages.
 */
export interface AggregatedEHBData {
  modules: typeof ehbModules;
  services: typeof ehbServices;
  roadmapData: typeof roadmapData;
  companyInfo: EHBCompanyInfo;
  servicesOverviewMarkdown: string | null;
  completeServices: EHBService[];
  completeDepartments: EHBDepartment[];
  portManager: EHBPortManager;
  autoSystem: EHBAutoSystem;
}

/**
 * Loads and aggregates all EHB roadmap/company data from main sources.
 * @returns {AggregatedEHBData} Aggregated data object
 */
export function getAggregatedEHBData(): AggregatedEHBData {
  // For now, set markdown overview to null (no fs in browser)
  // In the future, use a static import or dynamic markdown loader if needed
  const servicesOverviewMarkdown: string | null = null;

  return {
    modules: ehbModules,
    services: ehbServices,
    roadmapData,
    companyInfo: ehbCompanyInfo,
    servicesOverviewMarkdown,
    completeServices: ehbCompleteServices,
    completeDepartments: ehbCompleteDepartments,
    portManager: EHBPortManager.getInstance(),
    autoSystem: EHBAutoSystem.getInstance(),
  };
}

/**
 * Get EHB Statistics
 */
export function getEHBStatistics() {
  const totalServices = ehbCompleteServices.length;
  const completedServices = ehbCompleteServices.filter(s => s.status === 'complete').length;
  const workingServices = ehbCompleteServices.filter(s => s.status === 'working').length;
  const underDevServices = ehbCompleteServices.filter(s => s.status === 'under-dev').length;
  const notStartedServices = ehbCompleteServices.filter(s => s.status === 'not-started').length;

  const totalDepartments = ehbCompleteDepartments.length;
  const activeDepartments = ehbCompleteDepartments.filter(d => d.status === 'active').length;
  const completeDepartments = ehbCompleteDepartments.filter(d => d.status === 'complete').length;
  const plannedDepartments = ehbCompleteDepartments.filter(d => d.status === 'planned').length;

  const overallProgress = Math.round(
    ((completedServices + workingServices * 0.7 + underDevServices * 0.3) / totalServices) * 100
  );

  return {
    services: {
      total: totalServices,
      completed: completedServices,
      working: workingServices,
      underDev: underDevServices,
      notStarted: notStartedServices,
      progress: overallProgress,
    },
    departments: {
      total: totalDepartments,
      active: activeDepartments,
      complete: completeDepartments,
      planned: plannedDepartments,
    },
  };
}
