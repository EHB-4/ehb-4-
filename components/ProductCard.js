export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h2>
          <div className="flex items-center mb-2">
            <span className="text-xl font-bold text-indigo-600 mr-2">${product.price.toFixed(2)}</span>
            <span className={`ml-auto px-2 py-1 text-xs rounded-full font-medium ${
              product.sql === 'Free'
                ? 'bg-green-100 text-green-700'
                : product.sql === 'Basic'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              SQL: {product.sql}
            </span>
          </div>
        </div>
        <button
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          disabled
        >
          Order Now
        </button>
      </div>
    </div>
  );
} 