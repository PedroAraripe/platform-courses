import { ValidationError, ValidationErrorDetail } from "../../../shared/errors/validation.error";
import { CourseProps } from "../types/course.types";

export class CourseValidations {
  static validate(courseProps: CourseProps) {
    const errorsDetails: ValidationErrorDetail[] = [];

    if(!courseProps.title) {
      errorsDetails.push({
        field: "title",
        message: "title is required"
      });
    }

    if(!courseProps.description) {
      errorsDetails.push({
        field: "description",
        message: "description is required"
      });
    }

    if(!courseProps.hours) {
      errorsDetails.push({
        field: "hours",
        message: "hours is required"
      });
    }

    if(errorsDetails.length) {
      throw new ValidationError("Some fields are missing or formatted incorrectly", errorsDetails)
    }
  }
}