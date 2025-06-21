export interface Department {
  id: string;
  name: string;
  title: string;
  mission: string;
  vision: string;
  aiCoreFeatures: string[];
  workflows: {
    refillingCycle: string;
    upgradeLogic: string;
    integration: string[];
  };
  sqlLevels: { name: string; fee: number; features: string }[];
  refillingPolicy: {
    intervalDays: number;
    reminderSchedule: string[];
    feeAutoDeduct: boolean;
    badgeExpiryLogic: string;
    penalty: string;
  };
  uiFrontend: {
    dashboardCards: string[];
    examFlow: string[];
    downloadOptions: string[];
  };
  backendAPIs: { endpoint: string; desc: string }[];
  adminPanel: {
    overview: string[];
    actions: string[];
  };
  dataModels: string[];
  analyticsReporting: string[];
  technicalReadiness: {
    businessRequirements: string;
    userExperienceDesign: string;
    systemArchitecture: string;
    databaseSchema: string;
    apiEndpoints: string;
    aiIntegration: string;
    paymentWalletSystem: string;
    authenticationSecurity: string;
    adminPanel: string;
    analyticsReporting: string;
    notificationSystem: string;
    devOpsDeployment: string;
    testingQA: string;
    documentation: string;
    overall: string;
  };
  priorityActions: string[];
  documentationNeeded: string[];
  description: string;
  responsibilities: string;
  connectedServices: string;
  status: 'In Progress' | 'Planned' | 'Completed';
  path: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Done' | 'In Progress' | 'Planned';
  module: string;
}

