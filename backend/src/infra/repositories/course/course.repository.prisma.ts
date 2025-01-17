import { PrismaClient } from "@prisma/client";
import { Course } from "../../../domain/course/entity/course";
import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { NotFoundError } from "../../../shared/errors/not-found.error";

export class CourseRepositoryPrisma implements CourseGateway {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new CourseRepositoryPrisma(prismaClient);
  }

  public async save(course: Course): Promise<void> {
    const data = {
      id: course.id,
      title: course.title,
      description: course.description,
      hours: course.hours,
      createdAt: course.createdAt,
    }

    await this.prismaClient.courses.create({ data });
  }

  public async findById(id: string): Promise<Course> {
    const foundCourse = await this.prismaClient.courses.findUnique({where: { id }})

    if(!foundCourse) {
      throw new NotFoundError("Course");
    }

    return Course.with(foundCourse);
  }

  public async findByTitle(title: string): Promise<Course[]> {
    const foundCourses = await this.prismaClient.courses.findMany({
      where: {
        title: {
          contains: title,
        }
      }
    })

    if(!foundCourses.length) {
      throw new NotFoundError("Courses");
    }

    return foundCourses.map(foundCourse => Course.with(foundCourse));
  }

  public async findAll(): Promise<Course[]> {
    const foundCourses = await this.prismaClient.courses.findMany()

    return foundCourses.map(courseFound => Course.with(courseFound));
  }
}