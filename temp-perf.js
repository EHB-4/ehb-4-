
const { PrismaClient } = require('@prisma/client');

async function performanceTest() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Starting performance test...');
    
    const startTime = Date.now();
    
    // Test multiple queries
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(prisma.user.findMany());
      promises.push(prisma.product.findMany());
    }
    
    await Promise.all(promises);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log('✅ Performance test completed');
    console.log('⏱️  Duration:', duration + 'ms');
    console.log('📊 Average query time:', (duration / 20) + 'ms');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
    process.exit(1);
  }
}

performanceTest();
