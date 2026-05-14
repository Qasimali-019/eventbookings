import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import Event from '../models/Event.js';
import EventModule from '../models/EventModule.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /events — Create event (PRD 4)
router.post(
  '/',
  requireAuth,
  [
    body('title').trim().notEmpty(),
    body('description').optional().isString(),
    body('type').optional().isIn(['In-Person', 'Virtual', 'Hybrid']),
    body('status').optional().isIn(['draft', 'published']),
    body('location').optional().isString(),
    body('startDate').optional(),
    body('endDate').optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.create({
      organizerId: req.user._id,
      title: req.body.title,
      description: req.body.description ?? '',
      type: req.body.type ?? 'In-Person',
      status: req.body.status ?? 'draft',
      workflowConfig: req.body.workflowConfig ?? {},
      location: req.body.location ?? '',
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    const populated = await Event.findById(event._id).populate('organizerId', 'name email');
    res.status(201).json(populated);
  }
);

// GET /events — List events (PRD 4)
router.get('/', async (req, res) => {
  const { organizerId, status } = req.query;
  const filter = {};
  if (organizerId) filter.organizerId = organizerId;
  if (status) filter.status = status;
  const events = await Event.find(filter)
    .populate('organizerId', 'name email')
    .sort({ createdAt: -1 })
    .lean();
  res.json(events);
});

// GET /events/:id — Event detail (PRD 4)
router.get(
  '/:id',
  param('id').isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.params.id).populate('organizerId', 'name email');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  }
);

// POST /events/:id/modules — Add module (PRD 4)
router.post(
  '/:id/modules',
  requireAuth,
  [
    param('id').isMongoId(),
    body('type').trim().notEmpty(),
    body('config').optional().isObject(),
    body('order').optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed to add modules to this event' });
    }

    const maxOrder = await EventModule.findOne({ eventId: event._id }).sort({ order: -1 }).select('order');
    const order = req.body.order ?? (maxOrder ? maxOrder.order + 1 : 0);

    const mod = await EventModule.create({
      eventId: event._id,
      type: req.body.type,
      config: req.body.config ?? {},
      order,
    });
    res.status(201).json(mod);
  }
);

// PUT /events/:id — Update event
router.put(
  '/:id',
  requireAuth,
  [
    param('id').isMongoId(),
    body('title').optional().trim().notEmpty(),
    body('description').optional().isString(),
    body('type').optional().isIn(['In-Person', 'Virtual', 'Hybrid']),
    body('status').optional().isIn(['draft', 'published', 'cancelled']),
    body('location').optional().isString(),
    body('startDate').optional(),
    body('endDate').optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed to update this event' });
    }

    const allowed = ['title', 'description', 'type', 'status', 'location', 'startDate', 'endDate', 'workflowConfig'];
    allowed.forEach((k) => { if (req.body[k] !== undefined) event[k] = req.body[k]; });
    await event.save();
    const populated = await Event.findById(event._id).populate('organizerId', 'name email');
    res.json(populated);
  }
);

// DELETE /events/:id
router.delete(
  '/:id',
  requireAuth,
  param('id').isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed to delete this event' });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }
);

// GET /events/:id/modules — List modules for event
router.get(
  '/:id/modules',
  param('id').isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const list = await EventModule.find({ eventId: req.params.id }).sort({ order: 1 }).lean();
    res.json(list);
  }
);

export default router;
