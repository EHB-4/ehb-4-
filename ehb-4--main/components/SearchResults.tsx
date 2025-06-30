import React from 'react';
import Link from 'next/link';

interface SearchResult {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {results.map((result) => (
        <div key={result.id} className="border rounded-lg overflow-hidden">
          <img src={result.image} alt={result.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-medium">{result.name}</h3>
            <p className="text-gray-600">${result.price}</p>
            <Link href={`/products/${result.id}`}>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// AI Guidance: This component displays a list of search results.
// In a real app, these results are fetched from the backend based on the search query. 