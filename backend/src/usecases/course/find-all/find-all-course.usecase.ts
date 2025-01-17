import { Course } from "../../../domain/course/entity/course";
import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { Usecase } from "../../usecase";

export type FindCourseOutputDto = {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
}[];

export class FindAllCourseUsecase implements Usecase<void, FindCourseOutputDto> {
  private constructor(private readonly courseGateway: CourseGateway) {}

  public static create(courseGateway: CourseGateway) {
    return new FindAllCourseUsecase(courseGateway);
  }

  async execute(): Promise<FindCourseOutputDto> {
      const courses = await this.courseGateway.findAll();

      const output: FindCourseOutputDto = this.presentOutput(courses);

      return output;
  }

  private presentOutput(courses: Course[]) : FindCourseOutputDto {
    return courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      createdAt: course.createdAt,
    }))
  }
} 