import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  IsDate,
} from "class-validator";

export class CreateProfileBody {
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
  role_id: string;
  @IsString()
  user_id: string;
}
