import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateProfileUserCase } from "../../application/crateProfile.userCases";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateProfileBody } from "../dto/createProfile.body";
import { GetByIdProfileUserCase } from "../../application/getByIdProfile.userCase";

@injectable()
export class GetByIdProfileController {
  constructor(
    @inject(GetByIdProfileUserCase)
    private getByIdProfileUserCase: GetByIdProfileUserCase
  ) {}

  public getById = async (req: Request, res: Response) => {
    const id = req.params?.id;
    if (!id) throw new Error("not a valid id to get profile");
    const profile = await this.getByIdProfileUserCase.execute(id);
    res.send({ profile });
  };
}