export interface AgentAssignment {
  module: string;
  agent: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface MasterRoadmapData {
  companyOverview: {
    mission: string;
    vision: string;
    primaryGoals: string;
  };
  departments: Department[];
  uiRoadmap: {
    id: string;
    title: string;
    status: 'Completed' | 'In Progress' | 'Upcoming' | 'Future';
    tasks: string[];
  }[];
  agentAssignments: AgentAssignment[];
  phases: RoadmapPhase[];
}

const placeholderDepartment: Omit<
  Department,
  | 'id'
  | 'name'
  | 'title'
  | 'description'
  | 'responsibilities'
  | 'connectedServices'
  | 'status'
  | 'path'
> = {
  mission: '',
  vision: '',
  aiCoreFeatures: [],
  workflows: { refillingCycle: '', upgradeLogic: '', integration: [] },
  sqlLevels: [],
  refillingPolicy: {
    intervalDays: 180,
    reminderSchedule: [],
    feeAutoDeduct: false,
    badgeExpiryLogic: '',
    penalty: '',
  },
  uiFrontend: { dashboardCards: [], examFlow: [], downloadOptions: [] },
  backendAPIs: [],
  adminPanel: { overview: [], actions: [] },
  dataModels: [],
  analyticsReporting: [],
  technicalReadiness: {
    businessRequirements: '',
    userExperienceDesign: '',
    systemArchitecture: '',
    databaseSchema: '',
    apiEndpoints: '',
    aiIntegration: '',
    paymentWalletSystem: '',
    authenticationSecurity: '',
    adminPanel: '',
    analyticsReporting: '',
    notificationSystem: '',
    devOpsDeployment: '',
    testingQA: '',
    documentation: '',
    overall: '',
  },
  priorityActions: [],
  documentationNeeded: [],
};

export const roadmapData: MasterRoadmapData = {
  companyOverview: {
    mission:
      'To provide 100% verified, AI-powered, blockchain-backed global services and products through a decentralized ecosystem accessible to every individual.',
    vision:
      "To become the world's leading unified service platform where users can trust, earn, learn, and transact securely, across all industries and countries, with full transparency and automation.",
    primaryGoals:
      'Launch GoSellr as a global e-commerce + services platform; Deploy EHBGC token with Trusty Wallet and Validator Income Model; Implement SQL-based verified profile system (PSS, EMO, EDR); Launch global franchise network (Sub, Master, Corporate); Integrate AI agents for system-wide automation and assistant tasks.',
  },
  departments: [
    {
      ...placeholderDepartment,
      id: 'pss',
      name: 'PSS',
      title: 'Personal Security System',
      description: 'Handles verification of users, businesses, services, and products',
      responsibilities:
        'KYC, identity verification, document validation, fraud prevention, complaint judgment',
      connectedServices: 'GoSellr, Law, Health, Education, Jobs, Marketplace',
      status: 'In Progress',
      path: '/pss',
    },
    {
      id: 'edr',
      name: 'EDR',
      title: 'Exam Decision Registration',
      mission:
        'Har user, service provider, ya franchise ko AI-powered, fair, transparent, aur globally recognized skill verification dena – jahan practical exams, interviews, aur projects ke zariye SQL level assign kiya jaye.',
      vision:
        'EDR duniya ka sab se advance, fully automated, AI-based trust engine banega – jahan sab ki skills, badges, aur trust score real-time update ho, aur compliance ecosystem-wide enforce ho.',
      aiCoreFeatures: [
        'AI Adaptive Exam Generator (role/service-based)',
        'Real-Time Proctoring (liveness/anti-cheat/AI fraud detection)',
        'Instant AI scoring, feedback & explainability',
        'Voice, Video, AR/Simulation-based test support',
        'Auto-multi-language, accessibility, & localization',
        'Predictive skill gap, compliance & fraud risk analytics',
        'Automated badge/NFT/blockchain issuance',
        'Automated refilling/reminder engine (expiry/renewal)',
        'Appeals/dispute workflow (AI+Human)',
        'Smart wallet fee/bonus/commission engine',
        'Live analytics, custom reporting, impact dashboard',
        'Public API & partner integration',
      ],
      workflows: {
        refillingCycle:
          'Har user/service/product ko har 6 mahine baad refilling (re-verification) ki requirement. AI exam/project auto-generate karta hai, fee deduction hoti hai, result aata hai, SQL level update ya downgrade ho jata hai.',
        upgradeLogic:
          'Upgrade tabhi possible hai jab teenun department (EDR, PSS, EMO) ka SQL level barabar ya higher ho. Koi ek kam hua to overall SQL wahi lowest ho jata hai.',
        integration: [
          'PSS: Document/identity check, fraud/jurmana',
          'EMO: KYC & dashboard sync, badge/status display',
          'JPS: Verified skill/job badge direct profile pe',
          'GoSellr: Product/service badge, market visibility',
          'Wallet: Fee deduction, bonus/penalty sync',
          'Franchise: Refilling test/exam, regional compliance',
          'API: Partner/school/company direct connect',
        ],
      },
      sqlLevels: [
        { name: 'Free', fee: 0, features: 'Basic listing, no badge, limited access' },
        { name: 'Basic', fee: 10, features: 'Entry badge, basic trust, listing' },
        { name: 'Normal', fee: 20, features: 'Standard badge, higher visibility' },
        { name: 'High', fee: 40, features: 'Premium badge, priority, up to 50 listings' },
        { name: 'VIP', fee: 100, features: 'Global badge, instant verify, all access' },
      ],
      refillingPolicy: {
        intervalDays: 180,
        reminderSchedule: ['30 days', '7 days', '1 day before expiry'],
        feeAutoDeduct: true,
        badgeExpiryLogic:
          'Test/fee na dene par badge hide + profile auto-downgrade, re-exam/appeal possible.',
        penalty:
          'False data, cheating, ya fraud par fine/jurmana Trusty Wallet se auto-deduct, plus ban/escalation option',
      },
      uiFrontend: {
        dashboardCards: [
          'Refilling Status/Countdown',
          'Upcoming Exams',
          'SQL badge & expiry',
          'Skill gap & analytics',
          'Wallet/Fee/Bonus',
          'Exam attempt history',
          'Appeals/disputes',
        ],
        examFlow: [
          'Role/Service select',
          'Personal info/ID confirm',
          'AI exam/interview/project (multi-modal)',
          'File/video/audio upload (if needed)',
          'AI scoring/feedback, badge display',
          'Payment confirmation/receipt',
          'Appeal/dispute if fail',
        ],
        downloadOptions: [
          'Download badge/certificate',
          'Export report (PDF/CSV/JSON)',
          'Public badge/verify link',
        ],
      },
      backendAPIs: [
        { endpoint: '/api/edr/exam/start', desc: 'Start/refilling exam, AI generator' },
        { endpoint: '/api/edr/exam/submit', desc: 'Exam/project/interview upload' },
        { endpoint: '/api/edr/exam/result', desc: 'Get result, badge, feedback' },
        { endpoint: '/api/edr/refilling/reminder', desc: 'Send reminders, handle fee' },
        { endpoint: '/api/edr/appeal', desc: 'Appeal/dispute exam/mark' },
        { endpoint: '/api/edr/sql-level', desc: 'Get/update user SQL status' },
        { endpoint: '/api/edr/report', desc: 'Analytics, reporting, dashboard' },
      ],
      adminPanel: {
        overview: [
          'Refilling/exam queue',
          'Badge/SQL audit',
          'Appeals/dispute center',
          'Fraud/risk/AI alerts',
          'Income/penalty/commission',
          'Franchise performance',
        ],
        actions: [
          'Approve/reject/refilling',
          'Manual badge/penalty/bonus',
          'Review appeals/disputes',
          'Export audit/logs/reports',
        ],
      },
      dataModels: [
        'User/Profile',
        'ExamSession',
        'PaymentTransaction',
        'Appeal/Dispute',
        'AuditLog',
        'Franchise',
        'Badge/NFT',
        'AIReport',
        'Notification',
        'Settings/Policy',
      ],
      analyticsReporting: [
        'Live refilling/exam stats (pass/fail, region, role)',
        'Fraud/risk/incident heatmaps',
        'Skill gap/upskilling trends',
        'Income/bonus/penalty logs',
        'Leaderboard (top franchise, user, badge)',
        'Export: PDF/CSV/JSON',
      ],
      technicalReadiness: {
        businessRequirements: '✅',
        userExperienceDesign: '✅',
        systemArchitecture: '✅',
        databaseSchema: '✅',
        apiEndpoints: '90%',
        aiIntegration: '80%',
        paymentWalletSystem: '80%',
        authenticationSecurity: '90%',
        adminPanel: '70%',
        analyticsReporting: '70%',
        notificationSystem: '60%',
        devOpsDeployment: '85%',
        testingQA: '60%',
        documentation: '90%',
        overall: '85%',
      },
      priorityActions: [
        'Database schema finalization',
        'API endpoints/documentation',
        'AI engine config/integration',
        'Payment/wallet system connect',
        'Security/auth compliance setup',
      ],
      documentationNeeded: [
        'Technical Architecture Document',
        'API Reference Guide',
        'Database Schema Documentation',
        'AI Integration Guide',
        'Security Implementation Guide',
        'Payment System Architecture',
        'Testing Strategy Document',
        'Deployment Guide',
      ],
      description: 'Verifies real-world skills and knowledge through online/offline testing',
      responsibilities:
        'Conducts practical exams, auto-downgrades expired users, manages SQL level renewals',
      connectedServices: 'Education, Job System (JPS), Service Provider System',
      status: 'In Progress',
      path: '/edr',
    },
    {
      ...placeholderDepartment,
      id: 'emo',
      name: 'EMO',
      title: 'Easy Management Office',
      description:
        'AI-powered advanced digital management office hub for comprehensive business, service, and user management with automated workflows, smart analytics, and real-time verification',
      responsibilities:
        'AI-based onboarding, automated KYC/verification, smart workflow management, real-time analytics, complaint resolution, multi-language support, voice/chat integration, franchise management, income tracking, blockchain audit trails, AI agent assistance, voice commands, smart suggestions, automated form filling, predictive analytics, fraud detection, and personalized dashboards',
      connectedServices:
        'All EHB Modules (PSS, EDR, JPS, Wallet, Franchise, GoSellr, Health, Law, Real Estate, Travel, AI Marketplace)',
      status: 'In Progress',
      path: '/emo',
    },
    {
      ...placeholderDepartment,
      id: 'jps',
      name: 'JPS',
      title: 'Job Providing Service',
      description: 'Manages all user profiles and connects job seekers with service needs',
      responsibilities:
        'Handles all user account creation, CVs, resumes, referral systems, social ranking',
      connectedServices: 'All Modules, Job Portal, AI Marketplace',
      status: 'In Progress',
      path: '/jps',
    },
    {
      ...placeholderDepartment,
      id: 'franchise',
      name: 'Franchise',
      title: 'Franchise System',
      description: 'Manages global franchise network (sub, master, corporate)',
      responsibilities:
        'Franchise onboarding, income tracking, order control, area monitoring, auto-fines',
      connectedServices: 'All Modules',
      status: 'Planned',
      path: '/franchise',
    },
    {
      ...placeholderDepartment,
      id: 'ai',
      name: 'AI/Agents',
      title: 'AI and Agents',
      description: 'Oversees AI agents across services and system logic',
      responsibilities:
        'Task automation, prompt handling, code generation, monitoring, training, development acceleration',
      connectedServices: 'All modules',
      status: 'In Progress',
      path: '/ai-agents',
    },
    {
      ...placeholderDepartment,
      id: 'wms',
      name: 'WMS',
      title: 'Wellness Management System',
      description:
        'Provides health-related services through verified clinics, doctors, and records',
      responsibilities:
        'Appointment booking, doctor verification, prescription management, SQL-based ranking',
      connectedServices: 'Health Dashboard, GoSellr (Health), AI Marketplace',
      status: 'Planned',
      path: '/wms',
    },
    {
      ...placeholderDepartment,
      id: 'ols',
      name: 'OLS',
      title: 'Online Legal Services',
      description: 'Offers legal service verification and hiring of lawyers or legal firms',
      responsibilities: 'Lawyer validation, chamber linking, service agreements, contract models',
      connectedServices: 'Law Portal, Complaint System, Franchise Legal Escalation',
      status: 'Planned',
      path: '/ols',
    },
    {
      ...placeholderDepartment,
      id: 'agts',
      name: 'AGTS',
      title: 'Agency & Travel Services',
      description: 'Enables international and local travel booking with service validation',
      responsibilities: 'Travel agent profiles, vehicle/service booking, KYC validation',
      connectedServices: 'Travel Dashboard, GoSellr (Tickets & Travel), AI Marketplace',
      status: 'Planned',
      path: '/agts',
    },
    {
      ...placeholderDepartment,
      id: 'obs',
      name: 'OBS',
      title: 'Online Book Store',
      description:
        'AI-powered bookstore with global access to books, study materials, and learning content',
      responsibilities: 'Book uploads, teacher uploads, sales management, ranking system',
      connectedServices: 'Education, Marketplace, GoSellr (Books)',
      status: 'Planned',
      path: '/obs',
    },
    {
      ...placeholderDepartment,
      id: 'finance',
      name: 'Finance',
      title: 'Finance & Wallet',
      description: 'Manages coin-based systems, wallet balance, validator income, and transactions',
      responsibilities:
        'Coin lock, wallet deduction, EHBGC validator setup, earnings split, cron tasks',
      connectedServices: 'Wallet, Loyalty, Franchise Income, Reward Engine',
      status: 'In Progress',
      path: '/wallet',
    },
    {
      ...placeholderDepartment,
      id: 'support',
      name: 'Support & Complaint',
      title: 'Support & Complaint System',
      description: 'Manages user complaints, time-based fine system, and complaint escalations',
      responsibilities: 'Complaint timers, auto-resolution system, support tickets, fraud reports',
      connectedServices: 'All services, Franchise Fine System, Legal Team',
      status: 'Planned',
      path: '/support',
    },
  ],
  uiRoadmap: [
    {
      id: 'phase-1',
      title: 'Frontend Foundation (Phase 1)',
      status: 'Completed',
      tasks: [
        'Project Structure Setup',
        'Tailwind CSS Configuration',
        'Global Layout Components',
        'Responsive Navigation',
        'Hero Section with Animations',
        'Module Grid with Cards',
        'Basic Routing Structure',
      ],
    },
    {
      id: 'phase-1-in-progress',
      title: 'Frontend Foundation (In Progress)',
      status: 'In Progress',
      tasks: [
        'Sidebar Component',
        'Footer Component',
        'Module-specific Pages',
        'Loading States',
        'Error Boundaries',
      ],
    },
    {
      id: 'phase-2',
      title: 'Upcoming Tasks (Phase 2)',
      status: 'Upcoming',
      tasks: [
        'Admin Dashboard UI',
        'User Profile Pages',
        'Authentication UI',
        'Settings Interface',
        'Notification System',
      ],
    },
    {
      id: 'phase-3',
      title: 'Future Enhancements (Phase 3)',
      status: 'Future',
      tasks: [
        'Dark Mode Support',
        'Multi-language UI',
        'Accessibility Features',
        'AR/VR Components',
        'Voice Navigation',
      ],
    },
  ],
  agentAssignments: [
    { module: 'UI/Frontend', agent: 'UI Agent' },
    { module: 'API/Backend', agent: 'API Agent' },
    { module: 'Wallet/Finance', agent: 'Wallet Agent, Reward Agent' },
    { module: 'Franchise', agent: 'Franchise Agent' },
    { module: 'Validator', agent: 'Validator Agent, Reward Agent' },
    { module: 'PSS/EDR/EMO', agent: 'PSS/EDR/EMO Agent' },
    { module: 'EMO AI Assistant', agent: 'EMO AI Agent, Voice Agent, Analytics Agent' },
    { module: 'Complaint System', agent: 'Complaint Agent' },
    { module: 'Monitoring/Sync', agent: 'Monitoring Agent' },
    { module: 'DevOps/Deployment', agent: 'DevOps Agent' },
    { module: 'Speed Optimization', agent: 'Speed Optimization Agent' },
  ],
  phases: [
    {
      id: 'phase-1-foundation',
      title: 'Phase 1: Foundation and Core Infrastructure',
      description:
        'Building the foundational elements of the EHB ecosystem, including user authentication, wallet integration, and the basic structure for all future services. Focus on security and scalability from day one.',
      tasks: [
        {
          id: 't1-1',
          title: 'User Authentication System',
          description: 'Implement secure user sign-up, login, and profile management.',
          status: 'Done',
          module: 'Core',
        },
        {
          id: 't1-2',
          title: 'Wallet Creation and Integration',
          description:
            'Integrate a secure digital wallet for users to manage funds and transactions.',
          status: 'In Progress',
          module: 'Finance',
        },
        {
          id: 't1-3',
          title: 'Initial Database Schema',
          description: 'Design and implement the initial database schema for users and services.',
          status: 'Done',
          module: 'Core',
        },
        {
          id: 't1-4',
          title: 'Basic API Gateway',
          description: 'Set up an API gateway to manage and route requests to various services.',
          status: 'In Progress',
          module: 'Core',
        },
      ],
    },
    {
      id: 'phase-2-modules',
      title: 'Phase 2: Core Module Development',
      description:
        'Develop the core modules of the EHB ecosystem, including PSS, EDR, and EMO. These modules will form the backbone of the verification and management systems.',
      tasks: [
        {
          id: 't2-1',
          title: 'PSS Module Development',
          description: 'Build the Personal Security System for user and service verification.',
          status: 'In Progress',
          module: 'PSS',
        },
        {
          id: 't2-2',
          title: 'EDR Module Development',
          description:
            'Build the Exam Decision Registration system for skill and knowledge verification.',
          status: 'Planned',
          module: 'EDR',
        },
        {
          id: 't2-3',
          title: 'EMO Module Development',
          description: 'Build the Easy Management Office for business and service management.',
          status: 'Planned',
          module: 'EMO',
        },
      ],
    },
    {
      id: 'phase-3-platform',
      title: 'Phase 3: Platform Expansion and Integration',
      description:
        'Expand the platform with additional services like JPS and GoSellr. Integrate all modules to create a seamless user experience.',
      tasks: [
        {
          id: 't3-1',
          title: 'JPS Module Development',
          description: 'Build the Job Providing Service for connecting job seekers and providers.',
          status: 'Planned',
          module: 'JPS',
        },
        {
          id: 't3-2',
          title: 'GoSellr Marketplace Development',
          description: 'Build the GoSellr marketplace for buying and selling goods and services.',
          status: 'Planned',
          module: 'GoSellr',
        },
        {
          id: 't3-3',
          title: 'Module Integration',
          description:
            'Integrate all core modules (PSS, EDR, EMO, JPS, GoSellr) to work together seamlessly.',
          status: 'Planned',
          module: 'Core',
        },
      ],
    },
  ],
};
