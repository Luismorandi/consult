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
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  specialist: string;

  @IsDate()
  @IsNotEmpty()
  born_experience: Date;

  @IsString()
  @IsOptional()
  picture_url: string;

  @IsString()
  type: string;
}
