import { Router } from "express";
import { BuildDependencies } from "../../../dependencies/init";

const profileRoute = Router();
const controllers = new BuildDependencies().init();

profileRoute.post(
  "/profile",
  controllers.createProfileController.createProfile
);
profileRoute.get("/profile/:id", controllers.getByIdProfileController.getById);
export default profileRoute;
