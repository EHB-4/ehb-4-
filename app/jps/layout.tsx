import React from 'react';
import JPSNavbar from '../../components/JPS/JPSNavbar';
import { JPSRoleProvider } from '../../components/JPS/JPSRoleContext';

export default function JPSLayout({ children }: { children: React.ReactNode }) {
  return (
    <JPSRoleProvider>
      <JPSNavbar />
      <main>{children}</main>
    </JPSRoleProvider>
  );
}
