'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  PackageIcon,
  UserIcon,
  LocationMarkerIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  DuplicateIcon,
  LinkIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  GlobeAltIcon,
  KeyIcon,
  FingerPrintIcon,
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
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GoSellrProduct } from '@/types/gosellr';

// ========================================
// 1. PRODUCT DETAIL PAGE COMPONENT
// ========================================

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<GoSellrProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadProduct = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock product data
      const mockProduct: GoSellrProduct = {
        id: productId,
        name: 'Wireless Headphones',
        description:
          'High-quality wireless headphones with noise cancellation technology. These premium headphones deliver crystal-clear sound quality with advanced noise cancellation that blocks out ambient noise for an immersive listening experience. Features include Bluetooth 5.0 connectivity, 40-hour battery life, quick charging, and comfortable over-ear design with memory foam ear cushions. Perfect for music lovers, professionals, and anyone who values superior audio quality.',
        price: 299.99,
        originalPrice: 399.99,
        currency: 'USD',
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'AudioTech',
        images: [
          '/api/placeholder/600/600?text=Headphones+1',
          '/api/placeholder/600/600?text=Headphones+2',
          '/api/placeholder/600/600?text=Headphones+3',
          '/api/placeholder/600/600?text=Headphones+4',
        ],
        rating: 4.8,
        reviewCount: 1247,
        seller: {
          id: 'seller-1',
          name: 'AudioTech Store',
          rating: 4.9,
          verified: true,
          location: 'New York, NY',
          blockchainAddress: '0x1234...5678',
          trustScore: 92,
          totalSales: 45600,
          totalProducts: 45,
        },
        stock: 15,
        shipping: {
          free: true,
          cost: 0,
          estimatedDays: '2-3 days',
          methods: ['Standard', 'Express'],
        },
        features: [
          'Active Noise Cancellation',
          'Bluetooth 5.0 Connectivity',
          '40-hour Battery Life',
          'Quick Charge (10 min = 5 hours)',
          'Memory Foam Ear Cushions',
          'Built-in Microphone',
          'Touch Controls',
          'Foldable Design',
          'Carrying Case Included',
          'Multi-device Pairing',
        ],
        tags: ['wireless', 'premium', 'noise-cancelling', 'bluetooth', 'audio'],
        blockchain: {
          escrowEnabled: true,
          smartContract: '0x1234...5678',
          nftAvailable: false,
          blockchain: 'ethereum',
          gasEstimate: 0.005,
        },
        aiScore: {
          trustScore: 92,
          riskScore: 8,
          recommendationScore: 95,
          fraudScore: 2,
          reliabilityScore: 94,
          calculatedAt: new Date(),
        },
        sku: 'AUD-001',
        status: 'active',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      };

      setProduct(mockProduct);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 4. UTILITY FUNCTIONS
  // ========================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getDiscountPercentage = () => {
    if (!product?.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const getStockStatus = () => {
    if (!product) return { color: 'text-gray-600', text: 'Unknown', icon: ExclamationTriangleIcon };

    if (product.stock === 0) {
      return { color: 'text-red-600', text: 'Out of Stock', icon: ExclamationTriangleIcon };
    } else if (product.stock <= 5) {
      return { color: 'text-yellow-600', text: 'Low Stock', icon: ExclamationTriangleIcon };
    } else {
      return { color: 'text-green-600', text: 'In Stock', icon: CheckCircleIcon };
    }
  };

  // ========================================
  // 5. EVENT HANDLERS
  // ========================================

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Adding to cart:', { productId, quantity });
  };

  const handleAddToWishlist = () => {
    // Implement add to wishlist functionality
    console.log('Adding to wishlist:', productId);
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => Math.min(prev + 1, product?.stock || 1));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  // ========================================
  // 6. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            href="/gosellr"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;
  const discountPercentage = getDiscountPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/gosellr" className="text-2xl font-bold text-blue-600">
                GoSellr
              </Link>
              <div className="ml-8 text-sm text-gray-500">Product Details</div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/gosellr" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-full h-20 object-cover rounded-lg border-2 ${
                        selectedImage === index
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-900">
                          {product.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAddToWishlist}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <HeartIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className={`flex items-center space-x-2 ${stockStatus.color} mb-4`}>
                  <StockIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">{stockStatus.text}</span>
                  {product.stock > 0 && (
                    <span className="text-sm text-gray-500">({product.stock} available)</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <div className="text-gray-700">
                  {showFullDescription ? (
                    <p>{product.description}</p>
                  ) : (
                    <p>
                      {product.description.length > 200
                        ? `${product.description.substring(0, 200)}...`
                        : product.description}
                    </p>
                  )}
                  {product.description.length > 200 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.slice(0, 8).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(false)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 text-gray-900">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(true)}
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Shipping Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TruckIcon className="h-4 w-4" />
                  <span>
                    {product.shipping.free
                      ? 'Free shipping'
                      : `Shipping: ${formatCurrency(product.shipping.cost)}`}
                  </span>
                  <span>•</span>
                  <span>{product.shipping.estimatedDays}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {[
                  { id: 'details', name: 'Product Details', icon: DocumentTextIcon },
                  { id: 'seller', name: 'Seller Info', icon: UserIcon },
                  { id: 'blockchain', name: 'Blockchain Info', icon: ShieldCheckIcon },
                  { id: 'reviews', name: 'Reviews', icon: StarIcon },
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Product Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Category</span>
                        <p className="text-sm text-gray-900">{product.category}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Subcategory</span>
                        <p className="text-sm text-gray-900">{product.subcategory}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Brand</span>
                        <p className="text-sm text-gray-900">{product.brand}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">SKU</span>
                        <p className="text-sm text-gray-900">{product.sku}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">All Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seller' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{product.seller.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1">{product.seller.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{product.seller.totalSales} sales</span>
                        <span>•</span>
                        <span>{product.seller.totalProducts} products</span>
                      </div>
                    </div>
                    {product.seller.verified && (
                      <div className="flex items-center text-green-600">
                        <ShieldCheckIcon className="h-5 w-5" />
                        <span className="ml-1 text-sm font-medium">Verified Seller</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
                      <div className="flex items-center space-x-2">
                        <LocationMarkerIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{product.seller.location}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Trust Score</h4>
                      <div className="flex items-center space-x-2">
                        <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-900">{product.seller.trustScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Blockchain Address</h4>
                    <div className="flex items-center space-x-2">
                      <KeyIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 font-mono">
                        {product.seller.blockchainAddress}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'blockchain' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Blockchain Network</h4>
                      <div className="flex items-center space-x-2">
                        <GlobeAltIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-900 capitalize">
                          {product.blockchain.blockchain}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Escrow Protection</h4>
                      <div className="flex items-center space-x-2">
                        <ShieldCheckIcon
                          className={`h-4 w-4 ${product.blockchain.escrowEnabled ? 'text-green-500' : 'text-red-500'}`}
                        />
                        <span
                          className={`text-sm font-medium ${product.blockchain.escrowEnabled ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {product.blockchain.escrowEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">NFT Available</h4>
                      <div className="flex items-center space-x-2">
                        <SparklesIcon
                          className={`h-4 w-4 ${product.blockchain.nftAvailable ? 'text-purple-500' : 'text-gray-400'}`}
                        />
                        <span
                          className={`text-sm font-medium ${product.blockchain.nftAvailable ? 'text-purple-600' : 'text-gray-600'}`}
                        >
                          {product.blockchain.nftAvailable ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Gas Estimate</h4>
                      <div className="flex items-center space-x-2">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {product.blockchain.gasEstimate} ETH
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Smart Contract</h4>
                    <div className="flex items-center space-x-2">
                      <KeyIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 font-mono">
                        {product.blockchain.smartContract}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">AI Trust Score</h4>
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-900">{product.aiScore.trustScore}%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <StarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Reviews Coming Soon</h3>
                  <p className="text-gray-500">Customer reviews will be available here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
