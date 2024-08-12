import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class Tokenizer {
  public generate(payload: object): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const plainPayload = JSON.parse(JSON.stringify({ ...payload }));

    return Jwt.sign(plainPayload, process.env.JWT_SECRET, { expiresIn: "2h" });
  }
}
