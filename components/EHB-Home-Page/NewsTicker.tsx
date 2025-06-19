'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiBell, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
}

const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'EHB launches new AI-powered marketplace',
    category: 'Announcement',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    title: 'GoSellr platform reaches 10,000+ sellers',
    category: 'Milestone',
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    title: 'New franchise opportunities available',
    category: 'Business',
    timestamp: '6 hours ago',
  },
  {
    id: '4',
    title: 'EHB Tube creators earn $1M+ in Q1',
    category: 'Success',
    timestamp: '8 hours ago',
  },
];

export default function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mockNewsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextNews = () => {
    setCurrentIndex(prev => (prev + 1) % mockNewsItems.length);
  };

  const prevNews = () => {
    setCurrentIndex(prev => (prev - 1 + mockNewsItems.length) % mockNewsItems.length);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiBell className="w-4 h-4" />
            <span className="text-sm font-medium">Latest News:</span>
          </div>

          <div className="flex-1 mx-4 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <span className="text-sm">{mockNewsItems[currentIndex].title}</span>
                <span className="text-xs opacity-75">
                  • {mockNewsItems[currentIndex].timestamp}
                </span>
                <span className="px-2 py-1 text-xs bg-white bg-opacity-20 rounded-full">
                  {mockNewsItems[currentIndex].category}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevNews}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Previous news"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextNews}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Next news"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
