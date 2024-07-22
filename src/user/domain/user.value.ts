import { CreateUserDTO } from "./user.dto";
import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: CreateUserDTO) {
    (this.id = input.id),
      (this.email = input.email),
      (this.password = input.password),
      (this.updated_at = input.updated_at);
    this.created_at = input.created_at;
  }

  private update() {
    this.updated_at = new Date();
  }

  public setPassword(password: string) {
    this.password = password;
    this.update();
  }
}
