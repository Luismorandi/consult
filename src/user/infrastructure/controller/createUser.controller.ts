import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserBody } from "../dto/createUser.body";
import { CreateUserUserCase } from "../../application/crateUser.userCases";
import { GetByIdProfileUserCase } from "../../../profile/application/getByIdProfile.userCase";

@injectable()
export class CreateUserController {
  constructor(
    @inject(CreateUserUserCase)
    private createUserUserCase: CreateUserUserCase,
    @inject(GetByIdProfileUserCase)
    private getByIdUserCase: GetByIdProfileUserCase
  ) {}

  public createUser = async (req: Request, res: Response) => {
    const body: CreateUserBody = plainToInstance(CreateUserBody, req.body);

    const errors = await validate(body);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    const user = await this.createUserUserCase.execute(body);
    res.send({ user });
  };
}
