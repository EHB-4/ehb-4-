'use client';

import React, { useState, useEffect } from 'react';
import {
  SearchIcon,
  FilterIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/outline';

// ========================================
// 1. MAIN GOSELLR MARKETPLACE PAGE
// ========================================

export default function GoSellrMarketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('relevance');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
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
      setCart(cartData);

      const wishlistData = await loadWishlist();
      setWishlist(wishlistData);
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
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Price filter
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

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

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: 1,
          sellerId: product.seller.id,
        },
      ]);
    }

    // Save to localStorage
    localStorage.setItem('gosellr-cart', JSON.stringify(cart));

    // Show notification
    showNotification('Product added to cart!', 'success');
  };

  const toggleWishlist = (productId: string) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    setWishlist(newWishlist);
    localStorage.setItem('gosellr-wishlist', JSON.stringify(newWishlist));

    showNotification(
      wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist',
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <GoSellrHeader
        user={user}
        cartCount={cart.length}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <CategoryFilter
              categories={getCategories()}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <PriceFilter priceRange={priceRange} onPriceChange={setPriceRange} />
            <RatingFilter />
            <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
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
                <SearchIcon className="h-5 w-5 text-gray-400" />
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
                  <ShoppingCartIcon className="w-6 h-6" />
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
  onAddToCart: (product: Product) => void;
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
          <HeartIcon className="w-5 h-5" />
        </button>
        {product.blockchain.escrowEnabled && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            <ShieldCheckIcon className="w-3 h-3 inline mr-1" />
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
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
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
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
            <TruckIcon className="w-4 h-4" />
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
  priceRange: { min: number; max: number };
  onPriceChange: (range: { min: number; max: number }) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={priceRange.min}
          onChange={e => onPriceChange({ ...priceRange, min: Number(e.target.value) })}
          className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Max"
          value={priceRange.max}
          onChange={e => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
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
          <SearchIcon className="w-5 h-5 mb-1" />
          Search
        </button>
        <button className="flex flex-col items-center text-xs text-gray-600">
          <HeartIcon className="w-5 h-5 mb-1" />
          Wishlist
        </button>
        <button className="flex flex-col items-center text-xs text-gray-600">
          <ShoppingCartIcon className="w-5 h-5 mb-1" />
          Cart
        </button>
        <button className="flex flex-col items-center text-xs text-gray-600">
          <UserIcon className="w-5 h-5 mb-1" />
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
