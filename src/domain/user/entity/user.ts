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

    // TODO
    // CONCLUIR CASOS DE PREENCHIMENTO NORMAL E BUSCAS NORMAIS E DEPOIS FAZER ABAIXO
    // VER VIDEO SOBRE ERROR HANDLING EM APIS NODE E IMPLEMENTAR NAS OUTRAS ROTAS
    // VER VIDEO DE IMPLEMENTAÇÃO DE TESTES BÁSICO PARA APLICAÇÕES NODE
    // VER VIDEO DE IMPLEMENTAÇÃO DE HASH PASSWORD NO EXPRESS

    if(errors.length) {
      throw new Error(errors.join(" "));
    }
  }

}