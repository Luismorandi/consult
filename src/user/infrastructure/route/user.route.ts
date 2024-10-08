import { Router } from "express";
import { BuildDependencies } from "../../../dependencies/init";

const userRoute = Router();
const controllers = new BuildDependencies().init();

userRoute.post("/user", controllers.createUserController.createUser);
userRoute.get("/user/:id", controllers.getByIdUserController.getById);

export default userRoute;
