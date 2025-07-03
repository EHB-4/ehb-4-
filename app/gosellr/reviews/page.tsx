'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  ChatBubbleLeftRightIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  FlagIcon,
  FilterIcon,
  SortAscendingIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarIcon,
  PhotoIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

// ========================================
// 1. REVIEWS & RATINGS PAGE
// ========================================

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // ========================================
  // 2. COMPONENT INITIALIZATION
  // ========================================

  useEffect(() => {
    loadReviews();
  }, []);

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadReviews = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockReviews: Review[] = [
        {
          id: 'review-1',
          productId: 'prod-1',
          productName: 'Wireless Headphones',
          productImage: '/api/placeholder/100/100?text=Headphones',
          userId: 'user-1',
          userName: 'Alice Johnson',
          userAvatar: '/api/placeholder/40/40?text=AJ',
          orderId: 'order-001',
          rating: 5,
          title: 'Excellent product quality!',
          content:
            'These headphones exceeded my expectations. The sound quality is amazing and the noise cancellation works perfectly. The battery life is impressive and the build quality is solid. Highly recommend!',
          images: ['/api/placeholder/200/200?text=Review+1'],
          verifiedPurchase: true,
          helpfulCount: 24,
          createdAt: new Date('2024-01-15'),
          status: 'approved',
        },
        {
          id: 'review-2',
          productId: 'prod-1',
          productName: 'Wireless Headphones',
          productImage: '/api/placeholder/100/100?text=Headphones',
          userId: 'user-2',
          userName: 'Bob Smith',
          userAvatar: '/api/placeholder/40/40?text=BS',
          orderId: 'order-002',
          rating: 4,
          title: 'Great value for money',
          content:
            'Good headphones with solid performance. The sound quality is clear and the wireless connection is stable. The only minor issue is the ear cushions could be a bit more comfortable for long listening sessions.',
          images: [],
          verifiedPurchase: true,
          helpfulCount: 12,
          createdAt: new Date('2024-01-12'),
          status: 'approved',
        },
        {
          id: 'review-3',
          productId: 'prod-2',
          productName: 'Smart Fitness Watch',
          productImage: '/api/placeholder/100/100?text=Smartwatch',
          userId: 'user-3',
          userName: 'Carol Davis',
          userAvatar: '/api/placeholder/40/40?text=CD',
          orderId: 'order-003',
          rating: 5,
          title: 'Perfect for fitness tracking',
          content:
            'This smartwatch is exactly what I needed for my fitness routine. The heart rate monitor is accurate, GPS works well, and the battery life is excellent. The app integration is seamless.',
          images: [
            '/api/placeholder/200/200?text=Review+2',
            '/api/placeholder/200/200?text=Review+3',
          ],
          verifiedPurchase: true,
          helpfulCount: 18,
          createdAt: new Date('2024-01-10'),
          status: 'approved',
        },
        {
          id: 'review-4',
          productId: 'prod-3',
          productName: 'Organic Cotton T-Shirt',
          productImage: '/api/placeholder/100/100?text=T-Shirt',
          userId: 'user-4',
          userName: 'David Wilson',
          userAvatar: '/api/placeholder/40/40?text=DW',
          orderId: 'order-004',
          rating: 3,
          title: 'Decent quality but runs small',
          content:
            'The material is soft and comfortable, but the sizing is inconsistent. I ordered my usual size but it fits smaller than expected. The color is as advertised though.',
          images: [],
          verifiedPurchase: true,
          helpfulCount: 8,
          createdAt: new Date('2024-01-08'),
          status: 'approved',
        },
        {
          id: 'review-5',
          productId: 'prod-1',
          productName: 'Wireless Headphones',
          productImage: '/api/placeholder/100/100?text=Headphones',
          userId: 'user-5',
          userName: 'Emma Brown',
          userAvatar: '/api/placeholder/40/40?text=EB',
          orderId: 'order-005',
          rating: 5,
          title: 'Amazing sound quality!',
          content:
            "I'm blown away by the sound quality of these headphones. The bass is deep and the highs are crisp. The noise cancellation is incredible - I can't hear anything around me when it's on.",
          images: ['/api/placeholder/200/200?text=Review+4'],
          verifiedPurchase: true,
          helpfulCount: 31,
          createdAt: new Date('2024-01-05'),
          status: 'approved',
        },
      ];

      setReviews(mockReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 4. UTILITY FUNCTIONS
  // ========================================

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getFilteredReviews = () => {
    let filtered = reviews;

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(review => review.rating === selectedRating);
    }

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(review => review.status === filter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        review =>
          review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort reviews
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
    }

    return filtered;
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId ? { ...review, helpfulCount: review.helpfulCount + 1 } : review
      )
    );
  };

  const handleReport = (reviewId: string) => {
    // Implement report functionality
    console.log('Reporting review:', reviewId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredReviews = getFilteredReviews();

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/gosellr" className="text-blue-600 hover:text-blue-700">
                ← Back to GoSellr
              </Link>
              <div className="ml-8">
                <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
                <p className="text-sm text-gray-500">Customer feedback and product reviews</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <StarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  value={selectedRating}
                  onChange={e => setSelectedRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>All Ratings</option>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{review.productName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">({review.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}
                    >
                      {review.status}
                    </span>
                    {review.verifiedPurchase && (
                      <ShieldCheckIcon
                        className="h-4 w-4 text-green-600"
                        title="Verified Purchase"
                      />
                    )}
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium text-gray-900">{review.userName}</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                  </div>

                  <h4 className="text-lg font-medium text-gray-900 mb-2">{review.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>

                  {/* Review Images */}
                  {review.images.length > 0 && (
                    <div className="flex space-x-2 mt-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                    >
                      <ThumbUpIcon className="h-4 w-4" />
                      <span>Helpful ({review.helpfulCount})</span>
                    </button>
                    <button
                      onClick={() => handleReport(review.id)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600"
                    >
                      <FlagIcon className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 6. TYPES
// ========================================

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  userName: string;
  userAvatar: string;
  orderId: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
  status: 'approved' | 'pending' | 'rejected';
}
