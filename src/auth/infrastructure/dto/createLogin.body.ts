import { IsString, IsNotEmpty } from "class-validator";

export class CreateLoginBody {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
