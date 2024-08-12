import { injectable } from "inversify";
import { ProfileEntity } from "../../../domain/profile.entity";
import { IProfileRepository } from "../../../domain/profile.repository";
import { ProfileValue } from "../../../domain/profile.value";
import ProfileModel, { ProfileDocument } from "./model/profile.schema";

@injectable()
export class ProfileMongoRepository implements IProfileRepository {
  async create(profile: ProfileValue): Promise<ProfileEntity> {
    try {
      const createProfile = await ProfileModel.create(profile);
      return this.toDomain(createProfile);
    } catch (err) {
      throw new Error(`Not possible create profile`);
    }
  }

  async getById(id: string): Promise<ProfileEntity | null> {
    try {
      const profile = await ProfileModel.findById(id);
      if (!profile) return null;
      return this.toDomain(profile);
    } catch (err) {
      throw new Error(`Not found profile`);
    }
  }

  async getByUser(user_id: string): Promise<ProfileEntity | null> {
    try {
      const profile = await ProfileModel.findOne({ user_id: user_id });
      if (!profile) return null;
      return this.toDomain(profile);
    } catch (err) {
      throw new Error(`Not found profile`);
    }
  }

  private toDomain(profileMongo: ProfileDocument): ProfileEntity {
    const profile = new ProfileValue({
      id: profileMongo.id.toString(),
      first_name: profileMongo.first_name,
      last_name: profileMongo.last_name,
      description: profileMongo.description,
      avatar: profileMongo.avatar,
      role_id: profileMongo.role_id,
      user_id: profileMongo.user_id,
      created_at: profileMongo.created_at,
      updated_at: profileMongo.updated_at,
    });
    return profile;
  }
}
