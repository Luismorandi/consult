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
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  specialist: string;

  @IsDateString()
  @IsNotEmpty()
  born_experience: Date;

  @IsString()
  @IsOptional()
  picture_url: string;

  @IsString()
  type: string;
  @IsString()
  user_id: string;
}
