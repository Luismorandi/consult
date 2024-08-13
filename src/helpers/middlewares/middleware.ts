import { Auth } from "./auth";

export class Middleware {
  public auth;
  constructor() {
    this.auth = new Auth();
  }
}
