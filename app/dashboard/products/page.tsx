import React from 'react';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProductsPage() {
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any>(null);
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (data: any) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      await fetchProducts();
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleEditProduct = async (data: any) => {
    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      await fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      await fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
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
        products={products}
        onAddToCart={() => {}}
        onAddToWishlist={() => {}}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
        isAdmin
      />
    </div>
  );
} 