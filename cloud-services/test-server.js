const express = require('express');
const app = express();
const port = 5000; // Google Cloud test server

// Middleware
app.use(express.json());

// Google Cloud endpoints
app.use('/users', require('./google/users'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    provider: 'google',
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Google Cloud test server running on port ${port}`);
});
