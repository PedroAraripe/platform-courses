import { ApplicationError } from './application.error';

export class NotFoundError extends ApplicationError {
  constructor( entity: string ) {
    super('NotFound', `${entity} was not found`, 404);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}