const express = require('express');
const app = express();
const port = 5001; // AWS test server

// Middleware
app.use(express.json());

// AWS endpoints
app.use('/users', require('./aws/users'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    provider: 'aws',
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`AWS test server running on port ${port}`);
});
