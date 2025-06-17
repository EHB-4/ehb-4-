import React from 'react';
import SearchResults from '../../../components/SearchResults';

// Placeholder data (in a real app, fetch from backend)
const searchResults = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
    rating: 4.8,
  },
];

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <SearchResults results={searchResults} query={query} />
    </div>
  );
}

// AI Guidance: This page displays search results based on the query parameter.
// In a real app, search results would be fetched from the backend based on the query. 