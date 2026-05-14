import mongoose from 'mongoose';

const analyticsLogSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    metricKey: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

analyticsLogSchema.index({ eventId: 1, metricKey: 1, timestamp: -1 });
export default mongoose.model('AnalyticsLog', analyticsLogSchema);
