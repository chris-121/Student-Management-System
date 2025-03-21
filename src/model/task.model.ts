import mongoose, { Schema, Document, Types } from "mongoose";
import { STATUS_VALUES, Status } from "../types/taskStatus";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: Status;
  dueDate: Date;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      default: STATUS_VALUES.PENDING,
      enum: Object.values(STATUS_VALUES),
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
