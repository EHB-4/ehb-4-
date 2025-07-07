import { useEffect, useState } from 'react';

export interface SQLLevelInfo {
  currentLevel: number;
  issuedBy: string;
  issuedAt: string;
  expiryDate?: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  benefits: string[];
}

export interface SQLProgressInfo {
  currentLevel: number;
  progress: number; // 0-100
  nextLevelRequirements?: {
    description: string;
    completed: boolean;
  }[];
}

export interface SQLUpgradeStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in-progress';
  link?: string;
}

export interface SQLLevelData {
  user: SQLLevelInfo | null;
  progress: SQLProgressInfo | null;
  upgradeSteps: SQLUpgradeStep[];
}

/**
 * Custom hook to fetch EHB SQL Level System data from backend API.
 * Handles loading, error, and data states.
 */
export function useSQLLevelData() {
  const [data, setData] = useState<SQLLevelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        // Fetch user SQL level info
        const userRes = await fetch('/sql/get-level');
        if (!userRes.ok) throw new Error('Failed to fetch SQL level info');
        const user = await userRes.json();

        // Fetch progress info
        const progressRes = await fetch('/sql/progress');
        if (!progressRes.ok) throw new Error('Failed to fetch SQL progress');
        const progress = await progressRes.json();

        // Fetch upgrade steps
        const upgradeRes = await fetch('/sql/upgrade', { method: 'GET' });
        if (!upgradeRes.ok) throw new Error('Failed to fetch SQL upgrade steps');
        const upgradeSteps = await upgradeRes.json();

        if (isMounted) {
          setData({ user, progress, upgradeSteps });
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

export default useSQLLevelData;
