import React from 'react';

import { useAIContext } from './ai-context-provider';

const AgentsList = () => {
  const { agents } = useAIContext();
  return (
    <div>
      <h3 className="font-semibold mb-2">Agent Directory</h3>
      <ul className="space-y-1">
        {agents.map((agent, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <button
              className="text-blue-700 hover:underline"
              onClick={() => alert(`Go to ${agent.name}`)}
            >
              {agent.name}
            </button>
            <span className="text-xs text-gray-500">{agent.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentsList;
