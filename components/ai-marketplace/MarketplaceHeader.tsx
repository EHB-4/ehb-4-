"use client";

import React from 'react';

interface MarketplaceHeaderProps {
  title: string;
  description: string;
  totalServices: number;
  onSearch: (query: string) => void;
}

export default function MarketplaceHeader({
  title,
  description,
  totalServices,
  onSearch,
}: MarketplaceHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-blue-100 mb-6">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-blue-100">{totalServices} AI Services Available</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search AI services..."
              onChange={e => onSearch(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
