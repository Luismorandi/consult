import { inject, injectable } from "inversify";

import { REPOSITORIES } from "../../config/constants/repository.constants";
import { IRoleRepository } from "../domain/role.repository";
import { CreateRoleDTO } from "../domain/role.dto";
import { RoleEntity } from "../domain/role.entity";
import { RoleValue } from "../domain/role.value";

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject(REPOSITORIES.ROLE)
    private readonly roleRepository: IRoleRepository
  ) {}

  public async execute(input: CreateRoleDTO): Promise<RoleEntity | null> {
    try {
      const role = new RoleValue(input);
      const create = await this.roleRepository.create(role);
      return create;
    } catch (err) {
      throw err;
    }
  }
}
