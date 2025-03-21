import mongoose, { Schema, Document } from "mongoose";
import { Role, ROLE_VALUES } from "../types/userRoles";

export interface IUser extends Document {
  name: string;
  email: string;
  role: Role;
  password: string;
  department?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      default: ROLE_VALUES.STUDENT,
      enum: Object.values(ROLE_VALUES),
    },
    password: { type: String, required: true },
    department: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
