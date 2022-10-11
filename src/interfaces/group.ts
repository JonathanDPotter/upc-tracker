import { Document } from "mongoose";

export default interface Igroup extends Document {
  user: string;
  title: string;
  upcs: number[];
}

export interface InewGroup {
  user: string;
  title: string;
  upcs: number[];
}
