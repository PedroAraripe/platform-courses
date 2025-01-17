import { ValidationError, ValidationErrorDetail } from "../../../../../../shared/errors/validation.error";

export type LoginUserPayload = {
  password: string,
  email: string,
}
 
export class LoginUserPayloadValidations {
  static validate(loginUserPayload: LoginUserPayload) {
    const errorsDetails: ValidationErrorDetail[] = [];

    if(!loginUserPayload.email) {
      errorsDetails.push({
        field: "email",
        message: "email is required"
      });
    }

    if(!loginUserPayload.password) {
      errorsDetails.push({
        field: "password",
        message: "password is required"
      });
    }

    if(errorsDetails.length) {
      throw new ValidationError("Some fields are missing or formatted incorrectly", errorsDetails)
    }
  }
}