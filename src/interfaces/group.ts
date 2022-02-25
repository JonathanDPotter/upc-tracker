import { Document } from "mongoose";

export default interface Igroup extends Document {
  title: string;
  upcs: number[];
}

export interface InewGroup {
  title: string;
  upcs: number[];
}
