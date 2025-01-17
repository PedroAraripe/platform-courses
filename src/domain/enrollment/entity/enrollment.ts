import { Course } from "../../course/entity/course";
import { User, UserPublicDto } from "../../user/entity/user";
import { EnrollmentValidations } from "../validations/enrollment-payload.validation";
import { EnrollmentProps } from "../types/enrollment.types";
import { CourseProps } from "../../course/types/course.types";

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
      id: crypto.randomUUID().toString(),
      userId,
      courseId,
      user,
      course,
      enrolledAt: new Date(),
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

  public loadedCourseDto(): EnrollmentWithCourseDto {
    return {      
      userId: this.userId,
      courseId: this.courseId,
      course: this.course,
      enrolledAt: this.enrolledAt,
    };
  }
}