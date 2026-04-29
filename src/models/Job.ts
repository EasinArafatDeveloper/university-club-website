import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  deadline: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  applyLink: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
