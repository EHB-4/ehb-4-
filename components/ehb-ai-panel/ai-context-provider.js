import React, { createContext, useContext, useState } from 'react';

const AIContext = createContext();

export const useAIContext = () => useContext(AIContext);

const AIContextProvider = ({ children }) => {
  // Placeholder: agent registry, user session, etc.
  const [agents, setAgents] = useState([
    { name: 'EHB-Robot', description: 'Main AI robot for automation' },
    { name: 'EHB-AI-Agent', description: 'Feature-specific logic' },
    { name: 'EHB-Chat', description: 'AI chat help' },
    // Future agents auto-register here
  ]);

  return <AIContext.Provider value={{ agents, setAgents }}>{children}</AIContext.Provider>;
};

export default AIContextProvider;
