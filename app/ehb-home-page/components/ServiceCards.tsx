'use client';

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Heart, Share2, ExternalLink } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  rating: number;
  downloads: string;
  category: string;
  featured: boolean;
  path: string;
}

interface ServiceCardsProps {
  services: Service[];
  viewMode: 'grid' | 'list';
}

/**
 * Modern, glassmorphic service cards for EHB Home Page.
 */
const ServiceCards: React.FC<ServiceCardsProps> = ({ services, viewMode }) => {
  const [wishlistedItems, setWishlistedItems] = React.useState<number[]>([]);

  const handleWishlist = (id: number) => {
    setWishlistedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = (id: number) => {
    // Share functionality
    console.log('Share service:', id);
  };

  const handleView = (path: string) => {
    window.location.href = path;
  };

  const getSqlLevelColor = (level: string) => {
    switch (level) {
      case 'Free':
        return 'bg-gray-500';
      case 'Basic':
        return 'bg-green-500';
      case 'Normal':
        return 'bg-blue-500';
      case 'High':
        return 'bg-purple-500';
      case 'VIP':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSqlLevelText = (level: string) => {
    switch (level) {
      case 'Free':
        return 'Free';
      case 'Basic':
        return 'Basic';
      case 'Normal':
        return 'Normal';
      case 'High':
        return 'High';
      case 'VIP':
        return 'VIP';
      default:
        return 'Free';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.02 }}
            className="group bg-white/80 dark:bg-[#23272f]/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-xl border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center p-6">
              {/* Service Icon */}
              <div className={`${service.color} p-4 rounded-xl mr-6 shadow-lg`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              {/* Service Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#2452FF] transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${getSqlLevelColor(
                        service.sqlLevel
                      )} shadow`}
                    >
                      {getSqlLevelText(service.sqlLevel)}
                    </span>
                    {service.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {service.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Download className="h-4 w-4" />
                      <span className="text-sm">{service.downloads}</span>
                    </div>
                    <span className="text-sm text-[#2452FF] bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded-full font-medium">
                      {service.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWishlist(service.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shadow"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlistedItems.includes(service.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(service.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shadow"
                      aria-label="Share service"
                    >
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleView(service.path)}
                      className="bg-[#2452FF] hover:bg-[#8B3DFF] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-[#2452FF]/40"
                      aria-label="Visit service"
                    >
                      <span>Visit</span>
                      <ExternalLink className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="group relative bg-white/80 dark:bg-[#23272f]/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-xl border border-gray-100 dark:border-gray-800"
        >
          {/* Featured Badge */}
          {service.featured && (
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              ⭐ Featured
            </div>
          )}
          {/* SQL Level Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`text-xs px-2 py-1 rounded-full text-white ${getSqlLevelColor(
                service.sqlLevel
              )} shadow`}
            >
              {getSqlLevelText(service.sqlLevel)}
            </span>
          </div>
          {/* Service Icon Header */}
          <div className={`${service.color} p-8 text-center shadow-lg`}>
            <service.icon className="h-16 w-16 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white drop-shadow-lg">{service.name}</h3>
          </div>
          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {service.description}
            </p>
            {/* Category */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-[#2452FF] bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded-full">
                {service.category}
              </span>
            </div>
            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {service.rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Download className="h-4 w-4" />
                  <span className="text-sm">{service.downloads}</span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWishlist(service.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shadow"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlistedItems.includes(service.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare(service.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shadow"
                  aria-label="Share service"
                >
                  <Share2 className="h-4 w-4 text-gray-400" />
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleView(service.path)}
                className="bg-[#2452FF] hover:bg-[#8B3DFF] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-[#2452FF]/40"
                aria-label="Visit service"
              >
                <span>Visit</span>
                <ExternalLink className="h-3 w-3" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCards;
