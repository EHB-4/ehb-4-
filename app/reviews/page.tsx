import React from 'react';
import ProductReviews from '../../../components/ProductReviews';

// Placeholder data (in a real app, fetch from backend)
const reviewsData = {
  product: {
    id: 1,
    name: 'Premium Headphones',
    image: 'https://via.placeholder.com/150',
    averageRating: 4.5,
    totalReviews: 128,
  },
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent sound quality and very comfortable!',
      date: '2024-03-15',
      verified: true,
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Great headphones, but a bit pricey.',
      date: '2024-03-14',
      verified: true,
    },
    {
      id: 3,
      user: 'Bob Johnson',
      rating: 5,
      comment: 'Best headphones I've ever owned!',
      date: '2024-03-13',
      verified: true,
    },
  ],
};

export default function ReviewsPage() {
  const handleAddReview = (review: any) => {
    // In a real app, this would call the backend to add a new review
    console.log('Adding review:', review);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Reviews</h1>
      
      <ProductReviews
        product={reviewsData.product}
        reviews={reviewsData.reviews}
        onAddReview={handleAddReview}
      />
    </div>
  );
}

// AI Guidance: This page displays product reviews and allows users to add new reviews.
// In a real app, reviews would be fetched from the backend and updated in real-time. 