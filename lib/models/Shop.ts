import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

export interface Shop {
  _id: ObjectId;
  name: string;
  description: string;
  ownerId: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  coverImage: string;
  category: string;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShopInput {
  name: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  coverImage: string;
  category: string;
}

export interface UpdateShopInput extends Partial<CreateShopInput> {}

export interface ShopStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
}

export function validateShopData(shop: Partial<Shop>): string | null {
  if (!shop.name || shop.name.length < 3) {
    return 'Shop name must be at least 3 characters long';
  }
  if (!shop.city) {
    return 'City is required';
  }
  if (!shop.email || !shop.phone) {
    return 'Email and phone are required';
  }
  return null;
}

export function calculateShopRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Number((sum / ratings.length).toFixed(1));
}

const shopSchema = new mongoose.Schema<Shop>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    logo: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    totalReviews: { type: Number, required: true },
    totalProducts: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IShop extends Document {}

const Shop = mongoose.models.Shop || mongoose.model<IShop>('Shop', shopSchema);

export default Shop;
