"use client";

import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistGridProps {
  items: WishlistItem[];
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}

export function WishlistGrid({ items, onRemove, onAddToCart }: WishlistGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            <p className="text-2xl font-bold mt-2">${item.price}</p>
          </CardContent>
          <CardFooter className="p-4 flex justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button onClick={() => onAddToCart(item.id)} className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
