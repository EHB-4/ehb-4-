const { MongoClient } = require('mongodb');

async function testMongoDB() {
  try {
    console.log('🚀 Testing MongoDB connection...');

    // Simple connection test
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    // Try to connect
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // List databases
    const databasesList = await client.db().admin().listDatabases();
    console.log('📦 Available databases:');
    databasesList.databases.forEach(db => console.log(`  - ${db.name}`));

    // Test simple ping
    console.log('\n🔄 Testing ping...');
    const pingResult = await client.db().admin().ping();
    console.log('✅ Ping successful:', pingResult.ok === 1);
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
  }
}

// Run the test
testMongoDB();
