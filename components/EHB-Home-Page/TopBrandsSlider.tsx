'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

interface Brand {
  id: string;
  name: string;
  logo: string;
  rating: number;
  category: string;
  url: string;
}

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/80x40/3B82F6/FFFFFF?text=Tech',
    rating: 4.8,
    category: 'Technology',
    url: '/brands/techcorp',
  },
  {
    id: '2',
    name: 'FashionHub',
    logo: 'https://via.placeholder.com/80x40/EC4899/FFFFFF?text=Fashion',
    rating: 4.6,
    category: 'Fashion',
    url: '/brands/fashionhub',
  },
  {
    id: '3',
    name: 'HomeStyle',
    logo: 'https://via.placeholder.com/80x40/10B981/FFFFFF?text=Home',
    rating: 4.7,
    category: 'Home & Garden',
    url: '/brands/homestyle',
  },
  {
    id: '4',
    name: 'SportsPro',
    logo: 'https://via.placeholder.com/80x40/F59E0B/FFFFFF?text=Sports',
    rating: 4.9,
    category: 'Sports',
    url: '/brands/sportspro',
  },
  {
    id: '5',
    name: 'BeautyGlow',
    logo: 'https://via.placeholder.com/80x40/8B5CF6/FFFFFF?text=Beauty',
    rating: 4.5,
    category: 'Beauty',
    url: '/brands/beautyglow',
  },
];

export default function TopBrandsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.ceil(mockBrands.length / 3));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % Math.ceil(mockBrands.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + Math.ceil(mockBrands.length / 3)) % Math.ceil(mockBrands.length / 3)
    );
  };

  const getVisibleBrands = () => {
    const startIndex = currentIndex * 3;
    return mockBrands.slice(startIndex, startIndex + 3);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Brands</h2>
          <p className="text-gray-600">Discover trusted brands and quality products</p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous brands"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(mockBrands.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next brands"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {getVisibleBrands().map(brand => (
                  <Link
                    key={brand.id}
                    href={brand.url}
                    className="group block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-center">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="mx-auto mb-4 h-10 object-contain"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{brand.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{brand.category}</p>
                      <div className="flex items-center justify-center space-x-1">
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{brand.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
