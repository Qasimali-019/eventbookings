import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Attendee from '../models/Attendee.js';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = Router();

// POST /attendee — Register attendee (PRD 4)
router.post(
  '/',
  [
    body('eventId').isMongoId(),
    body('email').isEmail().normalizeEmail(),
    body('name').optional().trim(),
    body('ticketId').optional().isMongoId(),
  ],
  optionalAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.status !== 'published') return res.status(400).json({ error: 'Event is not open for registration' });

    const userId = req.user?._id || null;
    const existing = await Attendee.findOne({ eventId: req.body.eventId, $or: [{ userId }, { email: req.body.email }] });
    if (existing) return res.status(400).json({ error: 'Already registered for this event' });

    if (req.body.ticketId) {
      const ticket = await Ticket.findById(req.body.ticketId);
      if (!ticket || String(ticket.eventId) !== String(req.body.eventId)) {
        return res.status(400).json({ error: 'Invalid ticket' });
      }
      if (ticket.soldCount >= ticket.capacity) return res.status(400).json({ error: 'Ticket sold out' });
      ticket.soldCount += 1;
      await ticket.save();
    }

    const attendee = await Attendee.create({
      eventId: req.body.eventId,
      userId,
      ticketId: req.body.ticketId,
      email: req.body.email,
      name: req.body.name ?? (req.user?.name ?? ''),
      status: 'registered',
    });
    res.status(201).json(attendee);
  }
);

// GET /attendee?eventId= — List attendees for event (organizer/admin)
router.get(
  '/',
  query('eventId').isMongoId(),
  requireAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.query.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const attendees = await Attendee.find({ eventId: req.query.eventId })
      .populate('userId', 'name email')
      .populate('ticketId', 'name price')
      .sort({ createdAt: -1 })
      .lean();
    res.json(attendees);
  }
);

// PATCH /attendee/:id/checkin — Check-in attendee
router.patch(
  '/:id/checkin',
  requireAuth,
  param('id').isMongoId(),
  async (req, res) => {
    const attendee = await Attendee.findById(req.params.id);
    if (!attendee) return res.status(404).json({ error: 'Attendee not found' });
    const event = await Event.findById(attendee.eventId);
    if (!event || (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin')) {
      return res.status(403).json({ error: 'Not allowed' });
    }
    attendee.status = 'checked_in';
    attendee.checkinTime = new Date();
    await attendee.save();
    res.json(attendee);
  }
);

export default router;
