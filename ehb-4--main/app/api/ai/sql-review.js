const express = require('express');
const router = express.Router();

// POST /api/ai/sql-review
router.post('/', async (req, res) => {
  try {
    const { userId, currentLevel, reviews, rating, totalOrders, complaints, daysActive } = req.body;
    let score = 0;
    let reasons = [];
    if (daysActive > 30) { score += 10; reasons.push('Active > 30 days'); }
    if (rating >= 4.5) { score += 15; reasons.push('Rating ≥ 4.5'); }
    if (totalOrders >= 30) { score += 20; reasons.push('Completed 30+ orders'); }
    if (complaints === 0) { score += 15; reasons.push('No complaints'); }
    else if (complaints <= 2) { score += 10; reasons.push('≤ 2 complaints'); }
    else if (complaints > 2) { score -= 15; reasons.push('> 2 complaints'); }
    if (rating < 4.0) { score -= 20; reasons.push('Rating < 4.0'); }

    let suggestedLevel = 'Hold';
    if (score >= 80) suggestedLevel = 'Normal';
    else if (score >= 60) suggestedLevel = 'Review';
    else suggestedLevel = 'Hold';

    res.json({
      suggestedLevel,
      reason: `User completed ${totalOrders} orders with ${rating} rating and ${complaints} complaint(s)`,
      score,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 