'use client';

import React, { useState, useEffect } from 'react';

// ========================================
// 1. GOSELLR PRODUCT DETAILS COMPONENT
// ========================================

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  isInWishlist: boolean;
  formatCurrency: (amount: number) => string;
}

export default function GoSellrProductDetails({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
  formatCurrency,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    loadProductReviews();
  }, [product.id]);

  const loadProductReviews = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const reviewsData = await new Promise<Review[]>(resolve =>
        setTimeout(
          () =>
            resolve([
              {
                id: 'review-1',
                user: 'Alice Johnson',
                rating: 5,
                title: 'Excellent product!',
                content: 'This product exceeded my expectations. Great quality and fast delivery.',
                date: new Date('2024-01-10'),
                verified: true,
                helpful: 12,
              },
              {
                id: 'review-2',
                user: 'Bob Smith',
                rating: 4,
                title: 'Good value for money',
                content: 'Solid product with good features. Would recommend to others.',
                date: new Date('2024-01-08'),
                verified: true,
                helpful: 8,
              },
              {
                id: 'review-3',
                user: 'Carol Davis',
                rating: 5,
                title: 'Amazing quality',
                content: 'The quality is outstanding and the seller was very professional.',
                date: new Date('2024-01-05'),
                verified: false,
                helpful: 5,
              },
            ]),
          500
        )
      );
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. UTILITY FUNCTIONS
  // ========================================

  const handleAddToCart = () => {
    if (product.stock < quantity) {
      alert('Not enough stock available');
      return;
    }
    onAddToCart(product);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0)
      return { status: 'out_of_stock', text: 'Out of Stock', color: 'text-red-600' };
    if (product.stock < 5)
      return { status: 'low_stock', text: `Only ${product.stock} left`, color: 'text-orange-600' };
    return { status: 'in_stock', text: 'In Stock', color: 'text-green-600' };
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  const stockStatus = getStockStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sold by</p>
                <p className="font-medium text-gray-900">{product.seller.name}</p>
                <div className="flex items-center mt-1">
                  {renderStars(product.seller.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.seller.rating} ({product.seller.verified ? 'Verified' : 'Unverified'})
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{product.seller.location}</p>
              </div>
            </div>
          </div>

          {/* AI Trust Score */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">AI Trust Score</p>
                <p
                  className={`text-lg font-bold ${getTrustScoreColor(product.aiScore.trustScore)}`}
                >
                  {product.aiScore.trustScore}%
                </p>
                <p className="text-xs text-blue-700">Risk Score: {product.aiScore.riskScore}%</p>
              </div>
              <div className="text-blue-600 text-2xl">🤖</div>
            </div>
          </div>

          {/* Product Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Decrease quantity</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>

              <span className="w-12 text-center text-sm font-medium text-gray-900">{quantity}</span>

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Increase quantity</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>

              <span className={`text-sm ${stockStatus.color}`}>{stockStatus.text}</span>
            </div>
          </div>

          {/* Blockchain Features */}
          {product.blockchain.escrowEnabled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">🛡️</span>
                <div>
                  <p className="text-sm font-medium text-green-900">Escrow Protection</p>
                  <p className="text-xs text-green-700">
                    Your payment is held securely until you confirm delivery
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              onClick={() => onAddToWishlist(product.id)}
              className={`p-3 rounded-md border ${
                isInWishlist
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-300'
              }`}
            >
              <span className="sr-only">Add to wishlist</span>
              <svg
                className="w-6 h-6"
                fill={isInWishlist ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="text-sm text-gray-600">
                  {product.shipping.free
                    ? 'Free shipping'
                    : `+${formatCurrency(product.shipping.cost)}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Estimated delivery</p>
                <p className="text-sm font-medium text-gray-900">
                  {product.shipping.estimatedDays}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'description', name: 'Description' },
              { id: 'features', name: 'Features' },
              { id: 'reviews', name: 'Reviews' },
              { id: 'blockchain', name: 'Blockchain Info' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading reviews...</p>
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.user}</span>
                        {review.verified && (
                          <span className="text-green-600 text-sm">✓ Verified</span>
                        )}
                      </div>
                      <div className="flex items-center">{renderStars(review.rating)}</div>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                    <p className="text-gray-700 mb-2">{review.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{review.date.toLocaleDateString()}</span>
                      <button className="text-blue-600 hover:text-blue-800">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'blockchain' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Smart Contract</h4>
                <p className="text-sm text-blue-700 font-mono">
                  {product.blockchain.smartContract}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Escrow Status</h4>
                  <p className="text-sm text-gray-600">
                    {product.blockchain.escrowEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">NFT Available</h4>
                  <p className="text-sm text-gray-600">
                    {product.blockchain.nftAvailable ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 5. TYPE DEFINITIONS
// ========================================

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
  sku: string;
  sizes?: string[];
  colors?: Color[];
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

interface Color {
  name: string;
  value: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  verified: boolean;
  helpful: number;
}
