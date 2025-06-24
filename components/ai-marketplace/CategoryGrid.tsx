import React from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  selectedCategory?: string;
}

export default function CategoryGrid({
  categories,
  onCategorySelect,
  selectedCategory,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`
            p-4 rounded-lg border cursor-pointer transition-all duration-200
            ${
              selectedCategory === category.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{category.icon}</span>
            <span className="text-sm text-gray-500">{category.count}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      ))}
    </div>
  );
}
