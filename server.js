import { createServer } from 'http';
import { parse } from 'url';

import cors from 'cors';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const frontendPort = 3002;
const backendPort = 5002;

// Initialize Next.js
const app = next({ dev, hostname, port: frontendPort });
const handle = app.getRequestHandler();

// Initialize Express for backend
const backend = express();
backend.use(cors());
backend.use(express.json());

// Import backend routes
import authRoutes from './ehb-backend/routes/auth.js';

// Use backend routes
backend.use('/api/auth', authRoutes);

// Health check endpoint
backend.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start both servers
app.prepare().then(() => {
  // Create frontend server
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(frontendPort, err => {
    if (err) throw err;
    console.log(`> Frontend ready on http://${hostname}:${frontendPort}`);
  });

  // Start backend server
  backend.listen(backendPort, err => {
    if (err) throw err;
    console.log(`> Backend ready on http://${hostname}:${backendPort}`);
  });
});
