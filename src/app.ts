import "reflect-metadata";
import express, { Request, Response } from "express";
import profileRoute from "./profile/infrastructure/route/profile.route";
import cors from "cors";
import dbInit from "./config/db/mongo";

const app = express();
app.use(express.json());
app.use(cors());
app.use(profileRoute);

dbInit().then();

export const port = 3000;

app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

export default app;
