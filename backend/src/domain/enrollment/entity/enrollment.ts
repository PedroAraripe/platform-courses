import { Course } from "../../course/entity/course";
import { User, UserPublicDto } from "../../user/entity/user";
import { EnrollmentValidations } from "../validations/enrollment-payload.validation";
import { EnrollmentProps } from "../types/enrollment.types";
import { CourseProps } from "../../course/types/course.types";
import { IdGenerator } from "../../../infra/cryptography/id-generator";
import { CurrentDateIsoGmtCleaned } from "../../../shared/utils/current-date-iso-gmt-cleaned.util";

export type EnrollmentWithCourseDto = {
  userId: string;
  courseId: string;
  user?: UserPublicDto;
  course?: CourseProps;
  enrolledAt: Date,
}

export class Enrollment {
  private constructor(private readonly props: EnrollmentProps) {
    EnrollmentValidations.validate(props);
  }

  public static create(
      userId: string,
      courseId: string,
      user?: User,
      course?: Course
    ) {
    return new Enrollment({
      id: IdGenerator.execute(),
      userId,
      courseId,
      user,
      course,
      enrolledAt: CurrentDateIsoGmtCleaned.execute(),
    })
  }

  public static with(props: EnrollmentProps) {
    return new Enrollment(props);
  }

  public get userId() {
    return this.props.userId;
  }

  public get courseId() {
    return this.props.courseId;
  }

  public get id() {
    return this.props.id;
  }

  public get enrolledAt() {
    return this.props.enrolledAt;
  }

  public get user() {
    return this.props.user?.publicDto();
  }

  public get course() {
    return this.props.course?.publicDto();
  }

  public get wasUpserted() {
    return this.props?.wasUpserted;
  }

  public loadedCourseDto(): EnrollmentWithCourseDto {
    return {      
      userId: this.userId,
      courseId: this.courseId,
      course: this.course,
      enrolledAt: this.enrolledAt,
    };
  }
}