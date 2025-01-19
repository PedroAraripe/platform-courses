import { Course } from "../../../domain/course/entity/course";
import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { Usecase } from "../../usecase";

type FindByUserIdPayload = {
  userId: string,
}

export type FindCourseOutputDto = {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
  hours: number,
};

export class FindByUserIdCourseUsecase implements Usecase<FindByUserIdPayload, FindCourseOutputDto> {
  private constructor(private readonly courseGateway: CourseGateway) {}

  public static create(courseGateway: CourseGateway) {
    return new FindByUserIdCourseUsecase(courseGateway);
  }

  async execute({ userId } : FindByUserIdPayload): Promise<FindCourseOutputDto> {
      const foundCourse = await this.courseGateway.findById(userId);

      const output: FindCourseOutputDto = this.presentOutput(foundCourse);

      return output;
  }

  private presentOutput(course: Course) : FindCourseOutputDto {
    return {
      id: course.id,
      title: course.title,
      hours: course.hours,
      description: course.description,
      createdAt: course.createdAt,
    };
  }
} 