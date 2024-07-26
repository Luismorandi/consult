import { UserEntity } from "./user.entity";

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  getById(id: string): Promise<UserEntity | null>;
}
