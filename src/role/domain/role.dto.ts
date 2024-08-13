import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateRoleDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  permissions: string[];

  @IsString()
  @IsNotEmpty()
  created_at: Date;

  @IsString()
  @IsNotEmpty()
  updated_at: Date;
}

export enum roles {
  COACHEE = "COACHEE",
  COACH = "COACH",
  ADMIN = "ADMIN",
}
