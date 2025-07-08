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
  MessageCircle,
  Sparkles,
  Upload,
  Truck as TruckIcon,
} from 'lucide-react';
import Link from 'next/link';
import { getDiscountPercentage } from '@/lib/utils/getDiscountPercentage';
import LiveChat from '@/components/GoSellr/LiveChat';
import DeliveryTracking from '@/components/GoSellr/DeliveryTracking';
import BulkUpload from '@/components/GoSellr/BulkUpload';
import AISuggestions from '@/components/GoSellr/AISuggestions';

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
  const [wishlistItems, setWishlistItems] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gosellr-wishlist');
      try {
        const parsed = JSON.parse(stored || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [user, setUser] = useState<User | null>(null);

  // Advanced Widgets State
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showDeliveryTracking, setShowDeliveryTracking] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);

  // Ensure wishlistItems is always an array before using .includes()
  const safeWishlist = Array.isArray(wishlistItems) ? wishlistItems : [];

  // --- STATS ARRAY FIX ---
  const stats = [
    { label: 'AI Products', value: products.length, icon: Package },
    { label: 'Total Downloads', value: 89200, icon: Users },
    { label: 'Avg Rating', value: 4.6, icon: Star },
    { label: 'Active Users', value: 2400000, icon: Users },
  ];

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
      setWishlistItems(wishlistData);
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
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
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
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

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
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || Date.now()).getTime() -
            new Date(a.createdAt || Date.now()).getTime()
        );
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredProducts(filtered);
  };

  // ========================================
  // 5. CART AND WISHLIST FUNCTIONS
  // ========================================

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const currentCart = JSON.parse(localStorage.getItem('gosellr-cart') || '[]');
    const existingItem = currentCart.find((item: any) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      });
    }

    localStorage.setItem('gosellr-cart', JSON.stringify(currentCart));
    setCartItems(currentCart.length);
  };

  const toggleWishlist = (productId: string) => {
    const newWishlist = safeWishlist.includes(productId)
      ? safeWishlist.filter(id => id !== productId)
      : [...safeWishlist, productId];

    setWishlistItems(newWishlist);
    localStorage.setItem('gosellr-wishlist', JSON.stringify(newWishlist));
  };

  // ========================================
  // 6. UTILITY FUNCTIONS
  // ========================================

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // ========================================
  // 7. ADVANCED WIDGETS HANDLERS
  // ========================================

  const handleAISuggestion = (suggestion: any) => {
    console.log('Applying AI suggestion:', suggestion);
    // Implement suggestion application logic
  };

  const handleBulkUploadSuccess = (products: any[]) => {
    console.log('Bulk upload successful:', products);
    // Refresh product list or show success message
  };

  // ========================================
  // 8. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading GoSellr marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/gosellr" className="text-2xl font-bold text-blue-600">
                GoSellr
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, brands, or categories..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {/* Advanced Widgets */}
              {user?.isSeller && (
                <>
                  <button
                    onClick={() => setShowBulkUpload(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Bulk Upload"
                    aria-label="Bulk upload products"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowAISuggestions(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="AI Suggestions"
                    aria-label="View AI suggestions"
                  >
                    <Sparkles className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}

              {/* Live Chat */}
              <button
                onClick={() => setShowLiveChat(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Live Chat"
                aria-label="Open live chat"
              >
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>

              {/* Delivery Tracking */}
              <button
                onClick={() => setShowDeliveryTracking(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Track Delivery"
                aria-label="Track delivery"
              >
                <TruckIcon className="w-5 h-5 text-gray-600" />
              </button>

              {/* Cart */}
              <Link
                href="/gosellr/checkout"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar || '/api/placeholder/32/32'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FilterIcon className="w-4 h-4" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex items-center gap-1 border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600">{filteredProducts.length} products found</p>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home">Home & Garden</option>
                    <option value="Sports">Sports & Outdoors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={e =>
                        setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Free Shipping</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Verified Seller</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Trending</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div
                className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.trending && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Trending
                    </span>
                  )}
                  {product.shipping.free && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Free Shipping
                    </span>
                  )}
                  {product.blockchain.escrowEnabled && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Escrow
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                    safeWishlist.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  {product.seller.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                </div>

                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">by</span>
                    <span className="text-sm font-medium text-gray-900">{product.seller.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{product.seller.rating}</span>
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
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <Link
                    href={`/gosellr/product/${product.id}`}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    title="View Product"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </Link>
                </div>

                {/* Shipping Info */}
                <div className="mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>
                      {product.shipping.free
                        ? 'Free shipping'
                        : `$${product.shipping.cost} shipping`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{product.shipping.estimatedDays}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>

      {/* Advanced Widgets */}
      <LiveChat
        sellerId="seller-1"
        productId="prod-1"
        isOpen={showLiveChat}
        onClose={() => setShowLiveChat(false)}
        onMinimize={() => setChatMinimized(!chatMinimized)}
        isMinimized={chatMinimized}
      />

      {showDeliveryTracking && (
        <DeliveryTracking
          orderId="order-123"
          trackingNumber="TRK123456789"
          onClose={() => setShowDeliveryTracking(false)}
        />
      )}

      {showBulkUpload && (
        <BulkUpload onClose={() => setShowBulkUpload(false)} onSuccess={handleBulkUploadSuccess} />
      )}

      <AISuggestions
        sellerId={user?.id}
        isOpen={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
        onApplySuggestion={handleAISuggestion}
      />
    </div>
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
