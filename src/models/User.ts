import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "Super Admin" | "Adviser" | "President" | "Vice President" | "General Secretary" | "Wing Head" | "Executive Member" | "General Member" | "Alumni";
  department?: string;
  batch?: string;
  wingId?: mongoose.Types.ObjectId;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for OAuth if added later
    role: { 
      type: String, 
      enum: ["Super Admin", "Adviser", "President", "Vice President", "General Secretary", "Wing Head", "Executive Member", "General Member", "Alumni"],
      default: "General Member"
    },
    department: { type: String },
    batch: { type: String },
    wingId: { type: Schema.Types.ObjectId, ref: "Wing" },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
