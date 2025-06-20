'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaHome,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaShieldAlt,
  FaLightbulb,
  FaCog,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaPlay,
} from 'react-icons/fa';
import { HeroSection } from '@/components/EHB-Home-Page/HeroSection';
import { ServiceCarousel } from '@/components/EHB-Home-Page/ServiceCarousel';

// --- Dummy Data ---
const allServices = [
  {
    id: '1',
    title: 'GoSellr Marketplace',
    category: 'E-commerce',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&q=80',
    link: '/gosellr',
  },
  {
    id: '2',
    title: 'EDR Health Directory',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
    link: '/edr',
  },
  {
    id: '3',
    title: 'EHB Digital Wallet',
    category: 'Finance',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=500&q=80',
    link: '/wallet',
  },
  {
    id: '4',
    title: 'AI-Powered Assistant',
    category: 'Artificial Intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-2858200e9483?w=500&q=80',
    link: '/ai',
  },
  {
    id: '5',
    title: 'Job Portal (JPS)',
    category: 'Careers',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80',
    link: '/jps',
  },
  {
    id: '6',
    title: 'Franchise Management',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
    link: '/franchise',
  },
  {
    id: '7',
    title: 'EHB Tube',
    category: 'Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80',
    link: '/ehb-tube',
  },
  {
    id: '8',
    title: 'AI Marketplace',
    category: 'AI Tools',
    imageUrl: 'https://images.unsplash.com/photo-1674027326253-9a4f416f4d5e?w=500&q=80',
    link: '/ai-marketplace',
  },
];

export default function EhbHomePage() {
  const featuredServices = allServices.slice(0, 8);
  const topCategories = [
    allServices[1],
    allServices[2],
    allServices[0],
    allServices[4],
    allServices[6],
  ];
  const newReleases = allServices.slice(5, 8).reverse();

  const features = [
    {
      icon: FaRocket,
      title: 'Fast & Reliable',
      description: 'Lightning-fast performance with 99.9% uptime guarantee',
      color: 'text-blue-600',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Safe',
      description: 'Enterprise-grade security with end-to-end encryption',
      color: 'text-green-600',
    },
    {
      icon: FaUsers,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for the best user experience',
      color: 'text-purple-600',
    },
    {
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Available worldwide with multi-language support',
      color: 'text-orange-600',
    },
  ];

  const services = [
    {
      title: 'EHB AI Assistant',
      description: 'Intelligent AI-powered assistant for all your needs',
      icon: FaLightbulb,
      href: '/ai',
      color: 'bg-gradient-to-r from-blue-500 to-purple-600',
    },
    {
      title: 'Development Portal',
      description: 'Professional software development services',
      icon: FaCog,
      href: '/development-portal',
      color: 'bg-gradient-to-r from-green-500 to-blue-600',
    },
    {
      title: 'EHB Wallet',
      description: 'Secure digital wallet for all your transactions',
      icon: FaHeart,
      href: '/wallet',
      color: 'bg-gradient-to-r from-purple-500 to-pink-600',
    },
    {
      title: 'EHB Marketplace',
      description: 'Comprehensive marketplace for all your needs',
      icon: FaStar,
      href: '/marketplace',
      color: 'bg-gradient-to-r from-orange-500 to-red-600',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: FaUsers },
    { label: 'Countries', value: '50+', icon: FaGlobe },
    { label: 'Success Rate', value: '99%', icon: FaChartLine },
    { label: 'Happy Customers', value: '5K+', icon: FaHeart },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        <div className="space-y-12 mt-12">
          <ServiceCarousel
            title="Featured Services"
            services={featuredServices}
            viewAllLink="/services"
          />
          <ServiceCarousel
            title="Top Categories"
            services={topCategories}
            viewAllLink="/services/categories"
          />
          <ServiceCarousel
            title="New & Updated"
            services={newReleases}
            viewAllLink="/services/new"
          />
        </div>
      </main>
    </div>
  );
}
