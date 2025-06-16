import React from 'react';

// Placeholder product data
const products = [
  { id: 1, name: 'Sample Physical Product', type: 'Physical', price: 100 },
  { id: 2, name: 'Sample Digital Product', type: 'Digital', price: 50 },
];

export default function ProductsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="mb-4 flex justify-end">
        {/* In future: Only show to admin */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Product</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Type: {product.type}</p>
            <p className="text-gray-800 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 