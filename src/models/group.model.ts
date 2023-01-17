import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface GroupInput {
  userId: UserDocument["_id"];
  title: string;
  upcs: number[];
}

export interface GroupDocument extends GroupInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    upcs: { type: [Number], required: true },
  },
  {
    timestamps: true,
  }
);

const GroupModel = model<GroupDocument>("Group", GroupSchema);

export default GroupModel;
