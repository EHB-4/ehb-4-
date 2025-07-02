// Franchise utility functions for data processing and calculations

export interface FranchiseData {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: 'pending' | 'approved' | 'review' | 'rejected' | 'active';
  investment: number;
  location: string;
  applicationDate: string;
  roi: number;
  popularity: number;
  businessName?: string;
  experienceLevel?: string;
  motivation?: string;
  goals?: string;
  timeline?: string;
  fundingSource?: string;
  annualIncome?: number;
  netWorth?: number;
}

export interface FranchiseFilters {
  category?: string;
  status?: string;
  location?: string;
  minInvestment?: number;
  maxInvestment?: number;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Category configurations
export const FRANCHISE_CATEGORIES = {
  health: {
    name: 'Health & Wellness',
    icon: '🏥',
    investmentRange: { min: 50000, max: 500000 },
    avgROI: 25,
    requirements: [
      'Medical background preferred',
      'Minimum 5 years experience',
      'Strong business acumen',
    ],
    features: ['Healthcare services', 'Fitness programs', 'Wellness consulting'],
  },
  education: {
    name: 'Education & Training',
    icon: '🎓',
    investmentRange: { min: 30000, max: 300000 },
    avgROI: 30,
    requirements: [
      'Educational background preferred',
      'Teaching experience',
      'Passion for education',
    ],
    features: ['Academic programs', 'Skill development', 'Certification courses'],
  },
  law: {
    name: 'Legal Services',
    icon: '⚖️',
    investmentRange: { min: 100000, max: 1000000 },
    avgROI: 35,
    requirements: ['Legal background required', 'Bar certification', 'Minimum 3 years practice'],
    features: ['Legal consultation', 'Document services', 'Compliance support'],
  },
  travel: {
    name: 'Travel & Tourism',
    icon: '✈️',
    investmentRange: { min: 20000, max: 200000 },
    avgROI: 28,
    requirements: ['Travel industry experience', 'Customer service skills', 'Network connections'],
    features: ['Travel packages', 'Hotel bookings', 'Tour services'],
  },
  books: {
    name: 'Books & Publishing',
    icon: '📚',
    investmentRange: { min: 25000, max: 250000 },
    avgROI: 22,
    requirements: ['Literary background preferred', 'Retail experience', 'Community engagement'],
    features: ['Book retail', 'Publishing services', 'Digital content'],
  },
};

// Investment ranges
export const INVESTMENT_RANGES = [
  { value: '20k-50k', label: '$20K - $50K', min: 20000, max: 50000 },
  { value: '50k-100k', label: '$50K - $100K', min: 50000, max: 100000 },
  { value: '100k-250k', label: '$100K - $250K', min: 100000, max: 250000 },
  { value: '250k-500k', label: '$250K - $500K', min: 250000, max: 500000 },
  { value: '500k-1m', label: '$500K - $1M', min: 500000, max: 1000000 },
  { value: '1m+', label: '$1M+', min: 1000000, max: Infinity },
];

// Experience levels
export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner (0-2 years)', multiplier: 0.8 },
  { value: 'intermediate', label: 'Intermediate (3-5 years)', multiplier: 1.0 },
  { value: 'experienced', label: 'Experienced (6-10 years)', multiplier: 1.2 },
  { value: 'expert', label: 'Expert (10+ years)', multiplier: 1.5 },
];

// Status configurations
export const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: 'Clock',
    description: 'Application is under review',
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: 'CheckCircle',
    description: 'Application has been approved',
  },
  review: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: 'AlertCircle',
    description: 'Application is being evaluated',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    icon: 'AlertCircle',
    description: 'Application has been rejected',
  },
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: 'CheckCircle',
    description: 'Franchise is operational',
  },
};

// Utility functions

/**
 * Calculate ROI based on category and investment
 */
export function calculateROI(
  category: string,
  investment: number,
  experienceLevel?: string
): number {
  const categoryConfig = FRANCHISE_CATEGORIES[category as keyof typeof FRANCHISE_CATEGORIES];
  if (!categoryConfig) return 25;

  const baseROI = categoryConfig.avgROI;
  const experienceMultiplier = experienceLevel
    ? EXPERIENCE_LEVELS.find(level => level.value === experienceLevel)?.multiplier || 1.0
    : 1.0;

  const investmentMultiplier = investment > 100000 ? 1.2 : 1.0;

  return Math.round(baseROI * experienceMultiplier * investmentMultiplier);
}

/**
 * Calculate popularity score based on various factors
 */
