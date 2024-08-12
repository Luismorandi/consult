import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from "class-validator";

export class CreateRegisterBody {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @IsDateString()
  @IsNotEmpty()
  updated_at: Date;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  role: string;
}
