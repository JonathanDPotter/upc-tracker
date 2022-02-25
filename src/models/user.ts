import { Schema, model } from "mongoose";
import Iuser from "../interfaces/user";

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<Iuser>("User", UserSchema);
