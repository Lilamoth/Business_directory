const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all business users (used in recipient dropdown)
router.get('/', protect, async (req, res) => {
  try {
    const businesses = await User.find({ role: 'business' }).select('_id name email');
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Get single business by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const business = await User.findById(req.params.id).select('-password');
    if (!business || business.role !== 'business') {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update business profile (must be logged-in business)
router.put('/:id', protect, authorize('business'), async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const updates = {
      name: req.body.name,
      businessType: req.body.businessType,
      contact: req.body.contact,
      description: req.body.description,
    };

    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete business profile (must be logged-in business)
router.delete('/:id', protect, authorize('business'), async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'You can only delete your own profile' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Business profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
