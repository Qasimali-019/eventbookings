import mongoose from 'mongoose';

const agendaItemSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    title: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    speakerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: { type: String, default: '' },
    config: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

agendaItemSchema.index({ eventId: 1 });
export default mongoose.model('AgendaItem', agendaItemSchema);
