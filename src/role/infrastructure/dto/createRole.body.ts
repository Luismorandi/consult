import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  IsArray,
} from "class-validator";

export class CreateRoleBody {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  type: string;

  @IsArray()
  permissions: string[];

  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @IsDateString()
  @IsNotEmpty()
  updated_at: Date;
}
