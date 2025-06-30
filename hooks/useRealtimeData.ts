import { useState, useEffect, useCallback } from 'react';

interface AgentData {
  id: number;
  name: string;
  status: string;
  cpu: number;
  memory: number;
  responseTime: string;
  requestsPerMinute: number;
}

interface RealtimeData {
  agents: AgentData[];
  timestamp: string;
}

interface AgentsStatus {
  totalAgents: number;
  activeAgents: number;
  healthyAgents: number;
  degradedAgents: number;
  criticalAgents: number;
  timestamp: string;
}

export function useRealtimeData() {
  const [agentsData, setAgentsData] = useState<AgentData[]>([]);
  const [agentsStatus, setAgentsStatus] = useState<AgentsStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    try {
      const eventSource = new EventSource('/api/ai-agents/realtime');

      eventSource.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      eventSource.onmessage = event => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'agents_status') {
            setAgentsStatus(data.data);
          } else if (data.type === 'agents_update') {
            setAgentsData(data.data.agents);
          }
        } catch (err) {
          console.error('Error parsing real-time data:', err);
        }
      };

      eventSource.onerror = error => {
        console.error('EventSource error:', error);
        setIsConnected(false);
        setError('Connection lost. Reconnecting...');

        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          connect();
        }, 5000);
      };

      return () => {
        eventSource.close();
        setIsConnected(false);
      };
    } catch (err) {
      setError('Failed to connect to real-time data');
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  return {
    agentsData,
    agentsStatus,
    isConnected,
    error,
    reconnect: connect,
  };
}
