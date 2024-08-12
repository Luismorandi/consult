import { ProfileEntity } from "./profile.entity";
import { ProfileValue } from "./profile.value";

export interface IProfileRepository {
  create(profile: ProfileEntity): Promise<ProfileEntity>;
  getById(id: string): Promise<ProfileEntity | null>;
  getByUser(user_id: string): Promise<ProfileEntity | null>;
}
