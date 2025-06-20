'use client';

import { HeroSection } from '@/components/EHB-Home-Page/HeroSection';
import { ServicesGrid } from '@/components/EHB-Home-Page/ServicesGrid';
import { Stats } from '@/components/EHB-Home-Page/Stats';
import { Features } from '@/components/EHB-Home-Page/Features';
import { CTA } from '@/components/EHB-Home-Page/CTA';
import Footer from '@/components/EHB-Home-Page/Footer';

export default function EhbHomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <HeroSection />
      <ServicesGrid />
      <Stats />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
