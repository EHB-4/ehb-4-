'use client';

'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  FilterIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  CurrencyDollarIcon,
  PackageIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  DownloadIcon,
  UploadIcon,
  RefreshIcon,
  ArchiveIcon,
  TagIcon,
  CameraIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { GoSellrProduct } from '@/types/gosellr';

export default function MyProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<GoSellrProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<GoSellrProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

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
          stock: 0,
          shipping: {
            free: true,
            cost: 0,
            estimatedDays: '1-2 days',
            methods: [],
          },
          features: ['Adjustable Height', 'Aluminum Construction', 'Cable Management'],
          tags: ['ergonomic', 'accessory', 'laptop'],
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
          status: 'inactive',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-12'),
        },
      ];

      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(product => product.status === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stock;
          bValue = b.stock;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
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
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return { color: 'text-red-600', icon: XCircleIcon, text: 'Out of Stock' };
    } else if (stock <= 5) {
      return { color: 'text-yellow-600', icon: ExclamationTriangleIcon, text: 'Low Stock' };
    } else {
      return { color: 'text-green-600', icon: CheckCircleIcon, text: 'In Stock' };
    }
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
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProducts(prev =>
        prev.map(p =>
          selectedProducts.includes(p.id)
            ? { ...p, status: newStatus as any, updatedAt: new Date() }
            : p
        )
      );
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your products...</p>
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
              <Link href="/gosellr" className="text-2xl font-bold text-blue-600">
                GoSellr
              </Link>
              <div className="ml-8 text-sm text-gray-500">My Products</div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/gosellr/my-products/add"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PackageIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Products</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.stock <= 5 && p.stock > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircleIcon className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home & Garden</option>
                <option value="Sports">Sports</option>
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt">Date Created</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="rating">Rating</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? (
                  <SortAscendingIcon className="h-5 w-5" />
                ) : (
                  <SortDescendingIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedProducts.length} product(s) selected
                </span>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  onChange={e => handleBulkStatusChange(e.target.value)}
                  className="border border-blue-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Change Status</option>
                  <option value="active">Activate</option>
                  <option value="inactive">Deactivate</option>
                  <option value="archived">Archive</option>
                </select>
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Products ({filteredProducts.length})
              </h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={
                    selectedProducts.length === filteredProducts.length &&
                    filteredProducts.length > 0
                  }
                  onChange={e => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by creating your first product.'}
              </p>
              <div className="mt-6">
                <Link
                  href="/gosellr/my-products/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Product
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock);
                const StockIcon = stockStatus.icon;

                return (
                  <div key={product.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={e => handleSelectProduct(product.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />

                      {/* Product Image */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">
                              SKU: {product.sku} • {product.category}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm font-medium text-gray-900">
                                {formatCurrency(product.price)}
                              </span>
                              <div className="flex items-center space-x-1">
                                <StarIcon className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm text-gray-500">
                                  {product.rating} ({product.reviewCount})
                                </span>
                              </div>
                              <div className={`flex items-center space-x-1 ${stockStatus.color}`}>
                                <StockIcon className="h-4 w-4" />
                                <span className="text-sm">{stockStatus.text}</span>
                              </div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}
                            >
                              {product.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/gosellr/product/${product.id}`}
                          className="text-blue-600 hover:text-blue-700 p-2"
                          title="View Product"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/gosellr/product/${product.id}/edit`}
                          className="text-green-600 hover:text-green-700 p-2"
                          title="Edit Product"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProducts([product.id]);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-700 p-2"
                          title="Delete Product"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-600" />
              <h3 className="text-lg font-medium text-gray-900 mt-2">
                Delete Product{selectedProducts.length > 1 ? 's' : ''}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete {selectedProducts.length} product
                  {selectedProducts.length > 1 ? 's' : ''}? This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
