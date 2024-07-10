import { injectable } from "inversify";
import { ProfileEntity } from "../../../domain/profile.entity";
import { IProfileRepository } from "../../../domain/profile.repository";
import { ProfileValue } from "../../../domain/profile.value";
import ProfileModel, { ProfileDocument } from "./model/profile.schema";

@injectable()
export class MongoRepository implements IProfileRepository {
  async create(profile: ProfileValue): Promise<ProfileEntity> {
    try {
      const createProfile = await ProfileModel.create(profile);
      return this.toDomain(createProfile);
    } catch (err) {
      throw new Error(`Not posible create profile`);
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

  private toDomain(profileMongo: ProfileDocument): ProfileEntity {
    return new ProfileValue({
      id: profileMongo._id.toString(),
      name: profileMongo.name,
      born_experience: profileMongo.born_experience,
      last_name: profileMongo.last_name,
      specialist: profileMongo.specialist,
      picture_url: profileMongo.picture_url,
      type: profileMongo.type,
    });
  }
}
