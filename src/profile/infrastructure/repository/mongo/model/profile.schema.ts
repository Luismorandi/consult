import { Schema, model, Types } from "mongoose";

const ProfileSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    description: { type: String },
    avatar: { type: String },
    role_id: { type: String },
    user_id: { type: String },
  },
  {
    timestamps: true,
  }
);
export interface ProfileDocument extends Document {
  id: Types.ObjectId;
  first_name: string;
  last_name: string;
  description: string;
  avatar: string;
  created_at: Date;
  role_id: string;
  updated_at: Date;
  user_id: string;
}

const ProfileModel = model<ProfileDocument>("profile", ProfileSchema);

export default ProfileModel;
