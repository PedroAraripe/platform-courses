import { PasswordHasher } from "../../../infra/cryptography/password-hasher";
import { ValidationError, ValidationErrorDetail } from "../../../shared/errors/ValidationError";

export type UserProps = {
  name: string,
  password: string,
  email: string,
  id: string,
  createdAt: Date
}

 export type UserPublicDto = {
  name: string,
  id: string,
  createdAt: Date
}

export class User {
  private constructor(private readonly props: UserProps) {
    this.validate();
  }

  // todo separar essa logica do validate pro domain/validations/

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

  private validate() {
    const errorsDetails: ValidationErrorDetail[] = [];

    if(!this.props.name) {
      errorsDetails.push({
        field: "Name",
        message: "Name is required"
      });
    }

    if(!this.props.password) {
      errorsDetails.push({
        field: "Password",
        message: "Password is required"
      });
    }

    if(!this.props.email) {
      errorsDetails.push({
        field: "Email",
        message: "Email is required"
      });
    }

    if(errorsDetails.length) {
      throw new ValidationError("Certain fields are empty", errorsDetails)
    }
  }
}