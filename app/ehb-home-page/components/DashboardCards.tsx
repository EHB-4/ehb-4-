"use client";

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowRight,
  BarChart3,
  PieChart,
  Target,
  Award,
  Clock,
  ShoppingCart,
  Shield,
  BookOpen,
  Briefcase,
  Wallet,
  Star,
  MapPin,
  Globe,
} from 'lucide-react';

interface DashboardCardsProps {
  userRole: 'visitor' | 'user' | 'seller' | 'franchise';
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
}

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
  trend?: 'up' | 'down' | 'stable';
  onClick?: () => void;
  className?: string;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100/60 dark:bg-blue-900/60',
    icon: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-200 dark:border-blue-800',
  },
  green: {
    bg: 'bg-green-100/60 dark:bg-green-900/60',
    icon: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-200 dark:border-green-800',
  },
  purple: {
    bg: 'bg-purple-100/60 dark:bg-purple-900/60',
    icon: 'bg-purple-600',
    text: 'text-purple-600',
    border: 'border-purple-200 dark:border-purple-800',
  },
  orange: {
    bg: 'bg-orange-100/60 dark:bg-orange-900/60',
    icon: 'bg-orange-600',
    text: 'text-orange-600',
    border: 'border-orange-200 dark:border-orange-800',
  },
  red: {
    bg: 'bg-red-100/60 dark:bg-red-900/60',
    icon: 'bg-red-600',
    text: 'text-red-600',
    border: 'border-red-200 dark:border-red-800',
  },
  indigo: {
    bg: 'bg-indigo-100/60 dark:bg-indigo-900/60',
    icon: 'bg-indigo-600',
    text: 'text-indigo-600',
    border: 'border-indigo-200 dark:border-indigo-800',
  },
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  trend = 'stable',
  onClick,
  className = '',
}) => {
  const colors = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`relative p-4 rounded-3xl border ${colors.border} ${colors.bg} cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-xl ${className}`}
      tabIndex={0}
      aria-label={title}
    >
      {/* Glassmorphic Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-current to-transparent" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.icon} shadow-lg`}>{icon}</div>
          {trend !== 'stable' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`p-1 rounded-full ${
                trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              <TrendingUp className={`h-4 w-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            </motion.div>
          )}
        </div>
        {/* Content */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">
              {value}
            </span>
            {change && (
              <span
                className={`text-sm font-semibold ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? '+' : ''}
                {change.value}%
              </span>
            )}
          </div>
          {change && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs last {change.period}</p>
          )}
        </div>
        {/* Action Indicator */}
        {onClick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 right-4"
          >
            <ArrowRight className={`h-4 w-4 ${colors.text}`} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const DashboardCards: React.FC<DashboardCardsProps> = ({ userRole, sqlLevel }) => {
  // Role-based dashboard cards
  const getVisitorCards = () => [
    {
      title: 'Total Services',
      value: '150+',
      icon: <Globe className="h-5 w-5" />,
      color: 'blue' as const,
      trend: 'up' as const,
    },
    {
      title: 'Active Users',
      value: '45K+',
      icon: <Users className="h-5 w-5" />,
      color: 'green' as const,
      trend: 'up' as const,
    },
    {
      title: 'Franchise Locations',
      value: '500+',
      icon: <MapPin className="h-5 w-5" />,
      color: 'purple' as const,
      trend: 'up' as const,
    },
    {
      title: 'Trust Score',
      value: '98%',
      icon: <Star className="h-5 w-5" />,
      color: 'orange' as const,
      trend: 'stable' as const,
    },
  ];

  const getUserCards = () => [
    {
      title: 'My Services',
      value: '12',
      icon: <ShoppingCart className="h-5 w-5" />,
      color: 'blue' as const,
      trend: 'up' as const,
    },
    {
      title: 'SQL Level',
      value: sqlLevel,
      icon: <Award className="h-5 w-5" />,
      color: 'purple' as const,
      trend: 'stable' as const,
    },
    {
      title: 'Wallet Balance',
      value: '$1,250',
      icon: <Wallet className="h-5 w-5" />,
      color: 'green' as const,
      trend: 'up' as const,
    },
    {
      title: 'Active Orders',
      value: '3',
      icon: <Clock className="h-5 w-5" />,
      color: 'orange' as const,
      trend: 'stable' as const,
    },
  ];

  const getSellerCards = () => [
    {
      title: 'Total Sales',
      value: '$12,450',
      change: { value: 15.2, isPositive: true, period: 'month' },
      icon: <DollarSign className="h-5 w-5" />,
      color: 'green' as const,
      trend: 'up' as const,
    },
    {
      title: 'Products Listed',
      value: '45',
      icon: <ShoppingCart className="h-5 w-5" />,
      color: 'blue' as const,
      trend: 'up' as const,
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      icon: <Star className="h-5 w-5" />,
      color: 'orange' as const,
      trend: 'stable' as const,
    },
    {
      title: 'Pending Orders',
      value: '7',
      icon: <Clock className="h-5 w-5" />,
      color: 'purple' as const,
      trend: 'down' as const,
    },
  ];

  const getFranchiseCards = () => [
    {
      title: 'Total Revenue',
      value: '$120K',
      change: { value: 8.5, isPositive: true, period: 'quarter' },
      icon: <DollarSign className="h-5 w-5" />,
      color: 'green' as const,
      trend: 'up' as const,
    },
    {
      title: 'Locations',
      value: '25',
      icon: <MapPin className="h-5 w-5" />,
      color: 'blue' as const,
      trend: 'up' as const,
    },
    {
      title: 'Staff',
      value: '120',
      icon: <Users className="h-5 w-5" />,
      color: 'purple' as const,
      trend: 'stable' as const,
    },
    {
      title: 'Trust Score',
      value: '99%',
      icon: <Star className="h-5 w-5" />,
      color: 'orange' as const,
      trend: 'up' as const,
    },
  ];

  const getCards = () => {
    switch (userRole) {
      case 'visitor':
        return getVisitorCards();
      case 'user':
        return getUserCards();
      case 'seller':
        return getSellerCards();
      case 'franchise':
        return getFranchiseCards();
      default:
        return getVisitorCards();
    }
  };

  const cards = getCards();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <DashboardCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          color={card.color}
          trend={card.trend}
          onClick={() => console.log(`Clicked ${card.title}`)}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
