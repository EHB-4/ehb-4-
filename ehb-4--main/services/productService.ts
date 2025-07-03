import { ObjectId } from 'mongodb';
import { clientPromise } from '../lib/mongodb';

const DB_NAME = 'gosellr'; // Change as per your DB name
const COLLECTION = 'products';

// Product type definition
export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  category: string;
  sellerId: string;
}

// Add a new product
export async function addProduct(product: Product) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION).insertOne(product);
  return result.insertedId;
}

// Get all products
export async function getProducts(filter: Partial<Product> = {}) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).find(filter).toArray();
}

// Update a product by ID
export async function updateProduct(id: string, update: Partial<Product>) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  return result.modifiedCount > 0;
}

// Delete a product by ID
export async function deleteProduct(id: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
} 