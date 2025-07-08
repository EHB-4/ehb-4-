const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const MONGODB_URI = 'mongodb://localhost:27017/ehb_db'; // Using local MongoDB
    console.log('Using MongoDB URI:', MONGODB_URI);

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority',
    });

    console.log('MongoDB connected successfully');
    console.log('MongoDB connection state:', mongoose.connection.readyState);

    // List all databases
    const adminDb = mongoose.connection.db.admin();
    const databases = await adminDb.listDatabases();
    console.log('Available databases:', databases.databases);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testConnection();
