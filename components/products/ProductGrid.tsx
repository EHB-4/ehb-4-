import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Edit, Trash } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  rating: number;
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  isAdmin?: boolean;
}

export function ProductGrid({
  products,
  onAddToCart,
  onAddToWishlist,
  onEdit,
  onDelete,
  isAdmin = false,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-square relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {product.description}
            </p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAddToWishlist(product)}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
            {isAdmin && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit?.(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete?.(product.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 