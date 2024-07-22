import { inject, injectable } from "inversify";
import { CreateUserDTO } from "../domain/user.dto";
import { IUserRepository } from "../domain/user.repository";
import { UserEntity } from "../domain/user.entity";
import { UserValue } from "../domain/user.value";
import { REPOSITORIES } from "../../config/constants/repository.constants";

@injectable()
export class CreateUserUserCase {
  constructor(
    @inject(REPOSITORIES.USER)
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(input: CreateUserDTO): Promise<UserEntity | null> {
    try {
      const user = new UserValue(input);
      const create = await this.userRepository.create(user);
      return create;
    } catch (err) {
      throw err;
    }
  }
}
