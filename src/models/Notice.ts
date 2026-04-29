import mongoose, { Schema, model, models } from "mongoose";

const NoticeSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" }, // General, Urgent, Event, etc.
    postedBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Notice = models.Notice || model("Notice", NoticeSchema);
export default Notice;
