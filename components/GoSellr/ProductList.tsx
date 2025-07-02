'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Star,
  ShoppingCart,
  Heart,
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
} from 'lucide-react';
import Link from 'next/link';
import { GoSellrProduct } from '@/types/gosellr';

// ========================================
// 1. PRODUCT LIST COMPONENT
// ========================================

interface ProductListProps {
  products: GoSellrProduct[];
  loading?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistItems?: string[];
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export default function ProductList({
  products,
  loading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistItems = [],
  viewMode = 'grid',
  onViewModeChange,
}: ProductListProps) {
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // ========================================
  // 2. SORTING FUNCTIONS
  // ========================================

  const getSortedProducts = () => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 'price_low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sortedProducts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'popular':
      default:
        return sortedProducts.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  };

  // ========================================
  // 3. UTILITY FUNCTIONS
  // ========================================

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    );
  }

  const sortedProducts = getSortedProducts();

  return (
    <div className="space-y-6">
      {/* ========================================
          5. TOOLBAR
      ======================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View mode toggle */}
          {onViewModeChange && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
          6. PRODUCT GRID/LIST
      ======================================== */}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map(product => (
            <ProductListItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ========================================
// 7. PRODUCT CARD COMPONENT
// ========================================

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  formatPrice,
}: {
  product: GoSellrProduct;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist: boolean;
  formatPrice: (price: number, currency: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || '/api/placeholder/400/400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.trending && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Trending
            </span>
          )}
          {product.blockchain.escrowEnabled && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Escrow
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <button
            className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Seller info */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">{product.seller.name}</span>
          {product.seller.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
        </div>

        {/* Product name */}
        <Link
          href={`/gosellr/product/${product.id}`}
          className="block text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors mb-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>

        {/* Shipping info */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Truck className="h-3 w-3" />
          {product.shipping.free ? (
            <span className="text-green-600 font-medium">Free shipping</span>
          ) : (
            <span>+{formatPrice(product.shipping.cost, product.currency)} shipping</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart?.(product.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}

// ========================================
// 8. PRODUCT LIST ITEM COMPONENT
// ========================================

function ProductListItem({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  formatPrice,
}: {
  product: GoSellrProduct;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist: boolean;
  formatPrice: (price: number, currency: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={product.images[0] || '/api/placeholder/400/400'}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Seller info */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">{product.seller.name}</span>
                {product.seller.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
              </div>

              {/* Product name */}
              <Link
                href={`/gosellr/product/${product.id}`}
                className="block text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors mb-1"
              >
                {product.name}
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
              </div>

              {/* Price and shipping */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {product.shipping.free
                    ? 'Free shipping'
                    : `+${formatPrice(product.shipping.cost, product.currency)} shipping`}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => onToggleWishlist?.(product.id)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
              <button
                onClick={() => onAddToCart?.(product.id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
