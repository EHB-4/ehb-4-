const express = require('express');
const router = express.Router();

// Mock data for testing
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', provider: 'google' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', provider: 'google' },
];

router.get('/', (req, res) => {
  res.json({
    users,
    timestamp: new Date().toISOString(),
    provider: 'google',
  });
});

router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    provider: 'google',
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
