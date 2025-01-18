import { IdGenerator } from "../../../infra/cryptography/id-generator";
import { CurrentDateIsoGmtCleaned } from "../../../shared/utils/current-date-iso-gmt-cleaned.util";
import { CourseProps } from "../types/course.types";
import { CourseValidations } from "../validations/course-payload.validation";

export type CoursePublicDto = CourseProps;

export class Course {
  private constructor(private readonly props: CourseProps) {
    CourseValidations.validate(props);
  }

  public static create(title: string, description: string, hours: number) {
    return new Course({
      id: IdGenerator.execute(),
      title,
      description: description,
      createdAt: CurrentDateIsoGmtCleaned.execute(),
      hours
    })
  }

  public static with(props: CourseProps) {
    return new Course(props);
  }

  public get title() {
    return this.props.title;
  }

  public get description() {
    return this.props.description;
  }

  public get hours() {
    return this.props.hours;
  }

  public get id() {
    return this.props.id;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get wasUpserted() {
    return this.props?.wasUpserted;
  }

  public publicDto(): CoursePublicDto {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      description: this.description,
      hours: this.hours,
    };
  }
}