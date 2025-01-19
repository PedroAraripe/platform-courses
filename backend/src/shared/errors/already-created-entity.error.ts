import { ApplicationError } from './application.error';

export type AlreadyCreatedEntityInput = {
  entity: string,
  field: string,
  message?: string
}

export class AlreadyCreatedEntityError extends ApplicationError {
  constructor(entity : string) {
    const messageBase: string = `${entity} já existe`;

    super('AlreadyCreatedEntity', messageBase, 400);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}