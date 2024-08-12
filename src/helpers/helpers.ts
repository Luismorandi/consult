import { Hash } from "./hash";
import { Tokenizer } from "./tokenizer";

export class Helper {
  public hash;
  public tokenizer;
  constructor() {
    this.hash = new Hash();
    this.tokenizer = new Tokenizer();
  }
}
