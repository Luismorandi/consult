import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { RegisterUserCase } from "../../application/register.UseCase";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateRegisterBody } from "../dto/createRegister.body";

@injectable()
export class RegisterController {
  constructor(
    @inject(RegisterUserCase)
    private createRegisterUserCase: RegisterUserCase
  ) {}

  public register = async (req: Request, res: Response) => {
    const body: CreateRegisterBody = plainToInstance(
      CreateRegisterBody,
      req.body
    );

    const errors = await validate(body);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    const profile = await this.createRegisterUserCase.execute(body);
    res.send({ profile });
  };
}
