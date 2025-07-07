'use client';

'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiMapPin } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  shop: {
    id: string;
    name: string;
    city: string;
    rating: number;
  };
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-blue-600">${product.price}</span>
              <div className="flex items-center text-yellow-400">
                <FiStar className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.shop.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{product.category}</span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <FiMapPin className="w-4 h-4 mr-1" />
                {product.shop.city}
              </div>
              <div className="flex space-x-2">
                <button className="text-red-500 hover:text-red-600" aria-label="Add to wishlist">
                  <FiHeart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock === 0}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
