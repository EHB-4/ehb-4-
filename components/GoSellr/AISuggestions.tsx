'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  Target,
  Lightbulb,
  Star,
  Clock,
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  Heart,
  MessageCircle,
  ArrowRight,
  X,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Package,
} from 'lucide-react';

// ========================================
// 1. AI SUGGESTIONS WIDGET
// ========================================

interface AISuggestion {
  id: string;
  type: 'pricing' | 'inventory' | 'marketing' | 'product' | 'customer' | 'trending';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action: string;
  data?: any;
  createdAt: Date;
  isRead: boolean;
}

interface AISuggestionsProps {
  sellerId?: string;
  productId?: string;
  isOpen: boolean;
  onClose: () => void;
  onApplySuggestion?: (suggestion: AISuggestion) => void;
}

export default function AISuggestions({
  sellerId,
  productId,
  isOpen,
  onClose,
  onApplySuggestion,
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<
    'all' | 'pricing' | 'inventory' | 'marketing' | 'product' | 'customer' | 'trending'
  >('all');
  const [selectedSuggestion, setSelectedSuggestion] = useState<AISuggestion | null>(null);

  // ========================================
  // 2. INITIALIZATION
  // ========================================

  useEffect(() => {
    if (isOpen) {
      loadSuggestions();
    }
  }, [isOpen, sellerId, productId]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockSuggestions: AISuggestion[] = [
        {
          id: '1',
          type: 'pricing',
          title: 'Price Optimization Opportunity',
          description:
            'Your wireless headphones are priced 15% below market average. Consider increasing price by $25 to maximize profit while maintaining competitiveness.',
          impact: 'high',
          confidence: 92,
          action: 'Increase price by $25',
          data: {
            currentPrice: 299.99,
            suggestedPrice: 324.99,
            marketAverage: 349.99,
            potentialRevenue: 1250,
          },
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: false,
        },
        {
          id: '2',
          type: 'inventory',
          title: 'Low Stock Alert',
          description:
            'Smart Watch inventory is running low (8 units remaining). Based on current demand, you should restock within 3 days to avoid stockouts.',
          impact: 'high',
          confidence: 88,
          action: 'Restock 50 units',
          data: {
            currentStock: 8,
            suggestedStock: 50,
            daysUntilStockout: 3,
            demandRate: 2.7,
          },
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          isRead: false,
        },
        {
          id: '3',
          type: 'marketing',
          title: 'Promotion Opportunity',
          description:
            'Your fitness category products show high engagement. Consider running a 20% discount campaign to boost sales during peak fitness season.',
          impact: 'medium',
          confidence: 85,
          action: 'Create 20% discount campaign',
          data: {
            category: 'Fitness',
            engagementRate: 0.78,
            conversionRate: 0.12,
            suggestedDiscount: 20,
            estimatedSales: 45,
          },
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          isRead: true,
        },
        {
          id: '4',
          type: 'product',
          title: 'Product Bundle Suggestion',
          description:
            'Customers who buy wireless headphones often purchase phone cases. Consider creating a bundle to increase average order value.',
          impact: 'medium',
          confidence: 79,
          action: 'Create headphone + case bundle',
          data: {
            product1: 'Wireless Headphones',
            product2: 'Phone Cases',
            correlation: 0.73,
            bundleDiscount: 15,
            potentialAOV: 89.99,
          },
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
          isRead: true,
        },
        {
          id: '5',
          type: 'customer',
          title: 'Customer Retention Opportunity',
          description:
            "15 customers haven't made a purchase in 30 days. Send personalized re-engagement emails with exclusive offers.",
          impact: 'medium',
          confidence: 82,
          action: 'Send re-engagement campaign',
          data: {
            inactiveCustomers: 15,
            daysInactive: 30,
            suggestedDiscount: 25,
            estimatedRevenue: 450,
          },
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          isRead: false,
        },
        {
          id: '6',
          type: 'trending',
          title: 'Trending Product Alert',
          description:
            'Smart home devices are trending with 40% increase in searches. Consider adding smart home products to your catalog.',
          impact: 'high',
          confidence: 91,
          action: 'Add smart home products',
          data: {
            category: 'Smart Home',
            searchIncrease: 40,
            marketSize: 2500000,
            competitionLevel: 'medium',
          },
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          isRead: false,
        },
      ];

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. UTILITY FUNCTIONS
  // ========================================

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pricing':
        return DollarSign;
      case 'inventory':
        return Package;
      case 'marketing':
        return Target;
      case 'product':
        return ShoppingCart;
      case 'customer':
        return Users;
      case 'trending':
        return TrendingUp;
      default:
        return Lightbulb;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => filter === 'all' || suggestion.type === filter
  );

  const unreadCount = suggestions.filter(s => !s.isRead).length;

  // ========================================
  // 4. EVENT HANDLERS
  // ========================================

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    setSelectedSuggestion(suggestion);
    onApplySuggestion?.(suggestion);

    // Mark as read
    setSuggestions(prev => prev.map(s => (s.id === suggestion.id ? { ...s, isRead: true } : s)));
  };

  const handleRefresh = () => {
    loadSuggestions();
  };

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  const renderSuggestionCard = (suggestion: AISuggestion) => (
    <motion.div
      key={suggestion.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        !suggestion.isRead ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => handleApplySuggestion(suggestion)}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getImpactColor(suggestion.impact)}`}>
          {React.createElement(getTypeIcon(suggestion.type), { className: 'w-4 h-4' })}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 truncate">{suggestion.title}</h3>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${getImpactColor(suggestion.impact)}`}
              >
                {suggestion.impact}
              </span>
              <span className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}>
                {suggestion.confidence}%
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{suggestion.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{formatTimeAgo(suggestion.createdAt)}</span>
            <div className="flex items-center gap-2">
              {!suggestion.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSuggestionDetail = (suggestion: AISuggestion) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${getImpactColor(suggestion.impact)}`}>
            {React.createElement(getTypeIcon(suggestion.type), { className: 'w-6 h-6' })}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{suggestion.title}</h2>
            <p className="text-sm text-gray-600">{formatTimeAgo(suggestion.createdAt)}</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedSuggestion(null)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Close detail"
          aria-label="Close suggestion detail"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600">{suggestion.description}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-2">Recommended Action</h3>
          <p className="text-blue-600 font-medium">{suggestion.action}</p>
        </div>

        {suggestion.data && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Data Insights</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(suggestion.data, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              Impact: <span className="font-medium capitalize">{suggestion.impact}</span>
            </span>
            <span>
              Confidence: <span className="font-medium">{suggestion.confidence}%</span>
            </span>
          </div>
          <button
            onClick={() => {
              onApplySuggestion?.(suggestion);
              setSelectedSuggestion(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Suggestion
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Suggestions</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleRefresh}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Refresh suggestions"
                aria-label="Refresh AI suggestions"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Close suggestions"
                aria-label="Close AI suggestions"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', count: suggestions.length },
                {
                  id: 'pricing',
                  label: 'Pricing',
                  count: suggestions.filter(s => s.type === 'pricing').length,
                },
                {
                  id: 'inventory',
                  label: 'Inventory',
                  count: suggestions.filter(s => s.type === 'inventory').length,
                },
                {
                  id: 'marketing',
                  label: 'Marketing',
                  count: suggestions.filter(s => s.type === 'marketing').length,
                },
                {
                  id: 'product',
                  label: 'Product',
                  count: suggestions.filter(s => s.type === 'product').length,
                },
                {
                  id: 'customer',
                  label: 'Customer',
                  count: suggestions.filter(s => s.type === 'customer').length,
                },
                {
                  id: 'trending',
                  label: 'Trending',
                  count: suggestions.filter(s => s.type === 'trending').length,
                },
              ].map(filterOption => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id as any)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter === filterOption.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.label} ({filterOption.count})
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading suggestions...</p>
                </div>
              </div>
            ) : selectedSuggestion ? (
              renderSuggestionDetail(selectedSuggestion)
            ) : (
              <div className="space-y-3">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map(renderSuggestionCard)
                ) : (
                  <div className="text-center py-8">
                    <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No suggestions available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
