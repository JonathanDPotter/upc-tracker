import { Document } from "mongoose";

export default interface Iuser extends Document {
  username: string;
  password: string;
}

export interface InewUser {
  username: string;
  password: string;
}
