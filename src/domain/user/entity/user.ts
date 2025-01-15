import { PasswordHasher } from "../../../infra/cryptography/password-hasher";

export type UserProps = {
  name: string,
  password: string,
  id: string,
  createdAt: Date
}

 export type UserPublicDto = {
  name: string,
  id: string,
  createdAt: Date
}
// TODO
// ADICIONAR HASH NO LUGAR DA SENHA
// VALIDACAO DE CAMPOS

export class User {
  private constructor(private readonly props: UserProps) {
    this.validate();
  }

  public static async create(name: string, password: string) {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      password: await User.generateHashPassword(password),
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
    const errors = [];

    if(!this.props.name) {
      errors.push("Name is required!");
    }

    if(!this.props.password) {
      errors.push("Password  is required!");
    }

    if(errors.length) {
      throw new Error(errors.join(" "));
    }
  }

}