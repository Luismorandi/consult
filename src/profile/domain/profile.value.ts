import { v4 as uuid } from "uuid";
import { CreateProfileDTO } from "./profile.dto";
import { ProfileEntity } from "./profile.entity";

export class ProfileValue implements ProfileEntity {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  description: string;
  role_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: CreateProfileDTO) {
    (this.id = input.id),
      (this.first_name = input.first_name),
      (this.last_name = input.last_name),
      (this.avatar = input.avatar),
      (this.description = input.description),
      (this.updated_at = input.updated_at),
      (this.created_at = input.created_at),
      (this.role_id = input.role_id),
      (this.user_id = input.user_id);
  }

  private update() {
    this.updated_at = new Date();
  }

  public setFirstName(firstName: string) {
    this.first_name = firstName;
    this.update();
  }
  public setLastName(lastName: string) {
    this.last_name = lastName;
    this.update();
  }
  public setAvatar(avatar: string) {
    this.avatar = avatar;
    this.update();
  }
  public setDescription(description: string) {
    this.description = description;
    this.update();
  }
}
