import { Router } from "express";
import { BuildDependencies } from "../../../dependencies/init";
import { Auth } from "../../../helpers/middlewares/auth";
import { roles } from "../../../role/domain/role.dto";

const profileRoute = Router();
const controllers = new BuildDependencies().init();
const authUser = new Auth().checkAuth;
const authUserRole = new Auth().checkRole;

profileRoute.post(
  "/profile",
  controllers.createProfileController.createProfile
);
profileRoute.get(
  "/profile/:id",
  authUser,
  controllers.getByIdProfileController.getById
);
export default profileRoute;
