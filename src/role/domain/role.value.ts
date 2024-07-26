import { CreateRoleDTO } from "./role.dto";
import { RoleEntity } from "./role.entity";

export class RoleValue implements RoleEntity {
  id: string;
  type: string;
  permissions: string[];
  created_at: Date;
  updated_at: Date;

  constructor(input: CreateRoleDTO) {
    (this.id = input.id),
      (this.type = input.type),
      (this.permissions = input.permissions),
      (this.updated_at = input.updated_at),
      (this.created_at = input.created_at);
  }

  private update() {
    this.updated_at = new Date();
  }

  public setPermissions(permissions: string[]) {
    this.permissions = permissions;
    this.update();
  }
}
