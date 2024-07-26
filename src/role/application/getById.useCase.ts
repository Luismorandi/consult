import { inject, injectable } from "inversify";

import { REPOSITORIES } from "../../config/constants/repository.constants";
import { IRoleRepository } from "../domain/role.repository";
import { RoleEntity } from "../domain/role.entity";

@injectable()
export class GetByIdRoleUseCase {
  constructor(
    @inject(REPOSITORIES.ROLE)
    private readonly roleRepository: IRoleRepository
  ) {}

  public async execute(id: string): Promise<RoleEntity | null> {
    try {
      const role = await this.roleRepository.getById(id);
      return role;
    } catch (err) {
      throw err;
    }
  }
}
