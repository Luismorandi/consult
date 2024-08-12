import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { RegisterUserCase } from "../../application/register.UseCase";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateRegisterBody } from "../dto/createRegister.body";
import { LoginUserCase } from "../../application/login.UseCase";
import { CreateLoginBody } from "../dto/createLogin.body";
import { error } from "console";

@injectable()
export class LoginController {
  constructor(
    @inject(LoginUserCase)
    private createLoginUserCase: LoginUserCase
  ) {}

  public login = async (req: Request, res: Response) => {
    try {
      const body: CreateLoginBody = plainToInstance(CreateLoginBody, req.body);

      const errors = await validate(body);
      if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
      const profile = await this.createLoginUserCase.execute(body);

      res.send(profile);
    } catch (e) {
      if (e instanceof Error) {
        res.status(409);
        res.send({
          error: e.message,
        });
      }
      return null;
    }
  };
}
