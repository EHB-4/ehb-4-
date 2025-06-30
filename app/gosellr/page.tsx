'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ShoppingCart,
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
} from 'lucide-react';
import Link from 'next/link';

// ========================================
// 1. MAIN GOSELLR MARKETPLACE PAGE
// ========================================

export default function GoSellrMarketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    initializeGoSellr();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const initializeGoSellr = async () => {
    try {
      setLoading(true);

      // Load user data
      const userData = await loadUserData();
      setUser(userData);

      // Load products
      const productsData = await loadProducts();
      setProducts(productsData);

      // Load cart and wishlist
      const cartData = await loadCart();
      setCartItems(cartData.length);

      const wishlistData = await loadWishlist();
      setWishlistItems(wishlistData.length);
    } catch (error) {
      console.error('Error initializing GoSellr:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadUserData = async (): Promise<User> => {
    // Simulate API call
    return {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/api/placeholder/40/40',
      kycVerified: true,
      trustScore: 85,
      walletBalance: 1250.5,
      isSeller: false,
    };
  };

  const loadProducts = async (): Promise<Product[]> => {
    // Simulate API call with comprehensive product data
    return [
      {
        id: 'prod-1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 299.99,
        originalPrice: 399.99,
        currency: 'USD',
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'AudioTech',
        images: [
          '/api/placeholder/400/400?text=Headphones',
          '/api/placeholder/400/400?text=Headphones+2',
        ],
        rating: 4.8,
        reviewCount: 1247,
        seller: {
          id: 'seller-1',
          name: 'AudioTech Store',
          rating: 4.9,
          verified: true,
          location: 'New York, NY',
        },
        stock: 45,
        shipping: {
          free: true,
          cost: 0,
          estimatedDays: '2-3 days',
        },
        features: ['Noise Cancellation', 'Bluetooth 5.0', '30h Battery'],
        tags: ['wireless', 'premium', 'audio'],
        blockchain: {
          escrowEnabled: true,
          smartContract: '0x1234...5678',
          nftAvailable: false,
        },
        aiScore: {
          trustScore: 92,
          riskScore: 8,
          recommendationScore: 95,
        },
        trending: true,
      },
      {
        id: 'prod-2',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with health monitoring',
        price: 199.99,
        originalPrice: 249.99,
        currency: 'USD',
        category: 'Electronics',
        subcategory: 'Wearables',
        brand: 'FitTech',
        images: [
          '/api/placeholder/400/400?text=Smartwatch',
          '/api/placeholder/400/400?text=Smartwatch+2',
        ],
        rating: 4.6,
        reviewCount: 892,
        seller: {
          id: 'seller-2',
          name: 'FitTech Pro',
          rating: 4.7,
          verified: true,
          location: 'San Francisco, CA',
        },
        stock: 23,
        shipping: {
          free: false,
          cost: 9.99,
          estimatedDays: '3-5 days',
        },
        features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
        tags: ['fitness', 'smartwatch', 'health'],
        blockchain: {
          escrowEnabled: true,
          smartContract: '0x8765...4321',
          nftAvailable: true,
        },
        aiScore: {
          trustScore: 88,
          riskScore: 12,
          recommendationScore: 87,
        },
        trending: false,
      },
      {
        id: 'prod-3',
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable organic cotton t-shirt, eco-friendly',
        price: 29.99,
        originalPrice: 39.99,
        currency: 'USD',
        category: 'Clothing',
        subcategory: 'Men',
        brand: 'EcoWear',
        images: [
          '/api/placeholder/400/400?text=T-Shirt',
          '/api/placeholder/400/400?text=T-Shirt+2',
        ],
        rating: 4.4,
        reviewCount: 567,
        seller: {
          id: 'seller-3',
          name: 'EcoWear Boutique',
          rating: 4.5,
          verified: true,
          location: 'Portland, OR',
        },
        stock: 156,
        shipping: {
          free: true,
          cost: 0,
          estimatedDays: '1-2 days',
        },
        features: ['100% Organic Cotton', 'Fair Trade', 'Sustainable'],
        tags: ['organic', 'sustainable', 'cotton'],
        blockchain: {
          escrowEnabled: true,
          smartContract: '0xabcd...efgh',
          nftAvailable: false,
        },
        aiScore: {
          trustScore: 85,
          riskScore: 15,
          recommendationScore: 82,
        },
        trending: false,
      },
    ];
  };

  const loadCart = async (): Promise<CartItem[]> => {
    // Simulate loading cart from localStorage or API
    const savedCart = localStorage.getItem('gosellr-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const loadWishlist = async (): Promise<string[]> => {
    // Simulate loading wishlist from localStorage or API
    const savedWishlist = localStorage.getItem('gosellr-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  };

  // ========================================
  // 4. PRODUCT FILTERING AND SORTING
  // ========================================

  const filterAndSortProducts = () => {
    const filtered = products.filter(product => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Relevance sorting (AI-based)
        filtered.sort((a, b) => b.aiScore.recommendationScore - a.aiScore.recommendationScore);
    }

    setFilteredProducts(filtered);
  };

  // ========================================
  // 5. CART AND WISHLIST FUNCTIONS
  // ========================================

  const addToCart = (productId: string) => {
    const existingItem = products.find(product => product.id === productId);

    if (existingItem) {
      setCartItems(prev => prev + 1);
      // In a real app, this would add to cart state
    }

    // Save to localStorage
    localStorage.setItem('gosellr-cart', JSON.stringify(products.filter(p => p.id === productId)));

    // Show notification
    showNotification('Product added to cart!', 'success');
  };

  const toggleWishlist = (productId: string) => {
    const newWishlist = wishlistItems.includes(productId)
      ? wishlistItems.filter(id => id !== productId)
      : [...wishlistItems, productId];

    setWishlistItems(newWishlist);
    localStorage.setItem('gosellr-wishlist', JSON.stringify(newWishlist));

    showNotification(
      wishlistItems.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist',
      'info'
    );
  };

  // ========================================
  // 6. UTILITY FUNCTIONS
  // ========================================

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    // Implementation for showing notifications
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getCategories = () => {
    const categories = ['all', ...new Set(products.map(p => p.category))];
    return categories;
  };

  // ========================================
  // 7. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading GoSellr Marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">GoSellr</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Global e-commerce platform with verified sellers and secure transactions
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/cart">
                  <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <ShoppingCart className="w-6 h-6" />
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems}
                      </span>
                    )}
                  </button>
                </Link>
                <Link href="/wishlist">
                  <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <Heart className="w-6 h-6" />
                    {wishlistItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistItems}
                      </span>
                    )}
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
                  placeholder="Search products, sellers, or categories..."
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
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="reviews">Most Reviews</option>
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
                    {getCategories().map(category => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={e => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
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
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={e =>
                          setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={e =>
                          setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
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
                      Verified Sellers Only
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Fast Shipping</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
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

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Products ({filteredProducts.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Secure Shopping</span>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                          <Package className="w-16 h-16 text-gray-400" />
                        </div>
                        {product.trending && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            -{getDiscountPercentage(product.originalPrice, product.price)}%
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              wishlistItems.includes(product.id)
                                ? 'bg-red-500 text-white'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.category}
                          </span>
                          {product.seller.verified && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice, product.currency)}
                            </span>
                          )}
                        </div>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({product.reviewCount} reviews)
                          </span>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">by</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.seller.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {product.seller.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addToCart(product.id)}
                            disabled={!product.stock}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {product.stock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Shipping Info */}
                        {product.shipping.free && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                            <Truck className="w-3 h-3" />
                            <span>Free Shipping</span>
                          </div>
                        )}
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
                        <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
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
                                  {formatPrice(product.price, product.currency)}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.originalPrice, product.currency)}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  ({product.reviewCount})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>by {product.seller.name}</span>
                              {product.seller.verified && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>Verified</span>
                                </div>
                              )}
                              {product.shipping.free && (
                                <div className="flex items-center gap-1">
                                  <Truck className="w-4 h-4" />
                                  <span>Free Shipping</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleWishlist(product.id)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => addToCart(product.id)}
                                disabled={!product.stock}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                {product.stock ? 'Add to Cart' : 'Out of Stock'}
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
                    No products found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or filters to find what you're looking for.
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

// ========================================
// 8. COMPONENT DEFINITIONS
// ========================================

// Header Component
function GoSellrHeader({
  user,
  cartCount,
  onSearch,
  searchTerm,
}: {
  user: User | null;
  cartCount: number;
  onSearch: (term: string) => void;
  searchTerm: string;
}) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">GoSellr</div>
            <div className="ml-2 text-xs text-gray-500">Decentralized E-commerce</div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-700">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">Trust Score: {user.trustScore}</div>
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                </div>
                <button className="relative p-2 text-gray-400 hover:text-gray-600">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Product Card Component
function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  formatPrice,
}: {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
  formatPrice: (price: number, currency: string) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="aspect-w-1 aspect-h-1 relative">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className="w-5 h-5" />
        </button>
        {product.blockchain.escrowEnabled && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            <Shield className="w-3 h-3 inline mr-1" />
            Escrow
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>

        <div className="mt-1 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(product.price, product.currency)}
            </p>
            {product.originalPrice > product.price && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-500">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            by {product.seller.name}
            {product.seller.verified && <span className="ml-1 text-green-500">✓</span>}
          </div>
          <div className="text-xs text-gray-500">
            {product.shipping.free
              ? 'Free shipping'
              : `+${formatPrice(product.shipping.cost, product.currency)}`}
          </div>
        </div>

        {/* AI Trust Score */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-500">Trust Score: {product.aiScore.trustScore}%</div>
          <div className="text-xs text-gray-500">Risk: {product.aiScore.riskScore}%</div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex space-x-2">
          <button
            onClick={() => onAddToCart(product.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
            <Truck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Filter Components
function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

function PriceFilter({
  priceRange,
  onPriceChange,
}: {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={priceRange[0]}
          onChange={e => onPriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
          className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Max"
          value={priceRange[1]}
          onChange={e => onPriceChange([priceRange[0], parseInt(e.target.value) || 1000])}
          className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function RatingFilter() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
        <option>All Ratings</option>
        <option>4+ Stars</option>
        <option>3+ Stars</option>
        <option>2+ Stars</option>
      </select>
    </div>
  );
}

function SortOptions({
  sortBy,
  onSortChange,
}: {
  sortBy: string;
  onSortChange: (sort: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="relevance">Relevance</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="newest">Newest</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
}

// Pagination Component
function Pagination() {
  return (
    <div className="flex items-center space-x-2">
      <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
        Previous
      </button>
      <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">1</button>
      <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
        2
      </button>
      <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
        3
      </button>
      <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
        Next
      </button>
    </div>
  );
}

// Mobile Navigation Component
function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        <button className="flex flex-col items-center text-xs text-blue-600">
          <Search className="w-5 h-5 mb-1" />
          Search
        </button>
        <button className="flex flex-col items-center text-xs text-gray-600">
          <Heart className="w-5 h-5 mb-1" />
          Wishlist
        </button>
        <button className="flex flex-col items-center text-xs text-gray-600">
          <ShoppingCart className="w-5 h-5 mb-1" />
          Cart
        </button>
        <button className="flex flex-col items-center text-xs text-gray-600">
          <User className="w-5 h-5 mb-1" />
          Profile
        </button>
      </div>
    </nav>
  );
}

// ========================================
// 9. TYPE DEFINITIONS
// ========================================

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  kycVerified: boolean;
  trustScore: number;
  walletBalance: number;
  isSeller: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  rating: number;
  reviewCount: number;
  seller: Seller;
  stock: number;
  shipping: Shipping;
  features: string[];
  tags: string[];
  blockchain: BlockchainInfo;
  aiScore: AIScore;
  createdAt: string;
  trending: boolean;
}

interface Seller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  location: string;
}

interface Shipping {
  free: boolean;
  cost: number;
  estimatedDays: string;
}

interface BlockchainInfo {
  escrowEnabled: boolean;
  smartContract: string;
  nftAvailable: boolean;
}

interface AIScore {
  trustScore: number;
  riskScore: number;
  recommendationScore: number;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sellerId: string;
}
