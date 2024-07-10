import { Request, Response } from "express";
import { CreateProfileDTO } from "../../domain/profile.dto";
import { inject, injectable } from "inversify";
import { CreateProfileUserCase } from "../../application/crateProfile.userCases";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateProfileBody } from "../dto/createProfile.body";

@injectable()
export class CreateProfileController {
  constructor(
    @inject(CreateProfileUserCase)
    private createProfileUserCase: CreateProfileUserCase
  ) {}

  public createProfile = async (req: Request, res: Response) => {
    const body: CreateProfileBody = plainToInstance(
      CreateProfileBody,
      req.body
    );

    const errors = await validate(body);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    const profile = await this.createProfileUserCase.execute(body);
    res.send({ profile });
  };
}
