import mongoose from 'mongoose';

const eventModuleSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    type: { type: String, required: true }, // AGENDA, TICKETS, HYBRID, ENGAGEMENT, etc.
    config: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

eventModuleSchema.index({ eventId: 1 });
export default mongoose.model('EventModule', eventModuleSchema);
