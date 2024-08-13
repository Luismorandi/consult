import { NextFunction, Request, Response } from "express";
import { Utils } from "../utils/utils";
import RoleModel from "../../role/infrastructure/repository/mongo/model/role.schema";
import { ObjectId } from "mongodb";
import roleRoute from "../../role/infrastructure/route/role.route";

export class Auth {
  private utils = new Utils();

  public checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ").pop();
      const tokenData = this.utils.tokenizer.verify(token);
      if (tokenData.id) next();
    } catch (err) {
      res.status(409);
      res.send({ error: "Authentication failed" });
    }
  };

  public checkRole =
    (roles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(" ").pop();
        const tokenData = this.utils.tokenizer.verify(token);
        if (tokenData.role_id) {
          const role = await RoleModel.findById({
            _id: new ObjectId(tokenData.role_id),
          });
          if (!role) throw new Error();
          if (!roles.includes(role.type)) throw new Error();

          next();
        }
      } catch (err) {
        res.status(409);
        res.send({ error: "Role without permissions" });
      }
    };

  public public = (req: Request, res: Response, next: NextFunction) => {
    try {
      req.isPublic = true;
      next();
    } catch (err) {
      res.status(409);
      res.send({ error: "Error with de public route" });
    }
  };
}
