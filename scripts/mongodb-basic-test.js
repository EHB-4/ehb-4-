const { MongoClient } = require('mongodb');

async function testMongoDB() {
  try {
    console.log('🚀 Testing basic MongoDB operations...');

    // Simple connection
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('✅ Connected to MongoDB');

    // Test basic operations
    const db = client.db('ehb_main');
    const testCollection = db.collection('test_basic');

    // Insert a document
    console.log('\n📝 Inserting document...');
    const insertResult = await testCollection.insertOne({
      name: 'Basic Test',
      timestamp: new Date(),
    });
    console.log('✅ Insert successful:', insertResult.insertedId);

    // Find the document
    console.log('\n🔍 Finding document...');
    const foundDoc = await testCollection.findOne({});
    console.log('✅ Found document:', foundDoc);

    // Delete the document
    console.log('\n🗑️ Deleting document...');
    const deleteResult = await testCollection.deleteOne({});
    console.log('✅ Delete successful:', deleteResult.deletedCount);
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
  }
}

// Run the test
testMongoDB();
