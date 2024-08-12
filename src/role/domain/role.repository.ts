import { RoleEntity } from "./role.entity";

export interface IRoleRepository {
  create(profile: RoleEntity): Promise<RoleEntity>;
  getByName(name: string): Promise<RoleEntity | null>;
}
