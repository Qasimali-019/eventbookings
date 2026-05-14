import mongoose from 'mongoose';

const automationRuleSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    trigger: { type: String, required: true }, // time, attendee_count, registration, etc.
    action: { type: String, required: true }, // email, sms, etc.
    conditions: { type: mongoose.Schema.Types.Mixed, default: {} },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

automationRuleSchema.index({ eventId: 1 });
export default mongoose.model('AutomationRule', automationRuleSchema);
