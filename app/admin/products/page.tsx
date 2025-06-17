import React from 'react';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProductManagementPage() {
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any>(null);

  const handleAddProduct = (data: any) => {
    // TODO: Implement product creation
    console.log('Adding product:', data);
    setShowAddForm(false);
  };

  const handleEditProduct = (data: any) => {
    // TODO: Implement product update
    console.log('Updating product:', data);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    // TODO: Implement product deletion
    console.log('Deleting product:', productId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <ProductForm onSubmit={handleAddProduct} />
        </div>
      )}

      {editingProduct && (
        <div className="mb-8">
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleEditProduct}
            isEditing
          />
        </div>
      )}

      <ProductGrid
        products={[]} // TODO: Fetch products from API
        onAddToCart={() => {}}
        onAddToWishlist={() => {}}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
        isAdmin
      />
    </div>
  );
} 