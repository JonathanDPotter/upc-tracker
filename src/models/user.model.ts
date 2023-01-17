import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  username: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
