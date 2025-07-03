'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Upload,
  Trash2,
  Building2,
  MapPin,
  Mail,
  Phone,
  Camera,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface Shop {
  _id: string;
  name: string;
  description: string;
  category: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  logo?: string;
  banner?: string;
  sqlLevel: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditShopPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    address: { street: '', city: '', state: '', zip: '' },
    email: '',
    phone: '',
    logo: null as File | null,
    banner: null as File | null,
  });

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Living',
    'Beauty',
    'Sports',
    'Automotive',
    'Books',
    'Food & Beverages',
    'Health & Wellness',
    'Other',
  ];

  // Mock shop data for demonstration
  const mockShop: Shop = {
    _id: 'shop-001',
    name: 'TechGear Store',
    description:
      'Premium electronics and gadgets for tech enthusiasts. We offer the latest in technology with excellent customer service.',
    category: 'Electronics',
    address: {
      street: '123 Tech Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    contact: {
      email: 'contact@techgear.com',
      phone: '+1-555-0123',
    },
    logo: '/api/placeholder/100/100?text=TG',
    banner: '/api/placeholder/800/200?text=TechGear',
    sqlLevel: 'Gold',
    rating: 4.8,
    reviewCount: 1247,
    totalProducts: 45,
    totalSales: 45600,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
  };

  useEffect(() => {
    fetchShopData();
  }, [session]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use mock data
      setShop(mockShop);
      setForm({
        name: mockShop.name,
        description: mockShop.description,
        category: mockShop.category,
        address: { ...mockShop.address },
        email: mockShop.contact.email,
        phone: mockShop.contact.phone,
        logo: null,
        banner: null,
      });
    } catch (err) {
      setError('Failed to load shop data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    if (form.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\s/g, '')))
      return 'Valid phone number is required.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSuccess('Shop updated successfully!');

      // Update local shop data
      if (shop) {
        setShop({
          ...shop,
          name: form.name,
          description: form.description,
          category: form.category,
          address: { ...form.address },
          contact: {
            email: form.email,
            phone: form.phone,
          },
          updatedAt: new Date(),
        });
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    }, 1500);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this shop? This action cannot be undone.')) {
      // Simulate delete API call
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        router.push('/gosellr/shop');
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop data...</p>
        </div>
      </div>
    );
  }

  if (error && !shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Shop</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchShopData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold mb-4">No Shop Found</h2>
          <p className="text-gray-600 mb-6">You need to create a shop first.</p>
          <Link
            href="/gosellr/shop"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Shop
          </Link>
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
              <Link
                href="/gosellr/my-shop"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Link>
              <div className="ml-8">
                <h1 className="text-2xl font-bold text-gray-900">Edit Shop</h1>
                <p className="text-sm text-gray-500">Update your shop information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                {/* Shop Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Shop Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleInput}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your shop name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInput}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe your shop and what you sell"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleSelect}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        name="address.street"
                        value={form.address.street}
                        onChange={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        name="address.city"
                        value={form.address.city}
                        onChange={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        name="address.state"
                        value={form.address.state}
                        onChange={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        name="address.zip"
                        value={form.address.zip}
                        onChange={handleInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleInput}
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="contact@yourshop.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Phone
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleInput}
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Upload */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Media (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Logo
                      </label>
                      <input
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 200x200px, PNG or JPG
                      </p>
                      {shop.logo && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-600">Current logo:</p>
                          <img
                            src={shop.logo}
                            alt="Current logo"
                            className="w-16 h-16 object-cover rounded mt-1"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Banner
                      </label>
                      <input
                        name="banner"
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 1200x300px, PNG or JPG
                      </p>
                      {shop.banner && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-600">Current banner:</p>
                          <img
                            src={shop.banner}
                            alt="Current banner"
                            className="w-full h-16 object-cover rounded mt-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                    className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Shop
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shop Overview</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">SQL Level</p>
                  <p className="text-lg font-semibold text-blue-600">{shop.sqlLevel}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shop.rating} ⭐ ({shop.reviewCount} reviews)
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <p className="text-lg font-semibold text-gray-900">{shop.totalProducts}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${shop.totalSales.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-sm text-gray-900">{shop.createdAt.toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-sm text-gray-900">{shop.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
