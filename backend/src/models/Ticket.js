import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 0 },
    soldCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ticketSchema.index({ eventId: 1 });
export default mongoose.model('Ticket', ticketSchema);
