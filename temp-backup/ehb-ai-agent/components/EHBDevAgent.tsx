import React, { useEffect, useState } from 'react';

import { useAIAgent } from '../context/AIAgentContext';
import { AdvancedAutomation } from '../services/advancedAutomation';

interface DevAgentState {
  activeModules: string[];
  logs: DevLog[];
  alerts: Alert[];
  progress: Record<string, number>;
}

interface DevLog {
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
}

export function EHBDevAgent() {
  const { state, dispatch } = useAIAgent();
  const [devState, setDevState] = useState<DevAgentState>({
    activeModules: [],
    logs: [],
    alerts: [],
    progress: {},
  });

  // Initialize development agent and automation
  useEffect(() => {
    const initializeAgent = async () => {
      try {
        const automation = AdvancedAutomation.getInstance();
        await automation.initializeAutomation();

        addLog({
          timestamp: new Date(),
          message: 'Advanced automation system initialized successfully',
          type: 'success',
        });

        // Start monitoring active modules
        setDevState(prev => ({
          ...prev,
          activeModules: ['code', 'test', 'deploy', 'monitor'],
        }));
      } catch (error) {
        handleAlert({
          id: Date.now().toString(),
          message: 'Failed to initialize automation system',
          type: 'error',
          timestamp: new Date(),
        });
      }
    };

    initializeAgent();
  }, []);

  // Monitor automation progress
  useEffect(() => {
    const monitorProgress = async () => {
      const automation = AdvancedAutomation.getInstance();
      const tasks = await automation.getAllTasks();

      const newProgress: Record<string, number> = {};
      tasks.forEach(task => {
        switch (task.status) {
          case 'completed':
            newProgress[task.type] = 100;
            break;
          case 'running':
            newProgress[task.type] = 50;
            break;
          case 'pending':
            newProgress[task.type] = 0;
            break;
          case 'failed':
            newProgress[task.type] = -1;
            break;
        }
      });

      setDevState(prev => ({
        ...prev,
        progress: newProgress,
      }));
    };

    const interval = setInterval(monitorProgress, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle alerts and logs
  const handleAlert = (alert: Alert) => {
    setDevState(prev => ({
      ...prev,
      alerts: [...prev.alerts, alert],
    }));

    // Dispatch to global state
    dispatch({
      type: 'ADD_LOG',
      payload: {
        module: 'dev',
        message: {
          id: alert.id,
          role: 'system',
          type: 'log',
          content: alert.message,
          timestamp: alert.timestamp,
          severity: alert.type,
        },
      },
    });
  };

  const addLog = (log: DevLog) => {
    setDevState(prev => ({
      ...prev,
      logs: [...prev.logs, log],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">EHB Development Agent</h2>

        {/* Active Modules */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Active Modules</h3>
          <div className="grid grid-cols-2 gap-2">
            {devState.activeModules.map(module => (
              <div
                key={module}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span className="capitalize">{module}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    devState.progress[module] === 100
                      ? 'bg-green-100 text-green-800'
                      : devState.progress[module] === -1
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {devState.progress[module] === 100
                    ? 'Complete'
                    : devState.progress[module] === -1
                      ? 'Failed'
                      : devState.progress[module] === 50
                        ? 'Running'
                        : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        {devState.alerts.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Alerts</h3>
            <div className="space-y-2">
              {devState.alerts.slice(-5).map(alert => (
                <div
                  key={alert.id}
                  className={`p-2 rounded ${
                    alert.type === 'error'
                      ? 'bg-red-100 text-red-800'
                      : alert.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : alert.type === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logs */}
        <div>
          <h3 className="text-lg font-medium mb-2">Recent Logs</h3>
          <div className="bg-gray-50 p-2 rounded h-40 overflow-y-auto space-y-1">
            {devState.logs.slice(-10).map((log, index) => (
              <div
                key={index}
                className={`text-sm ${
                  log.type === 'error'
                    ? 'text-red-600'
                    : log.type === 'warning'
                      ? 'text-yellow-600'
                      : log.type === 'success'
                        ? 'text-green-600'
                        : 'text-gray-600'
                }`}
              >
                {log.timestamp.toLocaleTimeString()}: {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
