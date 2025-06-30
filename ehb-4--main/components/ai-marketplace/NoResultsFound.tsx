import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface NoResultsFoundProps {
  query: string;
}

export default function NoResultsFound({ query }: NoResultsFoundProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <FiSearch className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No results found for "{query}"</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
}
