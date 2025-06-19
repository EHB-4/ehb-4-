import * as fs from 'fs/promises';
import * as path from 'path';

interface TypeDefinition {
  name: string;
  content: string;
}

const commonTypes: TypeDefinition[] = [
  {
    name: 'User',
    content: `export interface User {
    id: string;
    name: string;
    email: string;
    sqllevel: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}`,
  },
  {
    name: 'Product',
    content: `export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}`,
  },
];

async function ensureTypeDefinitions(): Promise<void> {
  const typesDir = path.join(process.cwd(), 'types');

  // Create types directory if it doesn't exist
  await fs.mkdir(typesDir, { recursive: true });

  // Create or update type definition files
  for (const type of commonTypes) {
    const filePath = path.join(typesDir, `${type.name.toLowerCase()}.ts`);
    try {
      await fs.writeFile(filePath, type.content);
      console.log(`✅ Updated type definition for ${type.name}`);
    } catch (error) {
      console.error(`❌ Error creating type definition for ${type.name}:`, error);
    }
  }
}

async function main(): Promise<void> {
  console.log('🔍 Starting type fixes...');
  await ensureTypeDefinitions();
  console.log('✅ Type fixes completed');
}

main().catch(console.error);
