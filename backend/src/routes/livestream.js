import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import Event from '../models/Event.js';
import EventModule from '../models/EventModule.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /livestream/connect — Connect virtual session (PRD 4). Store link in event module config.
router.post(
  '/connect',
  requireAuth,
  [
    body('eventId').isMongoId(),
    body('provider').optional().isString(), // Zoom, Google Meet, etc.
    body('joinLink').optional().isURL(),
    body('embedConfig').optional().isObject(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (String(event.organizerId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    let mod = await EventModule.findOne({ eventId: req.body.eventId, type: 'HYBRID' });
    if (!mod) {
      mod = await EventModule.create({
        eventId: req.body.eventId,
        type: 'HYBRID',
        config: {
          provider: req.body.provider ?? 'Zoom',
          joinLink: req.body.joinLink ?? '',
          embedConfig: req.body.embedConfig ?? {},
        },
        order: 0,
      });
    } else {
      mod.config = {
        ...mod.config,
        provider: req.body.provider ?? mod.config.provider,
        joinLink: req.body.joinLink ?? mod.config.joinLink,
        embedConfig: req.body.embedConfig ?? mod.config.embedConfig,
      };
      await mod.save();
    }

    res.json({ success: true, module: mod });
  }
);

// GET /livestream/:eventId — Get virtual session config for event (e.g. for attendee join)
router.get(
  '/:eventId',
  param('eventId').isMongoId(),
  async (req, res) => {
    const mod = await EventModule.findOne({ eventId: req.params.eventId, type: 'HYBRID' }).lean();
    if (!mod) return res.status(404).json({ error: 'No virtual session for this event' });
    res.json({ joinLink: mod.config?.joinLink, provider: mod.config?.provider });
  }
);

export default router;
