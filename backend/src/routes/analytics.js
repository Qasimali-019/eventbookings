import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import AnalyticsLog from '../models/AnalyticsLog.js';
import Event from '../models/Event.js';
import Attendee from '../models/Attendee.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /analytics — Fetch event analytics (PRD 4)
router.get(
  '/',
  requireAuth,
  [query('eventId').isMongoId(), query('metricKey').optional().trim(), query('from').optional(), query('to').optional()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.query.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const filter = { eventId: req.query.eventId };
    if (req.query.metricKey) filter.metricKey = req.query.metricKey;
    if (req.query.from || req.query.to) {
      filter.timestamp = {};
      if (req.query.from) filter.timestamp.$gte = new Date(req.query.from);
      if (req.query.to) filter.timestamp.$lte = new Date(req.query.to);
    }

    const logs = await AnalyticsLog.find(filter).sort({ timestamp: -1 }).limit(500).lean();

    // Aggregate counts for dashboard: registrations, check-ins
    const [totalRegistered, totalCheckedIn] = await Promise.all([
      Attendee.countDocuments({ eventId: req.query.eventId, status: { $ne: 'cancelled' } }),
      Attendee.countDocuments({ eventId: req.query.eventId, status: 'checked_in' }),
    ]);

    res.json({
      eventId: req.query.eventId,
      summary: { totalRegistered, totalCheckedIn },
      logs,
    });
  }
);

// POST /analytics — Log a metric (internal or from frontend)
router.post(
  '/',
  requireAuth,
  [
    body('eventId').isMongoId(),
    body('metricKey').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const log = await AnalyticsLog.create({
      eventId: req.body.eventId,
      metricKey: req.body.metricKey,
      value: req.body.value ?? req.body,
      timestamp: req.body.timestamp ? new Date(req.body.timestamp) : new Date(),
    });
    res.status(201).json(log);
  }
);

export default router;
