'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Heart, Share2, Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ServiceCardProps {
  id: number;
  name: string;
  category: string;
  rating: number;
  downloads: string;
  price: string;
  image: string;
  featured?: boolean;
  description?: string;
  tags?: string[];
  onAddToWishlist?: (id: number) => void;
  onShare?: (id: number) => void;
  onView?: (id: number) => void;
}

export default function ServiceCard({
  id,
  name,
  category,
  rating,
  downloads,
  price,
  image,
  featured = false,
  description,
  tags = [],
  onAddToWishlist,
  onShare,
  onView,
}: ServiceCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  const handleView = () => {
    onView?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          ⭐ Featured
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleView}
              className="bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-lg"
              aria-label="View details"
            >
              <Play className="h-6 w-6 ml-1" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {category}
          </span>
          <span
            className={`text-sm font-semibold ${
              price === 'Free' ? 'text-green-600' : 'text-gray-800'
            }`}
          >
            {price}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* Description */}
        {description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-700">{rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Download className="h-4 w-4" />
              <span className="text-sm">{downloads}</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleView}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-colors"
          >
            <span>View</span>
            <ExternalLink className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
