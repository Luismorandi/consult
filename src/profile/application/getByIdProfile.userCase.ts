import { inject, injectable } from "inversify";
import { CreateProfileDTO } from "../domain/profile.dto";
import { IProfileRepository } from "../domain/profile.repository";
import { ProfileEntity } from "../domain/profile.entity";
import { ProfileValue } from "../domain/profile.value";
import { REPOSITORIES } from "../../config/constants/repository.constants";

@injectable()
export class GetByIdProfileUserCase {
  constructor(
    @inject(REPOSITORIES.PROFILE)
    private readonly profileRepository: IProfileRepository
  ) {}

  public async execute(id: string): Promise<ProfileEntity | null> {
    try {
      const profile = await this.profileRepository.getById(id);
      return profile;
    } catch (err) {
      throw err;
    }
  }
}
