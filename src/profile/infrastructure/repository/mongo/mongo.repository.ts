import { PostRepository } from "../../../domain/post.repository";
import { PostValue } from "../../../domain/post.value";
import { PostEntityDT0 } from "../../../domain/posts.entity";
import { CreateProfileDTO } from "../../../domain/profile.dto";
import { ProfileRepository } from "../../../domain/profile.repository";
import { Profile } from "../../../domain/profile.value";
import PostModel from "./model/post.schema";

export class MongoRepository implements ProfileRepository {
  async create(profile: Profile): Promise<Profile> {
    const post = await ProfileModel.create(profile);
    return profile;
  }

  async getById(id: string): Promise<Profile> {
    const profile = await ProfileModel.findById(id);
    return profile;
  }
}
