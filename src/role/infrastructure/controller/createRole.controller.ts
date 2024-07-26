import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateRoleUseCase } from "../../application/crateRole.useCase";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateRoleBody } from "../dto/createRole.body";

@injectable()
export class CreateRoleController {
  constructor(
    @inject(CreateRoleUseCase)
    private createRoleUseCase: CreateRoleUseCase
  ) {}

  public createRole = async (req: Request, res: Response) => {
    const body: CreateRoleBody = plainToInstance(CreateRoleBody, req.body);

    const errors = await validate(body);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    const role = await this.createRoleUseCase.execute(body);
    res.send({ role });
  };
}
