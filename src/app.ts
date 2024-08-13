import "reflect-metadata";
import express, { Request, Response } from "express";
import profileRoute from "./profile/infrastructure/route/profile.route";
import cors from "cors";
import dbInit from "./config/db/mongo";
import userRoute from "./user/infrastructure/route/user.route";
import roleRoute from "./role/infrastructure/route/role.route";
import authRoute from "./auth/infrastructure/route/auth.route";
import { Auth } from "./helpers/middlewares/auth";

const app = express();
app.use(express.json());
app.use(cors());
// const auth = new Auth().checkAuth;
// app.use(auth);
app.use(profileRoute, userRoute, roleRoute, authRoute);

dbInit().then();

export const port = 3000;

app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

export default app;
