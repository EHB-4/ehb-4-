'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Heart,
  Eye,
  Share2,
  Download,
  Play,
  Pause,
  Settings,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Grid3X3,
  List,
  Filter as FilterIcon,
  X,
  Plus,
  Minus,
  Brain,
  Code,
  Shield,
  MessageSquare,
  Database,
  Calendar,
  Target,
  Award,
  Zap,
  Lightbulb,
  Rocket,
  Globe,
  Smartphone,
  Monitor,
  Server,
  Network,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Bitcoin,
  Ethereum,
  DollarSign as DollarSignIcon,
  Euro,
  PoundSterling,
  Yen,
  Rupee,
  Won,
  Ruble,
  Lira,
  Real,
  Peso,
  Franc,
  Krona,
  Forint,
  Zloty,
  Koruna,
  Leu,
  Lev,
  Hryvnia,
  Tenge,
  Som,
  Tugrik,
  Kyat,
  Kip,
  Dong,
  Baht,
  Ringgit,
  SingaporeDollar,
  HongKongDollar,
  TaiwanDollar,
  NewZealandDollar,
  AustralianDollar,
  CanadianDollar,
  SwissFranc,
  NorwegianKrone,
  SwedishKrona,
  DanishKrone,
  IcelandicKrona,
  PolishZloty,
  CzechKoruna,
  HungarianForint,
  RomanianLeu,
  BulgarianLev,
  CroatianKuna,
  SerbianDinar,
  BosnianMark,
  AlbanianLek,
  MacedonianDenar,
  MontenegrinEuro,
  KosovoEuro,
  MoldovanLeu,
  UkrainianHryvnia,
  BelarusianRuble,
  GeorgianLari,
  ArmenianDram,
  AzerbaijaniManat,
  KazakhstaniTenge,
  KyrgyzstaniSom,
  TajikistaniSomoni,
  TurkmenistaniManat,
  UzbekistaniSom,
  AfghanAfghani,
  PakistaniRupee,
  IndianRupee,
  BangladeshiTaka,
  SriLankanRupee,
  NepaleseRupee,
  BhutaneseNgultrum,
  MaldivianRufiyaa,
  BurmeseKyat,
  CambodianRiel,
  LaoKip,
  VietnameseDong,
  ThaiBaht,
  MalaysianRinggit,
  SingaporeDollar as SingaporeDollarIcon,
  HongKongDollar as HongKongDollarIcon,
  TaiwanDollar as TaiwanDollarIcon,
  NewZealandDollar as NewZealandDollarIcon,
  AustralianDollar as AustralianDollarIcon,
  CanadianDollar as CanadianDollarIcon,
  SwissFranc as SwissFrancIcon,
  NorwegianKrone as NorwegianKroneIcon,
  SwedishKrona as SwedishKronaIcon,
  DanishKrone as DanishKroneIcon,
  IcelandicKrona as IcelandicKronaIcon,
  PolishZloty as PolishZlotyIcon,
  CzechKoruna as CzechKorunaIcon,
  HungarianForint as HungarianForintIcon,
  RomanianLeu as RomanianLeuIcon,
  BulgarianLev as BulgarianLevIcon,
  CroatianKuna as CroatianKunaIcon,
  SerbianDinar as SerbianDinarIcon,
  BosnianMark as BosnianMarkIcon,
  AlbanianLek as AlbanianLekIcon,
  MacedonianDenar as MacedonianDenarIcon,
  MontenegrinEuro as MontenegrinEuroIcon,
  KosovoEuro as KosovoEuroIcon,
  MoldovanLeu as MoldovanLeuIcon,
  UkrainianHryvnia as UkrainianHryvniaIcon,
  BelarusianRuble as BelarusianRubleIcon,
  GeorgianLari as GeorgianLariIcon,
  ArmenianDram as ArmenianDramIcon,
  AzerbaijaniManat as AzerbaijaniManatIcon,
  KazakhstaniTenge as KazakhstaniTengeIcon,
  KyrgyzstaniSom as KyrgyzstaniSomIcon,
  TajikistaniSomoni as TajikistaniSomoniIcon,
  TurkmenistaniManat as TurkmenistaniManatIcon,
  UzbekistaniSom as UzbekistaniSomIcon,
  AfghanAfghani as AfghanAfghaniIcon,
  PakistaniRupee as PakistaniRupeeIcon,
  IndianRupee as IndianRupeeIcon,
  BangladeshiTaka as BangladeshiTakaIcon,
  SriLankanRupee as SriLankanRupeeIcon,
  NepaleseRupee as NepaleseRupeeIcon,
  BhutaneseNgultrum as BhutaneseNgultrumIcon,
  MaldivianRufiyaa as MaldivianRufiyaaIcon,
  BurmeseKyat as BurmeseKyatIcon,
  CambodianRiel as CambodianRielIcon,
  LaoKip as LaoKipIcon,
  VietnameseDong as VietnameseDongIcon,
  ThaiBaht as ThaiBahtIcon,
  MalaysianRinggit as MalaysianRinggitIcon,
} from 'lucide-react';
import Link from 'next/link';

