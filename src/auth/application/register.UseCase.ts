import { inject, injectable } from "inversify";

import { REPOSITORIES } from "../../config/constants/repository.constants";
import { IUserRepository } from "../../user/domain/user.repository";
import { IRoleRepository } from "../../role/domain/role.repository";
import { UserValue } from "../../user/domain/user.value";
import { UUID } from "mongodb";
import { IProfileRepository } from "../../profile/domain/profile.repository";
import { CreateRegisterBody } from "../infrastructure/dto/createRegister.body";
import { ProfileEntity } from "../../profile/domain/profile.entity";
import { ProfileValue } from "../../profile/domain/profile.value";
import { Helper } from "../../helpers/helpers";

@injectable()
export class RegisterUserCase {
  private helper = new Helper();
  constructor(
    @inject(REPOSITORIES.PROFILE)
    private readonly profileRepository: IProfileRepository,
    @inject(REPOSITORIES.USER)
    private readonly userRepository: IUserRepository,
    @inject(REPOSITORIES.ROLE)
    private readonly roleRepository: IRoleRepository
  ) {}

  public async execute(
    input: CreateRegisterBody
  ): Promise<ProfileEntity | null> {
    try {
      const user = new UserValue({
        email: input.email,
        password: this.helper.hash.encrypt(input.password),
        created_at: input.created_at,
        updated_at: input.updated_at,
        id: "null",
      });
      const createUser = await this.userRepository.create(user);
      if (!createUser)
        throw new Error("Not was created user in register profile");

      const role = await this.roleRepository.getByName(input.role);
      if (!role) throw new Error("Not was created user in register profile");
      const profile = new ProfileValue({
        first_name: input.first_name,
        last_name: input.last_name,
        avatar: input.avatar,
        description: input.description,
        updated_at: input.updated_at,
        created_at: input.created_at,
        role_id: role.id,
        user_id: createUser.id,
        id: UUID.generate().toString(),
      });
      const createProfile = await this.profileRepository.create(profile);
      if (!createProfile)
        throw new Error("Not was created profile in register profile");

      return createProfile;
    } catch (err) {
      throw err;
    }
  }
}
