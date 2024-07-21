const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  try {
    const user = await User.findOne({ f_userName });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: 3600 });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  try {
    let user = await User.findOne({ f_userName });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ f_userName, f_Pwd: await bcrypt.hash(f_Pwd, 10) });
    await user.save();
    res.json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
