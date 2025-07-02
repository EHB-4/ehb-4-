'use client';

'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  Package,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Settings,
  Bell,
  User,
  ShoppingCart,
  Heart,
  Share,
  Download,
  Upload,
  RefreshCw,
  Archive,
  Tag,
  Camera,
  Globe,
  Shield,
  Sparkles,
  PlusCircle,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { GoSellrProduct } from '@/types/gosellr';

export default function MyProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<GoSellrProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<GoSellrProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  useEffect(() => {
    setShowBulkActions(selectedProducts.length > 0);
  }, [selectedProducts]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProducts: GoSellrProduct[] = [
        {
          id: 'prod-001',
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 299.99,
          originalPrice: 399.99,
          currency: 'USD',
          category: 'Electronics',
          subcategory: 'Audio',
          brand: 'AudioTech',
          images: ['/api/placeholder/400/400?text=Headphones'],
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
            methods: [],
          },
          features: ['Noise Cancellation', 'Bluetooth 5.0', '40-hour battery'],
          tags: ['wireless', 'premium', 'noise-cancelling'],
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
        },
        {
          id: 'prod-002',
          name: 'Smart Watch',
          description: 'Advanced smartwatch with health monitoring',
          price: 199.99,
          originalPrice: 249.99,
          currency: 'USD',
          category: 'Electronics',
          subcategory: 'Wearables',
          brand: 'TechWear',
          images: ['/api/placeholder/400/400?text=SmartWatch'],
          rating: 4.6,
          reviewCount: 892,
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
          stock: 8,
          shipping: {
            free: false,
            cost: 9.99,
            estimatedDays: '3-5 days',
            methods: [],
          },
          features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
          tags: ['smartwatch', 'health', 'fitness'],
          blockchain: {
            escrowEnabled: true,
            smartContract: '0x1234...5678',
            nftAvailable: false,
            blockchain: 'ethereum',
            gasEstimate: 0.005,
          },
          aiScore: {
            trustScore: 88,
            riskScore: 12,
            recommendationScore: 87,
            fraudScore: 5,
            reliabilityScore: 89,
            calculatedAt: new Date(),
          },
          sku: 'WEAR-002',
          status: 'active',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-10'),
        },
        {
          id: 'prod-003',
          name: 'Laptop Stand',
          description: 'Ergonomic laptop stand for better posture',
          price: 49.99,
          originalPrice: 69.99,
          currency: 'USD',
          category: 'Electronics',
          subcategory: 'Accessories',
          brand: 'ErgoTech',
          images: ['/api/placeholder/400/400?text=LaptopStand'],
          rating: 4.4,
          reviewCount: 567,
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
          stock: 5,
          shipping: {
            free: true,
            cost: 0,
            estimatedDays: '1-2 days',
            methods: [],
          },
          features: ['Adjustable Height', 'Aluminum Construction', 'Cable Management'],
          tags: ['ergonomic', 'laptop', 'accessory'],
          blockchain: {
            escrowEnabled: true,
            smartContract: '0x1234...5678',
            nftAvailable: false,
            blockchain: 'ethereum',
            gasEstimate: 0.005,
          },
          aiScore: {
            trustScore: 85,
            riskScore: 15,
            recommendationScore: 82,
            fraudScore: 8,
            reliabilityScore: 86,
            calculatedAt: new Date(),
          },
          sku: 'ACC-003',
          status: 'draft',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-12'),
        },
      ];

      setProducts(mockProducts);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(product => product.status === selectedStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof GoSellrProduct];
      let bValue: any = b[sortBy as keyof GoSellrProduct];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600', text: 'Out of Stock' };
    if (stock <= 5) return { color: 'text-yellow-600', text: 'Low Stock' };
    return { color: 'text-green-600', text: 'In Stock' };
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handleBulkDelete = async () => {
    setShowDeleteModal(true);
  };

  const confirmBulkDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
      setShowDeleteModal(false);

      // Show success message
      alert('Products deleted successfully!');
    } catch (error) {
      alert('Failed to delete products. Please try again.');
    }
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProducts(prev =>
        prev.map(p =>
          selectedProducts.includes(p.id) ? { ...p, status: newStatus, updatedAt: new Date() } : p
        )
      );
      setSelectedProducts([]);

      // Show success message
      alert(`Products status updated to ${newStatus}!`);
    } catch (error) {
      alert('Failed to update product status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to manage your products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Products</h1>
            <p className="text-gray-600">Manage your product catalog and inventory</p>
          </div>
          <Link
            href="/gosellr/my-products/add"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold">
                {products.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold">
                {products.filter(p => p.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold">$12,450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products by name, description, or SKU..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Sort by"
            >
              <option value="createdAt">Date Created</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Toggle sort order"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {showBulkActions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.length === filteredProducts.length}
                onChange={e => handleSelectAll(e.target.checked)}
                className="mr-3"
              />
              <span className="text-sm text-gray-600">
                {selectedProducts.length} product(s) selected
              </span>
            </div>
            <div className="flex gap-2">
              <select
                onChange={e => handleBulkStatusChange(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                aria-label="Bulk status change"
              >
                <option value="">Change Status</option>
                <option value="active">Activate</option>
                <option value="draft">Draft</option>
                <option value="archived">Archive</option>
              </select>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-6">
            {products.length === 0
              ? 'Start by adding your first product.'
              : 'No products match your search criteria.'}
          </p>
          <Link
            href="/gosellr/my-products/add"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-sm border overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'h-48'}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={e => handleSelectProduct(product.id, e.target.checked)}
                      className="mr-2"
                    />
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-500 line-through text-sm">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm ${getStockStatus(product.stock).color}`}>
                    {getStockStatus(product.stock).text} ({product.stock})
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                  >
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">SKU: {product.sku}</span>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-4">Delete Products</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedProducts.length} product(s)? This action
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBulkDelete}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
