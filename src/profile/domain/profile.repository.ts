import { CreateProfileDTO } from "./profile.dto";
import { ProfileEntity } from "./profile.entity";
import { ProfileValue } from "./profile.value";

export interface IProfileRepository {
  create(profile: ProfileValue): Promise<ProfileEntity>;
  getById(id: string): Promise<ProfileEntity | null>;
}
