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
  },
  {
    timestamps: true,
  }
);
export interface ProfileDocument extends Document {
  id: Types.ObjectId;
  name: string;
  last_name: string;
  specialist: string;
  picture_url: string;
  born_experience: Date;
  type: string;
  update_at: Date;
}

const ProfileModel = model<ProfileDocument>("profile", ProfileSchema);

export default ProfileModel;
