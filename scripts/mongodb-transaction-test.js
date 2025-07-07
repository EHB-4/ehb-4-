const { MongoClient } = require('mongodb');

async function testMongoDB() {
  try {
    console.log('🚀 Testing MongoDB transactions...');

    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
    });

    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('ehb_main');
    const testCollection = db.collection('test_transactions');

    // Start a transaction
    console.log('\n🔄 Starting transaction...');
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Insert a document
        console.log('📝 Inserting document...');
        const insertResult = await testCollection.insertOne(
          {
            name: 'Test Transaction',
            timestamp: new Date(),
            transaction: true,
          },
          { session }
        );
        console.log('✅ Insert successful:', insertResult.insertedId);

        // Update the document
        console.log('\n📝 Updating document...');
        const updateResult = await testCollection.updateOne(
          { transaction: true },
          { $set: { updated: true } },
          { session }
        );
        console.log('✅ Update successful:', updateResult.modifiedCount);

        // Verify the transaction
        console.log('\n🔍 Verifying transaction...');
        const foundDoc = await testCollection.findOne({ transaction: true }, { session });
        console.log('✅ Document in transaction:', foundDoc);
      });

      console.log('\n✅ Transaction committed successfully');
    } catch (error) {
      console.error('❌ Transaction error:', error.message);
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
  }
}

// Run the test
testMongoDB();
