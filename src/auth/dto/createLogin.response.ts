import { ProfileEntity } from "../../profile/domain/profile.entity";

export interface ILogin {
  profile: ProfileEntity;
  token: string;
}
