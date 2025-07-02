'use client';

import React, { useState } from 'react';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
  EyeIcon,
  CurrencyDollarIcon,
  PackageIcon,
  TruckIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  UserIcon,
  LocationMarkerIcon,
  SparklesIcon,
  GlobeAltIcon,
  KeyIcon,
  LockClosedIcon,
  CreditCardIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  RefreshIcon,
  CogIcon,
  BellIcon,
  TagIcon,
  CameraIcon,
  DownloadIcon,
  UploadIcon,
  ArchiveIcon,
  XIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  FingerPrintIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { GoSellrProduct } from '@/types/gosellr';

// ========================================
// 1. CART ITEM COMPONENT
// ========================================

interface CartItemProps {
  product: GoSellrProduct;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onMoveToWishlist: (productId: string) => void;
  showSellerInfo?: boolean;
  showBlockchainInfo?: boolean;
}

export default function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
  showSellerInfo = false,
  showBlockchainInfo = false,
}: CartItemProps) {
  const [updating, setUpdating] = useState(false);

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

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > product.stock) return;

    setUpdating(true);
    try {
      onUpdateQuantity(product.id, newQuantity);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  const handleMoveToWishlist = () => {
    onMoveToWishlist(product.id);
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;
  const discountPercentage = getDiscountPercentage();
  const totalPrice = product.price * quantity;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={`/gosellr/product/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Product Name and Category */}
              <div className="mb-2">
                <Link href={`/gosellr/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                  {product.brand && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{product.brand}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  <StarIcon className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-900 ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xs text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-1 py-0.5 rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className={`flex items-center space-x-1 ${stockStatus.color} mb-2`}>
                <StockIcon className="h-3 w-3" />
                <span className="text-xs font-medium">{stockStatus.text}</span>
                {product.stock > 0 && (
                  <span className="text-xs text-gray-500">({product.stock} available)</span>
                )}
              </div>

              {/* Seller Info */}
              {showSellerInfo && (
                <div className="border-t pt-2 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-900">{product.seller.name}</span>
                      {product.seller.verified && (
                        <ShieldCheckIcon
                          className="h-3 w-3 text-green-500"
                          title="Verified Seller"
                        />
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
                <div className="border-t pt-2 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-gray-900">AI Trust Score</span>
                    </div>
                    <span
                      className={`text-xs font-medium ${getTrustScoreColor(product.aiScore.trustScore)}`}
                    >
                      {product.aiScore.trustScore}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <GlobeAltIcon className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500 capitalize">
                      {product.blockchain.blockchain}
                    </span>
                    {product.blockchain.escrowEnabled && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <ShieldCheckIcon className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600">Escrow</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Shipping Info */}
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <TruckIcon className="h-3 w-3" />
                <span>
                  {product.shipping.free
                    ? 'Free shipping'
                    : `Shipping: ${formatCurrency(product.shipping.cost)}`}
                </span>
                <span>•</span>
                <span>{product.shipping.estimatedDays}</span>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || updating}
                  className="p-1 hover:bg-gray-50 disabled:opacity-50"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 text-sm text-gray-900 min-w-[2rem] text-center">
                  {updating ? '...' : quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock || updating}
                  className="p-1 hover:bg-gray-50 disabled:opacity-50"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(totalPrice)}
                </span>
                {quantity > 1 && (
                  <div className="text-xs text-gray-500">
                    {quantity} × {formatCurrency(product.price)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Link
                href={`/gosellr/product/${product.id}`}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <EyeIcon className="h-3 w-3" />
                <span>View Details</span>
              </Link>
              <button
                onClick={handleMoveToWishlist}
                className="text-xs text-gray-600 hover:text-red-600 font-medium flex items-center space-x-1"
              >
                <HeartIcon className="h-3 w-3" />
                <span>Move to Wishlist</span>
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
            >
              <TrashIcon className="h-3 w-3" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 5. CART ITEM VARIANTS
// ========================================

export function CartItemCompact({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: {
  product: GoSellrProduct;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
        <p className="text-xs text-gray-500">{formatCurrency(product.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
            className="p-1 hover:bg-gray-50"
          >
            <MinusIcon className="h-3 w-3" />
          </button>
          <span className="px-2 text-sm">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product.id, Math.min(product.stock, quantity + 1))}
            className="p-1 hover:bg-gray-50"
          >
            <PlusIcon className="h-3 w-3" />
          </button>
        </div>

        <button onClick={() => onRemove(product.id)} className="text-red-600 hover:text-red-700">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CartItemDetailed({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}: {
  product: GoSellrProduct;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onMoveToWishlist: (productId: string) => void;
}) {
  return (
    <CartItem
      product={product}
      quantity={quantity}
      onUpdateQuantity={onUpdateQuantity}
      onRemove={onRemove}
      onMoveToWishlist={onMoveToWishlist}
      showSellerInfo={true}
      showBlockchainInfo={true}
    />
  );
}
