import mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    email: { type: String, required: true },
    name: { type: String, default: '' },
    status: { type: String, enum: ['registered', 'checked_in', 'cancelled'], default: 'registered' },
    checkinTime: { type: Date },
  },
  { timestamps: true }
);

attendeeSchema.index({ eventId: 1 });
attendeeSchema.index({ userId: 1, eventId: 1 }, { unique: true });
export default mongoose.model('Attendee', attendeeSchema);
