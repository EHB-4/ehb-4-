import React from 'react';
import InventoryManagement from '../../../components/InventoryManagement';

// Placeholder data (in a real app, fetch from backend)
const inventoryData = [
  {
    id: 1,
    name: 'Premium Headphones',
    sku: 'PH-001',
    quantity: 50,
    price: 199.99,
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    sku: 'WM-001',
    quantity: 100,
    price: 49.99,
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    sku: 'KB-001',
    quantity: 75,
    price: 129.99,
    category: 'Electronics',
  },
];

export default function InventoryPage() {
  const handleAddProduct = (product: any) => {
    // In a real app, this would call the backend to add a new product
    console.log('Adding product:', product);
  };

  const handleUpdateProduct = (id: number, product: any) => {
    // In a real app, this would call the backend to update the product
    console.log('Updating product:', id, product);
  };

  const handleDeleteProduct = (id: number) => {
    // In a real app, this would call the backend to delete the product
    console.log('Deleting product:', id);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Inventory Management</h1>
      
      <InventoryManagement
        products={inventoryData}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}

// AI Guidance: This page manages the product inventory.
// In a real app, inventory data would be fetched from the backend and updated in real-time. 