import { injectable } from "inversify";
import { UserEntity } from "../../../domain/user.entity";
import { UserValue } from "../../../domain/user.value";
import { IUserRepository } from "../../../domain/user.repository";
import UserModel, { UserDocument } from "./model/user.schema";

@injectable()
export class UserMongoRepository implements IUserRepository {
  async create(user: UserValue): Promise<UserEntity> {
    try {
      const userCreate = await UserModel.create(user);
      return this.toDomain(userCreate);
    } catch (err) {
      throw new Error(`Not possible create user`);
    }
  }

  async getById(id: string): Promise<UserEntity | null> {
    try {
      const user = await UserModel.findById(id);
      if (!user) return null;
      return this.toDomain(user);
    } catch (err) {
      throw new Error(`Not found profile`);
    }
  }

  private toDomain(userMongo: UserDocument): UserEntity {
    return new UserValue({
      id: userMongo.id.toString(),
      email: userMongo.email,
      password: userMongo.password,
      created_at: userMongo.createdAt,
      updated_at: userMongo.updatedAt,
    });
  }
}
