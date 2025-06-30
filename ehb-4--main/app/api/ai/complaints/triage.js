const express = require('express');
const router = express.Router();

// POST /api/ai/complaints/triage
router.post('/', async (req, res) => {
  try {
    const { complaintText = '', serviceType, userSQL, submittedAt } = req.body;
    // Simple keyword-based AI logic
    const text = complaintText.toLowerCase();
    let urgency = 'Normal';
    let category = 'General';
    let recommendedEscalation = 'Sub Franchise';
    let suggestedFine = 0;
    let status = 'Needs Verification';
    let franchiseLevel = 'Sub';
    let aiComment = '';

    // Keyword detection
    if (text.includes('not responding') || text.includes('late') || text.includes('delay')) {
      urgency = 'High';
      category = 'Communication Delay';
      aiComment = 'Delay detected';
      suggestedFine = 10;
    }
    if (text.includes('fraud') || text.includes('scam')) {
      urgency = 'Critical';
      category = 'Fraud';
      aiComment = 'Fraud keyword detected';
      suggestedFine = 50;
    }
    if (text.includes('deadline')) {
      urgency = 'High';
      category = 'Missed Deadline';
      aiComment = 'Deadline issue detected';
      suggestedFine = 15;
    }
    // Escalation logic (mock)
    if (urgency === 'High' || urgency === 'Critical') {
      recommendedEscalation = 'Master Franchise';
      franchiseLevel = 'Sub';
      aiComment += ', escalate to Master';
    }
    // If userSQL is VIP, escalate faster
    if (userSQL === 'VIP') {
      recommendedEscalation = 'Corporate';
      franchiseLevel = 'Master';
      aiComment += ', VIP user escalation';
    }
    res.json({
      urgency,
      category,
      recommendedEscalation,
      suggestedFine,
      status,
      franchiseLevel,
      aiComment: aiComment.trim(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 