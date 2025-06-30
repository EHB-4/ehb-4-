const express = require('express');
const router = express.Router();

// POST /api/validator/apply
router.post('/', async (req, res) => {
  try {
    const { userId, walletBalance, lockedCoins, sqlLevel, totalOrders, complaints, franchiseRole } = req.body;
    let eligible = true;
    let score = 0;
    let comment = [];

    // Locked coins
    if (lockedCoins >= 10000) { score += 30; } else { eligible = false; comment.push('Must lock at least 10,000 coins'); }
    // Wallet balance
    if (walletBalance >= 1000) { score += 20; } else { eligible = false; comment.push('Wallet balance must be ≥ 1,000'); }
    // SQL level
    if (['High', 'VIP'].includes(sqlLevel)) { score += 20; } else { eligible = false; comment.push('SQL level must be High or VIP'); }
    // Complaint ratio
    const complaintRatio = totalOrders > 0 ? (complaints / totalOrders) : 1;
    if (complaintRatio < 0.02) { score += 15; } else { eligible = false; comment.push('Complaint ratio must be <2%'); }
    // Activity (assume true for now)
    score += 7;
    // Franchise role bonus
    if (franchiseRole && ['Master Franchise', 'Corporate'].includes(franchiseRole)) { score += 8; }

    if (eligible) {
      comment.push(`Excellent performance with only ${complaints} complaint${complaints !== 1 ? 's' : ''} in ${totalOrders} orders`);
    }
    res.json({ eligible, score, comment: comment.join('; ') });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 