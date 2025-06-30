import React from "react";

const sqlColors = {
  Free: "bg-gray-300 text-gray-700",
  Basic: "bg-blue-200 text-blue-800",
  Normal: "bg-green-200 text-green-800",
  High: "bg-purple-200 text-purple-800",
  VIP: "bg-yellow-200 text-yellow-900",
};

const ProductCardAdvanced = ({
  productId,
  title,
  image,
  price,
  oldPrice,
  sellerName,
  sqlLevel,
  location,
  stock,
  aiTags = [],
  rating,
  reviewCount,
  deliveryEstimate,
  verified,
  onAddToCart,
  onDetails,
  onSave,
}) => {
  // Only show AI badge if verified and SQL >= Normal
  const showAIBadge = verified && ["Normal", "High", "VIP"].includes(sqlLevel);
  const sqlBadgeClass = sqlColors[sqlLevel] || sqlColors["Free"];
  const lowStock = stock <= 5;

  return (
    <div className="border rounded-lg shadow-md bg-white p-4 max-w-xs relative group">
      {/* Product Image */}
      <div className="relative mb-3">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
        {!verified && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80">Unverified</span>
        )}
        {showAIBadge && (
          <span className="absolute top-2 right-2 bg-ehb-primary text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            🧠 AI Verified
          </span>
        )}
      </div>
      {/* Seller & SQL */}
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1">
          {verified && <span className="text-ehb-primary">✔️</span>}
          <span className="font-semibold text-sm">{sellerName}</span>
        </span>
        <span className={`text-xs px-2 py-1 rounded ${sqlBadgeClass}`}>SQL: {sqlLevel}</span>
      </div>
      {/* Title */}
      <div className="font-bold text-base mb-1 truncate">{title}</div>
      {/* Price & Discount */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold text-ehb-primary">${price.toFixed(2)}</span>
        {oldPrice && oldPrice > price && (
          <span className="line-through text-gray-400 text-sm">${oldPrice.toFixed(2)}</span>
        )}
        {oldPrice && oldPrice > price && (
          <span className="text-green-600 text-xs font-semibold">🔻 -{Math.round(((oldPrice-price)/oldPrice)*100)}%</span>
        )}
      </div>
      {/* Stock & Location */}
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs ${lowStock ? "text-red-600 font-bold" : "text-gray-600"}`}>📦 Stock: {stock} {lowStock && "(Low!)"}</span>
        <span className="text-xs text-gray-500">📍 {location}</span>
      </div>
      {/* AI Tags */}
      {aiTags.length > 0 && (
        <div className="mb-1 flex flex-wrap gap-1">
          {aiTags.map((tag) => (
            <span key={tag} className="bg-ehb-primary/10 text-ehb-primary text-xs px-2 py-0.5 rounded-full">#{tag}</span>
          ))}
        </div>
      )}
      {/* Rating, Reviews, Delivery */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <span>⭐ {rating}</span>
        <span>| 🔁 {reviewCount} Reviews</span>
        <span>| 🕒 {deliveryEstimate}</span>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          className="flex-1 bg-ehb-primary text-white py-1 rounded hover:bg-ehb-primary-dark"
          onClick={() => onAddToCart && onAddToCart(productId)}
        >
          🛒 Add to Cart
        </button>
        <button
          className="flex-1 bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300"
          onClick={() => onDetails && onDetails(productId)}
        >
          📄 Details
        </button>
        <button
          className="flex-0 bg-white border border-gray-300 text-red-500 py-1 px-2 rounded hover:bg-red-50"
          onClick={() => onSave && onSave(productId)}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default ProductCardAdvanced; 