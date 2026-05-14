import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { connectRedis } from './config/redis.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import agendaRoutes from './routes/agenda.js';
import ticketRoutes from './routes/tickets.js';
import attendeeRoutes from './routes/attendees.js';
import automationRoutes from './routes/automation.js';
import analyticsRoutes from './routes/analytics.js';
import notificationRoutes from './routes/notifications.js';
import livestreamRoutes from './routes/livestream.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting (PRD Section 7: input validation & rate limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests' },
});
app.use(limiter);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// API routes (per PRD Section 4)
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/agenda', agendaRoutes);
app.use('/tickets', ticketRoutes);
app.use('/attendee', attendeeRoutes);
app.use('/automation', automationRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/notifications', notificationRoutes);
app.use('/livestream', livestreamRoutes);

// Health
app.get('/health', (_, res) => res.json({ ok: true, service: 'EventCraft API' }));

// 404
app.use((_, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, _, res, __) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

async function start() {
  await connectDB();
  await connectRedis(); // optional; SADD 2.2 Redis (cache + queue + pub/sub)
  app.listen(PORT, () => console.log(`EventCraft API running on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1);
});
