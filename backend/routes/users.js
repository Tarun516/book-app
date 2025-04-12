const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // In a real app, you would compare hashed passwords
    // Here we do a simple comparison since no encryption was required
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Return user info (in a real app, you'd return a JWT token)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobileNumber: user.mobileNumber
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;