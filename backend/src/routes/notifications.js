import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /notifications — Send email/SMS (PRD 4). Stub implementation; wire SendGrid/Twilio later.
router.post(
  '/',
  requireAuth,
  [
    body('eventId').optional().isMongoId(),
    body('channel').isIn(['email', 'sms']),
    body('to').notEmpty(), // email or phone
    body('subject').optional().isString(),
    body('body').optional().isString(),
    body('template').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    if (req.body.eventId) {
      const event = await Event.findById(req.body.eventId);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not allowed' });
      }
    }

    // Stub: in production, dispatch via SendGrid (email) / Twilio (SMS)
    const result = {
      id: `notif_${Date.now()}`,
      channel: req.body.channel,
      to: req.body.to,
      status: 'queued',
      message: 'Notification queued (stub). Configure SendGrid/Twilio for delivery.',
    };
    res.status(202).json(result);
  }
);

export default router;
