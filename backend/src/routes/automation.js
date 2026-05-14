import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import AutomationRule from '../models/AutomationRule.js';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /automation — Create automation rule (PRD 4)
router.post(
  '/',
  requireAuth,
  [
    body('eventId').isMongoId(),
    body('trigger').trim().notEmpty(),
    body('action').trim().notEmpty(),
    body('conditions').optional().isObject(),
    body('enabled').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const rule = await AutomationRule.create({
      eventId: req.body.eventId,
      trigger: req.body.trigger,
      action: req.body.action,
      conditions: req.body.conditions ?? {},
      enabled: req.body.enabled ?? true,
    });
    res.status(201).json(rule);
  }
);

// GET /automation?eventId= — List rules for event
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

    const rules = await AutomationRule.find({ eventId: req.query.eventId }).sort({ createdAt: -1 }).lean();
    res.json(rules);
  }
);

// PUT /automation/:id
router.put(
  '/:id',
  requireAuth,
  [
    param('id').isMongoId(),
    body('trigger').optional().trim().notEmpty(),
    body('action').optional().trim().notEmpty(),
    body('conditions').optional().isObject(),
    body('enabled').optional().isBoolean(),
  ],
  async (req, res) => {
    const rule = await AutomationRule.findById(req.params.id);
    if (!rule) return res.status(404).json({ error: 'Rule not found' });
    const event = await Event.findById(rule.eventId);
    if (!event || (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin')) {
      return res.status(403).json({ error: 'Not allowed' });
    }
    const allowed = ['trigger', 'action', 'conditions', 'enabled'];
    allowed.forEach((k) => { if (req.body[k] !== undefined) rule[k] = req.body[k]; });
    await rule.save();
    res.json(rule);
  }
);

// DELETE /automation/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const rule = await AutomationRule.findById(req.params.id);
  if (!rule) return res.status(404).json({ error: 'Rule not found' });
  const event = await Event.findById(rule.eventId);
  if (!event || (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Not allowed' });
  }
  await AutomationRule.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
