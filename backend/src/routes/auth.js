import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /auth/signup — Register new user (PRD 4)
router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().notEmpty(),
    body('password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, name, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name: name.trim(),
      password: hashed,
      role: 'user',
    });

    const token = signToken({ userId: user._id });
    const safe = { userId: user._id, email: user.email, name: user.name, role: user.role };
    res.status(201).json({ user: safe, token });
  }
);

// POST /auth/login — Login user (PRD 4)
router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const token = signToken({ userId: user._id });
    const safe = { userId: user._id, email: user.email, name: user.name, role: user.role };
    res.json({ user: safe, token });
  }
);

// GET /auth/me — Current user (for frontend to validate token)
router.get('/me', requireAuth, (req, res) => {
  res.json({
    user: {
      userId: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

export default router;
