import { ObjectId, Schema, model, Types } from "mongoose";

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    specialist: { type: String },
    picture_url: { type: String },
    born_experience: { type: Date },
    type: { type: String },
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
