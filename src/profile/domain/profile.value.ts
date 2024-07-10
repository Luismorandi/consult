import { v4 as uuid } from "uuid";
import { CreateProfileDTO } from "./profile.dto";
import { ProfileEntity } from "./profile.entity";

export class ProfileValue implements ProfileEntity {
  id: string;
  name: string;
  last_name: string;
  picture_url: string;
  specialist: string;
  born_experience: Date;
  update_at: Date;
  type: string;

  constructor(input: CreateProfileDTO) {
    (this.id = input.id),
      (this.name = input.name),
      (this.last_name = input.last_name),
      (this.picture_url = input.picture_url),
      (this.specialist = input.specialist),
      (this.born_experience = input.born_experience),
      (this.update_at = new Date()),
      (this.type = input.type);
  }

  private update() {
    this.update_at = new Date();
  }

  public setName(name: string) {
    this.name = name;
    this.update();
  }
  public setLastName(lastName: string) {
    this.last_name = lastName;
    this.update();
  }
  public setPictureUrl(pictureUrl: string) {
    this.picture_url = pictureUrl;
    this.update();
  }
  public setSpecialist(specialist: string) {
    this.specialist = specialist;
    this.update();
  }

  public setBornExprience(bornExprience: Date) {
    this.born_experience = bornExprience;
    this.update();
  }
}
