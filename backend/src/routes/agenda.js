import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import AgendaItem from '../models/AgendaItem.js';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /agenda — Create agenda item (PRD 4)
router.post(
  '/',
  requireAuth,
  [
    body('eventId').isMongoId(),
    body('title').trim().notEmpty(),
    body('startTime').isISO8601(),
    body('endTime').isISO8601(),
    body('speakerIds').optional().isArray(),
    body('location').optional().isString(),
    body('config').optional().isObject(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const item = await AgendaItem.create({
      eventId: req.body.eventId,
      title: req.body.title,
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
      speakerIds: req.body.speakerIds ?? [],
      location: req.body.location ?? '',
      config: req.body.config ?? {},
    });
    res.status(201).json(item);
  }
);

// GET /agenda?eventId= — List agenda items for event
router.get(
  '/',
  query('eventId').isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const items = await AgendaItem.find({ eventId: req.query.eventId })
      .sort({ startTime: 1 })
      .populate('speakerIds', 'name email')
      .lean();
    res.json(items);
  }
);

// PUT /agenda/:id — Update agenda item
router.put(
  '/:id',
  requireAuth,
  [
    param('id').isMongoId(),
    body('title').optional().trim().notEmpty(),
    body('startTime').optional().isISO8601(),
    body('endTime').optional().isISO8601(),
    body('speakerIds').optional().isArray(),
    body('location').optional().isString(),
    body('config').optional().isObject(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const item = await AgendaItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Agenda item not found' });
    const event = await Event.findById(item.eventId);
    if (!event || (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin')) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const allowed = ['title', 'startTime', 'endTime', 'speakerIds', 'location', 'config'];
    allowed.forEach((k) => { if (req.body[k] !== undefined) item[k] = req.body[k]; });
    if (item.startTime) item.startTime = new Date(item.startTime);
    if (item.endTime) item.endTime = new Date(item.endTime);
    await item.save();
    res.json(item);
  }
);

// DELETE /agenda/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const item = await AgendaItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Agenda item not found' });
  const event = await Event.findById(item.eventId);
  if (!event || (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Not allowed' });
  }
  await AgendaItem.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
