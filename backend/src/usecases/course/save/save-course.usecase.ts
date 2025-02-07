import { Course } from "../../../domain/course/entity/course";
import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { AlreadyCreatedEntityError } from "../../../shared/errors/already-created-entity.error";
import { Usecase } from "../../usecase";

export type SaveCourseInputDto = {
  title: string;
  description: string;
  hours: number;
};

export type SaveCourseOutputDto = {
  id: string;
};

export class SaveCourseUsecase implements Usecase<SaveCourseInputDto, SaveCourseOutputDto> {
  private constructor(private readonly courseGateway: CourseGateway) {}

  public static create(courseGateway: CourseGateway) {
    return new SaveCourseUsecase(courseGateway);
  }

  async execute({
    title,
    description,
    hours,
  }: SaveCourseInputDto): Promise<SaveCourseOutputDto> {
      const localCourse = Course.create(title, description, hours);

      const courseCreated = await this.courseGateway.save(localCourse);
      
      if(courseCreated.wasUpserted) {
        throw new AlreadyCreatedEntityError("Curso");
      }

      const output: SaveCourseOutputDto = this.presentOutput(localCourse);

      return output;
  }

  private presentOutput(course: Course) : SaveCourseOutputDto {
    return { id: course.id }
  }
} 