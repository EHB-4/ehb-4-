import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResults from '../../../components/SearchResults';

// Placeholder search results data (in a real app, fetch from backend)
const searchResultsData = [
  { id: 1, name: 'Sample Physical Product', price: 100, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Sample Digital Product', price: 50, image: 'https://via.placeholder.com/300' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      <SearchResults results={searchResultsData} />
      {/* AI Guidance: In a real app, this page fetches search results from the backend based on the query. */}
    </div>
  );
} 