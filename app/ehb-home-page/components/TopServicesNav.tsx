import React from 'react';
import Link from 'next/link';

const services = [
  { icon: '🛒', name: 'GoSellr', route: '/gosellr', tooltip: 'Explore smart shopping' },
  {
    icon: '🤖',
    name: 'AI Marketplace',
    route: '/ehb-ai-marketplace',
    tooltip: 'AI-powered services',
  },
  { icon: '📢', name: 'EHB Ads', route: '/ehb-ads', tooltip: 'Verified ads platform' },
  { icon: '🎓', name: 'HPS', route: '/hps', tooltip: 'Human Performance Solution' },
  { icon: '💼', name: 'JPS', route: '/jps', tooltip: 'Job Providing Service' },
  { icon: '📚', name: 'OBS', route: '/obs', tooltip: 'Online Book Store' },
  { icon: '⚙️', name: 'SOT', route: '/sot', tooltip: 'Services of Technology' },
  { icon: '🧩', name: 'Franchise', route: '/franchise', tooltip: 'Franchise system' },
  { icon: '👥', name: 'Affiliate', route: '/affiliate', tooltip: 'Earn with referrals' },
  { icon: '🧠', name: 'AI Agent', route: '/ai-agent', tooltip: 'AI-powered agent' },
  { icon: '⚖️', name: 'OLS', route: '/ols', tooltip: 'Online Law Services' },
  { icon: '📺', name: 'EHB Tube', route: '/ehb-tube', tooltip: 'EHB video platform' },
];

const TopServicesNav: React.FC = () => (
  <nav className="w-full max-w-7xl mx-auto px-2 md:px-4 lg:px-8 mt-2 mb-6">
    <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-3 bg-white/90 dark:bg-[#18181b]/90 shadow-md rounded-2xl">
      {services.map(service => (
        <Link
          key={service.route}
          href={service.route}
          className="flex flex-col items-center min-w-[90px] px-3 py-2 bg-white dark:bg-[#23272f] rounded-xl shadow hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-200 hover:bg-[#f5f7fa] dark:hover:bg-[#23272f]/80 focus:outline-none focus:ring-2 focus:ring-[#2452FF]/40 group cursor-pointer"
          title={service.tooltip}
        >
          <span className="text-2xl mb-1">{service.icon}</span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-[#2452FF] text-center whitespace-nowrap">
            {service.name}
          </span>
        </Link>
      ))}
    </div>
  </nav>
);

export default TopServicesNav;
