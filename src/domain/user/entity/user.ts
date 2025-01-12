 export type UserProps = {
  name: string,
  password: string,
  id: string,
  createdAt: Date
}
// TODO
// ADICIONAR HASH NO LUGAR DA SENHA
// VALIDACAO DE CAMPOS

export class User {
  private constructor(private readonly props: UserProps) {}

  public static create(name: string, password: string) {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      password: User.generateHashPassword(password),
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

  static generateHashPassword(password:string ) {
    return password;
  }

}