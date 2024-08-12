import { Router } from "express";
import { BuildDependencies } from "../../../dependencies/init";

const authRoute = Router();
const controllers = new BuildDependencies().init();

authRoute.post("/register", controllers.createRegister.register);
authRoute.post("/login", controllers.createLogin.login);

export default authRoute;
