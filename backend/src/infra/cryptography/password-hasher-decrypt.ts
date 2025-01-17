import * as bcrypt from "bcrypt";
import { WrongCredentials } from "../../shared/errors/wrong-credentials";

export class PasswordHasherDecrypt {
  static async execute(password: string, passwordHashed: string): Promise<void> {
    const isValid = bcrypt.compareSync(password, passwordHashed);

    if(!isValid) {
      throw new WrongCredentials();
    }
  }
}