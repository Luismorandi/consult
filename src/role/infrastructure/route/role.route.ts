import { Router } from "express";
import { BuildDependencies } from "../../../dependencies/init";

const roleRoute = Router();
const controllers = new BuildDependencies().init();

roleRoute.post("/role", controllers.createRoleController.createRole);

export default roleRoute;
