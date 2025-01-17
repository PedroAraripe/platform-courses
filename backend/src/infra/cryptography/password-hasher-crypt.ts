import * as bcrypt from "bcrypt";

export class PasswordHasherCrypt {
  private static readonly SALT_ROUNDS = 10;

  static async execute(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }
}