const { PrismaClient } = require('@prisma/client');

async function seedDatabase() {
  const prisma = new PrismaClient();

  try {
    // Create test user only
    const existingUser = await prisma.user.findUnique({ where: { email: 'test@example.com' } });
    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashedpassword123',
          role: 'USER',
        },
      });
      console.log('✅ Test user created:', user.email);
    } else {
      console.log('✅ Test user already exists:', existingUser.email);
    }

    console.log('✅ Database seeding completed successfully!');

    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
