import { CreateProfileDTO } from "../domain/profile.dto";
import { ProfileRepository } from "../domain/profile.repository";
import { Profile } from "../domain/profile.value";

export class ProfileUserCases {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async createProfile(input: CreateProfileDTO): Promise<Profile> {
    try {
      const profile = new Profile(input);
      const create = await this.profileRepository.create(profile);
      return profile;
    } catch (err) {
      throw err;
    }
  }

  public async getProfile(id: string): Promise<Profile> {
    const profile = await this.profileRepository.getById(id);
    return profile;
  }
}
