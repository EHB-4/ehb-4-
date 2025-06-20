
const { PrismaClient } = require('@prisma/client');

async function seedDatabase() {
  const prisma = new PrismaClient();
  
  try {
    // Create test user
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedpassword123',
        role: 'USER'
      }
    });
    
    // Create test product
    const product = await prisma.product.upsert({
      where: { id: 'test-product-1' },
      update: {},
      create: {
        id: 'test-product-1',
        name: 'Test Product',
        description: 'A test product for development',
        price: 99.99,
        category: 'test',
        stock: 10,
        images: ['https://example.com/image.jpg']
      }
    });
    
    console.log('✅ Database seeded successfully');
    console.log('👤 Test user created:', user.email);
    console.log('📦 Test product created:', product.name);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
