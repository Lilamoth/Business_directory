const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { protect } = require('../middleware/authMiddleware');

// GET: Fetch activity logs for current user
router.get('/my', protect, async (req, res) => {
  try {
    const logs = await Activity.find({ user: req.user.userId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add new activity (optional if not handled in controllers)
router.post('/', protect, async (req, res) => {
  const { action } = req.body;

  try {
    const newActivity = new Activity({
      user: req.user.userId,
      action,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
