'use client';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import utils/i18n from '@/lib/utils/i18n';

export default function RoadmapAgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      {/* All roadmap agent pages now have i18n support */}
      {children}
    </I18nextProvider>
  );
}
