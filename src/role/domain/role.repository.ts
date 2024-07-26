import { RoleEntity } from "./role.entity";

export interface IRoleRepository {
  create(profile: RoleEntity): Promise<RoleEntity>;
  getById(id: string): Promise<RoleEntity | null>;
}
