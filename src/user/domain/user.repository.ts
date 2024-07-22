import { UserEntity } from "./user.entity";
import { UserValue } from "./user.value";

export interface IUserRepository {
  create(profile: UserValue): Promise<UserEntity>;
  getById(id: string): Promise<UserEntity | null>;
}
