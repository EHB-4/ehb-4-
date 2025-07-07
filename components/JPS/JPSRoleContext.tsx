'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type JPSRole = 'jobseeker' | 'employer' | 'admin';

interface JPSRoleContextType {
  role: JPSRole;
  setRole: (role: JPSRole) => void;
}

const JPSRoleContext = createContext<JPSRoleContextType | undefined>(undefined);

export const JPSRoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<JPSRole>('jobseeker');
  return <JPSRoleContext.Provider value={{ role, setRole }}>{children}</JPSRoleContext.Provider>;
};

export function useJPSRole() {
  const context = useContext(JPSRoleContext);
  if (!context) {
    throw new Error('useJPSRole must be used within a JPSRoleProvider');
  }
  return context;
}
