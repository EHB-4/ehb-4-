const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const failoverService = require('./cloud-services/failover-service');
const healthCheck = require('./cloud-services/health-check');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/ehb_db'; // Using local MongoDB directly

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Connected to MongoDB:', MONGODB_URI);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('MongoDB URI:', MONGODB_URI);
    console.error('MongoDB connection options:', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority',
    });

    // Try to reconnect after 5 seconds
    setTimeout(() => {
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        w: 'majority',
      });
    }, 5000);
  });
const PORT = process.env.PORT || 5500;
const httpServer = require('http').createServer(app);
const socketConfig = require('./socket.config');
const io = socketConfig(httpServer);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('EHB Backend Server Running');
});

// Health check endpoints
app.get('/api/google-health', healthCheck.googleHealthCheck);
app.get('/api/aws-health', healthCheck.awsHealthCheck);

// Cloud failover endpoints
app.get('/api/data/:endpoint', async (req, res) => {
  try {
    const response = await failoverService.executeRequest(req.params.endpoint, 'GET');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      provider: failoverService.currentProvider,
    });
  }
});

app.post('/api/data/:endpoint', async (req, res) => {
  try {
    const response = await failoverService.executeRequest(req.params.endpoint, 'POST', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      provider: failoverService.currentProvider,
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// MongoDB error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
// WebSocket configuration is now handled in socket.config.js

httpServer.listen(PORT, () => {
  console.log(`🚀 EHB Backend Server running on http://localhost:${PORT}`);
  console.log('✅ Server Status: ACTIVE');
  console.log('📊 Environment:', process.env.NODE_ENV);
});

module.exports = app;
