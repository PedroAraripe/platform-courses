import { ValidationError } from "../errors/validation.error";

export class RequiredSeachFindByValidation {
  static validate(search: string) {
    if(!search) {
      throw new ValidationError("Alguns parâmetros estão faltando", [
        {
          field: "search",
          message: "search is required"
        }
      ])
    }

  }
}