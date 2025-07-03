'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Calendar,
  Navigation,
  Star,
  User,
  Building,
  Car,
  Bike,
  Plane,
  Ship,
} from 'lucide-react';

// ========================================
// 1. DELIVERY TRACKING COMPONENT
// ========================================

interface TrackingEvent {
  id: string;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'in_transit'
    | 'out_for_delivery'
    | 'delivered'
    | 'failed';
  title: string;
  description: string;
  timestamp: Date;
  location?: string;
  estimatedTime?: string;
  actualTime?: Date;
  icon: React.ComponentType<any>;
  color: string;
}

interface DeliveryInfo {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  service: string;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'in_transit'
    | 'out_for_delivery'
    | 'delivered'
    | 'failed';
  events: TrackingEvent[];
  packageDetails: {
    weight: string;
    dimensions: string;
    items: number;
  };
  deliveryAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  sellerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  franchiseInfo?: {
    name: string;
    phone: string;
    address: string;
    rating: number;
  };
}

interface DeliveryTrackingProps {
  orderId: string;
  trackingNumber?: string;
  onClose?: () => void;
}

export default function DeliveryTracking({
  orderId,
  trackingNumber,
  onClose,
}: DeliveryTrackingProps) {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'contact'>('timeline');

  // ========================================
  // 2. INITIALIZATION
  // ========================================

  useEffect(() => {
    loadDeliveryInfo();
  }, [orderId, trackingNumber]);

  const loadDeliveryInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockDeliveryInfo: DeliveryInfo = {
        orderId,
        trackingNumber: trackingNumber || 'TRK123456789',
        carrier: 'GoSellr Express',
        service: 'Standard Delivery',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        status: 'in_transit',
        events: [
          {
            id: '1',
            status: 'confirmed',
            title: 'Order Confirmed',
            description: 'Your order has been confirmed and is being processed',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            location: 'New York, NY',
            icon: CheckCircle,
            color: 'text-green-600',
          },
          {
            id: '2',
            status: 'processing',
            title: 'Processing',
            description: 'Your order is being prepared for shipment',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            location: 'New York, NY',
            icon: Package,
            color: 'text-blue-600',
          },
          {
            id: '3',
            status: 'shipped',
            title: 'Shipped',
            description: 'Your package has been shipped',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            location: 'New York, NY',
            icon: Truck,
            color: 'text-purple-600',
          },
          {
            id: '4',
            status: 'in_transit',
            title: 'In Transit',
            description: 'Your package is on its way to you',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            location: 'Chicago, IL',
            icon: Navigation,
            color: 'text-orange-600',
          },
          {
            id: '5',
            status: 'out_for_delivery',
            title: 'Out for Delivery',
            description: 'Your package is out for delivery today',
            timestamp: new Date(),
            location: 'Los Angeles, CA',
            estimatedTime: '2:00 PM - 6:00 PM',
            icon: Car,
            color: 'text-red-600',
          },
        ],
        packageDetails: {
          weight: '2.5 lbs',
          dimensions: '12" x 8" x 4"',
          items: 1,
        },
        deliveryAddress: {
          name: 'John Doe',
          address: '123 Main Street',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
          phone: '+1 (555) 123-4567',
        },
        sellerInfo: {
          name: 'AudioTech Store',
          phone: '+1 (555) 987-6543',
          email: 'support@audiotech.com',
        },
        franchiseInfo: {
          name: 'LA Express Delivery',
          phone: '+1 (555) 456-7890',
          address: '456 Delivery Ave, Los Angeles, CA 90210',
          rating: 4.8,
        },
      };

      setDeliveryInfo(mockDeliveryInfo);
    } catch (error) {
      console.error('Error loading delivery info:', error);
      setError('Failed to load delivery information');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 3. UTILITY FUNCTIONS
  // ========================================

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'out_for_delivery':
        return 'text-red-600 bg-red-100';
      case 'in_transit':
        return 'text-orange-600 bg-orange-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'out_for_delivery':
        return Car;
      case 'in_transit':
        return Navigation;
      case 'shipped':
        return Truck;
      case 'processing':
        return Package;
      case 'confirmed':
        return CheckCircle;
      case 'failed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ========================================
  // 4. RENDER FUNCTIONS
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delivery information...</p>
        </div>
      </div>
    );
  }

  if (error || !deliveryInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Delivery</h2>
          <p className="text-gray-600 mb-4">{error || 'Unable to load delivery information'}</p>
          <button
            onClick={loadDeliveryInfo}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Delivery Tracking</h1>
              <p className="text-gray-600 mt-1">
                Order #{deliveryInfo.orderId} • {deliveryInfo.trackingNumber}
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close tracking"
                aria-label="Close delivery tracking"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${getStatusColor(deliveryInfo.status)}`}>
                {React.createElement(getStatusIcon(deliveryInfo.status), { className: 'w-6 h-6' })}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {deliveryInfo.status.replace('_', ' ')}
                </h2>
                <p className="text-gray-600">
                  Estimated delivery: {formatDate(deliveryInfo.estimatedDelivery)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Carrier</p>
              <p className="font-medium text-gray-900">{deliveryInfo.carrier}</p>
              <p className="text-sm text-gray-500">{deliveryInfo.service}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'timeline', label: 'Timeline', icon: Clock },
                { id: 'details', label: 'Details', icon: Package },
                { id: 'contact', label: 'Contact', icon: Phone },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {React.createElement(tab.icon, { className: 'w-4 h-4' })}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                {deliveryInfo.events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-2 rounded-full ${event.color.replace('text-', 'bg-').replace('-600', '-100')}`}
                      >
                        {React.createElement(event.icon, { className: 'w-4 h-4' })}
                      </div>
                      {index < deliveryInfo.events.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(event.timestamp)} at {formatTime(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      {event.location && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                      )}
                      {event.estimatedTime && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Estimated: {event.estimatedTime}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Package Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{deliveryInfo.packageDetails.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium">{deliveryInfo.packageDetails.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">{deliveryInfo.packageDetails.items}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{deliveryInfo.deliveryAddress.name}</p>
                    <p className="text-gray-600">{deliveryInfo.deliveryAddress.address}</p>
                    <p className="text-gray-600">
                      {deliveryInfo.deliveryAddress.city}, {deliveryInfo.deliveryAddress.state}{' '}
                      {deliveryInfo.deliveryAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{deliveryInfo.deliveryAddress.country}</p>
                    <p className="text-gray-600">{deliveryInfo.deliveryAddress.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Seller Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{deliveryInfo.sellerInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{deliveryInfo.sellerInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span>{deliveryInfo.sellerInfo.email}</span>
                    </div>
                  </div>
                </div>

                {deliveryInfo.franchiseInfo && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Franchise Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{deliveryInfo.franchiseInfo.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{deliveryInfo.franchiseInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{deliveryInfo.franchiseInfo.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{deliveryInfo.franchiseInfo.rating} / 5.0</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
