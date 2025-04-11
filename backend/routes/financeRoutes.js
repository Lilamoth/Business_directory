// backend/routes/financeRoutes.js

const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET finance data by businessId ✅
router.get('/business/:businessId', protect, authorize('business'), async (req, res) => {
  try {
    const finance = await Finance.findOne({ business: req.params.businessId });

    if (!finance) {
      return res.status(404).json({ message: 'Finance data not found' });
    }

    res.json(finance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PUT update finance data by businessId
router.put('/business/:businessId', protect, authorize('business'), async (req, res) => {
  try {
    const updated = await Finance.findOneAndUpdate(
      { business: req.params.businessId },
      req.body,
      { new: true, upsert: true } // ✅ if not found, create
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
