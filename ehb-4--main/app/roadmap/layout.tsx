import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EHB Technologies - Master Roadmap',
  description: 'Comprehensive roadmap for EHB Technologies Limited, showcasing our vision, departments, tech stack, and development phases.',
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 