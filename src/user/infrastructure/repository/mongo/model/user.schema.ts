import { ObjectId, Schema, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export interface UserDocument extends Document {
  id: Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserModel = model<UserDocument>("user", UserSchema);

export default UserModel;
