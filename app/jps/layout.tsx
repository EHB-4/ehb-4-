import React from 'react';
import JPS/JPSNavbar from '@/components/JPS/JPSNavbar';
import JPS/JPSRoleContext from '@/components/JPS/JPSRoleContext';

export default function JPSLayout({ children }: { children: React.ReactNode }) {
  return (
    <JPSRoleProvider>
      <JPSNavbar />
      <main>{children}</main>
    </JPSRoleProvider>
  );
}
