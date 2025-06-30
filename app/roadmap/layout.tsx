import React from 'react';
import { Inter } from 'next/font/google';
import i18n from '../../lib/utils/i18next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EHB Technologies - Master Roadmap',
  description:
    'Comprehensive roadmap for EHB Technologies Limited, showcasing our vision, departments, tech stack, and development phases.',
  keywords: [
    'EHB Technologies',
    'roadmap',
    'development phases',
    'tech stack',
    'departments',
    'vision',
    'strategy',
  ],
  authors: [{ name: 'EHB Technologies Limited' }],
  creator: 'EHB Technologies Limited',
  publisher: 'EHB Technologies Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ehbtechnologies.com'),
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title: 'EHB Technologies - Master Roadmap',
    description:
      'Comprehensive roadmap for EHB Technologies Limited, showcasing our vision, departments, tech stack, and development phases.',
    url: 'https://ehbtechnologies.com/roadmap',
    siteName: 'EHB Technologies',
    images: [
      {
        url: '/images/roadmap-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EHB Technologies Roadmap',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EHB Technologies - Master Roadmap',
    description:
      'Comprehensive roadmap for EHB Technologies Limited, showcasing our vision, departments, tech stack, and development phases.',
    images: ['/images/roadmap-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>{children}</div>
  );
}
