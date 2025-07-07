const { MongoClient } = require('mongodb');

async function testMongoDB() {
  try {
    console.log('🚀 Starting MongoDB Detailed Test...');

    // Test different connection strings
    const testURIs = [
      'mongodb://localhost:27017',
      'mongodb://localhost:27017/ehb_main',
      'mongodb://localhost:27017/ehb_main?retryWrites=true&w=majority',
    ];

    for (const uri of testURIs) {
      console.log(`\n🔍 Testing connection with: ${uri}`);
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });

      try {
        // Connect with timeout
        await client.connect();
        console.log('✅ Connected successfully');

        // Test database operations
        const db = client.db('ehb_main');

        // Test collection creation
        console.log('\n🔄 Testing collection operations...');
        const testCollection = db.collection('test_collection_' + Date.now());

        // Insert test document
        const testDoc = {
          name: 'Test Document',
          timestamp: new Date(),
          test: true,
        };

        console.log('📝 Inserting test document...');
        const insertResult = await testCollection.insertOne(testDoc);
        console.log('✅ Insert successful:', insertResult.insertedId);

        // Find the document
        console.log('\n🔍 Finding document...');
        const foundDoc = await testCollection.findOne({ test: true });
        console.log('✅ Found document:', foundDoc);

        // Update the document
        console.log('\n📝 Updating document...');
        const updateResult = await testCollection.updateOne(
          { test: true },
          { $set: { updated: true } }
        );
        console.log('✅ Update successful:', updateResult.modifiedCount);

        // Delete the document
        console.log('\n🗑️ Deleting document...');
        const deleteResult = await testCollection.deleteOne({ test: true });
        console.log('✅ Delete successful:', deleteResult.deletedCount);

        // Test database stats
        console.log('\n📊 Testing database stats...');
        const stats = await db.stats();
        console.log('✅ Database stats:', {
          size: stats.dataSize,
          collections: stats.collections,
          storageSize: stats.storageSize,
        });
      } catch (error) {
        console.error('❌ Connection Error:', error.message);
      } finally {
        await client.close();
        console.log('✅ Connection closed');
      }
    }
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

// Run the test
testMongoDB();
