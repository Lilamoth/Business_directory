const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');

// Send a message
router.post('/', protect, async (req, res) => {
  const { recipient, content } = req.body;

  console.log('📨 Send Message Request:', {
    from: req.user.userId,
    to: recipient,
    content
  });

  if (!recipient || !content) {
    return res.status(400).json({ message: 'Recipient and content are required.' });
  }

  if (recipient === req.user.userId) {
    return res.status(400).json({ message: 'You cannot message yourself.' });
  }

  try {
    const message = new Message({
      sender: req.user.userId,
      recipient,
      content
    });

    await message.save();
    res.status(201).json({ message: '✅ Message sent successfully!', data: message });
  } catch (err) {
    console.error('❌ Error sending message:', err.message);
    res.status(500).json({ message: 'Server error while sending message.' });
  }
});

// Get inbox (messages received)
router.get('/inbox', protect, async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.userId })
      .populate('sender', 'name email role')
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sent messages
router.get('/sent', protect, async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user.userId })
      .populate('recipient', 'name email role')
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get both inbox and sent messages
router.get('/', protect, async (req, res) => {
  try {
    const inbox = await Message.find({ recipient: req.user.userId })
      .populate('sender', 'name email role')
      .sort({ createdAt: -1 });

    const sent = await Message.find({ sender: req.user.userId })
      .populate('recipient', 'name email role')
      .sort({ createdAt: -1 });

    res.json({ inbox, sent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
