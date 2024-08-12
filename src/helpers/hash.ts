import bcrypt from "bcrypt";

export class Hash {
  public encrypt(text: string): string {
    const encryptText = bcrypt.hashSync(text, 10).toString();
    return encryptText;
  }

  public compare(textPlain: string, encyptText: string): Boolean {
    const compareText = bcrypt.compareSync(textPlain, encyptText);

    return compareText;
  }
}
