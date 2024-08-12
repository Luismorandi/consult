import { CreateProfileController } from "../profile/infrastructure/controller/createProfile.controller";
import { GetByIdProfileController } from "../profile/infrastructure/controller/getById.controller";
import { RegisterController } from "../auth/infrastructure/controller/register.controller";
import { CreateRoleController } from "../role/infrastructure/controller/createRole.controller";
import { CreateUserController } from "../user/infrastructure/controller/createUser.controller";
import { GetByIdUserController } from "../user/infrastructure/controller/getById.controller";
import { container } from "./inversify.config";
import { LoginController } from "../auth/infrastructure/controller/login.controller";

export class BuildDependencies {
  public init() {
    const createProfileController = container.get<CreateProfileController>(
      CreateProfileController
    );

    const createUserController =
      container.get<CreateUserController>(CreateUserController);

    const createRoleController =
      container.get<CreateRoleController>(CreateRoleController);

    const getByIdUserController = container.get<GetByIdUserController>(
      GetByIdUserController
    );

    const getByIdProfileController = container.get<GetByIdProfileController>(
      GetByIdProfileController
    );

    const createRegister =
      container.get<RegisterController>(RegisterController);

    const createLogin = container.get<LoginController>(LoginController);

    return {
      createProfileController,
      createUserController,
      createRoleController,
      createRegister,
      getByIdUserController,
      getByIdProfileController,
      createLogin,
    };
  }
}
