'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  BarChart3,
  Globe,
  Target,
  Zap,
  Eye,
  Clock,
  Users,
  Activity,
  Settings,
  Download,
  RefreshCw,
  Filter,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image,
  Video,
  Music,
  File,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileSearch,
  FileEdit,
  FileCode,
  FileJson,
  FileArchive,
  FileAudio,
  FileVideo,
  FileImage,
  Database,
  Server,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudOff,
  CloudDrizzle,
  CloudFog,
  Sun,
  Moon,
  Star as StarIcon,
  Sunrise,
  Sunset,
  Thermometer,
  Droplets,
  Wind,
  Umbrella,
  Snowflake,
  Cloudy,
  Haze,
  Tornado,
  Comet,
  Asteroid,
  Planet,
  Galaxy,
  Universe,
  Telescope,
  Satellite,
  Rocket,
  SpaceShuttle,
  SpaceStation,
  Moon as MoonIcon,
  Mars,
  Venus,
  Mercury,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
  Sun as SunIcon,
  Star as StarIcon2,
  Constellation,
  Zodiac,
  Horoscope,
  Astrology,
  Astronomy,
  Physics,
  Chemistry,
  Biology,
  Mathematics,
  Geometry,
  Algebra,
  Calculus,
  Statistics,
  Probability,
  Logic,
  Philosophy,
  Psychology,
  Sociology,
  Anthropology,
  Archaeology,
  History,
  Geography,
  Geology,
  Meteorology,
  Oceanography,
  Ecology,
  Botany,
  Zoology,
  Microbiology,
  Genetics,
  Evolution,
  Medicine,
  Healthcare,
  Hospital,
  Doctor,
  Nurse,
  Patient,
  Ambulance,
  FirstAid,
  Bandage,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Heart as HeartIcon,
  Brain,
  Eye as EyeIcon,
  Ear,
  Nose,
  Mouth,
  Tooth,
  Bone,
  Muscle,
  Skin,
  Hair,
  Nail,
  Blood,
  Dna,
  Cell,
  Virus,
  Bacteria,
  Parasite,
  Vaccine,
  Antibiotic,
  Antiviral,
  Painkiller,
  Sedative,
  Stimulant,
  Depressant,
  Hallucinogen,
  Narcotic,
  Opioid,
  Cannabis,
  Alcohol,
  Tobacco,
  Caffeine,
  Sugar,
  Salt,
  Fat,
  Protein,
  Carbohydrate,
  Vitamin,
  Mineral,
  Fiber,
  Water,
  Oxygen,
  Carbon,
  Nitrogen,
  Hydrogen,
  Helium,
  Lithium,
  Beryllium,
  Boron,
  CarbonIcon,
  NitrogenIcon,
  OxygenIcon,
  Fluorine,
  Neon,
  Sodium,
  Magnesium,
  Aluminum,
  Silicon,
  Phosphorus,
  Sulfur,
  Chlorine,
  Argon,
  Potassium,
  Calcium,
  Scandium,
  Titanium,
  Vanadium,
  Chromium,
  Manganese,
  Iron,
  Cobalt,
  Nickel,
  Copper,
  Zinc,
  Gallium,
  Germanium,
  Arsenic,
  Selenium,
  Bromine,
  Krypton,
  Rubidium,
  Strontium,
  Yttrium,
  Zirconium,
  Niobium,
  Molybdenum,
  Technetium,
  Ruthenium,
  Rhodium,
  Palladium,
  Silver,
  Cadmium,
  Indium,
  Tin,
  Antimony,
  Tellurium,
  Iodine,
  Xenon,
  Cesium,
  Barium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum,
  Tungsten,
  Rhenium,
  Osmium,
  Iridium,
  Platinum,
  Gold,
  Mercury,
  Thallium,
  Lead,
  Bismuth,
  Polonium,
  Astatine,
  Radon,
  Francium,
  Radium,
  Actinium,
  Thorium,
  Protactinium,
  Uranium,
  Neptunium,
  Plutonium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson,
  Plus,
} from 'lucide-react';

// ========================================
// 1. SEO OPTIMIZATION SYSTEM
// ========================================

interface SEOMetrics {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  score: number;
  issues: string[];
  suggestions: string[];
  performance: {
    loadTime: number;
    lighthouse: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    };
  };
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgTimeOnPage: number;
    conversionRate: number;
  };
  social: {
    facebook: boolean;
    twitter: boolean;
    linkedin: boolean;
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
  };
}

interface StructuredData {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'Product' | 'Service';
  data: any;
}

