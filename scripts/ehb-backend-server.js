#!/usr/bin/env node

/**
 * EHB Backend Server
 * Runs on port 8000 to serve backend API endpoints
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.argv.includes('--port')
  ? parseInt(process.argv[process.argv.indexOf('--port') + 1])
  : 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'EHB Backend',
    port: PORT,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'EHB Backend API',
    version: '1.0.0',
    endpoints: [
      '/api/auth',
      '/api/users',
      '/api/products',
      '/api/orders',
      '/api/ai-marketplace',
      '/api/wallet',
      '/api/analytics',
    ],
  });
});

// Auth endpoints
app.get('/api/auth/status', (req, res) => {
  res.json({ authenticated: false, message: 'Auth service ready' });
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json({
    users: [],
    total: 0,
    message: 'Users service ready',
  });
});

// Products endpoints
app.get('/api/products', (req, res) => {
  res.json({
    products: [],
    total: 0,
    message: 'Products service ready',
  });
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
  res.json({
    orders: [],
    total: 0,
    message: 'Orders service ready',
  });
});

// AI Marketplace endpoints
app.get('/api/ai-marketplace', (req, res) => {
  res.json({
    models: [],
    total: 0,
    message: 'AI Marketplace service ready',
  });
});

// Wallet endpoints
app.get('/api/wallet', (req, res) => {
  res.json({
    balance: 0,
    transactions: [],
    message: 'Wallet service ready',
  });
});

// Analytics endpoints
app.get('/api/analytics', (req, res) => {
  res.json({
    metrics: {},
    message: 'Analytics service ready',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 EHB Backend Server Started!

📍 Port: ${PORT}
🌐 URL: http://localhost:${PORT}
📊 Health: http://localhost:${PORT}/health
🔗 API: http://localhost:${PORT}/api

Services Available:
- Authentication
- User Management
- Product Management
- Order Management
- AI Marketplace
- Wallet Services
- Analytics

Press Ctrl+C to stop the server
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down EHB Backend Server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down EHB Backend Server...');
  process.exit(0);
});
