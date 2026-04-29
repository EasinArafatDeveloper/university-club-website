import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  semester: string;
  preferredWing: string;
  whyJoin: string;
  experience: string;
  portfolio: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  studentId: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  preferredWing: { type: String, required: true },
  whyJoin: { type: String, required: true },
  experience: { type: String },
  portfolio: { type: String },
  status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
