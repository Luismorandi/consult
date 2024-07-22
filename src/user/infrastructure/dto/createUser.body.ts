import { IsString, IsOptional, IsNotEmpty, IsDate } from "class-validator";

export class CreateUserBody {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsDate()
  @IsOptional()
  created_at: Date;
}
