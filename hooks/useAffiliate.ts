import { useState, useEffect } from 'react';

interface AffiliateStats {
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  totalEarnings: number;
  monthlyEarnings: number;
  sqlLevel: string;
  commissionRate: number;
  lockedCoins: number;
  loyaltyBonus: number;
  referralTree: Array<{
    id: number;
    name: string;
    level: number;
    earnings: number;
    status: string;
    sqlLevel: string;
  }>;
  achievements: Array<{
    id: number;
    name: string;
    description: string;
    earned: boolean;
  }>;
}

interface ReferralLink {
  referralCode: string;
  referralLink: string;
  qrCodeUrl: string;
  campaign: string;
  createdAt: string;
  clicks: number;
  conversions: number;
  earnings: number;
}

interface Earnings {
  total: number;
  monthly: number;
  breakdown: {
    directCommissions: number;
    loyaltyBonuses: number;
    sqlLevelBonus: number;
  };
  history: Array<{
    date: string;
    amount: number;
    referrals: number;
  }>;
  pending: number;
  withdrawn: number;
}

/**
 * Custom hook for affiliate marketing functionality
 */
export function useAffiliate() {
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([]);
  const [earnings, setEarnings] = useState<Earnings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch affiliate statistics
  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/affiliate/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || 'Failed to fetch stats');
      }
    } catch (err) {
      setError('Network error while fetching stats');
    } finally {
      setLoading(false);
    }
  };

  // Generate new referral link
  const generateReferralLink = async (campaign = 'default') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/affiliate/generate-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123', // In real app, get from auth context
          campaign,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReferralLinks(prev => [...prev, data.data]);
        return data.data;
      } else {
        setError(data.error || 'Failed to generate referral link');
        return null;
      }
    } catch (err) {
      setError('Network error while generating referral link');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch earnings
  const fetchEarnings = async (period = 'month') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/affiliate/earnings?period=${period}`);
      const data = await response.json();

      if (data.success) {
        setEarnings(data.data);
      } else {
        setError(data.error || 'Failed to fetch earnings');
      }
    } catch (err) {
      setError('Network error while fetching earnings');
    } finally {
      setLoading(false);
    }
  };

  // Withdraw earnings
  const withdrawEarnings = async (amount: number, walletAddress: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/affiliate/earnings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          walletAddress,
          userId: 'user123', // In real app, get from auth context
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh earnings after withdrawal
        await fetchEarnings();
        return data.data;
      } else {
        setError(data.error || 'Failed to process withdrawal');
        return null;
      }
    } catch (err) {
      setError('Network error while processing withdrawal');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Copy referral link to clipboard
  const copyToClipboard = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  };

  // Calculate commission based on SQL level
  const calculateCommission = (baseAmount: number, sqlLevel: string) => {
    const multipliers = {
      Free: 0.5,
      Basic: 1.0,
      Normal: 1.2,
      High: 1.5,
      VIP: 2.0,
    };

    const multiplier = multipliers[sqlLevel as keyof typeof multipliers] || 1.0;
    return baseAmount * multiplier;
  };

  // Get SQL level requirements
  const getSqlLevelRequirements = () => {
    return [
      { name: 'Free', multiplier: 0.5, bonus: 2, required: 'Signup via referral' },
      { name: 'Basic', multiplier: 1.0, bonus: 4, required: 'KYC + 1 referral' },
      { name: 'Normal', multiplier: 1.2, bonus: 6, required: 'Lock 500 EHBGC' },
      { name: 'High', multiplier: 1.5, bonus: 8, required: 'Lock 1500 EHBGC' },
      { name: 'VIP', multiplier: 2.0, bonus: 10, required: 'Lock 5000 EHBGC' },
    ];
  };

  // Get commission levels
  const getCommissionLevels = () => {
    return [
      { level: 1, rate: 10, description: 'Direct referrals' },
      { level: 2, rate: 5, description: 'Second level' },
      { level: 3, rate: 2, description: 'Third level' },
      { level: 4, rate: 1, description: 'Fourth level' },
      { level: 5, rate: 1, description: 'Fifth level' },
    ];
  };

  // Lock coins for SQL level upgrade
  const lockCoins = async (amount: number) => {
    // In real implementation, this would interact with blockchain
    console.log(`Locking ${amount} EHBGC coins`);
    return true;
  };

  // Unlock coins
  const unlockCoins = async (amount: number) => {
    // In real implementation, this would interact with blockchain
    console.log(`Unlocking ${amount} EHBGC coins`);
    return true;
  };

  // Initialize data on mount
  useEffect(() => {
    fetchStats();
    fetchEarnings();
  }, []);

  return {
    // State
    stats,
    referralLinks,
    earnings,
    loading,
    error,

    // Actions
    fetchStats,
    generateReferralLink,
    fetchEarnings,
    withdrawEarnings,
    copyToClipboard,
    lockCoins,
    unlockCoins,

    // Utilities
    calculateCommission,
    getSqlLevelRequirements,
    getCommissionLevels,
  };
}
