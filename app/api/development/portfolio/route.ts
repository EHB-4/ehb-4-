export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  clientId?: string;
  startDate: string;
  endDate?: string;
  budget: number;
  progress: number;
  image?: string;
  link?: string;
  github?: string;
  features: string[];
}

// Mock portfolio data
const portfolioProjects: Project[] = [
  {
    id: '1',
    title: 'EHB Dashboard',
    description:
      'Comprehensive analytics and management dashboard with real-time data visualization.',
    category: 'web-development',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    budget: 25000,
    progress: 100,
    link: '/ehb-dashboard',
    github: 'https://github.com/ehb/dashboard',
    features: ['Real-time Analytics', 'User Management', 'Data Visualization', 'Responsive Design'],
  },
  {
    id: '2',
    title: 'GoSellr E-commerce',
    description:
      'Full-featured e-commerce platform with payment integration and inventory management.',
    category: 'web-development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'completed',
    startDate: '2023-11-01',
    endDate: '2024-02-15',
    budget: 45000,
    progress: 100,
    link: '/gosellr',
    github: 'https://github.com/ehb/gosellr',
    features: ['Payment Processing', 'Inventory Management', 'Order Tracking', 'Admin Panel'],
  },
  {
    id: '3',
    title: 'EMO Health Platform',
    description: 'Healthcare management system with appointment booking and medical records.',
    category: 'web-development',
    technologies: ['Next.js', 'PostgreSQL', 'Redis', 'WebRTC'],
    status: 'completed',
    startDate: '2023-08-15',
    endDate: '2024-01-30',
    budget: 35000,
    progress: 100,
    link: '/emo',
    github: 'https://github.com/ehb/emo',
    features: ['Appointment Booking', 'Medical Records', 'Telemedicine', 'Prescription System'],
  },
  {
    id: '4',
    title: 'PSS Security System',
    description: 'Public safety system with emergency response and incident tracking.',
    category: 'security-audit',
    technologies: ['React Native', 'Firebase', 'Google Maps', 'Push Notifications'],
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-12-15',
    budget: 30000,
    progress: 100,
    link: '/pss',
    github: 'https://github.com/ehb/pss',
    features: ['Emergency Response', 'Incident Tracking', 'Real-time Alerts', 'GPS Integration'],
  },
  {
    id: '5',
    title: 'AI Marketplace',
    description: 'AI-powered marketplace for services and automation tools.',
    category: 'ai-integration',
    technologies: ['Next.js', 'OpenAI API', 'MongoDB', 'WebSocket'],
    status: 'in-progress',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    budget: 40000,
    progress: 65,
    link: '/ai-marketplace',
    github: 'https://github.com/ehb/ai-marketplace',
    features: ['AI Agents', 'Service Discovery', 'Task Automation', 'Performance Metrics'],
  },
  {
    id: '6',
    title: 'EHB Wallet',
    description: 'Cryptocurrency wallet with blockchain integration and secure transactions.',
    category: 'web-development',
    technologies: ['React', 'Ethers.js', 'Web3', 'MetaMask'],
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2024-01-15',
    budget: 28000,
    progress: 100,
    link: '/wallet',
    github: 'https://github.com/ehb/wallet',
    features: [
      'Multi-chain Support',
      'Secure Transactions',
      'Portfolio Tracking',
      'DeFi Integration',
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let filteredProjects = [...portfolioProjects];

    // Filter by category
    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.category === category);
    }

    // Filter by status
    if (status) {
      filteredProjects = filteredProjects.filter(project => project.status === status);
    }

    // Calculate portfolio statistics
    const stats = {
      totalProjects: portfolioProjects.length,
      completedProjects: portfolioProjects.filter(p => p.status === 'completed').length,
      inProgressProjects: portfolioProjects.filter(p => p.status === 'in-progress').length,
      totalBudget: portfolioProjects.reduce((sum, p) => sum + p.budget, 0),
      averageProgress:
        portfolioProjects.reduce((sum, p) => sum + p.progress, 0) / portfolioProjects.length,
    };

    return NextResponse.json(
      {
        projects: filteredProjects,
        stats,
        total: filteredProjects.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real application, this would create a new project
    // For now, return a mock response
    const newProject: Project = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        project: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
