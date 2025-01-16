import { PasswordHasher } from "../../../infra/cryptography/password-hasher";
import { UserProps } from "../types/user.types";
import { UserValidations } from "../validations/user-payload.validation";

 export type UserPublicDto = {
  name: string,
  id: string,
  createdAt: Date
}

export class User {
  private constructor(private readonly props: UserProps) {
    UserValidations.validate(props);
  }

  public static async create(name: string, password: string, email: string) {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password: password ? await User.generateHashPassword(password) : password,
      createdAt: new Date(),
    })
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  public get name() {
    return this.props.name;
  }

  public get password() {
    return this.props.password;
  }

  public get email() {
    return this.props.email;
  }

  public get id() {
    return this.props.id;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  static async generateHashPassword(password:string ) {
    return await PasswordHasher.hash(password);
  }

  publicDto(): UserPublicDto {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
    };
  }
}