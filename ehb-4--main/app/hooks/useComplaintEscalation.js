import { useState } from 'react';

export function useComplaintEscalation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const escalateComplaint = async ({ complaintId, action }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/complaints/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintId, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to escalate complaint');
      setResult(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { escalateComplaint, loading, error, result };
} 