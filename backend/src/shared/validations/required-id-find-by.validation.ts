import { ValidationError } from "../errors/validation.error";

export class RequiredIdFindByValidation {
  static validate(id: string) {
    if(!id) {
      throw new ValidationError("Alguns parâmetros estão faltando", [
        {
          field: "id",
          message: "id is required"
        }
      ])
    }

  }
}