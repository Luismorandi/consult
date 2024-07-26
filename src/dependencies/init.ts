import { CreateProfileController } from "../profile/infrastructure/controller/createProfile.controller";
import { CreateRoleController } from "../role/infrastructure/controller/createRole.controller";
import { CreateUserController } from "../user/infrastructure/controller/createUser.controller";
import { container } from "./inversify.config";

export class BuildDependencies {
  public init() {
    const createProfileController = container.get<CreateProfileController>(
      CreateProfileController
    );

    const createUserController =
      container.get<CreateUserController>(CreateUserController);

    const createRoleController =
      container.get<CreateRoleController>(CreateRoleController);

    return {
      createProfileController,
      createUserController,
      createRoleController,
    };
  }
}
