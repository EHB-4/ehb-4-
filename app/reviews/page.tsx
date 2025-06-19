import React from 'react';

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
      comment: "Best headphones I've ever owned!",
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

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{reviewsData.product.name}</h2>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(reviewsData.product.averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {reviewsData.product.averageRating} ({reviewsData.product.totalReviews} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {reviewsData.reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-semibold">{review.user}</span>
                  {review.verified && (
                    <span className="ml-2 text-blue-600 text-sm">✓ Verified</span>
                  )}
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <p className="text-gray-500 text-sm mt-1">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
