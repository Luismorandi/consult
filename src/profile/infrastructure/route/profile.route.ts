import { Router } from "express";
import { BuildDependencies } from "../../../dependencies/init";

const profileRoute = Router();
const controllers = new BuildDependencies().init();

profileRoute.post(
  "/profile",
  controllers.createProfileController.createProfile
);

export default profileRoute;
