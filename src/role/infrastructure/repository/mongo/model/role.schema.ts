import { Schema, model, Types } from "mongoose";

const RoleSchema = new Schema(
  {
    type: {
      type: String,
    },
    permissions: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
export interface RoleDocument extends Document {
  id: Types.ObjectId;

  createdAt: Date;
  type: string;
  updatedAt: Date;
  permissions: string[];
}

const RoleModel = model<RoleDocument>("role", RoleSchema);

export default RoleModel;
