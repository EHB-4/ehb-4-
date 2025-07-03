/**
 * JPS (Job Placement System) API Service
 * Frontend API service with mock data and real API structure
 */

export interface JPSJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  education: string;
  status: 'active' | 'filled' | 'expired' | 'draft';
  postedDate: string;
  deadline: string;
  applications: number;
  matchScore?: number;
  sqlLevelRequired?: number;
  sqlLevelUnlocked?: number;
}

export interface JPSCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  title: string;
  experience: number;
  education: string;
  skills: string[];
  resume: string;
  status: 'available' | 'employed' | 'interviewing' | 'placed';
  sqlLevel: number;
  matchScore?: number;
  lastActive: string;
}

export interface JPSPlacement {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  placementDate: string;
  salary: number;
  status: 'active' | 'completed' | 'terminated';
  successRate: number;
  feedback: string;
}

export interface JPSInterview {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  scheduledDate: string;
  duration: number; // minutes
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

export interface JPSAnalytics {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  availableCandidates: number;
  totalPlacements: number;
  activePlacements: number;
  averageSuccessRate: number;
  sqlLevelDistribution: Record<number, number>;
  monthlyPlacements: Array<{ month: string; count: number }>;
  topSkills: Array<{ skill: string; count: number }>;
}

// Mock data
const mockJobs: JPSJob[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'Karachi, Pakistan',
    type: 'full-time',
    salary: { min: 150000, max: 250000, currency: 'PKR' },
    description: 'We are looking for an experienced React developer to join our team...',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    experience: '5+ years',
    education: 'BS Computer Science',
    status: 'active',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    applications: 23,
    matchScore: 95,
    sqlLevelRequired: 2,
    sqlLevelUnlocked: 3,
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    company: 'DataTech Innovations',
    location: 'Lahore, Pakistan',
    type: 'full-time',
    salary: { min: 200000, max: 350000, currency: 'PKR' },
    description: 'Join our AI team to develop cutting-edge machine learning solutions...',
    requirements: ['Python', 'TensorFlow', 'PyTorch', '3+ years experience'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Docker'],
    experience: '3+ years',
    education: 'MS Computer Science',
    status: 'active',
    postedDate: '2024-01-18',
    deadline: '2024-02-18',
    applications: 15,
    matchScore: 88,
    sqlLevelRequired: 3,
    sqlLevelUnlocked: 4,
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebSolutions Ltd',
    location: 'Islamabad, Pakistan',
    type: 'contract',
    salary: { min: 80000, max: 120000, currency: 'PKR' },
    description: 'Contract position for frontend development with modern technologies...',
    requirements: ['JavaScript', 'Vue.js', 'CSS3', '2+ years experience'],
    skills: ['JavaScript', 'Vue.js', 'CSS3', 'HTML5', 'Git'],
    experience: '2+ years',
    education: 'BS Software Engineering',
    status: 'active',
    postedDate: '2024-01-20',
    deadline: '2024-02-20',
    applications: 8,
    matchScore: 75,
    sqlLevelRequired: 1,
    sqlLevelUnlocked: 2,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech Systems',
    location: 'Karachi, Pakistan',
    type: 'full-time',
    salary: { min: 180000, max: 280000, currency: 'PKR' },
    description: 'Manage cloud infrastructure and deployment pipelines...',
    requirements: ['Docker', 'Kubernetes', 'AWS', '4+ years experience'],
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
    experience: '4+ years',
    education: 'BS Computer Science',
    status: 'active',
    postedDate: '2024-01-22',
    deadline: '2024-02-22',
    applications: 12,
    matchScore: 82,
    sqlLevelRequired: 2,
    sqlLevelUnlocked: 3,
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'Creative Studios',
    location: 'Lahore, Pakistan',
    type: 'part-time',
    salary: { min: 60000, max: 90000, currency: 'PKR' },
    description: 'Create beautiful and functional user interfaces...',
    requirements: ['Figma', 'Adobe Creative Suite', '2+ years experience'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    experience: '2+ years',
    education: 'BS Design',
    status: 'active',
    postedDate: '2024-01-25',
    deadline: '2024-02-25',
    applications: 18,
    matchScore: 78,
    sqlLevelRequired: 1,
    sqlLevelUnlocked: 2,
  },
];

const mockCandidates: JPSCandidate[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    location: 'Karachi, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'Senior React Developer',
    experience: 6,
    education: 'BS Computer Science',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    resume: '/resumes/ahmed-khan.pdf',
    status: 'available',
    sqlLevel: 2,
    matchScore: 95,
    lastActive: '2024-01-25',
  },
  {
    id: '2',
    name: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92-301-2345678',
    location: 'Lahore, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'AI/ML Engineer',
    experience: 4,
    education: 'MS Computer Science',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Docker'],
    resume: '/resumes/fatima-ali.pdf',
    status: 'available',
    sqlLevel: 3,
    matchScore: 88,
    lastActive: '2024-01-24',
  },
  {
    id: '3',
    name: 'Usman Hassan',
    email: 'usman.hassan@email.com',
    phone: '+92-302-3456789',
    location: 'Islamabad, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'Frontend Developer',
    experience: 3,
    education: 'BS Software Engineering',
    skills: ['JavaScript', 'Vue.js', 'CSS3', 'HTML5', 'Git'],
    resume: '/resumes/usman-hassan.pdf',
    status: 'interviewing',
    sqlLevel: 1,
    matchScore: 75,
    lastActive: '2024-01-23',
  },
  {
    id: '4',
    name: 'Ayesha Malik',
    email: 'ayesha.malik@email.com',
    phone: '+92-303-4567890',
    location: 'Karachi, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'DevOps Engineer',
    experience: 5,
    education: 'BS Computer Science',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
    resume: '/resumes/ayesha-malik.pdf',
    status: 'available',
    sqlLevel: 2,
    matchScore: 82,
    lastActive: '2024-01-26',
  },
  {
    id: '5',
    name: 'Hassan Raza',
    email: 'hassan.raza@email.com',
    phone: '+92-304-5678901',
    location: 'Lahore, Pakistan',
    avatar: '/api/placeholder/40/40',
    title: 'UI/UX Designer',
    experience: 4,
    education: 'BS Design',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    resume: '/resumes/hassan-raza.pdf',
    status: 'employed',
    sqlLevel: 1,
    matchScore: 78,
    lastActive: '2024-01-22',
  },
];

const mockPlacements: JPSPlacement[] = [
  {
    id: '1',
    candidateId: '1',
    jobId: '1',
    candidateName: 'Ahmed Khan',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Solutions',
    placementDate: '2024-01-20',
    salary: 200000,
    status: 'active',
    successRate: 95,
    feedback: 'Excellent candidate with strong technical skills',
  },
  {
    id: '2',
    candidateId: '2',
    jobId: '2',
    candidateName: 'Fatima Ali',
    jobTitle: 'AI/ML Engineer',
    company: 'DataTech Innovations',
    placementDate: '2024-01-18',
    salary: 275000,
    status: 'active',
    successRate: 92,
    feedback: 'Highly skilled in AI/ML technologies',
  },
  {
    id: '3',
    candidateId: '4',
    jobId: '4',
    candidateName: 'Ayesha Malik',
    jobTitle: 'DevOps Engineer',
    company: 'CloudTech Systems',
    placementDate: '2024-01-23',
    salary: 230000,
    status: 'completed',
    successRate: 88,
    feedback: 'Great infrastructure management skills',
  },
];

const mockInterviews: JPSInterview[] = [
  {
    id: '1',
    candidateId: '3',
    jobId: '3',
    candidateName: 'Usman Hassan',
    jobTitle: 'Frontend Developer',
    company: 'WebSolutions Ltd',
    scheduledDate: '2024-01-30T14:00:00Z',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    notes: 'Focus on Vue.js and modern frontend practices',
  },
  {
    id: '2',
    candidateId: '5',
    jobId: '5',
    candidateName: 'Hassan Raza',
    jobTitle: 'UI/UX Designer',
    company: 'Creative Studios',
    scheduledDate: '2024-01-28T10:00:00Z',
    duration: 45,
    type: 'in-person',
    status: 'completed',
    notes: 'Portfolio review and design challenge',
  },
];

// API Service Class
export class JPSApiService {
  // Jobs API
  static async getJobs(filters?: {
    status?: string;
    type?: string;
    location?: string;
    sqlLevel?: number;
  }): Promise<JPSJob[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredJobs = [...mockJobs];
    
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.status === filters.status);
      }
      if (filters.type && filters.type !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.type === filters.type);
      }
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.sqlLevel) {
        filteredJobs = filteredJobs.filter(job => 
          job.sqlLevelRequired === filters.sqlLevel
        );
      }
    }
    
    return filteredJobs;
  }

  static async getJob(id: string): Promise<JPSJob | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockJobs.find(job => job.id === id) || null;
  }

  static async createJob(jobData: Omit<JPSJob, 'id' | 'postedDate' | 'applications'>): Promise<JPSJob> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newJob: JPSJob = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split('T')[0],
      applications: 0,
    };
    
    mockJobs.push(newJob);
    return newJob;
  }

  static async updateJob(id: string, jobData: Partial<JPSJob>): Promise<JPSJob | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const jobIndex = mockJobs.findIndex(job => job.id === id);
    if (jobIndex === -1) return null;
    
    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...jobData };
    return mockJobs[jobIndex];
  }

  static async deleteJob(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const jobIndex = mockJobs.findIndex(job => job.id === id);
    if (jobIndex === -1) return false;
    
    mockJobs.splice(jobIndex, 1);
    return true;
  }

  // Candidates API
  static async getCandidates(filters?: {
    status?: string;
    location?: string;
    sqlLevel?: number;
  }): Promise<JPSCandidate[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCandidates = [...mockCandidates];
    
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredCandidates = filteredCandidates.filter(candidate => candidate.status === filters.status);
      }
      if (filters.location) {
        filteredCandidates = filteredCandidates.filter(candidate => 
          candidate.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.sqlLevel) {
        filteredCandidates = filteredCandidates.filter(candidate => candidate.sqlLevel === filters.sqlLevel);
      }
    }
    
    return filteredCandidates;
  }

  static async getCandidate(id: string): Promise<JPSCandidate | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCandidates.find(candidate => candidate.id === id) || null;
  }

  static async createCandidate(candidateData: Omit<JPSCandidate, 'id' | 'lastActive'>): Promise<JPSCandidate> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newCandidate: JPSCandidate = {
      ...candidateData,
      id: Date.now().toString(),
      lastActive: new Date().toISOString().split('T')[0],
    };
    
    mockCandidates.push(newCandidate);
    return newCandidate;
  }

  static async updateCandidate(id: string, candidateData: Partial<JPSCandidate>): Promise<JPSCandidate | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const candidateIndex = mockCandidates.findIndex(candidate => candidate.id === id);
    if (candidateIndex === -1) return null;
    
    mockCandidates[candidateIndex] = { ...mockCandidates[candidateIndex], ...candidateData };
    return mockCandidates[candidateIndex];
  }

  // Placements API
  static async getPlacements(filters?: {
    status?: string;
    company?: string;
  }): Promise<JPSPlacement[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredPlacements = [...mockPlacements];
    
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredPlacements = filteredPlacements.filter(placement => placement.status === filters.status);
      }
      if (filters.company) {
        filteredPlacements = filteredPlacements.filter(placement => 
          placement.company.toLowerCase().includes(filters.company!.toLowerCase())
        );
      }
    }
    
    return filteredPlacements;
  }

  static async createPlacement(placementData: Omit<JPSPlacement, 'id' | 'placementDate'>): Promise<JPSPlacement> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPlacement: JPSPlacement = {
      ...placementData,
      id: Date.now().toString(),
      placementDate: new Date().toISOString().split('T')[0],
    };
    
    mockPlacements.push(newPlacement);
    return newPlacement;
  }

  // Interviews API
  static async getInterviews(filters?: {
    status?: string;
    type?: string;
  }): Promise<JPSInterview[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredInterviews = [...mockInterviews];
    
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredInterviews = filteredInterviews.filter(interview => interview.status === filters.status);
      }
      if (filters.type) {
        filteredInterviews = filteredInterviews.filter(interview => interview.type === filters.type);
      }
    }
    
    return filteredInterviews;
  }

  static async scheduleInterview(interviewData: Omit<JPSInterview, 'id'>): Promise<JPSInterview> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newInterview: JPSInterview = {
      ...interviewData,
      id: Date.now().toString(),
    };
    
    mockInterviews.push(newInterview);
    return newInterview;
  }

  // Analytics API
  static async getAnalytics(): Promise<JPSAnalytics> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const sqlLevelDistribution = {
      0: mockCandidates.filter(c => c.sqlLevel === 0).length,
      1: mockCandidates.filter(c => c.sqlLevel === 1).length,
      2: mockCandidates.filter(c => c.sqlLevel === 2).length,
      3: mockCandidates.filter(c => c.sqlLevel === 3).length,
      4: mockCandidates.filter(c => c.sqlLevel === 4).length,
    };

    const allSkills = mockCandidates.flatMap(c => c.skills);
    const skillCounts = allSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalJobs: mockJobs.length,
      activeJobs: mockJobs.filter(j => j.status === 'active').length,
      totalCandidates: mockCandidates.length,
      availableCandidates: mockCandidates.filter(c => c.status === 'available').length,
      totalPlacements: mockPlacements.length,
      activePlacements: mockPlacements.filter(p => p.status === 'active').length,
      averageSuccessRate: Math.round(
        mockPlacements.reduce((acc, p) => acc + p.successRate, 0) / mockPlacements.length
      ),
      sqlLevelDistribution,
      monthlyPlacements: [
        { month: 'Jan', count: 15 },
        { month: 'Feb', count: 23 },
        { month: 'Mar', count: 18 },
        { month: 'Apr', count: 27 },
        { month: 'May', count: 31 },
        { month: 'Jun', count: 29 },
      ],
      topSkills,
    };
  }

  // AI Matching API
  static async getJobMatches(jobId: string): Promise<JPSCandidate[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) return [];
    
    // Simple matching algorithm based on skills and SQL level
    return mockCandidates
      .filter(candidate => 
        candidate.status === 'available' && 
        candidate.sqlLevel >= (job.sqlLevelRequired || 0)
      )
      .map(candidate => {
        const skillMatch = candidate.skills.filter(skill => 
          job.skills.includes(skill)
        ).length;
        const matchScore = Math.round((skillMatch / job.skills.length) * 100);
        
        return {
          ...candidate,
          matchScore: Math.min(matchScore, 100),
        };
      })
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 10);
  }

  static async getCandidateMatches(candidateId: string): Promise<JPSJob[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const candidate = mockCandidates.find(c => c.id === candidateId);
    if (!candidate) return [];
    
    // Simple matching algorithm based on skills and SQL level
    return mockJobs
      .filter(job => 
        job.status === 'active' && 
        candidate.sqlLevel >= (job.sqlLevelRequired || 0)
      )
      .map(job => {
        const skillMatch = candidate.skills.filter(skill => 
          job.skills.includes(skill)
        ).length;
        const matchScore = Math.round((skillMatch / candidate.skills.length) * 100);
        
        return {
          ...job,
          matchScore: Math.min(matchScore, 100),
        };
      })
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 10);
  }
}

export default JPSApiService; 