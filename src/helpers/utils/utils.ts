import { Hash } from "./hash";
import { Tokenizer } from "./tokenizer";

export class Utils {
  public hash;
  public tokenizer;
  constructor() {
    this.hash = new Hash();
    this.tokenizer = new Tokenizer();
  }
}
