import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Testing Database Connection...');

    // Test Users
    const userCount = await prisma.user.count();
    console.log(`✅ Users in database: ${userCount}`);

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        take: 3,
        select: { id: true, name: true, email: true, role: true },
      });
      console.log('📋 Sample Users:', users);
    }

    // Test Products
    const productCount = await prisma.product.count();
    console.log(`✅ Products in database: ${productCount}`);

    // Test Wallets
    const walletCount = await prisma.wallet.count();
    console.log(`✅ Wallets in database: ${walletCount}`);

    // Test Study Resources
    const resourceCount = await prisma.studyResource.count();
    console.log(`✅ Study Resources in database: ${resourceCount}`);

    // Test Certificates
    const certificateCount = await prisma.certificate.count();
    console.log(`✅ Certificates in database: ${certificateCount}`);

    console.log('\n🎉 Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
