import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  type: "Event" | "Contest";
  referenceId: mongoose.Types.ObjectId;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ["Event", "Contest"], required: true },
  referenceId: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);
