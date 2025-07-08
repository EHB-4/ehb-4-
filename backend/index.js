const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const data = require('./data');

app.get('/', (req, res) => {
  res.send('Welcome to EHB Backend!');
});

app.get('/api/company-info', (req, res) => {
  res.json(data.companyInfo);
});

app.get('/api/departments', (req, res) => {
  res.json(data.departments);
});

app.get('/api/services', (req, res) => {
  res.json(data.services);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});