import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Placeholder product data (in a real app, fetch by ID)
const productData = {
  id: 1,
  name: 'Sample Physical Product',
  description: 'A great product for everyone.',
  price: 100,
  type: 'Physical',
  image: null as File | null,
};

export default function EditProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: productData.name,
    description: productData.description,
    price: productData.price.toString(),
    type: productData.type,
    image: productData.image,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send updated product to backend here
    if (!form.name || !form.price) {
      setError('Name and price are required');
      return;
    }
    setSuccess(true);
    setError('');
    // Optionally redirect or show success message
    setTimeout(() => router.push('/products'), 1500);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          Product updated successfully!
        </div>
      )}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="Product name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Product description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            min={0}
            placeholder="Product price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Physical">Physical</option>
            <option value="Digital">Digital</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mt-1 block w-full"
            placeholder="Product image"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
      {/* AI Guidance: In a real app, this form fetches product by ID, updates backend, and handles image upload. */}
    </div>
  );
}
