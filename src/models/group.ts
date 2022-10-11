import { Schema, model } from "mongoose";
import Igroup from "../interfaces/group";

const GroupSchema = new Schema({
  user: {type: String, required: true},
  title: { type: String, required: true },
  upcs: { type: [Number], required: true },
});

export default model<Igroup>("Group", GroupSchema);
