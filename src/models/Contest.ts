import mongoose, { Schema, Document } from "mongoose";

export interface IContest extends Document {
  title: string;
  category: string;
  deadline: string;
  status: "Open" | "Ongoing" | "Closed";
  prize: string;
  description: string;
  eligibility: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContestSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: String, required: true },
  status: { type: String, enum: ["Open", "Ongoing", "Closed"], default: "Open" },
  prize: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.models.Contest || mongoose.model<IContest>("Contest", ContestSchema);
