import { inject, injectable } from "inversify";
import { CreateProfileDTO } from "../domain/profile.dto";
import { IProfileRepository } from "../domain/profile.repository";
import { ProfileEntity } from "../domain/profile.entity";
import { ProfileValue } from "../domain/profile.value";
import { REPOSITORIES } from "../../config/constants/repository.constants";

@injectable()
export class CreateProfileUserCase {
  constructor(
    @inject(REPOSITORIES.PROFILE)
    private readonly profileRepository: IProfileRepository
  ) {}

  public async execute(input: CreateProfileDTO): Promise<ProfileEntity | null> {
    try {
      const profile = new ProfileValue(input);
      const create = await this.profileRepository.create(profile);
      return create;
    } catch (err) {
      throw err;
    }
  }
}
