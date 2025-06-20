export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Done' | 'In Progress' | 'Planned';
  module: string;
}

export interface Department {
  name: string;
  description: string;
  responsibilities: string;
  connectedServices: string;
  status: 'In Progress' | 'Planned' | 'Completed';
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
      name: 'PSS',
      description: 'Handles verification of users, businesses, services, and products',
      responsibilities:
        'KYC, identity verification, document validation, fraud prevention, complaint judgment',
      connectedServices: 'GoSellr, Law, Health, Education, Jobs, Marketplace',
      status: 'In Progress',
    },
    {
      name: 'EDR',
      description: 'Verifies real-world skills and knowledge through online/offline testing',
      responsibilities:
        'Conducts practical exams, auto-downgrades expired users, manages SQL level renewals',
      connectedServices: 'Education, Job System (JPS), Service Provider System',
      status: 'In Progress',
    },
    {
      name: 'EMO',
      description:
        'Local physical and digital office hub for documentation, service verification, and staff support',
      responsibilities:
        'Accepts physical KYC, manages real-world records, serves as data bridge for departments',
      connectedServices: 'Health, Law, GoSellr, Real Estate, Travel',
      status: 'Planned',
    },
    {
      name: 'JPS',
      description: 'Manages all user profiles and connects job seekers with service needs',
      responsibilities:
        'Handles all user account creation, CVs, resumes, referral systems, social ranking',
      connectedServices: 'All Modules, Job Portal, AI Marketplace',
      status: 'In Progress',
    },
    {
      name: 'Franchise',
      description: 'Manages global franchise network (sub, master, corporate)',
      responsibilities:
        'Franchise onboarding, income tracking, order control, area monitoring, auto-fines',
      connectedServices: 'All Modules',
      status: 'Planned',
    },
    {
      name: 'AI/Agents',
      description: 'Oversees AI agents across services and system logic',
      responsibilities:
        'Task automation, prompt handling, code generation, monitoring, training, development acceleration',
      connectedServices: 'All modules',
      status: 'In Progress',
    },
    {
      name: 'WMS',
      description:
        'Provides health-related services through verified clinics, doctors, and records',
      responsibilities:
        'Appointment booking, doctor verification, prescription management, SQL-based ranking',
      connectedServices: 'Health Dashboard, GoSellr (Health), AI Marketplace',
      status: 'Planned',
    },
    {
      name: 'OLS',
      description: 'Offers legal service verification and hiring of lawyers or legal firms',
      responsibilities: 'Lawyer validation, chamber linking, service agreements, contract models',
      connectedServices: 'Law Portal, Complaint System, Franchise Legal Escalation',
      status: 'Planned',
    },
    {
      name: 'AGTS',
      description: 'Enables international and local travel booking with service validation',
      responsibilities: 'Travel agent profiles, vehicle/service booking, KYC validation',
      connectedServices: 'Travel Dashboard, GoSellr (Tickets & Travel), AI Marketplace',
      status: 'Planned',
    },
    {
      name: 'OBS',
      description:
        'AI-powered bookstore with global access to books, study materials, and learning content',
      responsibilities: 'Book uploads, teacher uploads, sales management, ranking system',
      connectedServices: 'Education, Marketplace, GoSellr (Books)',
      status: 'Planned',
    },
    {
      name: 'Finance',
      description: 'Manages coin-based systems, wallet balance, validator income, and transactions',
      responsibilities:
        'Coin lock, wallet deduction, EHBGC validator setup, earnings split, cron tasks',
      connectedServices: 'Wallet, Loyalty, Franchise Income, Reward Engine',
      status: 'In Progress',
    },
    {
      name: 'Support & Complaint',
      description: 'Manages user complaints, time-based fine system, and complaint escalations',
      responsibilities: 'Complaint timers, auto-resolution system, support tickets, fraud reports',
      connectedServices: 'All services, Franchise Fine System, Legal Team',
      status: 'Planned',
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
          module: 'Wallet',
        },
        {
          id: 't1-3',
          title: 'Admin Dashboard Setup',
          description:
            'Develop a comprehensive dashboard for administrators to manage the platform.',
          status: 'In Progress',
          module: 'Admin',
        },
        {
          id: 't1-4',
          title: 'Database Schema Design',
          description:
            'Design and implement the initial database schema for users, products, and transactions.',
          status: 'Done',
          module: 'Core',
        },
      ],
    },
    {
      id: 'phase-2-mvp',
      title: 'Phase 2: MVP Launch and Initial Services',
      description:
        'Launching the Minimum Viable Product with core services like e-commerce, affiliate marketing, and initial AI-driven features. The goal is to gather user feedback and iterate.',
      tasks: [
        {
          id: 't2-1',
          title: 'E-commerce Platform (GoSellr)',
          description: 'Launch the initial version of the GoSellr marketplace.',
          status: 'In Progress',
          module: 'GoSellr',
        },
        {
          id: 't2-2',
          title: 'Affiliate Marketing System',
          description: 'Implement a system for users to earn through referrals.',
          status: 'Planned',
          module: 'Affiliate',
        },
        {
          id: 't2-3',
          title: 'Basic AI Assistant',
          description: 'Introduce a basic AI assistant for user support and navigation.',
          status: 'In Progress',
          module: 'AI',
        },
        {
          id: 't2-4',
          title: 'Product and Service Listings',
          description: 'Allow vendors to list their products and services on the platform.',
          status: 'In Progress',
          module: 'GoSellr',
        },
      ],
    },
    {
      id: 'phase-3-expansion',
      title: 'Phase 3: Service Expansion and Blockchain Integration',
      description:
        'Expanding the range of services to include specialized sectors like healthcare and education. Integrating blockchain for enhanced security and transparency.',
      tasks: [
        {
          id: 't3-1',
          title: 'Healthcare Services Module (WMS)',
          description: 'Launch the World Medical Services platform for appointments and records.',
          status: 'Planned',
          module: 'WMS',
        },
        {
          id: 't3-2',
          title: 'Educational Platform (OBS)',
          description: 'Launch the Online Book Store and learning content module.',
          status: 'Planned',
          module: 'OBS',
        },
        {
          id: 't3-3',
          title: 'Smart Contract for Transactions',
          description: 'Implement smart contracts for secure and transparent transactions.',
          status: 'Planned',
          module: 'Blockchain',
        },
        {
          id: 't3-4',
          title: 'KYC/AML Verification System (PSS)',
          description: 'Integrate a robust system for identity verification.',
          status: 'Planned',
          module: 'PSS',
        },
      ],
    },
    {
      id: 'phase-4-globalization',
      title: 'Phase 4: Globalization and Advanced AI',
      description:
        'Focusing on scaling the platform globally with multi-language support and advanced AI capabilities for automation and personalization. Full decentralization is a key objective.',
      tasks: [
        {
          id: 't4-1',
          title: 'Multi-language Support',
          description: 'Add support for multiple languages across the platform.',
          status: 'Planned',
          module: 'Core',
        },
        {
          id: 't4-2',
          title: 'Advanced AI Agents',
          description: 'Deploy advanced AI agents for predictive analytics and process automation.',
          status: 'Planned',
          module: 'AI',
        },
        {
          id: 't4-3',
          title: 'Decentralized Governance Model',
          description: 'Implement a model for community-based governance.',
          status: 'Planned',
          module: 'Blockchain',
        },
        {
          id: 't4-4',
          title: 'Global Franchise Network',
          description: 'Expand the franchise network to multiple countries.',
          status: 'Planned',
          module: 'Franchise',
        },
      ],
    },
  ],
};
