'use client';

'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

import { Shop } from '@/lib/models/Shop';

export default function ShopManagementPage() {
  const { data: session } = useSession();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch('/api/shops/my-shop');
        if (!response.ok) {
          throw new Error('Failed to fetch shop data');
        }
        const data = await response.json();
        setShop(data.shop);
        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchShopData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!shop) {
    // Shop creation form
    const [form, setForm] = React.useState({
      name: '',
      description: '',
      category: '',
      address: { street: '', city: '', state: '', zip: '' },
      email: '',
      phone: '',
      logo: null as File | null,
      banner: null as File | null,
    });
    const [formError, setFormError] = React.useState<string | null>(null);
    const [formSuccess, setFormSuccess] = React.useState<string | null>(null);
    const [submitting, setSubmitting] = React.useState(false);
    const categories = [
      'Electronics',
      'Fashion',
      'Home & Living',
      'Beauty',
      'Sports',
      'Automotive',
      'Other',
    ];
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name.startsWith('address.')) {
        setForm(f => ({ ...f, address: { ...f.address, [name.split('.')[1]]: value } }));
      } else {
        setForm(f => ({ ...f, [name]: value }));
      }
    };
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files[0]) {
        setForm(f => ({ ...f, [name]: files[0] }));
      }
    };
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setForm(f => ({ ...f, category: e.target.value }));
    };
    const validate = () => {
      if (!form.name.trim()) return 'Shop name is required.';
      if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        return 'Valid email is required.';
      return null;
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormError(null);
      setFormSuccess(null);
      const err = validate();
      if (err) {
        setFormError(err);
        return;
      }
      setSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setSubmitting(false);
        setFormSuccess('Shop created successfully!');
        setFormError(null);
        setForm({
          name: '',
          description: '',
          category: '',
          address: { street: '', city: '', state: '', zip: '' },
          email: '',
          phone: '',
          logo: null,
          banner: null,
        });
      }, 1500);
    };
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Create Your Shop</h1>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          {formError && <div className="text-red-500 text-sm mb-2">{formError}</div>}
          {formSuccess && <div className="text-green-600 text-sm mb-2">{formSuccess}</div>}
          <div>
            <label className="block text-sm font-medium mb-1">
              Shop Name<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleInput}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              rows={2}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleSelect}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street</label>
              <input
                name="address.street"
                value={form.address.street}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                name="address.city"
                value={form.address.city}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                name="address.state"
                value={form.address.state}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zip</label>
              <input
                name="address.zip"
                value={form.address.zip}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Email<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleInput}
                type="email"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleInput}
                type="tel"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Logo (optional)</label>
              <input
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Banner (optional)</label>
              <input
                name="banner"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating Shop...' : 'Create Shop'}
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-gray-500 text-sm mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">${stats.totalRevenue}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-gray-500 text-sm mb-2">Average Rating</h3>
          <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Shop Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-500 text-sm">Shop Name</h3>
              <p className="text-lg">{shop.name}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Description</h3>
              <p className="text-lg">{shop.description}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Address</h3>
              <p className="text-lg">
                {shop.address.street}, {shop.address.city}, {shop.address.state}{' '}
                {shop.address.zipCode}
              </p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Contact</h3>
              <p className="text-lg">
                {shop.contact.email} | {shop.contact.phone}
              </p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">SQL Level</h3>
              <p className="text-lg">{shop.sqlLevel}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button
              onClick={() => {
                /* TODO: Implement add product */
              }}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Product
            </button>
            <button
              onClick={() => {
                /* TODO: Implement view orders */
              }}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              View Orders
            </button>
            <button
              onClick={() => {
                /* TODO: Implement edit shop */
              }}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Edit Shop
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
