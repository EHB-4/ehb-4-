'use client';

import React from 'react';
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  PackageIcon,
  TruckIcon,
  UserIcon,
  LocationMarkerIcon,
  ClockIcon,
  TagIcon,
  CogIcon,
  BellIcon,
  ArrowRightIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { GoSellrProduct } from '@/types/gosellr';

// ========================================
// 1. PRODUCT CARD COMPONENT
// ========================================

interface ProductCardProps {
  product: GoSellrProduct;
  showActions?: boolean;
  showSellerInfo?: boolean;
  showBlockchainInfo?: boolean;
  onAddToCart?: (product: GoSellrProduct, quantity: number) => void;
  onAddToWishlist?: (product: GoSellrProduct) => void;
  onQuickView?: (product: GoSellrProduct) => void;
}

export default function ProductCard({
  product,
  showActions = true,
  showSellerInfo = false,
  showBlockchainInfo = false,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCardProps) {
  // ========================================
  // 2. UTILITY FUNCTIONS
  // ========================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getDiscountPercentage = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return { color: 'text-red-600', text: 'Out of Stock', icon: XCircleIcon };
    } else if (product.stock <= 5) {
      return { color: 'text-yellow-600', text: 'Low Stock', icon: ExclamationTriangleIcon };
    } else {
      return { color: 'text-green-600', text: 'In Stock', icon: CheckCircleIcon };
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  // ========================================
  // 3. EVENT HANDLERS
  // ========================================

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;
  const discountPercentage = getDiscountPercentage();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/gosellr/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="absolute top-2 right-2">
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-white shadow-sm ${stockStatus.color}`}
          >
            <StockIcon className="h-3 w-3" />
            <span>{stockStatus.text}</span>
          </div>
        </div>

        {/* Quick Actions */}
        {showActions && (
          <div className="absolute bottom-2 right-2 flex space-x-1">
            <button
              onClick={handleQuickView}
              className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              title="Quick View"
            >
              <EyeIcon className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={handleAddToWishlist}
              className="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Add to Wishlist"
            >
              <HeartIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        )}

        {/* Blockchain Badge */}
        {showBlockchainInfo && product.blockchain.escrowEnabled && (
          <div className="absolute bottom-2 left-2">
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <ShieldCheckIcon className="h-3 w-3" />
              <span>Escrow</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category and Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
          {product.brand && <span className="text-xs text-gray-500">{product.brand}</span>}
        </div>

        {/* Product Name */}
        <Link href={`/gosellr/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Seller Info */}
        {showSellerInfo && (
          <div className="border-t pt-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-900">{product.seller.name}</span>
                {product.seller.verified && (
                  <ShieldCheckIcon className="h-4 w-4 text-green-500" title="Verified Seller" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <StarIcon className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-gray-500">{product.seller.rating}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <LocationMarkerIcon className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{product.seller.location}</span>
            </div>
          </div>
        )}

        {/* Blockchain Info */}
        {showBlockchainInfo && (
          <div className="border-t pt-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-900">AI Trust Score</span>
              </div>
              <span
                className={`text-sm font-medium ${getTrustScoreColor(product.aiScore.trustScore)}`}
              >
                {product.aiScore.trustScore}%
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <GlobeAltIcon className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 capitalize">
                {product.blockchain.blockchain}
              </span>
            </div>
          </div>
        )}

        {/* Features Preview */}
        {product.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-500">
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Shipping Info */}
        <div className="flex items-center space-x-2 mb-3 text-xs text-gray-500">
          <TruckIcon className="h-3 w-3" />
          <span>
            {product.shipping.free
              ? 'Free shipping'
              : `Shipping: ${formatCurrency(product.shipping.cost)}`}
          </span>
          <span>•</span>
          <span>{product.shipping.estimatedDays}</span>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center space-x-1"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
            <Link
              href={`/gosellr/product/${product.id}`}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center justify-center"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// 5. PRODUCT CARD VARIANTS
// ========================================

export function ProductCardCompact({ product }: { product: GoSellrProduct }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={`/gosellr/product/${product.id}`}>
            <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover" />
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-3">
          <Link href={`/gosellr/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-2 mt-1">
            <StarIcon className="h-3 w-3 text-yellow-400" />
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</span>
            <span className="text-xs text-gray-500">SKU: {product.sku}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardDetailed({ product }: { product: GoSellrProduct }) {
  return (
    <ProductCard
      product={product}
      showActions={true}
      showSellerInfo={true}
      showBlockchainInfo={true}
    />
  );
}

export function ProductCardSimple({ product }: { product: GoSellrProduct }) {
  return (
    <ProductCard
      product={product}
      showActions={false}
      showSellerInfo={false}
      showBlockchainInfo={false}
    />
  );
}
