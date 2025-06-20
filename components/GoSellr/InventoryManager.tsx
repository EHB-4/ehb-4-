'use client';

import React, { useState, useEffect } from 'react';
import {
  FiPackage,
  FiAlertTriangle,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
} from 'react-icons/fi';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  totalValue: number;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
}

interface InventoryManagerProps {
  shopId?: string;
}

export default function InventoryManager({ shopId }: InventoryManagerProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Mock data - replace with API calls
  const mockInventory: InventoryItem[] = [
    {
      id: '1',
      name: 'Premium Laptop',
      sku: 'LAP-001',
      category: 'Electronics',
      currentStock: 15,
      minStock: 5,
      maxStock: 50,
      unitCost: 800,
      totalValue: 12000,
      lastUpdated: '2024-01-15',
      status: 'in-stock',
    },
    {
      id: '2',
      name: 'Designer Watch',
      sku: 'WAT-002',
      category: 'Fashion',
      currentStock: 3,
      minStock: 5,
      maxStock: 20,
      unitCost: 250,
      totalValue: 750,
      lastUpdated: '2024-01-14',
      status: 'low-stock',
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      sku: 'AUD-003',
      category: 'Electronics',
      currentStock: 0,
      minStock: 3,
      maxStock: 25,
      unitCost: 150,
      totalValue: 0,
      lastUpdated: '2024-01-13',
      status: 'out-of-stock',
    },
    {
      id: '4',
      name: 'Smartphone',
      sku: 'PHN-004',
      category: 'Electronics',
      currentStock: 75,
      minStock: 10,
      maxStock: 50,
      unitCost: 600,
      totalValue: 45000,
      lastUpdated: '2024-01-12',
      status: 'overstock',
    },
  ];

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInventory(mockInventory);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [shopId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      case 'overstock':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low-stock':
      case 'out-of-stock':
        return <FiAlertTriangle className="w-4 h-4" />;
      default:
        return <FiPackage className="w-4 h-4" />;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const calculateMetrics = () => {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
    const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
    const outOfStockItems = inventory.filter(item => item.status === 'out-of-stock').length;
    const overstockItems = inventory.filter(item => item.status === 'overstock').length;

    return { totalItems, totalValue, lowStockItems, outOfStockItems, overstockItems };
  };

  const { totalItems, totalValue, lowStockItems, outOfStockItems, overstockItems } =
    calculateMetrics();

  const handleStockUpdate = (itemId: string, newStock: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const status =
            newStock === 0
              ? 'out-of-stock'
              : newStock <= item.minStock
                ? 'low-stock'
                : newStock > item.maxStock
                  ? 'overstock'
                  : 'in-stock';

          return {
            ...item,
            currentStock: newStock,
            totalValue: newStock * item.unitCost,
            status,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return item;
      })
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Inventory Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Items</p>
              <p className="text-2xl font-bold text-blue-900">{totalItems}</p>
            </div>
            <FiPackage className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Total Value</p>
              <p className="text-2xl font-bold text-green-900">${totalValue.toLocaleString()}</p>
            </div>
            <FiPackage className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-900">{lowStockItems}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-900">{outOfStockItems}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Overstock</p>
              <p className="text-2xl font-bold text-blue-900">{overstockItems}</p>
            </div>
            <FiPackage className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Living">Home & Living</option>
          <option value="Sports">Sports</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="overstock">Overstock</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.unitCost} per unit</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.currentStock}
                      onChange={e => handleStockUpdate(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      min="0"
                    />
                    <span className="text-sm text-gray-500">/ {item.maxStock}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {getStatusIcon(item.status)}
                    <span className="ml-1">
                      {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${item.totalValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this item?')) {
                          setInventory(prev => prev.filter(i => i.id !== item.id));
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
