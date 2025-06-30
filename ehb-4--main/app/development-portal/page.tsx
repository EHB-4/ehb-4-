import React from 'react';
import Link from 'next/link';

const services = [
  {
    name: 'EHB Company Info',
    description: 'All information about EHB Technologies',
    url: '/ehb-company-info',
  },
  {
    name: 'GoSellr',
    description: 'E-commerce & services platform',
    url: '/gosellr',
  },
  {
    name: 'EDR',
    description: 'Education & Digital Resources',
    url: '/edr',
  },
  {
    name: 'EMO',
    description: 'Health & Medical Services',
    url: '/emo',
  },
  {
    name: 'JPS',
    description: 'Justice & Public Services',
    url: '/jps',
  },
  {
    name: 'PSS',
    description: 'Public Safety System',
    url: '/pss',
  },
  {
    name: 'Franchise',
    description: 'Franchise Management & Analytics',
    url: '/ehb-franchise',
  },
  {
    name: 'Wallet',
    description: 'Finance & Blockchain Integration',
    url: '/ehb-wallet',
  },
  {
    name: 'AI Assistant',
    description: 'Custom AI Assistant & Agents',
    url: '/ai',
  },
  {
    name: 'Dashboard',
    description: 'Unified System Dashboard',
    url: '/ehb-dashboard',
  },
  {
    name: 'Home Page',
    description: 'Landing & Information Page',
    url: '/ehb-home-page',
  },
  {
    name: 'Ads',
    description: 'Verified Advertisement Platform',
    url: '/ehb-ads',
  },
  {
    name: 'Tube',
    description: 'Verified Video Platform',
    url: '/ehb-tube',
  },
  {
    name: 'Profile',
    description: 'User Profile Management',
    url: '/profile',
  },
  {
    name: 'Signup/Login',
    description: 'User Authentication',
    url: '/signup',
  },
  {
    name: 'Assistant',
    description: 'AI Assistant Panel',
    url: '/assistant',
  },
  // Add more modules/services as needed
];

export default function DevelopmentPortalPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">EHB Development Portal</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link key={service.name} href={service.url} className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
              <span className="text-blue-600 font-medium mt-auto">Go to {service.name} &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 