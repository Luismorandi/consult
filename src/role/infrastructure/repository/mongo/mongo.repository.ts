import { injectable } from "inversify";

import ProfileModel, { RoleDocument } from "./model/role.schema";
import { RoleValue } from "../../../domain/role.value";
import { RoleEntity } from "../../../domain/role.entity";
import { IRoleRepository } from "../../../domain/role.repository";
import RoleModel from "./model/role.schema";

@injectable()
export class RoleMongoRepository implements IRoleRepository {
  async create(role: RoleValue): Promise<RoleEntity> {
    try {
      const createRole = await RoleModel.create(role);
      return this.toDomain(createRole);
    } catch (err) {
      throw new Error(`Not possible create role`);
    }
  }

  async getByName(name: string): Promise<RoleEntity | null> {
    try {
      const role = await RoleModel.findOne({ type: name });
      if (!role) return null;
      return this.toDomain(role);
    } catch (err) {
      throw new Error(`Not found role`);
    }
  }

  private toDomain(roleMongo: RoleDocument): RoleEntity {
    return new RoleValue({
      id: roleMongo.id.toString(),
      type: roleMongo.type,
      permissions: roleMongo.permissions,
      created_at: roleMongo.createdAt,
      updated_at: roleMongo.updatedAt,
    });
  }
}
