"use client";

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface FranchiseType {
  id: string;
  name: string;
  description: string;
  investment: string;
  category: string;
  image: string;
}

interface FranchiseTypeCardProps {
  franchise: FranchiseType;
  onClick: (franchise: FranchiseType) => void;
}

export default function FranchiseTypeCard({ franchise, onClick }: FranchiseTypeCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(franchise)}
    >
      <div className="relative h-48 bg-gray-200 rounded-t-lg">
        <img
          src={franchise.image}
          alt={franchise.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{franchise.name}</h3>

        <p className="text-gray-600 text-sm mb-3">{franchise.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{franchise.category}</span>
          <span className="text-lg font-semibold text-green-600">{franchise.investment}</span>
        </div>
      </div>
    </div>
  );
}
