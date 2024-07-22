import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  IsDate,
  isDate,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;
}
