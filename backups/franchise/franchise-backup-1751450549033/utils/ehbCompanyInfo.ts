/**
 * EHB Technologies - Company Info Data
 * Pure data object for aggregation and multi-language support
 */

export interface EHBContact {
  email: string;
  phone: string;
  address: string;
  url: string;
  twitter: string;
  github: string;
}

export interface EHBDepartment {
  name: string;
  size?: number;
  desc?: string;
}

export interface EHBTechStack {
  name: string;
  version?: string;
}

export interface EHBCompanyInfo {
  name: string;
  description: string;
  version: string;
  contact: EHBContact;
  mission: string;
  vision: string;
  coreValues: string[];
  goals: string[];
  services: string[];
  techStack: EHBTechStack[];
  departments: EHBDepartment[];
  targetMarkets: string[];
  futureGoals: string[];
}

/**
 * EHB company info data (extracted from page component)
 */
export const ehbCompanyInfo: EHBCompanyInfo = {
  name: 'EHB Technologies',
  description:
    'Empowering businesses with innovative technology solutions. 700+ Services in One Super-App.',
  version: '1.0.0',
  contact: {
    email: 'contact@ehb.tech',
    phone: '+92-XXX-XXXXXXX',
    address: 'Karachi, Pakistan / Dubai, UAE',
    url: 'https://ehb.tech',
    twitter: 'https://twitter.com/ehbtech',
    github: 'https://github.com/ehbtech',
  },
  mission:
    'To provide 100% verified, AI-powered, blockchain-backed global services and products through a decentralized ecosystem accessible to every individual.',
  vision: `To become the world's leading unified service platform where users can trust, earn, learn, and transact securely, across all industries and countries, with full transparency and automation.`,
  coreValues: [
    'Verification Before Profit',
    'Transparency',
    'Decentralization',
    'Empowerment Through Technology',
    'Zero Tolerance for Fraud',
  ],
  goals: [
    'Launch GoSellr as a global e-commerce + services platform',
    'Deploy EHBGC token with Trusty Wallet and Validator Income Model',
    'Implement SQL-based verified profile system (PSS, EMO, EDR)',
    'Launch global franchise network (Sub, Master, Corporate)',
    'Integrate AI agents for system-wide automation and assistant tasks',
  ],
  services: [
    'GoSellr (E-commerce)',
    'EDR (Emergency Decision Registration)',
    'EMO (Health & Medical Services)',
    'JPS (Justice & Public Services)',
    'PSS (Public Safety System)',
    'Franchise System',
    'Trusty Wallet',
    'AI Assistant',
    'AI Marketplace',
    'EHB-Tube',
    'EHB-Ads',
    'EHB-Franchise',
    'EHB-Wallet',
    'EHB-Dashboard',
    'EHB-Home-Page',
    'Contracts',
    'Admin',
    'Profile',
    'Signup/Login',
    'Assistant',
    'OBS',
    'Roadmap',
    'Dashboard',
    'Wallet',
    'Affiliate',
    'Ads',
    'HPS',
    'AI',
    'Franchise',
    'PSS',
    'JPS',
  ],
  techStack: [
    { name: 'Next.js', version: '14.1.0' },
    { name: 'React', version: '18.2.0' },
    { name: 'TypeScript', version: '5.0.0' },
    { name: 'Node.js', version: '20.0.0' },
    { name: 'MongoDB', version: '5.x/6.x' },
    { name: 'PostgreSQL', version: '15.0' },
    { name: 'Redis', version: '7.0' },
    { name: 'Docker', version: '24.0' },
    { name: 'AWS', version: 'Latest' },
    { name: 'Moonbeam + BEP20', version: 'Blockchain' },
    { name: 'Custom AI Assistant', version: '' },
    { name: 'Tailwind CSS', version: '3.x' },
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