/**
 * AI Marketplace - Discover, purchase, and integrate AI agents and services
 * @returns {JSX.Element} The AI marketplace component
 */
export default function AIMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock AI marketplace data
  const aiProducts = [
    {
      id: 1,
      name: 'Advanced Sentiment Analysis Agent',
      category: 'nlp',
      price: 299.99,
      priceType: 'one-time',
      rating: 4.8,
      reviews: 1247,
      downloads: 15420,
      creator: 'AI Labs Pro',
      creatorVerified: true,
      description:
        'Advanced sentiment analysis with multi-language support and real-time processing',
      features: [
        'Multi-language Support',
        'Real-time Processing',
        'API Integration',
        'Custom Models',
      ],
      tags: ['NLP', 'Sentiment Analysis', 'Multi-language', 'API'],
      image: '/api/placeholder/300/200',
      trending: true,
      featured: true,
      free: false,
      trial: true,
      lastUpdated: '2024-01-15',
      version: '2.1.0',
      compatibility: ['Node.js', 'Python', 'React'],
      documentation: true,
      support: '24/7',
    },
    {
      id: 2,
      name: 'Image Recognition Pro',
      category: 'computer-vision',
      price: 199.99,
      priceType: 'subscription',
      rating: 4.6,
      reviews: 892,
      downloads: 8920,
      creator: 'VisionTech AI',
      creatorVerified: true,
      description: 'State-of-the-art image recognition with object detection and classification',
      features: ['Object Detection', 'Image Classification', 'Face Recognition', 'Custom Training'],
      tags: ['Computer Vision', 'Image Recognition', 'Object Detection', 'AI'],
      image: '/api/placeholder/300/200',
      trending: false,
      featured: true,
      free: false,
      trial: true,
      lastUpdated: '2024-01-10',
      version: '1.8.2',
      compatibility: ['Python', 'TensorFlow', 'PyTorch'],
      documentation: true,
      support: 'Business Hours',
    },
    {
      id: 3,
      name: 'Chatbot Framework',
      category: 'conversational',
      price: 0,
      priceType: 'free',
      rating: 4.4,
      reviews: 2341,
      downloads: 45670,
      creator: 'OpenAI Community',
      creatorVerified: false,
      description: 'Open-source chatbot framework with natural language processing capabilities',
      features: ['Natural Language Processing', 'Multi-platform', 'Customizable', 'Open Source'],
      tags: ['Chatbot', 'NLP', 'Open Source', 'Free'],
      image: '/api/placeholder/300/200',
      trending: true,
      featured: false,
      free: true,
      trial: false,
      lastUpdated: '2024-01-08',
      version: '3.0.1',
      compatibility: ['JavaScript', 'Python', 'Java'],
      documentation: true,
      support: 'Community',
    },
    {
      id: 4,
      name: 'Predictive Analytics Suite',
      category: 'analytics',
      price: 599.99,
      priceType: 'one-time',
      rating: 4.9,
      reviews: 567,
      downloads: 3450,
      creator: 'DataScience Corp',
      creatorVerified: true,
      description: 'Comprehensive predictive analytics with machine learning algorithms',
      features: ['Machine Learning', 'Data Visualization', 'Forecasting', 'Custom Models'],
      tags: ['Analytics', 'Machine Learning', 'Predictive', 'Data Science'],
      image: '/api/placeholder/300/200',
      trending: false,
      featured: true,
      free: false,
      trial: true,
      lastUpdated: '2024-01-12',
      version: '4.2.0',
      compatibility: ['Python', 'R', 'Julia'],
      documentation: true,
      support: '24/7',
    },
    {
      id: 5,
      name: 'Voice Recognition Agent',
      category: 'speech',
      price: 149.99,
      priceType: 'subscription',
      rating: 4.5,
      reviews: 1234,
      downloads: 7890,
      creator: 'VoiceTech Solutions',
      creatorVerified: true,
      description: 'Advanced voice recognition with speaker identification and transcription',
      features: ['Voice Recognition', 'Speaker ID', 'Transcription', 'Multi-language'],
      tags: ['Speech Recognition', 'Voice', 'Transcription', 'AI'],
      image: '/api/placeholder/300/200',
      trending: true,
      featured: false,
      free: false,
      trial: true,
      lastUpdated: '2024-01-05',
      version: '2.0.3',
      compatibility: ['Python', 'JavaScript', 'C++'],
      documentation: true,
      support: 'Business Hours',
    },
    {
      id: 6,
      name: 'Recommendation Engine',
      category: 'recommendation',
      price: 399.99,
      priceType: 'one-time',
      rating: 4.7,
      reviews: 756,
      downloads: 5670,
      creator: 'RecSys AI',
      creatorVerified: true,
      description: 'Intelligent recommendation system with collaborative filtering',
      features: ['Collaborative Filtering', 'Content-based', 'Hybrid', 'Real-time'],
      tags: ['Recommendation', 'Machine Learning', 'Personalization', 'AI'],
      image: '/api/placeholder/300/200',
      trending: false,
      featured: false,
      free: false,
      trial: true,
      lastUpdated: '2024-01-03',
      version: '1.6.4',
      compatibility: ['Python', 'Java', 'Scala'],
      documentation: true,
      support: 'Email Support',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: aiProducts.length },
    {
      id: 'nlp',
      name: 'Natural Language Processing',
      count: aiProducts.filter(p => p.category === 'nlp').length,
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      count: aiProducts.filter(p => p.category === 'computer-vision').length,
    },
    {
      id: 'conversational',
      name: 'Conversational AI',
      count: aiProducts.filter(p => p.category === 'conversational').length,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      count: aiProducts.filter(p => p.category === 'analytics').length,
    },
    {
      id: 'speech',
      name: 'Speech Recognition',
      count: aiProducts.filter(p => p.category === 'speech').length,
    },
    {
      id: 'recommendation',
      name: 'Recommendation Systems',
      count: aiProducts.filter(p => p.category === 'recommendation').length,
    },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices', count: aiProducts.length },
    { id: 'free', name: 'Free', count: aiProducts.filter(p => p.free).length },
    {
      id: 'under-100',
      name: 'Under $100',
      count: aiProducts.filter(p => !p.free && p.price < 100).length,
    },
    {
      id: '100-500',
      name: '$100 - $500',
      count: aiProducts.filter(p => !p.free && p.price >= 100 && p.price <= 500).length,
    },
    {
      id: 'over-500',
      name: 'Over $500',
      count: aiProducts.filter(p => !p.free && p.price > 500).length,
    },
  ];

  const stats = [
    { label: 'AI Products', value: '1,247', icon: Brain },
    { label: 'Active Creators', value: '456', icon: Users },
    { label: 'Total Downloads', value: '89.2K', icon: Download },
    { label: 'Avg Rating', value: '4.6', icon: Star },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = aiProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price
    if (selectedPrice !== 'all') {
      switch (selectedPrice) {
        case 'free':
          filtered = filtered.filter(product => product.free);
          break;
        case 'under-100':
          filtered = filtered.filter(product => !product.free && product.price < 100);
          break;
        case '100-500':
          filtered = filtered.filter(
            product => !product.free && product.price >= 100 && product.price <= 500
          );
          break;
        case 'over-500':
          filtered = filtered.filter(product => !product.free && product.price > 500);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort(
          (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedPrice, sortBy]);

  const formatPrice = (price: number, priceType: string) => {
    if (price === 0) return 'Free';
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
    return priceType === 'subscription' ? `${formattedPrice}/month` : formattedPrice;
  };

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Marketplace</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Discover, purchase, and integrate cutting-edge AI agents and services
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/ai-agents">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Brain className="w-4 h-4" />
                    My Agents
                  </button>
                </Link>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI products, creators, or features..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    showFilters
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <FilterIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={e => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          value={range.id}
                          checked={selectedPrice === range.id}
                          onChange={e => setSelectedPrice(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {range.name} ({range.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Free Products Only
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Verified Creators
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Free Trial Available
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Products ({filteredProducts.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Brain className="w-4 h-4" />
                  <span>Premium AI Solutions</span>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                          <Brain className="w-12 h-12 text-gray-400" />
                        </div>
                        {product.trending && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}
                        {product.free && (
                          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Free
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Heart className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {product.category.replace('-', ' ')}
                          </span>
                          {product.creatorVerified && (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating and Downloads */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({product.reviews} reviews)
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            • {formatDownloads(product.downloads)} downloads
                          </span>
                        </div>

                        {/* Creator Info */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            by {product.creator}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            v{product.version}
                          </span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.features.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                              +{product.features.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {formatPrice(product.price, product.priceType)}
                            </span>
                            {product.trial && (
                              <span className="text-sm text-green-600 ml-2">Free Trial</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              <Download className="w-4 h-4" />
                              {product.free ? 'Download' : 'Get Now'}
                            </button>
                            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <div className="relative w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                            <Brain className="w-8 h-8 text-gray-400" />
                          </div>
                          {product.trending && (
                            <div className="absolute -top-1 -left-1 bg-orange-500 text-white px-1 py-0.5 rounded text-xs">
                              Hot
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price, product.priceType)}
                                </span>
                                {product.trial && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                    Free Trial
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  ({product.reviews})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <span>{product.creator}</span>
                                {product.creatorVerified && (
                                  <CheckCircle className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span>{formatDownloads(product.downloads)} downloads</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Updated {product.lastUpdated}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Download className="w-4 h-4" />
                                {product.free ? 'Download' : 'Get Now'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No AI products found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or filters to find AI products.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
