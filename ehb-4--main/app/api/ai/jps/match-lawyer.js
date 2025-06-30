const express = require('express');
const router = express.Router();
// const Lawyer = require('../../../models/Lawyer'); // Uncomment for real DB

// Mock lawyers data for demo
const mockLawyers = [
  {
    _id: '64a7b501',
    name: 'Adv. Saira Khan',
    city: 'Lahore',
    specializations: ['Criminal', 'Civil'],
    sqlLevel: 'High',
    lastActive: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    reviews: 15,
    rating: 4.6,
    online: true,
  },
  {
    _id: '64a7b502',
    name: 'Adv. Imran Ali',
    city: 'Lahore',
    specializations: ['Criminal'],
    sqlLevel: 'Normal',
    lastActive: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    reviews: 8,
    rating: 4.2,
    online: false,
  },
  {
    _id: '64a7b503',
    name: 'Adv. Fatima Noor',
    city: 'Lahore',
    specializations: ['Family', 'Criminal'],
    sqlLevel: 'VIP',
    lastActive: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    reviews: 22,
    rating: 4.9,
    online: true,
  },
];

// POST /api/ai/jps/match-lawyer
router.post('/', async (req, res) => {
  try {
    const { caseType, city, urgency, availability, minimumRating, sqlRequired } = req.body;
    // In real: const lawyers = await Lawyer.find({ city, ... })
    let lawyers = mockLawyers.filter(l =>
      l.city === city &&
      l.specializations.includes(caseType) &&
      (!sqlRequired || ['Normal', 'High', 'VIP'].includes(l.sqlLevel)) &&
      (!minimumRating || l.rating >= minimumRating) &&
      (!availability || (availability === 'onlineOnly' ? l.online : true))
    );
    // Scoring
    lawyers = lawyers.map(l => {
      let score = 0;
      let reasons = [];
      if (['High', 'VIP'].includes(l.sqlLevel)) { score += 10; reasons.push('High SQL Level'); }
      if (Date.now() - l.lastActive < 7 * 24 * 60 * 60 * 1000) { score += 8; reasons.push('Recently active'); }
      if (l.reviews > 10) { score += 5; reasons.push('Positive reviews > 10'); }
      if (l.online) { score += 3; reasons.push('Online now'); }
      return { ...l, score, reason: reasons.join(', ') };
    });
    // Sort by score DESC
    lawyers.sort((a, b) => b.score - a.score);
    if (!lawyers.length) return res.status(404).json({ error: 'No suitable lawyer found' });
    // Return top 1
    const top = lawyers[0];
    res.json({
      lawyerId: top._id,
      score: top.score,
      lawyerName: top.name,
      sqlLevel: top.sqlLevel,
      reason: top.reason,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 