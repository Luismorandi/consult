import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  IsDate,
} from "class-validator";

export class CreateProfileDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  role_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  created_at: Date;

  @IsString()
  @IsNotEmpty()
  updated_at: Date;
}
