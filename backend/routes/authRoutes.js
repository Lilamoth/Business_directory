const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/user'); // Import User model

// ✅ Register route (open)
router.post('/register', register);

// ✅ Login route (open)
router.post('/login', login);

// ✅ Protected test route (any authenticated user)
router.get('/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, you're authenticated.` });
});

// ✅ Role-restricted test route (businesses only)
router.get('/business-only', protect, authorize('business'), (req, res) => {
  res.json({ message: 'Welcome, Business user!' });
});

// ✅ Get all users (used for recipient dropdown in messaging)
router.get('/all', protect, async (req, res) => {
  try {
    const users = await User.find().select('_id name email role');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
});

module.exports = router;
