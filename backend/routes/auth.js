// backend/routes/auth.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Signup
router.post('/register', async (req, res) => {
  const { name, mobileNumber, email, password, role } = req.body;
  try {
    const user = new User({ name, mobileNumber, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login (Mock Authentication)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error in login' });
  }
});

export default router;
