const User = require('../models/user');

exports.getBusinessById = async (req, res) => {
  try {
    const business = await User.findById(req.params.id).select('-password');
    if (!business || business.role !== 'business') {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
