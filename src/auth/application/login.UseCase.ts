import { inject, injectable } from "inversify";

import { REPOSITORIES } from "../../config/constants/repository.constants";
import { IUserRepository } from "../../user/domain/user.repository";
import { IRoleRepository } from "../../role/domain/role.repository";
import { IProfileRepository } from "../../profile/domain/profile.repository";
import { Helper } from "../../helpers/helpers";
import { CreateLoginBody } from "../infrastructure/dto/createLogin.body";
import { ILogin } from "../dto/createLogin.response";

@injectable()
export class LoginUserCase {
  private helper = new Helper();
  constructor(
    @inject(REPOSITORIES.PROFILE)
    private readonly profileRepository: IProfileRepository,
    @inject(REPOSITORIES.USER)
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(input: CreateLoginBody): Promise<ILogin | null> {
    try {
      const user = await this.userRepository.getByEmail(input.email);
      if (!user) throw new Error("user not found");
      const checkPassword = this.helper.hash.compare(
        input.password,
        user.password
      );
      if (!checkPassword) {
        throw new Error("Password is incorrect");
      }

      const profile = await this.profileRepository.getByUser(user.id);
      if (!profile) throw new Error("we've a error with the profile");

      return {
        profile,
        token: this.helper.tokenizer.generate(profile),
      };
    } catch (err) {
      throw err;
    }
  }
}
