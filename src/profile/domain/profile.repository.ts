import { CreateProfileDTO } from "./profile.dto";
import { IProfile } from "./profile.entity";
import { Profile } from "./profile.value";

export interface ProfileRepository {
  create(profile: Profile): Promise<Profile>;
  getById(id: string): Promise<Profile>;
}
