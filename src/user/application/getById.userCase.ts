import { inject, injectable } from "inversify";
import { IUserRepository } from "../domain/user.repository";
import { REPOSITORIES } from "../../config/constants/repository.constants";
import { UserEntity } from "../domain/user.entity";

@injectable()
export class GetByIdUserUserCase {
  constructor(
    @inject(REPOSITORIES.USER)
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.getById(id);
      return user;
    } catch (err) {
      throw err;
    }
  }
}
