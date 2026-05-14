import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin', 'organizer', 'host'], default: 'user' },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
export default mongoose.model('User', userSchema);
