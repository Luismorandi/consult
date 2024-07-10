import { CreateProfileController } from "../profile/infrastructure/controller/createProfile.controller";
import { container } from "./inversify.config";

export class BuildDependencies {
  public init() {
    const createProfileController = container.get<CreateProfileController>(
      CreateProfileController
    );

    return { createProfileController };
  }
}
