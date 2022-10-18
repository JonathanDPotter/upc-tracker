import { Document } from "mongoose";

export default interface Igroup extends Document {
  title: string;
  upcs: number[];
  userId: string;
}

export interface InewGroup {
  title: string;
  upcs: number[];
  userId: string;
}
