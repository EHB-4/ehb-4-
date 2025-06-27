'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: number;
  downloads: string;
  price: string;
  featured: boolean;
  category: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'EHB AI Assistant',
    subtitle: 'Your Personal AI Companion',
    description:
      'Experience the future of productivity with our advanced AI assistant. Get instant help, automate tasks, and boost your efficiency.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    rating: 4.9,
    downloads: '50K+',
    price: 'Free',
    featured: true,
    category: 'Productivity',
  },
  {
    id: 2,
    title: 'EHB Wallet',
    subtitle: 'Secure Digital Finance',
    description:
      'Manage your digital assets securely with our advanced wallet. Support for multiple cryptocurrencies and seamless transactions.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    rating: 4.8,
    downloads: '25K+',
    price: 'Free',
    featured: true,
    category: 'Finance',
  },
  {
    id: 3,
    title: 'EHB Marketplace',
    subtitle: 'Digital Commerce Hub',
    description:
      'Discover, buy, and sell digital products in our comprehensive marketplace. From apps to digital art, find everything you need.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    rating: 4.7,
    downloads: '35K+',
    price: 'Free',
    featured: true,
    category: 'Shopping',
  },
  {
    id: 4,
    title: 'EHB Analytics',
    subtitle: 'Data-Driven Insights',
    description:
      'Transform your data into actionable insights with our powerful analytics platform. Visualize trends and make informed decisions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    rating: 4.6,
    downloads: '15K+',
    price: '$9.99',
    featured: true,
    category: 'Business',
  },
];

export default function HeroSlider() {
  return (
    <section className="relative mb-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-swiper"
      >
        {heroSlides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-2xl px-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <span>🔥</span>
                      <span>{slide.category}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl font-bold mb-4 leading-tight">{slide.title}</h1>

                    {/* Subtitle */}
                    <h2 className="text-2xl font-semibold mb-3 text-blue-200">{slide.subtitle}</h2>

                    {/* Description */}
                    <p className="text-lg mb-6 text-gray-200 leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 mb-8">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{slide.rating}</span>
                      </div>
                      <div className="text-gray-300">{slide.downloads} downloads</div>
                      <div className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {slide.price}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                      >
                        <Play className="h-5 w-5" />
                        <span>Get Started</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="swiper-button-prev !text-white !bg-black/20 !w-12 !h-12 !rounded-full backdrop-blur-sm"></div>
        <div className="swiper-button-next !text-white !bg-black/20 !w-12 !h-12 !rounded-full backdrop-blur-sm"></div>

        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-6"></div>
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #3b82f6;
        }
        .hero-swiper .swiper-button-prev:after,
        .hero-swiper .swiper-button-next:after {
          font-size: 18px;
        }
      `}</style>
    </section>
  );
}
