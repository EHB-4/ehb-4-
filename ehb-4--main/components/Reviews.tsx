import React from 'react';

interface ReviewsProps {
  productId: number;
}

// Placeholder reviews data (in a real app, fetch from backend)
const reviewsData = [
  { id: 1, user: 'User 1', rating: 5, comment: 'Great product!' },
  { id: 2, user: 'User 2', rating: 4, comment: 'Good quality.' },
];

export default function Reviews({ productId }: ReviewsProps) {
  return (
    <div className="space-y-4">
      {reviewsData.map((review) => (
        <div key={review.id} className="border rounded p-4">
          <p className="font-bold">{review.user}</p>
          <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

// AI Guidance: This component displays product reviews.
// In a real app, it fetches reviews from the backend based on the product ID. 