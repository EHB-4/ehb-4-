import Link from 'next/link';
import React from 'react';

interface SearchResult {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Search Results for "{query}"</h1>
        <p className="mt-2 text-sm text-gray-500">Found {results.length} results</p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No results found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(result => (
            <Link key={result.id} href={`/products/${result.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">{result.name}</h3>
                  {result.category && (
                    <p className="mt-1 text-sm text-gray-500">{result.category}</p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900">
                      ${result.price.toLocaleString()}
                    </p>
                    {result.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-500">
                          {result.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// AI Guidance: This component displays search results in a modern grid layout.
// In a real app, search results would be fetched from the backend based on the query.
