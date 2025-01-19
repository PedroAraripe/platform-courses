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
    } else if(typeof courseProps.hours !== "number") {
      errorsDetails.push({
        field: "hours",
        message: "hours must be a number"
      });
    } else if(courseProps.hours < 0) {
      errorsDetails.push({
        field: "hours",
        message: "hours must be a positive number"
      });
    }

    if(errorsDetails.length) {
      throw new ValidationError("Alguns campos estão faltando ou estão mal formatados", errorsDetails)
    }
  }
}