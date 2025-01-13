import { Course } from "../../../domain/course/entity/course";
import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { Usecase } from "../../usecase";

export type FindCourseInputDto = {
  id: string
};

export type FindCourseOutputDto = {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
};

export class FindByIdCourseUsecase implements Usecase<FindCourseInputDto, FindCourseOutputDto> {
  private constructor(private readonly courseGateway: CourseGateway) {}

  public static create(courseGateway: CourseGateway) {
    return new FindByIdCourseUsecase(courseGateway);
  }

  async execute({ id } : FindCourseInputDto): Promise<FindCourseOutputDto> {
      const foundCourse = await this.courseGateway.findById(id);

      const output: FindCourseOutputDto = this.presentOutput(foundCourse);

      return output;
  }

  private presentOutput(course: Course) : FindCourseOutputDto {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      createdAt: course.createdAt,
    };
  }
} 