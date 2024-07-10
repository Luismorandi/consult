import { Container } from "inversify";
import { IProfileRepository } from "../profile/domain/profile.repository";
import { MongoRepository } from "../profile/infrastructure/repository/mongo/mongo.repository";
import { CreateProfileUserCase } from "../profile/application/crateProfile.userCases";
import { CreateProfileController } from "../profile/infrastructure/controller/createProfile.controller";
import { REPOSITORIES } from "../config/constants/repository.constants";

const container = new Container();

container.bind<IProfileRepository>(REPOSITORIES.PROFILE).to(MongoRepository);

//crete profile
container.bind<CreateProfileUserCase>(CreateProfileUserCase).toSelf();
container.bind<CreateProfileController>(CreateProfileController).toSelf();

//get profile by id

export { container };
