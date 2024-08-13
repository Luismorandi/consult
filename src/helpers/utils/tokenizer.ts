import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

export interface AuthPayload extends JwtPayload {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  description: string;
  role_id: string;
  user_id: string;
}

export class Tokenizer {
  public generate(payload: object): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const plainPayload = JSON.parse(JSON.stringify({ ...payload }));

    return Jwt.sign(plainPayload, process.env.JWT_SECRET, { expiresIn: "2h" });
  }

  public verify(token?: string): AuthPayload {
    if (!token) throw new Error("undefinde token");
    return Jwt.verify(token, `${process.env.JWT_SECRET}`) as AuthPayload;
  }
}
