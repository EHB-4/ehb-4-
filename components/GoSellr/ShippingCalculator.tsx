'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { FiTruck, FiMapPin, FiPackage, FiClock, FiDollarSign, FiCheck } from 'react-icons/fi';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  features: string[];
  isRecommended?: boolean;
}

interface ShippingCalculatorProps {
  originAddress: string;
  destinationAddress: string;
  packageWeight: number;
  packageDimensions: {
    length: number;
    width: number;
    height: number;
  };
  onMethodSelect: (method: ShippingMethod) => void;
}

export default function ShippingCalculator({
  originAddress,
  destinationAddress,
  packageWeight,
  packageDimensions,
  onMethodSelect,
}: ShippingCalculatorProps) {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(null);
  const [customAddress, setCustomAddress] = useState(destinationAddress);

  // Mock shipping methods - replace with API calls
  const mockShippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Regular ground shipping',
      price: 8.99,
      estimatedDays: '3-5 business days',
      features: ['Tracking included', 'Insurance up to $100', 'Signature required'],
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Fast delivery service',
      price: 15.99,
      estimatedDays: '1-2 business days',
      features: [
        'Priority handling',
        'Insurance up to $500',
        'Signature required',
        'Real-time tracking',
      ],
      isRecommended: true,
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next day delivery',
      price: 29.99,
      estimatedDays: 'Next business day',
      features: [
        'Guaranteed delivery',
        'Insurance up to $1000',
        'Signature required',
        'Priority support',
      ],
    },
    {
      id: 'free',
      name: 'Free Shipping',
      description: 'Free standard shipping',
      price: 0,
      estimatedDays: '5-7 business days',
      features: ['Free for orders over $50', 'Tracking included', 'Standard insurance'],
    },
  ];

  useEffect(() => {
    const calculateShipping = async () => {
      setLoading(true);
      try {
        // Simulate API call for shipping calculation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Adjust prices based on weight and distance
        const adjustedMethods = mockShippingMethods.map(method => ({
          ...method,
          price: method.price + packageWeight * 0.5, // Add weight-based surcharge
        }));

        setShippingMethods(adjustedMethods);
      } catch (error) {
        console.error('Error calculating shipping:', error);
      } finally {
        setLoading(false);
      }
    };

    if (originAddress && destinationAddress && packageWeight > 0) {
      calculateShipping();
    }
  }, [originAddress, destinationAddress, packageWeight, packageDimensions]);

  const handleMethodSelect = (method: ShippingMethod) => {
    setSelectedMethod(method);
    onMethodSelect(method);
  };

  const calculatePackageVolume = () => {
    return packageDimensions.length * packageDimensions.width * packageDimensions.height;
  };

  const getWeightCategory = (weight: number) => {
    if (weight <= 1) return 'Light';
    if (weight <= 5) return 'Medium';
    if (weight <= 10) return 'Heavy';
    return 'Oversized';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Shipping Calculator</h2>
        <FiTruck className="w-8 h-8 text-blue-600" />
      </div>

      {/* Package Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Package Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
            <div className="flex items-center space-x-2">
              <FiPackage className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">{packageWeight} lbs</span>
              <span className="text-xs text-gray-500">({getWeightCategory(packageWeight)})</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
            <div className="text-sm text-gray-900">
              {packageDimensions.length}" × {packageDimensions.width}" × {packageDimensions.height}"
            </div>
            <div className="text-xs text-gray-500">
              Volume: {calculatePackageVolume()} cubic inches
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <div className="flex items-center space-x-2">
              <FiMapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">{destinationAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Shipping Methods</h3>

        {shippingMethods.map(method => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedMethod?.id === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleMethodSelect(method)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{method.name}</h4>
                  {method.isRecommended && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>

                <div className="flex items-center space-x-6 mb-3">
                  <div className="flex items-center space-x-2">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{method.estimatedDays}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiDollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      ${method.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  {method.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FiCheck className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${method.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Shipping Cost</div>
                </div>
                {selectedMethod?.id === method.id && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Tips */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Shipping Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Free shipping available for orders over $50</li>
          <li>• Express shipping recommended for time-sensitive items</li>
          <li>• All packages include basic tracking</li>
          <li>• Insurance coverage varies by shipping method</li>
        </ul>
      </div>

      {/* Selected Method Summary */}
      {selectedMethod && (
        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">Selected Shipping Method</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">{selectedMethod.name}</p>
              <p className="text-xs text-green-700">{selectedMethod.estimatedDays}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-900">${selectedMethod.price.toFixed(2)}</p>
              <p className="text-xs text-green-700">Shipping Cost</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
