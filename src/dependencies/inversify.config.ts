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

const container = new Container();

container
  .bind<IProfileRepository>(REPOSITORIES.PROFILE)
  .to(ProfileMongoRepository);

//crete profile
container.bind<CreateProfileUserCase>(CreateProfileUserCase).toSelf();
container.bind<CreateProfileController>(CreateProfileController).toSelf();

container.bind<IUserRepository>(REPOSITORIES.USER).to(UserMongoRepository);

//crete profile
container.bind<CreateUserUserCase>(CreateUserUserCase).toSelf();
container.bind<CreateUserController>(CreateUserController).toSelf();
//get profile by id

export { container };
