const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Activity = require('../models/Activity'); // ✅ Import the activity model
const { protect, authorize } = require('../middleware/authMiddleware');

// ✅ Create product (business only)
router.post('/', protect, authorize('business'), async (req, res) => {
  try {
    const product = new Product({
      business: req.user.userId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      available: req.body.available
    });

    const saved = await product.save();

    // ✅ Log activity
    await Activity.create({
      user: req.user.userId,
      action: `Added new product: ${req.body.name}`
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('business', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get products by business ID
router.get('/business/:businessId', async (req, res) => {
  try {
    const products = await Product.find({ business: req.params.businessId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
