import { useState, useEffect } from 'react';

interface CloudResponse {
  data: any;
  provider: string;
  error?: string;
}

export default function CloudFailoverExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>('');

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/data/${endpoint}`);
      const result = await response.json();

      if (response.ok) {
        setData(result);
        setProvider(result.provider || 'unknown');
      } else {
        setError(result.error || 'An error occurred');
        setProvider(result.provider || 'unknown');
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('users'); // Example endpoint
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cloud Failover Example</h2>

      {loading && <div className="text-blue-500">Loading data...</div>}

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error} (Provider: {provider})
        </div>
      )}

      {data && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Data from {provider}</h3>
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={() => fetchData('users')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Data
      </button>
    </div>
  );
}
