'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'EHB Digital Universe',
      subtitle: 'Your Complete Digital Ecosystem',
      description:
        'From healthcare to finance, AI to e-commerce - everything you need in one platform',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
      cta: 'Explore Platform',
      link: '/services',
      color: 'from-blue-600 to-purple-600',
    },
    {
      title: 'AI-Powered Solutions',
      subtitle: 'Intelligent Technology',
      description: 'Advanced AI assistant and marketplace for modern businesses',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      cta: 'Try AI Assistant',
      link: '/ai',
      color: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Healthcare & Finance',
      subtitle: 'Complete Solutions',
      description: 'EDR Health Directory and EHB Digital Wallet for your needs',
      image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&q=80',
      cta: 'Learn More',
      link: '/edr',
      color: 'from-green-600 to-blue-600',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlideData = heroSlides[currentSlide];

  if (!currentSlideData) return null;

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
          <Image
            src={currentSlideData.image}
            alt={currentSlideData.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-4 font-medium">
              {currentSlideData.subtitle}
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              {currentSlideData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={currentSlideData.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${currentSlideData.color} text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {currentSlideData.cta}
                  <FaArrowRight />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <FaPlay />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
