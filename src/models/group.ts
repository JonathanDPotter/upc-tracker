import { Schema, model } from "mongoose";
import Igroup from "../interfaces/group";

const GroupSchema = new Schema({
  title: { type: String, required: true },
  upcs: { type: [Number], required: true },
  userId: { type: String, required: true },
});

export default model<Igroup>("Group", GroupSchema);
