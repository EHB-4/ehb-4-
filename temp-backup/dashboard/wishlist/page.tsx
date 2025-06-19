import { Heart, ShoppingCart, Trash } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const wishlistItems = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
  },
];

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(item => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-square relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                <Heart className="h-4 w-4 fill-current" />
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                  <Trash className="h-4 w-4" />
                </Button>
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
