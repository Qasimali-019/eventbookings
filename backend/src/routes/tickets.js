import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /tickets — Create ticket (PRD 4)
router.post(
  '/',
  requireAuth,
  [
    body('eventId').isMongoId(),
    body('name').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('capacity').isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const ticket = await Ticket.create({
      eventId: req.body.eventId,
      name: req.body.name,
      price: req.body.price,
      capacity: req.body.capacity,
    });
    res.status(201).json(ticket);
  }
);

// GET /tickets — List tickets (PRD 4); ?eventId= required
router.get(
  '/',
  query('eventId').isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const tickets = await Ticket.find({ eventId: req.query.eventId }).lean();
    res.json(tickets);
  }
);

// GET /tickets/:id
router.get('/:id', param('id').isMongoId(), async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
});

// PUT /tickets/:id
router.put(
  '/:id',
  requireAuth,
  [
    param('id').isMongoId(),
    body('name').optional().trim().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('capacity').optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    const event = await Event.findById(ticket.eventId);
    if (!event || (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin')) {
      return res.status(403).json({ error: 'Not allowed' });
    }
    if (req.body.capacity !== undefined && req.body.capacity < ticket.soldCount) {
      return res.status(400).json({ error: 'Capacity cannot be less than sold count' });
    }

    const allowed = ['name', 'price', 'capacity'];
    allowed.forEach((k) => { if (req.body[k] !== undefined) ticket[k] = req.body[k]; });
    await ticket.save();
    res.json(ticket);
  }
);

export default router;
