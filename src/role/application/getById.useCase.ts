import { inject, injectable } from "inversify";

import { REPOSITORIES } from "../../config/constants/repository.constants";
import { IRoleRepository } from "../domain/role.repository";
import { RoleEntity } from "../domain/role.entity";

@injectable()
export class GetByNameRoleUseCase {
  constructor(
    @inject(REPOSITORIES.ROLE)
    private readonly roleRepository: IRoleRepository
  ) {}

  public async execute(name: string): Promise<RoleEntity | null> {
    try {
      const role = await this.roleRepository.getByName(name);
      return role;
    } catch (err) {
      throw err;
    }
  }
}
