import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['In-Person', 'Virtual', 'Hybrid'], default: 'In-Person' },
    status: { type: String, enum: ['draft', 'published', 'cancelled'], default: 'draft' },
    workflowConfig: { type: mongoose.Schema.Types.Mixed, default: {} },
    location: { type: String, default: '' },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

eventSchema.index({ organizerId: 1 });
eventSchema.index({ status: 1 });
export default mongoose.model('Event', eventSchema);
