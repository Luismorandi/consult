import { Request, Response } from "express";
import { ProfileUserCases } from "../../application/profile.userCases";
import { CreateProfileDTO } from "../../domain/profile.dto";

export class CreateProfileController {
  constructor(private profileUserCase: ProfileUserCases) {}

  public createProfile = async (req: Request, res: Response) => {
    const body = req.body;
    const profile = await this.profileUserCase.createProfile(
      body as CreateProfileDTO
    );
    res.send({ profile });
  };

  public getProfile = async (req: Request, res: Response) => {
    const profile = await this.profileUserCase.getProfile(req.params?.id);
    res.send(profile);
  };
}
