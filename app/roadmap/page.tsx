'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext';
import {
  FaGlobe,
  FaBullseye,
  FaEye,
  FaHeart,
  FaCheckCircle,
  FaUsers,
  FaBalanceScale,
} from 'react-icons/fa';

// Language Switcher Component
const LanguageSwitcher = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <div className="relative inline-block text-left">
      <div className="group">
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaGlobe className="mr-2" />
          {language}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {availableLanguages.map(lang => (
              <a
                key={lang}
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setLanguage(lang);
                }}
                className={`block px-4 py-2 text-sm ${language === lang ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                role="menuitem"
              >
                {lang}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Roadmap Content Component
const RoadmapContent = () => {
  const { t } = useLanguage();
  const valueIcons = [FaCheckCircle, FaUsers, FaBalanceScale, FaUsers, FaHeart];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo-placeholder.svg" alt="EHB Logo" className="h-10 w-auto mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">EHB Company Roadmap</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 p-8 bg-white rounded-xl shadow-lg border-l-4 border-blue-500"
        >
          <div className="flex items-center mb-4">
            <FaBullseye className="text-4xl text-blue-500 mr-4" />
            <h2 className="text-4xl font-extrabold text-gray-900">{t.mission.title}</h2>
          </div>
          <p className="text-lg leading-relaxed">{t.mission.text}</p>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 p-8 bg-white rounded-xl shadow-lg border-l-4 border-purple-500"
        >
          <div className="flex items-center mb-4">
            <FaEye className="text-4xl text-purple-500 mr-4" />
            <h2 className="text-4xl font-extrabold text-gray-900">{t.vision.title}</h2>
          </div>
          <p className="text-lg leading-relaxed">{t.vision.text}</p>
        </motion.section>

        {/* Core Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            {t.coreValues.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.coreValues.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-start"
              >
                <div className="flex-shrink-0">
                  {React.createElement(valueIcons[index] || FaHeart, {
                    className: 'text-3xl text-green-500 mr-4 mt-1',
                  })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                  <p className="text-md">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

// Main Page Component that wraps content with the Provider
export default function RoadmapPage() {
  return (
    <LanguageProvider>
      <RoadmapContent />
    </LanguageProvider>
  );
}
