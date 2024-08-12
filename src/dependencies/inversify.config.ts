import { Container } from "inversify";
import { IProfileRepository } from "../profile/domain/profile.repository";
import { ProfileMongoRepository } from "../profile/infrastructure/repository/mongo/mongo.repository";
import { CreateProfileUserCase } from "../profile/application/crateProfile.userCases";
import { CreateProfileController } from "../profile/infrastructure/controller/createProfile.controller";
import { REPOSITORIES } from "../config/constants/repository.constants";
import { IUserRepository } from "../user/domain/user.repository";
import { UserMongoRepository } from "../user/infrastructure/repository/mongo/mongo.repository";
import { CreateUserUserCase } from "../user/application/crateUser.userCases";
import { CreateUserController } from "../user/infrastructure/controller/createUser.controller";
import { RoleMongoRepository } from "../role/infrastructure/repository/mongo/mongo.repository";
import { IRoleRepository } from "../role/domain/role.repository";
import { CreateRoleUseCase } from "../role/application/crateRole.useCase";
import { CreateRoleController } from "../role/infrastructure/controller/createRole.controller";
import { RegisterUserCase } from "../auth/application/register.UseCase";
import { RegisterController } from "../auth/infrastructure/controller/register.controller";
import { GetByIdProfileUserCase } from "../profile/application/getByIdProfile.userCase";
import { GetByIdUserController } from "../user/infrastructure/controller/getById.controller";
import { GetByIdUserUserCase } from "../user/application/getById.userCase";
import { GetByIdProfileController } from "../profile/infrastructure/controller/getById.controller";
import { LoginUserCase } from "../auth/application/login.UseCase";
import { LoginController } from "../auth/infrastructure/controller/login.controller";

const container = new Container();

//profile repo
container
  .bind<IProfileRepository>(REPOSITORIES.PROFILE)
  .to(ProfileMongoRepository);

//crete profile
container.bind<CreateProfileUserCase>(CreateProfileUserCase).toSelf();
container.bind<CreateProfileController>(CreateProfileController).toSelf();

//get profile
container.bind<GetByIdProfileUserCase>(GetByIdProfileUserCase).toSelf();
container.bind<GetByIdProfileController>(GetByIdProfileController).toSelf();

//user repo
container.bind<IUserRepository>(REPOSITORIES.USER).to(UserMongoRepository);

//crete user
container.bind<CreateUserUserCase>(CreateUserUserCase).toSelf();
container.bind<CreateUserController>(CreateUserController).toSelf();
//get user
container.bind<GetByIdUserUserCase>(GetByIdUserUserCase).toSelf();
container.bind<GetByIdUserController>(GetByIdUserController).toSelf();

//get role by id
container.bind<IRoleRepository>(REPOSITORIES.ROLE).to(RoleMongoRepository);

//crete role
container.bind<CreateRoleUseCase>(CreateRoleUseCase).toSelf();
container.bind<CreateRoleController>(CreateRoleController).toSelf();

//auth
container.bind<RegisterUserCase>(RegisterUserCase).toSelf();
container.bind<RegisterController>(RegisterController).toSelf();
container.bind<LoginUserCase>(LoginUserCase).toSelf();
container.bind<LoginController>(LoginController).toSelf();

export { container };
