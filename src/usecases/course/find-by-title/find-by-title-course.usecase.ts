import { Course } from "../../../domain/course/entity/course";
import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { Usecase } from "../../usecase";

export type FindCoursesByTitleInputDto = {
  title: string;
};

export type FindCourseOutputDto = {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
}[];

export class FindByTitleCourseUsecase implements Usecase<FindCoursesByTitleInputDto, FindCourseOutputDto> {
  private constructor(private readonly courseGateway: CourseGateway) {}

  public static create(courseGateway: CourseGateway) {
    return new FindByTitleCourseUsecase(courseGateway);
  }

  async execute({ title }: FindCoursesByTitleInputDto): Promise<FindCourseOutputDto> {
    const coursesFound = await this.courseGateway.findByTitle(title);

    const output: FindCourseOutputDto = this.presentOutput(coursesFound);

    return output;
  }

  private presentOutput(courses: Course[]) : FindCourseOutputDto {
    return courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      createdAt: course.createdAt,
    }));
  }
} 