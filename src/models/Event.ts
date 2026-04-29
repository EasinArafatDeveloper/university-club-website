import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  type: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  status: "upcoming" | "past";
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  status: { type: String, enum: ["upcoming", "past"], default: "upcoming" }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
