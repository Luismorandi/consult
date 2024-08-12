import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetByIdUserUserCase } from "../../application/getById.userCase";

@injectable()
export class GetByIdUserController {
  constructor(
    @inject(GetByIdUserUserCase)
    private getByIdUserCase: GetByIdUserUserCase
  ) {}

  public getById = async (req: Request, res: Response) => {
    const id = req.params?.id;
    console.log(id);
    if (!id) return res.status(400).json({ errors: "not id to get user" });
    const user = await this.getByIdUserCase.execute(id);
    res.send({ user });
  };
}
