export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

// In a real app, use a database
const products = [
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category');
  const minRating = searchParams.get('minRating');

  let results = products;

  if (query) {
    results = results.filter(product => product.name.toLowerCase().includes(query));
  }

  if (category) {
    results = results.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  if (minRating) {
    results = results.filter(product => product.rating >= parseFloat(minRating));
  }

  return NextResponse.json(results);
}

// AI Guidance: This API route handles product search.
// In a real app, it would use a search engine or database query and include proper error handling.
