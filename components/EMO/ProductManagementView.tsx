"use client";

'use client';

import React, { useState } from 'react';
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiPackage,
  FiMoreVertical,
  FiX,
  FiFilter,
} from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive' | 'Pending';
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 150,
    status: 'Active',
    image: '/placeholder.svg',
  },
  {
    id: 'prod-002',
    name: 'Organic Green Tea',
    category: 'Groceries',
    price: 12.49,
    stock: 300,
    status: 'Active',
    image: '/placeholder.svg',
  },
  {
    id: 'prod-003',
    name: 'Leather Messenger Bag',
    category: 'Fashion',
    price: 89.0,
    stock: 75,
    status: 'Inactive',
    image: '/placeholder.svg',
  },
  {
    id: 'prod-004',
    name: 'Smart Home Hub',
    category: 'Electronics',
    price: 129.5,
    stock: 0,
    status: 'Pending',
    image: '/placeholder.svg',
  },
  {
    id: 'prod-005',
    name: 'Yoga Mat',
    category: 'Sports',
    price: 25.0,
    stock: 200,
    status: 'Active',
    image: '/placeholder.svg',
  },
];

const ProductForm = ({
  product,
  onClose,
  onSave,
}: {
  product: Partial<Product>;
  onClose: () => void;
  onSave: (product: Product) => void;
}) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {product.id ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            title="Close modal"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiX className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <input
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              placeholder="Category"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <input
              name="price"
              type="number"
              value={formData.price || ''}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <input
              name="stock"
              type="number"
              value={formData.stock || ''}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <select
            name="status"
            aria-label="Product status"
            value={formData.status || 'Pending'}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductModal = ({
  product,
  onClose,
  onSave,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}) => {
  if (!product) {
    return null;
  }
  return <ProductForm product={product} onClose={onClose} onSave={onSave} />;
};

export default function ProductManagementView() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);

  const handleSave = (productToSave: Product) => {
    if (productToSave.id) {
      setProducts(products.map(p => (p.id === productToSave.id ? productToSave : p)));
    } else {
      setProducts([...products, { ...productToSave, id: `prod-${Date.now()}` }]);
    }
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setSelectedProduct({})}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <FiPlus />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button
            title="Filter products"
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <FiFilter />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                      <FiPackage className="h-5 w-5 text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-800">{product.name}</span>
                  </td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">PKR {product.price.toFixed(2)}</td>
                  <td className="p-4">
                    {product.stock > 0 ? (
                      product.stock
                    ) : (
                      <span className="text-red-500">Out of stock</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : product.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="relative inline-block">
                      <button title="More actions" className="p-2 rounded-full hover:bg-gray-100">
                        <FiMoreVertical className="h-5 w-5" />
                      </button>
                      {/* Dropdown can be implemented here */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSave={handleSave}
      />
    </div>
  );
}
