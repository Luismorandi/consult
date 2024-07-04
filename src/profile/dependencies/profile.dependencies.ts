import { ProfileUserCases } from "../application/profile.userCases";
import { MongoRepository } from "../infrastructure/repository/mongo/mongo.repository";

export const setupProfileDependecies = () => {
  const MongoProfileRepository = new MongoRepository(); // Reemplaza MongoRepository con tu repositorio real
  const postUserCase = new ProfileUserCases(MongoProfileRepository); // Reemplaza PostUserCase con tu caso de uso real
  return new PostController(postUserCase); // Reemplaza PostController con tu controlador real
};
