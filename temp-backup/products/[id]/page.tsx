import React from 'react';

import AddToCartButton from '../../../components/AddToCartButton';
import Reviews from '../../../components/Reviews';

// Placeholder product data (in a real app, fetch by ID)
const productData = {
  id: 1,
  name: 'Sample Physical Product',
  description: 'A great product for everyone.',
  price: 100,
  image: 'https://via.placeholder.com/300',
};

export default function ProductDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{productData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={productData.image} alt={productData.name} className="w-full rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">{productData.description}</p>
          <p className="text-2xl font-bold mb-4">${productData.price}</p>
          <AddToCartButton productId={productData.id} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <Reviews productId={productData.id} />
      </div>
      {/* AI Guidance: In a real app, this page fetches product data by ID and handles cart functionality. */}
    </div>
  );
}
