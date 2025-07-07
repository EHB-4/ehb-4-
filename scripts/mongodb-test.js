const { MongoClient } = require('mongodb');

async function testMongoDB() {
  try {
    // Connect to MongoDB
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🚀 Testing MongoDB connection...');

    // Try to connect
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // List databases
    const databasesList = await client.db().admin().listDatabases();
    console.log('📦 Available databases:');
    databasesList.databases.forEach(db => console.log(`  - ${db.name}`));

    // Test a simple operation
    const db = client.db('ehb_main');
    const testCollection = db.collection('test_collection');

    // Insert a test document
    const testDoc = {
      name: 'Test Document',
      timestamp: new Date(),
      test: true,
    };

    const result = await testCollection.insertOne(testDoc);
    console.log('✅ Inserted test document:', result.insertedId);

    // Find the document
    const foundDoc = await testCollection.findOne({ test: true });
    console.log('✅ Found document:', foundDoc);

    // Clean up
    await testCollection.deleteOne({ test: true });
    console.log('✅ Cleaned up test data');
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
}

// Run the test
testMongoDB();
