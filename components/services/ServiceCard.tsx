'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Download, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

/**
 * Service Card Component - Modern card design for displaying services
 * @param {Object} props - Component props
 * @param {string} props.id - Service ID
 * @param {string} props.name - Service name
 * @param {string} props.description - Service description
 * @param {string} props.category - Service category
 * @param {React.ComponentType} props.icon - Service icon component
 * @param {string} props.color - Service color theme
 * @param {number} props.rating - Service rating
 * @param {string} props.users - Number of users
 * @param {string} props.downloads - Number of downloads
 * @param {string} props.price - Service price tier
 * @param {boolean} props.featured - Whether service is featured
 * @param {string[]} props.tags - Service tags
 * @param {string} props.path - Service route path
 * @returns {JSX.Element} The service card component
 */
interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  rating: number;
  users: string;
  downloads: string;
  price: string;
  featured: boolean;
  tags: string[];
  path: string;
}

export default function ServiceCard({
  id,
  name,
  description,
  category,
  icon: Icon,
  color,
  rating,
  users,
  downloads,
  price,
  featured,
  tags,
  path,
}: ServiceCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link href={path}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Featured Badge */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Featured
            </div>
          </motion.div>
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
          <div className={`${color} w-full h-full`} />
        </div>

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`${color} w-12 h-12 rounded-lg flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${
                isLiked
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{category}</p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{users}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{downloads}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {price}
              </span>
            </div>
          </div>

          {/* Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-xl flex items-end justify-center pb-4"
          >
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold">
              <span>Explore Service</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* Corner Accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 ${color} opacity-10 rounded-bl-full`} />
      </motion.div>
    </Link>
  );
}

/**
 * Service Card Grid Component - Displays multiple service cards in a grid
 * @param {Object} props - Component props
 * @param {ServiceCardProps[]} props.services - Array of services
 * @param {string} props.layout - Grid layout ('grid' | 'list')
 * @returns {JSX.Element} The service card grid component
 */
interface ServiceCardGridProps {
  services: ServiceCardProps[];
  layout?: 'grid' | 'list';
}

export function ServiceCardGrid({ services, layout = 'grid' }: ServiceCardGridProps) {
  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
          >
            <Link href={service.path}>
              <div className="flex items-center space-x-6">
                <div
                  className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    {service.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{service.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{service.users}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{service.downloads}</span>
                    </div>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {service.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