export default function SEOOptimizer() {
  const [seoData, setSeoData] = useState<SEOMetrics>({
    title: 'EHB Platform - Comprehensive Business Solutions',
    description:
      'Discover the ultimate business platform with AI-powered tools, e-commerce solutions, healthcare systems, and more. Transform your business with EHB.',
    keywords: ['business platform', 'AI tools', 'e-commerce', 'healthcare', 'digital solutions'],
    url: 'https://ehb-platform.com',
    score: 85,
    issues: [
      'Meta description is too long (should be under 160 characters)',
      'Missing structured data for organization',
      'Image alt tags need optimization',
    ],
    suggestions: [
      'Add more relevant keywords',
      'Optimize page load speed',
      'Improve mobile responsiveness',
      'Add schema markup',
    ],
    performance: {
      loadTime: 2.3,
      lighthouse: {
        performance: 92,
        accessibility: 95,
        bestPractices: 88,
        seo: 85,
      },
    },
    analytics: {
      pageViews: 15420,
      uniqueVisitors: 8920,
      bounceRate: 23.4,
      avgTimeOnPage: 245,
      conversionRate: 8.7,
    },
    social: {
      facebook: true,
      twitter: true,
      linkedin: true,
      ogImage: '/og-image.jpg',
      ogTitle: 'EHB Platform - Business Solutions',
      ogDescription:
        'Transform your business with AI-powered tools and comprehensive digital solutions.',
    },
  });

  const [structuredData, setStructuredData] = useState<StructuredData[]>([
    {
      type: 'Organization',
      data: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'EHB Platform',
        url: 'https://ehb-platform.com',
        logo: 'https://ehb-platform.com/logo.png',
        description: 'Comprehensive business solutions platform',
        sameAs: [
          'https://facebook.com/ehbplatform',
          'https://twitter.com/ehbplatform',
          'https://linkedin.com/company/ehbplatform',
        ],
      },
    },
    {
      type: 'WebSite',
      data: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'EHB Platform',
        url: 'https://ehb-platform.com',
        description: 'Business solutions platform',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://ehb-platform.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    },
  ]);

  const [viewMode, setViewMode] = useState<'overview' | 'details' | 'analytics' | 'structured'>(
    'overview'
  );
  const [loading, setLoading] = useState(false);

  const generateStructuredData = () => {
    const newStructuredData: StructuredData = {
      type: 'WebPage',
      data: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoData.title,
        description: seoData.description,
        url: seoData.url,
        mainEntity: {
          '@type': 'Organization',
          name: 'EHB Platform',
        },
      },
    };
    setStructuredData(prev => [...prev, newStructuredData]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    if (score >= 70) return AlertTriangle;
    return AlertCircle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                SEO Optimizer
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor and optimize your website's search engine performance
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLoading(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                title="Refresh SEO Analysis"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Analysis
              </button>
            </div>
          </div>
        </motion.div>

        {/* SEO Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Overall Score */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  seoData.score
                )}`}
              >
                {seoData.score}/100
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">SEO Score</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Overall performance</p>
          </div>

          {/* Performance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                  seoData.performance.lighthouse.performance
                )}`}
              >
                {seoData.performance.lighthouse.performance}/100
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {seoData.performance.loadTime}s
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Load Time</p>
          </div>

          {/* Page Views */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {seoData.analytics.pageViews.toLocaleString()}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Page Views</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {seoData.analytics.conversionRate}%
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Conversion Rate</p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'details', label: 'Details', icon: Search },
              { key: 'analytics', label: 'Analytics', icon: TrendingUp },
              { key: 'structured', label: 'Structured Data', icon: FileCode },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setViewMode(key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === key
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Based on View Mode */}
        {viewMode === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Lighthouse Scores */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Lighthouse Scores
              </h3>
              <div className="space-y-4">
                {Object.entries(seoData.performance.lighthouse).map(([metric, score]) => (
                  <div key={metric} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-400">
                        {metric.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-slate-900 dark:text-white font-medium capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            score >= 90
                              ? 'bg-green-500'
                              : score >= 70
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-12 text-right">
                        {score}/100
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues & Suggestions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Issues & Suggestions
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                    Issues ({seoData.issues.length})
                  </h4>
                  <div className="space-y-2">
                    {seoData.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                    Suggestions ({seoData.suggestions.length})
                  </h4>
                  <div className="space-y-2">
                    {seoData.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Meta Information */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Meta Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={seoData.title}
                    onChange={e => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter page title"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {seoData.title.length}/60 characters (recommended: 50-60)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={seoData.description}
                    onChange={e => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter meta description"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {seoData.description.length}/160 characters (recommended: 150-160)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={seoData.keywords.join(', ')}
                    onChange={e =>
                      setSeoData(prev => ({
                        ...prev,
                        keywords: e.target.value.split(', ').filter(k => k.trim()),
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter keywords separated by commas"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {seoData.keywords.length} keywords (recommended: 3-5)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Social Media
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={seoData.social.ogTitle}
                    onChange={e =>
                      setSeoData(prev => ({
                        ...prev,
                        social: { ...prev.social, ogTitle: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter Open Graph title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Open Graph Description
                  </label>
                  <textarea
                    value={seoData.social.ogDescription}
                    onChange={e =>
                      setSeoData(prev => ({
                        ...prev,
                        social: { ...prev.social, ogDescription: e.target.value },
                      }))
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter Open Graph description"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Analytics Overview */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Analytics Overview
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Page Views</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {seoData.analytics.pageViews.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Unique Visitors</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {seoData.analytics.uniqueVisitors.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Bounce Rate</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {seoData.analytics.bounceRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Avg Time on Page</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {Math.floor(seoData.analytics.avgTimeOnPage / 60)}m{' '}
                    {seoData.analytics.avgTimeOnPage % 60}s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Conversion Rate</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {seoData.analytics.conversionRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Performance Metrics
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Load Time</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {seoData.performance.loadTime}s
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        seoData.performance.loadTime < 2
                          ? 'bg-green-500'
                          : seoData.performance.loadTime < 4
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(0, 100 - seoData.performance.loadTime * 20)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Core Web Vitals
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Good</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Mobile Friendly
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Yes</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'structured' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Structured Data */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Structured Data
                </h3>
                <button
                  onClick={generateStructuredData}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Schema
                </button>
              </div>

              <div className="space-y-4">
                {structuredData.map((schema, index) => (
                  <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                        {schema.type}
                      </h4>
                      <button className="text-red-500 hover:text-red-700">
                        <FileX className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded border overflow-x-auto">
                      {JSON.stringify(schema.data, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
