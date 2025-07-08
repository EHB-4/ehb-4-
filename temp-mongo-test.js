const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = 'mongodb://localhost:27017/ehb_db'; // Using local MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ MongoDB connection successful');

    const db = client.db('ehb_database');
    const collections = await db.listCollections().toArray();
    console.log(
      '📊 Collections:',
      collections.map(c => c.name)
    );

    await client.close();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
