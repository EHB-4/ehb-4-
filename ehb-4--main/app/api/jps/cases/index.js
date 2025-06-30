const express = require('express');
const router = express.Router();
const LegalCase = require('../../../models/LegalCase');
const auth = require('../../../middleware/auth'); // Assume JWT auth middleware

// POST /api/jps/cases/create - Submit new case
router.post('/create', auth, async (req, res) => {
  try {
    const { title, caseType, description, city } = req.body;
    const userId = req.user._id; // from JWT
    const newCase = await LegalCase.create({
      userId,
      title,
      caseType,
      description,
      city,
    });
    res.status(201).json(newCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/jps/cases/my - Get my cases
router.get('/my', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cases = await LegalCase.find({ userId }).sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jps/cases/:id - Get case by ID (with user/lawyer info)
router.get('/:id', auth, async (req, res) => {
  try {
    const caseId = req.params.id;
    const legalCase = await LegalCase.findById(caseId)
      .populate('userId', 'name email')
      .populate('lawyerId', 'name email');
    if (!legalCase) return res.status(404).json({ error: 'Case not found' });
    res.json(legalCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 