export function calculatePopularity(
  category: string,
  location: string,
  investment: number
): number {
  const categoryPopularity = {
    health: 85,
    education: 90,
    law: 75,
    travel: 80,
    books: 70,
  };

  const locationBonus = location.includes('Karachi') || location.includes('Lahore') ? 10 : 5;
  const investmentBonus = investment > 100000 ? 5 : 0;

  const basePopularity = categoryPopularity[category as keyof typeof categoryPopularity] || 75;
  return Math.min(100, basePopularity + locationBonus + investmentBonus);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Filter franchises based on criteria
 */
export function filterFranchises(
  franchises: FranchiseData[],
  filters: FranchiseFilters
): FranchiseData[] {
  return franchises.filter(franchise => {
    if (filters.category && franchise.category !== filters.category) return false;
    if (filters.status && franchise.status !== filters.status) return false;
    if (
      filters.location &&
      !franchise.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    if (filters.minInvestment && franchise.investment < filters.minInvestment) return false;
    if (filters.maxInvestment && franchise.investment > filters.maxInvestment) return false;
    if (filters.dateRange) {
      const applicationDate = new Date(franchise.applicationDate);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (applicationDate < startDate || applicationDate > endDate) return false;
    }
    return true;
  });
}

/**
 * Sort franchises by various criteria
 */
export function sortFranchises(
  franchises: FranchiseData[],
  sortBy: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): FranchiseData[] {
  return [...franchises].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'investment':
        aValue = a.investment;
        bValue = b.investment;
        break;
      case 'roi':
        aValue = a.roi;
        bValue = b.roi;
        break;
      case 'popularity':
        aValue = a.popularity;
        bValue = b.popularity;
        break;
      case 'applicationDate':
        aValue = new Date(a.applicationDate);
        bValue = new Date(b.applicationDate);
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

/**
 * Calculate franchise statistics
 */
export function calculateFranchiseStats(franchises: FranchiseData[]) {
  if (franchises.length === 0) {
    return {
      totalApplications: 0,
      totalApprovals: 0,
      totalRevenue: 0,
      avgInvestment: 0,
      successRate: 0,
      totalActive: 0,
      categoryDistribution: {},
      statusDistribution: {},
      geographicDistribution: {},
    };
  }

  const totalApplications = franchises.length;
  const totalApprovals = franchises.filter(f => f.status === 'approved').length;
  const totalActive = franchises.filter(f => f.status === 'active').length;
  const totalRevenue = franchises.reduce((sum, f) => sum + f.investment, 0);
  const avgInvestment = Math.round(totalRevenue / totalApplications);
  const successRate = Math.round((totalApprovals / totalApplications) * 100);

  // Category distribution
  const categoryDistribution = franchises.reduce(
    (acc, franchise) => {
      acc[franchise.category] = (acc[franchise.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Status distribution
  const statusDistribution = franchises.reduce(
    (acc, franchise) => {
      acc[franchise.status] = (acc[franchise.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Geographic distribution
  const geographicDistribution = franchises.reduce(
    (acc, franchise) => {
      const city = franchise.location.split(',')[0].trim();
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalApplications,
    totalApprovals,
    totalRevenue,
    avgInvestment,
    successRate,
    totalActive,
    categoryDistribution,
    statusDistribution,
    geographicDistribution,
  };
}

/**
 * Validate franchise application data
 */
export function validateFranchiseData(data: Partial<FranchiseData>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const requiredFields = ['name', 'email', 'phone', 'category', 'investment', 'location'];

  // Check required fields
  for (const field of requiredFields) {
    if (!data[field as keyof FranchiseData]) {
      errors.push(`${field} is required`);
    }
  }

  // Validate email format
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate phone format
  if (data.phone && !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  // Validate investment amount
  if (data.investment && data.investment < 10000) {
    errors.push('Investment must be at least $10,000');
  }

  // Validate category
  if (data.category && !FRANCHISE_CATEGORIES[data.category as keyof typeof FRANCHISE_CATEGORIES]) {
    errors.push('Invalid franchise category');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate franchise ID
 */
export function generateFranchiseId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `FR${timestamp}${random}`;
}

/**
 * Get category information
 */
export function getCategoryInfo(category: string) {
  return FRANCHISE_CATEGORIES[category as keyof typeof FRANCHISE_CATEGORIES] || null;
}

/**
 * Get status information
 */
export function getStatusInfo(status: string) {
  return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || null;
}

/**
 * Calculate application processing time
 */
export function calculateProcessingTime(applicationDate: string): number {
  const startDate = new Date(applicationDate);
  const endDate = new Date();
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
