import { promises as fs } from 'fs';
import path from 'path';

import glob from 'glob';

interface TypeDefinition {
  name: string;
  properties: string[];
}

const commonTypes: TypeDefinition[] = [
  {
    name: 'User',
    properties: [
      'id: string',
      'name: string',
      'email: string',
      'sqllevel: number',
      'role: string',
      'createdAt: Date',
      'updatedAt: Date',
    ],
  },
];

async function findTypeFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob('./types/**/*.ts', (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

async function ensureTypeDefinitions(): Promise<void> {
  const files = await findTypeFiles();
  const typesDir = './types';

  // Create types directory if it doesn't exist
  await fs.mkdir(typesDir, { recursive: true });

  // Check if we need to create or update the types file
  const typesFilePath = path.join(typesDir, 'user.ts');
  let existingContent = '';
  try {
    existingContent = await fs.readFile(typesFilePath, 'utf-8');
  } catch (error) {
    // File doesn't exist, we'll create it
  }

  // Generate type definitions
  const userType = commonTypes.find(t => t.name === 'User');
  if (userType) {
    const typeContent = `export interface ${userType.name} {
  ${userType.properties.join(';\n  ')};
}

// Add any additional type guards or utilities here
export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.sqllevel === 'number'
  );
}
`;

    if (typeContent !== existingContent) {
      await fs.writeFile(typesFilePath, typeContent);
      console.log(`Updated type definitions in: ${typesFilePath}`);
    }
  }
}

async function main() {
  await ensureTypeDefinitions();
  console.log('Type definitions have been updated');
}

main().catch(console.error);
