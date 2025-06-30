'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Play,
  Heart,
  Star,
  Eye,
  Share2,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Truck,
  CreditCard,
  ArrowRight,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Filter as FilterIcon,
  X,
  Plus,
  Minus,
  Video,
  Music,
  Gamepad2,
  BookOpen,
  Film,
  Tv,
  Radio,
  Mic,
  Camera,
  Headphones,
  Volume2,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Pause,
} from 'lucide-react';
import Link from 'next/link';

/**
 * EMO Entertainment Platform - Comprehensive entertainment system
 * @returns {JSX.Element} The EMO entertainment platform component
 */
export default function EMOPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Mock entertainment content data
  const content = [
    {
      id: 1,
      title: 'The Future of AI',
      type: 'video',
      category: 'technology',
      genre: 'documentary',
      duration: '45:32',
      rating: 4.8,
      views: 1250000,
      likes: 89000,
      creator: 'Tech Insights',
      creatorVerified: true,
      creatorFollowers: 2500000,
      thumbnail: '/api/placeholder/300/200',
      description:
        'Explore the latest developments in artificial intelligence and their impact on society',
      tags: ['AI', 'Technology', 'Future', 'Innovation'],
      trending: true,
      premium: false,
      releaseDate: '2024-01-15',
      language: 'English',
      subtitles: ['Spanish', 'French', 'German'],
    },
    {
      id: 2,
      title: 'Midnight Jazz Collection',
      type: 'music',
      category: 'music',
      genre: 'jazz',
      duration: '1:23:45',
      rating: 4.6,
      views: 890000,
      likes: 67000,
      creator: 'Jazz Masters',
      creatorVerified: true,
      creatorFollowers: 1800000,
      thumbnail: '/api/placeholder/300/200',
      description: 'Relaxing jazz melodies perfect for late-night listening',
      tags: ['Jazz', 'Relaxing', 'Night', 'Smooth'],
      trending: false,
      premium: true,
      releaseDate: '2024-01-10',
      language: 'Instrumental',
      subtitles: [],
    },
    {
      id: 3,
      title: 'Space Adventure VR',
      type: 'game',
      category: 'gaming',
      genre: 'adventure',
      duration: '2-4 hours',
      rating: 4.9,
      views: 2100000,
      likes: 156000,
      creator: 'VR Studios',
      creatorVerified: true,
      creatorFollowers: 3200000,
      thumbnail: '/api/placeholder/300/200',
      description: 'Immersive virtual reality space exploration game',
      tags: ['VR', 'Space', 'Adventure', 'Immersive'],
      trending: true,
      premium: true,
      releaseDate: '2024-01-12',
      language: 'English',
      subtitles: ['Spanish', 'Japanese'],
    },
    {
      id: 4,
      title: 'Cooking Masterclass',
      type: 'video',
      category: 'lifestyle',
      genre: 'cooking',
      duration: '32:15',
      rating: 4.7,
      views: 980000,
      likes: 72000,
      creator: 'Chef Maria',
      creatorVerified: true,
      creatorFollowers: 1500000,
      thumbnail: '/api/placeholder/300/200',
      description: 'Learn to cook authentic Italian pasta dishes from scratch',
      tags: ['Cooking', 'Italian', 'Pasta', 'Tutorial'],
      trending: false,
      premium: false,
      releaseDate: '2024-01-08',
      language: 'English',
      subtitles: ['Italian', 'Spanish'],
    },
    {
      id: 5,
      title: 'Mindful Meditation',
      type: 'audio',
      category: 'wellness',
      genre: 'meditation',
      duration: '28:45',
      rating: 4.5,
      views: 750000,
      likes: 54000,
      creator: 'Zen Master',
      creatorVerified: false,
      creatorFollowers: 890000,
      thumbnail: '/api/placeholder/300/200',
      description: 'Guided meditation for stress relief and mental clarity',
      tags: ['Meditation', 'Wellness', 'Stress Relief', 'Mindfulness'],
      trending: false,
      premium: false,
      releaseDate: '2024-01-05',
      language: 'English',
      subtitles: ['Spanish', 'French'],
    },
    {
      id: 6,
      title: 'Digital Art Workshop',
      type: 'video',
      category: 'education',
      genre: 'art',
      duration: '1:15:30',
      rating: 4.4,
      views: 650000,
      likes: 48000,
      creator: 'Art Academy',
      creatorVerified: true,
      creatorFollowers: 1200000,
      thumbnail: '/api/placeholder/300/200',
      description: 'Complete guide to digital painting and illustration',
      tags: ['Digital Art', 'Painting', 'Illustration', 'Tutorial'],
      trending: false,
      premium: true,
      releaseDate: '2024-01-03',
      language: 'English',
      subtitles: ['Spanish', 'Portuguese'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Video, count: content.length },
    {
      id: 'video',
      name: 'Videos',
      icon: Video,
      count: content.filter(c => c.type === 'video').length,
    },
    {
      id: 'music',
      name: 'Music',
      icon: Music,
      count: content.filter(c => c.type === 'music').length,
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: Gamepad2,
      count: content.filter(c => c.type === 'game').length,
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: Headphones,
      count: content.filter(c => c.type === 'audio').length,
    },
  ];

  const genres = [
    { id: 'all', name: 'All Genres', count: content.length },
    {
      id: 'documentary',
      name: 'Documentary',
      count: content.filter(c => c.genre === 'documentary').length,
    },
    { id: 'jazz', name: 'Jazz', count: content.filter(c => c.genre === 'jazz').length },
    {
      id: 'adventure',
      name: 'Adventure',
      count: content.filter(c => c.genre === 'adventure').length,
    },
    { id: 'cooking', name: 'Cooking', count: content.filter(c => c.genre === 'cooking').length },
    {
      id: 'meditation',
      name: 'Meditation',
      count: content.filter(c => c.genre === 'meditation').length,
    },
    { id: 'art', name: 'Art', count: content.filter(c => c.genre === 'art').length },
  ];

  const stats = [
    { label: 'Active Users', value: '2.5M', icon: Users },
    { label: 'Content Hours', value: '45.2K', icon: Clock },
    { label: 'Premium Subscribers', value: '890K', icon: Star },
    { label: 'Content Creators', value: '125K', icon: Camera },
  ];

  const filteredContent = useMemo(() => {
    let filtered = content;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.type === selectedCategory);
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(item => item.genre === selectedGenre);
    }

    // Sort content
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
        filtered.sort(
          (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedGenre, sortBy]);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'music':
        return Music;
      case 'game':
        return Gamepad2;
      case 'audio':
        return Headphones;
      default:
        return Video;
    }
  };

  const playContent = (item: any) => {
    setCurrentTrack(item);
    setIsPlaying(true);
    // In a real app, this would start playing the content
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  EMO Entertainment
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Discover, stream, and share amazing content across all entertainment categories
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/subscription">
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Star className="w-4 h-4" />
                    Premium
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
                  placeholder="Search content, creators, or genres..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="trending">Trending</option>
                  <option value="rating">Highest Rated</option>
                  <option value="views">Most Viewed</option>
                  <option value="newest">Newest First</option>
                  <option value="likes">Most Liked</option>
                </select>

                <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-purple-500 text-white'
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
                      ? 'bg-purple-500 text-white border-purple-500'
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

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{currentTrack.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentTrack.creator}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <SkipForward className="w-5 h-5" />
              </button>
              <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="w-1/3 h-full bg-purple-600 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">1:23 / 4:56</span>
            </div>
          </div>
        </div>
      )}

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
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <category.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Genres</h4>
                  <div className="space-y-2">
                    {genres.map(genre => (
                      <label key={genre.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="genre"
                          value={genre.id}
                          checked={selectedGenre === genre.id}
                          onChange={e => setSelectedGenre(e.target.value)}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {genre.name} ({genre.count})
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
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Trending Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Verified Creators
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Premium Content
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
                    <stat.icon className="w-8 h-8 text-purple-600" />
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

            {/* Content Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Content ({filteredContent.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Premium Entertainment</span>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredContent.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                    >
                      {/* Content Thumbnail */}
                      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center">
                          {(() => {
                            const Icon = getContentIcon(item.type);
                            return <Icon className="w-12 h-12 text-gray-400" />;
                          })()}
                        </div>
                        {item.trending && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                        {item.premium && (
                          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Premium
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => playContent(item)}
                            className="p-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <Play className="w-8 h-8" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          {formatDuration(item.duration)}
                        </div>
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Heart className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.category}
                          </span>
                          {item.creatorVerified && (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Rating and Views */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({formatViews(item.views)} views)
                          </span>
                        </div>

                        {/* Creator Info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">by</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.creator}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              ({formatViews(item.creatorFollowers)})
                            </span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playContent(item)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Play Now
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Language Info */}
                        {item.subtitles.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <span>Subtitles: {item.subtitles.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredContent.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                      <div className="flex items-center gap-6">
                        {/* Content Thumbnail */}
                        <div className="relative w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                            {(() => {
                              const Icon = getContentIcon(item.type);
                              return <Icon className="w-8 h-8 text-gray-400" />;
                            })()}
                          </div>
                          {item.trending && (
                            <div className="absolute -top-1 -left-1 bg-orange-500 text-white px-1 py-0.5 rounded text-xs">
                              Hot
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => playContent(item)}
                              className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Content Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {formatDuration(item.duration)}
                                </span>
                                {item.premium && (
                                  <span className="px-2 py-1 bg-purple-500 text-white rounded text-xs">
                                    Premium
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{item.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  ({formatViews(item.views)})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{item.creator}</span>
                                {item.creatorVerified && (
                                  <CheckCircle className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{formatViews(item.views)} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{formatViews(item.likes)} likes</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => playContent(item)}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                              >
                                <Play className="w-4 h-4" />
                                Play
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
              {filteredContent.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No content found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or filters to find entertainment content.
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
