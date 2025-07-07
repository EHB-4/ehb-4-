const express = require('express');
const router = express.Router();

// Mock data for testing
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', provider: 'aws' },
  { id: 2, name: 'Bob Wilson', email: 'bob@example.com', provider: 'aws' },
];

router.get('/', (req, res) => {
  res.json({
    users,
    timestamp: new Date().toISOString(),
    provider: 'aws',
  });
});

router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    provider: 'aws',
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
